import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, index, jsonb, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);

// ==================== MULTI-TENANT CORE ====================

export const companies = pgTable(
  "companies",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    slug: text("slug").unique().notNull(),
    ownerId: varchar("owner_id"),
    industry: text("industry"),
    phone: text("phone"),
    email: text("email"),
    address: text("address"),
    city: text("city"),
    state: text("state"),
    zipCode: text("zip_code"),
    logoUrl: text("logo_url"),
    website: text("website"),
    stripeCustomerId: text("stripe_customer_id"),
    subscriptionTier: text("subscription_tier").default("starter"),
    subscriptionStatus: text("subscription_status").default("trialing"),
    settings: jsonb("settings"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("IDX_companies_slug").on(table.slug),
    index("IDX_companies_owner").on(table.ownerId),
  ]
);

// User storage table - compatible with Replit Auth
export const users = pgTable(
  "users",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    companyId: varchar("company_id"),
    username: text("username").unique(),
    passwordHash: text("password_hash"),
    role: text("role").notNull().default("customer"),
    email: text("email").unique(),
    phone: text("phone"),
    firstName: text("first_name"),
    lastName: text("last_name"),
    profileImageUrl: text("profile_image_url"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("IDX_users_company").on(table.companyId),
    index("IDX_users_email").on(table.email),
    index("IDX_users_role").on(table.role),
  ]
);

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// ==================== EXISTING TABLES (PRESERVED) ====================

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  serviceType: text("service_type").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable(
  "bookings",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    companyId: varchar("company_id"),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    serviceType: text("service_type").notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    zipCode: text("zip_code").notNull(),
    preferredDate: text("preferred_date").notNull(),
    preferredTime: text("preferred_time").notNull(),
    specialInstructions: text("special_instructions"),
    amount: integer("amount").notNull(),
    status: text("status").notNull().default("pending"),
    paymentIntentId: text("payment_intent_id"),
    quoteId: varchar("quote_id"),
    assignedCleanerId: varchar("assigned_cleaner_id"),
    customerId: varchar("customer_id"),
    recurringBookingId: varchar("recurring_booking_id"),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("IDX_bookings_company").on(table.companyId),
    index("IDX_bookings_status").on(table.status),
    index("IDX_bookings_email").on(table.email),
  ]
);

export const quotes = pgTable(
  "quotes",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    companyId: varchar("company_id"),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    serviceType: text("service_type").notNull(),
    propertySize: text("property_size"),
    customSqFt: integer("custom_sq_ft"),
    frequency: text("frequency").notNull(),
    addOns: text("add_ons").array().default(sql`ARRAY[]::text[]`),
    estimatedPrice: integer("estimated_price").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("IDX_quotes_company").on(table.companyId),
  ]
);

export const emailCampaigns = pgTable(
  "email_campaigns",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    companyId: varchar("company_id"),
    name: text("name").notNull(),
    subject: text("subject").notNull(),
    htmlContent: text("html_content").notNull(),
    templateType: text("template_type"),
    recipientCount: integer("recipient_count").default(0),
    sentAt: timestamp("sent_at"),
    status: text("status").notNull().default("draft"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("IDX_campaigns_company").on(table.companyId),
    index("IDX_campaigns_status").on(table.status),
  ]
);

export const cleaners = pgTable(
  "cleaners",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    companyId: varchar("company_id"),
    userId: varchar("user_id").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    hourlyRate: integer("hourly_rate"),
    servicesOffered: text("services_offered").array().default(sql`ARRAY[]::text[]`),
    availability: text("availability"),
    rating: integer("rating").default(5),
    totalJobsCompleted: integer("total_jobs_completed").default(0),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("IDX_cleaners_company").on(table.companyId),
    index("IDX_cleaners_user").on(table.userId),
  ]
);

export const recurringBookings = pgTable(
  "recurring_bookings",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    companyId: varchar("company_id"),
    customerId: varchar("customer_id").notNull(),
    customerEmail: text("customer_email").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    phone: text("phone").notNull(),
    serviceType: text("service_type").notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    zipCode: text("zip_code").notNull(),
    frequency: text("frequency").notNull(),
    preferredDayOfWeek: text("preferred_day_of_week"),
    preferredTime: text("preferred_time").notNull(),
    amount: integer("amount").notNull(),
    specialInstructions: text("special_instructions"),
    status: text("status").notNull().default("active"),
    nextScheduledDate: text("next_scheduled_date"),
    stripeSubscriptionId: text("stripe_subscription_id"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("IDX_recurring_company").on(table.companyId),
    index("IDX_recurring_status").on(table.status),
  ]
);

export const referrals = pgTable(
  "referrals",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    companyId: varchar("company_id"),
    referrerEmail: text("referrer_email").notNull(),
    referrerName: text("referrer_name").notNull(),
    referredEmail: text("referred_email").notNull(),
    referredName: text("referred_name").notNull(),
    referredPhone: text("referred_phone"),
    status: text("status").notNull().default("pending"),
    rewardAmount: integer("reward_amount").default(30),
    rewardPaid: boolean("reward_paid").default(false),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("IDX_referrals_company").on(table.companyId),
  ]
);

