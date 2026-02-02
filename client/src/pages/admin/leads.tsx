import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { ArrowLeft, Plus, RefreshCw, Download, Users, TrendingUp, UserPlus, FileSpreadsheet, ExternalLink, MessageSquare } from 'lucide-react';
import { Link } from 'wouter';

interface Lead {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  city?: string;
  source: string;
  status: string;
  notes?: string;
  dateAdded: string;
  lastContact?: string;
}

interface Customer {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  serviceType?: string;
  frequency?: string;
  totalSpent?: number;
  lastService?: string;
  notes?: string;
}

interface FunnelStats {
  total: number;
  new: number;
  contacted: number;
  responded: number;
  meeting: number;
  proposal: number;
  won: number;
  lost: number;
  conversionRate: string;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  responded: 'bg-purple-100 text-purple-800',
  meeting: 'bg-orange-100 text-orange-800',
  proposal: 'bg-pink-100 text-pink-800',
  won: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
};

export default function AdminLeads() {
  const { toast } = useToast();
  const [adminApiKey, setAdminApiKey] = useState(localStorage.getItem('adminApiKey') || '');
  const [spreadsheetId, setSpreadsheetId] = useState(localStorage.getItem('spreadsheetId') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminApiKey'));
  const [showAddLead, setShowAddLead] = useState(false);
  const [newLead, setNewLead] = useState<Partial<Lead>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    city: '',
    source: 'linkedin',
    status: 'new',
    notes: '',
  });

  const handleLogin = () => {
    localStorage.setItem('adminApiKey', adminApiKey);
    if (spreadsheetId) {
      localStorage.setItem('spreadsheetId', spreadsheetId);
    }
    setIsAuthenticated(true);
  };

  const headers = { 'x-admin-api-key': adminApiKey };

  const { data: leadsData, isLoading: leadsLoading, refetch: refetchLeads } = useQuery({
    queryKey: ['/api/sheets/leads', spreadsheetId],
    queryFn: async () => {
      if (!spreadsheetId) return { leads: [] };
      const res = await fetch(`/api/sheets/leads?spreadsheetId=${spreadsheetId}`, { headers });
      if (!res.ok) throw new Error('Failed to fetch leads');
      return res.json();
    },
    enabled: isAuthenticated && !!spreadsheetId,
  });

  const { data: customersData, isLoading: customersLoading, refetch: refetchCustomers } = useQuery({
    queryKey: ['/api/sheets/customers', spreadsheetId],
    queryFn: async () => {
      if (!spreadsheetId) return { customers: [] };
      const res = await fetch(`/api/sheets/customers?spreadsheetId=${spreadsheetId}`, { headers });
      if (!res.ok) throw new Error('Failed to fetch customers');
      return res.json();
    },
    enabled: isAuthenticated && !!spreadsheetId,
  });

  const { data: statsData, refetch: refetchStats } = useQuery({
    queryKey: ['/api/sheets/funnel-stats', spreadsheetId],
    queryFn: async () => {
      if (!spreadsheetId) return { stats: null };
      const res = await fetch(`/api/sheets/funnel-stats?spreadsheetId=${spreadsheetId}`, { headers });
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
    enabled: isAuthenticated && !!spreadsheetId,
  });

  const createSpreadsheetMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/sheets/create', { 
        method: 'POST', 
        headers: { ...headers, 'Content-Type': 'application/json' } 
      });
      if (!res.ok) throw new Error('Failed to create spreadsheet');
      return res.json();
    },
    onSuccess: (data) => {
      setSpreadsheetId(data.spreadsheetId);
      localStorage.setItem('spreadsheetId', data.spreadsheetId);
      toast({
        title: 'Spreadsheet Created!',
        description: 'Your leads and customers spreadsheet is ready.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const addLeadMutation = useMutation({
    mutationFn: async (lead: Partial<Lead>) => {
      const res = await fetch(`/api/sheets/leads?spreadsheetId=${spreadsheetId}`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error('Failed to add lead');
      return res.json();
    },
    onSuccess: () => {
      setShowAddLead(false);
      setNewLead({
        name: '',
        email: '',
        phone: '',
        company: '',
        title: '',
        city: '',
        source: 'linkedin',
        status: 'new',
        notes: '',
      });
      refetchLeads();
      refetchStats();
      toast({
        title: 'Lead Added!',
        description: 'The lead has been added to your spreadsheet.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const syncContactsMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/sheets/sync-contacts?spreadsheetId=${spreadsheetId}`, {
        method: 'POST',
        headers,
      });
      if (!res.ok) throw new Error('Failed to sync contacts');
      return res.json();
    },
    onSuccess: (data) => {
      refetchLeads();
      refetchStats();
      toast({
        title: 'Contacts Synced!',
        description: data.message,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const leads = leadsData?.leads || [];
  const customers = customersData?.customers || [];
  const stats: FunnelStats | null = statsData?.stats || null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your admin API key to access the lead funnel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="apiKey">Admin API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={adminApiKey}
                onChange={(e) => setAdminApiKey(e.target.value)}
                placeholder="Enter admin API key"
              />
            </div>
            <div>
              <Label htmlFor="spreadsheetId">Spreadsheet ID (optional)</Label>
              <Input
                id="spreadsheetId"
                value={spreadsheetId}
                onChange={(e) => setSpreadsheetId(e.target.value)}
                placeholder="Enter existing spreadsheet ID or leave blank to create new"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/campaigns">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Campaigns
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Lead Funnel</h1>
                <p className="text-gray-500">Manage your leads and customers from Google Sheets</p>
              </div>
              <Link href="/admin/outreach">
                <Button variant="outline" className="ml-auto">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Outreach Templates
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex gap-2">
            {spreadsheetId && (
              <Button variant="outline" asChild>
                <a 
                  href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Sheet
                </a>
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => { refetchLeads(); refetchCustomers(); refetchStats(); }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {!spreadsheetId ? (
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-6 w-6" />
                Create Lead Funnel Spreadsheet
              </CardTitle>
              <CardDescription>
                Create a new Google Spreadsheet to track your leads and customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => createSpreadsheetMutation.mutate()}
                disabled={createSpreadsheetMutation.isPending}
                className="w-full"
              >
                {createSpreadsheetMutation.isPending ? 'Creating...' : 'Create Spreadsheet'}
              </Button>
              <div className="mt-4">
                <Label>Or enter existing Spreadsheet ID:</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={spreadsheetId}
                    onChange={(e) => setSpreadsheetId(e.target.value)}
                    placeholder="Spreadsheet ID"
                  />
                  <Button onClick={() => {
                    localStorage.setItem('spreadsheetId', spreadsheetId);
                    refetchLeads();
                    refetchCustomers();
                    refetchStats();
                  }}>
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold">{stats.total}</div>
                    <div className="text-sm text-gray-500">Total Leads</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
                    <div className="text-sm text-gray-500">New</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold text-yellow-600">{stats.contacted}</div>
                    <div className="text-sm text-gray-500">Contacted</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold text-purple-600">{stats.responded}</div>
                    <div className="text-sm text-gray-500">Responded</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold text-orange-600">{stats.meeting}</div>
                    <div className="text-sm text-gray-500">Meeting</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold text-pink-600">{stats.proposal}</div>
                    <div className="text-sm text-gray-500">Proposal</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold text-green-600">{stats.won}</div>
                    <div className="text-sm text-gray-500">Won</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold text-green-600">{stats.conversionRate}%</div>
                    <div className="text-sm text-gray-500">Conversion</div>
                  </CardContent>
                </Card>
              </div>
            )}

            <Tabs defaultValue="leads" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="leads" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Leads ({leads.length})
                  </TabsTrigger>
                  <TabsTrigger value="customers" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Customers ({customers.length})
                  </TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => syncContactsMutation.mutate()}
                    disabled={syncContactsMutation.isPending}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {syncContactsMutation.isPending ? 'Syncing...' : 'Sync Website Contacts'}
                  </Button>
                  <Dialog open={showAddLead} onOpenChange={setShowAddLead}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Lead
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Lead</DialogTitle>
                        <DialogDescription>
                          Add a lead from LinkedIn, email outreach, or other sources
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Name *</Label>
                            <Input
                              value={newLead.name}
                              onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                              placeholder="John Smith"
                            />
                          </div>
                          <div>
                            <Label>Email *</Label>
                            <Input
                              value={newLead.email}
                              onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Phone</Label>
                            <Input
                              value={newLead.phone}
                              onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                              placeholder="(334) 555-1234"
                            />
                          </div>
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={newLead.company}
                              onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                              placeholder="ABC Properties"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Title</Label>
                            <Input
                              value={newLead.title}
                              onChange={(e) => setNewLead({ ...newLead, title: e.target.value })}
                              placeholder="Property Manager"
                            />
                          </div>
                          <div>
                            <Label>City</Label>
                            <Input
                              value={newLead.city}
                              onChange={(e) => setNewLead({ ...newLead, city: e.target.value })}
                              placeholder="Montgomery"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Source</Label>
                            <Select
                              value={newLead.source}
                              onValueChange={(v) => setNewLead({ ...newLead, source: v })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="linkedin">LinkedIn</SelectItem>
                                <SelectItem value="email">Email Outreach</SelectItem>
                                <SelectItem value="referral">Referral</SelectItem>
                                <SelectItem value="website">Website</SelectItem>
                                <SelectItem value="cold-call">Cold Call</SelectItem>
                                <SelectItem value="networking">Networking</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Status</Label>
                            <Select
                              value={newLead.status}
                              onValueChange={(v) => setNewLead({ ...newLead, status: v })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="responded">Responded</SelectItem>
                                <SelectItem value="meeting">Meeting</SelectItem>
                                <SelectItem value="proposal">Proposal</SelectItem>
                                <SelectItem value="won">Won</SelectItem>
                                <SelectItem value="lost">Lost</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label>Notes</Label>
                          <Input
                            value={newLead.notes}
                            onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                            placeholder="Any additional notes..."
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddLead(false)}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={() => addLeadMutation.mutate(newLead)}
                          disabled={!newLead.name || !newLead.email || addLeadMutation.isPending}
                        >
                          {addLeadMutation.isPending ? 'Adding...' : 'Add Lead'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <TabsContent value="leads">
                <Card>
                  <CardContent className="p-0">
                    {leadsLoading ? (
                      <div className="p-8 text-center text-gray-500">Loading leads...</div>
                    ) : leads.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        No leads yet. Add your first lead or sync website contacts!
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Contact</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Company</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">City</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Source</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Added</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {leads.map((lead: Lead, idx: number) => (
                              <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                  <div className="font-medium">{lead.name}</div>
                                  {lead.title && <div className="text-sm text-gray-500">{lead.title}</div>}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="text-sm">{lead.email}</div>
                                  {lead.phone && <div className="text-sm text-gray-500">{lead.phone}</div>}
                                </td>
                                <td className="px-4 py-3 text-sm">{lead.company || '-'}</td>
                                <td className="px-4 py-3 text-sm">{lead.city || '-'}</td>
                                <td className="px-4 py-3 text-sm capitalize">{lead.source}</td>
                                <td className="px-4 py-3">
                                  <Badge className={statusColors[lead.status] || 'bg-gray-100 text-gray-800'}>
                                    {lead.status}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">{lead.dateAdded}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="customers">
                <Card>
                  <CardContent className="p-0">
                    {customersLoading ? (
                      <div className="p-8 text-center text-gray-500">Loading customers...</div>
                    ) : customers.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        No customers yet. Convert leads to customers!
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Contact</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Address</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Frequency</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total Spent</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Service</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {customers.map((customer: Customer, idx: number) => (
                              <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">{customer.name}</td>
                                <td className="px-4 py-3">
                                  <div className="text-sm">{customer.email}</div>
                                  {customer.phone && <div className="text-sm text-gray-500">{customer.phone}</div>}
                                </td>
                                <td className="px-4 py-3 text-sm">{customer.address || '-'}</td>
                                <td className="px-4 py-3 text-sm">{customer.serviceType || '-'}</td>
                                <td className="px-4 py-3 text-sm">{customer.frequency || '-'}</td>
                                <td className="px-4 py-3 text-sm font-medium text-green-600">
                                  ${customer.totalSpent?.toFixed(2) || '0.00'}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">{customer.lastService || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}
