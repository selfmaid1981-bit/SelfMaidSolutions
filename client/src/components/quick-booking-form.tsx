import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { BookingModal } from './booking-modal';
import { serviceOptions, formatServicePrice, getTomorrowDate } from '@/lib/services';
import { z } from 'zod';

const quickBookingSchema = z.object({
  serviceType: z.string().min(1, 'Please select a service'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  preferredDate: z.string().optional(),
});

type QuickBookingData = z.infer<typeof quickBookingSchema>;


export function QuickBookingForm() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState<QuickBookingData | null>(null);

  const form = useForm<QuickBookingData>({
    resolver: zodResolver(quickBookingSchema),
    defaultValues: {
      serviceType: '',
      firstName: '',
      lastName: '',
      phone: '',
      preferredDate: '',
    },
  });

  const selectedService = form.watch('serviceType');
  const selectedServiceOption = serviceOptions.find(s => s.value === selectedService);

  const onSubmit = (data: QuickBookingData) => {
    setBookingData(data);
    setIsBookingModalOpen(true);
  };

  const handleModalClose = () => {
    setIsBookingModalOpen(false);
    setBookingData(null);
  };

  // Get tomorrow's date as default minimum date
  const minDate = getTomorrowDate();

  return (
    <>
      <Card className="mx-auto max-w-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Quick Booking
          </CardTitle>
          <p className="text-muted-foreground">
            Get started with your cleaning service booking in seconds
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Service Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="quick-booking-service">
                            <SelectValue placeholder="Select your cleaning service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceOptions.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              <div className="flex justify-between items-center w-full">
                                <span>{service.label}</span>
                                <span className="text-sm text-muted-foreground ml-2">
                                  {formatServicePrice(service.price)}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John" 
                          {...field} 
                          data-testid="quick-booking-firstname"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Doe" 
                          {...field} 
                          data-testid="quick-booking-lastname"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="(334) 877-9513" 
                          {...field} 
                          data-testid="quick-booking-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Date (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          min={minDate}
                          {...field} 
                          data-testid="quick-booking-date"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {selectedServiceOption && (
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Selected Service:</p>
                  <p className="font-semibold text-foreground">{selectedServiceOption.label}</p>
                  <p className="text-sm text-primary font-medium">{formatServicePrice(selectedServiceOption.price)}</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 text-lg"
                data-testid="quick-booking-submit"
              >
                Continue Booking
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                No payment required now. Complete your booking details in the next step.
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>

      {bookingData && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={handleModalClose}
          defaultService={bookingData.serviceType}
          userData={bookingData}
        />
      )}
    </>
  );
}