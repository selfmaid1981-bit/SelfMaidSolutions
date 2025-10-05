import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { z } from 'zod';
import spongeHeroImage from '@assets/Shyne superhero char_1759328265491.png';

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
      // Split name into firstName and lastName for backend compatibility
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
      value: '334-877-9513',
      href: 'tel:334-877-9513'
    },
    {
      icon: Mail,
      value: 'selfmaidclean@outlook.com',
      href: 'mailto:selfmaidclean@outlook.com'
    },
    {
      icon: MapPin,
      value: '123 Sparkle St, Clean City, USA'
    }
  ];

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-sky-200 via-blue-100 to-blue-200 dark:from-sky-900 dark:to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Form and Title */}
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Get in Touch with the Clean Team!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Questions? Ready to book? We're just a sponge-swipe away.
              </p>
            </div>
            
            {/* Contact Form */}
            <Card className="bg-white/90 dark:bg-gray-800 shadow-lg border-0 rounded-2xl backdrop-blur-sm">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="border-gray-200 dark:border-gray-600 rounded-lg" 
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
                          <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              {...field} 
                              className="border-gray-200 dark:border-gray-600 rounded-lg" 
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
                          <FormLabel className="text-gray-700 dark:text-gray-300">
                            Phone <span className="text-gray-500 text-sm">(optional)</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              {...field} 
                              value={field.value || ''} 
                              className="border-gray-200 dark:border-gray-600 rounded-lg" 
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
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger 
                                className="border-gray-200 dark:border-gray-600 rounded-lg" 
                                data-testid="select-serviceType"
                              >
                                <SelectValue placeholder="House Cleaning" />
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
                          <FormLabel className="text-gray-700 dark:text-gray-300">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              value={field.value || ''}
                              rows={4} 
                              placeholder="Tell us about your cleaning needs..."
                              className="border-gray-200 dark:border-gray-600 rounded-lg resize-none"
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 rounded-xl text-lg shadow-lg transition-colors" 
                      disabled={contactMutation.isPending}
                      data-testid="button-submit"
                    >
                      {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Side - Mascot and Contact Info */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            {/* Mascot Character */}
            <div className="flex justify-center lg:justify-end mb-8">
              <div className="relative">
                <img 
                  src={spongeHeroImage} 
                  alt="Shyne superhero sponge mascot holding phone - Contact us today!" 
                  className="w-64 h-64 lg:w-80 lg:h-80 object-contain"
                  data-testid="contact-mascot-image"
                />
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="bg-slate-800/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-center" data-testid={`contact-info-${index}`}>
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                        <Icon className="w-5 h-5 text-blue-300" />
                      </div>
                      <div className="text-left">
                        {info.href ? (
                          <a 
                            href={info.href} 
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}