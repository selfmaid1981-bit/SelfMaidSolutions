import { type User, type InsertUser, type ContactMessage, type InsertContactMessage, type Booking, type InsertBooking } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingPaymentIntent(id: string, paymentIntentId: string): Promise<Booking | undefined>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;
  getBooking(id: string): Promise<Booking | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessage>;
  private bookings: Map<string, Booking>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.bookings = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      status: "pending",
      paymentIntentId: null,
      createdAt: new Date() 
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingPaymentIntent(id: string, paymentIntentId: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.paymentIntentId = paymentIntentId;
      this.bookings.set(id, booking);
      return booking;
    }
    return undefined;
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return undefined;
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }
}

export const storage = new MemStorage();
