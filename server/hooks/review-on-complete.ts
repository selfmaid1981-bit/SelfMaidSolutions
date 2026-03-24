import { db } from "../db";
import { jobs, appointments, clients, reviewRequests, bookings } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import { sendSMS } from "../twilio";
import { sendEmail } from "../email";
import { BUSINESS_NAME, BUSINESS_PHONE, BUSINESS_EMAIL, GOOGLE_REVIEW_URL } from "../config";

interface ReviewTriggerResult {
  smsSent: boolean;
  emailSent: boolean;
  reviewRequestId: string | null;
  error?: string;
}

export async function onJobCompleted(jobId: string): Promise<ReviewTriggerResult> {
  const result: ReviewTriggerResult = {
    smsSent: false,
    emailSent: false,
    reviewRequestId: null,
  };

  try {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
    if (!job) {
      result.error = `Job ${jobId} not found`;
      return result;
    }

    if (job.status !== "completed") {
      result.error = `Job ${jobId} is not completed (status: ${job.status})`;
      return result;
    }

    const existingReview = await db
      .select()
      .from(reviewRequests)
      .where(eq(reviewRequests.bookingId, jobId))
      .limit(1);
    if (existingReview.length > 0) {
      result.error = `Review request already exists for job ${jobId}`;
      return result;
    }

    let linkedBookingId: string | null = null;
    if (job.appointmentId) {
      const [booking] = await db
        .select()
        .from(bookings)
        .where(eq(bookings.id, job.appointmentId))
        .limit(1);
      if (booking) linkedBookingId = booking.id;
    }

    let customerName = "";
    let customerEmail = "";
    let customerPhone = "";
    let serviceType = "";
    let serviceDate = "";

    if (job.clientId) {
      const [client] = await db.select().from(clients).where(eq(clients.id, job.clientId)).limit(1);
      if (client) {
        customerName = `${client.firstName} ${client.lastName}`.trim();
        customerEmail = client.email || "";
        customerPhone = client.phone || "";
      }
    }

    if (job.appointmentId) {
      const [appt] = await db.select().from(appointments).where(eq(appointments.id, job.appointmentId)).limit(1);
      if (appt) {
        serviceType = appt.serviceType;
        serviceDate = appt.scheduledDate;
        if (!customerPhone && appt.city) customerPhone = "";
      }
    }

    if (!serviceType) serviceType = "cleaning";
    if (!serviceDate) serviceDate = new Date().toISOString().split("T")[0];

    if (!customerName && !customerEmail && !customerPhone) {
      result.error = "No customer contact info available for this job";
      return result;
    }

    const smsMessage = `Hi ${customerName || "there"}! Thanks for choosing ${BUSINESS_NAME}. We hope you love your freshly cleaned space!\n\nWould you take 60 seconds to leave us a Google review? It means the world to our small business:\n\n${GOOGLE_REVIEW_URL}\n\nThank you!\n- The Self-Maid Team\n\nQuestions? Call ${BUSINESS_PHONE}`;

    if (customerPhone) {
      try {
        result.smsSent = await sendSMS(customerPhone, smsMessage);
      } catch (err) {
        console.error("[ReviewOnComplete] SMS failed:", err);
      }
    }

    if (customerEmail) {
      try {
        result.emailSent = await sendEmail({
          to: customerEmail,
          from: BUSINESS_EMAIL,
          subject: `How was your cleaning? We'd love your feedback! ⭐`,
          html: buildReviewEmailHtml(customerName, serviceType, serviceDate),
          text: `Hi ${customerName}, thanks for choosing ${BUSINESS_NAME}! Leave us a Google review: ${GOOGLE_REVIEW_URL}`,
        });
      } catch (err) {
        console.error("[ReviewOnComplete] Email failed:", err);
      }
    }

    try {
      const [reviewReq] = await db
        .insert(reviewRequests)
        .values({
          companyId: job.companyId || null,
          bookingId: linkedBookingId || job.id,
          customerName: customerName || "Unknown",
          customerEmail: customerEmail,
          customerPhone: customerPhone || null,
          serviceType,
          serviceDate,
          emailSent: result.emailSent,
          emailSentAt: result.emailSent ? new Date() : null,
          smsSent: result.smsSent,
          smsSentAt: result.smsSent ? new Date() : null,
          status: "sent",
        })
        .returning();

      result.reviewRequestId = reviewReq?.id || null;
    } catch (err) {
      console.error("[ReviewOnComplete] Failed to save review_request record:", err);
    }

    console.log(
      `[ReviewOnComplete] Job ${jobId} → SMS: ${result.smsSent}, Email: ${result.emailSent}, ReviewReq: ${result.reviewRequestId}`
    );

    return result;
  } catch (err: any) {
    console.error("[ReviewOnComplete] Error:", err);
    result.error = err.message;
    return result;
  }
}

