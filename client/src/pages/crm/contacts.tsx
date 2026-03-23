import { useQuery, useMutation } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { ContactList } from "@/components/crm/contact-list";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { crmApi } from "@/lib/crm-api";
import { queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { Plus } from "lucide-react";
import { QueryErrorState } from "@/components/error-boundary";

export default function CrmContacts() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<any>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "", city: "", state: "", zipCode: "", notes: "" });

  const { data: clients = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["/api/crm/clients"],
    queryFn: crmApi.getClients,
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => crmApi.createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/clients"] });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/stats"] });
      setOpen(false);
      setForm({ firstName: "", lastName: "", email: "", phone: "", address: "", city: "", state: "", zipCode: "", notes: "" });
      toast({ title: "Client added" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Contacts</h1>
            <p className="text-gray-500 text-sm">Manage your client database</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add Client</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Client</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>First Name</Label><Input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} /></div>
                  <div><Label>Last Name</Label><Input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} /></div>
                </div>
                <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
                <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
                <div><Label>Address</Label><Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} /></div>
                <div className="grid grid-cols-3 gap-3">
                  <div><Label>City</Label><Input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} /></div>
                  <div><Label>State</Label><Input value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} /></div>
                  <div><Label>Zip</Label><Input value={form.zipCode} onChange={e => setForm(f => ({ ...f, zipCode: e.target.value }))} /></div>
                </div>
                <div><Label>Notes</Label><Textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2} /></div>
                <Button className="w-full" disabled={!form.firstName || !form.lastName || createMutation.isPending} onClick={() => createMutation.mutate(form)}>
                  {createMutation.isPending ? "Adding..." : "Add Client"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <Skeleton className="h-[400px]" />
        ) : isError ? (
          <QueryErrorState message="Failed to load contacts" onRetry={() => refetch()} />
        ) : (
          <ContactList clients={clients} onClientClick={setDetail} />
        )}

        <Dialog open={!!detail} onOpenChange={() => setDetail(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{detail?.firstName} {detail?.lastName}</DialogTitle>
            </DialogHeader>
            {detail && (
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-gray-500">Email:</span> {detail.email || "-"}</div>
                  <div><span className="text-gray-500">Phone:</span> {detail.phone || "-"}</div>
                  <div><span className="text-gray-500">Address:</span> {detail.address || "-"}</div>
                  <div><span className="text-gray-500">City:</span> {detail.city ? `${detail.city}, ${detail.state}` : "-"}</div>
                  <div><span className="text-gray-500">Bookings:</span> {detail.totalBookings || 0}</div>
                  <div><span className="text-gray-500">Lifetime Value:</span> ${((detail.lifetimeValue || 0) / 100).toFixed(0)}</div>
                </div>
                {detail.notes && <p className="bg-gray-50 p-3 rounded">{detail.notes}</p>}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
