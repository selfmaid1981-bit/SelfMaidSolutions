import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertBookingSchema, insertUserSchema } from "@shared/schema";
import { MailService } from '@sendgrid/mail';
import Stripe from "stripe";

// SendGrid setup
const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

// Stripe setup
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
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

export async function registerRoutes(app: Express): Promise<Server> {
  // User registration endpoint
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      const user = await storage.createUser(validatedData);
      
      res.json({ 
        success: true, 
        message: "User registered successfully", 
        user: { id: user.id, username: user.username }
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.message === 'Username already exists') {
        res.status(400).json({ message: "Username already exists" });
      } else {
        res.status(400).json({ message: "Registration failed: " + error.message });
      }
    }
  });

  // User login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const userWithHash = await storage.getUserWithPasswordHash(username);
      
      if (!userWithHash) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const isValidPassword = await storage.verifyPassword(password, userWithHash.passwordHash);
      
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      // Return user without password hash
      const user = await storage.getUserByUsername(username);
      res.json({ 
        success: true, 
        message: "Login successful", 
        user: user
      });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(500).json({ message: "Login failed: " + error.message });
    }
  });

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
                <p>Questions? Call us at (334) 877-9513</p>
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
