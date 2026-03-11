import { db } from "../db";
import { businessEmails, localBusinesses } from "@shared/schema";
import { eq } from "drizzle-orm";

const HUNTER_API_BASE = "https://api.hunter.io/v2";

interface HunterEmailResult {
  email: string;
  firstName?: string;
  lastName?: string;
  position?: string;
  confidence: number;
  type: "personal" | "generic";
}

interface DomainSearchResult {
  domain: string;
  emails: HunterEmailResult[];
  organization?: string;
  total: number;
}

interface EmailVerifyResult {
  email: string;
  status: "valid" | "invalid" | "accept_all" | "unknown";
  score: number;
}

function getApiKey(): string {
  const key = process.env.HUNTER_API_KEY;
  if (!key) throw new Error("HUNTER_API_KEY environment variable is not set");
  return key;
}

export async function searchDomainEmails(domain: string, limit: number = 10): Promise<DomainSearchResult> {
  const apiKey = getApiKey();
  const url = `${HUNTER_API_BASE}/domain-search?domain=${encodeURIComponent(domain)}&limit=${limit}&api_key=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Hunter domain-search failed (${response.status}): ${err}`);
  }

  const data = await response.json();
  const d = data.data;

  return {
    domain,
    organization: d.organization,
    total: d.total || 0,
    emails: (d.emails || []).map((e: any) => ({
      email: e.value,
      firstName: e.first_name,
      lastName: e.last_name,
      position: e.position,
      confidence: e.confidence,
      type: e.type,
    })),
  };
}

export async function findEmail(
  domain: string,
  firstName: string,
  lastName: string
): Promise<{ email: string; confidence: number } | null> {
  const apiKey = getApiKey();
  const url = `${HUNTER_API_BASE}/email-finder?domain=${encodeURIComponent(domain)}&first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}&api_key=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) return null;

  const data = await response.json();
  if (!data.data?.email) return null;

  return {
    email: data.data.email,
    confidence: data.data.confidence,
  };
}

export async function verifyEmail(email: string): Promise<EmailVerifyResult> {
  const apiKey = getApiKey();
  const url = `${HUNTER_API_BASE}/email-verifier?email=${encodeURIComponent(email)}&api_key=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Hunter verify failed (${response.status})`);
  }

  const data = await response.json();
  return {
    email: data.data.email,
    status: data.data.status,
    score: data.data.score,
  };
}

export async function enrichBusinessEmails(localBusinessId: string): Promise<number> {
  const [business] = await db
    .select()
    .from(localBusinesses)
    .where(eq(localBusinesses.id, localBusinessId))
    .limit(1);

  if (!business || !business.website) return 0;

  let domain: string;
  try {
    domain = new URL(
      business.website.startsWith("http") ? business.website : `https://${business.website}`
    ).hostname.replace(/^www\./, "");
  } catch {
    return 0;
  }

  const result = await searchDomainEmails(domain, 5);
  let saved = 0;

  for (const emailResult of result.emails) {
    if (emailResult.confidence < 50) continue;

    try {
      await db.insert(businessEmails).values({
        localBusinessId,
        email: emailResult.email,
        source: "hunter",
        verified: emailResult.confidence >= 90,
      });
      saved++;
    } catch {
      // duplicate email, skip
    }
  }

  return saved;
}

export async function getHunterAccountStatus(): Promise<{
  available: boolean;
  remaining?: number;
  resetDate?: string;
}> {
  try {
    const apiKey = getApiKey();
    const url = `${HUNTER_API_BASE}/account?api_key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) return { available: false };

    const data = await response.json();
    const requests = data.data?.requests;
    return {
      available: true,
      remaining: requests?.searches?.available - requests?.searches?.used,
      resetDate: requests?.reset_date,
    };
  } catch {
    return { available: false };
  }
}

export type { HunterEmailResult, DomainSearchResult, EmailVerifyResult };
