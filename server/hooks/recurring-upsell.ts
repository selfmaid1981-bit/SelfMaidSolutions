import { db } from "../db";
import { jobs, clients, bookings, recurringBookings } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import { sendEmail } from "../email";
import { BUSINESS_NAME, BUSINESS_PHONE, BUSINESS_EMAIL } from "../config";

interface UpsellResult {
  emailSent: boolean;
  error?: string;
}

export async function sendRecurringUpsell(jobId: string): Promise<UpsellResult> {
  const result: UpsellResult = { emailSent: false };

  try {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
    if (!job || job.status !== "completed") {
      result.error = `Job ${jobId} not eligible for upsell`;
      return result;
    }

    let customerEmail = "";
    let customerName = "";
    let serviceType = "cleaning";

    if (job.clientId) {
      const [client] = await db.select().from(clients).where(eq(clients.id, job.clientId)).limit(1);
      if (client) {
        customerEmail = client.email || "";
        customerName = `${client.firstName || ""} ${client.lastName || ""}`.trim();
      }
    }

    if (!customerEmail) {
      result.error = "No customer email available for upsell";
      return result;
    }

    if (job.clientId) {
      const existingRecurring = await db
        .select()
        .from(recurringBookings)
        .where(eq(recurringBookings.customerEmail, customerEmail))
        .limit(1);
      if (existingRecurring.length > 0) {
        result.error = "Customer already has a recurring booking";
        return result;
      }
    }

    if (job.appointmentId) {
      const [booking] = await db.select().from(bookings).where(eq(bookings.id, job.appointmentId)).limit(1);
      if (booking) serviceType = booking.serviceType;
    }

    const domain = process.env.REPLIT_DOMAINS?.split(",")[0] || "selfmaidllc.com";
    const bookingUrl = `https://${domain}/booking`;

    try {
      result.emailSent = await sendEmail({
        to: customerEmail,
        from: BUSINESS_EMAIL,
        subject: `Save 10% — Switch to Recurring Cleaning, ${customerName || "Neighbor"}!`,
        html: buildUpsellEmailHtml(customerName, serviceType, bookingUrl),
        text: `Hi ${customerName}, loved your recent cleaning? Save 10% by switching to biweekly or monthly service. Book at ${bookingUrl} or call ${BUSINESS_PHONE}.`,
      });
    } catch (err) {
      console.error("[RecurringUpsell] Email failed:", err);
    }

    console.log(`[RecurringUpsell] Job ${jobId} → Email sent: ${result.emailSent}`);
    return result;
  } catch (err: any) {
    console.error("[RecurringUpsell] Error:", err);
    result.error = err.message;
    return result;
  }
}

function buildUpsellEmailHtml(name: string, serviceType: string, bookingUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #3b82f6, #0d9488); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background-color: #f9fafb; padding: 30px; }
    .btn { display: inline-block; background-color: #f59e0b; color: #1e293b; padding: 16px 48px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; margin: 20px 0; }
    .savings { background: #ecfdf5; border: 2px solid #10b981; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0; }
    .savings-amount { font-size: 32px; font-weight: bold; color: #059669; }
    .plan { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 8px 0; }
    .plan-popular { border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59,130,246,0.2); }
    .badge { display: inline-block; background: #3b82f6; color: white; font-size: 11px; font-weight: bold; padding: 2px 8px; border-radius: 9999px; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin:0;">Love Your Clean Home?</h1>
      <p style="margin:10px 0 0; opacity:0.9;">Keep it that way — and save money doing it!</p>
    </div>
    <div class="content">
      <p>Hi ${name || "there"},</p>
      <p>We hope you're still enjoying your spotless home after your recent <strong>${serviceType}</strong> service! Our customers tell us the hardest part is watching that fresh-clean feeling fade over the weeks.</p>
      <p><strong>Here's the good news:</strong> you can lock in that clean feeling permanently — and save money every single visit.</p>

      <div class="savings">
        <p style="margin:0; font-size: 14px; color: #6b7280;">Switch to recurring cleaning and save up to</p>
        <div class="savings-amount">10% Every Visit</div>
        <p style="margin:5px 0 0; font-size: 13px; color: #6b7280;">That's real savings, month after month</p>
      </div>

      <div class="plan plan-popular">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong>Biweekly Cleaning</strong> <span class="badge">Most Popular</span>
            <p style="margin:4px 0 0; font-size: 13px; color: #6b7280;">Every two weeks · 10% off each visit</p>
          </div>
        </div>
      </div>
      <div class="plan">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong>Monthly Cleaning</strong>
            <p style="margin:4px 0 0; font-size: 13px; color: #6b7280;">Once a month · 5% off each visit</p>
          </div>
        </div>
      </div>

      <div style="text-align:center;">
        <a href="${bookingUrl}" class="btn">Book Recurring Cleaning</a>
      </div>

      <p style="font-size:13px; color:#6b7280; text-align:center;">No contracts. Cancel or skip anytime. It's cleaning on your terms.</p>

      <p>Questions? Call us at <strong>${BUSINESS_PHONE}</strong> — we're happy to help you find the perfect schedule.</p>
      <p style="margin-top:20px;">Cheers,<br><strong>The ${BUSINESS_NAME} Team</strong></p>
    </div>
    <div class="footer">
      <p>${BUSINESS_NAME} | ${BUSINESS_PHONE} | ${BUSINESS_EMAIL}</p>
      <p style="font-size:11px;">You received this because you recently used our cleaning service. No further emails will be sent about this topic.</p>
    </div>
  </div>
</body>
</html>`;
}
