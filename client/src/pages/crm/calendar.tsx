import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { QueryErrorState } from "@/components/error-boundary";
import { crmApi } from "@/lib/crm-api";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  CalendarDays,
  X,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  type: "booking" | "appointment";
  title: string;
  date: string;
  time: string;
  duration: number;
  status: string;
  address: string;
  amount?: number;
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
  clientId?: string;
  assignedTo?: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  scheduled: "bg-blue-100 text-blue-800 border-blue-200",
  in_progress: "bg-violet-100 text-violet-800 border-violet-200",
  completed: "bg-gray-100 text-gray-600 border-gray-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  no_show: "bg-orange-100 text-orange-800 border-orange-200",
};

const typeColors: Record<string, string> = {
  booking: "bg-blue-500",
  appointment: "bg-emerald-500",
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatTime(time: string): string {
  if (!time) return "";
  const parts = time.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)?/i);
  if (!parts) return time;
  let h = parseInt(parts[1]);
  const m = parts[2] || "00";
  const ampm = parts[3];
  if (ampm) return `${h}:${m} ${ampm.toUpperCase()}`;
  if (h === 0) return `12:${m} AM`;
  if (h < 12) return `${h}:${m} AM`;
  if (h === 12) return `12:${m} PM`;
  return `${h - 12}:${m} PM`;
}

function normalizeDate(dateStr: string): string {
  if (!dateStr) return "";
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return dateStr;
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    }
  } catch {}
  return dateStr;
}

