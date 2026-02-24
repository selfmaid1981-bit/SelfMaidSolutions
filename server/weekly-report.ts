import { db } from "./db";
import { contactMessages, bookings, quotes, reviewRequests } from "@shared/schema";
import { sql, gte } from "drizzle-orm";
import { sendEmail } from "./email";

const OWNER_EMAIL = "selfmaid1981@gmail.com";
const FROM_EMAIL = "selfmaidclean@outlook.com";

interface WeeklyStats {
  totalContacts: number;
  totalBookings: number;
  totalQuotes: number;
  totalReviewRequests: number;
  totalRevenue: number;
  recentContacts: { name: string; email: string; serviceType: string; createdAt: Date | null }[];
  recentBookings: { name: string; serviceType: string; amount: number; status: string; createdAt: Date | null }[];
  recentQuotes: { name: string; serviceType: string; estimatedPrice: number; createdAt: Date | null }[];
}

async function getWeeklyStats(): Promise<WeeklyStats> {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const [contactCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(contactMessages)
    .where(gte(contactMessages.createdAt, oneWeekAgo));

  const [bookingCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(bookings)
    .where(gte(bookings.createdAt, oneWeekAgo));

  const [quoteCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(quotes)
    .where(gte(quotes.createdAt, oneWeekAgo));

  const [reviewCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(reviewRequests)
    .where(gte(reviewRequests.createdAt, oneWeekAgo));

  const [revenueResult] = await db
    .select({ total: sql<number>`coalesce(sum(amount), 0)::int` })
    .from(bookings)
    .where(sql`${bookings.createdAt} >= ${oneWeekAgo} AND ${bookings.status} = 'confirmed'`);

  const recentContacts = await db
    .select({
      name: sql<string>`${contactMessages.firstName} || ' ' || ${contactMessages.lastName}`,
      email: contactMessages.email,
      serviceType: contactMessages.serviceType,
      createdAt: contactMessages.createdAt,
    })
    .from(contactMessages)
    .where(gte(contactMessages.createdAt, oneWeekAgo))
    .orderBy(sql`${contactMessages.createdAt} DESC`)
    .limit(20);

  const recentBookings = await db
    .select({
      name: sql<string>`${bookings.firstName} || ' ' || ${bookings.lastName}`,
      serviceType: bookings.serviceType,
      amount: bookings.amount,
      status: bookings.status,
      createdAt: bookings.createdAt,
    })
    .from(bookings)
    .where(gte(bookings.createdAt, oneWeekAgo))
    .orderBy(sql`${bookings.createdAt} DESC`)
    .limit(20);

  const recentQuotes = await db
    .select({
      name: quotes.name,
      serviceType: quotes.serviceType,
      estimatedPrice: quotes.estimatedPrice,
      createdAt: quotes.createdAt,
    })
    .from(quotes)
    .where(gte(quotes.createdAt, oneWeekAgo))
    .orderBy(sql`${quotes.createdAt} DESC`)
    .limit(20);

  return {
    totalContacts: contactCount?.count || 0,
    totalBookings: bookingCount?.count || 0,
    totalQuotes: quoteCount?.count || 0,
    totalReviewRequests: reviewCount?.count || 0,
    totalRevenue: revenueResult?.total || 0,
    recentContacts,
    recentBookings,
    recentQuotes,
  };
}

function formatDate(date: Date | null): string {
  if (!date) return 'Unknown';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
  });
}

function buildReportHtml(stats: WeeklyStats): string {
  const weekEnd = new Date();
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);

  const contactRows = stats.recentContacts.map(c => `
    <tr>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${c.name}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${c.email}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${c.serviceType}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${formatDate(c.createdAt)}</td>
    </tr>
  `).join('');

  const bookingRows = stats.recentBookings.map(b => `
    <tr>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${b.name}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${b.serviceType}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">$${b.amount}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">
        <span style="padding: 2px 8px; border-radius: 12px; font-size: 12px; background: ${b.status === 'confirmed' ? '#dcfce7' : '#fef3c7'}; color: ${b.status === 'confirmed' ? '#166534' : '#92400e'};">${b.status}</span>
      </td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${formatDate(b.createdAt)}</td>
    </tr>
  `).join('');

  const quoteRows = stats.recentQuotes.map(q => `
    <tr>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${q.name}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${q.serviceType}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">$${q.estimatedPrice}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${formatDate(q.createdAt)}</td>
    </tr>
  `).join('');

  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f8fafc; padding: 0;">
      <div style="background: linear-gradient(135deg, #1e40af, #0ea5e9); padding: 32px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Self-Maid Weekly Report</h1>
        <p style="color: #bfdbfe; margin: 8px 0 0; font-size: 14px;">
          ${weekStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div style="padding: 24px;">
        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="25%" style="padding: 4px;">
                <div style="background: white; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-size: 36px; font-weight: 800; color: #1e40af;">${stats.totalContacts}</div>
                  <div style="font-size: 13px; color: #6b7280; margin-top: 4px;">New Contacts</div>
                </div>
              </td>
              <td width="25%" style="padding: 4px;">
                <div style="background: white; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-size: 36px; font-weight: 800; color: #059669;">${stats.totalBookings}</div>
                  <div style="font-size: 13px; color: #6b7280; margin-top: 4px;">Bookings</div>
                </div>
              </td>
              <td width="25%" style="padding: 4px;">
                <div style="background: white; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-size: 36px; font-weight: 800; color: #d97706;">${stats.totalQuotes}</div>
                  <div style="font-size: 13px; color: #6b7280; margin-top: 4px;">Quotes</div>
                </div>
              </td>
              <td width="25%" style="padding: 4px;">
                <div style="background: white; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-size: 36px; font-weight: 800; color: #059669;">$${stats.totalRevenue}</div>
                  <div style="font-size: 13px; color: #6b7280; margin-top: 4px;">Revenue</div>
                </div>
              </td>
            </tr>
          </table>
        </div>

        ${stats.recentBookings.length > 0 ? `
        <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h2 style="margin: 0 0 16px; font-size: 18px; color: #1f2937;">Recent Bookings</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
            <tr style="background: #f1f5f9;">
              <th style="padding: 8px 12px; text-align: left; color: #475569;">Customer</th>
              <th style="padding: 8px 12px; text-align: left; color: #475569;">Service</th>
              <th style="padding: 8px 12px; text-align: left; color: #475569;">Amount</th>
              <th style="padding: 8px 12px; text-align: left; color: #475569;">Status</th>
              <th style="padding: 8px 12px; text-align: left; color: #475569;">Date</th>
            </tr>
            ${bookingRows}
          </table>
        </div>
        ` : ''}

        ${stats.recentQuotes.length > 0 ? `
        <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h2 style="margin: 0 0 16px; font-size: 18px; color: #1f2937;">Recent Quotes</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
            <tr style="background: #f1f5f9;">
              <th style="padding: 8px 12px; text-align: left; color: #475569;">Customer</th>
              <th style="padding: 8px 12px; text-align: left; color: #475569;">Service</th>
              <th style="padding: 8px 12px; text-align: left; color: #475569;">Estimate</th>
              <th style="padding: 8px 12px; text-align: left; color: #475569;">Date</th>
            </tr>
            ${quoteRows}
          </table>
        </div>
        ` : ''}

        ${stats.recentContacts.length > 0 ? `
        <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h2 style="margin: 0 0 16px; font-size: 18px; color: #1f2937;">Recent Contact Messages</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
            <tr style="background: #f1f5f9;">
              <th style="padding: 8px 12px; text-align: left; color: #475569;">Name</th>
              <th style="padding: 8px 12px; text-align: left; color: #475569;">Email</th>
              <th style="padding: 8px 12px; text-align: left; color: #475569;">Service</th>
              <th style="padding: 8px 12px; text-align: left; color: #475569;">Date</th>
            </tr>
            ${contactRows}
          </table>
        </div>
        ` : ''}

        ${stats.totalContacts === 0 && stats.totalBookings === 0 && stats.totalQuotes === 0 ? `
        <div style="background: white; border-radius: 12px; padding: 40px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <p style="color: #6b7280; font-size: 16px; margin: 0;">No activity this week. Keep marketing going!</p>
        </div>
        ` : ''}
      </div>

      <div style="background: #1e293b; padding: 20px; text-align: center;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
          Self-Maid Cleaning Solutions | (334) 877-9513 | selfmaidclean@outlook.com
        </p>
      </div>
    </div>
  `;
}

export async function sendWeeklyReport(): Promise<boolean> {
  try {
    const stats = await getWeeklyStats();
    const html = buildReportHtml(stats);

    const success = await sendEmail({
      to: OWNER_EMAIL,
      from: FROM_EMAIL,
      subject: `Self-Maid Weekly Report - ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
      html,
      text: `Self-Maid Weekly Report\n\nNew Contacts: ${stats.totalContacts}\nBookings: ${stats.totalBookings}\nQuotes: ${stats.totalQuotes}\nRevenue: $${stats.totalRevenue}\n\nView the full report in your email client.`,
    });

    if (success) {
      console.log('[Weekly Report] Report sent to', OWNER_EMAIL);
    } else {
      console.error('[Weekly Report] Failed to send report');
    }
    return success;
  } catch (error) {
    console.error('[Weekly Report] Error generating report:', error);
    return false;
  }
}

