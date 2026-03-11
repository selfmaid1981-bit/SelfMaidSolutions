import { db } from "../db";
import { localBusinesses, businessEmails } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export async function getDiscoveredBusinesses(companyId?: string) {
  if (companyId) {
    return db.select().from(localBusinesses).where(eq(localBusinesses.companyId, companyId)).orderBy(desc(localBusinesses.leadScore));
  }
  return db.select().from(localBusinesses).orderBy(desc(localBusinesses.leadScore));
}

export async function createDiscoveredBusiness(data: {
  companyId?: string;
  businessName: string;
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  website?: string;
  rating?: string;
  reviewCount?: number;
  category?: string;
  leadScore?: number;
}) {
  const [biz] = await db.insert(localBusinesses).values(data).returning();
  return biz;
}

export async function addBusinessEmail(localBusinessId: string, email: string, source: string = "website") {
  const [entry] = await db.insert(businessEmails).values({ localBusinessId, email, source }).returning();
  return entry;
}

export async function getBusinessEmails(localBusinessId: string) {
  return db.select().from(businessEmails).where(eq(businessEmails.localBusinessId, localBusinessId));
}

export async function updateBusinessStatus(id: string, status: string) {
  const [biz] = await db
    .update(localBusinesses)
    .set({ status, updatedAt: new Date() })
    .where(eq(localBusinesses.id, id))
    .returning();
  return biz || undefined;
}
