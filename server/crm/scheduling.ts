import { db } from "../db";
import { appointments, jobs } from "@shared/schema";
import { eq, and, sql } from "drizzle-orm";

export async function createJobFromAppointment(appointmentId: string) {
  const [appt] = await db.select().from(appointments).where(eq(appointments.id, appointmentId));
  if (!appt) throw new Error("Appointment not found");
  const [job] = await db
    .insert(jobs)
    .values({
      companyId: appt.companyId,
      appointmentId: appt.id,
      clientId: appt.clientId,
      assignedTo: appt.assignedTo,
      status: "assigned",
    })
    .returning();
  await db
    .update(appointments)
    .set({ status: "confirmed", updatedAt: new Date() })
    .where(eq(appointments.id, appointmentId));
  return job;
}

export async function getAvailableSlots(date: string, durationMinutes: number = 120): Promise<string[]> {
  const existing = await db
    .select({ time: appointments.scheduledTime, duration: appointments.durationMinutes })
    .from(appointments)
    .where(and(eq(appointments.scheduledDate, date), sql`${appointments.status} != 'cancelled'`));

  const allSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
  const bookedTimes = new Set(existing.map(e => e.time));
  return allSlots.filter(slot => !bookedTimes.has(slot));
}
