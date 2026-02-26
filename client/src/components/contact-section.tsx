import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Phone, Mail, MapPin, Send, ShieldCheck, RefreshCw, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { z } from 'zod';
import captainClarityImage from '@assets/IMG_0067_1771957028664.png';

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
    <section id="contact" className="py-10 lg:py-16 relative overflow-hidden section-gradient-blue">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(29 78 216 / 0.6) 1px, transparent 0)', backgroundSize: '36px 36px' }} />
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-teal-300/15 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="mb-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="flex items-center gap-4 text-white">
            <ShieldCheck className="w-10 h-10 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-xl">100% Satisfaction Guarantee</h3>
              <p className="text-emerald-100 text-sm">Not happy? We'll re-clean for free — no questions asked.</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-200" />
              <span>Free re-clean</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-200" />
              <span>48hr response</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                We respond within 24 hours
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 font-serif">
                Get in Touch with the Clean Team!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Questions? Ready to book? We're just a sponge-swipe away.
              </p>
            </div>
            
            <Card className="bg-white/95 dark:bg-gray-800/95 shadow-2xl border-0 rounded-2xl backdrop-blur-md overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-500" />
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="contact-form">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="border-gray-200 dark:border-gray-600 rounded-xl h-11 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
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
                          <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              {...field} 
                              className="border-gray-200 dark:border-gray-600 rounded-xl h-11 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
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
                          <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                            Phone <span className="text-gray-400 text-sm font-normal">(optional)</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              {...field} 
                              value={field.value || ''} 
                              className="border-gray-200 dark:border-gray-600 rounded-xl h-11 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
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
                          <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Service Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger 
                                className="border-gray-200 dark:border-gray-600 rounded-xl h-11" 
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
                          <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              value={field.value || ''}
                              rows={4} 
                              placeholder="Tell us about your cleaning needs..."
                              className="border-gray-200 dark:border-gray-600 rounded-xl resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold py-6 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-200" 
                      disabled={contactMutation.isPending}
                      data-testid="button-submit"
                    >
                      {contactMutation.isPending ? (
                        'Sending...'
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="w-5 h-5" />
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
            <div className="flex justify-center lg:justify-end mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-800/80 rounded-2xl z-10 pointer-events-none" />
                <img 
                  src={captainClarityImage} 
                  alt="Captain Clarity - Self-Maid superhero ready to help" 
                  className="w-64 h-64 lg:w-80 lg:h-80 object-contain hero-image-blend"
                  data-testid="contact-mascot-image"
                />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700/30">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>
              
              <div className="space-y-5">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-center group" data-testid={`contact-info-${index}`}>
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:from-blue-500/30 group-hover:to-teal-500/30 transition-all">
                        <Icon className="w-5 h-5 text-blue-300" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">{info.label}</p>
                        {info.href ? (
                          <a 
                            href={info.href} 
                            target={info.href.startsWith('http') ? '_blank' : undefined}
                            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-white hover:text-blue-300 font-medium transition-colors"
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
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Service Areas</h4>
                <div className="rounded-xl overflow-hidden shadow-lg">
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