function buildReviewEmailHtml(name: string, serviceType: string, serviceDate: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background-color: #f9fafb; padding: 30px; }
    .btn { display: inline-block; background-color: #10b981; color: white; padding: 16px 48px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; margin: 20px 0; }
    .stars { font-size: 36px; color: #fbbf24; margin: 15px 0; letter-spacing: 4px; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 13px; }
    .tips { background: #fff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin:0;">Thank You, ${name || "Valued Customer"}!</h1>
      <p style="margin:10px 0 0; opacity:0.9;">We appreciate your trust in ${BUSINESS_NAME}</p>
    </div>
    <div class="content">
      <p>We hope you're enjoying your sparkling clean space after our <strong>${serviceType}</strong> service on <strong>${serviceDate}</strong>!</p>
      <p><strong>Your feedback means everything to us.</strong> A quick Google review helps our small business grow and helps other families in Montgomery find quality cleaning services.</p>
      <div class="stars">⭐⭐⭐⭐⭐</div>
      <div style="text-align:center;">
        <a href="${GOOGLE_REVIEW_URL}" class="btn">Leave a Google Review</a>
      </div>
      <div class="tips">
        <p style="margin-top:0;"><strong>What to mention:</strong></p>
        <ul style="margin-bottom:0;">
          <li>How did we exceed your expectations?</li>
          <li>Which rooms looked amazing?</li>
          <li>Would you recommend us to friends?</li>
        </ul>
      </div>
      <p>Questions or concerns? Call us at <strong>${BUSINESS_PHONE}</strong> or reply to this email. We're always here to help.</p>
      <p style="margin-top:30px;">With gratitude,<br><strong>The ${BUSINESS_NAME} Team</strong></p>
    </div>
    <div class="footer">
      <p>${BUSINESS_NAME} | ${BUSINESS_PHONE} | ${BUSINESS_EMAIL}</p>
    </div>
  </div>
</body>
</html>`;
}

export async function sendReviewFollowUp(reviewRequestId: string): Promise<boolean> {
  try {
    const [reviewReq] = await db
      .select()
      .from(reviewRequests)
      .where(and(eq(reviewRequests.id, reviewRequestId), eq(reviewRequests.reviewCompleted, false)))
      .limit(1);

    if (!reviewReq) return false;

    const followUpSms = `Hi ${reviewReq.customerName || "there"}! Just a friendly reminder from ${BUSINESS_NAME} — we'd love to hear how your cleaning went!\n\nLeave a quick Google review:\n${GOOGLE_REVIEW_URL}\n\nThank you so much!\n- The Self-Maid Team`;

    if (reviewReq.customerPhone) {
      try {
        await sendSMS(reviewReq.customerPhone, followUpSms);
      } catch (err) {
        console.error("[ReviewFollowUp] SMS failed:", err);
      }
    }

    if (reviewReq.customerEmail) {
      try {
        await sendEmail({
          to: reviewReq.customerEmail,
          from: BUSINESS_EMAIL,
          subject: `Friendly reminder: We'd love your feedback! ⭐`,
          html: buildFollowUpEmailHtml(reviewReq.customerName, reviewReq.serviceType),
          text: followUpSms,
        });
      } catch (err) {
        console.error("[ReviewFollowUp] Email failed:", err);
      }
    }

    console.log(`[ReviewFollowUp] Sent follow-up for review request ${reviewRequestId}`);
    return true;
  } catch (err) {
    console.error("[ReviewFollowUp] Error:", err);
    return false;
  }
}

export function scheduleReviewFollowUp(reviewRequestId: string) {
  const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
  setTimeout(() => {
    sendReviewFollowUp(reviewRequestId).catch((err) =>
      console.error("[ReviewFollowUp] Scheduled follow-up failed:", err)
    );
  }, THREE_DAYS_MS);
  console.log(`[ReviewFollowUp] Follow-up scheduled in 3 days for ${reviewRequestId}`);
}

function buildFollowUpEmailHtml(name: string, serviceType: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background-color: #fffbeb; padding: 30px; }
    .btn { display: inline-block; background-color: #10b981; color: white; padding: 16px 48px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin:0;">Friendly Reminder!</h1>
      <p style="margin:10px 0 0; opacity:0.9;">We'd love to hear about your experience</p>
    </div>
    <div class="content">
      <p>Hi ${name || "there"},</p>
      <p>We hope you're still enjoying your clean space after our <strong>${serviceType}</strong> service!</p>
      <p>If you haven't had a chance yet, we'd really appreciate a quick Google review. It takes less than a minute and helps other families in Montgomery discover quality cleaning services.</p>
      <div style="text-align:center;">
        <a href="${GOOGLE_REVIEW_URL}" class="btn">Leave a Quick Review</a>
      </div>
      <p>Thank you for being a valued customer!</p>
      <p>Warmly,<br><strong>The ${BUSINESS_NAME} Team</strong></p>
    </div>
    <div class="footer">
      <p>${BUSINESS_NAME} | ${BUSINESS_PHONE} | ${BUSINESS_EMAIL}</p>
    </div>
  </div>
</body>
</html>`;
}

export type { ReviewTriggerResult };
