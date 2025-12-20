import { Link } from 'wouter';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaGoogle, FaYelp } from 'react-icons/fa';
import { SiNextdoor, SiThumbtack } from 'react-icons/si';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Residential Cleaning', href: '/services' },
    { name: 'Commercial Cleaning', href: '/services' },
    { name: 'Airbnb Cleaning', href: '/services' },
    { name: 'Move In/Out', href: '/services' },
    { name: 'Deep Cleaning', href: '/services' },
    { name: 'Student Dorms', href: '/services' },
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Blog & Tips', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Get a Quote', href: '/quote' },
    { name: 'Book Now', href: '/booking' },
  ];

  const serviceAreas = [
    'Montgomery, AL',
    'Prattville, AL', 
    'Selma, AL',
    'Homewood, AL',
    'Clanton, AL',
    'Millbrook, AL',
    'Wetumpka, AL',
    'Pike Road, AL'
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: 'https://www.facebook.com/selfmaidcleaning', label: 'Facebook' },
    { icon: FaInstagram, href: 'https://www.instagram.com/selfmaidcleaning', label: 'Instagram' },
    { icon: FaGoogle, href: 'https://www.google.com/maps/search/Self-Maid+Cleaning+Solutions+Montgomery+AL', label: 'Google' },
    { icon: FaYelp, href: 'https://www.yelp.com/search?find_desc=Self-Maid+Cleaning&find_loc=Montgomery%2C+AL', label: 'Yelp' },
  ];

  const directoryLinks = [
    { name: 'Google Business', href: 'https://www.google.com/maps/search/Self-Maid+Cleaning+Solutions+Montgomery+AL' },
    { name: 'Yelp', href: 'https://www.yelp.com/biz/self-maid-cleaning-solutions-montgomery' },
    { name: 'BBB', href: 'https://www.bbb.org/us/al/montgomery' },
    { name: 'Angi', href: 'https://www.angi.com/companylist/us/al/montgomery/house-cleaning.htm' },
    { name: 'Thumbtack', href: 'https://www.thumbtack.com/al/montgomery/house-cleaning/' },
    { name: 'HomeAdvisor', href: 'https://www.homeadvisor.com/c.House-Cleaning.Montgomery.AL.-12050.html' },
    { name: 'Nextdoor', href: 'https://nextdoor.com/pages/self-maid-cleaning-solutions-montgomery-al/' },
    { name: 'Houzz', href: 'https://www.houzz.com/professionals/house-cleaners/montgomery-al' },
    { name: 'Porch', href: 'https://porch.com/montgomery-al/house-cleaning-services' },
    { name: 'Bark', href: 'https://www.bark.com/en/us/house-cleaning/montgomery-al/' },
  ];

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Self-Maid Cleaning Solutions</h3>
            <p className="text-background/80 mb-4">
              Professional cleaning services you can trust. Serving Central Alabama with 16 years of experience. Fully insured, bonded, and background-checked team members.
            </p>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/60 hover:text-background transition-colors"
                    aria-label={`Visit us on ${social.label}`}
                    data-testid={`social-${social.label.toLowerCase()}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            <div className="flex items-center text-sm text-background/60 space-x-2">
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">5.0 ★</span>
              <span>500+ Reviews</span>
            </div>
          </div>
          
          {/* Services */}
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

          {/* Quick Links */}
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

          {/* Service Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-1 text-background/80 text-sm">
              {serviceAreas.map((area, index) => (
                <li key={index} className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-background/80">
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
                  className="hover:text-background transition-colors flex items-center text-sm"
                  data-testid="footer-email"
                >
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  selfmaidclean@outlook.com
                </a>
              </li>
              <li>
                <a 
                  href="https://www.google.com/maps/search/Self-Maid+Cleaning+Solutions+Montgomery+AL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-background transition-colors flex items-center text-sm"
                  data-testid="footer-maps"
                >
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  View on Google Maps
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Directory Backlinks Section */}
        <div className="border-t border-background/20 mt-8 pt-8">
          <h4 className="text-center text-lg font-semibold mb-4">Find Us On</h4>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {directoryLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-background/60 hover:text-background transition-colors flex items-center"
                data-testid={`directory-link-${index}`}
              >
                {link.name}
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            ))}
          </div>
        </div>

        {/* Trust Badges & Certifications */}
        <div className="border-t border-background/20 mt-6 pt-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-background/60">
            <span className="flex items-center">✓ Fully Insured</span>
            <span className="flex items-center">✓ Bonded</span>
            <span className="flex items-center">✓ Background Checked</span>
            <span className="flex items-center">✓ Eco-Friendly</span>
            <span className="flex items-center">✓ 16 Years Experience</span>
            <span className="flex items-center">✓ 100% Satisfaction Guarantee</span>
          </div>
        </div>
        
        {/* Copyright & Additional SEO Links */}
        <div className="border-t border-background/20 mt-6 pt-6 text-center text-background/60">
          <p data-testid="footer-copyright" className="mb-2">
            &copy; {currentYear} Self-Maid Cleaning Solutions. All rights reserved.
          </p>
          <p className="text-xs">
            Professional cleaning services in <a href="https://en.wikipedia.org/wiki/Montgomery,_Alabama" target="_blank" rel="noopener noreferrer" className="underline hover:text-background">Montgomery</a>, <a href="https://en.wikipedia.org/wiki/Prattville,_Alabama" target="_blank" rel="noopener noreferrer" className="underline hover:text-background">Prattville</a>, <a href="https://en.wikipedia.org/wiki/Selma,_Alabama" target="_blank" rel="noopener noreferrer" className="underline hover:text-background">Selma</a>, <a href="https://en.wikipedia.org/wiki/Homewood,_Alabama" target="_blank" rel="noopener noreferrer" className="underline hover:text-background">Homewood</a>, and <a href="https://en.wikipedia.org/wiki/Clanton,_Alabama" target="_blank" rel="noopener noreferrer" className="underline hover:text-background">Clanton</a>, Alabama.
          </p>
        </div>
      </div>
    </footer>
  );
}
