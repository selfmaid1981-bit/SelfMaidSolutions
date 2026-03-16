import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const PLANS = [
  {
    key: "starter",
    name: "Starter",
    price: 49,
    features: ["CRM Dashboard", "Up to 50 leads/month", "Basic analytics", "Email notifications"],
    color: "border-emerald-200",
    popular: false,
  },
  {
    key: "professional",
    name: "Professional",
    price: 99,
    features: ["Everything in Starter", "Unlimited leads", "Advanced analytics", "SMS automation", "Email campaigns", "Pipeline management"],
    color: "border-purple-400",
    popular: true,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: 199,
    features: ["Everything in Professional", "AI Receptionist", "Lead Discovery Engine", "Multi-location support", "Priority support", "Custom integrations"],
    color: "border-orange-200",
    popular: false,
  },
];

interface SubscriptionPlansProps {
  currentTier?: string;
  onSelectPlan?: (tier: string) => void;
}

export function SubscriptionPlans({ currentTier, onSelectPlan }: SubscriptionPlansProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {PLANS.map(plan => (
        <Card key={plan.key} className={`relative ${plan.popular ? `border-2 ${plan.color} shadow-lg` : ""}`}>
          {plan.popular && (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600">Most Popular</Badge>
          )}
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-lg">{plan.name}</CardTitle>
            <div className="mt-2">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-gray-500 text-sm">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              className="w-full"
              variant={currentTier === plan.key ? "outline" : plan.popular ? "default" : "outline"}
              disabled={currentTier === plan.key}
              onClick={() => onSelectPlan?.(plan.key)}
            >
              {currentTier === plan.key ? "Current Plan" : "Get Started"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
