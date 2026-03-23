import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { z } from 'zod';

const bookingFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  date: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

export function FinalCtaSection() {
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: { name: '', email: '', phone: '', date: '' },
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
        message: `Booking inquiry from homepage form${data.date ? ` — Preferred date: ${data.date}` : ''}`,
      });
    },
    onSuccess: () => {
      toast({ title: "Request Received!", description: "We'll get back to you within 24 hours to confirm your booking." });
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to submit. Please try again.", variant: "destructive" });
    },
  });

  const onSubmit = (data: BookingFormData) => bookingMutation.mutate(data);

  const inputClass = "w-full block text-white bg-transparent border border-white/20 rounded placeholder:text-white/40 focus:outline-none focus:border-[#f5c542]/50 text-sm";

  return (
    <section className="text-white section-warm" style={{ padding: '60px 10%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold font-serif leading-tight mb-6">
          Ready for a <span className="gold-shine-text">spotless</span> home?
        </h2>
        <button
          onClick={() => {
            const el = document.getElementById('instant-quote');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hero-outline-btn text-sm tracking-[1px] uppercase font-bold"
          data-testid="cta-get-quote"
        >
          GET A QUOTE
        </button>
      </div>

      <div
        style={{
          background: '#111',
          padding: '30px',
          borderRadius: '10px',
          border: '1px solid #333',
          width: '340px',
          flexShrink: 0
        }}
      >
        <h3 className="text-lg font-bold text-white mb-4 text-center">Book Your Cleaning</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} data-testid="booking-form-cta">
          <input
            {...form.register('name')}
            placeholder="Name"
            className={inputClass}
            style={{ margin: '10px 0', padding: '10px' }}
          />
          <input
            {...form.register('email')}
            type="email"
            placeholder="Email"
            className={inputClass}
            style={{ margin: '10px 0', padding: '10px' }}
          />
          <input
            {...form.register('phone')}
            type="tel"
            placeholder="Phone"
            className={inputClass}
            style={{ margin: '10px 0', padding: '10px' }}
          />
          <input
            {...form.register('date')}
            type="date"
            className={inputClass}
            style={{ margin: '10px 0', padding: '10px' }}
          />
          <button
            type="submit"
            className="nav-book-btn w-full mt-3 text-sm tracking-[1px] uppercase"
            disabled={bookingMutation.isPending}
            data-testid="cta-submit"
          >
            {bookingMutation.isPending ? 'Submitting...' : 'SUBMIT'}
          </button>
        </form>
      </div>
    </section>
  );
}
