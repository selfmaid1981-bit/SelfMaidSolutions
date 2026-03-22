import { db } from "../db";
import { localBusinesses } from "@shared/schema";
import { eq, and, or } from "drizzle-orm";

const PLACES_API_BASE = "https://places.googleapis.com/v1/places:searchText";

interface PlacesResult {
  businessName: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  website: string;
  rating: number;
  reviewCount: number;
  category: string;
  placeId: string;
}

function getApiKey(): string {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) throw new Error("GOOGLE_PLACES_API_KEY not set");
  return key;
}

export async function searchPlaces(
  query: string,
  maxResults: number = 20
): Promise<PlacesResult[]> {
  const apiKey = getApiKey();
  const results: PlacesResult[] = [];
  let pageToken: string | undefined;

  while (results.length < maxResults) {
    const body: any = {
      textQuery: query,
      pageSize: Math.min(20, maxResults - results.length),
      languageCode: "en",
    };
    if (pageToken) body.pageToken = pageToken;

    const resp = await fetch(PLACES_API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.primaryTypeDisplayName,places.addressComponents,nextPageToken",
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const err = await resp.text();
      console.error(`[LeadGen] Places API error (${resp.status}): ${err}`);
      break;
    }

    const data = await resp.json();
    const places = data.places || [];

    for (const p of places) {
      let city = "";
      let state = "";
      if (p.addressComponents) {
        for (const comp of p.addressComponents) {
          if (comp.types?.includes("locality")) city = comp.longText || "";
          if (comp.types?.includes("administrative_area_level_1"))
            state = comp.shortText || "";
        }
      }

      results.push({
        businessName: p.displayName?.text || "",
        address: p.formattedAddress || "",
        city,
        state,
        phone: p.nationalPhoneNumber || "",
        website: p.websiteUri || "",
        rating: p.rating || 0,
        reviewCount: p.userRatingCount || 0,
        category: p.primaryTypeDisplayName?.text || "",
        placeId: p.id || "",
      });
    }

    pageToken = data.nextPageToken;
    if (!pageToken || places.length === 0) break;

    await new Promise((r) => setTimeout(r, 2000));
  }

  return results;
}

export async function isDuplicate(
  businessName: string,
  address: string,
  phone: string
): Promise<boolean> {
  const conditions = [];
  if (businessName)
    conditions.push(eq(localBusinesses.businessName, businessName));
  if (phone) conditions.push(eq(localBusinesses.phone, phone));

  if (conditions.length === 0) return false;

  const existing = await db
    .select({ id: localBusinesses.id })
    .from(localBusinesses)
    .where(or(...conditions))
    .limit(1);

  return existing.length > 0;
}

export function calculateLeadScore(result: PlacesResult): number {
  let score = 0;
  if (result.website) score += 1;
  if (result.rating > 4.0) score += 1;
  if (result.reviewCount > 20) score += 1;
  if (result.phone) score += 1;
  if (result.rating >= 4.5 && result.reviewCount > 50) score += 1;
  return score;
}
