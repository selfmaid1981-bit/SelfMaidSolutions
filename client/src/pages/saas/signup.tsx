import { OnboardingWizard } from "@/components/saas/onboarding-wizard";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useLocation } from "wouter";

export default function SaasSignup() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  const handleComplete = async (data: { companyName: string; ownerEmail: string; phone: string; industry: string; tier: string }) => {
    setLoading(true);
    try {
      const slug = data.companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const res = await fetch("/api/saas/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-api-key": import.meta.env.VITE_ADMIN_API_KEY || "",
        },
        body: JSON.stringify({
          name: data.companyName,
          slug,
          ownerEmail: data.ownerEmail,
          phone: data.phone,
          industry: data.industry,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const company = await res.json();

      await fetch("/api/saas/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-api-key": import.meta.env.VITE_ADMIN_API_KEY || "",
        },
        body: JSON.stringify({
          companyId: company.id,
          tier: data.tier,
          status: "trialing",
        }),
      });

      localStorage.setItem("tenant_company_id", company.id);
      localStorage.setItem("tenant_company_name", company.name);
      localStorage.setItem("tenant_tier", data.tier);

      toast({ title: "Account created!", description: "Your 14-day free trial has started." });
      setLocation("/saas");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-6">
      <OnboardingWizard onComplete={handleComplete} loading={loading} />
    </div>
  );
}
