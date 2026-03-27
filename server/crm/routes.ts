import { Router, Request, Response } from "express";
import { storage } from "../storage";
import { insertLeadSchema, insertClientSchema, insertAppointmentSchema, insertJobSchema, insertCleanerSchema, insertRecurringBookingSchema, insertReferralSchema } from "@shared/schema";
import { onJobCompleted } from "../hooks/review-on-complete";
import { sendRecurringUpsell } from "../hooks/recurring-upsell";
import { getFollowUpStats, processFollowUps } from "../hooks/quote-followup";

const router = Router();

function requireAdmin(req: any, res: any, next: any) {
  const adminKey = process.env.ADMIN_API_KEY;
  const provided = req.headers["x-admin-api-key"];
  if (!adminKey || provided !== adminKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

function pick<T extends Record<string, any>>(obj: T, keys: string[]): Partial<T> {
  const result: any = {};
  for (const key of keys) {
    if (key in obj) result[key] = obj[key];
  }
  return result;
}

const LEAD_MUTABLE = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode", "source", "serviceType", "pipelineStage", "score", "notes", "assignedTo", "lastContactedAt", "followUpStatus", "followUpSmsAt", "followUpEmailAt", "followUpDiscountAt"];
const CLIENT_MUTABLE = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode", "lifetimeValue", "totalBookings", "notes"];
const APPOINTMENT_MUTABLE = ["serviceType", "address", "city", "state", "zipCode", "scheduledDate", "scheduledTime", "durationMinutes", "amount", "status", "notes", "assignedTo", "clientId", "leadId"];
const JOB_MUTABLE = ["status", "assignedTo", "startedAt", "completedAt", "notes", "checklist", "photos"];

router.get("/stats", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const stats = await storage.getCrmStats();
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/followup-stats", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const stats = await getFollowUpStats();
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/followups/process", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const result = await processFollowUps();
    res.json({ success: true, ...result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/leads", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const allLeads = await storage.getLeads();
    res.json(allLeads);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/leads/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const lead = await storage.getLead(req.params.id);
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    res.json(lead);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/leads", requireAdmin, async (req: Request, res: Response) => {
  try {
    const parsed = insertLeadSchema.parse(req.body);
    const lead = await storage.createLead(parsed);
    res.status(201).json(lead);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/leads/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const safe = pick(req.body, LEAD_MUTABLE);
    const lead = await storage.updateLead(req.params.id, safe);
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    res.json(lead);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/leads/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    await storage.deleteLead(req.params.id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/leads/:id/convert", requireAdmin, async (req: Request, res: Response) => {
  try {
    const lead = await storage.getLead(req.params.id);
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    const client = await storage.createClient({
      companyId: lead.companyId,
      leadId: lead.id,
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      phone: lead.phone,
      address: lead.address,
      city: lead.city,
      state: lead.state,
      zipCode: lead.zipCode,
    });
    await storage.updateLead(lead.id, { pipelineStage: "converted" });
    res.status(201).json(client);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/clients", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const allClients = await storage.getClients();
    res.json(allClients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/clients/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const client = await storage.getClient(req.params.id);
    if (!client) return res.status(404).json({ error: "Client not found" });
    res.json(client);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/clients", requireAdmin, async (req: Request, res: Response) => {
  try {
    const parsed = insertClientSchema.parse(req.body);
    const client = await storage.createClient(parsed);
    res.status(201).json(client);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/clients/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const safe = pick(req.body, CLIENT_MUTABLE);
    const client = await storage.updateClient(req.params.id, safe);
    if (!client) return res.status(404).json({ error: "Client not found" });
    res.json(client);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/appointments", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const allAppts = await storage.getAppointments();
    res.json(allAppts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/appointments/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const appt = await storage.getAppointment(req.params.id);
    if (!appt) return res.status(404).json({ error: "Appointment not found" });
    res.json(appt);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/appointments", requireAdmin, async (req: Request, res: Response) => {
  try {
    const parsed = insertAppointmentSchema.parse(req.body);
    const appt = await storage.createAppointment(parsed);
    res.status(201).json(appt);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/appointments/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const safe = pick(req.body, APPOINTMENT_MUTABLE);
    const appt = await storage.updateAppointment(req.params.id, safe);
    if (!appt) return res.status(404).json({ error: "Appointment not found" });
    res.json(appt);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/jobs", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const allJobs = await storage.getJobs();
    res.json(allJobs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/jobs/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const job = await storage.getJob(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/jobs", requireAdmin, async (req: Request, res: Response) => {
  try {
    const parsed = insertJobSchema.parse(req.body);
    const job = await storage.createJob(parsed);
    res.status(201).json(job);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/jobs/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const safe = pick(req.body, JOB_MUTABLE);
    const previousJob = await storage.getJob(req.params.id);
    if (!previousJob) return res.status(404).json({ error: "Job not found" });
    const job = await storage.updateJob(req.params.id, safe);
    if (!job) return res.status(404).json({ error: "Job not found" });
    if (previousJob.status !== "completed" && job.status === "completed") {
      onJobCompleted(job.id).catch(err => console.error("[CRM] Review trigger failed:", err));
      setTimeout(() => {
        sendRecurringUpsell(job.id).catch(err => console.error("[CRM] Recurring upsell failed:", err));
      }, 2 * 60 * 60 * 1000);
    }
    res.json(job);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

const CLEANER_MUTABLE = ["firstName", "lastName", "email", "phone", "hourlyRate", "servicesOffered", "availability", "rating", "totalJobsCompleted", "isActive", "companyId", "userId"];

router.get("/cleaners", requireAdmin, async (_req: Request, res: Response) => {
  const list = await storage.getCleaners();
  res.json(list);
});

router.get("/cleaners/:id", requireAdmin, async (req: Request, res: Response) => {
  const item = await storage.getCleaner(req.params.id);
  if (!item) return res.status(404).json({ error: "Cleaner not found" });
  res.json(item);
});

router.post("/cleaners", requireAdmin, async (req: Request, res: Response) => {
  try {
    const parsed = insertCleanerSchema.parse(req.body);
    const item = await storage.createCleaner(parsed);
    res.status(201).json(item);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/cleaners/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const safe = pick(req.body, CLEANER_MUTABLE);
    const item = await storage.updateCleaner(req.params.id, safe);
    if (!item) return res.status(404).json({ error: "Cleaner not found" });
    res.json(item);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/cleaners/:id", requireAdmin, async (req: Request, res: Response) => {
  const ok = await storage.deleteCleaner(req.params.id);
  if (!ok) return res.status(404).json({ error: "Cleaner not found" });
  res.json({ success: true });
});

const RB_MUTABLE = ["customerId", "customerEmail", "firstName", "lastName", "phone", "serviceType", "address", "city", "state", "zipCode", "frequency", "preferredDayOfWeek", "preferredTime", "amount", "specialInstructions", "status", "nextScheduledDate", "stripeSubscriptionId", "companyId"];

router.get("/recurring-bookings", requireAdmin, async (_req: Request, res: Response) => {
  const list = await storage.getRecurringBookings();
  res.json(list);
});

router.get("/recurring-bookings/:id", requireAdmin, async (req: Request, res: Response) => {
  const item = await storage.getRecurringBooking(req.params.id);
  if (!item) return res.status(404).json({ error: "Recurring booking not found" });
  res.json(item);
});

router.post("/recurring-bookings", requireAdmin, async (req: Request, res: Response) => {
  try {
    const parsed = insertRecurringBookingSchema.parse(req.body);
    const item = await storage.createRecurringBooking(parsed);
    res.status(201).json(item);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/recurring-bookings/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const safe = pick(req.body, RB_MUTABLE);
    const item = await storage.updateRecurringBooking(req.params.id, safe);
    if (!item) return res.status(404).json({ error: "Recurring booking not found" });
    res.json(item);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/recurring-bookings/:id", requireAdmin, async (req: Request, res: Response) => {
  const ok = await storage.deleteRecurringBooking(req.params.id);
  if (!ok) return res.status(404).json({ error: "Recurring booking not found" });
  res.json({ success: true });
});

router.get("/referrals", requireAdmin, async (_req: Request, res: Response) => {
  const list = await storage.getReferrals();
  res.json(list);
});

router.get("/referrals/:id", requireAdmin, async (req: Request, res: Response) => {
  const item = await storage.getReferral(req.params.id);
  if (!item) return res.status(404).json({ error: "Referral not found" });
  res.json(item);
});

router.post("/referrals", requireAdmin, async (req: Request, res: Response) => {
  try {
    const parsed = insertReferralSchema.parse(req.body);
    const item = await storage.createReferral(parsed);
    res.status(201).json(item);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/referrals/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const safe = pick(req.body, ["referrerEmail", "referrerName", "referredEmail", "referredName", "referredPhone", "status", "rewardAmount", "rewardPaid", "notes", "companyId"]);
    const item = await storage.updateReferral(req.params.id, safe);
    if (!item) return res.status(404).json({ error: "Referral not found" });
    res.json(item);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
