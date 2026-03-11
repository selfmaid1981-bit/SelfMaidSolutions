import { type User, type UserWithPasswordHash, type InsertUser, type ContactMessage, type InsertContactMessage, type Booking, type InsertBooking, type Quote, type InsertQuote, type EmailCampaign, type InsertEmailCampaign, type ReviewRequest, type InsertReviewRequest, type Lead, type InsertLead, type Client, type InsertClient, type Appointment, type InsertAppointment, type Job, type InsertJob, users, contactMessages, bookings, quotes, emailCampaigns, reviewRequests, leads, clients, appointments, jobs } from "@shared/schema";
import { db } from "./db";
import { eq, sql, desc, and, count } from "drizzle-orm";
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
  getLeads(companyId?: string): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: string, data: Partial<Lead>): Promise<Lead | undefined>;
  deleteLead(id: string): Promise<boolean>;
  getClients(companyId?: string): Promise<Client[]>;
  getClient(id: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, data: Partial<Client>): Promise<Client | undefined>;
  getAppointments(companyId?: string): Promise<Appointment[]>;
  getAppointment(id: string): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: string, data: Partial<Appointment>): Promise<Appointment | undefined>;
  getJobs(companyId?: string): Promise<Job[]>;
  getJob(id: string): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: string, data: Partial<Job>): Promise<Job | undefined>;
  getCrmStats(companyId?: string): Promise<CrmStats>;
}

export interface CrmStats {
  totalLeads: number;
  totalClients: number;
  totalAppointments: number;
  totalJobs: number;
  leadsByStage: Record<string, number>;
  jobsByStatus: Record<string, number>;
  recentLeads: Lead[];
  recentJobs: Job[];
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
      if (error.code === '23505') {
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

  async getLeads(companyId?: string): Promise<Lead[]> {
    if (companyId) {
      return db.select().from(leads).where(eq(leads.companyId, companyId)).orderBy(desc(leads.createdAt));
    }
    return db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLead(id: string): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead || undefined;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async updateLead(id: string, data: Partial<Lead>): Promise<Lead | undefined> {
    const [lead] = await db.update(leads).set({ ...data, updatedAt: new Date() }).where(eq(leads.id, id)).returning();
    return lead || undefined;
  }

  async deleteLead(id: string): Promise<boolean> {
    const result = await db.delete(leads).where(eq(leads.id, id));
    return true;
  }

  async getClients(companyId?: string): Promise<Client[]> {
    if (companyId) {
      return db.select().from(clients).where(eq(clients.companyId, companyId)).orderBy(desc(clients.createdAt));
    }
    return db.select().from(clients).orderBy(desc(clients.createdAt));
  }

  async getClient(id: string): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client || undefined;
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const [client] = await db.insert(clients).values(insertClient).returning();
    return client;
  }

  async updateClient(id: string, data: Partial<Client>): Promise<Client | undefined> {
    const [client] = await db.update(clients).set({ ...data, updatedAt: new Date() }).where(eq(clients.id, id)).returning();
    return client || undefined;
  }

  async getAppointments(companyId?: string): Promise<Appointment[]> {
    if (companyId) {
      return db.select().from(appointments).where(eq(appointments.companyId, companyId)).orderBy(desc(appointments.scheduledDate));
    }
    return db.select().from(appointments).orderBy(desc(appointments.scheduledDate));
  }

  async getAppointment(id: string): Promise<Appointment | undefined> {
    const [appt] = await db.select().from(appointments).where(eq(appointments.id, id));
    return appt || undefined;
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const [appt] = await db.insert(appointments).values(insertAppointment).returning();
    return appt;
  }

  async updateAppointment(id: string, data: Partial<Appointment>): Promise<Appointment | undefined> {
    const [appt] = await db.update(appointments).set({ ...data, updatedAt: new Date() }).where(eq(appointments.id, id)).returning();
    return appt || undefined;
  }

  async getJobs(companyId?: string): Promise<Job[]> {
    if (companyId) {
      return db.select().from(jobs).where(eq(jobs.companyId, companyId)).orderBy(desc(jobs.createdAt));
    }
    return db.select().from(jobs).orderBy(desc(jobs.createdAt));
  }

  async getJob(id: string): Promise<Job | undefined> {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, id));
    return job || undefined;
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const [job] = await db.insert(jobs).values(insertJob).returning();
    return job;
  }

  async updateJob(id: string, data: Partial<Job>): Promise<Job | undefined> {
    const [job] = await db.update(jobs).set({ ...data, updatedAt: new Date() }).where(eq(jobs.id, id)).returning();
    return job || undefined;
  }

  async getCrmStats(companyId?: string): Promise<CrmStats> {
    const allLeads = await this.getLeads(companyId);
    const allClients = await this.getClients(companyId);
    const allAppointments = await this.getAppointments(companyId);
    const allJobs = await this.getJobs(companyId);

    const leadsByStage: Record<string, number> = {};
    allLeads.forEach(l => {
      leadsByStage[l.pipelineStage] = (leadsByStage[l.pipelineStage] || 0) + 1;
    });

    const jobsByStatus: Record<string, number> = {};
    allJobs.forEach(j => {
      jobsByStatus[j.status] = (jobsByStatus[j.status] || 0) + 1;
    });

    return {
      totalLeads: allLeads.length,
      totalClients: allClients.length,
      totalAppointments: allAppointments.length,
      totalJobs: allJobs.length,
      leadsByStage,
      jobsByStatus,
      recentLeads: allLeads.slice(0, 5),
      recentJobs: allJobs.slice(0, 5),
    };
  }
}

export const storage = new DatabaseStorage();
