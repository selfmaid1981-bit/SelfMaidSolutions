import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  UserPlus,
  Repeat,
  Gift,
} from "lucide-react";
import type { Booking, Cleaner, RecurringBooking, Referral } from "@shared/schema";

export default function AdminDashboard() {
  const { data: bookings, isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  const { data: cleaners, isLoading: cleanersLoading } = useQuery<Cleaner[]>({
    queryKey: ["/api/cleaners"],
  });

  const { data: recurringBookings } = useQuery<RecurringBooking[]>({
    queryKey: ["/api/recurring-bookings"],
  });

  const { data: referrals } = useQuery<Referral[]>({
    queryKey: ["/api/referrals"],
  });

  const stats = {
    totalBookings: bookings?.length || 0,
    pendingBookings: bookings?.filter(b => b.status === "pending").length || 0,
    confirmedBookings: bookings?.filter(b => b.status === "confirmed").length || 0,
    completedBookings: bookings?.filter(b => b.status === "completed").length || 0,
    totalRevenue: bookings?.reduce((sum, b) => sum + (b.amount || 0), 0) || 0,
    activeCleaners: cleaners?.filter(c => c.isActive).length || 0,
    activeSubscriptions: recurringBookings?.filter(r => r.status === "active").length || 0,
    pendingReferrals: referrals?.filter(r => r.status === "pending").length || 0,
  };

  const recentBookings = bookings?.slice(0, 10) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Self-Maid Cleaning Solutions - Business Management
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/">
                <Users className="mr-2 h-4 w-4" />
                View Site
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Total Bookings
              </CardTitle>
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {stats.totalBookings}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {stats.pendingBookings} pending • {stats.confirmedBookings} confirmed
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                ${stats.totalRevenue}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                From {stats.completedBookings} completed jobs
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Active Cleaners
              </CardTitle>
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {stats.activeCleaners}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Team members available
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Subscriptions
              </CardTitle>
              <Repeat className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {stats.activeSubscriptions}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Recurring bookings active
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="bg-slate-100 dark:bg-slate-800">
            <TabsTrigger value="bookings" data-testid="tab-bookings">
              <Calendar className="mr-2 h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="cleaners" data-testid="tab-cleaners">
              <Users className="mr-2 h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="subscriptions" data-testid="tab-subscriptions">
              <Repeat className="mr-2 h-4 w-4" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="referrals" data-testid="tab-referrals">
              <Gift className="mr-2 h-4 w-4" />
              Referrals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Recent Bookings
              </h2>
              <Button asChild>
                <Link href="/admin/bookings">
                  View All Bookings
                </Link>
              </Button>
            </div>

            {bookingsLoading ? (
              <div className="text-center py-8 text-slate-500">Loading bookings...</div>
            ) : recentBookings.length === 0 ? (
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="text-center py-8 text-slate-500">
                  No bookings yet
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {recentBookings.map((booking) => (
                  <Card key={booking.id} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                              {booking.firstName} {booking.lastName}
                            </h3>
                            <Badge
                              variant={
                                booking.status === "completed"
                                  ? "default"
                                  : booking.status === "confirmed"
                                  ? "secondary"
                                  : "outline"
                              }
                              data-testid={`badge-status-${booking.id}`}
                            >
                              {booking.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {booking.serviceType} • {booking.city}, {booking.state}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-500">
                            <Clock className="inline h-3 w-3 mr-1" />
                            {booking.preferredDate} at {booking.preferredTime}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            ${booking.amount}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {booking.phone}
                          </p>
                        </div>
                      </div>
                      {booking.assignedCleanerId && (
                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <UserPlus className="inline h-3 w-3 mr-1" />
                            Assigned to cleaner
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="cleaners" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Team Management
              </h2>
              <Button asChild>
                <Link href="/admin/cleaners">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Cleaner
                </Link>
              </Button>
            </div>

            {cleanersLoading ? (
              <div className="text-center py-8 text-slate-500">Loading team...</div>
            ) : !cleaners || cleaners.length === 0 ? (
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="text-center py-8 text-slate-500">
                  No cleaners added yet. Add your first team member to get started!
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cleaners.map((cleaner) => (
                  <Card key={cleaner.id} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                            {cleaner.firstName} {cleaner.lastName}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {cleaner.email}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-500">
                            {cleaner.phone}
                          </p>
                        </div>
                        <Badge variant={cleaner.isActive ? "default" : "secondary"}>
                          {cleaner.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">
                            Jobs Completed:
                          </span>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {cleaner.totalJobsCompleted}
                          </span>
                        </div>
                        {cleaner.hourlyRate && (
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-slate-600 dark:text-slate-400">
                              Hourly Rate:
                            </span>
                            <span className="font-semibold text-slate-900 dark:text-white">
                              ${cleaner.hourlyRate}/hr
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Recurring Bookings
              </h2>
            </div>

            {!recurringBookings || recurringBookings.length === 0 ? (
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="text-center py-8 text-slate-500">
                  No recurring bookings yet
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {recurringBookings.map((subscription) => (
                  <Card key={subscription.id} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                              {subscription.firstName} {subscription.lastName}
                            </h3>
                            <Badge
                              variant={subscription.status === "active" ? "default" : "secondary"}
                            >
                              {subscription.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {subscription.serviceType} • {subscription.frequency}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-500">
                            Next: {subscription.nextScheduledDate || "Not scheduled"}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            ${subscription.amount}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            per {subscription.frequency}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="referrals" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Referral Program
              </h2>
            </div>

            {!referrals || referrals.length === 0 ? (
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="text-center py-8 text-slate-500">
                  No referrals yet
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {referrals.map((referral) => (
                  <Card key={referral.id} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                              {referral.referrerName} → {referral.referredName}
                            </h3>
                            <Badge
                              variant={
                                referral.status === "completed"
                                  ? "default"
                                  : referral.status === "booked"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {referral.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Referred: {referral.referredEmail}
                          </p>
                          {referral.notes && (
                            <p className="text-sm text-slate-500 dark:text-slate-500">
                              {referral.notes}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600 dark:text-green-400">
                            ${referral.rewardAmount}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {referral.rewardPaid ? "Paid" : "Pending"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
