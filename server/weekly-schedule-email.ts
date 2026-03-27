import { db } from "./db";
import { bookings, appointments } from "@shared/schema";
import { and, gte, lte, sql } from "drizzle-orm";
import { sendEmail } from "./email";
import { OWNER_EMAILS, BUSINESS_NAME, BUSINESS_PHONE } from "./config";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getUpcomingWeekRange(): { start: string; end: string; label: string } {
  const now = new Date();
  const ct = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));

  const monday = new Date(ct);
  const dayOfWeek = ct.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
  monday.setDate(ct.getDate() + daysUntilMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const labelFmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return {
    start: fmt(monday),
    end: fmt(sunday),
    label: `${labelFmt(monday)} – ${labelFmt(sunday)}, ${monday.getFullYear()}`,
  };
}

interface ScheduleEvent {
  id: string;
  type: "booking" | "appointment";
  date: string;
  time: string;
  service: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  amount: number;
  status: string;
  notes: string;
}

async function getWeeklySchedule(): Promise<{ events: ScheduleEvent[]; weekLabel: string }> {
  const { start, end, label } = getUpcomingWeekRange();

  const [weekBookings, weekAppointments] = await Promise.all([
    db
      .select()
      .from(bookings)
      .where(and(gte(bookings.preferredDate, start), lte(bookings.preferredDate, end))),
    db
      .select()
      .from(appointments)
      .where(and(gte(appointments.scheduledDate, start), lte(appointments.scheduledDate, end))),
  ]);

  const events: ScheduleEvent[] = [
    ...weekBookings.map((b) => ({
      id: b.id,
      type: "booking" as const,
      date: b.preferredDate,
      time: b.preferredTime,
      service: b.serviceType,
      name: `${b.firstName} ${b.lastName}`,
      phone: b.phone,
      email: b.email,
      address: `${b.address}, ${b.city}, ${b.state} ${b.zipCode}`,
      amount: b.amount,
      status: b.status,
      notes: b.specialInstructions || "",
    })),
    ...weekAppointments.map((a) => ({
      id: a.id,
      type: "appointment" as const,
      date: a.scheduledDate,
      time: a.scheduledTime,
      service: a.serviceType,
      name: "",
      phone: "",
      email: "",
      address: [a.address, a.city, a.state].filter(Boolean).join(", "),
      amount: a.amount || 0,
      status: a.status,
      notes: a.notes || "",
    })),
  ];

  events.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return (a.time || "").localeCompare(b.time || "");
  });

  return { events, weekLabel: label };
}

function getDayLabel(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return `${DAY_NAMES[date.getDay()]}, ${date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}`;
}

function formatTime(time: string): string {
  if (!time) return "";
  const parts = time.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)?/i);
  if (!parts) return time;
  let h = parseInt(parts[1]);
  const m = parts[2] || "00";
  const ampm = parts[3];
  if (ampm) return `${h}:${m} ${ampm.toUpperCase()}`;
  if (h === 0) return `12:${m} AM`;
  if (h < 12) return `${h}:${m} AM`;
  if (h === 12) return `12:${m} PM`;
  return `${h - 12}:${m} PM`;
}

