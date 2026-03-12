import { db } from "../db";
import { leads, quotes } from "@shared/schema";
import { eq, and, isNotNull, inArray, not } from "drizzle-orm";
import { sendSingleSms } from "./twilio-sms";
import { sendEmail } from "../email";
import { BUSINESS_NAME, BUSINESS_PHONE, FROM_EMAIL } from "../config";

const FOLLOWUP_SMS_DELAY_MS = 10 * 60 * 1000;
const FOLLOWUP_EMAIL_DELAY_MS = 24 * 60 * 60 * 1000;
const FOLLOWUP_DISCOUNT_DELAY_MS = 3 * 24 * 60 * 60 * 1000;

const CONVERTED_STAGES = ["won", "converted"];

let isProcessing = false;

function getBookingUrl(): string {
  const domain = process.env.REPLIT_DOMAINS?.split(",")[0] || "selfmaidllc.com";
  return `https://${domain}/quote`;
}

async function getQuoteForLead(quoteId: string) {
  const [quote] = await db.select().from(quotes).where(eq(quotes.id, quoteId));
  return quote;
}

function determineCompletion(lead: any, elapsed: number): boolean {
  const smsDone = !!lead.followUpSmsAt || !lead.phone || elapsed >= FOLLOWUP_SMS_DELAY_MS;
  const emailDone = !!lead.followUpEmailAt || !lead.email || elapsed >= FOLLOWUP_EMAIL_DELAY_MS;
  const discountDone = !!lead.followUpDiscountAt || !lead.email || elapsed >= FOLLOWUP_DISCOUNT_DELAY_MS;

  const smsActuallyDone = !!lead.followUpSmsAt || !lead.phone;
  const emailActuallyDone = !!lead.followUpEmailAt || !lead.email;
  const discountActuallyDone = !!lead.followUpDiscountAt || !lead.email;

  return smsActuallyDone && emailActuallyDone && discountActuallyDone;
}