export const reviewRequests = pgTable(
  "review_requests",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    companyId: varchar("company_id"),
    bookingId: varchar("booking_id").notNull(),
    customerName: text("customer_name").notNull(),
    customerEmail: text("customer_email").notNull(),
    customerPhone: text("customer_phone"),
    serviceType: text("service_type").notNull(),
    serviceDate: text("service_date").notNull(),
    emailSent: boolean("email_sent").default(false),
    emailSentAt: timestamp("email_sent_at"),
    smsSent: boolean("sms_sent").default(false),
    smsSentAt: timestamp("sms_sent_at"),
    reviewCompleted: boolean("review_completed").default(false),
    reviewCompletedAt: timestamp("review_completed_at"),
    status: text("status").notNull().default("pending"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("IDX_reviews_company").on(table.companyId),
    index("IDX_reviews_booking").on(table.bookingId),
  ]
);

// ==================== CRM MODULE ====================

export const leads = pgTable(
  "leads",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    companyId: varchar("company_id"),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email"),
    phone: text("phone"),
    address: text("address"),
    city: text("city"),
    state: text("state"),
    zipCode: text("zip_code"),
    source: text("source").default("website"),
    serviceType: text("service_type"),
    pipelineStage: text("pipeline_stage").notNull().default("new_lead"),
    score: integer("score"),
    notes: text("notes"),
    assignedTo: varchar("assigned_to"),
    lastContactedAt: timestamp("last_contacted_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("IDX_leads_company").on(table.companyId),
    index("IDX_leads_stage").on(table.pipelineStage),
    index("IDX_leads_email").on(table.email),
    index("IDX_leads_assigned").on(table.assignedTo),
    index("IDX_leads_source").on(table.source),
    index("IDX_leads_score").on(table.score),
  ]
);

export const clients = pgTable(
  "clients",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    companyId: varchar("company_id"),
    leadId: varchar("lead_id"),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email"),
    phone: text("phone"),
    address: text("address"),
    city: text("city"),
    state: text("state"),
    zipCode: text("zip_code"),
    lifetimeValue: integer("lifetime_value").default(0),
    totalBookings: integer("total_bookings").default(0),
    stripeCustomerId: text("stripe_customer_id"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("IDX_clients_company").on(table.companyId),
    index("IDX_clients_lead").on(table.leadId),
    index("IDX_clients_email").on(table.email),
    index("IDX_clients_stripe").on(table.stripeCustomerId),
  ]
);

export const appointments = pgTable(
  "appointments",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    companyId: varchar("company_id"),
    clientId: varchar("client_id"),
    leadId: varchar("lead_id"),
    assignedTo: varchar("assigned_to"),
    serviceType: text("service_type").notNull(),
    address: text("address").notNull(),
    city: text("city"),
    state: text("state"),
    zipCode: text("zip_code"),
    scheduledDate: text("scheduled_date").notNull(),
    scheduledTime: text("scheduled_time").notNull(),
    durationMinutes: integer("duration_minutes"),
    amount: integer("amount"),
    status: text("status").notNull().default("scheduled"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("IDX_appointments_company").on(table.companyId),
    index("IDX_appointments_client").on(table.clientId),
    index("IDX_appointments_assigned").on(table.assignedTo),
    index("IDX_appointments_date").on(table.scheduledDate),
    index("IDX_appointments_status").on(table.status),
  ]
);

export const jobs = pgTable(
  "jobs",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    companyId: varchar("company_id"),
    appointmentId: varchar("appointment_id"),
    clientId: varchar("client_id"),
    assignedTo: varchar("assigned_to"),
    status: text("status").notNull().default("assigned"),
    startedAt: timestamp("started_at"),
    completedAt: timestamp("completed_at"),
    checklist: jsonb("checklist"),
    notes: text("notes"),
    photos: text("photos").array().default(sql`ARRAY[]::text[]`),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("IDX_jobs_company").on(table.companyId),
    index("IDX_jobs_appointment").on(table.appointmentId),
    index("IDX_jobs_client").on(table.clientId),
    index("IDX_jobs_assigned").on(table.assignedTo),
    index("IDX_jobs_status").on(table.status),
  ]
);

// ==================== SAAS SUBSCRIPTIONS ====================

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    companyId: varchar("company_id").notNull(),
    stripeSubscriptionId: text("stripe_subscription_id"),
    stripePriceId: text("stripe_price_id"),
    tier: text("tier").notNull().default("starter"),
    status: text("status").notNull().default("trialing"),
    currentPeriodStart: timestamp("current_period_start"),
    currentPeriodEnd: timestamp("current_period_end"),
    cancelAt: timestamp("cancel_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("IDX_subscriptions_company").on(table.companyId),
    index("IDX_subscriptions_stripe").on(table.stripeSubscriptionId),
    index("IDX_subscriptions_status").on(table.status),
  ]
);

// ==================== LEAD DISCOVERY ENGINE ====================

