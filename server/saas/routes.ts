import { Router, Request, Response } from "express";
import { getCompany, getCompanyBySlug, createCompany, updateCompany, getAllCompanies } from "./tenants";
import { getSubscription, createSubscription, updateSubscription, cancelSubscription, TIERS } from "./subscriptions";
import { getDiscoveredBusinesses, createDiscoveredBusiness, updateBusinessStatus } from "./lead-discovery";

const router = Router();

function pick<T extends Record<string, any>>(obj: T, keys: string[]): Partial<T> {
  const result: any = {};
  for (const key of keys) {
    if (key in obj) result[key] = obj[key];
  }
  return result;
}

const COMPANY_MUTABLE = ["name", "slug", "ownerEmail", "phone", "address", "city", "state", "industry", "settings"];
const SUBSCRIPTION_MUTABLE = ["tier", "status", "stripeSubscriptionId", "stripePriceId", "currentPeriodStart", "currentPeriodEnd"];

function requireAdmin(req: any, res: any, next: any) {
  const adminKey = process.env.ADMIN_API_KEY;
  const provided = req.headers["x-admin-api-key"];
  if (!adminKey || provided !== adminKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

router.get("/tiers", (_req: Request, res: Response) => {
  res.json(TIERS);
});

router.get("/companies", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const companies = await getAllCompanies();
    res.json(companies);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/companies/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const company = await getCompany(req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.json(company);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/companies", requireAdmin, async (req: Request, res: Response) => {
  try {
    const company = await createCompany(req.body);
    res.status(201).json(company);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/companies/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const company = await updateCompany(req.params.id, pick(req.body, COMPANY_MUTABLE));
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.json(company);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/subscriptions/:companyId", requireAdmin, async (req: Request, res: Response) => {
  try {
    const sub = await getSubscription(req.params.companyId);
    if (!sub) return res.status(404).json({ error: "Subscription not found" });
    res.json(sub);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/subscriptions", requireAdmin, async (req: Request, res: Response) => {
  try {
    const sub = await createSubscription(req.body);
    res.status(201).json(sub);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/subscriptions/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const sub = await updateSubscription(req.params.id, pick(req.body, SUBSCRIPTION_MUTABLE));
    if (!sub) return res.status(404).json({ error: "Subscription not found" });
    res.json(sub);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/subscriptions/:id/cancel", requireAdmin, async (req: Request, res: Response) => {
  try {
    const sub = await cancelSubscription(req.params.id);
    if (!sub) return res.status(404).json({ error: "Subscription not found" });
    res.json(sub);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/lead-discovery", requireAdmin, async (req: Request, res: Response) => {
  try {
    const companyId = req.query.companyId as string | undefined;
    const businesses = await getDiscoveredBusinesses(companyId);
    res.json(businesses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/lead-discovery", requireAdmin, async (req: Request, res: Response) => {
  try {
    const biz = await createDiscoveredBusiness(req.body);
    res.status(201).json(biz);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/lead-discovery/:id/status", requireAdmin, async (req: Request, res: Response) => {
  try {
    const biz = await updateBusinessStatus(req.params.id, req.body.status);
    if (!biz) return res.status(404).json({ error: "Business not found" });
    res.json(biz);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
