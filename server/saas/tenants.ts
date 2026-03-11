import { db } from "../db";
import { companies } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function getCompany(id: string) {
  const [company] = await db.select().from(companies).where(eq(companies.id, id));
  return company || undefined;
}

export async function getCompanyBySlug(slug: string) {
  const [company] = await db.select().from(companies).where(eq(companies.slug, slug));
  return company || undefined;
}

export async function createCompany(data: {
  name: string;
  slug: string;
  ownerEmail: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  industry?: string;
}) {
  const [company] = await db.insert(companies).values(data).returning();
  return company;
}

export async function updateCompany(id: string, data: Partial<typeof companies.$inferSelect>) {
  const [company] = await db
    .update(companies)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(companies.id, id))
    .returning();
  return company || undefined;
}

export async function getAllCompanies() {
  return db.select().from(companies);
}
