import { db } from "./db";
import { socialPosts } from "@shared/schema";
import { eq, desc, and, lte, count } from "drizzle-orm";
import { generateText } from "./hooks/openai-helpers";
import { BUSINESS_NAME, BUSINESS_PHONE, SERVICE_AREAS } from "./config";

const PLATFORMS = ["facebook", "instagram", "tiktok", "google_business"] as const;
type Platform = (typeof PLATFORMS)[number];

const POST_TYPES: Record<Platform, string[]> = {
  facebook: ["tip", "before_after", "promo", "testimonial", "seasonal", "engagement"],
  instagram: ["reel_script", "carousel_caption", "story_prompt", "post_caption"],
  tiktok: ["script", "trending_hook", "tip_video"],
  google_business: ["update", "offer", "event"],
};

const PLATFORM_GUIDELINES: Record<Platform, string> = {
  facebook: `Facebook post. Conversational, relatable. 1-3 sentences max for engagement. Use emojis sparingly. Ask a question to drive comments. Include CTA.`,
  instagram: `Instagram caption. Visual-first, punchy. Include 10-15 relevant hashtags at the end. Use line breaks for readability. Include location tags.`,
  tiktok: `TikTok script/caption. Hook in first line. Authentic, not corporate. Use trending format. Keep it under 150 chars for caption. Include 3-5 trending hashtags.`,
  google_business: `Google Business Profile post. Professional, informative. 150-300 chars. Include a clear CTA with phone number or booking link. Mention Montgomery AL.`,
};

const CONTENT_THEMES = [
  "before and after transformation",
  "cleaning tip of the week",
  "behind the scenes team moment",
  "customer testimonial highlight",
  "seasonal cleaning reminder",
  "fun cleaning fact or myth busting",
  "why hire a professional cleaner",
  "special offer or discount",
  "home maintenance tip",
  "cleaning product recommendation",
  "airbnb host tip",
  "team spotlight / meet the crew",
];

export async function generateSocialPost(params?: {
  platform?: Platform;
  postType?: string;
  theme?: string;
  scheduledFor?: string;
}): Promise<{ id: string; platform: string; content: string }> {
  const platform = params?.platform || PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
  const types = POST_TYPES[platform];
  const postType = params?.postType || types[Math.floor(Math.random() * types.length)];
  const theme = params?.theme || CONTENT_THEMES[Math.floor(Math.random() * CONTENT_THEMES.length)];
  const area = SERVICE_AREAS[Math.floor(Math.random() * SERVICE_AREAS.length)];

  const systemPrompt = `You are a social media manager for "${BUSINESS_NAME}", a professional cleaning company serving ${SERVICE_AREAS.join(", ")} in Alabama. You create engaging, authentic content that drives bookings. Phone: ${BUSINESS_PHONE}. 16 years of experience. Your tone is warm, professional, and locally connected.`;

  const prompt = `Create a ${platform} ${postType.replace(/_/g, " ")} post about: "${theme}"

${PLATFORM_GUIDELINES[platform]}

Location focus: ${area}, Alabama
Day of week context: ${new Date().toLocaleDateString("en-US", { weekday: "long" })}

Return ONLY valid JSON:
{
  "content": "The post content here",
  "hashtags": "#hashtag1 #hashtag2 #hashtag3"
}`;

  const response = await generateText(prompt, systemPrompt, {
    maxTokens: 800,
    temperature: 0.85,
  });

  let parsed: any;
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found");
    parsed = JSON.parse(jsonMatch[0]);
  } catch (e) {
    throw new Error(`Failed to parse AI response: ${e}`);
  }

  const scheduledDate = params?.scheduledFor ? new Date(params.scheduledFor) : null;

  const [post] = await db
    .insert(socialPosts)
    .values({
      platform,
      postType,
      content: parsed.content,
      hashtags: parsed.hashtags || "",
      scheduledFor: scheduledDate,
      status: scheduledDate ? "scheduled" : "draft",
    })
    .returning();

  return { id: post.id, platform: post.platform, content: post.content };
}

export async function generateWeeklyBatch(): Promise<{ generated: number; posts: any[] }> {
  const posts = [];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const schedule: { platform: Platform; theme: string }[] = [
    { platform: "facebook", theme: "cleaning tip of the week" },
    { platform: "instagram", theme: "before and after transformation" },
    { platform: "facebook", theme: "customer testimonial highlight" },
    { platform: "instagram", theme: "behind the scenes team moment" },
    { platform: "tiktok", theme: "fun cleaning fact or myth busting" },
    { platform: "google_business", theme: "special offer or discount" },
    { platform: "facebook", theme: "seasonal cleaning reminder" },
  ];

  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7 || 7));
  monday.setHours(10, 0, 0, 0);

  for (let i = 0; i < schedule.length; i++) {
    const scheduledDate = new Date(monday);
    scheduledDate.setDate(monday.getDate() + i);

    try {
      const post = await generateSocialPost({
        platform: schedule[i].platform,
        theme: schedule[i].theme,
        scheduledFor: scheduledDate.toISOString(),
      });
      posts.push(post);
    } catch (e) {
      console.error(`[Social] Failed to generate ${days[i]} post:`, e);
    }
  }

  return { generated: posts.length, posts };
}

export async function getSocialPosts(status?: string) {
  if (status) {
    return db
      .select()
      .from(socialPosts)
      .where(eq(socialPosts.status, status))
      .orderBy(desc(socialPosts.scheduledFor));
  }
  return db.select().from(socialPosts).orderBy(desc(socialPosts.createdAt));
}

export async function updateSocialPostStatus(id: string, status: string) {
  const updates: any = { status };
  if (status === "posted") updates.postedAt = new Date();
  const [post] = await db
    .update(socialPosts)
    .set(updates)
    .where(eq(socialPosts.id, id))
    .returning();
  return post;
}

export async function deleteSocialPost(id: string) {
  await db.delete(socialPosts).where(eq(socialPosts.id, id));
}

export async function getSocialStats() {
  const all = await db.select({ count: count() }).from(socialPosts);
  const scheduled = await db
    .select({ count: count() })
    .from(socialPosts)
    .where(eq(socialPosts.status, "scheduled"));
  const posted = await db
    .select({ count: count() })
    .from(socialPosts)
    .where(eq(socialPosts.status, "posted"));
  const drafts = await db
    .select({ count: count() })
    .from(socialPosts)
    .where(eq(socialPosts.status, "draft"));
  return {
    total: all[0].count,
    scheduled: scheduled[0].count,
    posted: posted[0].count,
    drafts: drafts[0].count,
  };
}
