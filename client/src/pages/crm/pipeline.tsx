import { useQuery, useMutation } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { PipelineBoard } from "@/components/crm/pipeline-board";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { crmApi } from "@/lib/crm-api";
import { queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { Plus, ArrowRightLeft } from "lucide-react";

export default function CrmPipeline() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [detailLead, setDetailLead] = useState<any>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", serviceType: "", source: "website", notes: "" });

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["/api/crm/leads"],
    queryFn: crmApi.getLeads,
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => crmApi.createLead(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/leads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/stats"] });
      setOpen(false);
      setForm({ firstName: "", lastName: "", email: "", phone: "", serviceType: "", source: "website", notes: "" });
      toast({ title: "Lead created" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => crmApi.updateLead(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/leads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/stats"] });
      toast({ title: "Lead updated" });
    },
  });

  const convertMutation = useMutation({
    mutationFn: (id: string) => crmApi.convertLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/leads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/clients"] });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/stats"] });
      setDetailLead(null);
      toast({ title: "Lead converted to client" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Pipeline</h1>
            <p className="text-gray-500 text-sm">Manage your lead pipeline and conversions</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add Lead</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Lead</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>First Name</Label><Input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} /></div>
                  <div><Label>Last Name</Label><Input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} /></div>
                </div>
                <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
                <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
                <div>
                  <Label>Service Type</Label>
                  <Select value={form.serviceType} onValueChange={v => setForm(f => ({ ...f, serviceType: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard_cleaning">Standard Cleaning</SelectItem>
                      <SelectItem value="deep_cleaning">Deep Cleaning</SelectItem>
                      <SelectItem value="move_in_out">Move In/Out</SelectItem>
                      <SelectItem value="airbnb_turnover">Airbnb Turnover</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Source</Label>
                  <Select value={form.source} onValueChange={v => setForm(f => ({ ...f, source: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Notes</Label><Textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2} /></div>
                <Button className="w-full" disabled={!form.firstName || !form.lastName || createMutation.isPending} onClick={() => createMutation.mutate(form)}>
                  {createMutation.isPending ? "Creating..." : "Create Lead"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex gap-4">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="w-[280px] h-[300px]" />)}
          </div>
        ) : (
          <PipelineBoard leads={leads} onLeadClick={setDetailLead} />
        )}

        <Dialog open={!!detailLead} onOpenChange={() => setDetailLead(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{detailLead?.firstName} {detailLead?.lastName}</DialogTitle>
            </DialogHeader>
            {detailLead && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">Email:</span> {detailLead.email || "-"}</div>
                  <div><span className="text-gray-500">Phone:</span> {detailLead.phone || "-"}</div>
                  <div><span className="text-gray-500">Service:</span> {detailLead.serviceType || "-"}</div>
                  <div><span className="text-gray-500">Source:</span> {detailLead.source || "-"}</div>
                  <div><span className="text-gray-500">Stage:</span> {(detailLead.pipelineStage || "").replace(/_/g, " ")}</div>
                  <div><span className="text-gray-500">Score:</span> {detailLead.score ?? "-"}</div>
                </div>
                {detailLead.notes && <p className="text-sm bg-gray-50 p-3 rounded">{detailLead.notes}</p>}
                <div className="flex gap-2">
                  <Select
                    value={detailLead.pipelineStage}
                    onValueChange={v => {
                      updateMutation.mutate({ id: detailLead.id, data: { pipelineStage: v } });
                      setDetailLead({ ...detailLead, pipelineStage: v });
                    }}
                  >
                    <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new_lead">New Lead</SelectItem>
                      <SelectItem value="quote_requested">Quote Requested</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                      <SelectItem value="negotiation">Negotiation</SelectItem>
                      <SelectItem value="won">Won</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={() => convertMutation.mutate(detailLead.id)} disabled={convertMutation.isPending}>
                    <ArrowRightLeft className="h-4 w-4 mr-2" /> Convert
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
