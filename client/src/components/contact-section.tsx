import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Phone, Mail, MapPin, Send, ShieldCheck, RefreshCw, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  serviceType: z.string().min(1, 'Please select a service type'),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      serviceType: '',
      message: '',
    },
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    const quoteAmount = urlParams.get('quote');
    
    if (service) {
      form.setValue('serviceType', service);
      
      if (quoteAmount) {
        const message = `I received a quote of $${quoteAmount} for ${service} and would like to proceed with booking.`;
        form.setValue('message', message);
      }
    }
  }, [form]);

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => {
      const nameParts = data.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const backendData = {
        firstName,
        lastName,
        email: data.email,
        phone: data.phone || null,
        serviceType: data.serviceType,
        message: data.message || null,
      };
      
      return apiRequest('POST', '/api/contact', backendData);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '(334) 877-9513',
      href: 'tel:334-877-9513'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'selfmaidclean@outlook.com',
      href: 'mailto:selfmaidclean@outlook.com'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Montgomery & Prattville, AL',
      href: 'https://www.google.com/maps/search/Self-Maid+Cleaning+Solutions+Montgomery+AL'
    }
  ];

  return (
    <section id="contact" className="py-10 lg:py-16 relative overflow-hidden bg-gray-50">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(31 42 55 / 0.4) 1px, transparent 0)', backgroundSize: '36px 36px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="mb-10 bg-[#1F2A37] rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          <div className="flex items-center gap-4 text-white relative z-10">
            <div className="w-12 h-12 bg-[#C6A969]/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 flex-shrink-0" />
            </div>
            <div>
              <h3 className="font-bold text-xl">100% Satisfaction Guarantee</h3>
              <p className="text-white/60 text-sm">Not happy? We'll re-clean for free — no questions asked.</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-white/90 text-sm relative z-10">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3.5 py-2 rounded-lg">
              <RefreshCw className="w-4 h-4 text-[#C6A969]" />
              <span>Free re-clean</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3.5 py-2 rounded-lg">
              <Clock className="w-4 h-4 text-[#C6A969]" />
              <span>48hr response</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-[#C6A969]/10 text-[#1F2A37] px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-[#C6A969]/20">
                <span className="w-2 h-2 rounded-full bg-[#C6A969] animate-pulse" />
                We respond within 24 hours
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2A37] mb-3 font-serif italic">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600">
                Questions? Ready to book? We're here to help.
              </p>
            </div>
            
            <Card className="bg-white/95 shadow-2xl border-0 rounded-2xl overflow-hidden relative">
              <div className="h-1.5 bg-gradient-to-r from-[#1F2A37] via-[#C6A969] to-[#1F2A37]" />
              <CardContent className="p-8 relative">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="contact-form">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="border-gray-200 rounded-xl h-12 focus:ring-2 focus:ring-[#C6A969]/20 focus:border-[#C6A969] transition-all bg-gray-50/50 hover:bg-white" 
                              data-testid="input-name" 
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
                          <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              {...field} 
                              className="border-gray-200 rounded-xl h-12 focus:ring-2 focus:ring-[#C6A969]/20 focus:border-[#C6A969] transition-all bg-gray-50/50 hover:bg-white" 
                              data-testid="input-email" 
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
                          <FormLabel className="text-gray-700 font-medium">
                            Phone <span className="text-gray-400 text-sm font-normal">(optional)</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              {...field} 
                              value={field.value || ''} 
                              className="border-gray-200 rounded-xl h-12 focus:ring-2 focus:ring-[#C6A969]/20 focus:border-[#C6A969] transition-all bg-gray-50/50 hover:bg-white" 
                              data-testid="input-phone" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Service Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger 
                                className="border-gray-200 rounded-xl h-12 bg-gray-50/50 hover:bg-white transition-all" 
                                data-testid="select-serviceType"
                              >
                                <SelectValue placeholder="Select a service..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="residential">Residential Cleaning</SelectItem>
                              <SelectItem value="commercial">Commercial/Office</SelectItem>
                              <SelectItem value="airbnb">Airbnb Cleaning</SelectItem>
                              <SelectItem value="moveout">Move In/Out</SelectItem>
                              <SelectItem value="dorm">Student Dorm</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              value={field.value || ''}
                              rows={4} 
                              placeholder="Tell us about your cleaning needs..."
                              className="border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-[#C6A969]/20 focus:border-[#C6A969] transition-all bg-gray-50/50 hover:bg-white"
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#1F2A37] hover:bg-[#2a3a4d] text-white font-bold py-6 rounded-xl text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group" 
                      disabled={contactMutation.isPending}
                      data-testid="button-submit"
                    >
                      {contactMutation.isPending ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="bg-[#1F2A37] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C6A969] via-[#C6A969]/50 to-[#C6A969]" />
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 relative z-10 font-serif italic">
                <Sparkles className="w-5 h-5 text-[#C6A969]" />
                Contact Info
              </h3>
              
              <div className="space-y-4 relative z-10">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-center group" data-testid={`contact-info-${index}`}>
                      <div className="w-12 h-12 bg-[#C6A969]/15 rounded-xl flex items-center justify-center mr-4 group-hover:bg-[#C6A969]/25 group-hover:scale-105 transition-all duration-300">
                        <Icon className="w-5 h-5 text-[#C6A969]" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">{info.label}</p>
                        {info.href ? (
                          <a 
                            href={info.href} 
                            target={info.href.startsWith('http') ? '_blank' : undefined}
                            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-white hover:text-[#C6A969] font-medium transition-colors duration-200"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Service Areas</h4>
                <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10">
                  <iframe
                    title="Self-Maid Cleaning Solutions Service Areas - Montgomery, Prattville, Selma, Alabama"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d426458.8894091447!2d-86.62654674999999!3d32.3617899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x888e8194b0d481f9%3A0x8e1b511d354285ff!2sMontgomery%2C%20AL!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                    data-testid="google-maps-embed"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-3 text-center">
                  Serving Montgomery, Prattville, Selma, Homewood, Clanton & surrounding areas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
