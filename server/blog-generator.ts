import { db } from "./db";
import { blogArticles } from "@shared/schema";
import { eq, desc, count } from "drizzle-orm";
import { generateText } from "./hooks/openai-helpers";
import { BUSINESS_NAME, BUSINESS_PHONE, SERVICE_AREAS } from "./config";

const BLOG_CATEGORIES = [
  "Cleaning Tips",
  "Pricing Guide",
  "Airbnb Tips",
  "Seasonal Cleaning",
  "Moving Tips",
  "Green Cleaning",
  "Expert Tips",
  "Business Tips",
  "Home Maintenance",
];

const TOPIC_IDEAS = [
  "best cleaning schedule for busy families in {area}",
  "how to remove stubborn stains from carpet in Alabama homes",
  "top 10 reasons to hire a professional cleaner in {area}",
  "cleaning checklist before selling your home in {area}",
  "pet-friendly cleaning products safe for Alabama families",
  "how to prepare your home for holiday guests in {area}",
  "why regular cleaning prevents expensive repairs",
  "airbnb host cleaning tips for 5-star reviews in {area}",
  "deep cleaning vs standard cleaning — which do you need",
  "office cleaning benefits that boost employee productivity",
  "how {area} humidity affects your home — cleaning solutions",
  "move out cleaning checklist for {area} renters",
  "seasonal allergen cleaning guide for Alabama",
  "bathroom deep cleaning hacks from professional cleaners",
  "kitchen grease removal tips from {area} cleaning pros",
  "how often should you clean your {area} rental property",
  "eco friendly cleaning alternatives that actually work",
  "post-construction cleaning guide for new {area} homes",
  "commercial cleaning standards for {area} small businesses",
  "cleaning mistakes most homeowners make in Alabama",
];

function getRandomArea(): string {
  return SERVICE_AREAS[Math.floor(Math.random() * SERVICE_AREAS.length)];
}

function getRandomTopic(): string {
  const topic = TOPIC_IDEAS[Math.floor(Math.random() * TOPIC_IDEAS.length)];
  return topic.replace(/\{area\}/g, getRandomArea());
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 80);
}

function estimateReadTime(content: string): string {
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.max(3, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

export async function generateBlogArticle(params?: {
  topic?: string;
  category?: string;
  targetKeywords?: string;
}): Promise<{ id: string; title: string; slug: string }> {
  const topic = params?.topic || getRandomTopic();
  const category = params?.category || BLOG_CATEGORIES[Math.floor(Math.random() * BLOG_CATEGORIES.length)];

  const systemPrompt = `You are an expert SEO content writer for a professional cleaning company called "${BUSINESS_NAME}" based in Montgomery, Alabama. You write helpful, locally-relevant articles that rank well in Google. Your writing is warm, practical, and authoritative — you draw on 16 years of professional cleaning experience. Always reference specific Alabama cities (${SERVICE_AREAS.join(", ")}) naturally. Include actionable tips readers can use immediately.`;

  const prompt = `Write a comprehensive blog article about: "${topic}"

Category: ${category}
${params?.targetKeywords ? `Target Keywords: ${params.targetKeywords}` : ""}

Requirements:
1. SEO-optimized title (50-65 characters, include location if natural)
2. Compelling excerpt (150-160 characters for meta description)
3. 800-1200 word article with proper HTML formatting (use <h2>, <h3>, <p>, <ul>, <li>, <strong> tags)
4. Include 3-5 section headings
5. Naturally mention ${BUSINESS_NAME} and ${BUSINESS_PHONE} where appropriate
6. Include local Montgomery/Alabama references
7. End with a subtle CTA encouraging readers to book a cleaning

Return ONLY valid JSON in this exact format:
{
  "title": "Article Title Here",
  "excerpt": "Short meta description here",
  "content": "<h2>First Section</h2><p>Content...</p>",
  "keywords": "keyword1, keyword2, keyword3, keyword4, keyword5",
  "metaDescription": "Meta description for SEO"
}`;

  const response = await generateText(prompt, systemPrompt, {
    maxTokens: 3000,
    temperature: 0.8,
  });

  let parsed: any;
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");
    parsed = JSON.parse(jsonMatch[0]);
  } catch (e) {
    throw new Error(`Failed to parse AI response: ${e}`);
  }

  const slug = slugify(parsed.title);
  const readTime = estimateReadTime(parsed.content);

  const [article] = await db
    .insert(blogArticles)
    .values({
      title: parsed.title,
      slug,
      excerpt: parsed.excerpt,
      content: parsed.content,
      category,
      keywords: parsed.keywords || topic,
      metaDescription: parsed.metaDescription || parsed.excerpt,
      readTime,
      status: "draft",
    })
    .returning();

  return { id: article.id, title: article.title, slug: article.slug };
}

export async function publishBlogArticle(id: string) {
  const [article] = await db
    .update(blogArticles)
    .set({ status: "published", publishedAt: new Date() })
    .where(eq(blogArticles.id, id))
    .returning();
  return article;
}

export async function unpublishBlogArticle(id: string) {
  const [article] = await db
    .update(blogArticles)
    .set({ status: "draft", publishedAt: null })
    .where(eq(blogArticles.id, id))
    .returning();
  return article;
}

export async function getBlogArticles(status?: string) {
  if (status) {
    return db
      .select()
      .from(blogArticles)
      .where(eq(blogArticles.status, status))
      .orderBy(desc(blogArticles.createdAt));
  }
  return db.select().from(blogArticles).orderBy(desc(blogArticles.createdAt));
}

export async function getBlogArticleBySlug(slug: string) {
  const [article] = await db
    .select()
    .from(blogArticles)
    .where(eq(blogArticles.slug, slug));
  return article;
}

export async function deleteBlogArticle(id: string) {
  await db.delete(blogArticles).where(eq(blogArticles.id, id));
}

export async function getBlogStats() {
  const all = await db.select({ count: count() }).from(blogArticles);
  const published = await db
    .select({ count: count() })
    .from(blogArticles)
    .where(eq(blogArticles.status, "published"));
  const drafts = await db
    .select({ count: count() })
    .from(blogArticles)
    .where(eq(blogArticles.status, "draft"));
  return {
    total: all[0].count,
    published: published[0].count,
    drafts: drafts[0].count,
  };
}
