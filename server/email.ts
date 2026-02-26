import { getUncachableSendGridClient } from "./sendgrid";

export interface EmailParams {
  to: string | string[];
  from?: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();

    const mailData: any = {
      to: params.to,
      from: params.from || fromEmail,
      subject: params.subject,
    };

    if (params.html) mailData.html = params.html;
    if (params.text) mailData.text = params.text;
    if (!params.html && !params.text) mailData.text = params.subject;

    await client.send(mailData);
    console.log('[Email] Sent to:', Array.isArray(params.to) ? params.to.join(', ') : params.to, '| Subject:', params.subject);
    return true;
  } catch (error: any) {
    if (error?.message === 'SendGrid not connected') {
      console.warn('[Email] SendGrid integration not connected — email not sent:', params.subject);
      return false;
    }
    console.error('[Email] SendGrid error:', error?.response?.body || error?.message || error);
    return false;
  }
}
