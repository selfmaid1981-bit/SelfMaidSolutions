import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { serviceOptions, timeSlots, getTomorrowDate } from '@/lib/services';
import { insertBookingSchema } from '@shared/schema';
import { z } from 'zod';
import { useLocation } from 'wouter';

const bookingFormSchema = insertBookingSchema.extend({
  serviceType: z.string().min(1, 'Please select a service'),
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.string().min(1, 'Please select a time'),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

interface UserData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  preferredDate?: string;
  serviceType?: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  userData?: UserData;
  isRecruitment?: boolean;
}


export function BookingModal({ isOpen, onClose, defaultService = '', userData, isRecruitment = false }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: '',
      phone: userData?.phone || '',
      serviceType: userData?.serviceType || defaultService,
      address: '',
      city: '',
      state: 'AL',
      zipCode: '',
      preferredDate: userData?.preferredDate || '',
      preferredTime: '',
      specialInstructions: '',
      amount: 80,
    },
  });

  const selectedService = form.watch('serviceType');
  const selectedServiceData = serviceOptions.find(s => s.value === selectedService);

  useEffect(() => {
    if (selectedServiceData) {
      form.setValue('amount', selectedServiceData.price);
    }
  }, [selectedService, selectedServiceData, form]);

  useEffect(() => {
    if (isOpen && userData) {
      // Prefill form with user data from quick booking form
      if (userData.firstName) form.setValue('firstName', userData.firstName);
      if (userData.lastName) form.setValue('lastName', userData.lastName);
      if (userData.phone) form.setValue('phone', userData.phone);
      if (userData.preferredDate) form.setValue('preferredDate', userData.preferredDate);
      if (userData.serviceType) form.setValue('serviceType', userData.serviceType);
    } else if (defaultService && isOpen) {
      form.setValue('serviceType', defaultService);
    }
  }, [defaultService, userData, isOpen, form]);

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await apiRequest('POST', '/api/bookings', data);
      return response.json();
    },
    onSuccess: (result) => {
      // Redirect to checkout with booking ID
      onClose();
      setLocation(`/checkout?bookingId=${result.bookingId}&amount=${selectedServiceData?.price || 80}`);
    },
    onError: (error: any) => {
      toast({
        title: "Booking Error",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingFormData) => {
    bookingMutation.mutate(data);
  };

  const nextStep = () => {
    if (step === 1 && !selectedService) {
      toast({
        title: "Service Required",
        description: "Please select a service to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 2) {
      const { preferredDate, preferredTime } = form.getValues();
      if (!preferredDate || !preferredTime) {
        toast({
          title: "Date and Time Required",
          description: "Please select both date and time to continue.",
          variant: "destructive",
        });
        return;
      }
    }
    
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleClose = () => {
    setStep(1);
    form.reset();
    onClose();
  };

  // Set minimum date to tomorrow for consistency with quick booking form
  const minDate = getTomorrowDate();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="booking-modal">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>{isRecruitment ? 'Join Our Team' : 'Book Your Cleaning Service'}</DialogTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClose}
              data-testid="close-booking-modal"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="py-6">
          {/* Progress indicator - only show for booking, not recruitment */}
          {!isRecruitment && (
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= stepNumber 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div className={`w-12 h-0.5 mx-2 ${
                        step > stepNumber ? 'bg-primary' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Recruitment Form */}
              {isRecruitment && (
                <div data-testid="recruitment-form">
                  <h3 className="text-lg font-semibold mb-4">Tell Us About Yourself</h3>
                  <p className="text-muted-foreground mb-6">
                    We're always looking for dedicated individuals to join our cleaning team. 
                    Fill out this form and we'll get back to you soon!
                  </p>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-recruitment-firstName" />
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
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-recruitment-lastName" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} data-testid="input-recruitment-email" />
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
                            <FormLabel>Phone *</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                {...field} 
                                value={field.value || ''} 
                                data-testid="input-recruitment-phone" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="specialInstructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tell us why you'd like to join our team</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              value={field.value || ''}
                              placeholder="Share your experience, availability, or why you're interested in joining Self-Maid Cleaning Solutions..."
                              rows={4}
                              data-testid="textarea-recruitment-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="button"
                    onClick={() => {
                      // Handle recruitment submission
                      const formData = form.getValues();
                      toast({
                        title: "Application Submitted!",
                        description: "Thank you for your interest! We'll contact you within 2 business days.",
                      });
                      handleClose();
                    }}
                    className="w-full mt-6 bg-secondary hover:bg-secondary/90 text-white"
                    data-testid="submit-recruitment"
                  >
                    Submit Application
                  </Button>
                </div>
              )}

              {/* Step 1: Service Selection */}
              {!isRecruitment && step === 1 && (
                <div data-testid="booking-step-1">
                  <h3 className="text-lg font-semibold mb-4">1. Select Your Service</h3>
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} value={field.value}>
                            <div className="space-y-3">
                              {serviceOptions.map((service) => (
                                <div key={service.value} className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50">
                                  <RadioGroupItem value={service.value} id={service.value} />
                                  <Label htmlFor={service.value} className="flex-1 cursor-pointer">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <div className="font-medium">{service.label}</div>
                                        <div className="text-sm text-muted-foreground">Starting at ${service.price}</div>
                                      </div>
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="button" 
                    onClick={nextStep} 
                    className="w-full mt-6"
                    data-testid="step-1-next"
                  >
                    Continue to Schedule <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}

              {/* Step 2: Scheduling */}
              {!isRecruitment && step === 2 && (
                <div data-testid="booking-step-2">
                  <h3 className="text-lg font-semibold mb-4">2. Choose Date & Time</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Date</FormLabel>
                          <FormControl>
                            <Input 
                              type="date" 
                              min={minDate} 
                              {...field}
                              data-testid="input-preferredDate"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Time</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-preferredTime">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>{time}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep} 
                      className="flex-1"
                      data-testid="step-2-back"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={nextStep} 
                      className="flex-1"
                      data-testid="step-2-next"
                    >
                      Continue to Details <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact & Address Details */}
              {!isRecruitment && step === 3 && (
                <div data-testid="booking-step-3">
                  <h3 className="text-lg font-semibold mb-4">3. Contact & Address Information</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-booking-firstName" />
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
                              <Input {...field} data-testid="input-booking-lastName" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} data-testid="input-booking-email" />
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
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                {...field} 
                                value={field.value || ''} 
                                data-testid="input-booking-phone" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-booking-address" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-booking-city" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input {...field} defaultValue="AL" disabled />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-booking-zipCode" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="specialInstructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Instructions (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              value={field.value || ''}
                              placeholder="Any special instructions or requests..."
                              data-testid="textarea-booking-instructions"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Service Total:</span>
                        <span className="text-lg font-bold text-primary" data-testid="service-total">
                          ${selectedServiceData?.price || 80}.00
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep} 
                      className="flex-1"
                      data-testid="step-3-back"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-secondary hover:bg-secondary/90 text-white"
                      disabled={bookingMutation.isPending}
                      data-testid="complete-booking"
                    >
                      {bookingMutation.isPending ? 'Processing...' : 'Proceed to Payment'}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
