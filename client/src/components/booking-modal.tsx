import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { X, ArrowLeft, ArrowRight, Calculator, Check, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import {
  serviceOptions,
  getTomorrowDate,
  quoteServiceTypes,
  propertySizeOptions,
  frequencyOptions,
  addOnServices,
  calculateQuotePrice,
} from '@/lib/services';
import { AvailabilityPicker } from '@/components/availability-picker';
import { insertBookingSchema } from '@shared/schema';
import { z } from 'zod';
import { useLocation } from 'wouter';

const bookingFormSchema = insertBookingSchema.extend({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
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

  const [propertySize, setPropertySize] = useState('');
  const [customSqFt, setCustomSqFt] = useState('');
  const [frequency, setFrequency] = useState('onetime');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [numberOfRooms, setNumberOfRooms] = useState('');
  
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
      amount: 0,
    },
  });

  const selectedService = form.watch('serviceType');

  const calculatedPrice = calculateQuotePrice({
    serviceType: selectedService,
    propertySize,
    customSqFt,
    frequency,
    selectedAddOns,
    numberOfRooms,
  });

  useEffect(() => {
    if (calculatedPrice > 0) {
      form.setValue('amount', calculatedPrice);
    }
  }, [calculatedPrice, form]);

  useEffect(() => {
    if (isOpen && userData) {
      if (userData.firstName) form.setValue('firstName', userData.firstName);
      if (userData.lastName) form.setValue('lastName', userData.lastName);
      if (userData.phone) form.setValue('phone', userData.phone);
      if (userData.preferredDate) form.setValue('preferredDate', userData.preferredDate);
      if (userData.serviceType) form.setValue('serviceType', userData.serviceType);
    } else if (defaultService && isOpen) {
      form.setValue('serviceType', defaultService);
    }
  }, [defaultService, userData, isOpen, form]);

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnId)
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData & { skipPayment?: boolean }) => {
      const response = await apiRequest('POST', '/api/bookings', data);
      return response.json();
    },
    onSuccess: (result, variables) => {
      onClose();
      if (variables.skipPayment) {
        toast({
          title: "Booking Submitted!",
          description: "We've received your booking request. We'll contact you within 24 hours to confirm.",
        });
        setLocation('/');
      } else {
        setLocation(`/checkout?bookingId=${result.bookingId}&amount=${calculatedPrice}`);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Booking Error",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleBookWithoutPayment = () => {
    form.handleSubmit((data) => {
      bookingMutation.mutate({ ...data, amount: calculatedPrice, skipPayment: true });
    })();
  };

  const handleBookWithPayment = () => {
    form.handleSubmit((data) => {
      bookingMutation.mutate({ ...data, amount: calculatedPrice, skipPayment: false });
    })();
  };

  const isDormService = selectedService === 'dorm';
  const hasSizeInfo = isDormService
    ? parseInt(numberOfRooms) > 0
    : (propertySize !== '' || (customSqFt !== '' && parseInt(customSqFt) > 0));

  const nextStep = () => {
    if (step === 1 && !selectedService) {
      toast({ title: "Service Required", description: "Please select a service to continue.", variant: "destructive" });
      return;
    }

    if (step === 2 && !hasSizeInfo) {
      toast({ title: "Property Details Required", description: isDormService ? "Please enter the number of rooms." : "Please select a property size or enter square footage.", variant: "destructive" });
      return;
    }
    
    if (step === 3) {
      const { preferredDate, preferredTime } = form.getValues();
      if (!preferredDate || !preferredTime) {
        toast({ title: "Date and Time Required", description: "Please select both date and time to continue.", variant: "destructive" });
        return;
      }
    }
    
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleClose = () => {
    setStep(1);
    setPropertySize('');
    setCustomSqFt('');
    setFrequency('onetime');
    setSelectedAddOns([]);
    setNumberOfRooms('');
    form.reset();
    onClose();
  };

  const minDate = getTomorrowDate();
  const totalSteps = 4;

  const selectedQuoteService = quoteServiceTypes.find(s => s.value === selectedService);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" style={{ background: '#111111', borderColor: 'rgba(245,197,66,0.15)', color: 'white' }} data-testid="booking-modal">
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
          {!isRecruitment && (
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNumber) => (
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
                    {stepNumber < totalSteps && (
                      <div className={`w-8 h-0.5 mx-1 ${
                        step > stepNumber ? 'bg-primary' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Form {...form}>
            <form className="space-y-6">
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
                              {quoteServiceTypes.map((service) => (
                                <div key={service.value} className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50">
                                  <RadioGroupItem value={service.value} id={`booking-${service.value}`} />
                                  <Label htmlFor={`booking-${service.value}`} className="flex-1 cursor-pointer">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <div className="font-medium">{service.label}</div>
                                        <div className="text-sm text-muted-foreground">Starting at ${service.minCharge}</div>
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
                    Continue to Property Details <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}

              {!isRecruitment && step === 2 && (
                <div data-testid="booking-step-2">
                  <h3 className="text-lg font-semibold mb-2">2. Property Details</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tell us about your space so we can give you an accurate price.
                  </p>

                  {isDormService ? (
                    <div className="space-y-2">
                      <Label>Number of Rooms</Label>
                      <Input
                        type="number"
                        min="1"
                        step="1"
                        placeholder="e.g., 3 (kitchen, living room, bathroom)"
                        value={numberOfRooms}
                        onChange={(e) => setNumberOfRooms(e.target.value)}
                        data-testid="input-rooms"
                      />
                      <p className="text-xs text-muted-foreground">
                        $45 per room. Count all rooms including kitchen, living room, bedrooms, bathrooms, etc.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Property Size</Label>
                        <Select value={propertySize} onValueChange={(val) => { setPropertySize(val); setCustomSqFt(''); }}>
                          <SelectTrigger data-testid="select-property-size">
                            <SelectValue placeholder="Select property size" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertySizeOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Or Enter Exact Square Footage</Label>
                        <Input
                          type="number"
                          min="0"
                          step="1"
                          placeholder="e.g., 2500"
                          value={customSqFt}
                          onChange={(e) => { setCustomSqFt(e.target.value); if (e.target.value) setPropertySize(''); }}
                          data-testid="input-sqft"
                        />
                        <p className="text-xs text-muted-foreground">
                          Exact square footage gives the most accurate price
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 space-y-2">
                    <Label>Service Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger data-testid="select-frequency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencyOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mt-6 space-y-2">
                    <Label>Additional Services (Optional)</Label>
                    <div className="space-y-2">
                      {addOnServices.map(addOn => (
                        <div key={addOn.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`booking-addon-${addOn.id}`}
                            checked={selectedAddOns.includes(addOn.id)}
                            onChange={() => toggleAddOn(addOn.id)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            data-testid={`addon-${addOn.id}`}
                          />
                          <label htmlFor={`booking-addon-${addOn.id}`} className="flex-1 text-sm cursor-pointer">
                            {addOn.label} (+${addOn.price})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {calculatedPrice > 0 && (
                    <div className="mt-6 rounded-xl p-4 text-white text-center" style={{ background: 'linear-gradient(135deg, rgba(245,197,66,0.15), rgba(200,155,45,0.1))', border: '1px solid rgba(245,197,66,0.25)' }} data-testid="live-price">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Calculator className="w-4 h-4" style={{ color: '#f5c542' }} />
                        <span className="text-sm font-medium text-white/70">Estimated Price</span>
                      </div>
                      <div className="text-3xl font-bold">${calculatedPrice}</div>
                      <p className="text-xs text-white/50 mt-1">
                        {frequency !== 'onetime' ? 'per service' : 'one-time service'} · final price confirmed by Self-Maid
                      </p>
                    </div>
                  )}

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
                      Continue to Schedule <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {!isRecruitment && step === 3 && (
                <div data-testid="booking-step-3">
                  <h3 className="text-lg font-semibold mb-4">3. Choose Date & Time</h3>
                  <AvailabilityPicker
                    selectedDate={form.watch("preferredDate")}
                    selectedTime={form.watch("preferredTime")}
                    onDateChange={(date) => form.setValue("preferredDate", date, { shouldValidate: true })}
                    onTimeChange={(time) => form.setValue("preferredTime", time, { shouldValidate: true })}
                  />
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
                      type="button" 
                      onClick={nextStep} 
                      className="flex-1"
                      data-testid="step-3-next"
                    >
                      Continue to Details <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {!isRecruitment && step === 4 && (
                <div data-testid="booking-step-4">
                  <h3 className="text-lg font-semibold mb-4">4. Contact & Address Information</h3>
                  
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

                    <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-800 dark:text-amber-200 text-xs">
                        <strong>Important:</strong> Each booking must be approved by Self-Maid. You will be contacted as soon as your request is received. Final pricing is confirmed by Self-Maid.
                      </AlertDescription>
                    </Alert>

                    <div className="bg-muted/50 p-4 rounded-lg space-y-2" data-testid="booking-summary">
                      <h4 className="font-semibold text-sm">Booking Summary</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service:</span>
                          <span className="font-medium">{selectedQuoteService?.label}</span>
                        </div>
                        {isDormService ? (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Rooms:</span>
                            <span className="font-medium">{numberOfRooms}</span>
                          </div>
                        ) : (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Size:</span>
                            <span className="font-medium">
                              {customSqFt ? `${customSqFt} sq ft` : propertySizeOptions.find(s => s.value === propertySize)?.label}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Frequency:</span>
                          <span className="font-medium">{frequencyOptions.find(f => f.value === frequency)?.label}</span>
                        </div>
                        {selectedAddOns.length > 0 && (
                          <div className="pt-1 border-t">
                            <span className="text-muted-foreground text-xs">Add-ons:</span>
                            {selectedAddOns.map(id => {
                              const addOn = addOnServices.find(a => a.id === id);
                              return (
                                <div key={id} className="flex items-center justify-between ml-2">
                                  <span className="flex items-center text-xs">
                                    <Check className="w-3 h-3 mr-1" style={{ color: '#f5c542' }} />
                                    {addOn?.label}
                                  </span>
                                  <span className="text-xs font-medium">+${addOn?.price}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="font-semibold">Estimated Total:</span>
                        <span className="text-xl font-bold text-primary" data-testid="service-total">
                          ${calculatedPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mt-6">
                    <div className="flex gap-3">
                      <Button 
                        type="button"
                        onClick={handleBookWithoutPayment}
                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold"
                        disabled={bookingMutation.isPending || calculatedPrice <= 0}
                        data-testid="book-without-payment"
                      >
                        {bookingMutation.isPending ? 'Processing...' : 'Book Now (Pay Later)'}
                      </Button>
                      <Button 
                        type="button"
                        onClick={handleBookWithPayment}
                        className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-semibold"
                        disabled={bookingMutation.isPending || calculatedPrice <= 0}
                        data-testid="book-with-payment"
                      >
                        {bookingMutation.isPending ? 'Processing...' : 'Book & Pay Now'}
                      </Button>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep} 
                      className="w-full"
                      data-testid="step-4-back"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Choose "Book Now" to reserve your time and pay later, or "Book & Pay Now" to complete payment immediately.
                    </p>
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
