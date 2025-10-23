import { Link } from 'wouter';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaGoogle } from 'react-icons/fa';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Residential Cleaning', href: '/services' },
    { name: 'Commercial Cleaning', href: '/services' },
    { name: 'Airbnb Cleaning', href: '/services' },
    { name: 'Move In/Out', href: '/services' },
    { name: 'Student Dorms', href: '/services' },
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Blog & Tips', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Get a Quote', href: '/quote' },
    { name: 'Service Areas', href: '/services' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaGoogle, href: '#', label: 'Google' },
  ];

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Self-Maid Cleaning Solutions</h3>
            <p className="text-background/80 mb-4">
              Professional cleaning services you can trust. Serving Montgomery, Prattville, and surrounding Alabama communities with 16 years of experience.
            </p>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href} 
                    className="text-background/60 hover:text-background transition-colors"
                    aria-label={social.label}
                    data-testid={`social-${social.label.toLowerCase()}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-background/60">
              <strong>Service Areas:</strong> Montgomery, Prattville, Millbrook, Wetumpka, Pike Road & More
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-background/80">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service.href} 
                    className="hover:text-background transition-colors"
                    data-testid={`footer-service-${index}`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/80">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="hover:text-background transition-colors"
                    data-testid={`footer-quick-link-${index}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a 
                  href="tel:334-877-9513" 
                  className="hover:text-background transition-colors flex items-center"
                  data-testid="footer-phone"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  (334) 877-9513
                </a>
              </li>
              <li>
                <a 
                  href="mailto:selfmaidclean@outlook.com" 
                  className="hover:text-background transition-colors flex items-center"
                  data-testid="footer-email"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  selfmaidclean@outlook.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1" />
                <span data-testid="footer-location">Montgomery & Prattville, AL</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
          <p data-testid="footer-copyright">
            &copy; {currentYear} Self-Maid Cleaning Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
