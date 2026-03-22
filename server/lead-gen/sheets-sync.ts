import { getUncachableGoogleSheetClient } from "../googleSheetsClient";

const SPREADSHEET_ID = () => process.env.LEADS_SPREADSHEET_ID || "";

interface LeadRow {
  name: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  city: string;
  source: string;
  status: string;
  notes: string;
  dateAdded: string;
  lastContact: string;
  website: string;
}

export async function getExistingLeadEmails(): Promise<Set<string>> {
  const sheetId = SPREADSHEET_ID();
  if (!sheetId) return new Set();

  try {
    const sheets = await getUncachableGoogleSheetClient();
    const resp = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Leads!B2:B",
    });

    const emails = new Set<string>();
    for (const row of resp.data.values || []) {
      if (row[0]) emails.add(row[0].toLowerCase().trim());
    }
    return emails;
  } catch (err: any) {
    console.error(`[LeadGen] Failed to read sheet emails: ${err.message}`);
    return new Set();
  }
}

export async function getExistingLeadPhones(): Promise<Set<string>> {
  const sheetId = SPREADSHEET_ID();
  if (!sheetId) return new Set();

  try {
    const sheets = await getUncachableGoogleSheetClient();
    const resp = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Leads!C2:C",
    });

    const phones = new Set<string>();
    for (const row of resp.data.values || []) {
      if (row[0]) phones.add(row[0].replace(/\D/g, ""));
    }
    return phones;
  } catch (err: any) {
    console.error(`[LeadGen] Failed to read sheet phones: ${err.message}`);
    return new Set();
  }
}

export async function appendLeadsToSheet(leads: LeadRow[]): Promise<number> {
  const sheetId = SPREADSHEET_ID();
  if (!sheetId || leads.length === 0) return 0;

  try {
    const sheets = await getUncachableGoogleSheetClient();

    const rows = leads.map((l) => [
      l.name,
      l.email,
      l.phone,
      l.company,
      l.title,
      l.city,
      l.source,
      l.status,
      l.notes,
      l.dateAdded,
      l.lastContact,
      l.website,
    ]);

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Leads!A:L",
      valueInputOption: "RAW",
      requestBody: { values: rows },
    });

    console.log(`[LeadGen] Appended ${leads.length} leads to Google Sheet`);
    return leads.length;
  } catch (err: any) {
    console.error(`[LeadGen] Sheet append failed: ${err.message}`);
    return 0;
  }
}
