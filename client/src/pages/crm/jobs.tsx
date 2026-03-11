import { useQuery, useMutation } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { JobTracker } from "@/components/crm/job-tracker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { crmApi } from "@/lib/crm-api";
import { queryClient } from "@/lib/queryClient";
import { useState } from "react";

export default function CrmJobs() {
  const { toast } = useToast();
  const [detail, setDetail] = useState<any>(null);

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["/api/crm/jobs"],
    queryFn: crmApi.getJobs,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => crmApi.updateJob(id, data),
    onSuccess: (updated: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/jobs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/stats"] });
      setDetail(updated);
      toast({ title: "Job updated" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const statusOptions = [
    { value: "assigned", label: "Assigned" },
    { value: "en_route", label: "En Route" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Jobs</h1>
            <p className="text-gray-500 text-sm">Track cleaning job progress and completion</p>
          </div>
          <div className="flex gap-2">
            {["all", "assigned", "in_progress", "completed"].map(filter => (
              <Badge
                key={filter}
                variant="outline"
                className="cursor-pointer text-xs"
              >
                {filter === "all" ? "All" : filter.replace(/_/g, " ")} ({filter === "all" ? jobs.length : jobs.filter(j => j.status === filter).length})
              </Badge>
            ))}
          </div>
        </div>

        {isLoading ? (
          <Skeleton className="h-[400px]" />
        ) : (
          <JobTracker jobs={jobs} onJobClick={setDetail} />
        )}

        <Dialog open={!!detail} onOpenChange={() => setDetail(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Job Details</DialogTitle>
            </DialogHeader>
            {detail && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">Job ID:</span> <span className="font-mono">{detail.id.slice(0, 12)}</span></div>
                  <div><span className="text-gray-500">Status:</span> {detail.status.replace(/_/g, " ")}</div>
                  <div><span className="text-gray-500">Assigned To:</span> {detail.assignedTo || "Unassigned"}</div>
                  <div><span className="text-gray-500">Started:</span> {detail.startedAt ? new Date(detail.startedAt).toLocaleString() : "-"}</div>
                  <div><span className="text-gray-500">Completed:</span> {detail.completedAt ? new Date(detail.completedAt).toLocaleString() : "-"}</div>
                </div>
                {detail.notes && (
                  <div>
                    <Label className="text-gray-500">Notes</Label>
                    <p className="bg-gray-50 p-3 rounded text-sm">{detail.notes}</p>
                  </div>
                )}
                <div>
                  <Label>Update Status</Label>
                  <Select
                    value={detail.status}
                    onValueChange={v => {
                      const extra: any = { status: v };
                      if (v === "in_progress" && !detail.startedAt) extra.startedAt = new Date().toISOString();
                      if (v === "completed" && !detail.completedAt) extra.completedAt = new Date().toISOString();
                      updateMutation.mutate({ id: detail.id, data: extra });
                    }}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