let weeklyReportTimer: NodeJS.Timeout | null = null;

export function startWeeklyReportScheduler() {
  if (weeklyReportTimer) return;

  function scheduleNext() {
    const now = new Date();
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + ((8 - now.getDay()) % 7 || 7));
    nextMonday.setHours(8, 0, 0, 0);

    if (nextMonday <= now) {
      nextMonday.setDate(nextMonday.getDate() + 7);
    }

    const msUntilNext = nextMonday.getTime() - now.getTime();
    console.log(`[Weekly Report] Next report scheduled for ${nextMonday.toISOString()} (in ${Math.round(msUntilNext / 3600000)}h)`);

    weeklyReportTimer = setTimeout(async () => {
      await sendWeeklyReport();
      scheduleNext();
    }, msUntilNext);
  }

  scheduleNext();
  console.log('[Weekly Report] Scheduler started');
}

let lastQuoteNotification = 0;
const QUOTE_NOTIFICATION_COOLDOWN = 10 * 60 * 1000;

export async function notifyQuotePageView(): Promise<boolean> {
  const now = Date.now();
  if (now - lastQuoteNotification < QUOTE_NOTIFICATION_COOLDOWN) {
    return false;
  }
  lastQuoteNotification = now;

  try {
    const success = await sendEmail({
      to: OWNER_EMAIL,
      from: FROM_EMAIL,
      subject: "Someone is viewing your pricing page!",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #059669, #0ea5e9); padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0;">New Pricing Page Visitor</h2>
          </div>
          <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
            <p style="color: #374151; font-size: 16px;">Someone is browsing your <strong>quotes and pricing page</strong> right now on selfmaidllc.com.</p>
            <p style="color: #6b7280; font-size: 14px;">This could be a potential customer comparing prices. If they submit a quote, you'll receive the full details.</p>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 16px;">Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT</p>
          </div>
        </div>
      `,
      text: `Someone is viewing your pricing page on selfmaidllc.com right now. Time: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT`,
    });
    if (success) {
      console.log('[Quote Tracker] Notification sent to', OWNER_EMAIL);
    }
    return success;
  } catch (error) {
    console.error('[Quote Tracker] Error sending notification:', error);
    return false;
  }
}
