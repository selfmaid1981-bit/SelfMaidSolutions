import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertBookingSchema, insertUserSchema, insertQuoteSchema, insertEmailCampaignSchema } from "@shared/schema";
import { MailService } from '@sendgrid/mail';
import Stripe from "stripe";
import { getUncachableSendGridClient } from "./sendgrid";
import { sendSMS } from "./twilio";
import { sendAutomatedReviewRequests } from "./review-automation";

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

// Simple authentication middleware for admin routes
function requireAdmin(req: any, res: any, next: any) {
  const adminKey = process.env.ADMIN_API_KEY;
  
  if (!adminKey) {
    return res.status(500).json({ message: "Server configuration error: Admin API key not set" });
  }
  
  const apiKey = req.headers['x-admin-api-key'];
  
  if (apiKey === adminKey) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized: Invalid admin credentials" });
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
      const { skipPayment, ...bookingData } = req.body;
      const validatedData = insertBookingSchema.parse(bookingData);
      
      // Create booking
      const booking = await storage.createBooking(validatedData);
      
      // If skipping payment, send confirmation email immediately
      if (skipPayment) {
        await storage.updateBookingStatus(booking.id, 'pending');
        
        // Send confirmation email to customer
        await sendEmail({
          to: booking.email,
          from: "selfmaidclean@outlook.com",
          subject: "Booking Request Received - Self-Maid Cleaning",
          html: `
            <h3>Booking Request Received!</h3>
            <p>Dear ${booking.firstName},</p>
            <p>We've received your cleaning service booking request. Here are the details:</p>
            <ul>
              <li><strong>Service:</strong> ${booking.serviceType}</li>
              <li><strong>Date:</strong> ${booking.preferredDate}</li>
              <li><strong>Time:</strong> ${booking.preferredTime}</li>
              <li><strong>Address:</strong> ${booking.address}, ${booking.city}, ${booking.state} ${booking.zipCode}</li>
              <li><strong>Estimated Amount:</strong> $${booking.amount}.00</li>
            </ul>
            <p><strong>Next Steps:</strong> We'll contact you within 24 hours to confirm your booking and discuss payment options.</p>
            <p>Questions? Call us at (334) 877-9513 or reply to this email.</p>
            <p>Thank you for choosing Self-Maid Cleaning!</p>
          `,
        });
        
        // Send notification to business owner via email
        await sendEmail({
          to: "selfmaidclean@outlook.com",
          from: "selfmaidclean@outlook.com",
          subject: `New Booking Request - ${booking.firstName} ${booking.lastName}`,
          html: `
            <h3>New Booking Request (Payment Pending)</h3>
            <p><strong>Customer:</strong> ${booking.firstName} ${booking.lastName}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>Service:</strong> ${booking.serviceType}</p>
            <p><strong>Date:</strong> ${booking.preferredDate}</p>
            <p><strong>Time:</strong> ${booking.preferredTime}</p>
            <p><strong>Address:</strong> ${booking.address}, ${booking.city}, ${booking.state} ${booking.zipCode}</p>
            <p><strong>Amount:</strong> $${booking.amount}.00</p>
            <p><strong>Special Instructions:</strong> ${booking.specialInstructions || 'None'}</p>
            <p><strong>Status:</strong> Pending - Customer chose to pay later</p>
            <p><em>Action Required: Contact customer within 24 hours to confirm booking and collect payment.</em></p>
          `,
        });
        
        // Send SMS notification to business owner
        const smsSuccess = await sendSMS(
          '+13348779513',
          `NEW BOOKING (Pay Later)\n${booking.firstName} ${booking.lastName}\n${booking.serviceType}\n${booking.preferredDate} at ${booking.preferredTime}\nPhone: ${booking.phone}\nAmount: $${booking.amount}`
        );
        if (!smsSuccess) {
          console.warn('Failed to send SMS notification for booking:', booking.id);
        }
      }
      
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
                  <li><strong>Amount:</strong> $${booking.amount}.00</li>
                </ul>
                <p>We'll contact you 24 hours before your appointment to confirm the details.</p>
                <p>Questions? Call us at (334) 877-9513</p>
                <p>Thank you for choosing Self-Maid Cleaning!</p>
              `,
            });
            
            // Send email notification to business owner
            await sendEmail({
              to: "selfmaidclean@outlook.com",
              from: "selfmaidclean@outlook.com",
              subject: `New Booking Confirmed - ${booking.firstName} ${booking.lastName}`,
              html: `
                <h3>New Booking Confirmed (Payment Received)</h3>
                <p><strong>Customer:</strong> ${booking.firstName} ${booking.lastName}</p>
                <p><strong>Email:</strong> ${booking.email}</p>
                <p><strong>Phone:</strong> ${booking.phone}</p>
                <p><strong>Service:</strong> ${booking.serviceType}</p>
                <p><strong>Date:</strong> ${booking.preferredDate}</p>
                <p><strong>Time:</strong> ${booking.preferredTime}</p>
                <p><strong>Address:</strong> ${booking.address}, ${booking.city}, ${booking.state} ${booking.zipCode}</p>
                <p><strong>Amount:</strong> $${booking.amount}.00</p>
                <p><strong>Special Instructions:</strong> ${booking.specialInstructions || 'None'}</p>
                <p><strong>Status:</strong> Confirmed - Payment received</p>
              `,
            });
            
            // Send SMS notification to business owner
            const smsSuccess = await sendSMS(
              '+13348779513',
              `NEW BOOKING CONFIRMED!\n${booking.firstName} ${booking.lastName}\n${booking.serviceType}\n${booking.preferredDate} at ${booking.preferredTime}\nPhone: ${booking.phone}\nPaid: $${booking.amount}`
            );
            if (!smsSuccess) {
              console.warn('Failed to send SMS notification for confirmed booking:', booking.id);
            }

            // Send automated Google review request (immediate for MVP)
            try {
              const reviewResults = await sendAutomatedReviewRequests({
                customerName: `${booking.firstName} ${booking.lastName}`,
                customerEmail: booking.email,
                customerPhone: booking.phone || undefined,
                serviceType: booking.serviceType,
                serviceDate: booking.preferredDate,
              });

              // Log review request to database for tracking
              await storage.createReviewRequest({
                bookingId: booking.id,
                customerName: `${booking.firstName} ${booking.lastName}`,
                customerEmail: booking.email,
                customerPhone: booking.phone || undefined,
                serviceType: booking.serviceType,
                serviceDate: booking.preferredDate,
                emailSent: reviewResults.emailSent,
                smsSent: reviewResults.smsSent,
                status: (reviewResults.emailSent || reviewResults.smsSent) ? 'sent' : 'pending',
              });

              console.log(`Review request sent for booking ${booking.id}: Email=${reviewResults.emailSent}, SMS=${reviewResults.smsSent}`);
            } catch (reviewError) {
              console.error('Failed to send automated review request:', reviewError);
              // Non-blocking: review request failure shouldn't break booking confirmation
            }
          }
        }
      }
      
      res.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(400).json({ message: "Webhook error" });
    }
  });

  // Save and email quote
  app.post("/api/quotes", async (req, res) => {
    try {
      const validatedData = insertQuoteSchema.parse(req.body);
      
      // Save quote to database
      const quote = await storage.createQuote(validatedData);
      
      // Format add-ons for display
      const addOnsText = quote.addOns && quote.addOns.length > 0 
        ? quote.addOns.join(', ') 
        : 'None';
      
      // Format property size info
      const sizeInfo = quote.customSqFt 
        ? `${quote.customSqFt} sq ft` 
        : quote.propertySize || 'Not specified';
      
      // Send email to customer with their quote
      await sendEmail({
        to: quote.email,
        from: "selfmaidclean@outlook.com",
        subject: "Your Cleaning Service Quote - Self-Maid Cleaning",
        html: `
          <h3>Your Cleaning Service Quote</h3>
          <p>Hi ${quote.name},</p>
          <p>Thank you for requesting a quote! Here are your details:</p>
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #0284c7; margin-top: 0;">Estimated Total: $${quote.estimatedPrice}</h2>
          </div>
          <h4>Quote Details:</h4>
          <ul>
            <li><strong>Service Type:</strong> ${quote.serviceType}</li>
            <li><strong>Property Size:</strong> ${sizeInfo}</li>
            <li><strong>Frequency:</strong> ${quote.frequency}</li>
            <li><strong>Add-ons:</strong> ${addOnsText}</li>
          </ul>
          <p><em>This is an estimate. Final price may vary based on specific conditions.</em></p>
          <hr />
          <h4>Ready to Book?</h4>
          <p>Call us at <strong>(334) 877-9513</strong> or reply to this email to schedule your cleaning service!</p>
          <p>We look forward to making your world shine!</p>
          <p>- The Self-Maid Cleaning Team</p>
        `,
        text: `
          Your Cleaning Service Quote
          
          Hi ${quote.name},
          
          Thank you for requesting a quote! Here are your details:
          
          Estimated Total: $${quote.estimatedPrice}
          
          Quote Details:
          - Service Type: ${quote.serviceType}
          - Property Size: ${sizeInfo}
          - Frequency: ${quote.frequency}
          - Add-ons: ${addOnsText}
          
          This is an estimate. Final price may vary based on specific conditions.
          
          Ready to Book?
          Call us at (334) 877-9513 or reply to this email to schedule your cleaning service!
          
          We look forward to making your world shine!
          - The Self-Maid Cleaning Team
        `
      });
      
      // Send notification email to business owner
      await sendEmail({
        to: "selfmaidclean@outlook.com",
        from: "selfmaidclean@outlook.com",
        subject: `New Quote Request - $${quote.estimatedPrice} - ${quote.serviceType}`,
        html: `
          <h3>New Quote Request</h3>
          <p><strong>Customer:</strong> ${quote.name}</p>
          <p><strong>Email:</strong> ${quote.email}</p>
          <p><strong>Phone:</strong> ${quote.phone || 'Not provided'}</p>
          <hr />
          <h4>Quote Details:</h4>
          <ul>
            <li><strong>Service Type:</strong> ${quote.serviceType}</li>
            <li><strong>Property Size:</strong> ${sizeInfo}</li>
            <li><strong>Frequency:</strong> ${quote.frequency}</li>
            <li><strong>Add-ons:</strong> ${addOnsText}</li>
          </ul>
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h3 style="color: #92400e; margin: 0;">Estimated Price: $${quote.estimatedPrice}</h3>
          </div>
          <p><strong>Action:</strong> Follow up with customer at ${quote.email} or ${quote.phone || 'email only'}</p>
        `,
        text: `
          New Quote Request
          
          Customer: ${quote.name}
          Email: ${quote.email}
          Phone: ${quote.phone || 'Not provided'}
          
          Quote Details:
          - Service Type: ${quote.serviceType}
          - Property Size: ${sizeInfo}
          - Frequency: ${quote.frequency}
          - Add-ons: ${addOnsText}
          
          Estimated Price: $${quote.estimatedPrice}
          
          Action: Follow up with customer at ${quote.email} or ${quote.phone || 'email only'}
        `
      });
      
      res.json({ 
        success: true, 
        message: "Quote saved and sent to your email",
        quoteId: quote.id 
      });
    } catch (error: any) {
      console.error('Quote submission error:', error);
      res.status(400).json({ message: "Invalid quote data: " + error.message });
    }
  });

  // Get all email subscribers (unique emails from all sources)
  app.get("/api/marketing/subscribers", requireAdmin, async (req, res) => {
    try {
      const subscribers = await storage.getAllEmailSubscribers();
      res.json(subscribers);
    } catch (error: any) {
      console.error('Error fetching subscribers:', error);
      res.status(500).json({ message: "Failed to fetch subscribers: " + error.message });
    }
  });

  // Get all email campaigns
  app.get("/api/marketing/campaigns", requireAdmin, async (req, res) => {
    try {
      const campaigns = await storage.getEmailCampaigns();
      res.json(campaigns);
    } catch (error: any) {
      console.error('Error fetching campaigns:', error);
      res.status(500).json({ message: "Failed to fetch campaigns: " + error.message });
    }
  });

  // Create email campaign
  app.post("/api/marketing/campaigns", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertEmailCampaignSchema.parse(req.body);
      const campaign = await storage.createEmailCampaign(validatedData);
      res.json({ 
        success: true, 
        message: "Campaign created successfully",
        campaign 
      });
    } catch (error: any) {
      console.error('Campaign creation error:', error);
      res.status(400).json({ message: "Invalid campaign data: " + error.message });
    }
  });

  // Send email campaign
  app.post("/api/marketing/campaigns/:id/send", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      
      // Get campaign
      const campaigns = await storage.getEmailCampaigns();
      const campaign = campaigns.find(c => c.id === id);
      
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }

      if (campaign.status === 'sent') {
        return res.status(400).json({ message: "Campaign already sent" });
      }

      // Get all subscribers
      const subscribers = await storage.getAllEmailSubscribers();
      
      if (subscribers.length === 0) {
        return res.status(400).json({ message: "No subscribers found" });
      }

      // Update campaign status to sending
      await storage.updateEmailCampaignStatus(id, 'sending', subscribers.length);

      // Get SendGrid client
      const { client: sgMail, fromEmail } = await getUncachableSendGridClient();

      // Send emails in batches
      const batchSize = 10;
      let sentCount = 0;
      let failedCount = 0;

      for (let i = 0; i < subscribers.length; i += batchSize) {
        const batch = subscribers.slice(i, i + batchSize);
        
        try {
          await Promise.all(batch.map(async (subscriber) => {
            try {
              await sgMail.send({
                to: subscriber.email,
                from: fromEmail,
                subject: campaign.subject,
                html: campaign.htmlContent,
              });
              sentCount++;
            } catch (error) {
              console.error(`Failed to send to ${subscriber.email}:`, error);
              failedCount++;
            }
          }));
        } catch (error) {
          console.error('Batch send error:', error);
        }

        // Small delay between batches to avoid rate limits
        if (i + batchSize < subscribers.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      // Update campaign status to sent
      await storage.updateEmailCampaignStatus(id, 'sent', sentCount, new Date());

      res.json({ 
        success: true, 
        message: `Campaign sent to ${sentCount} subscribers`,
        sentCount,
        failedCount
      });
    } catch (error: any) {
      console.error('Campaign send error:', error);
      
      // Try to update campaign status to failed
      try {
        const { id } = req.params;
        await storage.updateEmailCampaignStatus(id, 'failed', 0);
      } catch (updateError) {
        console.error('Failed to update campaign status:', updateError);
      }
      
      res.status(500).json({ message: "Failed to send campaign: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
