import { sendEmail } from "./email";
import { getLeadsFromSheet, updateLeadStatus } from "./googleSheetsClient";

const BUSINESS_PHONE = "(334) 877-9513";
const BUSINESS_EMAIL = "selfmaidclean@outlook.com";
const FROM_EMAIL = "selfmaidclean@outlook.com";

let SPREADSHEET_ID = process.env.LEADS_SPREADSHEET_ID || "";

interface OutreachLead {
  email: string;
  name: string;
  company?: string;
  type: 'property_manager' | 'realtor' | 'general';
  status: string;
  lastContactDate?: string;
  followUpCount?: number;
}

const outreachTemplates = {
  propertyManagerInitial: (name: string, company?: string): { subject: string; html: string } => ({
    subject: `Partnership Opportunity - Professional Cleaning for ${company || 'Your Properties'}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .cta-button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; border-radius: 0 0 8px 8px; }
          .highlight-box { background: #f0f9ff; border-left: 4px solid #0284c7; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Self-Maid Cleaning Solutions</h1>
            <p style="margin: 10px 0 0 0;">Professional Cleaning for Property Managers</p>
          </div>
          
          <div class="content">
            <p>Hi ${name},</p>
            
            <p>I'm Michelle with Self-Maid Cleaning Solutions. I noticed ${company ? `${company} manages` : 'you manage'} properties in the area, and I wanted to reach out about a potential partnership.</p>
            
            <div class="highlight-box">
              <h3 style="margin-top: 0; color: #0284c7;">Why Property Managers Choose Us:</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li><strong>16 Years Experience</strong> - Family-owned since 2009</li>
                <li><strong>Same-Day Turnovers</strong> - Get units rent-ready fast</li>
                <li><strong>Volume Discounts</strong> - Save 15-20% on recurring services</li>
                <li><strong>Fully Insured</strong> - $1M liability coverage</li>
                <li><strong>Dedicated Account Manager</strong> - One point of contact</li>
              </ul>
            </div>
            
            <h3>Our Property Management Services:</h3>
            <ul>
              <li>🏠 Move-In/Move-Out Deep Cleaning</li>
              <li>🔄 Unit Turnover Cleaning (24-48hr turnaround)</li>
              <li>🧹 Regular Maintenance Cleaning</li>
              <li>🪟 Post-Construction Cleanup</li>
              <li>🧽 Common Area Maintenance</li>
            </ul>
            
            <p><strong>Special Offer:</strong> First turnover cleaning at 25% off to demonstrate our quality!</p>
            
            <div style="text-align: center;">
              <a href="https://${process.env.REPLIT_DEV_DOMAIN || 'selfmaidclean.com'}/quote" class="cta-button">
                Get a Custom Quote
              </a>
            </div>
            
            <p>I'd love to schedule a quick 10-minute call to discuss how we can help streamline your turnover process. What does your availability look like this week?</p>
            
            <p>Best regards,<br>
            <strong>Michelle</strong><br>
            Owner, Self-Maid Cleaning Solutions<br>
            ${BUSINESS_PHONE}<br>
            ${BUSINESS_EMAIL}</p>
          </div>
          
          <div class="footer">
            <p>Serving Montgomery, Prattville, Clanton, Selma & Surrounding Areas</p>
            <p style="font-size: 12px;">Reply STOP to unsubscribe from future emails.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  realtorInitial: (name: string, company?: string): { subject: string; html: string } => ({
    subject: `Referral Partnership - Pre-Sale & Move-In Cleaning Services`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .cta-button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; border-radius: 0 0 8px 8px; }
          .highlight-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Self-Maid Cleaning Solutions</h1>
            <p style="margin: 10px 0 0 0;">Your Trusted Cleaning Partner for Real Estate</p>
          </div>
          
          <div class="content">
            <p>Hi ${name},</p>
            
            <p>I'm Michelle, owner of Self-Maid Cleaning Solutions. I help real estate professionals like yourself create amazing first impressions with professional cleaning services.</p>
            
            <div class="highlight-box">
              <h3 style="margin-top: 0; color: #d97706;">🤝 Referral Partnership Benefits:</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li><strong>$25 Referral Bonus</strong> - For each client you send our way</li>
                <li><strong>Priority Scheduling</strong> - Same-day service when you need it</li>
                <li><strong>Co-Branded Materials</strong> - We'll promote your listings too</li>
                <li><strong>Client Satisfaction Guarantee</strong> - Makes you look great!</li>
              </ul>
            </div>
            
            <h3>How We Help Your Business:</h3>
            <ul>
              <li>✨ <strong>Pre-Listing Deep Cleans</strong> - Homes show better, sell faster</li>
              <li>🏡 <strong>Move-In Ready Service</strong> - Welcome your buyers properly</li>
              <li>📸 <strong>Photo-Ready Cleaning</strong> - Perfect for listing photos</li>
              <li>🔑 <strong>Post-Closing Touch-Ups</strong> - Last-minute sparkle</li>
            </ul>
            
            <p><strong>Did You Know?</strong> Professionally cleaned homes sell 5-10% faster on average!</p>
            
            <div style="text-align: center;">
              <a href="https://${process.env.REPLIT_DEV_DOMAIN || 'selfmaidclean.com'}/quote" class="cta-button">
                Start Partnership Today
              </a>
            </div>
            
            <p>Would you be open to a quick call to discuss how we can support your listings?</p>
            
            <p>Best regards,<br>
            <strong>Michelle</strong><br>
            Owner, Self-Maid Cleaning Solutions<br>
            ${BUSINESS_PHONE}<br>
            ${BUSINESS_EMAIL}</p>
          </div>
          
          <div class="footer">
            <p>Serving Montgomery, Prattville, Clanton, Selma & Surrounding Areas</p>
            <p style="font-size: 12px;">Reply STOP to unsubscribe from future emails.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  followUp1: (name: string, type: string): { subject: string; html: string } => ({
    subject: `Quick follow-up - Did you see my message?`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <p>Hi ${name},</p>
          
          <p>I wanted to follow up on my previous email about ${type === 'property_manager' ? 'property management cleaning services' : 'our real estate referral partnership'}.</p>
          
          <p>I know you're busy, so I'll keep this brief:</p>
          
          <ul>
            <li>✅ 16 years of experience in Alabama</li>
            <li>✅ Same-day service available</li>
            <li>✅ 100% satisfaction guarantee</li>
            ${type === 'property_manager' ? '<li>✅ Volume discounts for multiple properties</li>' : '<li>✅ $25 referral bonus per client</li>'}
          </ul>
          
          <p>Would you be available for a quick 10-minute call this week?</p>
          
          <p>Best,<br>
          <strong>Michelle</strong><br>
          ${BUSINESS_PHONE}</p>
        </div>
      </body>
      </html>
    `,
  }),

  followUp2: (name: string, type: string): { subject: string; html: string } => ({
    subject: `Last chance: Special offer inside`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .offer-box { background: #fef3c7; border: 2px solid #f59e0b; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <p>Hi ${name},</p>
          
          <p>I haven't heard back from you, so I wanted to make one final offer:</p>
          
          <div class="offer-box">
            <h2 style="margin: 0; color: #d97706;">${type === 'property_manager' ? '30% OFF Your First Turnover' : '50% OFF First Referral Service'}</h2>
            <p style="margin: 10px 0 0 0;">Valid for the next 7 days only!</p>
          </div>
          
          <p>If now isn't the right time, I completely understand. Just reply to this email whenever you're ready to chat.</p>
          
          <p>Wishing you success,<br>
          <strong>Michelle</strong><br>
          Self-Maid Cleaning Solutions<br>
          ${BUSINESS_PHONE}</p>
        </div>
      </body>
      </html>
    `,
  }),

  followUp3: (name: string): { subject: string; html: string } => ({
    subject: `Staying in touch`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <p>Hi ${name},</p>
          
          <p>I just wanted to check in one more time. If professional cleaning services would ever be helpful for your business, please keep my information handy:</p>
          
          <p><strong>Michelle - Self-Maid Cleaning Solutions</strong><br>
          📞 ${BUSINESS_PHONE}<br>
          ✉️ ${BUSINESS_EMAIL}<br>
          🌐 selfmaidclean.com</p>
          
          <p>We're here whenever you need us!</p>
          
          <p>Take care,<br>
          <strong>Michelle</strong></p>
        </div>
      </body>
      </html>
    `,
  }),
};

export interface OutreachRecord {
  id: string;
  leadEmail: string;
  leadName: string;
  leadType: string;
  company?: string;
  status: 'pending' | 'sent_initial' | 'sent_followup1' | 'sent_followup2' | 'sent_followup3' | 'responded' | 'converted' | 'unsubscribed';
  initialSentAt?: Date;
  followUp1SentAt?: Date;
  followUp2SentAt?: Date;
  followUp3SentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const outreachRecords: Map<string, OutreachRecord> = new Map();

export async function sendInitialOutreach(lead: OutreachLead): Promise<boolean> {
  try {
    const template = lead.type === 'property_manager' 
      ? outreachTemplates.propertyManagerInitial(lead.name, lead.company)
      : outreachTemplates.realtorInitial(lead.name, lead.company);
    
    await sendEmail({
      to: lead.email,
      from: FROM_EMAIL,
      subject: template.subject,
      html: template.html,
    });
    
    const record: OutreachRecord = {
      id: `outreach_${Date.now()}`,
      leadEmail: lead.email,
      leadName: lead.name,
      leadType: lead.type,
      company: lead.company,
      status: 'sent_initial',
      initialSentAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    outreachRecords.set(lead.email, record);
    
    console.log(`[Outreach] Sent initial email to ${lead.email}`);
    return true;
  } catch (error) {
    console.error(`[Outreach] Failed to send to ${lead.email}:`, error);
    return false;
  }
}

export async function sendFollowUpEmails(): Promise<{ sent: number; errors: number }> {
  const now = new Date();
  let sent = 0;
  let errors = 0;
  
  for (const [email, record] of outreachRecords) {
    if (record.status === 'responded' || record.status === 'converted' || record.status === 'unsubscribed') {
      continue;
    }
    
    try {
      const daysSinceInitial = record.initialSentAt 
        ? Math.floor((now.getTime() - record.initialSentAt.getTime()) / (1000 * 60 * 60 * 24))
        : 0;
      
      let template: { subject: string; html: string } | null = null;
      let newStatus: OutreachRecord['status'] = record.status;
      
      if (record.status === 'sent_initial' && daysSinceInitial >= 3 && !record.followUp1SentAt) {
        template = outreachTemplates.followUp1(record.leadName, record.leadType);
        newStatus = 'sent_followup1';
        record.followUp1SentAt = now;
      } else if (record.status === 'sent_followup1' && daysSinceInitial >= 7 && !record.followUp2SentAt) {
        template = outreachTemplates.followUp2(record.leadName, record.leadType);
        newStatus = 'sent_followup2';
        record.followUp2SentAt = now;
      } else if (record.status === 'sent_followup2' && daysSinceInitial >= 14 && !record.followUp3SentAt) {
        template = outreachTemplates.followUp3(record.leadName);
        newStatus = 'sent_followup3';
        record.followUp3SentAt = now;
      }
      
      if (template) {
        await sendEmail({
          to: email,
          from: FROM_EMAIL,
          subject: template.subject,
          html: template.html,
        });
        
        record.status = newStatus;
        record.updatedAt = now;
        sent++;
        console.log(`[Outreach] Sent ${newStatus} to ${email}`);
      }
    } catch (error) {
      console.error(`[Outreach] Follow-up failed for ${email}:`, error);
      errors++;
    }
  }
  
  return { sent, errors };
}

export function setSpreadsheetId(id: string) {
  SPREADSHEET_ID = id;
}

export async function processLeadsFromSheet(spreadsheetId?: string): Promise<{ processed: number; sent: number; skipped: number }> {
  let processed = 0;
  let sent = 0;
  let skipped = 0;
  
  const sheetId = spreadsheetId || SPREADSHEET_ID;
  if (!sheetId) {
    console.log('[Outreach] No spreadsheet ID configured');
    return { processed: 0, sent: 0, skipped: 0 };
  }
  
  try {
    const leads = await getLeadsFromSheet(sheetId);
    
    for (let i = 0; i < leads.length; i++) {
      const lead = leads[i];
      processed++;
      
      if (outreachRecords.has(lead.email)) {
        skipped++;
        continue;
      }
      
      if (lead.status === 'new') {
        const leadType = lead.source?.toLowerCase().includes('property') ? 'property_manager' : 'realtor';
        
        const success = await sendInitialOutreach({
          email: lead.email,
          name: lead.name,
          company: lead.company,
          type: leadType as 'property_manager' | 'realtor',
          status: lead.status,
        });
        
        if (success) {
          sent++;
          await updateLeadStatus(sheetId, i + 2, 'contacted', new Date().toISOString().split('T')[0]);
        }
      } else {
        skipped++;
      }
    }
  } catch (error) {
    console.error('[Outreach] Error processing leads from sheet:', error);
  }
  
  return { processed, sent, skipped };
}

export function getOutreachStats() {
  const records = Array.from(outreachRecords.values());
  return {
    total: records.length,
    pending: records.filter(r => r.status === 'pending').length,
    sentInitial: records.filter(r => r.status === 'sent_initial').length,
    sentFollowUp1: records.filter(r => r.status === 'sent_followup1').length,
    sentFollowUp2: records.filter(r => r.status === 'sent_followup2').length,
    sentFollowUp3: records.filter(r => r.status === 'sent_followup3').length,
    responded: records.filter(r => r.status === 'responded').length,
    converted: records.filter(r => r.status === 'converted').length,
    unsubscribed: records.filter(r => r.status === 'unsubscribed').length,
  };
}

export function getAllOutreachRecords(): OutreachRecord[] {
  return Array.from(outreachRecords.values());
}

export function updateOutreachStatus(email: string, status: OutreachRecord['status']): boolean {
  const record = outreachRecords.get(email);
  if (record) {
    record.status = status;
    record.updatedAt = new Date();
    return true;
  }
  return false;
}

let automationInterval: NodeJS.Timeout | null = null;

export function startOutreachAutomation(intervalMinutes: number = 60) {
  if (automationInterval) {
    clearInterval(automationInterval);
  }
  
  console.log(`[Outreach] Starting automation - checking every ${intervalMinutes} minutes`);
  
  automationInterval = setInterval(async () => {
    console.log('[Outreach] Running automated check...');
    
    const sheetResults = await processLeadsFromSheet();
    console.log(`[Outreach] Processed ${sheetResults.processed} leads, sent ${sheetResults.sent}, skipped ${sheetResults.skipped}`);
    
    const followUpResults = await sendFollowUpEmails();
    console.log(`[Outreach] Sent ${followUpResults.sent} follow-ups, ${followUpResults.errors} errors`);
  }, intervalMinutes * 60 * 1000);
  
  setTimeout(async () => {
    console.log('[Outreach] Running initial check...');
    const sheetResults = await processLeadsFromSheet();
    console.log(`[Outreach] Initial: Processed ${sheetResults.processed} leads, sent ${sheetResults.sent}`);
  }, 5000);
}

export function stopOutreachAutomation() {
  if (automationInterval) {
    clearInterval(automationInterval);
    automationInterval = null;
    console.log('[Outreach] Automation stopped');
  }
}
