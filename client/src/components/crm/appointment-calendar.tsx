import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User } from "lucide-react";
import { format, parseISO, isToday, isTomorrow, isThisWeek } from "date-fns";

const statusColors: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-800",
  confirmed: "bg-green-100 text-green-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
  no_show: "bg-orange-100 text-orange-800",
};

interface AppointmentCalendarProps {
  appointments: any[];
  onAppointmentClick?: (appt: any) => void;
}

export function AppointmentCalendar({ appointments, onAppointmentClick }: AppointmentCalendarProps) {
  const sorted = [...appointments].sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));

  const grouped: Record<string, any[]> = {};
  sorted.forEach(appt => {
    const dateStr = appt.scheduledDate;
    let label = dateStr;
    try {
      const d = parseISO(dateStr);
      if (isToday(d)) label = "Today";
      else if (isTomorrow(d)) label = "Tomorrow";
      else label = format(d, "EEEE, MMM d");
    } catch {}
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(appt);
  });

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium">No appointments scheduled</p>
        <p className="text-sm">Create your first appointment to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([dateLabel, appts]) => (
        <div key={dateLabel}>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">{dateLabel}</h3>
          <div className="space-y-2">
            {appts.map((appt: any) => (
              <Card key={appt.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onAppointmentClick?.(appt)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">{appt.serviceType}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {appt.scheduledTime}</span>
                        {appt.durationMinutes && <span>{appt.durationMinutes} min</span>}
                      </div>
                      {appt.address && (
                        <span className="flex items-center gap-1 text-xs text-gray-500"><MapPin className="h-3 w-3" /> {appt.address}</span>
                      )}
                    </div>
                    <Badge className={statusColors[appt.status] || "bg-gray-100 text-gray-800"}>
                      {(appt.status || "scheduled").replace(/_/g, " ")}
                    </Badge>
                  </div>
                  {appt.amount && (
                    <p className="text-sm font-medium text-green-600 mt-2">${(appt.amount / 100).toFixed(0)}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
