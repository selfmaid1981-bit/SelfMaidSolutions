import { sendEmail } from "./email";
import { storage } from "./storage";

const GOOGLE_REVIEW_LINK = "https://search.google.com/local/writereview?placeid=ChIJ-erVoU0XiYgR8ZsW5vCBzL4";
const BUSINESS_PHONE = "(334) 877-9513";
const BUSINESS_EMAIL = "selfmaidclean@outlook.com";

export interface EmailTemplate {
  subject: string;
  html: string;
}

export const emailTemplates = {
  welcomeNewContact: (name: string): EmailTemplate => ({
    subject: "Welcome to Self-Maid Cleaning - Let's Make Your World Shine! ✨",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .cta-button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; border-radius: 0 0 8px 8px; }
          .highlight-box { background: #f0f9ff; border-left: 4px solid #0284c7; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Welcome to Self-Maid Cleaning!</h1>
            <p style="margin: 10px 0 0 0;">Professional Cleaning Services in Alabama</p>
          </div>
          
          <div class="content">
            <p>Hi ${name},</p>
            
            <p>Thank you for reaching out to Self-Maid Cleaning! We're thrilled you're considering us for your cleaning needs.</p>
            
            <div class="highlight-box">
              <h3 style="margin-top: 0; color: #0284c7;">🎉 Special Welcome Offer!</h3>
              <p style="margin: 0;"><strong>Save $20 on your first cleaning service!</strong></p>
              <p style="margin: 5px 0 0 0; font-size: 14px;">Just mention this email when you book.</p>
            </div>
            
            <h3>Why Choose Self-Maid Cleaning?</h3>
            <ul>
              <li>✨ <strong>16 Years of Excellence</strong> - Family-owned and operated since 2009</li>
              <li>🛡️ <strong>Fully Insured</strong> - Your property is protected</li>
              <li>⚡ <strong>Same-Day Service Available</strong> - We work around your schedule</li>
              <li>💯 <strong>100% Satisfaction Guarantee</strong> - We'll make it right</li>
              <li>👥 <strong>500+ Happy Customers</strong> - Join our cleaning family!</li>
            </ul>
            
            <h3>Our Services:</h3>
            <ul>
              <li>🏠 Residential Cleaning (starting at $108)</li>
              <li>🏢 Commercial Cleaning (starting at $156)</li>
              <li>🏖️ Airbnb/Vacation Rental Turnover (starting at $126)</li>
              <li>📦 Move-In/Move-Out Cleaning (starting at $162)</li>
              <li>✨ Deep Cleaning (starting at $250)</li>
              <li>🎓 Student Dorm Cleaning (call for pricing)</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="https://${process.env.REPLIT_DEV_DOMAIN || 'your-domain.com'}/#quote" class="cta-button">
                Get Your Free Quote Now
              </a>
            </div>
            
            <p>Questions? Call us at <strong>${BUSINESS_PHONE}</strong> or reply to this email. We typically respond within 2 hours!</p>
            
            <p>We look forward to making your world shine!</p>
            
            <p>Warm regards,<br>
            <strong>The Self-Maid Cleaning Team</strong><br>
            Montgomery, Prattville & Selma, Alabama</p>
          </div>
          
          <div class="footer">
            <p>Self-Maid Cleaning Solutions, LLC</p>
            <p>Phone: ${BUSINESS_PHONE} | Email: ${BUSINESS_EMAIL}</p>
            <p style="font-size: 12px;">You received this email because you contacted us through our website.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  followUpAfterQuote: (name: string, estimatedPrice: number, serviceType: string): EmailTemplate => ({
    subject: `${name}, Your Quote is Ready - Book Now & Save!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .price-box { background: #f0fdf4; border: 2px solid #10b981; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
          .cta-button { display: inline-block; background: #0284c7; color: white; padding: 14px 35px; text-decoration: none; border-radius: 6px; margin: 15px 0; font-weight: bold; font-size: 16px; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Ready to Book Your Cleaning?</h1>
            <p style="margin: 10px 0 0 0;">Your quote is waiting...</p>
          </div>
          
          <div class="content">
            <p>Hi ${name},</p>
            
            <p>Thanks for requesting a quote for <strong>${serviceType}</strong>! We wanted to follow up and make sure you have everything you need to make a decision.</p>
            
            <div class="price-box">
              <h2 style="color: #10b981; margin: 0 0 10px 0;">Your Estimated Price</h2>
              <h1 style="color: #059669; margin: 0; font-size: 42px;">$${estimatedPrice}</h1>
              <p style="margin: 10px 0 0 0; color: #6b7280;">Final price confirmed after walkthrough</p>
            </div>
            
            <h3>⏰ Limited Time Offer!</h3>
            <p><strong>Book within the next 48 hours and save an additional $10!</strong></p>
            
            <div style="text-align: center;">
              <a href="https://${process.env.REPLIT_DEV_DOMAIN || 'your-domain.com'}/#services" class="cta-button">
                Book Your Cleaning Now
              </a>
            </div>
            
            <h3>What Happens Next?</h3>
            <ol>
              <li>📞 <strong>Choose Your Date</strong> - Pick a time that works for you</li>
              <li>✅ <strong>Confirm Your Service</strong> - We'll send a confirmation email</li>
              <li>🧹 <strong>We Clean</strong> - Our professional team arrives on time</li>
              <li>😊 <strong>Enjoy Your Sparkling Space</strong> - 100% satisfaction guaranteed!</li>
            </ol>
            
            <p><strong>Questions or want to customize your service?</strong><br>
            Call us at ${BUSINESS_PHONE} or reply to this email.</p>
            
            <p>Looking forward to serving you!</p>
            
            <p>Best regards,<br>
            <strong>The Self-Maid Cleaning Team</strong></p>
          </div>
          
          <div class="footer">
            <p>Self-Maid Cleaning Solutions, LLC</p>
            <p>Phone: ${BUSINESS_PHONE} | Email: ${BUSINESS_EMAIL}</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  thankYouAfterBooking: (name: string, serviceType: string, serviceDate: string): EmailTemplate => ({
    subject: "Thank You for Booking! We Can't Wait to Serve You 🎉",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .info-box { background: #faf5ff; border: 2px solid #8b5cf6; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .cta-button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 15px 0; font-weight: bold; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🎉 Thank You for Booking!</h1>
            <p style="margin: 10px 0 0 0;">We're excited to make your space sparkle!</p>
          </div>
          
          <div class="content">
            <p>Hi ${name},</p>
            
            <p>Thank you for choosing Self-Maid Cleaning! We're honored to be your cleaning partner and can't wait to make your space shine.</p>
            
            <div class="info-box">
              <h3 style="margin-top: 0; color: #8b5cf6;">Your Upcoming Service:</h3>
              <p><strong>Service:</strong> ${serviceType}</p>
              <p><strong>Scheduled Date:</strong> ${serviceDate}</p>
              <p style="margin-bottom: 0;"><strong>Status:</strong> Confirmed ✓</p>
            </div>
            
            <h3>What to Expect:</h3>
            <ul>
              <li>📞 <strong>24-Hour Reminder</strong> - We'll call you the day before to confirm</li>
              <li>⏰ <strong>On-Time Arrival</strong> - Our team will arrive within your scheduled window</li>
              <li>🧹 <strong>Professional Service</strong> - Trained, insured, and background-checked cleaners</li>
              <li>✨ <strong>Quality Guarantee</strong> - We'll make it right if you're not 100% satisfied</li>
            </ul>
            
            <h3>Prepare for Your Cleaning:</h3>
            <ul>
              <li>Secure any valuables or fragile items</li>
              <li>Clear clutter from surfaces to be cleaned</li>
              <li>Secure pets in a safe area (if applicable)</li>
              <li>Make sure we can access all areas to be cleaned</li>
            </ul>
            
            <p><strong>Need to reschedule or have special requests?</strong><br>
            Call us at ${BUSINESS_PHONE} - no problem at all!</p>
            
            <div style="text-align: center; background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #059669;">Love Our Service?</h3>
              <p style="margin-bottom: 15px;">Refer a friend and you BOTH get $30 off your next cleaning!</p>
            </div>
            
            <p>We're looking forward to serving you!</p>
            
            <p>Warmly,<br>
            <strong>The Self-Maid Cleaning Team</strong></p>
          </div>
          
          <div class="footer">
            <p>Self-Maid Cleaning Solutions, LLC</p>
            <p>Phone: ${BUSINESS_PHONE} | Email: ${BUSINESS_EMAIL}</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  reengagementInactive: (name: string): EmailTemplate => ({
    subject: "We Miss You! Come Back & Save 25% Off 💚",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .offer-box { background: #fef2f2; border: 3px solid #ef4444; padding: 25px; text-align: center; border-radius: 8px; margin: 20px 0; }
          .cta-button { display: inline-block; background: #ef4444; color: white; padding: 14px 35px; text-decoration: none; border-radius: 6px; margin: 15px 0; font-weight: bold; font-size: 16px; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">We Miss You!</h1>
            <p style="margin: 10px 0 0 0;">It's been a while since we last cleaned for you...</p>
          </div>
          
          <div class="content">
            <p>Hi ${name},</p>
            
            <p>We noticed it's been a while since your last cleaning with us. Life gets busy - we totally understand!</p>
            
            <p>But your home deserves to sparkle, and we'd love the chance to serve you again.</p>
            
            <div class="offer-box">
              <h2 style="color: #dc2626; margin: 0 0 15px 0;">🎁 WELCOME BACK SPECIAL!</h2>
              <h1 style="color: #ef4444; margin: 0; font-size: 48px;">25% OFF</h1>
              <p style="margin: 15px 0 0 0; font-size: 18px;"><strong>Your Next Cleaning Service</strong></p>
              <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">Book within 7 days - Limited time offer!</p>
            </div>
            
            <h3>Here's What You've Been Missing:</h3>
            <ul>
              <li>✨ <strong>Enhanced Deep Cleaning</strong> - New service just launched!</li>
              <li>📱 <strong>Easy Online Booking</strong> - Schedule 24/7 from any device</li>
              <li>💳 <strong>Flexible Payment Options</strong> - Pay now or pay later</li>
              <li>⭐ <strong>Same Great Service</strong> - The quality you remember and love</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="https://${process.env.REPLIT_DEV_DOMAIN || 'your-domain.com'}/#services" class="cta-button">
                Claim Your 25% Discount
              </a>
            </div>
            
            <p style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px;">Use code: <strong style="color: #ef4444;">COMEBACK25</strong> at checkout</p>
            
            <p><strong>Not ready to book yet?</strong> That's okay! Give us a call at ${BUSINESS_PHONE} to chat about your cleaning needs.</p>
            
            <p>We hope to see you soon!</p>
            
            <p>With warm regards,<br>
            <strong>The Self-Maid Cleaning Team</strong></p>
          </div>
          
          <div class="footer">
            <p>Self-Maid Cleaning Solutions, LLC</p>
            <p>Phone: ${BUSINESS_PHONE} | Email: ${BUSINESS_EMAIL}</p>
            <p style="font-size: 12px;">Don't want to receive these emails? <a href="#" style="color: #6b7280;">Unsubscribe</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  seasonalPromotion: (name: string, season: string, discount: number): EmailTemplate => ({
    subject: `${season} Cleaning Special - Save ${discount}% This Season! 🍂`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .promo-box { background: #fffbeb; border: 3px solid #f59e0b; padding: 25px; text-align: center; border-radius: 8px; margin: 20px 0; }
          .cta-button { display: inline-block; background: #0284c7; color: white; padding: 14px 35px; text-decoration: none; border-radius: 6px; margin: 15px 0; font-weight: bold; font-size: 16px; }
          .service-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
          .service-card { background: #f9fafb; padding: 15px; border-radius: 6px; text-align: center; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">${season} Cleaning Special!</h1>
            <p style="margin: 10px 0 0 0;">Fresh season, fresh start, fresh savings!</p>
          </div>
          
          <div class="content">
            <p>Hi ${name},</p>
            
            <p>${season} is here, and it's the perfect time to refresh your space with a professional cleaning!</p>
            
            <div class="promo-box">
              <h2 style="color: #d97706; margin: 0 0 15px 0;">⏰ LIMITED TIME OFFER!</h2>
              <h1 style="color: #f59e0b; margin: 0; font-size: 52px;">${discount}% OFF</h1>
              <p style="margin: 15px 0 0 0; font-size: 18px;"><strong>All ${season} Cleaning Services</strong></p>
              <p style="margin: 10px 0 0 0; color: #6b7280;">Valid through end of season - Book now!</p>
            </div>
            
            <h3>Perfect Services for ${season}:</h3>
            
            <div class="service-grid">
              <div class="service-card">
                <h4 style="margin: 0 0 10px 0; color: #0284c7;">🏠 Deep Cleaning</h4>
                <p style="margin: 0; font-size: 14px;">Starting at $188<br><s style="color: #6b7280;">$250</s></p>
              </div>
              <div class="service-card">
                <h4 style="margin: 0 0 10px 0; color: #0284c7;">✨ Move-In/Out</h4>
                <p style="margin: 0; font-size: 14px;">Starting at $122<br><s style="color: #6b7280;">$162</s></p>
              </div>
              <div class="service-card">
                <h4 style="margin: 0 0 10px 0; color: #0284c7;">🏢 Commercial</h4>
                <p style="margin: 0; font-size: 14px;">Starting at $117<br><s style="color: #6b7280;">$156</s></p>
              </div>
              <div class="service-card">
                <h4 style="margin: 0 0 10px 0; color: #0284c7;">🏡 Residential</h4>
                <p style="margin: 0; font-size: 14px;">Starting at $81<br><s style="color: #6b7280;">$108</s></p>
              </div>
            </div>
            
            <div style="text-align: center;">
              <a href="https://${process.env.REPLIT_DEV_DOMAIN || 'your-domain.com'}/#services" class="cta-button">
                Book Your ${season} Cleaning Now
              </a>
            </div>
            
            <h3>Why Book Now?</h3>
            <ul>
              <li>💰 <strong>Biggest Savings</strong> - ${discount}% off all services</li>
              <li>📅 <strong>Priority Scheduling</strong> - Choose your preferred date</li>
              <li>🎁 <strong>Free Extras</strong> - Complimentary window cleaning with deep clean</li>
              <li>⭐ <strong>Same-Day Available</strong> - Last-minute? We've got you covered!</li>
            </ul>
            
            <p><strong>Questions? Call us at ${BUSINESS_PHONE}</strong> - we're here to help!</p>
            
            <p>Let's make this ${season.toLowerCase()} your cleanest yet!</p>
            
            <p>Warm regards,<br>
            <strong>The Self-Maid Cleaning Team</strong></p>
          </div>
          
          <div class="footer">
            <p>Self-Maid Cleaning Solutions, LLC</p>
            <p>Phone: ${BUSINESS_PHONE} | Email: ${BUSINESS_EMAIL}</p>
            <p style="font-size: 12px;">You're receiving this because you're a valued Self-Maid customer or subscriber.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  referralProgram: (name: string): EmailTemplate => ({
    subject: "Earn $30 for Every Friend You Refer! 💰",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .reward-box { background: #f0fdf4; border: 3px solid #10b981; padding: 25px; text-align: center; border-radius: 8px; margin: 20px 0; }
          .cta-button { display: inline-block; background: #0284c7; color: white; padding: 14px 35px; text-decoration: none; border-radius: 6px; margin: 15px 0; font-weight: bold; font-size: 16px; }
          .step { background: #f9fafb; padding: 15px; margin: 10px 0; border-left: 4px solid #10b981; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Share the Sparkle, Earn Rewards!</h1>
            <p style="margin: 10px 0 0 0;">Our Referral Program is Here! 💚</p>
          </div>
          
          <div class="content">
            <p>Hi ${name},</p>
            
            <p>You love our cleaning service, and we love having you as a customer! Now you can share the sparkle with friends and family - and get rewarded for it!</p>
            
            <div class="reward-box">
              <h2 style="color: #059669; margin: 0 0 15px 0;">🎉 REFERRAL REWARDS!</h2>
              <h1 style="color: #10b981; margin: 0; font-size: 52px;">$30 OFF</h1>
              <p style="margin: 15px 0; font-size: 18px;"><strong>For You AND Your Friend!</strong></p>
              <p style="margin: 0; color: #6b7280;">Everyone wins when you share the love ❤️</p>
            </div>
            
            <h3>How It Works:</h3>
            
            <div class="step">
              <strong>Step 1: Share</strong><br>
              Tell your friends about Self-Maid Cleaning and give them your name.
            </div>
            
            <div class="step">
              <strong>Step 2: They Book</strong><br>
              Your friend books their first cleaning and mentions you referred them.
            </div>
            
            <div class="step">
              <strong>Step 3: You Both Save!</strong><br>
              You get $30 off your next cleaning, they get $30 off their first cleaning!
            </div>
            
            <h3>💰 Unlimited Earning Potential!</h3>
            <p>There's no limit! Refer 5 friends, earn $150 in credits. Refer 10 friends, earn $300. The more you share, the more you save!</p>
            
            <div style="background: #fffbeb; border: 2px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #d97706;">🏆 Referral Leaderboard</h3>
              <p><strong>Our top referrer has earned over $500 in free cleanings!</strong></p>
              <p style="margin-bottom: 0; font-size: 14px;">Could you be next?</p>
            </div>
            
            <div style="text-align: center;">
              <a href="tel:${BUSINESS_PHONE.replace(/[^0-9]/g, '')}" class="cta-button">
                Call to Refer a Friend
              </a>
            </div>
            
            <p style="text-align: center; margin-top: 20px;">Or simply have your friend mention your name when they book!</p>
            
            <h3>Who Can You Refer?</h3>
            <ul>
              <li>🏠 Homeowners who need regular cleaning</li>
              <li>🏢 Small business owners needing commercial cleaning</li>
              <li>🏖️ Airbnb hosts managing vacation rentals</li>
              <li>📦 Anyone moving in or out who needs deep cleaning</li>
              <li>👥 Family, friends, coworkers, neighbors - anyone!</li>
            </ul>
            
            <p>Start referring today and watch those savings add up!</p>
            
            <p>Thank you for being an amazing customer!</p>
            
            <p>Gratefully,<br>
            <strong>The Self-Maid Cleaning Team</strong></p>
          </div>
          
          <div class="footer">
            <p>Self-Maid Cleaning Solutions, LLC</p>
            <p>Phone: ${BUSINESS_PHONE} | Email: ${BUSINESS_EMAIL}</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
};

export async function sendWelcomeEmail(name: string, email: string): Promise<boolean> {
  try {
    const template = emailTemplates.welcomeNewContact(name);
    await sendEmail({
      to: email,
      from: BUSINESS_EMAIL,
      subject: template.subject,
      html: template.html,
    });
    return true;
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return false;
  }
}

export async function sendFollowUpEmail(
  name: string,
  email: string,
  estimatedPrice: number,
  serviceType: string
): Promise<boolean> {
  try {
    const template = emailTemplates.followUpAfterQuote(name, estimatedPrice, serviceType);
    await sendEmail({
      to: email,
      from: BUSINESS_EMAIL,
      subject: template.subject,
      html: template.html,
    });
    return true;
  } catch (error) {
    console.error("Failed to send follow-up email:", error);
    return false;
  }
}

export async function sendThankYouEmail(
  name: string,
  email: string,
  serviceType: string,
  serviceDate: string
): Promise<boolean> {
  try {
    const template = emailTemplates.thankYouAfterBooking(name, serviceType, serviceDate);
    await sendEmail({
      to: email,
      from: BUSINESS_EMAIL,
      subject: template.subject,
      html: template.html,
    });
    return true;
  } catch (error) {
    console.error("Failed to send thank you email:", error);
    return false;
  }
}

export async function sendBulkCampaign(
  campaignId: string,
  templateType: "reengagement" | "seasonal" | "referral",
  customData?: { season?: string; discount?: number }
): Promise<{ sent: number; failed: number }> {
  try {
    const subscribers = await storage.getAllEmailSubscribers();
    
    let sent = 0;
    let failed = 0;

    for (const subscriber of subscribers) {
      try {
        let template: EmailTemplate;

        switch (templateType) {
          case "reengagement":
            template = emailTemplates.reengagementInactive(subscriber.name);
            break;
          case "seasonal":
            template = emailTemplates.seasonalPromotion(
              subscriber.name,
              customData?.season || "Spring",
              customData?.discount || 20
            );
            break;
          case "referral":
            template = emailTemplates.referralProgram(subscriber.name);
            break;
          default:
            continue;
        }

        await sendEmail({
          to: subscriber.email,
          from: BUSINESS_EMAIL,
          subject: template.subject,
          html: template.html,
        });

        sent++;
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed to send to ${subscriber.email}:`, error);
        failed++;
      }
    }

    // Update campaign status
    await storage.updateEmailCampaignStatus(campaignId, "sent", sent, new Date());

    return { sent, failed };
  } catch (error) {
    console.error("Failed to send bulk campaign:", error);
    await storage.updateEmailCampaignStatus(campaignId, "failed");
    return { sent: 0, failed: 0 };
  }
}
