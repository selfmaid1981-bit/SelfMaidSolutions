import { parse } from "csv-parse/sync";
import { db } from "../db";
import { localBusinesses } from "@shared/schema";
import { eq, or } from "drizzle-orm";
import { scrapeEmailFromWebsite } from "./email-enricher";
import {
  appendLeadsToSheet,
  getExistingLeadEmails,
  getExistingLeadPhones,
} from "./sheets-sync";
import { createDiscoveredBusiness } from "../saas/lead-discovery";

interface RawRow {
  [key: string]: string;
}

interface CleanedLead {
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  website: string;
  category: string;
  rating: string;
  reviewCount: number;
}

interface ProcessResult {
  totalRows: number;
  invalidSkipped: number;
  duplicatesRemoved: number;
  leadsAdded: number;
  emailsFound: number;
  errors: number;
  leads: { name: string; email: string; phone: string; score: number }[];
}

function isAllowedUrl(urlStr: string): boolean {
  try {
    const url = new URL(urlStr.startsWith("http") ? urlStr : `https://${urlStr}`);
    if (!["http:", "https:"].includes(url.protocol)) return false;
    const host = url.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0") return false;
    if (host.startsWith("10.") || host.startsWith("192.168.") || host.startsWith("172.")) return false;
    if (host.endsWith(".internal") || host.endsWith(".local") || host === "metadata.google.internal") return false;
    if (host === "169.254.169.254") return false;
    return true;
  } catch {
    return false;
  }
}

const COLUMN_ALIASES: Record<string, string[]> = {
  name: [
    "name",
    "business_name",
    "businessname",
    "business name",
    "company",
    "company_name",
    "title",
    "place name",
    "place_name",
  ],
  address: [
    "address",
    "full_address",
    "full address",
    "location",
    "street",
    "street_address",
  ],
  phone: [
    "phone",
    "phone_number",
    "phone number",
    "telephone",
    "tel",
    "contact",
    "phone1",
  ],
  website: ["website", "web", "url", "site", "website_url", "web_url"],
  category: [
    "category",
    "type",
    "business_type",
    "business type",
    "categories",
    "industry",
  ],
  rating: ["rating", "stars", "score", "google_rating", "avg_rating"],
  reviews: [
    "reviews",
    "review_count",
    "review count",
    "total_reviews",
    "num_reviews",
    "reviews_count",
  ],
};

function matchColumn(headers: string[], field: string): string | null {
  const aliases = COLUMN_ALIASES[field] || [field];
  const lower = headers.map((h) => h.toLowerCase().trim());
  for (const alias of aliases) {
    const idx = lower.indexOf(alias.toLowerCase());
    if (idx >= 0) return headers[idx];
  }
  return null;
}

function normalizePhone(phone: string): string {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone.trim();
}

function extractCity(address: string): { city: string; state: string } {
  if (!address) return { city: "", state: "" };

  const parts = address.split(",").map((p) => p.trim());
  if (parts.length >= 2) {
    const cityPart = parts[parts.length - 2] || parts[0];
    const statePart = parts[parts.length - 1] || "";
    const stateMatch = statePart.match(/([A-Z]{2})/);
    return {
      city: cityPart.trim(),
      state: stateMatch ? stateMatch[1] : statePart.replace(/\d+/g, "").trim(),
    };
  }
  return { city: address, state: "" };
}

function calculateScore(lead: {
  website: string;
  phone: string;
  email: string;
}): number {
  let score = 0;
  if (lead.website) score++;
  if (lead.phone) score++;
  if (lead.email) score++;
  return score;
}

