import { useQuery, useMutation } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { AppointmentCalendar } from "@/components/crm/appointment-calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { QueryErrorState } from "@/components/error-boundary";
import { useToast } from "@/hooks/use-toast";
import { crmApi } from "@/lib/crm-api";
import { queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function CrmAppointments() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    serviceType: "",
    address: "",
    city: "",
    state: "AL",
    scheduledDate: "",
    scheduledTime: "",
    durationMinutes: 120,
    notes: "",
  });

  const { data: appointments = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["/api/crm/appointments"],
    queryFn: crmApi.getAppointments,
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => crmApi.createAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/appointments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/stats"] });
      setOpen(false);
      setForm({ serviceType: "", address: "", city: "", state: "AL", scheduledDate: "", scheduledTime: "", durationMinutes: 120, notes: "" });
      toast({ title: "Appointment created" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => crmApi.updateAppointment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/appointments"] });
      toast({ title: "Appointment updated" });
    },
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Appointments</h1>
            <p className="text-gray-500 text-sm">Schedule and manage cleaning appointments</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Schedule</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Appointment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Service Type</Label>
                  <Select value={form.serviceType} onValueChange={v => setForm(f => ({ ...f, serviceType: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard Cleaning">Standard Cleaning</SelectItem>
                      <SelectItem value="Deep Cleaning">Deep Cleaning</SelectItem>
                      <SelectItem value="Move In/Out">Move In/Out</SelectItem>
                      <SelectItem value="Airbnb Turnover">Airbnb Turnover</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Address</Label><Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>City</Label><Input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} /></div>
                  <div><Label>State</Label><Input value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Date</Label><Input type="date" value={form.scheduledDate} onChange={e => setForm(f => ({ ...f, scheduledDate: e.target.value }))} /></div>
                  <div><Label>Time</Label><Input type="time" value={form.scheduledTime} onChange={e => setForm(f => ({ ...f, scheduledTime: e.target.value }))} /></div>
                </div>
                <div><Label>Duration (minutes)</Label><Input type="number" value={form.durationMinutes} onChange={e => setForm(f => ({ ...f, durationMinutes: Number(e.target.value) }))} /></div>
                <div><Label>Notes</Label><Textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2} /></div>
                <Button
                  className="w-full"
                  disabled={!form.serviceType || !form.address || !form.scheduledDate || !form.scheduledTime || createMutation.isPending}
                  onClick={() => createMutation.mutate(form)}
                >
                  {createMutation.isPending ? "Creating..." : "Create Appointment"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <Skeleton className="h-[400px]" />
        ) : isError ? (
          <QueryErrorState message="Failed to load appointments" onRetry={() => refetch()} />
        ) : (
          <AppointmentCalendar
            appointments={appointments}
            onAppointmentClick={appt => {
              const nextStatus: Record<string, string> = {
                scheduled: "confirmed",
                confirmed: "in_progress",
                in_progress: "completed",
              };
              const next = nextStatus[appt.status];
              if (next) {
                updateMutation.mutate({ id: appt.id, data: { status: next } });
              }
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
