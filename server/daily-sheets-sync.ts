import { db } from "./db";
import { pageViews, quotes, contactMessages, bookings, leads } from "@shared/schema";
import { gte, desc } from "drizzle-orm";
import { getUncachableGoogleSheetClient, getUncachableGoogleDriveClient } from "./googleSheetsClient";

const SHEET_ENV_KEY = "DAILY_REPORT_SPREADSHEET_ID";

function get24hAgo(): Date {
  const d = new Date();
  d.setHours(d.getHours() - 24);
  return d;
}

function fmtDate(d: Date | null | undefined): string {
  if (!d) return '';
  return new Date(d).toLocaleString('en-US', { timeZone: 'America/Chicago', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function todayStr(): string {
  return new Date().toLocaleDateString('en-US', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' });
}

async function getOrCreateSpreadsheet(): Promise<string> {
  if (process.env[SHEET_ENV_KEY]) {
    return process.env[SHEET_ENV_KEY]!;
  }

  const sheets = await getUncachableGoogleSheetClient();
  const drive = await getUncachableGoogleDriveClient();

  const spreadsheet = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title: 'Self-Maid Daily Reports' },
      sheets: [
        { properties: { title: 'Page Views', gridProperties: { frozenRowCount: 1 } } },
        { properties: { title: 'Quote Requests', gridProperties: { frozenRowCount: 1 } } },
        { properties: { title: 'Contact Submissions', gridProperties: { frozenRowCount: 1 } } },
        { properties: { title: 'Bookings', gridProperties: { frozenRowCount: 1 } } },
        { properties: { title: 'Leads', gridProperties: { frozenRowCount: 1 } } },
      ],
    },
  });

  const spreadsheetId = spreadsheet.data.spreadsheetId!;

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: 'RAW',
      data: [
        {
          range: "'Page Views'!A1:H1",
          values: [['Date', 'Page', 'Referrer', 'Session ID', 'IP', 'Screen', 'User Agent', 'Timestamp']],
        },
        {
          range: "'Quote Requests'!A1:H1",
          values: [['Date', 'Name', 'Email', 'Phone', 'Service Type', 'Property Size', 'Frequency', 'Est. Price']],
        },
        {
          range: "'Contact Submissions'!A1:G1",
          values: [['Date', 'Name', 'Email', 'Phone', 'Service Type', 'Message', 'Timestamp']],
        },
        {
          range: "'Bookings'!A1:J1",
          values: [['Date', 'Name', 'Email', 'Phone', 'Service Type', 'Address', 'Preferred Date', 'Amount', 'Status', 'Timestamp']],
        },
        {
          range: "'Leads'!A1:I1",
          values: [['Date', 'Name', 'Email', 'Phone', 'Source', 'Service Type', 'Pipeline Stage', 'Score', 'Timestamp']],
        },
      ],
    },
  });

  process.env[SHEET_ENV_KEY] = spreadsheetId;
  console.log(`[Sheets Sync] Created spreadsheet: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);
  return spreadsheetId;
}

async function ensureSheetExists(sheets: any, spreadsheetId: string, sheetTitle: string) {
  try {
    const meta = await sheets.spreadsheets.get({ spreadsheetId, fields: 'sheets.properties.title' });
    const existing = meta.data.sheets?.map((s: any) => s.properties?.title) || [];
    if (!existing.includes(sheetTitle)) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{ addSheet: { properties: { title: sheetTitle, gridProperties: { frozenRowCount: 1 } } } }],
        },
      });
    }
  } catch (e) {
    // ignore
  }
}

export async function syncDailyToSheets(): Promise<{ spreadsheetId: string; synced: Record<string, number> }> {
  const since = get24hAgo();
  const date = todayStr();

  const [views, newQuotes, newContacts, newBookings, newLeads] = await Promise.all([
    db.select().from(pageViews).where(gte(pageViews.createdAt, since)).orderBy(desc(pageViews.createdAt)),
    db.select().from(quotes).where(gte(quotes.createdAt, since)).orderBy(desc(quotes.createdAt)),
    db.select().from(contactMessages).where(gte(contactMessages.createdAt, since)).orderBy(desc(contactMessages.createdAt)),
    db.select().from(bookings).where(gte(bookings.createdAt, since)).orderBy(desc(bookings.createdAt)),
    db.select().from(leads).where(gte(leads.createdAt, since)).orderBy(desc(leads.createdAt)),
  ]);

  const spreadsheetId = await getOrCreateSpreadsheet();
  const sheets = await getUncachableGoogleSheetClient();

  const sheetNames = ['Page Views', 'Quote Requests', 'Contact Submissions', 'Bookings', 'Leads'];
  for (const name of sheetNames) {
    await ensureSheetExists(sheets, spreadsheetId, name);
  }

  const batchData: { range: string; values: any[][] }[] = [];

  if (views.length > 0) {
    batchData.push({
      range: "'Page Views'!A:H",
      values: views.map(v => [
        date,
        v.path,
        v.referrer || 'Direct',
        v.sessionId || '',
        v.ip || '',
        v.screenWidth && v.screenHeight ? `${v.screenWidth}x${v.screenHeight}` : '',
        (v.userAgent || '').slice(0, 100),
        fmtDate(v.createdAt),
      ]),
    });
  }

  if (newQuotes.length > 0) {
    batchData.push({
      range: "'Quote Requests'!A:H",
      values: newQuotes.map(q => [
        date,
        q.name,
        q.email,
        q.phone || '',
        q.serviceType,
        q.customSqFt ? `${q.customSqFt} sq ft` : q.propertySize || '',
        q.frequency,
        `$${q.estimatedPrice}`,
      ]),
    });
  }

  if (newContacts.length > 0) {
    batchData.push({
      range: "'Contact Submissions'!A:G",
      values: newContacts.map(c => [
        date,
        `${c.firstName} ${c.lastName}`,
        c.email,
        c.phone || '',
        c.serviceType,
        (c.message || '').slice(0, 200),
        fmtDate(c.createdAt),
      ]),
    });
  }

  if (newBookings.length > 0) {
    batchData.push({
      range: "'Bookings'!A:J",
      values: newBookings.map(b => [
        date,
        `${b.firstName} ${b.lastName}`,
        b.email,
        b.phone,
        b.serviceType,
        `${b.address}, ${b.city}, ${b.state} ${b.zipCode}`,
        b.preferredDate,
        `$${b.amount}`,
        b.status,
        fmtDate(b.createdAt),
      ]),
    });
  }

  if (newLeads.length > 0) {
    batchData.push({
      range: "'Leads'!A:I",
      values: newLeads.map(l => [
        date,
        `${l.firstName} ${l.lastName}`,
        l.email || '',
        l.phone || '',
        l.source || '',
        l.serviceType || '',
        l.pipelineStage,
        l.score ?? '',
        fmtDate(l.createdAt),
      ]),
    });
  }

  for (const entry of batchData) {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: entry.range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: entry.values },
    });
  }

  const synced = {
    pageViews: views.length,
    quotes: newQuotes.length,
    contacts: newContacts.length,
    bookings: newBookings.length,
    leads: newLeads.length,
  };

  console.log(`[Sheets Sync] Synced to spreadsheet — ${JSON.stringify(synced)}`);
  return { spreadsheetId, synced };
}
