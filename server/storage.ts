import { type User, type UserWithPasswordHash, type InsertUser, type ContactMessage, type InsertContactMessage, type Booking, type InsertBooking, type Quote, type InsertQuote, type EmailCampaign, type InsertEmailCampaign, type ReviewRequest, type InsertReviewRequest, users, contactMessages, bookings, quotes, emailCampaigns, reviewRequests } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";
import * as bcrypt from "bcrypt";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserWithPasswordHash(username: string): Promise<UserWithPasswordHash | undefined>;
  createUser(user: InsertUser): Promise<User>;
  verifyPassword(password: string, passwordHash: string): Promise<boolean>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingPaymentIntent(id: string, paymentIntentId: string): Promise<Booking | undefined>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;
  getBooking(id: string): Promise<Booking | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  getAllEmailSubscribers(): Promise<{ email: string; name: string; source: string }[]>;
  getEmailCampaigns(): Promise<EmailCampaign[]>;
  createEmailCampaign(campaign: InsertEmailCampaign): Promise<EmailCampaign>;
  updateEmailCampaignStatus(id: string, status: string, recipientCount?: number, sentAt?: Date): Promise<EmailCampaign | undefined>;
  createReviewRequest(reviewRequest: InsertReviewRequest): Promise<ReviewRequest>;
  getAllReviewRequests(): Promise<ReviewRequest[]>;
  getReviewRequestsByBooking(bookingId: string): Promise<ReviewRequest[]>;
  updateReviewRequestStatus(id: string, emailSent: boolean, smsSent: boolean): Promise<ReviewRequest | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select({
      id: users.id,
      username: users.username,
    }).from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select({
      id: users.id,
      username: users.username,
    }).from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserWithPasswordHash(username: string): Promise<UserWithPasswordHash | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(insertUser.password, saltRounds);
      
      const [user] = await db
        .insert(users)
        .values({
          username: insertUser.username,
          passwordHash: passwordHash,
        })
        .returning({
          id: users.id,
          username: users.username,
        });
      return user;
    } catch (error: any) {
      if (error.code === '23505') { // PostgreSQL unique constraint violation
        throw new Error('Username already exists');
      }
      throw error;
    }
  }

  async verifyPassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db
      .insert(bookings)
      .values(insertBooking)
      .returning();
    return booking;
  }

  async updateBookingPaymentIntent(id: string, paymentIntentId: string): Promise<Booking | undefined> {
    const [booking] = await db
      .update(bookings)
      .set({ paymentIntentId })
      .where(eq(bookings.id, id))
      .returning();
    return booking || undefined;
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const [booking] = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();
    return booking || undefined;
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    const [quote] = await db.select().from(quotes).where(eq(quotes.id, id));
    return quote || undefined;
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const [quote] = await db
      .insert(quotes)
      .values(insertQuote)
      .returning();
    return quote;
  }

  async getAllEmailSubscribers(): Promise<{ email: string; name: string; source: string }[]> {
    // Get unique emails from all sources: contact messages, bookings, and quotes
    const contactEmails = await db
      .selectDistinct({
        email: contactMessages.email,
        name: sql<string>`${contactMessages.firstName} || ' ' || ${contactMessages.lastName}`,
        source: sql<string>`'contact'`,
      })
      .from(contactMessages);

    const bookingEmails = await db
      .selectDistinct({
        email: bookings.email,
        name: sql<string>`${bookings.firstName} || ' ' || ${bookings.lastName}`,
        source: sql<string>`'booking'`,
      })
      .from(bookings);

    const quoteEmails = await db
      .selectDistinct({
        email: quotes.email,
        name: quotes.name,
        source: sql<string>`'quote'`,
      })
      .from(quotes);

    // Combine and deduplicate by normalized email (lowercase, trimmed)
    const allEmails = [...contactEmails, ...bookingEmails, ...quoteEmails];
    const uniqueEmailMap = new Map<string, { email: string; name: string; source: string }>();

    allEmails.forEach(item => {
      const normalizedEmail = item.email.toLowerCase().trim();
      if (!uniqueEmailMap.has(normalizedEmail)) {
        uniqueEmailMap.set(normalizedEmail, {
          email: normalizedEmail,
          name: item.name,
          source: item.source
        });
      }
    });

    return Array.from(uniqueEmailMap.values());
  }

  async getEmailCampaigns(): Promise<EmailCampaign[]> {
    return db.select().from(emailCampaigns).orderBy(emailCampaigns.createdAt);
  }

  async createEmailCampaign(insertCampaign: InsertEmailCampaign): Promise<EmailCampaign> {
    const [campaign] = await db
      .insert(emailCampaigns)
      .values(insertCampaign)
      .returning();
    return campaign;
  }

  async updateEmailCampaignStatus(
    id: string,
    status: string,
    recipientCount?: number,
    sentAt?: Date
  ): Promise<EmailCampaign | undefined> {
    const updateData: any = { status };
    if (recipientCount !== undefined) updateData.recipientCount = recipientCount;
    if (sentAt !== undefined) updateData.sentAt = sentAt;

    const [campaign] = await db
      .update(emailCampaigns)
      .set(updateData)
      .where(eq(emailCampaigns.id, id))
      .returning();
    return campaign || undefined;
  }

  async createReviewRequest(insertReviewRequest: InsertReviewRequest): Promise<ReviewRequest> {
    const [reviewRequest] = await db
      .insert(reviewRequests)
      .values(insertReviewRequest)
      .returning();
    return reviewRequest;
  }

  async getAllReviewRequests(): Promise<ReviewRequest[]> {
    return db.select().from(reviewRequests).orderBy(reviewRequests.createdAt);
  }

  async getReviewRequestsByBooking(bookingId: string): Promise<ReviewRequest[]> {
    return db.select().from(reviewRequests).where(eq(reviewRequests.bookingId, bookingId));
  }

  async updateReviewRequestStatus(id: string, emailSent: boolean, smsSent: boolean): Promise<ReviewRequest | undefined> {
    const updateData: any = {};
    
    if (emailSent) {
      updateData.emailSent = true;
      updateData.emailSentAt = new Date();
      updateData.status = 'sent';
    }
    
    if (smsSent) {
      updateData.smsSent = true;
      updateData.smsSentAt = new Date();
      updateData.status = 'sent';
    }

    const [reviewRequest] = await db
      .update(reviewRequests)
      .set(updateData)
      .where(eq(reviewRequests.id, id))
      .returning();
    return reviewRequest || undefined;
  }
}

export const storage = new DatabaseStorage();
