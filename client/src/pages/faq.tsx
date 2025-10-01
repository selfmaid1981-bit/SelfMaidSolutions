import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, HelpCircle } from 'lucide-react';
import battleScene from '@assets/15B2E058-5750-4693-84A2-56BB21CDBAC2_1759308397289.png';
import heroImage from '@assets/ChatGPT Image Sep 12, 2025, 05_09_00 PM_1759310042131.png';

const faqs = [
  {
    question: "What cleaning services do you offer?",
    answer: "We provide comprehensive cleaning services including residential home cleaning, commercial office cleaning, Airbnb/vacation rental cleaning, move-in/move-out cleaning, and specialized student dormitory cleaning. Each service is customized to meet your specific needs and preferences."
  },
  {
    question: "How much do your cleaning services cost?",
    answer: "Our pricing varies based on the size of your space, type of service, and frequency of cleaning. We offer competitive rates starting from affordable base prices. Contact us for a free, personalized quote based on your specific needs. We believe in transparent pricing with no hidden fees."
  },
  {
    question: "Are your cleaners insured and background checked?",
    answer: "Absolutely! All our team members undergo thorough background checks for your peace of mind. We are fully insured with comprehensive liability coverage, so you're protected in the unlikely event of any accidents or damages during our service."
  },
  {
    question: "Do you use eco-friendly cleaning products?",
    answer: "Yes! We prioritize the health and safety of your family, pets, and the environment. We use safe, non-toxic, eco-friendly cleaning products that are just as effective as traditional cleaners but without harmful chemicals or strong odors."
  },
  {
    question: "How do I schedule a cleaning service?",
    answer: "Scheduling is easy! You can book online through our website, call us at (334) 877-9513, or fill out our contact form. We offer flexible scheduling including evenings and weekends to work around your busy schedule."
  },
  {
    question: "What should I do to prepare for a cleaning service?",
    answer: "Minimal preparation is needed! Just clear any personal items you'd prefer we don't move, secure any fragile or valuable items, and ensure we have access to the areas you'd like cleaned. We'll bring all necessary cleaning supplies and equipment."
  },
  {
    question: "Can I customize what areas are cleaned?",
    answer: "Absolutely! We understand every space is different. You can specify which rooms or areas you'd like us to focus on, any areas to avoid, and any special requests or concerns. Just let us know your preferences when booking."
  },
  {
    question: "What if I'm not satisfied with the cleaning?",
    answer: "Your satisfaction is our top priority! We offer a 100% satisfaction guarantee. If you're not completely happy with any aspect of our service, contact us within 24 hours and we'll return to address any concerns at no additional charge."
  },
  {
    question: "Do I need to be home during the cleaning?",
    answer: "Not necessarily! Many of our clients prefer to be out while we clean. You can provide us with access instructions, or we can work around your schedule if you prefer to be present. We're flexible and will accommodate whatever makes you most comfortable."
  },
  {
    question: "How often should I have my space professionally cleaned?",
    answer: "This depends on your lifestyle, space size, and personal preferences. Popular options include weekly, bi-weekly, or monthly cleaning. We can help you determine the best frequency based on your needs and budget during your consultation."
  },
  {
    question: "Do you provide cleaning supplies and equipment?",
    answer: "Yes! We bring all necessary cleaning supplies, equipment, and tools. We use professional-grade products and equipment to ensure the best results. If you have specific products you'd prefer us to use, we're happy to accommodate that request."
  },
  {
    question: "What areas do you service in Alabama?",
    answer: "We proudly serve communities throughout Alabama. Contact us to confirm service availability in your specific area - we're always expanding our service zones to help more customers experience our superhero-level cleaning!"
  },
  {
    question: "How long does a typical cleaning session take?",
    answer: "Cleaning time varies based on the size of your space and type of service. A typical residential cleaning takes 2-4 hours, while larger spaces or deep cleaning services may take longer. We'll provide an estimated timeframe when you book your service."
  },
  {
    question: "Can you work around my schedule?",
    answer: "Yes! We offer flexible scheduling including evenings and weekends. We understand that everyone has different schedules, and we'll work with you to find a time that's convenient for your routine."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods for your convenience, including cash, checks, and major credit cards. Payment is typically due upon completion of service, and we can also discuss payment arrangements for regular cleaning schedules."
  }
];

export default function FAQ() {
  return (
    <>
      <SEOHead
        title="Frequently Asked Questions | Self-Maid Cleaning Solutions Alabama"
        description="Find answers to common questions about Self-Maid Cleaning Solutions' services, pricing, scheduling, and more. Get the information you need about our Alabama cleaning services."
        keywords="cleaning service FAQ, Alabama cleaning questions, Self-Maid cleaning answers, cleaning service information, residential cleaning FAQ"
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-cyan-400 to-primary/5 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <img 
              src={heroImage}
              alt="Self-Maid cleaning superhero mascot team with mops and cleaning supplies" 
              className="w-full max-w-2xl mx-auto mb-8 h-auto"
              data-testid="faq-hero-image"
            />
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Got questions? We've got answers! Find everything you need to know about our cleaning services.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
                Common Questions About Our Services
              </h2>
              <p className="text-muted-foreground text-lg text-center">
                Can't find what you're looking for? Feel free to contact us directly!
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border rounded-lg px-6"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger 
                    className="text-left font-semibold hover:no-underline py-6"
                    data-testid={`faq-question-${index}`}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent 
                    className="text-muted-foreground pb-6 leading-relaxed"
                    data-testid={`faq-answer-${index}`}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Battle Scene Section */}
        <section className="bg-gradient-to-b from-primary/5 to-muted/20">
          <div 
            className="min-h-[400px] lg:min-h-[500px]"
            style={{
              backgroundImage: `url(${battleScene})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              We Fight Dirt So You Don't Have To!
            </h2>
            <p className="text-xl text-muted-foreground">
              Armed with professional tools and expertise, we tackle every cleaning challenge with superhero-level determination.
            </p>
          </div>
        </section>

        {/* Still Have Questions Section */}
        <section className="py-16 bg-muted/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  Still Have Questions?
                </CardTitle>
                <p className="text-muted-foreground">
                  Our friendly team is here to help! Get in touch and we'll provide personalized answers.
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="tel:334-877-9513" 
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
                    data-testid="faq-cta-phone"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call (334) 877-9513
                  </a>
                  <a 
                    href="/#contact" 
                    className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors inline-flex items-center justify-center"
                    data-testid="faq-cta-contact"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Send Us a Message
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}