export const localBusinesses = pgTable(
  "local_businesses",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    companyId: varchar("company_id"),
    businessName: text("business_name").notNull(),
    address: text("address"),
    city: text("city"),
    state: text("state"),
    phone: text("phone"),
    website: text("website"),
    rating: numeric("rating"),
    reviewCount: integer("review_count"),
    category: text("category"),
    leadScore: integer("lead_score"),
    status: text("status").notNull().default("discovered"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("IDX_local_biz_company").on(table.companyId),
    index("IDX_local_biz_category").on(table.category),
    index("IDX_local_biz_score").on(table.leadScore),
    index("IDX_local_biz_status").on(table.status),
    index("IDX_local_biz_city").on(table.city),
  ]
);

export const businessEmails = pgTable(
  "business_emails",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    localBusinessId: varchar("local_business_id").notNull(),
    email: text("email").notNull(),
    source: text("source").default("website"),
    verified: boolean("verified").default(false),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("IDX_biz_emails_business").on(table.localBusinessId),
    index("IDX_biz_emails_email").on(table.email),
  ]
);

// ==================== AI RECEPTIONIST (VOICE) ====================

export const callLogs = pgTable(
  "call_logs",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    companyId: varchar("company_id"),
    twilioCallSid: text("twilio_call_sid").unique(),
    callerPhone: text("caller_phone"),
    direction: text("direction").notNull().default("inbound"),
    status: text("status").notNull().default("ringing"),
    durationSeconds: integer("duration_seconds"),
    recordingUrl: text("recording_url"),
    leadId: varchar("lead_id"),
    appointmentId: varchar("appointment_id"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("IDX_calls_company").on(table.companyId),
    index("IDX_calls_sid").on(table.twilioCallSid),
    index("IDX_calls_status").on(table.status),
    index("IDX_calls_direction").on(table.direction),
    index("IDX_calls_lead").on(table.leadId),
  ]
);

export const callTranscripts = pgTable(
  "call_transcripts",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    callLogId: varchar("call_log_id").notNull(),
    transcript: text("transcript").notNull(),
    extractedData: jsonb("extracted_data"),
    aiSummary: text("ai_summary"),
    sentiment: text("sentiment"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("IDX_transcripts_call").on(table.callLogId),
    index("IDX_transcripts_sentiment").on(table.sentiment),
  ]
);

// ==================== INSERT SCHEMAS ====================

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
}).extend({
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const selectUserSchema = createInsertSchema(users).pick({
  id: true,
  username: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  status: true,
  paymentIntentId: true,
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
});

export const insertEmailCampaignSchema = createInsertSchema(emailCampaigns).omit({
  id: true,
  createdAt: true,
  sentAt: true,
});

export const insertCleanerSchema = createInsertSchema(cleaners).omit({
  id: true,
  createdAt: true,
  totalJobsCompleted: true,
});

export const insertRecurringBookingSchema = createInsertSchema(recurringBookings).omit({
  id: true,
  createdAt: true,
});

export const insertReferralSchema = createInsertSchema(referrals).omit({
  id: true,
  createdAt: true,
});

export const insertReviewRequestSchema = createInsertSchema(reviewRequests).omit({
  id: true,
  createdAt: true,
  emailSentAt: true,
  smsSentAt: true,
  reviewCompletedAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLocalBusinessSchema = createInsertSchema(localBusinesses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBusinessEmailSchema = createInsertSchema(businessEmails).omit({
  id: true,
  createdAt: true,
});

export const insertCallLogSchema = createInsertSchema(callLogs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCallTranscriptSchema = createInsertSchema(callTranscripts).omit({
  id: true,
  createdAt: true,
});

// ==================== TYPE EXPORTS ====================

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UserWithPasswordHash = typeof users.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type EmailCampaign = typeof emailCampaigns.$inferSelect;
export type InsertEmailCampaign = z.infer<typeof insertEmailCampaignSchema>;
export type Cleaner = typeof cleaners.$inferSelect;
export type InsertCleaner = z.infer<typeof insertCleanerSchema>;
export type RecurringBooking = typeof recurringBookings.$inferSelect;
export type InsertRecurringBooking = z.infer<typeof insertRecurringBookingSchema>;
export type Referral = typeof referrals.$inferSelect;
export type InsertReferral = z.infer<typeof insertReferralSchema>;
export type ReviewRequest = typeof reviewRequests.$inferSelect;
export type InsertReviewRequest = z.infer<typeof insertReviewRequestSchema>;

export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;
export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type LocalBusiness = typeof localBusinesses.$inferSelect;
export type InsertLocalBusiness = z.infer<typeof insertLocalBusinessSchema>;
export type BusinessEmail = typeof businessEmails.$inferSelect;
export type InsertBusinessEmail = z.infer<typeof insertBusinessEmailSchema>;
export type CallLog = typeof callLogs.$inferSelect;
export type InsertCallLog = z.infer<typeof insertCallLogSchema>;
export type CallTranscript = typeof callTranscripts.$inferSelect;
export type InsertCallTranscript = z.infer<typeof insertCallTranscriptSchema>;

export * from "./models/chat";