export default function CrmCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const { data: events = [], isLoading, isError, refetch } = useQuery<CalendarEvent[]>({
    queryKey: ["/api/crm/calendar"],
    queryFn: crmApi.getCalendarEvents,
  });

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    events.forEach((e) => {
      const d = normalizeDate(e.date);
      if (!d) return;
      if (!map[d]) map[d] = [];
      map[d].push(e);
    });
    Object.values(map).forEach((arr) =>
      arr.sort((a, b) => (a.time || "").localeCompare(b.time || ""))
    );
    return map;
  }, [events]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfWeek(currentYear, currentMonth);
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [firstDay, daysInMonth]);

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
    setSelectedEvent(null);
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
    setSelectedEvent(null);
  }

  function goToday() {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(todayStr);
    setSelectedEvent(null);
  }

  const selectedDateEvents = selectedDate ? eventsByDate[selectedDate] || [] : [];

  const monthStats = useMemo(() => {
    let bookings = 0;
    let appointments = 0;
    let revenue = 0;
    Object.entries(eventsByDate).forEach(([date, evts]) => {
      const [y, m] = date.split("-").map(Number);
      if (y === currentYear && m === currentMonth + 1) {
        evts.forEach((e) => {
          if (e.type === "booking") bookings++;
          else appointments++;
          if (e.amount) revenue += e.amount;
        });
      }
    });
    return { bookings, appointments, total: bookings + appointments, revenue };
  }, [eventsByDate, currentMonth, currentYear]);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-full overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Booking Calendar</h1>
            <p className="text-gray-500 text-sm">All bookings and appointments in one view</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="gap-1 px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              Bookings ({monthStats.bookings})
            </Badge>
            <Badge variant="outline" className="gap-1 px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Appointments ({monthStats.appointments})
            </Badge>
            {monthStats.revenue > 0 && (
              <Badge variant="outline" className="gap-1 px-3 py-1.5">
                <DollarSign className="w-3 h-3" />
                ${monthStats.revenue.toLocaleString()}
              </Badge>
            )}
          </div>
        </div>

        {isLoading ? (
          <Skeleton className="h-[600px] w-full rounded-xl" />
        ) : isError ? (
          <QueryErrorState message="Failed to load calendar events" onRetry={() => refetch()} />
        ) : (
          <div className="flex gap-6 flex-col lg:flex-row">
            <Card className="flex-1 min-w-0">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <Button variant="ghost" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold">
                    {MONTH_NAMES[currentMonth]} {currentYear}
                  </h2>
                  <Button variant="outline" size="sm" onClick={goToday} className="text-xs">
                    Today
                  </Button>
                </div>
                <Button variant="ghost" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="grid grid-cols-7 mb-2">
                  {DAY_NAMES.map((d) => (
                    <div key={d} className="text-center text-xs font-medium text-gray-400 py-2">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-lg overflow-hidden">
                  {calendarDays.map((day, i) => {
                    if (day === null) {
                      return <div key={`empty-${i}`} className="bg-gray-50 min-h-[90px]" />;
                    }
                    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const dayEvents = eventsByDate[dateStr] || [];
                    const isToday = dateStr === todayStr;
                    const isSelected = dateStr === selectedDate;
                    const isPast = dateStr < todayStr;

                    return (
                      <div
                        key={dateStr}
                        onClick={() => {
                          setSelectedDate(dateStr);
                          setSelectedEvent(null);
                        }}
                        className={`bg-white min-h-[90px] p-1.5 cursor-pointer transition-colors hover:bg-blue-50 ${
                          isSelected ? "ring-2 ring-blue-500 ring-inset" : ""
                        } ${isPast ? "opacity-60" : ""}`}
                      >
                        <div className={`text-xs font-medium mb-1 w-6 h-6 flex items-center justify-center rounded-full ${
                          isToday ? "bg-blue-600 text-white" : "text-gray-700"
                        }`}>
                          {day}
                        </div>
                        <div className="space-y-0.5">
                          {dayEvents.slice(0, 3).map((evt) => (
                            <div
                              key={evt.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDate(dateStr);
                                setSelectedEvent(evt);
                              }}
                              className={`text-[10px] leading-tight px-1 py-0.5 rounded truncate text-white cursor-pointer ${typeColors[evt.type]}`}
                              title={`${evt.time} - ${evt.title}`}
                            >
                              {formatTime(evt.time)} {evt.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-[10px] text-gray-400 px-1">
                              +{dayEvents.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="w-full lg:w-80 shrink-0 space-y-4">
              {selectedEvent ? (
                <Card>
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge className={`${typeColors[selectedEvent.type]} text-white mb-2`}>
                          {selectedEvent.type}
                        </Badge>
                        <h3 className="font-semibold text-lg">{selectedEvent.title}</h3>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedEvent(null)} className="h-8 w-8">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <Badge className={statusColors[selectedEvent.status] || "bg-gray-100 text-gray-600"}>
                      {(selectedEvent.status || "pending").replace(/_/g, " ")}
                    </Badge>

                    <div className="space-y-2.5 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarDays className="h-4 w-4 text-gray-400" />
                        {selectedEvent.date}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4 text-gray-400" />
                        {formatTime(selectedEvent.time)} ({selectedEvent.duration} min)
                      </div>
                      {selectedEvent.address && (
                        <div className="flex items-start gap-2 text-gray-600">
                          <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                          <span>{selectedEvent.address}</span>
                        </div>
                      )}
                      {selectedEvent.amount && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          ${selectedEvent.amount}
                        </div>
                      )}
                    </div>

                    {(selectedEvent.name || selectedEvent.email || selectedEvent.phone) && (
                      <div className="pt-3 border-t space-y-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</p>
                        {selectedEvent.name && (
                          <p className="font-medium text-sm">{selectedEvent.name}</p>
                        )}
                        {selectedEvent.email && (
                          <a href={`mailto:${selectedEvent.email}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                            <Mail className="h-3.5 w-3.5" />
                            {selectedEvent.email}
                          </a>
                        )}
                        {selectedEvent.phone && (
                          <a href={`tel:${selectedEvent.phone}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                            <Phone className="h-3.5 w-3.5" />
                            {selectedEvent.phone}
                          </a>
                        )}
                      </div>
                    )}

                    {selectedEvent.notes && (
                      <div className="pt-3 border-t">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Notes</p>
                        <p className="text-sm text-gray-600">{selectedEvent.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : selectedDate ? (
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-3">
                      {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                    </h3>
                    {selectedDateEvents.length === 0 ? (
                      <p className="text-sm text-gray-400 py-4 text-center">No events scheduled</p>
                    ) : (
                      <div className="space-y-2">
                        {selectedDateEvents.map((evt) => (
                          <div
                            key={evt.id}
                            onClick={() => setSelectedEvent(evt)}
                            className="p-3 rounded-lg border hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{evt.title}</span>
                              <Badge className={`text-[10px] ${typeColors[evt.type]} text-white`}>
                                {evt.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              {formatTime(evt.time)}
                              {evt.name && <span>· {evt.name}</span>}
                            </div>
                            <Badge className={`mt-1.5 text-[10px] ${statusColors[evt.status] || "bg-gray-100 text-gray-600"}`}>
                              {(evt.status || "pending").replace(/_/g, " ")}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-5 text-center text-gray-400 py-12">
                    <CalendarDays className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Click a day to see its events</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
