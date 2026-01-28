// Google Sheets Integration - Replit Connector
import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-sheet',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Sheet not connected');
  }
  return accessToken;
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
export async function getUncachableGoogleSheetClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.sheets({ version: 'v4', auth: oauth2Client });
}

// Get Google Drive client for creating spreadsheets
export async function getUncachableGoogleDriveClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.drive({ version: 'v3', auth: oauth2Client });
}

// Lead/Funnel types
export interface Lead {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  city?: string;
  source: string;
  status: 'new' | 'contacted' | 'responded' | 'meeting' | 'proposal' | 'won' | 'lost';
  notes?: string;
  dateAdded: string;
  lastContact?: string;
}

export interface Customer {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  serviceType?: string;
  frequency?: string;
  totalSpent?: number;
  lastService?: string;
  notes?: string;
}

// Read leads from Google Sheet
export async function getLeadsFromSheet(spreadsheetId: string, range: string = 'Leads!A2:K') {
  const sheets = await getUncachableGoogleSheetClient();
  
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values || [];
  
  return rows.map((row: any[]) => ({
    name: row[0] || '',
    email: row[1] || '',
    phone: row[2] || '',
    company: row[3] || '',
    title: row[4] || '',
    city: row[5] || '',
    source: row[6] || '',
    status: row[7] || 'new',
    notes: row[8] || '',
    dateAdded: row[9] || '',
    lastContact: row[10] || '',
  } as Lead));
}

// Read customers from Google Sheet
export async function getCustomersFromSheet(spreadsheetId: string, range: string = 'Customers!A2:I') {
  const sheets = await getUncachableGoogleSheetClient();
  
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values || [];
  
  return rows.map((row: any[]) => ({
    name: row[0] || '',
    email: row[1] || '',
    phone: row[2] || '',
    address: row[3] || '',
    serviceType: row[4] || '',
    frequency: row[5] || '',
    totalSpent: parseFloat(row[6]) || 0,
    lastService: row[7] || '',
    notes: row[8] || '',
  } as Customer));
}

// Add a lead to the sheet
export async function addLeadToSheet(spreadsheetId: string, lead: Lead) {
  const sheets = await getUncachableGoogleSheetClient();
  
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Leads!A:K',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        lead.name,
        lead.email,
        lead.phone || '',
        lead.company || '',
        lead.title || '',
        lead.city || '',
        lead.source,
        lead.status,
        lead.notes || '',
        lead.dateAdded,
        lead.lastContact || '',
      ]],
    },
  });
}

// Add a customer to the sheet
export async function addCustomerToSheet(spreadsheetId: string, customer: Customer) {
  const sheets = await getUncachableGoogleSheetClient();
  
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Customers!A:I',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        customer.name,
        customer.email,
        customer.phone || '',
        customer.address || '',
        customer.serviceType || '',
        customer.frequency || '',
        customer.totalSpent || 0,
        customer.lastService || '',
        customer.notes || '',
      ]],
    },
  });
}

// Update lead status
export async function updateLeadStatus(spreadsheetId: string, rowIndex: number, status: string, lastContact?: string) {
  const sheets = await getUncachableGoogleSheetClient();
  
  // Update status column (H) and last contact column (K)
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `Leads!H${rowIndex + 2}:K${rowIndex + 2}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[status, '', '', lastContact || new Date().toISOString().split('T')[0]]],
    },
  });
}

// Create a new spreadsheet with proper structure
export async function createLeadsFunnelSpreadsheet() {
  const sheets = await getUncachableGoogleSheetClient();
  const drive = await getUncachableGoogleDriveClient();
  
  // Create spreadsheet
  const spreadsheet = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: 'Self-Maid Leads & Customers',
      },
      sheets: [
        {
          properties: {
            title: 'Leads',
            gridProperties: { frozenRowCount: 1 },
          },
        },
        {
          properties: {
            title: 'Customers',
            gridProperties: { frozenRowCount: 1 },
          },
        },
        {
          properties: {
            title: 'Funnel Stats',
            gridProperties: { frozenRowCount: 1 },
          },
        },
      ],
    },
  });

  const spreadsheetId = spreadsheet.data.spreadsheetId!;

  // Add headers to Leads sheet
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Leads!A1:K1',
    valueInputOption: 'RAW',
    requestBody: {
      values: [['Name', 'Email', 'Phone', 'Company', 'Title', 'City', 'Source', 'Status', 'Notes', 'Date Added', 'Last Contact']],
    },
  });

  // Add headers to Customers sheet
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Customers!A1:I1',
    valueInputOption: 'RAW',
    requestBody: {
      values: [['Name', 'Email', 'Phone', 'Address', 'Service Type', 'Frequency', 'Total Spent', 'Last Service', 'Notes']],
    },
  });

  // Add headers to Funnel Stats sheet
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "'Funnel Stats'!A1:B1",
    valueInputOption: 'RAW',
    requestBody: {
      values: [['Stage', 'Count']],
    },
  });

  return {
    spreadsheetId,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
  };
}

// Get funnel statistics
export async function getFunnelStats(spreadsheetId: string) {
  const leads = await getLeadsFromSheet(spreadsheetId);
  
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    responded: leads.filter(l => l.status === 'responded').length,
    meeting: leads.filter(l => l.status === 'meeting').length,
    proposal: leads.filter(l => l.status === 'proposal').length,
    won: leads.filter(l => l.status === 'won').length,
    lost: leads.filter(l => l.status === 'lost').length,
    conversionRate: leads.length > 0 ? ((leads.filter(l => l.status === 'won').length / leads.length) * 100).toFixed(1) : '0',
  };

  return stats;
}

// Sync contacts from database to sheet
export async function syncContactsToSheet(spreadsheetId: string, contacts: any[]) {
  const sheets = await getUncachableGoogleSheetClient();
  
  const values = contacts.map(c => [
    c.name,
    c.email,
    c.phone || '',
    c.company || '',
    '', // title
    '', // city
    c.source || 'website',
    'new',
    c.message || '',
    new Date(c.createdAt || Date.now()).toISOString().split('T')[0],
    '',
  ]);

  if (values.length > 0) {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Leads!A:K',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });
  }

  return values.length;
}
