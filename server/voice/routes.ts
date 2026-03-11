import { Router, Request, Response } from "express";
import { generateGreeting, createCallLog, updateCallStatus } from "./receptionist";
import { saveTranscript, getTranscript, extractIntent } from "./transcription";
import { db } from "../db";
import { callLogs } from "@shared/schema";
import { desc } from "drizzle-orm";

const router = Router();

function requireAdmin(req: any, res: any, next: any) {
  const adminKey = process.env.ADMIN_API_KEY;
  const provided = req.headers["x-admin-api-key"];
  if (!adminKey || provided !== adminKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

router.post("/incoming", async (req: Request, res: Response) => {
  try {
    const { CallSid, From, Direction } = req.body;
    await createCallLog({
      twilioCallSid: CallSid,
      callerPhone: From,
      direction: Direction || "inbound",
    });
    const greeting = generateGreeting();
    res.type("text/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Joanna">${greeting}</Say>
  <Gather input="speech" action="/api/voice/process" method="POST" timeout="5" speechTimeout="auto">
    <Say voice="Polly.Joanna">Please tell me what you need.</Say>
  </Gather>
</Response>`);
  } catch (error: any) {
    console.error("[Voice] Incoming call error:", error);
    res.type("text/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>We're sorry, there was an error. Please try calling back.</Say>
</Response>`);
  }
});

router.post("/process", async (req: Request, res: Response) => {
  try {
    const { SpeechResult, CallSid } = req.body;
    const intent = extractIntent(SpeechResult || "");
    let responseText: string;
    switch (intent.intent) {
      case "booking":
        responseText = "I'd be happy to help you schedule a cleaning! Let me connect you with our scheduling team. You can also book online at our website.";
        break;
      case "quote":
        responseText = "For a standard cleaning, our prices start at $120 for homes up to 1,200 square feet. Deep cleaning starts at $200. For a precise quote, visit our website or I can connect you with our team.";
        break;
      case "cancellation":
        responseText = "I understand you need to cancel. Let me connect you with our team to assist with your cancellation.";
        break;
      case "reschedule":
        responseText = "I can help you reschedule. Let me connect you with our scheduling team.";
        break;
      default:
        responseText = "Thank you for your interest! Let me connect you with our team for more details.";
    }
    res.type("text/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Joanna">${responseText}</Say>
  <Say voice="Polly.Joanna">Thank you for calling! Have a great day.</Say>
</Response>`);
  } catch (error: any) {
    console.error("[Voice] Process error:", error);
    res.type("text/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>We're sorry, there was an error processing your request. Goodbye.</Say>
</Response>`);
  }
});

router.post("/status", async (req: Request, res: Response) => {
  try {
    const { CallSid, CallStatus, CallDuration } = req.body;
    await updateCallStatus(CallSid, CallStatus, CallDuration ? parseInt(CallDuration) : undefined);
    res.sendStatus(200);
  } catch (error: any) {
    console.error("[Voice] Status update error:", error);
    res.sendStatus(500);
  }
});

router.get("/calls", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const logs = await db.select().from(callLogs).orderBy(desc(callLogs.createdAt)).limit(100);
    res.json(logs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
