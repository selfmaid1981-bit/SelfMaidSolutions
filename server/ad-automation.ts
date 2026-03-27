import { db } from "./db";
import { adCampaigns, insertAdCampaignSchema } from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { generateText } from "./hooks/openai-helpers";
import { BUSINESS_NAME, BUSINESS_PHONE, SERVICE_AREAS } from "./config";

const PLATFORMS = ["facebook", "instagram", "youtube", "tiktok"] as const;
type Platform = typeof PLATFORMS[number];

const AD_TYPES: Record<Platform, string[]> = {
  facebook: ["feed_post", "story", "carousel", "video_ad"],
  instagram: ["feed_post", "story", "reel", "carousel"],
  youtube: ["short", "pre_roll", "description"],
  tiktok: ["organic", "spark_ad", "in_feed"],
};

const SERVICES = [
  "Standard Cleaning",
  "Deep Cleaning",
  "Move-In/Move-Out Cleaning",
  "Airbnb/Vacation Rental",
  "Commercial Cleaning",
];

const PLATFORM_INSTRUCTIONS: Record<Platform, string> = {
  facebook: `Facebook ad. Conversational, benefit-driven. Use emojis sparingly. Include a clear CTA. Primary text: 125 chars max for feed preview. Headline: 40 chars max.`,
  instagram: `Instagram ad. Visual-first, punchy. Use relevant emojis. Include 5-10 hashtags. Caption: 150 chars for preview. Headline: short and catchy.`,
  youtube: `YouTube ad script. Hook in first 5 seconds. Speak directly to viewer. Include verbal CTA. Short description for video description box.`,
  tiktok: `TikTok ad/script. Trending, authentic tone. Hook in first 2 seconds. Use trending hashtags. Keep it raw and relatable, not corporate. Caption: 150 chars max.`,
};

function getSeasonalContext(): string {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "Spring cleaning season — deep cleans, fresh starts, allergy season.";
  if (month >= 5 && month <= 7) return "Summer — Airbnb turnover, vacation rentals, move-in/move-out season.";
  if (month >= 8 && month <= 9) return "Back-to-school — busy families need help, post-summer refresh.";
  return "Holiday season — hosting guests, end-of-year deep cleans, gift certificates.";
}

export async function generateAdContent(params: {
  platform: Platform;
  adType: string;
  serviceType?: string;
  tone?: string;
  promoOffer?: string;
}): Promise<{
  headline: string;
  primaryText: string;
  description: string;
  callToAction: string;
  hashtags: string;
  targetAudience: string;
}> {
  const { platform, adType, serviceType, tone, promoOffer } = params;

  const systemPrompt = `You are an expert social media ad copywriter for local service businesses. You write high-converting ads for cleaning companies. Always be authentic, never generic. Write for real people in Montgomery, Alabama.`;

  const prompt = `Create a ${platform} ${adType.replace(/_/g, " ")} ad for "${BUSINESS_NAME}" — a professional cleaning company in Montgomery, AL.

${PLATFORM_INSTRUCTIONS[platform]}

${serviceType ? `Service to promote: ${serviceType}` : "Promote the business generally."}
${promoOffer ? `Special offer: ${promoOffer}` : ""}
Tone: ${tone || "professional but warm, trustworthy, local"}
Season context: ${getSeasonalContext()}
Service areas: ${SERVICE_AREAS.slice(0, 5).join(", ")}
Phone: ${BUSINESS_PHONE}

Return ONLY valid JSON with these exact keys:
{
  "headline": "the main headline or hook",
  "primaryText": "the main ad copy / caption / script",
  "description": "supporting text or video description",
  "callToAction": "CTA button text or verbal CTA",
  "hashtags": "relevant hashtags separated by spaces",
  "targetAudience": "brief description of who this ad targets"
}`;

  const result = await generateText(prompt, systemPrompt, {
    maxTokens: 1024,
    temperature: 0.8,
  });

  const jsonMatch = result.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to parse AI response");

  return JSON.parse(jsonMatch[0]);
}

export async function generateBatchAds(params: {
  platforms: Platform[];
  serviceType?: string;
  promoOffer?: string;
  count?: number;
}): Promise<{ platform: string; adType: string; content: any }[]> {
  const { platforms, serviceType, promoOffer, count = 1 } = params;
  const results: { platform: string; adType: string; content: any }[] = [];

  for (const platform of platforms) {
    const types = AD_TYPES[platform];
    const selectedTypes = types.slice(0, count);

    for (const adType of selectedTypes) {
      try {
        const content = await generateAdContent({
          platform,
          adType,
          serviceType,
          promoOffer,
        });
        results.push({ platform, adType, content });
      } catch (err) {
        console.error(`[Ad Automation] Failed generating ${platform}/${adType}:`, err);
      }
    }
  }

  return results;
}

export async function saveAdCampaign(data: {
  platform: string;
  adType: string;
  serviceType?: string;
  headline: string;
  primaryText: string;
  description?: string;
  callToAction?: string;
  hashtags?: string;
  targetAudience?: string;
  status?: string;
  scheduledDate?: string;
}) {
  const parsed = insertAdCampaignSchema.parse(data);
  const [result] = await db.insert(adCampaigns).values(parsed).returning();
  return result;
}

export async function getAdCampaigns(limit = 50) {
  return db.select().from(adCampaigns).orderBy(desc(adCampaigns.createdAt)).limit(limit);
}

export async function updateAdStatus(id: string, status: string) {
  const [result] = await db
    .update(adCampaigns)
    .set({ status })
    .where(eq(adCampaigns.id, id))
    .returning();
  return result;
}

export async function deleteAdCampaign(id: string) {
  await db.delete(adCampaigns).where(eq(adCampaigns.id, id));
}

export function getAvailablePlatforms() {
  return PLATFORMS.map((p) => ({
    id: p,
    name: p.charAt(0).toUpperCase() + p.slice(1),
    adTypes: AD_TYPES[p].map((t) => ({
      id: t,
      name: t.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    })),
  }));
}

export function getAvailableServices() {
  return SERVICES;
}
