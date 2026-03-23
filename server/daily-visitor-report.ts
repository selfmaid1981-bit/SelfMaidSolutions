import { db } from "./db";
import { pageViews, quotes, contactMessages, bookings, leads } from "@shared/schema";
import { gte, sql, desc } from "drizzle-orm";
import { sendEmail } from "./email";
import { OWNER_EMAILS, BUSINESS_NAME } from "./config";
import { syncDailyToSheets } from "./daily-sheets-sync";

function get24hAgo(): Date {
  const d = new Date();
  d.setHours(d.getHours() - 24);
  return d;
}

async function getDailyStats() {
  const since = get24hAgo();

  const [views, uniqueSessions, newQuotes, newContacts, newBookings, newLeads, topPages, topReferrers] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(pageViews).where(gte(pageViews.createdAt, since)),
    db.select({ count: sql<number>`count(distinct ${pageViews.sessionId})` }).from(pageViews).where(gte(pageViews.createdAt, since)),
    db.select().from(quotes).where(gte(quotes.createdAt, since)).orderBy(desc(quotes.createdAt)),
    db.select().from(contactMessages).where(gte(contactMessages.createdAt, since)).orderBy(desc(contactMessages.createdAt)),
    db.select().from(bookings).where(gte(bookings.createdAt, since)).orderBy(desc(bookings.createdAt)),
    db.select().from(leads).where(gte(leads.createdAt, since)).orderBy(desc(leads.createdAt)),
    db.select({
      path: pageViews.path,
      count: sql<number>`count(*)`,
    }).from(pageViews).where(gte(pageViews.createdAt, since)).groupBy(pageViews.path).orderBy(sql`count(*) desc`).limit(10),
    db.select({
      referrer: pageViews.referrer,
      count: sql<number>`count(*)`,
    }).from(pageViews).where(gte(pageViews.createdAt, since)).groupBy(pageViews.referrer).orderBy(sql`count(*) desc`).limit(10),
  ]);

  return {
    totalViews: Number(views[0]?.count ?? 0),
    uniqueVisitors: Number(uniqueSessions[0]?.count ?? 0),
    newQuotes: newQuotes.slice(0, 25),
    newContacts: newContacts.slice(0, 25),
    newBookings: newBookings.slice(0, 25),
    newLeads: newLeads.slice(0, 25),
    totalQuotes: newQuotes.length,
    totalContacts: newContacts.length,
    totalBookings: newBookings.length,
    totalLeads: newLeads.length,
    topPages,
    topReferrers,
  };
}

