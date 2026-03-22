import { db } from "../db";
import { businessEmails } from "@shared/schema";
import { eq } from "drizzle-orm";

interface EnrichmentResult {
  email: string | null;
  source: "website" | "hunter" | "none";
  verified: boolean;
}

const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
const EXCLUDED_DOMAINS = [
  "example.com",
  "sentry.io",
  "wixpress.com",
  "googleapis.com",
  "w3.org",
  "schema.org",
  "facebook.com",
  "twitter.com",
  "instagram.com",
  "google.com",
  "youtube.com",
  "linkedin.com",
];

export async function scrapeEmailFromWebsite(
  websiteUrl: string
): Promise<string | null> {
  if (!websiteUrl) return null;

  try {
    const url = websiteUrl.startsWith("http")
      ? websiteUrl
      : `https://${websiteUrl}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const resp = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SelfMaidBot/1.0; +https://selfmaidllc.com)",
      },
      redirect: "follow",
    });
    clearTimeout(timeout);

    if (!resp.ok) return null;

    const html = await resp.text();
    const emails = html.match(EMAIL_REGEX) || [];

    const validEmails = emails.filter((e) => {
      const domain = e.split("@")[1]?.toLowerCase();
      return domain && !EXCLUDED_DOMAINS.some((d) => domain.includes(d));
    });

    if (validEmails.length > 0) return validEmails[0];

    const contactPaths = ["/contact", "/contact-us", "/about", "/about-us"];
    for (const path of contactPaths) {
      try {
        const base = new URL(url);
        const contactUrl = `${base.origin}${path}`;
        const cResp = await fetch(contactUrl, {
          signal: AbortSignal.timeout(6000),
          headers: {
            "User-Agent":
              "Mozilla/5.0 (compatible; SelfMaidBot/1.0; +https://selfmaidllc.com)",
          },
          redirect: "follow",
        });
        if (!cResp.ok) continue;
        const cHtml = await cResp.text();
        const cEmails = cHtml.match(EMAIL_REGEX) || [];
        const cValid = cEmails.filter((e) => {
          const domain = e.split("@")[1]?.toLowerCase();
          return domain && !EXCLUDED_DOMAINS.some((d) => domain.includes(d));
        });
        if (cValid.length > 0) return cValid[0];
      } catch {
        continue;
      }
    }

    return null;
  } catch (err: any) {
    console.log(
      `[LeadGen] Website scrape failed for ${websiteUrl}: ${err.message}`
    );
    return null;
  }
}

export async function enrichWithHunter(
  websiteUrl: string
): Promise<string | null> {
  const apiKey = process.env.HUNTER_API_KEY;
  if (!apiKey || !websiteUrl) return null;

  try {
    const url = new URL(
      websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`
    );
    const domain = url.hostname.replace(/^www\./, "");

    const resp = await fetch(
      `https://api.hunter.io/v2/domain-search?domain=${encodeURIComponent(domain)}&limit=5&api_key=${apiKey}`
    );
    if (!resp.ok) return null;

    const data = await resp.json();
    const emails = data.data?.emails || [];

    const best = emails
      .filter((e: any) => e.confidence > 50)
      .sort((a: any, b: any) => b.confidence - a.confidence)[0];

    return best?.value || null;
  } catch (err: any) {
    console.log(`[LeadGen] Hunter enrichment failed: ${err.message}`);
    return null;
  }
}

export async function enrichBusiness(
  localBusinessId: string,
  websiteUrl: string
): Promise<EnrichmentResult> {
  const existing = await db
    .select()
    .from(businessEmails)
    .where(eq(businessEmails.localBusinessId, localBusinessId))
    .limit(1);

  if (existing.length > 0) {
    return {
      email: existing[0].email,
      source: (existing[0].source as "website" | "hunter") || "website",
      verified: existing[0].verified || false,
    };
  }

  let email = await scrapeEmailFromWebsite(websiteUrl);
  let source: "website" | "hunter" | "none" = email ? "website" : "none";

  if (!email) {
    email = await enrichWithHunter(websiteUrl);
    if (email) source = "hunter";
  }

  if (email) {
    await db.insert(businessEmails).values({
      localBusinessId,
      email,
      source,
      verified: source === "hunter",
    });
  }

  return { email, source, verified: source === "hunter" };
}
