import OpenAI from "openai";

let openaiClient: OpenAI | null = null;

function getClient(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
      baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
    });
  }
  return openaiClient;
}

export async function generateText(
  prompt: string,
  systemPrompt?: string,
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  const client = getClient();
  const messages: OpenAI.ChatCompletionMessageParam[] = [];

  if (systemPrompt) {
    messages.push({ role: "system", content: systemPrompt });
  }
  messages.push({ role: "user", content: prompt });

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    max_tokens: options?.maxTokens || 1024,
    temperature: options?.temperature ?? 0.7,
  });

  return response.choices[0]?.message?.content || "";
}

export async function extractStructuredData<T>(
  text: string,
  schema: string,
  context?: string
): Promise<T> {
  const systemPrompt = `You extract structured data from text. Return ONLY valid JSON matching this schema:\n${schema}\n${context ? `\nContext: ${context}` : ""}`;

  const result = await generateText(text, systemPrompt, {
    temperature: 0.1,
    maxTokens: 2048,
  });

  const jsonMatch = result.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in AI response");

  return JSON.parse(jsonMatch[0]) as T;
}

export async function summarizeCallTranscript(transcript: string): Promise<{
  summary: string;
  sentiment: "positive" | "neutral" | "negative";
  extractedData: {
    customerName?: string;
    phone?: string;
    email?: string;
    serviceType?: string;
    preferredDate?: string;
    address?: string;
    intent?: string;
  };
}> {
  const systemPrompt = `You analyze cleaning service phone call transcripts. Extract key information and provide a summary. Return ONLY valid JSON with this structure:
{
  "summary": "Brief 1-2 sentence summary of the call",
  "sentiment": "positive" | "neutral" | "negative",
  "extractedData": {
    "customerName": "string or null",
    "phone": "string or null",
    "email": "string or null",
    "serviceType": "string or null",
    "preferredDate": "string or null",
    "address": "string or null",
    "intent": "booking | inquiry | complaint | cancellation | other"
  }
}`;

  const result = await generateText(transcript, systemPrompt, {
    temperature: 0.2,
    maxTokens: 1024,
  });

  const jsonMatch = result.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return {
      summary: "Unable to parse transcript",
      sentiment: "neutral",
      extractedData: {},
    };
  }

  return JSON.parse(jsonMatch[0]);
}

export async function generateOutreachEmail(params: {
  businessName: string;
  businessType: string;
  city: string;
  serviceOffered: string;
}): Promise<{ subject: string; body: string }> {
  const systemPrompt = `You write professional, friendly B2B outreach emails for Self-Maid Cleaning Solutions targeting local service businesses. Keep emails under 150 words, warm but professional. Return ONLY valid JSON: { "subject": "...", "body": "..." }`;

  const prompt = `Write an outreach email to ${params.businessName}, a ${params.businessType} in ${params.city}. We offer ${params.serviceOffered} services. Make it personal and reference their specific business type.`;

  const result = await generateText(prompt, systemPrompt, {
    temperature: 0.8,
    maxTokens: 512,
  });

  const jsonMatch = result.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return {
      subject: `Professional Cleaning Services for ${params.businessName}`,
      body: `Hi,\n\nI'm reaching out from Self-Maid Cleaning Solutions. We provide professional ${params.serviceOffered} services in ${params.city} and would love to discuss how we can help ${params.businessName}.\n\nWould you have time for a quick call this week?\n\nBest,\nSelf-Maid Cleaning Solutions\n(334) 877-9513`,
    };
  }

  return JSON.parse(jsonMatch[0]);
}

export async function classifyLeadIntent(message: string): Promise<{
  intent: "booking" | "quote" | "inquiry" | "complaint" | "spam" | "other";
  confidence: number;
  suggestedResponse?: string;
}> {
  const systemPrompt = `Classify the customer intent of messages sent to a cleaning service company. Return ONLY valid JSON:
{
  "intent": "booking" | "quote" | "inquiry" | "complaint" | "spam" | "other",
  "confidence": 0.0-1.0,
  "suggestedResponse": "optional brief response suggestion"
}`;

  const result = await generateText(message, systemPrompt, {
    temperature: 0.1,
    maxTokens: 256,
  });

  const jsonMatch = result.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return { intent: "other", confidence: 0.5 };
  }

  return JSON.parse(jsonMatch[0]);
}

export { getClient as getOpenAIClient };