function formatDate(d: Date | null | undefined): string {
  if (!d) return 'N/A';
  return new Date(d).toLocaleString('en-US', { timeZone: 'America/Chicago', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function buildEmailHtml(stats: Awaited<ReturnType<typeof getDailyStats>>): string {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  let quotesHtml = '';
  if (stats.newQuotes.length > 0) {
    quotesHtml = stats.newQuotes.map(q => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${q.name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;"><a href="mailto:${q.email}" style="color:#c89b2d;">${q.email}</a></td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${q.phone || '—'}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${q.serviceType}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">$${q.estimatedPrice}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${formatDate(q.createdAt)}</td>
      </tr>
    `).join('');
  }

  let contactsHtml = '';
  if (stats.newContacts.length > 0) {
    contactsHtml = stats.newContacts.map(c => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${c.firstName} ${c.lastName}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;"><a href="mailto:${c.email}" style="color:#c89b2d;">${c.email}</a></td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${c.phone || '—'}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${c.serviceType}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${formatDate(c.createdAt)}</td>
      </tr>
    `).join('');
  }

  let bookingsHtml = '';
  if (stats.newBookings.length > 0) {
    bookingsHtml = stats.newBookings.map(b => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${b.firstName} ${b.lastName}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;"><a href="mailto:${b.email}" style="color:#c89b2d;">${b.email}</a></td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${b.phone}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${b.serviceType}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">$${b.amount}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${b.status}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${formatDate(b.createdAt)}</td>
      </tr>
    `).join('');
  }

  let leadsHtml = '';
  if (stats.newLeads.length > 0) {
    leadsHtml = stats.newLeads.map(l => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${l.firstName} ${l.lastName}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;"><a href="mailto:${l.email || '—'}" style="color:#c89b2d;">${l.email || '—'}</a></td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${l.phone || '—'}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${l.source || '—'}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${l.pipelineStage}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${formatDate(l.createdAt)}</td>
      </tr>
    `).join('');
  }

  const topPagesHtml = stats.topPages.map(p => `
    <tr>
      <td style="padding:6px 12px;border-bottom:1px solid #eee;">${p.path}</td>
      <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:center;">${p.count}</td>
    </tr>
  `).join('');

  const topReferrersHtml = stats.topReferrers
    .filter(r => r.referrer)
    .map(r => `
      <tr>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;">${r.referrer || 'Direct'}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:center;">${r.count}</td>
      </tr>
    `).join('');

  const totalLeadsToday = stats.totalQuotes + stats.totalContacts + stats.totalBookings + stats.totalLeads;

  return `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:700px;margin:0 auto;background:#fafafa;">
      <div style="background:linear-gradient(135deg,#0a0a0d 0%,#1a1a1f 100%);padding:32px;text-align:center;">
        <h1 style="color:#f5c542;margin:0;font-size:24px;letter-spacing:1px;">${BUSINESS_NAME}</h1>
        <p style="color:rgba(255,255,255,0.6);margin:8px 0 0;font-size:14px;">Daily Visitor Report — ${today}</p>
      </div>

      <div style="padding:24px;">
        <div style="display:flex;gap:12px;margin-bottom:24px;">
          <div style="background:white;border-radius:12px;padding:20px;flex:1;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <p style="font-size:32px;font-weight:800;color:#0a0a0d;margin:0;">${stats.totalViews}</p>
            <p style="color:#666;font-size:12px;margin:4px 0 0;text-transform:uppercase;letter-spacing:1px;">Page Views</p>
          </div>
          <div style="background:white;border-radius:12px;padding:20px;flex:1;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <p style="font-size:32px;font-weight:800;color:#0a0a0d;margin:0;">${stats.uniqueVisitors}</p>
            <p style="color:#666;font-size:12px;margin:4px 0 0;text-transform:uppercase;letter-spacing:1px;">Unique Visitors</p>
          </div>
          <div style="background:white;border-radius:12px;padding:20px;flex:1;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <p style="font-size:32px;font-weight:800;color:#c89b2d;margin:0;">${totalLeadsToday}</p>
            <p style="color:#666;font-size:12px;margin:4px 0 0;text-transform:uppercase;letter-spacing:1px;">New Leads</p>
          </div>
        </div>

        ${stats.newQuotes.length > 0 ? `
        <div style="background:white;border-radius:12px;padding:20px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="color:#0a0a0d;margin:0 0 12px;font-size:16px;">Quote Requests (${stats.newQuotes.length})</h3>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <thead>
              <tr style="background:#f5f5f5;">
                <th style="padding:8px 12px;text-align:left;">Name</th>
                <th style="padding:8px 12px;text-align:left;">Email</th>
                <th style="padding:8px 12px;text-align:left;">Phone</th>
                <th style="padding:8px 12px;text-align:left;">Service</th>
                <th style="padding:8px 12px;text-align:left;">Est. Price</th>
                <th style="padding:8px 12px;text-align:left;">Time</th>
              </tr>
            </thead>
            <tbody>${quotesHtml}</tbody>
          </table>
        </div>` : ''}

        ${stats.newContacts.length > 0 ? `
        <div style="background:white;border-radius:12px;padding:20px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="color:#0a0a0d;margin:0 0 12px;font-size:16px;">Contact Form Submissions (${stats.newContacts.length})</h3>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <thead>
              <tr style="background:#f5f5f5;">
                <th style="padding:8px 12px;text-align:left;">Name</th>
                <th style="padding:8px 12px;text-align:left;">Email</th>
                <th style="padding:8px 12px;text-align:left;">Phone</th>
                <th style="padding:8px 12px;text-align:left;">Service</th>
                <th style="padding:8px 12px;text-align:left;">Time</th>
              </tr>
            </thead>
            <tbody>${contactsHtml}</tbody>
          </table>
        </div>` : ''}

        ${stats.newBookings.length > 0 ? `
        <div style="background:white;border-radius:12px;padding:20px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="color:#0a0a0d;margin:0 0 12px;font-size:16px;">New Bookings (${stats.newBookings.length})</h3>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <thead>
              <tr style="background:#f5f5f5;">
                <th style="padding:8px 12px;text-align:left;">Name</th>
                <th style="padding:8px 12px;text-align:left;">Email</th>
                <th style="padding:8px 12px;text-align:left;">Phone</th>
                <th style="padding:8px 12px;text-align:left;">Service</th>
                <th style="padding:8px 12px;text-align:left;">Amount</th>
                <th style="padding:8px 12px;text-align:left;">Status</th>
                <th style="padding:8px 12px;text-align:left;">Time</th>
              </tr>
            </thead>
            <tbody>${bookingsHtml}</tbody>
          </table>
        </div>` : ''}

        ${stats.newLeads.length > 0 ? `
        <div style="background:white;border-radius:12px;padding:20px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="color:#0a0a0d;margin:0 0 12px;font-size:16px;">New Leads (${stats.newLeads.length})</h3>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <thead>
              <tr style="background:#f5f5f5;">
                <th style="padding:8px 12px;text-align:left;">Name</th>
                <th style="padding:8px 12px;text-align:left;">Email</th>
                <th style="padding:8px 12px;text-align:left;">Phone</th>
                <th style="padding:8px 12px;text-align:left;">Source</th>
                <th style="padding:8px 12px;text-align:left;">Stage</th>
                <th style="padding:8px 12px;text-align:left;">Time</th>
              </tr>
            </thead>
            <tbody>${leadsHtml}</tbody>
          </table>
        </div>` : ''}

        ${totalLeadsToday === 0 ? `
        <div style="background:white;border-radius:12px;padding:24px;margin-bottom:16px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <p style="color:#999;margin:0;">No new leads, quotes, or bookings in the last 24 hours.</p>
        </div>` : ''}

        <div style="display:flex;gap:12px;margin-bottom:16px;">
          ${topPagesHtml ? `
          <div style="background:white;border-radius:12px;padding:20px;flex:1;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="color:#0a0a0d;margin:0 0 12px;font-size:14px;">Top Pages</h3>
            <table style="width:100%;border-collapse:collapse;font-size:12px;">
              <tbody>${topPagesHtml}</tbody>
            </table>
          </div>` : ''}

          ${topReferrersHtml ? `
          <div style="background:white;border-radius:12px;padding:20px;flex:1;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="color:#0a0a0d;margin:0 0 12px;font-size:14px;">Traffic Sources</h3>
            <table style="width:100%;border-collapse:collapse;font-size:12px;">
              <tbody>${topReferrersHtml}</tbody>
            </table>
          </div>` : ''}
        </div>
      </div>

      <div style="background:#0a0a0d;padding:16px;text-align:center;">
        <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">${BUSINESS_NAME} — Automated Daily Report</p>
      </div>
    </div>
  `;
}

export async function sendDailyVisitorReport(): Promise<boolean> {
  try {
    const stats = await getDailyStats();
    const html = buildEmailHtml(stats);
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const totalLeads = stats.newQuotes.length + stats.newContacts.length + stats.newBookings.length + stats.newLeads.length;
    const subject = `Daily Report (${today}): ${stats.uniqueVisitors} visitors, ${totalLeads} leads`;

    const success = await sendEmail({
      to: OWNER_EMAILS,
      subject,
      html,
    });

    if (success) {
      console.log(`[Daily Report] Sent to ${OWNER_EMAILS.join(', ')} — ${stats.uniqueVisitors} visitors, ${totalLeads} leads`);
    } else {
      console.warn('[Daily Report] Failed to send email');
    }

    try {
      const sheetsResult = await syncDailyToSheets();
      console.log(`[Daily Report] Sheets synced — ${JSON.stringify(sheetsResult.synced)}`);
    } catch (sheetsError: any) {
      console.warn('[Daily Report] Sheets sync failed:', sheetsError?.message || sheetsError);
    }

    return success;
  } catch (error) {
    console.error('[Daily Report] Error:', error);
    return false;
  }
}

function getNextCT7am(): number {
  const now = new Date();
  const ct = new Date(now.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
  const target = new Date(ct);
  target.setHours(7, 0, 0, 0);
  if (ct >= target) target.setDate(target.getDate() + 1);
  const diffMs = target.getTime() - ct.getTime();
  return now.getTime() + diffMs;
}

export function startDailyReportScheduler() {
  function scheduleNext() {
    const nextTime = getNextCT7am();
    const msUntil = nextTime - Date.now();
    const hoursUntil = Math.round(msUntil / 3600000);
    console.log(`[Daily Report] Next report at 7:00 AM CT (in ~${hoursUntil}h)`);

    setTimeout(() => {
      sendDailyVisitorReport();
      scheduleNext();
    }, msUntil);
  }
  scheduleNext();
}