export async function processFollowUps(): Promise<{
  smsReminders: number;
  emailReminders: number;
  discountOffers: number;
  errors: number;
}> {
  if (isProcessing) return { smsReminders: 0, emailReminders: 0, discountOffers: 0, errors: 0 };
  isProcessing = true;

  const stats = { smsReminders: 0, emailReminders: 0, discountOffers: 0, errors: 0 };

  try {
    const pendingLeads = await db
      .select()
      .from(leads)
      .where(
        and(
          eq(leads.followUpStatus, "pending"),
          not(inArray(leads.pipelineStage, CONVERTED_STAGES)),
          isNotNull(leads.quoteId)
        )
      );

    const now = Date.now();

    for (const lead of pendingLeads) {
      const createdMs = lead.createdAt ? new Date(lead.createdAt).getTime() : now;
      const elapsed = now - createdMs;

      try {
        if (!lead.followUpSmsAt && elapsed >= FOLLOWUP_SMS_DELAY_MS && lead.phone) {
          const bookingUrl = getBookingUrl();
          const smsBody = `Hi ${lead.firstName}! Your cleaning quote from ${BUSINESS_NAME} is ready. Book your cleaning here: ${bookingUrl}\n\nQuestions? Call us at ${BUSINESS_PHONE}`;

          const result = await sendSingleSms({ to: lead.phone, body: smsBody });
          if (result.success) {
            await db.update(leads).set({
              followUpSmsAt: new Date(),
              lastContactedAt: new Date(),
              updatedAt: new Date(),
            }).where(eq(leads.id, lead.id));
            lead.followUpSmsAt = new Date();
            stats.smsReminders++;
            console.log(`[FollowUp] SMS reminder sent to ${lead.firstName} ${lead.lastName}`);
          } else {
            console.error(`[FollowUp] SMS failed for lead ${lead.id}:`, result.error);
            stats.errors++;
          }
        }

        if (!lead.followUpEmailAt && elapsed >= FOLLOWUP_EMAIL_DELAY_MS && lead.email) {
          const quote = lead.quoteId ? await getQuoteForLead(lead.quoteId) : null;
          const bookingUrl = getBookingUrl();
          const priceText = quote ? `$${quote.estimatedPrice}` : "your estimated price";
          const serviceText = quote?.serviceType || lead.serviceType || "cleaning service";
          const frequencyText = quote?.frequency || "one-time";

          await sendEmail({
            to: lead.email,
            from: FROM_EMAIL,
            subject: `Your Self-Maid Cleaning Quote — ${priceText}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #1e40af, #0d9488); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 24px;">${BUSINESS_NAME}</h1>
                  <p style="color: #bfdbfe; margin: 8px 0 0;">Your Cleaning Quote</p>
                </div>
                <div style="padding: 30px; background: #f8fafc; border: 1px solid #e2e8f0;">
                  <p style="font-size: 16px;">Hi ${lead.firstName},</p>
                  <p>We noticed you got a quote but haven't booked yet. We'd love to help you get started!</p>
                  <div style="background: white; border: 2px solid #0d9488; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
                    <p style="color: #6b7280; margin: 0 0 8px; font-size: 14px;">Your Estimated Quote</p>
                    <p style="font-size: 36px; font-weight: bold; color: #0d9488; margin: 0;">${priceText}</p>
                    <p style="color: #6b7280; margin: 8px 0 0; font-size: 14px;">${serviceText} — ${frequencyText}</p>
                  </div>
                  <div style="text-align: center; margin: 24px 0;">
                    <a href="${bookingUrl}" style="background: #0d9488; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">Book My Cleaning</a>
                  </div>
                  <p style="font-size: 14px; color: #6b7280;">Questions? Call us at <strong>${BUSINESS_PHONE}</strong> — we're happy to help!</p>
                </div>
                <div style="padding: 16px; text-align: center; font-size: 12px; color: #9ca3af;">
                  <p>${BUSINESS_NAME} — Montgomery, AL</p>
                </div>
              </div>
            `,
            text: `Hi ${lead.firstName},\n\nWe noticed you got a cleaning quote (${priceText} for ${serviceText}) but haven't booked yet.\n\nBook your cleaning here: ${bookingUrl}\n\nQuestions? Call us at ${BUSINESS_PHONE}\n\n${BUSINESS_NAME}`,
          });

          await db.update(leads).set({
            followUpEmailAt: new Date(),
            lastContactedAt: new Date(),
            updatedAt: new Date(),
          }).where(eq(leads.id, lead.id));
          lead.followUpEmailAt = new Date();
          stats.emailReminders++;
          console.log(`[FollowUp] Email reminder sent to ${lead.firstName} ${lead.lastName}`);
        }

        if (!lead.followUpDiscountAt && elapsed >= FOLLOWUP_DISCOUNT_DELAY_MS && lead.email) {
          const quote = lead.quoteId ? await getQuoteForLead(lead.quoteId) : null;
          const bookingUrl = getBookingUrl();
          const originalPrice = quote?.estimatedPrice || 0;
          const discountPrice = Math.round(originalPrice * 0.85);
          const serviceText = quote?.serviceType || lead.serviceType || "cleaning service";

          await sendEmail({
            to: lead.email,
            from: FROM_EMAIL,
            subject: `15% Off Your Cleaning — Limited Time Offer!`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #dc2626, #ea580c); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 28px;">15% OFF</h1>
                  <p style="color: #fecaca; margin: 8px 0 0; font-size: 16px;">Your First Cleaning Service</p>
                </div>
                <div style="padding: 30px; background: #f8fafc; border: 1px solid #e2e8f0;">
                  <p style="font-size: 16px;">Hi ${lead.firstName},</p>
                  <p>We don't want you to miss out! Here's an exclusive <strong>15% discount</strong> on your first cleaning.</p>
                  ${originalPrice > 0 ? `
                  <div style="background: white; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center; border: 2px solid #dc2626;">
                    <p style="color: #6b7280; text-decoration: line-through; margin: 0;">Original: $${originalPrice}</p>
                    <p style="font-size: 36px; font-weight: bold; color: #dc2626; margin: 8px 0;">$${discountPrice}</p>
                    <p style="color: #6b7280; font-size: 14px; margin: 0;">${serviceText} — You save $${originalPrice - discountPrice}!</p>
                  </div>
                  ` : ''}
                  <div style="text-align: center; margin: 24px 0;">
                    <a href="${bookingUrl}" style="background: #dc2626; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">Claim My 15% Discount</a>
                  </div>
                  <p style="font-size: 13px; color: #9ca3af; text-align: center;">Offer expires in 48 hours. Mention this email when booking.</p>
                  <p style="font-size: 14px; color: #6b7280;">Call us at <strong>${BUSINESS_PHONE}</strong> to book with your discount!</p>
                </div>
                <div style="padding: 16px; text-align: center; font-size: 12px; color: #9ca3af;">
                  <p>${BUSINESS_NAME} — Montgomery, AL</p>
                </div>
              </div>
            `,
            text: `Hi ${lead.firstName},\n\nExclusive offer: 15% OFF your first cleaning!\n\n${originalPrice > 0 ? `Original: $${originalPrice}\nYour price: $${discountPrice}\nYou save: $${originalPrice - discountPrice}` : ''}\n\nBook here: ${bookingUrl}\nMention this message when booking.\n\nOffer expires in 48 hours.\n\nCall us at ${BUSINESS_PHONE}\n\n${BUSINESS_NAME}`,
          });

          await db.update(leads).set({
            followUpDiscountAt: new Date(),
            lastContactedAt: new Date(),
            updatedAt: new Date(),
          }).where(eq(leads.id, lead.id));
          lead.followUpDiscountAt = new Date();
          stats.discountOffers++;
          console.log(`[FollowUp] Discount offer sent to ${lead.firstName} ${lead.lastName}`);
        }

        if (determineCompletion(lead, elapsed)) {
          await db.update(leads).set({
            followUpStatus: "completed",
            updatedAt: new Date(),
          }).where(eq(leads.id, lead.id));
        }
      } catch (err: any) {
        console.error(`[FollowUp] Error processing lead ${lead.id}:`, err.message);
        stats.errors++;
      }
    }
  } finally {
    isProcessing = false;
  }

  return stats;
}

let followUpInterval: ReturnType<typeof setInterval> | null = null;

export function startFollowUpScheduler(intervalMs: number = 60_000) {
  if (followUpInterval) return;

  console.log(`[FollowUp] Scheduler started (checking every ${intervalMs / 1000}s)`);

  followUpInterval = setInterval(async () => {
    try {
      const stats = await processFollowUps();
      const total = stats.smsReminders + stats.emailReminders + stats.discountOffers;
      if (total > 0) {
        console.log(`[FollowUp] Processed: ${stats.smsReminders} SMS, ${stats.emailReminders} emails, ${stats.discountOffers} discounts, ${stats.errors} errors`);
      }
    } catch (err: any) {
      console.error("[FollowUp] Scheduler error:", err.message);
    }
  }, intervalMs);
}

export function stopFollowUpScheduler() {
  if (followUpInterval) {
    clearInterval(followUpInterval);
    followUpInterval = null;
    console.log("[FollowUp] Scheduler stopped");
  }
}

export async function getFollowUpStats(): Promise<{
  totalQuoteLeads: number;
  pendingFollowUps: number;
  completedFollowUps: number;
  smsReminders: number;
  emailReminders: number;
  discountOffers: number;
  convertedFromFollowUp: number;
}> {
  const allQuoteLeads = await db
    .select()
    .from(leads)
    .where(isNotNull(leads.quoteId));

  const pending = allQuoteLeads.filter(l => l.followUpStatus === "pending").length;
  const completed = allQuoteLeads.filter(l => l.followUpStatus === "completed").length;
  const smsSent = allQuoteLeads.filter(l => l.followUpSmsAt !== null).length;
  const emailsSent = allQuoteLeads.filter(l => l.followUpEmailAt !== null).length;
  const discountsSent = allQuoteLeads.filter(l => l.followUpDiscountAt !== null).length;
  const converted = allQuoteLeads.filter(
    l => CONVERTED_STAGES.includes(l.pipelineStage) &&
      (l.followUpSmsAt !== null || l.followUpEmailAt !== null || l.followUpDiscountAt !== null)
  ).length;

  return {
    totalQuoteLeads: allQuoteLeads.length,
    pendingFollowUps: pending,
    completedFollowUps: completed,
    smsReminders: smsSent,
    emailReminders: emailsSent,
    discountOffers: discountsSent,
    convertedFromFollowUp: converted,
  };
}
