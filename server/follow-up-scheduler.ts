import { sendEmail } from './email';

const OWNER_EMAIL = 'selfmaid1981@gmail.com';
const FROM_EMAIL = 'selfmaidclean@outlook.com';
const BUSINESS_PHONE = '(334) 877-9513';
const BUSINESS_NAME = 'Self-Maid Cleaning Solutions';

interface LeadInfo {
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
}

function buildWelcomeEmail(lead: LeadInfo): string {
  const firstName = lead.name.split(' ')[0];
  return `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;">
      <div style="background:linear-gradient(135deg,#1e40af,#0ea5e9);padding:32px 24px;text-align:center;border-radius:12px 12px 0 0;">
        <h1 style="color:white;margin:0;font-size:24px;">Thanks for reaching out, ${firstName}!</h1>
        <p style="color:#bfdbfe;margin:8px 0 0;font-size:14px;">${BUSINESS_NAME}</p>
      </div>
      <div style="background:white;padding:32px 24px;border:1px solid #e5e7eb;">
        <p style="color:#374151;font-size:16px;">Hi ${firstName},</p>
        <p style="color:#374151;font-size:15px;line-height:1.6;">
          We received your request for <strong>${lead.serviceType}</strong> and we're excited to help! 
          One of our team members will be calling you within <strong>2 business hours</strong> to confirm your cleaning and answer any questions.
        </p>
        <div style="background:#f0fdf4;border-left:4px solid #22c55e;padding:16px;border-radius:0 8px 8px 0;margin:20px 0;">
          <p style="margin:0;color:#166534;font-weight:600;font-size:14px;">What to expect next:</p>
          <ul style="margin:8px 0 0;color:#15803d;font-size:14px;padding-left:20px;">
            <li>We'll call you to confirm your appointment time</li>
            <li>Our background-checked team arrives on time</li>
            <li>You get a spotless clean — or we re-do it free</li>
          </ul>
        </div>
        <p style="color:#6b7280;font-size:14px;">Can't wait? Call or text us right now:</p>
        <a href="tel:334-877-9513" style="display:inline-block;background:linear-gradient(135deg,#1e40af,#0ea5e9);color:white;padding:12px 24px;border-radius:8px;font-weight:700;font-size:16px;text-decoration:none;">
          ${BUSINESS_PHONE}
        </a>
        <p style="color:#9ca3af;font-size:12px;margin-top:24px;">
          Self-Maid Cleaning Solutions · Montgomery, AL · selfmaidclean@outlook.com
        </p>
      </div>
    </div>
  `;
}

function buildFollowUp24hEmail(lead: LeadInfo): string {
  const firstName = lead.name.split(' ')[0];
  return `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;">
      <div style="background:linear-gradient(135deg,#059669,#0ea5e9);padding:32px 24px;text-align:center;border-radius:12px 12px 0 0;">
        <h1 style="color:white;margin:0;font-size:22px;">Still thinking it over, ${firstName}?</h1>
        <p style="color:#a7f3d0;margin:8px 0 0;font-size:14px;">${BUSINESS_NAME}</p>
      </div>
      <div style="background:white;padding:32px 24px;border:1px solid #e5e7eb;">
        <p style="color:#374151;font-size:15px;line-height:1.6;">
          Hey ${firstName}, we wanted to follow up on your request for <strong>${lead.serviceType}</strong>. 
          We still have a few spots available this week — and we'd love to get your space looking amazing!
        </p>
        <div style="background:#eff6ff;border-radius:12px;padding:20px;margin:20px 0;text-align:center;">
          <p style="margin:0;color:#1e40af;font-size:18px;font-weight:800;">🎉 First-Time Customer Special</p>
          <p style="margin:8px 0 0;color:#3b82f6;font-size:15px;">Save <strong>15% on your first cleaning</strong> when you book this week</p>
        </div>
        <p style="color:#6b7280;font-size:14px;">Ready to book? Reply to this email or call us:</p>
        <a href="tel:334-877-9513" style="display:inline-block;background:linear-gradient(135deg,#059669,#0ea5e9);color:white;padding:12px 24px;border-radius:8px;font-weight:700;font-size:16px;text-decoration:none;margin-bottom:12px;">
          ${BUSINESS_PHONE}
        </a>
        <br />
        <a href="https://selfmaidllc.com/get-started" style="display:inline-block;border:2px solid #1e40af;color:#1e40af;padding:10px 24px;border-radius:8px;font-weight:600;font-size:15px;text-decoration:none;">
          Get My Free Quote Online
        </a>
        <p style="color:#9ca3af;font-size:12px;margin-top:24px;">
          Self-Maid Cleaning Solutions · Montgomery, AL<br/>
          <a href="https://selfmaidllc.com" style="color:#9ca3af;">selfmaidllc.com</a>
        </p>
      </div>
    </div>
  `;
}

