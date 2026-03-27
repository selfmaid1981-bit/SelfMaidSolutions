import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { SEOHead } from "@/components/ui/seo-head";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  LogIn,
  CalendarDays,
  DollarSign,
  Clock,
  RefreshCw,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  History,
  CheckCircle2,
  XCircle,
  Timer,
} from "lucide-react";

interface PortalBooking {
  id: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  city: string;
  state: string;
  zipCode: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface PortalCustomer {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  totalBookings: number;
  totalSpent: number;
  bookings: PortalBooking[];
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  completed: { label: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-800", icon: CheckCircle2 },
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Timer },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle },
};

const serviceLabels: Record<string, string> = {
  residential: "Standard House Cleaning",
  deep: "Deep Cleaning",
  moveout: "Move In/Out",
  apartment: "Apartment Turnover",
  airbnb: "Airbnb Cleaning",
  commercial: "Commercial/Office",
  dorm: "Student Dorm",
};

export default function CustomerPortal() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");

  const loginMutation = useMutation({
    mutationFn: async (loginEmail: string) => {
      const res = await apiRequest("POST", "/api/portal/login", { email: loginEmail });
      return res.json();
    },
    onSuccess: (data: PortalCustomer) => {
      setCustomerEmail(email);
      setIsLoggedIn(true);
    },
    onError: (error: any) => {
      toast({
        title: "Not Found",
        description: "No bookings found for this email address. Please check your email or book your first cleaning!",
        variant: "destructive",
      });
    },
  });

  const { data: customer, isLoading } = useQuery<PortalCustomer>({
    queryKey: ["/api/portal/customer", customerEmail],
    queryFn: async () => {
      const res = await fetch(`/api/portal/customer?email=${encodeURIComponent(customerEmail)}`);
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
    enabled: isLoggedIn && !!customerEmail,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    loginMutation.mutate(email.trim().toLowerCase());
  };

  const handleRebook = (booking: PortalBooking) => {
    const params = new URLSearchParams({
      serviceType: booking.serviceType,
      estimatedPrice: String(booking.amount),
      quoteEmail: customerEmail,
      quoteName: customer ? `${customer.firstName} ${customer.lastName}` : "",
      quotePhone: customer?.phone || "",
    });
    setLocation(`/booking?${params.toString()}`);
  };

  const upcomingBookings = customer?.bookings.filter(
    (b) => b.status !== "completed" && b.status !== "cancelled"
  ) || [];
  const pastBookings = customer?.bookings.filter(
    (b) => b.status === "completed" || b.status === "cancelled"
  ) || [];

  return (
    <>
      <SEOHead
        title="Customer Portal | Self-Maid Cleaning Solutions"
        description="View your booking history, upcoming appointments, and easily rebook your favorite cleaning services."
      />
      <Navigation />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {!isLoggedIn ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <LogIn className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Customer Portal</CardTitle>
                  <p className="text-muted-foreground mt-2">
                    Enter your email to view your bookings and history
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 text-lg"
                        required
                        data-testid="portal-email-input"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 text-base"
                      disabled={loginMutation.isPending}
                      data-testid="portal-login-btn"
                    >
                      {loginMutation.isPending ? "Looking up..." : "View My Bookings"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Use the same email you provided when booking
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : isLoading ? (
            <div className="space-y-6 pt-8">
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-48 rounded-xl" />
              <Skeleton className="h-48 rounded-xl" />
            </div>
          ) : customer ? (
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">
                    Welcome back, {customer.firstName}!
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Here's an overview of your cleaning services
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setCustomerEmail("");
                    setEmail("");
                  }}
                >
                  Sign Out
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <CalendarDays className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{customer.totalBookings}</p>
                        <p className="text-sm text-muted-foreground">Total Bookings</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100/50">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">${customer.totalSpent}</p>
                        <p className="text-sm text-muted-foreground">Total Spent</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {customer.totalBookings >= 5 ? "VIP" : customer.totalBookings >= 3 ? "Gold" : "Member"}
                        </p>
                        <p className="text-sm text-muted-foreground">Status</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {upcomingBookings.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Clock className="w-5 h-5 text-blue-500" />
                      Upcoming Appointments ({upcomingBookings.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingBookings.map((booking) => (
                      <BookingCard key={booking.id} booking={booking} onRebook={handleRebook} showRebook={false} />
                    ))}
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <History className="w-5 h-5 text-gray-500" />
                      Booking History ({pastBookings.length})
                    </CardTitle>
                    <Button onClick={() => setLocation("/booking")} size="sm">
                      <CalendarDays className="w-4 h-4 mr-1" /> Book New Cleaning
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {pastBookings.length === 0 ? (
                    <p className="text-center text-muted-foreground py-6">No past bookings yet</p>
                  ) : (
                    <div className="space-y-3">
                      {pastBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} onRebook={handleRebook} showRebook={booking.status === "completed"} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-lg mb-1">Need another cleaning?</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Book your next cleaning in just a few clicks — your info is already saved!
                  </p>
                  <Button onClick={() => setLocation("/booking")} size="lg">
                    Book Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : null}
        </div>
      </div>

      <Footer />
    </>
  );
}

function BookingCard({
  booking,
  onRebook,
  showRebook,
}: {
  booking: PortalBooking;
  onRebook: (b: PortalBooking) => void;
  showRebook: boolean;
}) {
  const config = statusConfig[booking.status] || statusConfig.pending;
  const StatusIcon = config.icon;
  const dateStr = new Date(booking.preferredDate + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border bg-white hover:bg-gray-50/50 transition-colors gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium">
            {serviceLabels[booking.serviceType] || booking.serviceType}
          </span>
          <Badge variant="secondary" className={config.color}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {config.label}
          </Badge>
        </div>
        <div className="flex items-center gap-4 mt-1.5 text-sm text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1">
            <CalendarDays className="w-3.5 h-3.5" /> {dateStr}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {booking.preferredTime}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {booking.city}, {booking.state}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-semibold text-lg">${booking.amount}</span>
        {showRebook && (
          <Button variant="outline" size="sm" onClick={() => onRebook(booking)}>
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Rebook
          </Button>
        )}
      </div>
    </div>
  );
}
