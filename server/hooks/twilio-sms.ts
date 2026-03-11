import { getTwilioClient, getTwilioFromPhoneNumber, sendSMS } from "../twilio";

export interface SmsParams {
  to: string;
  body: string;
  mediaUrl?: string;
}

export interface SmsBatchResult {
  total: number;
  sent: number;
  failed: number;
  results: Array<{ to: string; status: "sent" | "failed"; sid?: string; error?: string }>;
}

export async function sendSingleSms(params: SmsParams): Promise<{ success: boolean; sid?: string; error?: string }> {
  try {
    const client = await getTwilioClient();
    const from = await getTwilioFromPhoneNumber();

    const msgParams: any = {
      body: params.body,
      from,
      to: formatPhoneNumber(params.to),
    };

    if (params.mediaUrl) {
      msgParams.mediaUrl = [params.mediaUrl];
    }

    const message = await client.messages.create(msgParams);
    console.log(`[TwilioHook] SMS sent to ${params.to}, SID: ${message.sid}`);
    return { success: true, sid: message.sid };
  } catch (error: any) {
    console.error(`[TwilioHook] SMS failed to ${params.to}:`, error.message);
    return { success: false, error: error.message };
  }
}

export async function sendBatchSms(
  messages: SmsParams[],
  delayMs: number = 200
): Promise<SmsBatchResult> {
  const result: SmsBatchResult = { total: messages.length, sent: 0, failed: 0, results: [] };

  for (const msg of messages) {
    const res = await sendSingleSms(msg);
    if (res.success) {
      result.sent++;
      result.results.push({ to: msg.to, status: "sent", sid: res.sid });
    } else {
      result.failed++;
      result.results.push({ to: msg.to, status: "failed", error: res.error });
    }

    if (delayMs > 0) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  return result;
}

export async function sendJobCompletionSms(
  customerPhone: string,
  customerName: string,
  serviceType: string
): Promise<boolean> {
  const body = `Hi ${customerName}! Your ${serviceType} service with Self-Maid Cleaning Solutions is complete. We hope everything looks amazing!\n\nWe'd love your feedback — reply to this message or call us at (334) 877-9513.\n\nThank you for choosing Self-Maid!`;

  return sendSMS(formatPhoneNumber(customerPhone), body);
}

export async function sendAppointmentReminderSms(
  customerPhone: string,
  customerName: string,
  serviceType: string,
  scheduledDate: string,
  scheduledTime: string
): Promise<boolean> {
  const body = `Hi ${customerName}! Reminder: Your ${serviceType} cleaning with Self-Maid is scheduled for ${scheduledDate} at ${scheduledTime}.\n\nNeed to reschedule? Call (334) 877-9513.\n\nSee you soon!`;

  return sendSMS(formatPhoneNumber(customerPhone), body);
}

function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (digits.startsWith("+")) return phone;
  return `+${digits}`;
}

export { sendSMS } from "../twilio";