function buildFollowUp72hEmail(lead: LeadInfo): string {
  const firstName = lead.name.split(' ')[0];
  return `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;">
      <div style="background:linear-gradient(135deg,#7c3aed,#1e40af);padding:32px 24px;text-align:center;border-radius:12px 12px 0 0;">
        <h1 style="color:white;margin:0;font-size:22px;">Last chance, ${firstName} 👋</h1>
        <p style="color:#ddd6fe;margin:8px 0 0;font-size:14px;">${BUSINESS_NAME}</p>
      </div>
      <div style="background:white;padding:32px 24px;border:1px solid #e5e7eb;">
        <p style="color:#374151;font-size:15px;line-height:1.6;">
          We noticed you requested a quote for <strong>${lead.serviceType}</strong> a few days ago. 
          We don't want you to miss out — our calendar fills up fast!
        </p>
        <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:16px;border-radius:0 8px 8px 0;margin:20px 0;">
          <p style="margin:0;color:#92400e;font-weight:700;">⚠️ Only a few spots left this week</p>
          <p style="margin:6px 0 0;color:#78350f;font-size:14px;">Once they're gone, next availability may be 1-2 weeks out.</p>
        </div>
        <p style="color:#374151;font-size:15px;">If you're still interested, we'd love to make your home spotless. If your needs have changed, no worries at all — just let us know!</p>
        <a href="tel:334-877-9513" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#1e40af);color:white;padding:12px 24px;border-radius:8px;font-weight:700;font-size:16px;text-decoration:none;margin-top:12px;">
          Book Now — ${BUSINESS_PHONE}
        </a>
        <p style="color:#9ca3af;font-size:12px;margin-top:24px;">
          If you don't want to hear from us anymore, simply reply "STOP".<br />
          Self-Maid Cleaning Solutions · Montgomery, AL
        </p>
      </div>
    </div>
  `;
}

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
const SEVENTY_TWO_HOURS = 72 * 60 * 60 * 1000;

export async function sendWelcomeEmail(lead: LeadInfo): Promise<void> {
  try {
    await sendEmail({
      to: lead.email,
      from: FROM_EMAIL,
      subject: `We got your request, ${lead.name.split(' ')[0]}! Self-Maid Cleaning Solutions`,
      html: buildWelcomeEmail(lead),
      text: `Hi ${lead.name.split(' ')[0]}, thanks for reaching out! We'll call you within 2 business hours to confirm your ${lead.serviceType} cleaning. Call us anytime at ${BUSINESS_PHONE}.`,
    });
    console.log(`[Follow-up] Welcome email sent to ${lead.email}`);
  } catch (err) {
    console.error(`[Follow-up] Welcome email failed for ${lead.email}:`, err);
  }
}

export function scheduleFollowUps(lead: LeadInfo): void {
  console.log(`[Follow-up] Scheduling 24h + 72h follow-ups for ${lead.email}`);

  setTimeout(async () => {
    try {
      await sendEmail({
        to: lead.email,
        from: FROM_EMAIL,
        subject: `Still thinking it over? We saved you a spot — Self-Maid Cleaning`,
        html: buildFollowUp24hEmail(lead),
        text: `Hi ${lead.name.split(' ')[0]}, following up on your ${lead.serviceType} request. We have 15% off for first-time customers this week! Call ${BUSINESS_PHONE} to book.`,
      });
      console.log(`[Follow-up] 24h email sent to ${lead.email}`);
    } catch (err) {
      console.error(`[Follow-up] 24h email failed for ${lead.email}:`, err);
    }
  }, TWENTY_FOUR_HOURS);

  setTimeout(async () => {
    try {
      await sendEmail({
        to: lead.email,
        from: FROM_EMAIL,
        subject: `Last chance — spots filling up fast! Self-Maid Cleaning`,
        html: buildFollowUp72hEmail(lead),
        text: `Hi ${lead.name.split(' ')[0]}, this is our last follow-up. If you'd like to schedule your ${lead.serviceType} cleaning, call ${BUSINESS_PHONE}. Spots are limited!`,
      });
      console.log(`[Follow-up] 72h email sent to ${lead.email}`);
    } catch (err) {
      console.error(`[Follow-up] 72h email failed for ${lead.email}:`, err);
    }
  }, SEVENTY_TWO_HOURS);
}

export async function notifyOwnerNewLead(lead: LeadInfo & { source?: string }): Promise<void> {
  try {
    const sourceNote = lead.source ? `<p style="margin:4px 0;"><strong>Source:</strong> <span style="background:#dbeafe;color:#1e40af;padding:2px 8px;border-radius:4px;font-size:12px;">${lead.source}</span></p>` : '';
    await sendEmail({
      to: OWNER_EMAIL,
      from: FROM_EMAIL,
      subject: `🔥 New Lead: ${lead.name} — ${lead.serviceType}`,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:500px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#1e40af,#059669);padding:20px;border-radius:12px 12px 0 0;text-align:center;">
            <h2 style="color:white;margin:0;font-size:20px;">🔥 New Lead Received!</h2>
          </div>
          <div style="background:white;padding:24px;border:1px solid #e5e7eb;border-radius:0 0 12px 12px;">
            <p style="margin:4px 0;"><strong>Name:</strong> ${lead.name}</p>
            <p style="margin:4px 0;"><strong>Email:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
            <p style="margin:4px 0;"><strong>Phone:</strong> <a href="tel:${lead.phone}">${lead.phone || 'Not provided'}</a></p>
            <p style="margin:4px 0;"><strong>Service:</strong> ${lead.serviceType}</p>
            ${sourceNote}
            <hr style="margin:16px 0;border:none;border-top:1px solid #e5e7eb;" />
            <p style="color:#6b7280;font-size:13px;margin:0;">Welcome email + 24h + 72h follow-ups are scheduled automatically.</p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error(`[Follow-up] Owner notification failed:`, err);
  }
}