export async function processCSV(
  csvContent: string
): Promise<ProcessResult> {
  const result: ProcessResult = {
    totalRows: 0,
    invalidSkipped: 0,
    duplicatesRemoved: 0,
    leadsAdded: 0,
    emailsFound: 0,
    errors: 0,
    leads: [],
  };

  let rows: RawRow[];
  try {
    rows = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true,
      relax_quotes: true,
    });
  } catch (err: any) {
    console.error(`[CSV] Parse error: ${err.message}`);
    throw new Error(`CSV parsing failed: ${err.message}`);
  }

  if (rows.length === 0) {
    throw new Error("CSV file is empty or has no data rows");
  }

  result.totalRows = rows.length;
  const headers = Object.keys(rows[0]);

  const nameCol = matchColumn(headers, "name");
  const addressCol = matchColumn(headers, "address");
  const phoneCol = matchColumn(headers, "phone");
  const websiteCol = matchColumn(headers, "website");
  const categoryCol = matchColumn(headers, "category");
  const ratingCol = matchColumn(headers, "rating");
  const reviewsCol = matchColumn(headers, "reviews");

  if (!nameCol) {
    throw new Error(
      `Could not find a business name column. Found columns: ${headers.join(", ")}`
    );
  }

  console.log(
    `[CSV] Column mapping — name: ${nameCol}, address: ${addressCol}, phone: ${phoneCol}, website: ${websiteCol}`
  );

  const cleaned: CleanedLead[] = [];
  const seenKeys = new Set<string>();

  for (const row of rows) {
    try {
      const name = (row[nameCol!] || "").trim();
      if (!name) {
        result.invalidSkipped++;
        continue;
      }

      const address = addressCol ? (row[addressCol] || "").trim() : "";
      const phone = normalizePhone(phoneCol ? row[phoneCol] || "" : "");
      const website = websiteCol ? (row[websiteCol] || "").trim() : "";
      const category = categoryCol ? (row[categoryCol] || "").trim() : "";
      const rating = ratingCol ? (row[ratingCol] || "").trim() : "";
      const reviews = reviewsCol
        ? parseInt(row[reviewsCol] || "0") || 0
        : 0;

      const dedupKey = `${name.toLowerCase()}|${phone.replace(/\D/g, "")}|${address.toLowerCase().slice(0, 30)}`;
      if (seenKeys.has(dedupKey)) {
        result.duplicatesRemoved++;
        continue;
      }
      seenKeys.add(dedupKey);

      const { city, state } = extractCity(address);

      cleaned.push({
        name,
        address,
        city,
        state,
        phone,
        website,
        category,
        rating,
        reviewCount: reviews,
      });
    } catch (err: any) {
      console.log(`[CSV] Row processing error: ${err.message}`);
      result.errors++;
    }
  }

  const sheetEmails = await getExistingLeadEmails();
  const sheetPhones = await getExistingLeadPhones();
  const leadsToAppend: any[] = [];

  for (const lead of cleaned) {
    try {
      const phoneDigits = lead.phone.replace(/\D/g, "");

      if (phoneDigits && sheetPhones.has(phoneDigits)) {
        result.duplicatesRemoved++;
        continue;
      }

      const nameMatch = lead.name
        ? await db
            .select({ id: localBusinesses.id, phone: localBusinesses.phone, address: localBusinesses.address })
            .from(localBusinesses)
            .where(eq(localBusinesses.businessName, lead.name))
        : [];

      const isDuplicate = nameMatch.some((row) => {
        if (phoneDigits && row.phone && row.phone.replace(/\D/g, "") === phoneDigits) return true;
        if (lead.address && row.address && row.address.toLowerCase().includes(lead.address.toLowerCase().slice(0, 20))) return true;
        return false;
      });

      if (isDuplicate) {
        result.duplicatesRemoved++;
        continue;
      }

      let email = "";
      if (lead.website && isAllowedUrl(lead.website)) {
        try {
          const scraped = await scrapeEmailFromWebsite(lead.website);
          if (scraped) {
            email = scraped;
            result.emailsFound++;
          }
        } catch (err: any) {
          console.log(`[CSV] Email scrape failed for ${lead.name}: ${err.message}`);
        }
      }

      if (email && sheetEmails.has(email.toLowerCase())) {
        result.duplicatesRemoved++;
        continue;
      }

      const score = calculateScore({ website: lead.website, phone: lead.phone, email });

      const biz = await createDiscoveredBusiness({
        businessName: lead.name,
        address: lead.address || undefined,
        city: lead.city || undefined,
        state: lead.state || undefined,
        phone: lead.phone || undefined,
        website: lead.website || undefined,
        rating: lead.rating && !isNaN(parseFloat(lead.rating)) ? lead.rating : undefined,
        reviewCount: lead.reviewCount || undefined,
        category: lead.category || undefined,
        leadScore: score,
      });

      if (email) {
        const { businessEmails } = await import("@shared/schema");
        await db.insert(businessEmails).values({
          localBusinessId: biz.id,
          email,
          source: "website",
          verified: false,
        });
      }

      const today = new Date().toISOString().split("T")[0];
      const notes = [
        lead.rating ? `Rating: ${lead.rating}` : "",
        lead.reviewCount ? `${lead.reviewCount} reviews` : "",
        `Score: ${score}/3`,
        lead.category || "",
      ]
        .filter(Boolean)
        .join(" | ");

      leadsToAppend.push({
        name: lead.name,
        email: email || "",
        phone: lead.phone,
        company: lead.name,
        title: "",
        city: lead.city ? `${lead.city}, ${lead.state}` : lead.address,
        source: "Google Maps",
        status: "new",
        notes,
        dateAdded: today,
        lastContact: "",
        website: lead.website,
      });

      result.leads.push({
        name: lead.name,
        email: email || "",
        phone: lead.phone,
        score,
      });

      if (email) sheetEmails.add(email.toLowerCase());
      if (phoneDigits) sheetPhones.add(phoneDigits);

      result.leadsAdded++;
    } catch (err: any) {
      console.error(`[CSV] Error processing ${lead.name}: ${err.message}`);
      result.errors++;
    }
  }

  if (leadsToAppend.length > 0) {
    const appended = await appendLeadsToSheet(leadsToAppend);
    if (appended === 0 && leadsToAppend.length > 0) {
      console.error(`[CSV] WARNING: ${leadsToAppend.length} leads added to DB but Google Sheet append failed`);
    }
  }

  console.log(
    `[CSV] Processing complete: ${result.totalRows} rows → ${result.leadsAdded} leads added, ${result.duplicatesRemoved} dupes, ${result.emailsFound} emails found`
  );

  return result;
}
