import { TenantNav } from "@/components/saas/tenant-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTenant } from "@/hooks/use-tenant";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Settings as SettingsIcon, Building, Bell, Shield } from "lucide-react";

export default function SaasSettings() {
  const { companyName, tier } = useTenant();
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState(companyName || "");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <TenantNav>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500 text-sm">Manage your account and business settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building className="h-4 w-4" /> Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Business Name</Label><Input value={businessName} onChange={e => setBusinessName(e.target.value)} /></div>
              <div><Label>Contact Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="contact@yourbusiness.com" /></div>
              <div><Label>Phone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 555-5555" /></div>
              <Button onClick={() => toast({ title: "Settings saved" })}>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4" /> Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {["New lead notifications", "Appointment reminders", "Job completion alerts", "Weekly reports"].map(item => (
                <div key={item} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm">{item}</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4" /> Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm">Current Plan</span>
                <span className="text-sm font-medium capitalize">{tier || "None"}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm">Account Status</span>
                <span className="text-sm text-green-600">Active</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" /> Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Google Calendar", "Stripe Payments", "Twilio SMS", "SendGrid Email"].map(item => (
                <div key={item} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm">{item}</span>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </TenantNav>
  );
}
