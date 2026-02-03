import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Play, Square, RefreshCw, Mail, Clock, Users, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const ADMIN_API_KEY = localStorage.getItem('adminApiKey') || '';

export default function OutreachAutomation() {
  const { toast } = useToast();
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [intervalMinutes, setIntervalMinutes] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  const { data: stats, refetch: refetchStats } = useQuery({
    queryKey: ['/api/admin/outreach/stats'],
    queryFn: async () => {
      const res = await fetch('/api/admin/outreach/stats', {
        headers: { 'x-admin-api-key': ADMIN_API_KEY }
      });
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
    refetchInterval: isRunning ? 30000 : false,
  });

  const { data: records, refetch: refetchRecords } = useQuery({
    queryKey: ['/api/admin/outreach/records'],
    queryFn: async () => {
      const res = await fetch('/api/admin/outreach/records', {
        headers: { 'x-admin-api-key': ADMIN_API_KEY }
      });
      if (!res.ok) throw new Error('Failed to fetch records');
      return res.json();
    },
  });

  const startMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/admin/outreach/automation/start', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-api-key': ADMIN_API_KEY 
        },
        body: JSON.stringify({ spreadsheetId, intervalMinutes })
      });
      if (!res.ok) throw new Error('Failed to start');
      return res.json();
    },
    onSuccess: (data) => {
      setIsRunning(true);
      toast({ title: "Automation Started", description: data.message });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const stopMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/admin/outreach/automation/stop', {
        method: 'POST',
        headers: { 'x-admin-api-key': ADMIN_API_KEY }
      });
      if (!res.ok) throw new Error('Failed to stop');
      return res.json();
    },
    onSuccess: () => {
      setIsRunning(false);
      toast({ title: "Automation Stopped" });
    }
  });

  const processNowMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/admin/outreach/process-now', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-api-key': ADMIN_API_KEY 
        },
        body: JSON.stringify({ spreadsheetId })
      });
      if (!res.ok) throw new Error('Failed to process');
      return res.json();
    },
    onSuccess: (data) => {
      toast({ title: "Processing Complete", description: data.message });
      refetchStats();
      refetchRecords();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "outline",
      sent_initial: "secondary",
      sent_followup1: "secondary",
      sent_followup2: "secondary",
      sent_followup3: "secondary",
      responded: "default",
      converted: "default",
      unsubscribed: "destructive",
    };
    return <Badge variant={variants[status] || "outline"}>{status.replace(/_/g, ' ')}</Badge>;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/admin/outreach">
              <Button variant="ghost" size="sm" className="mb-2">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Templates
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Email Outreach Automation</h1>
            <p className="text-slate-600">Automate follow-up emails for property managers & realtors</p>
          </div>
          <Badge variant={isRunning ? "default" : "secondary"} className="text-lg px-4 py-2">
            {isRunning ? "Running" : "Stopped"}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" /> Automation Settings
              </CardTitle>
              <CardDescription>Configure automated email sequences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="spreadsheetId">Google Sheets ID</Label>
                <Input
                  id="spreadsheetId"
                  value={spreadsheetId}
                  onChange={(e) => setSpreadsheetId(e.target.value)}
                  placeholder="Enter your leads spreadsheet ID"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Find this in your Google Sheet URL after /d/
                </p>
              </div>
              
              <div>
                <Label htmlFor="interval">Check Interval (minutes)</Label>
                <Input
                  id="interval"
                  type="number"
                  value={intervalMinutes}
                  onChange={(e) => setIntervalMinutes(Number(e.target.value))}
                  min={15}
                  max={1440}
                />
              </div>

              <div className="flex gap-2">
                {isRunning ? (
                  <Button 
                    onClick={() => stopMutation.mutate()} 
                    variant="destructive"
                    disabled={stopMutation.isPending}
                    className="flex-1"
                  >
                    <Square className="w-4 h-4 mr-2" /> Stop Automation
                  </Button>
                ) : (
                  <Button 
                    onClick={() => startMutation.mutate()} 
                    disabled={startMutation.isPending}
                    className="flex-1"
                  >
                    <Play className="w-4 h-4 mr-2" /> Start Automation
                  </Button>
                )}
                
                <Button 
                  onClick={() => processNowMutation.mutate()} 
                  variant="outline"
                  disabled={processNowMutation.isPending}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${processNowMutation.isPending ? 'animate-spin' : ''}`} /> 
                  Run Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" /> Outreach Stats
              </CardTitle>
              <CardDescription>Email sequence performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-slate-100 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">{stats?.total || 0}</div>
                  <div className="text-xs text-slate-600">Total Leads</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats?.sentInitial || 0}</div>
                  <div className="text-xs text-slate-600">Initial Sent</div>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">
                    {(stats?.sentFollowUp1 || 0) + (stats?.sentFollowUp2 || 0) + (stats?.sentFollowUp3 || 0)}
                  </div>
                  <div className="text-xs text-slate-600">Follow-ups</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats?.responded || 0}</div>
                  <div className="text-xs text-slate-600">Responded</div>
                </div>
                <div className="text-center p-3 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">{stats?.converted || 0}</div>
                  <div className="text-xs text-slate-600">Converted</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{stats?.unsubscribed || 0}</div>
                  <div className="text-xs text-slate-600">Unsubscribed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" /> Outreach Records
            </CardTitle>
            <CardDescription>All leads in the email sequence</CardDescription>
          </CardHeader>
          <CardContent>
            {records && records.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Initial Sent</th>
                      <th className="text-left p-2">Last Follow-up</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record: any) => (
                      <tr key={record.id} className="border-b hover:bg-slate-50">
                        <td className="p-2">{record.leadEmail}</td>
                        <td className="p-2">{record.leadName}</td>
                        <td className="p-2">
                          <Badge variant="outline">{record.leadType}</Badge>
                        </td>
                        <td className="p-2">{getStatusBadge(record.status)}</td>
                        <td className="p-2 text-slate-600">
                          {record.initialSentAt ? new Date(record.initialSentAt).toLocaleDateString() : '-'}
                        </td>
                        <td className="p-2 text-slate-600">
                          {record.followUp3SentAt ? new Date(record.followUp3SentAt).toLocaleDateString() :
                           record.followUp2SentAt ? new Date(record.followUp2SentAt).toLocaleDateString() :
                           record.followUp1SentAt ? new Date(record.followUp1SentAt).toLocaleDateString() : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No outreach records yet</p>
                <p className="text-sm">Start automation or run manually to begin sending emails</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-900 mb-2">How Automation Works</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Day 0:</strong> Initial outreach email sent to new leads</li>
              <li>• <strong>Day 3:</strong> First follow-up if no response</li>
              <li>• <strong>Day 7:</strong> Second follow-up with special offer</li>
              <li>• <strong>Day 14:</strong> Final "staying in touch" email</li>
              <li>• Leads marked as "responded" or "converted" stop receiving follow-ups</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
