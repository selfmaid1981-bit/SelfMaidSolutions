import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface ContactListProps {
  clients: any[];
  onClientClick?: (client: any) => void;
}

export function ContactList({ clients, onClientClick }: ContactListProps) {
  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (row: any) => <span className="font-medium">{row.firstName} {row.lastName}</span>,
    },
    { key: "email", label: "Email", sortable: true },
    { key: "phone", label: "Phone" },
    {
      key: "city",
      label: "Location",
      render: (row: any) => row.city ? `${row.city}, ${row.state || ""}` : "-",
    },
    {
      key: "totalBookings",
      label: "Bookings",
      sortable: true,
      render: (row: any) => <Badge variant="secondary">{row.totalBookings || 0}</Badge>,
    },
    {
      key: "lifetimeValue",
      label: "LTV",
      sortable: true,
      render: (row: any) => row.lifetimeValue ? `$${(row.lifetimeValue / 100).toFixed(0)}` : "$0",
    },
    {
      key: "createdAt",
      label: "Added",
      sortable: true,
      render: (row: any) => row.createdAt ? format(new Date(row.createdAt), "MMM d, yyyy") : "-",
    },
  ];

  return (
    <DataTable
      data={clients}
      columns={columns}
      searchKey="email"
      searchPlaceholder="Search by email..."
      onRowClick={onClientClick}
      emptyMessage="No clients yet"
    />
  );
}
