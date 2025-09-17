import { type User, type UserWithPasswordHash, type InsertUser, type ContactMessage, type InsertContactMessage, type Booking, type InsertBooking, users, contactMessages, bookings } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcrypt";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserWithPasswordHash(username: string): Promise<UserWithPasswordHash | undefined>;
  createUser(user: InsertUser): Promise<User>;
  verifyPassword(password: string, passwordHash: string): Promise<boolean>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingPaymentIntent(id: string, paymentIntentId: string): Promise<Booking | undefined>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;
  getBooking(id: string): Promise<Booking | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select({
      id: users.id,
      username: users.username,
    }).from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select({
      id: users.id,
      username: users.username,
    }).from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserWithPasswordHash(username: string): Promise<UserWithPasswordHash | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(insertUser.password, saltRounds);
      
      const [user] = await db
        .insert(users)
        .values({
          username: insertUser.username,
          passwordHash: passwordHash,
        })
        .returning({
          id: users.id,
          username: users.username,
        });
      return user;
    } catch (error: any) {
      if (error.code === '23505') { // PostgreSQL unique constraint violation
        throw new Error('Username already exists');
      }
      throw error;
    }
  }

  async verifyPassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db
      .insert(bookings)
      .values(insertBooking)
      .returning();
    return booking;
  }

  async updateBookingPaymentIntent(id: string, paymentIntentId: string): Promise<Booking | undefined> {
    const [booking] = await db
      .update(bookings)
      .set({ paymentIntentId })
      .where(eq(bookings.id, id))
      .returning();
    return booking || undefined;
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const [booking] = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();
    return booking || undefined;
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }
}

export const storage = new DatabaseStorage();
