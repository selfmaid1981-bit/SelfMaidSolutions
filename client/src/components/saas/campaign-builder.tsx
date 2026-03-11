import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Mail, MessageSquare } from "lucide-react";

interface CampaignBuilderProps {
  onSend: (campaign: { type: string; subject: string; body: string; audience: string }) => void;
  sending?: boolean;
}

export function CampaignBuilder({ onSend, sending }: CampaignBuilderProps) {
  const [type, setType] = useState("email");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("all_leads");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {type === "email" ? <Mail className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
          Campaign Builder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Campaign Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Audience</Label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all_leads">All Leads</SelectItem>
                <SelectItem value="new_leads">New Leads Only</SelectItem>
                <SelectItem value="qualified">Qualified Leads</SelectItem>
                <SelectItem value="clients">Existing Clients</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {type === "email" && (
          <div>
            <Label>Subject</Label>
            <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Email subject line..." />
          </div>
        )}
        <div>
          <Label>{type === "email" ? "Body" : "Message"}</Label>
          <Textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={type === "email" ? 6 : 3}
            placeholder={type === "email" ? "Write your email content..." : "Write your SMS message (160 chars recommended)..."}
          />
          {type === "sms" && (
            <p className="text-xs text-gray-400 mt-1">{body.length}/160 characters</p>
          )}
        </div>
        <Button
          className="w-full"
          disabled={!body || (type === "email" && !subject) || sending}
          onClick={() => onSend({ type, subject, body, audience })}
        >
          {sending ? "Sending..." : `Send ${type === "email" ? "Email" : "SMS"} Campaign`}
        </Button>
      </CardContent>
    </Card>
  );
}
