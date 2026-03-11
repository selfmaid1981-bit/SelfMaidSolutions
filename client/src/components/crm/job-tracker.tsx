import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const statusColors: Record<string, string> = {
  assigned: "bg-blue-100 text-blue-800",
  en_route: "bg-indigo-100 text-indigo-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

interface JobTrackerProps {
  jobs: any[];
  onJobClick?: (job: any) => void;
}

export function JobTracker({ jobs, onJobClick }: JobTrackerProps) {
  const columns = [
    {
      key: "id",
      label: "Job ID",
      render: (row: any) => <span className="font-mono text-xs">{row.id.slice(0, 8)}</span>,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row: any) => (
        <Badge className={statusColors[row.status] || "bg-gray-100 text-gray-800"}>
          {(row.status || "assigned").replace(/_/g, " ")}
        </Badge>
      ),
    },
    {
      key: "assignedTo",
      label: "Assigned To",
      render: (row: any) => row.assignedTo || "Unassigned",
    },
    {
      key: "startedAt",
      label: "Started",
      sortable: true,
      render: (row: any) => row.startedAt ? format(new Date(row.startedAt), "MMM d, h:mm a") : "-",
    },
    {
      key: "completedAt",
      label: "Completed",
      sortable: true,
      render: (row: any) => row.completedAt ? format(new Date(row.completedAt), "MMM d, h:mm a") : "-",
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (row: any) => row.createdAt ? format(new Date(row.createdAt), "MMM d, yyyy") : "-",
    },
  ];

  return (
    <DataTable
      data={jobs}
      columns={columns}
      searchKey="status"
      searchPlaceholder="Filter by status..."
      onRowClick={onJobClick}
      emptyMessage="No jobs found"
    />
  );
}
