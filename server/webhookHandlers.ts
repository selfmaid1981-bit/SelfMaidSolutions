import { getStripeSync } from './stripeClient';
import { storage } from './storage';
import { sendEmail } from './email';
import { sendSMS } from './twilio';
import { sendAutomatedReviewRequests } from './review-automation';

export class WebhookHandlers {
  static async processWebhook(payload: Buffer, signature: string, uuid: string): Promise<void> {
    if (!Buffer.isBuffer(payload)) {
      throw new Error(
        'STRIPE WEBHOOK ERROR: Payload must be a Buffer. ' +
        'Received type: ' + typeof payload + '. ' +
        'This usually means express.json() parsed the body before reaching this handler. ' +
        'FIX: Ensure webhook route is registered BEFORE app.use(express.json()).'
      );
    }

    const sync = await getStripeSync();
    
    // stripe-replit-sync handles signature verification and data syncing
    await sync.processWebhook(payload, signature, uuid);

    // Parse the raw payload to handle business logic
    // The signature was already verified by stripe-replit-sync
    const event = JSON.parse(payload.toString());

    // Handle specific events with business logic
    if (event.type === 'payment_intent.succeeded') {
      await WebhookHandlers.handlePaymentSuccess(event.data.object);
    }
  }

  static async handlePaymentSuccess(paymentIntent: any): Promise<void> {
    const bookingId = paymentIntent.metadata?.bookingId;
    
    if (!bookingId) {
      console.log('Payment succeeded but no bookingId in metadata');
      return;
    }

    try {
      // Update booking status to confirmed
      await storage.updateBookingStatus(bookingId, 'confirmed');
      
      // Get booking details for notifications
      const booking = await storage.getBooking(bookingId);
      if (!booking) {
        console.error(`Booking not found for ID: ${bookingId}`);
        return;
      }

      // Send confirmation email to customer
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

      // Send automated Google review request
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
      }

      console.log(`Payment confirmed for booking ${bookingId}`);
    } catch (error) {
      console.error(`Error processing payment success for booking ${bookingId}:`, error);
      throw error;
    }
  }
}
