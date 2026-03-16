import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { Phone, Shield, Star, Check, Clock, Sparkles, ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { trackLead } from '@/components/facebook-pixel';
import mascotImage from '@assets/2290BC3D-42AC-47C8-8279-D1D3C7452892_1773674858018.png';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone number required'),
  serviceType: z.string().min(1, 'Please choose a service'),
  hearAboutUs: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const trustBadges = [
  { icon: Shield, label: 'Fully Insured' },
  { icon: Star, label: '5-Star Rated' },
  { icon: Clock, label: 'Same-Day Available' },
  { icon: Users, label: '500+ Clients Served' },
];

const services = [
  'Residential Cleaning',
  'Deep Cleaning',
  'Move In/Out Cleaning',
  'Commercial/Office',
  'Airbnb/Short-Term Rental',
  'Apartment Turnover',
];

const hearOptions = [
  'Facebook / Instagram Ad',
  'Google Search',
  'Friend or Family Referral',
  'Nextdoor',
  'Yelp',
  'Google Maps',
  'Saw a flyer',
  'Other',
];

export default function GetStarted() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(key => {
      const val = params.get(key);
      if (val) utm[key] = val;
    });
    setUtmParams(utm);
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', serviceType: '', hearAboutUs: '', message: '' },
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      const nameParts = data.name.trim().split(' ');
      const utmNote = Object.keys(utmParams).length
        ? `\n\n[Lead Source: ${utmParams.utm_source || 'direct'} / ${utmParams.utm_medium || '-'} / ${utmParams.utm_campaign || '-'}]`
        : '';
      const hearNote = data.hearAboutUs ? `\nHow they found us: ${data.hearAboutUs}` : '';
      return apiRequest('POST', '/api/contact', {
        firstName: nameParts[0] || data.name,
        lastName: nameParts.slice(1).join(' ') || '',
        email: data.email,
        phone: data.phone,
        serviceType: data.serviceType,
        message: (data.message || '') + hearNote + utmNote,
      });
    },
    onSuccess: () => {
      trackLead({ name: form.getValues('name'), email: form.getValues('email'), serviceType: form.getValues('serviceType') });
      setSubmitted(true);
    },
    onError: () => {
      toast({ title: 'Something went wrong', description: 'Please try calling us directly at (334) 877-9513.', variant: 'destructive' });
    },
  });

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">You're on the list!</h2>
          <p className="text-emerald-200 text-lg mb-6">
            We'll call you within <strong className="text-white">2 business hours</strong> to confirm your cleaning and answer any questions.
          </p>
          <p className="text-slate-400 mb-8">Check your email for a confirmation — and feel free to call us anytime:</p>
          <a
            href="tel:334-877-9513"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl"
          >
            <Phone className="w-5 h-5" />
            (334) 877-9513
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <header className="px-4 py-4 flex items-center justify-between max-w-2xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-yellow-400/40">
            <img src={mascotImage} alt="Self-Maid" className="w-full h-full object-cover object-[center_20%]" />
          </div>
          <div>
            <div className="text-white font-black text-lg leading-none">Self-Maid</div>
            <div className="text-emerald-300 text-[9px] font-bold tracking-widest uppercase">Cleaning Solutions</div>
          </div>
        </a>
        <a
          href="tel:334-877-9513"
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/20 transition-all"
        >
          <Phone className="w-4 h-4 text-emerald-400" />
          (334) 877-9513
        </a>
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-16 pt-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 text-amber-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
            <Sparkles className="w-4 h-4" />
            Limited spots — only 3 openings left this week
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-[1.1]">
            Get a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Spotless Home</span><br />Without the Stress
          </h1>
          <p className="text-emerald-100/80 text-lg leading-relaxed">
            Alabama's trusted cleaning crew. Professional, insured, and background-checked. We show up, clean up, and leave your space sparkling — every time.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div key={label} className="bg-white/8 border border-white/10 rounded-xl p-3 text-center">
              <Icon className="w-5 h-5 text-teal-400 mx-auto mb-1.5" />
              <p className="text-white text-xs font-semibold">{label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/[0.06] border border-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl mb-6">
          <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-teal-500 rounded-full mb-6 -mx-6 sm:-mx-8 mt-[-24px] sm:mt-[-32px] rounded-t-3xl" />

          <h2 className="text-xl font-bold text-white mb-1">Claim Your Free Quote</h2>
          <p className="text-slate-400 text-sm mb-6">No commitment. We'll call you within 2 hours to confirm.</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300 text-sm">Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Jane Smith" className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 rounded-xl h-11 focus:border-emerald-400 focus:bg-white/15" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300 text-sm">Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" placeholder="(334) 555-0000" className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 rounded-xl h-11 focus:border-emerald-400 focus:bg-white/15" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300 text-sm">Email Address</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="you@email.com" className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 rounded-xl h-11 focus:border-emerald-400 focus:bg-white/15" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="serviceType" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300 text-sm">What do you need cleaned?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-xl h-11 focus:border-emerald-400 focus:bg-white/15">
                        <SelectValue placeholder="Choose a service..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="hearAboutUs" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300 text-sm">How did you hear about us? <span className="text-slate-500">(optional)</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-xl h-11 focus:border-emerald-400 focus:bg-white/15">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hearOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-bold py-6 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all h-auto mt-2"
              >
                {mutation.isPending ? 'Sending...' : (
                  <>
                    Get My Free Quote
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
              <p className="text-center text-slate-500 text-xs">
                No spam. No obligation. We'll call you within 2 hours.
              </p>
            </form>
          </Form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {[
            { emoji: '✓', text: 'Background-checked cleaners' },
            { emoji: '✓', text: 'Satisfaction guarantee or re-clean' },
            { emoji: '✓', text: 'Serving Montgomery & surrounding areas' },
          ].map(({ emoji, text }) => (
            <div key={text} className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
              <span className="text-emerald-400 font-bold text-sm">{emoji}</span>
              <span className="text-slate-300 text-sm">{text}</span>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {[
            { name: 'Michelle C.', text: 'They did my Airbnb turnover in 2 hours. Guests gave me 5 stars. Incredible!', service: 'Airbnb Cleaning' },
            { name: 'LACONTE J.', text: 'My house has never been this clean. Called Monday, cleaned Tuesday. Fast and professional.', service: 'Residential' },
          ].map((r, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 font-bold text-white text-sm">
                {r.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <span className="text-slate-400 text-xs">{r.name}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">"{r.text}"</p>
                <span className="text-emerald-400 text-xs mt-1 block">{r.service}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center py-6 border-t border-white/5">
        <p className="text-slate-600 text-xs">© {new Date().getFullYear()} Self-Maid Cleaning Solutions LLC · Montgomery, AL · (334) 877-9513</p>
      </footer>
    </div>
  );
}
