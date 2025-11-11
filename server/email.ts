import { MailService } from '@sendgrid/mail';

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid not configured, email would be sent:', {
      to: params.to,
      subject: params.subject
    });
    return true; // Return true to prevent blocking app functionality
  }
  
  try {
    const mailData = {
      to: params.to,
      from: params.from,
      subject: params.subject,
    } as any;
    
    if (params.text) mailData.text = params.text;
    if (params.html) mailData.html = params.html;
    
    // Ensure at least one content type is present
    if (!params.text && !params.html) {
      mailData.text = params.subject; // Fallback to subject as text
    }
    
    await mailService.send(mailData);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}
