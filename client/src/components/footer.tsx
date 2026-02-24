import { Link } from 'wouter';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaGoogle, FaYelp } from 'react-icons/fa';
import fullLogoImage from '@assets/Designer_(1)_1771958986136.png';

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
    'Millbrook, AL',
    'Wetumpka, AL',
    'Alabaster, AL',
    'Selma, AL',
    'Homewood, AL',
    'Clanton, AL',
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
    { name: 'Manta', href: 'https://www.manta.com/c/mm5k81p/self-maid-cleaning-solutions' },
    { name: 'Alignable', href: 'https://www.alignable.com/montgomery-al/self-maid-cleaning-solutions' },
    { name: 'Expertise', href: 'https://www.expertise.com/al/montgomery/house-cleaning-services' },
    { name: 'Birdeye', href: 'https://birdeye.com/self-maid-cleaning-solutions-montgomery-al' },
    { name: 'YellowPages', href: 'https://www.yellowpages.com/montgomery-al/mip/self-maid-cleaning-solutions' },
  ];

  return (
    <footer className="relative text-white overflow-hidden" style={{ background: 'linear-gradient(160deg, #0f172a 0%, #0c1528 30%, #071020 60%, #0d1628 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="mb-5">
              <img
                src={fullLogoImage}
                alt="Self-Maid Cleaning Services LLC Logo"
                className="h-28 w-auto object-contain"
              />
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed max-w-sm">
              Professional cleaning services you can trust. Serving Central Alabama with 16 years of experience.
            </p>
            <div className="flex space-x-3 mb-5">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                    aria-label={`Visit us on ${social.label}`}
                    data-testid={`social-${social.label.toLowerCase()}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <div className="inline-flex items-center bg-slate-800 rounded-lg px-3 py-2 text-sm">
              <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold mr-2">5.0 ★</span>
              <span className="text-slate-300">500+ Reviews</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service.href} 
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                    data-testid={`footer-service-${index}`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                    data-testid={`footer-quick-link-${index}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:334-877-9513" 
                  className="text-slate-400 hover:text-white transition-colors flex items-center text-sm"
                  data-testid="footer-phone"
                >
                  <Phone className="w-4 h-4 mr-2 text-blue-400" />
                  (334) 877-9513
                </a>
              </li>
              <li>
                <a 
                  href="mailto:selfmaidclean@outlook.com" 
                  className="text-slate-400 hover:text-white transition-colors flex items-center text-sm"
                  data-testid="footer-email"
                >
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0 text-blue-400" />
                  selfmaidclean@outlook.com
                </a>
              </li>
              <li>
                <a 
                  href="https://www.google.com/maps/search/Self-Maid+Cleaning+Solutions+Montgomery+AL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center text-sm"
                  data-testid="footer-maps"
                >
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-blue-400" />
                  Google Maps
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>

            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mt-6 mb-3">Service Areas</h4>
            <div className="flex flex-wrap gap-1">
              {serviceAreas.map((area, index) => (
                <span key={index} className="text-xs text-slate-500">
                  {area}{index < serviceAreas.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 py-6">
          <details className="group">
            <summary className="text-center text-xs text-slate-500 cursor-pointer hover:text-slate-400 transition-colors select-none">
              Find Us On 15+ Directories ▾
            </summary>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-xs">
              {directoryLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-400 transition-colors"
                  data-testid={`directory-link-${index}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </details>
        </div>

        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-500 mb-4">
            <span>✓ Fully Insured</span>
            <span>✓ Bonded</span>
            <span>✓ Background Checked</span>
            <span>✓ Eco-Friendly</span>
            <span>✓ 16 Years Experience</span>
            <span>✓ 100% Satisfaction Guarantee</span>
          </div>
        </div>
        
        <div className="border-t border-slate-800 py-6 text-center">
          <p data-testid="footer-copyright" className="text-slate-500 text-sm mb-1">
            &copy; {currentYear} Self-Maid Cleaning Solutions. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Professional cleaning services in Montgomery, Prattville, Selma, Homewood, and Clanton, Alabama.
          </p>
        </div>
      </div>
    </footer>
  );
}
