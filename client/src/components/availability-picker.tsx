import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, CheckCircle2, XCircle } from "lucide-react";
import { getTomorrowDate } from "@/lib/services";

interface AvailabilityPickerProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

interface SlotInfo {
  time: string;
  available: boolean;
  bookings: number;
}

export function AvailabilityPicker({ selectedDate, selectedTime, onDateChange, onTimeChange }: AvailabilityPickerProps) {
  const minDate = getTomorrowDate();

  const { data: slots, isLoading } = useQuery<SlotInfo[]>({
    queryKey: ["/api/availability", selectedDate],
    queryFn: async () => {
      if (!selectedDate) return [];
      const res = await fetch(`/api/availability?date=${selectedDate}`);
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!selectedDate,
  });

  const dayOfWeek = selectedDate
    ? new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    : "";

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5">
          <Calendar className="w-4 h-4" /> Preferred Date
        </label>
        <input
          type="date"
          value={selectedDate}
          min={minDate}
          onChange={(e) => {
            onDateChange(e.target.value);
            onTimeChange("");
          }}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      {selectedDate && (
        <div>
          <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> Available Times
            {dayOfWeek && <span className="font-normal text-muted-foreground">— {dayOfWeek}</span>}
          </label>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 rounded-lg" />
              ))}
            </div>
          ) : slots && slots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => onTimeChange(slot.time)}
                  className={`
                    relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all text-sm font-medium
                    ${!slot.available
                      ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60"
                      : selectedTime === slot.time
                        ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/20"
                        : "border-gray-200 hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
                    }
                  `}
                >
                  <span className="text-base">{slot.time}</span>
                  {slot.available ? (
                    <span className="text-[10px] text-green-600 flex items-center gap-0.5 mt-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Available
                    </span>
                  ) : (
                    <span className="text-[10px] text-red-400 flex items-center gap-0.5 mt-0.5">
                      <XCircle className="w-3 h-3" /> Booked
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-2">Select a date to see available times</p>
          )}

          {selectedTime && (
            <Badge variant="outline" className="mt-2 text-green-700 border-green-200 bg-green-50">
              <CheckCircle2 className="w-3 h-3 mr-1" /> {selectedTime} on {dayOfWeek}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
