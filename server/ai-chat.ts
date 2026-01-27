import type { Express, Request, Response } from "express";
import OpenAI from "openai";
import { db } from "./db";
import { conversations, messages } from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { sendEmail } from "./email";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const SYSTEM_PROMPT = `You are a helpful customer service assistant for Self-Maid Cleaning Solutions, a professional cleaning company serving Montgomery, Prattville, Selma, Homewood, Clanton and surrounding Alabama areas since 2009.

Your role is to:
1. Answer questions about our cleaning services (Residential, Commercial, Airbnb/Vacation Rental, Move-In/Move-Out, Deep Cleaning)
2. Provide pricing information:
   - Residential: Starting at $80
   - Commercial: Starting at $120
   - Airbnb/Vacation Rental: Starting at $65
   - Move-In/Move-Out: Starting at $150
   - Deep Cleaning: Starting at $120
3. Help customers understand what's included in each service
4. Explain our frequency discounts (10% off bi-weekly, 15% off weekly)
5. Collect customer information for scheduling (name, email, phone, address, preferred date/time)
6. Answer questions about our service areas

When a customer wants to schedule a cleaning:
1. Ask for their name
2. Ask for their email address
3. Ask for their phone number
4. Ask which service they need
5. Ask for their address
6. Ask for their preferred date and time
7. Confirm all details and let them know someone will follow up

Be friendly, professional, and helpful. If you don't know something, say so and offer to have a team member follow up.

Business Hours: Monday-Saturday 8am-6pm
Phone: (334) 877-9513
Email: info@selfmaidcleaning.com`;

export function registerAIChatRoutes(app: Express): void {
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message, conversationId, customerInfo } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      let convId = conversationId;

      if (!convId) {
        const [newConv] = await db.insert(conversations).values({ 
          title: message.substring(0, 50) 
        }).returning();
        convId = newConv.id;
      }

      await db.insert(messages).values({
        conversationId: convId,
        role: "user",
        content: message,
      });

      const existingMessages = await db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, convId))
        .orderBy(messages.createdAt);

      const chatHistory = existingMessages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...chatHistory,
        ],
        stream: true,
        max_completion_tokens: 1024,
      });

      let fullResponse = "";

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          fullResponse += content;
          res.write(`data: ${JSON.stringify({ content, conversationId: convId })}\n\n`);
        }
      }

      await db.insert(messages).values({
        conversationId: convId,
        role: "assistant",
        content: fullResponse,
      });

      const shouldNotify = 
        message.toLowerCase().includes("schedule") ||
        message.toLowerCase().includes("book") ||
        message.toLowerCase().includes("appointment") ||
        message.toLowerCase().includes("quote") ||
        existingMessages.length >= 4;

      if (shouldNotify) {
        const conversationText = existingMessages
          .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
          .join("\n\n");

        const ownerEmail = process.env.OWNER_EMAIL || "info@selfmaidcleaning.com";
        
        try {
          await sendEmail({
            to: ownerEmail,
            from: process.env.SENDGRID_FROM_EMAIL || "noreply@selfmaidcleaning.com",
            subject: `[Self-Maid Chat] New Customer Inquiry`,
            html: `
              <h2>New Chat Conversation</h2>
              <p>A customer has been chatting with the AI assistant. Here's the conversation:</p>
              <hr>
              <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${conversationText}\n\nASSISTANT: ${fullResponse}</pre>
              <hr>
              <p><strong>Conversation ID:</strong> ${convId}</p>
              <p><em>This is an automated notification from your website's chat assistant.</em></p>
            `,
          });
        } catch (emailError) {
          console.error("Failed to send chat notification email:", emailError);
        }
      }

      res.write(`data: ${JSON.stringify({ done: true, conversationId: convId })}\n\n`);
      res.end();
    } catch (error) {
      console.error("Error in chat:", error);
      if (res.headersSent) {
        res.write(`data: ${JSON.stringify({ error: "Failed to process message" })}\n\n`);
        res.end();
      } else {
        res.status(500).json({ error: "Failed to process message" });
      }
    }
  });

  app.get("/api/chat/conversations", async (req: Request, res: Response) => {
    try {
      const allConversations = await db
        .select()
        .from(conversations)
        .orderBy(desc(conversations.createdAt))
        .limit(50);
      res.json(allConversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  app.get("/api/chat/conversations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const conversationMessages = await db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, id))
        .orderBy(messages.createdAt);
      res.json(conversationMessages);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  });
}
