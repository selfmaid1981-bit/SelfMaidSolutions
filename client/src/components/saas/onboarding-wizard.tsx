import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Building, User, CreditCard, Check } from "lucide-react";

interface OnboardingWizardProps {
  onComplete: (data: { companyName: string; ownerEmail: string; phone: string; industry: string; tier: string }) => void;
  loading?: boolean;
}

const STEPS = [
  { key: "company", label: "Company Info", icon: Building },
  { key: "owner", label: "Owner Details", icon: User },
  { key: "plan", label: "Choose Plan", icon: CreditCard },
];

export function OnboardingWizard({ onComplete, loading }: OnboardingWizardProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    companyName: "",
    ownerEmail: "",
    phone: "",
    industry: "cleaning",
    tier: "starter",
  });

  const canNext = () => {
    if (step === 0) return form.companyName.length > 1;
    if (step === 1) return form.ownerEmail.includes("@") && form.phone.length > 5;
    return true;
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Get Started with Leading Edge</CardTitle>
        <div className="flex gap-2 mt-3">
          {STEPS.map((s, i) => (
            <div key={s.key} className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full ${i <= step ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-400"}`}>
              {i < step ? <Check className="h-3 w-3" /> : <s.icon className="h-3 w-3" />}
              {s.label}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === 0 && (
          <>
            <div><Label>Company Name</Label><Input value={form.companyName} onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} placeholder="Your Business Name" /></div>
            <div>
              <Label>Industry</Label>
              <Select value={form.industry} onValueChange={v => setForm(f => ({ ...f, industry: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cleaning">Cleaning Services</SelectItem>
                  <SelectItem value="landscaping">Landscaping</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="hvac">HVAC</SelectItem>
                  <SelectItem value="pest_control">Pest Control</SelectItem>
                  <SelectItem value="other">Other Service Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <div><Label>Email</Label><Input type="email" value={form.ownerEmail} onChange={e => setForm(f => ({ ...f, ownerEmail: e.target.value }))} placeholder="you@business.com" /></div>
            <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(555) 555-5555" /></div>
          </>
        )}
        {step === 2 && (
          <div className="space-y-3">
            {["starter", "professional", "enterprise"].map(t => (
              <div
                key={t}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${form.tier === t ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"}`}
                onClick={() => setForm(f => ({ ...f, tier: t }))}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">{t}</span>
                  <span className="text-sm text-gray-500">${t === "starter" ? 49 : t === "professional" ? 99 : 199}/mo</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-3 pt-2">
          {step > 0 && <Button variant="outline" onClick={() => setStep(s => s - 1)}>Back</Button>}
          {step < 2 ? (
            <Button className="flex-1" disabled={!canNext()} onClick={() => setStep(s => s + 1)}>Continue</Button>
          ) : (
            <Button className="flex-1" disabled={loading} onClick={() => onComplete(form)}>
              {loading ? "Setting up..." : "Create Account"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
