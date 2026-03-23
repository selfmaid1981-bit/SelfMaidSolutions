import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { z } from 'zod';

const bookingFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

export function FinalCtaSection() {
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const bookingMutation = useMutation({
    mutationFn: (data: BookingFormData) => {
      const nameParts = data.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      return apiRequest('POST', '/api/contact', {
        firstName,
        lastName,
        email: data.email,
        phone: data.phone || null,
        serviceType: 'residential',
        message: 'Booking inquiry from homepage form',
      });
    },
    onSuccess: () => {
      toast({
        title: "Request Received!",
        description: "We'll get back to you within 24 hours to confirm your booking.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingFormData) => {
    bookingMutation.mutate(data);
  };

  return (
    <section className="text-white py-24 lg:py-32 relative overflow-hidden" style={{ background: '#0a0a0d' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 30% 50%, rgba(245,197,66,0.04) 0%, transparent 60%)'
      }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <p className="section-label text-white/50 tracking-[4px]">BOOK NOW</p>
            <div className="editorial-divider" />
            <h2 className="font-bold mb-6 font-serif leading-tight">
              Ready for a <span className="italic" style={{ color: '#f5c542' }}>spotless</span> home?
            </h2>
            <p className="text-white/40 text-base leading-relaxed mb-8 max-w-md">
              Get a transparent quote in seconds, or book directly. No hidden fees, no surprises — just a cleaner home.
            </p>
            <a
              href="#instant-quote"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('instant-quote');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="nav-book-btn inline-flex items-center gap-2 px-10 py-4 font-bold text-sm tracking-[1.5px] uppercase"
              data-testid="cta-get-quote"
            >
              GET A QUOTE
            </a>
          </div>

          <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(17,17,17,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="p-8 sm:p-10">
              <h3 className="text-xl font-bold text-white mb-2 font-serif italic text-center">Book Your Cleaning</h3>
              <p className="text-white/30 text-xs text-center mb-6 tracking-wide">We respond within 24 hours</p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="booking-form-cta">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Name"
                            className="border-white/8 rounded-lg h-12 bg-[#0a0a0d] text-white placeholder:text-white/25 focus:ring-1 focus:ring-[#f5c542]/30 focus:border-[#f5c542]/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            placeholder="Email"
                            className="border-white/8 rounded-lg h-12 bg-[#0a0a0d] text-white placeholder:text-white/25 focus:ring-1 focus:ring-[#f5c542]/30 focus:border-[#f5c542]/50"
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
                        <FormControl>
                          <Input
                            type="tel"
                            {...field}
                            value={field.value || ''}
                            placeholder="Phone (optional)"
                            className="border-white/8 rounded-lg h-12 bg-[#0a0a0d] text-white placeholder:text-white/25 focus:ring-1 focus:ring-[#f5c542]/30 focus:border-[#f5c542]/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full font-bold py-6 rounded-lg text-sm tracking-[1px] uppercase text-[#0a0a0d] hover:opacity-90 transition-opacity"
                    style={{ background: 'linear-gradient(135deg, #f5c542, #c89b2d)' }}
                    disabled={bookingMutation.isPending}
                    data-testid="cta-submit"
                  >
                    {bookingMutation.isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : 'SUBMIT'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
