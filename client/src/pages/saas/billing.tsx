import { TenantNav } from "@/components/saas/tenant-nav";
import { SubscriptionPlans } from "@/components/saas/subscription-plans";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTenant } from "@/hooks/use-tenant";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Calendar } from "lucide-react";

export default function SaasBilling() {
  const { tier, companyName } = useTenant();
  const { toast } = useToast();

  return (
    <TenantNav>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Billing</h1>
          <p className="text-gray-500 text-sm">Manage your subscription and payment details</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold capitalize">{tier || "No Plan"}</p>
                <p className="text-sm text-gray-500">{companyName}</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="text-green-700 bg-green-50">Active</Badge>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Trial ends in 14 days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-lg font-semibold mb-4">Change Plan</h2>
          <SubscriptionPlans
            currentTier={tier || undefined}
            onSelectPlan={(plan) => {
              toast({ title: "Plan upgrade", description: `To upgrade to ${plan}, please contact support or connect your Stripe account.` });
            }}
          />
        </div>
      </div>
    </TenantNav>
  );
}
