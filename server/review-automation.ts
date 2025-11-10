import { MailService } from '@sendgrid/mail';
import { sendSMS } from './twilio';

const BUSINESS_GOOGLE_PLACE_ID = 'ChIJYTN_j1CYcYgR8KT7e-8y0Vw';
const GOOGLE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${BUSINESS_GOOGLE_PLACE_ID}`;
const SHORT_REVIEW_URL = 'https://g.page/r/YOUR_SHORT_URL/review';

const BUSINESS_NAME = 'Self-Maid Cleaning Solutions';
const BUSINESS_PHONE = '(334) 877-9513';
const BUSINESS_EMAIL = 'selfmaidclean@outlook.com';

interface ReviewRequestParams {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  serviceType: string;
  serviceDate: string;
}

export async function sendReviewRequestEmail(params: ReviewRequestParams): Promise<boolean> {
  const mailService = new MailService();
  
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid not configured, would send review request email to:', params.customerEmail);
    return true;
  }
  
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
  
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #3b82f6; color: white; padding: 30px; text-center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9fafb; padding: 30px; }
        .button { display: inline-block; background-color: #10b981; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        .stars { font-size: 32px; color: #fbbf24; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Choosing ${BUSINESS_NAME}!</h1>
        </div>
        
        <div class="content">
          <p>Hi ${params.customerName},</p>
          
          <p>We hope you're enjoying your sparkling clean home after our ${params.serviceType} service on ${params.serviceDate}!</p>
          
          <p><strong>Your feedback means the world to us.</strong> If you're happy with our work, would you take 60 seconds to leave us a Google review? It really helps our small business grow and helps other families find quality cleaning services in Montgomery.</p>
          
          <div class="stars">⭐⭐⭐⭐⭐</div>
          
          <div style="text-align: center;">
            <a href="${GOOGLE_REVIEW_URL}" class="button">Leave a Google Review</a>
          </div>
          
          <p style="margin-top: 30px;"><strong>What to mention in your review:</strong></p>
          <ul>
            <li>How did we exceed your expectations?</li>
            <li>What specific area looked amazing? (Kitchen? Bathrooms? Floors?)</li>
            <li>Would you recommend us to friends and family?</li>
          </ul>
          
          <p><strong>Thank you!</strong> Your review helps local families just like you find reliable, professional cleaning services.</p>
          
          <p>Questions or concerns? Call us at ${BUSINESS_PHONE} or reply to this email.</p>
          
          <p style="margin-top: 30px;">Gratefully,<br>The ${BUSINESS_NAME} Team</p>
        </div>
        
        <div class="footer">
          <p>${BUSINESS_NAME}<br>${BUSINESS_PHONE}<br>${BUSINESS_EMAIL}</p>
          <p style="margin-top: 15px; font-size: 12px;">
            <a href="${GOOGLE_REVIEW_URL}" style="color: #3b82f6;">Leave a Review</a> | 
            <a href="tel:${BUSINESS_PHONE.replace(/[^0-9]/g, '')}" style="color: #3b82f6;">Call Us</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  try {
    await mailService.send({
      to: params.customerEmail,
      from: BUSINESS_EMAIL,
      subject: `How was your cleaning? We'd love your feedback! ⭐`,
      html: emailHtml,
      text: `Hi ${params.customerName},

Thank you for choosing ${BUSINESS_NAME}! We hope you're enjoying your sparkling clean home after our ${params.serviceType} service on ${params.serviceDate}.

Your feedback means the world to us. If you're happy with our work, would you take 60 seconds to leave us a Google review?

Leave a Review: ${GOOGLE_REVIEW_URL}

Your review helps local families find reliable, professional cleaning services in Montgomery.

Questions? Call us at ${BUSINESS_PHONE} or reply to this email.

Gratefully,
The ${BUSINESS_NAME} Team`,
    });
    
    console.log(`Review request email sent to ${params.customerEmail}`);
    return true;
  } catch (error) {
    console.error('Failed to send review request email:', error);
    return false;
  }
}

export async function sendReviewRequestSMS(params: ReviewRequestParams): Promise<boolean> {
  if (!params.customerPhone) {
    console.log('No phone number provided for SMS review request');
    return false;
  }
  
  const smsMessage = `Hi ${params.customerName}! Thanks for choosing ${BUSINESS_NAME}. We hope you love your clean home! 

If you're happy with our ${params.serviceType} service, we'd be so grateful for a quick Google review:

${GOOGLE_REVIEW_URL}

Your feedback helps us grow! 
- The Self-Maid Team

Questions? Call ${BUSINESS_PHONE}`;
  
  try {
    const success = await sendSMS(params.customerPhone, smsMessage);
    if (success) {
      console.log(`Review request SMS sent to ${params.customerPhone}`);
    }
    return success;
  } catch (error) {
    console.error('Failed to send review request SMS:', error);
    return false;
  }
}

export async function sendAutomatedReviewRequests(params: ReviewRequestParams): Promise<{
  emailSent: boolean;
  smsSent: boolean;
}> {
  const [emailSent, smsSent] = await Promise.all([
    sendReviewRequestEmail(params),
    params.customerPhone ? sendReviewRequestSMS(params) : Promise.resolve(false),
  ]);
  
  return { emailSent, smsSent };
}

export function getGoogleReviewQRCodeUrl(): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(GOOGLE_REVIEW_URL)}`;
}

export function getGoogleReviewLink(): string {
  return GOOGLE_REVIEW_URL;
}

export { GOOGLE_REVIEW_URL, BUSINESS_GOOGLE_PLACE_ID };