function buildScheduleHtml(events: ScheduleEvent[], weekLabel: string): string {
  const byDay: Record<string, ScheduleEvent[]> = {};
  events.forEach((e) => {
    if (!byDay[e.date]) byDay[e.date] = [];
    byDay[e.date].push(e);
  });

  const sortedDays = Object.keys(byDay).sort();
  const totalRevenue = events.reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalJobs = events.length;

  let daysHtml = "";

  if (sortedDays.length === 0) {
    daysHtml = `
      <tr>
        <td style="padding:32px;text-align:center;color:#999;font-size:14px;">
          No bookings or appointments scheduled for this week.
        </td>
      </tr>
    `;
  } else {
    for (const day of sortedDays) {
      const dayEvents = byDay[day];
      const dayRevenue = dayEvents.reduce((s, e) => s + (e.amount || 0), 0);

      daysHtml += `
        <tr>
          <td style="padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px;">
              <tr>
                <td style="background:#1a1a1f;color:white;padding:10px 16px;font-size:14px;font-weight:600;border-radius:8px 8px 0 0;">
                  ${getDayLabel(day)}
                  <span style="float:right;font-weight:400;color:rgba(255,255,255,0.6);font-size:12px;">
                    ${dayEvents.length} job${dayEvents.length > 1 ? "s" : ""} · $${dayRevenue}
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `;

      for (const evt of dayEvents) {
        const statusColor =
          evt.status === "confirmed" ? "#16a34a" :
          evt.status === "completed" ? "#6b7280" :
          evt.status === "cancelled" ? "#dc2626" :
          evt.status === "pending" ? "#d97706" : "#3b82f6";

        daysHtml += `
          <tr>
            <td style="padding:0 0 8px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                <tr>
                  <td style="width:4px;background:${evt.type === "booking" ? "#3b82f6" : "#10b981"};"></td>
                  <td style="padding:12px 16px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:15px;font-weight:600;color:#111;padding-bottom:4px;">
                          ${formatTime(evt.time)} — ${evt.service}
                        </td>
                        <td style="text-align:right;vertical-align:top;">
                          <span style="display:inline-block;background:${statusColor};color:white;font-size:10px;font-weight:600;padding:2px 8px;border-radius:10px;text-transform:uppercase;letter-spacing:0.5px;">
                            ${evt.status}
                          </span>
                        </td>
                      </tr>
                      ${evt.name ? `
                      <tr>
                        <td colspan="2" style="font-size:13px;color:#374151;padding-bottom:2px;">
                          <strong>${evt.name}</strong>
                          ${evt.phone ? ` · <a href="tel:${evt.phone}" style="color:#3b82f6;text-decoration:none;">${evt.phone}</a>` : ""}
                          ${evt.email ? ` · <a href="mailto:${evt.email}" style="color:#3b82f6;text-decoration:none;">${evt.email}</a>` : ""}
                        </td>
                      </tr>` : ""}
                      <tr>
                        <td colspan="2" style="font-size:12px;color:#6b7280;">
                          📍 ${evt.address}
                          ${evt.amount ? ` · <strong style="color:#111;">$${evt.amount}</strong>` : ""}
                        </td>
                      </tr>
                      ${evt.notes ? `
                      <tr>
                        <td colspan="2" style="font-size:12px;color:#9ca3af;padding-top:4px;font-style:italic;">
                          ${evt.notes}
                        </td>
                      </tr>` : ""}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        `;
      }

      daysHtml += `<tr><td style="padding:8px 0;"></td></tr>`;
    }
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        @media print {
          body { margin: 0; padding: 0; }
          .no-print { display: none !important; }
          table { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:white;">
        <tr>
          <td style="background:linear-gradient(135deg,#0a0a0d 0%,#1a1a1f 100%);padding:28px 24px;text-align:center;">
            <h1 style="color:#f5c542;margin:0;font-size:20px;letter-spacing:1px;font-weight:700;">${BUSINESS_NAME}</h1>
            <p style="color:rgba(255,255,255,0.5);margin:6px 0 0;font-size:13px;">Weekly Schedule</p>
            <p style="color:white;margin:8px 0 0;font-size:16px;font-weight:600;">${weekLabel}</p>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 24px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:33%;text-align:center;padding:12px;background:#f9fafb;border-radius:8px;">
                  <p style="font-size:28px;font-weight:800;color:#111;margin:0;">${totalJobs}</p>
                  <p style="font-size:11px;color:#6b7280;margin:2px 0 0;text-transform:uppercase;letter-spacing:1px;">Total Jobs</p>
                </td>
                <td style="width:8px;"></td>
                <td style="width:33%;text-align:center;padding:12px;background:#f9fafb;border-radius:8px;">
                  <p style="font-size:28px;font-weight:800;color:#111;margin:0;">${sortedDays.length}</p>
                  <p style="font-size:11px;color:#6b7280;margin:2px 0 0;text-transform:uppercase;letter-spacing:1px;">Active Days</p>
                </td>
                <td style="width:8px;"></td>
                <td style="width:33%;text-align:center;padding:12px;background:#f9fafb;border-radius:8px;">
                  <p style="font-size:28px;font-weight:800;color:#c89b2d;margin:0;">$${totalRevenue.toLocaleString()}</p>
                  <p style="font-size:11px;color:#6b7280;margin:2px 0 0;text-transform:uppercase;letter-spacing:1px;">Est. Revenue</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${daysHtml}
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:16px 24px;border-top:1px solid #e5e7eb;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:11px;color:#9ca3af;">
                  <span style="display:inline-block;width:10px;height:10px;background:#3b82f6;border-radius:2px;vertical-align:middle;margin-right:4px;"></span> Booking
                  &nbsp;&nbsp;
                  <span style="display:inline-block;width:10px;height:10px;background:#10b981;border-radius:2px;vertical-align:middle;margin-right:4px;"></span> Appointment
                </td>
                <td style="text-align:right;font-size:11px;color:#9ca3af;">
                  ${BUSINESS_PHONE}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#0a0a0d;padding:14px 24px;text-align:center;">
            <p style="color:rgba(255,255,255,0.3);font-size:10px;margin:0;">${BUSINESS_NAME} — Weekly Schedule · Print or forward this email</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export async function sendWeeklyScheduleEmail(): Promise<boolean> {
  try {
    const { events, weekLabel } = await getWeeklySchedule();
    const html = buildScheduleHtml(events, weekLabel);

    const success = await sendEmail({
      to: OWNER_EMAILS,
      subject: `Weekly Schedule: ${weekLabel} — ${events.length} jobs`,
      html,
    });

    if (success) {
      console.log(`[Weekly Schedule] Sent — ${events.length} jobs for ${weekLabel}`);
    } else {
      console.warn("[Weekly Schedule] Failed to send email");
    }
    return success;
  } catch (error) {
    console.error("[Weekly Schedule] Error:", error);
    return false;
  }
}

function getNextSundayCT6pm(): number {
  const now = new Date();
  const ct = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
  const target = new Date(ct);
  const dayOfWeek = ct.getDay();
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  target.setDate(ct.getDate() + daysUntilSunday);
  target.setHours(18, 0, 0, 0);
  if (ct >= target) target.setDate(target.getDate() + 7);
  const diffMs = target.getTime() - ct.getTime();
  return now.getTime() + diffMs;
}

export function startWeeklyScheduleEmailer() {
  function scheduleNext() {
    const nextTime = getNextSundayCT6pm();
    const msUntil = nextTime - Date.now();
    const hoursUntil = Math.round(msUntil / 3600000);
    console.log(`[Weekly Schedule] Next email Sunday 6:00 PM CT (in ~${hoursUntil}h)`);

    setTimeout(() => {
      sendWeeklyScheduleEmail();
      scheduleNext();
    }, msUntil);
  }
  scheduleNext();
}
