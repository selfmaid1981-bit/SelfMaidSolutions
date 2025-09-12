import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertBookingSchema } from "@shared/schema";
import { MailService } from '@sendgrid/mail';
import Stripe from "stripe";

// SendGrid setup
const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

// Stripe setup
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
}) : null;

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid not configured, email would be sent:', {
      to: params.to,
      subject: params.subject
    });
    return true; // Return true to prevent blocking app functionality
  }
  
  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Save to storage
      const message = await storage.createContactMessage(validatedData);
      
      // Send email notification
      const emailSuccess = await sendEmail({
        to: "selfmaidclean@outlook.com",
        from: "selfmaidclean@outlook.com", // Must be verified sender
        subject: `New Contact Form Submission - ${validatedData.serviceType}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
          <p><strong>Service Type:</strong> ${validatedData.serviceType}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message || 'No message provided'}</p>
        `,
        text: `
          New Contact Form Submission
          Name: ${validatedData.firstName} ${validatedData.lastName}
          Email: ${validatedData.email}
          Phone: ${validatedData.phone || 'Not provided'}
          Service Type: ${validatedData.serviceType}
          Message: ${validatedData.message || 'No message provided'}
        `
      });

      if (!emailSuccess) {
        console.warn('Failed to send email notification for contact form');
      }

      res.json({ success: true, message: "Message sent successfully" });
    } catch (error: any) {
      console.error('Contact form error:', error);
      res.status(400).json({ message: "Invalid form data: " + error.message });
    }
  });

  // Create booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      
      // Create booking
      const booking = await storage.createBooking(validatedData);
      
      res.json({ success: true, bookingId: booking.id });
    } catch (error: any) {
      console.error('Booking creation error:', error);
      res.status(400).json({ message: "Invalid booking data: " + error.message });
    }
  });

  // Create payment intent for booking
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, bookingId } = req.body;
      
      if (!amount || !bookingId) {
        return res.status(400).json({ message: "Amount and booking ID are required" });
      }

      if (!stripe) {
        return res.status(400).json({ message: "Payment processing not configured" });
      }

      const booking = await storage.getBooking(bookingId);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          bookingId: bookingId,
        },
      });

      // Update booking with payment intent ID
      await storage.updateBookingPaymentIntent(bookingId, paymentIntent.id);
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error('Payment intent creation error:', error);
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Webhook to handle successful payments
  app.post("/api/stripe-webhook", async (req, res) => {
    try {
      const { type, data } = req.body;
      
      if (type === 'payment_intent.succeeded') {
        const paymentIntent = data.object;
        const bookingId = paymentIntent.metadata?.bookingId;
        
        if (bookingId) {
          await storage.updateBookingStatus(bookingId, 'confirmed');
          
          // Send confirmation email to customer
          const booking = await storage.getBooking(bookingId);
          if (booking) {
            await sendEmail({
              to: booking.email,
              from: "selfmaidclean@outlook.com",
              subject: "Booking Confirmation - Self-Maid Cleaning",
              html: `
                <h3>Booking Confirmed!</h3>
                <p>Dear ${booking.firstName},</p>
                <p>Your cleaning service booking has been confirmed. Here are the details:</p>
                <ul>
                  <li><strong>Service:</strong> ${booking.serviceType}</li>
                  <li><strong>Date:</strong> ${booking.preferredDate}</li>
                  <li><strong>Time:</strong> ${booking.preferredTime}</li>
                  <li><strong>Address:</strong> ${booking.address}, ${booking.city}, ${booking.state} ${booking.zipCode}</li>
                  <li><strong>Amount:</strong> $${(booking.amount / 100).toFixed(2)}</li>
                </ul>
                <p>We'll contact you 24 hours before your appointment to confirm the details.</p>
                <p>Questions? Call us at (334) 413-9029</p>
                <p>Thank you for choosing Self-Maid Cleaning!</p>
              `,
            });
          }
        }
      }
      
      res.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(400).json({ message: "Webhook error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
