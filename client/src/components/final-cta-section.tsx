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

  const inputClass = "w-full my-2 px-3 py-2.5 bg-transparent text-white border border-white/10 rounded-md placeholder:text-white/30 focus:outline-none focus:border-[#f5c542]/50 text-sm";

  return (
    <section className="text-white relative" style={{ padding: '80px 10%' }}>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold font-serif leading-tight mb-6">
            Ready for a spotless home?
          </h2>
          <a
            href="#instant-quote"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('instant-quote');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="nav-book-btn text-sm tracking-[1px] uppercase"
            data-testid="cta-get-quote"
          >
            GET A QUOTE
          </a>
        </div>

        <div
          className="rounded-[10px] w-full lg:w-[300px] flex-shrink-0"
          style={{
            background: '#111',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '30px'
          }}
        >
          <h3 className="text-lg font-bold text-white mb-3 text-center">Book Your Cleaning</h3>
          <form onSubmit={form.handleSubmit(onSubmit)} data-testid="booking-form-cta">
            <input
              {...form.register('name')}
              placeholder="Name"
              className={inputClass}
            />
            <input
              {...form.register('email')}
              type="email"
              placeholder="Email"
              className={inputClass}
            />
            <input
              {...form.register('phone')}
              type="tel"
              placeholder="Phone"
              className={inputClass}
            />
            <input
              {...form.register('date')}
              type="date"
              className={inputClass}
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
      </div>
    </section>
  );
}
