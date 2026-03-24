import { Link } from 'wouter';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaGoogle, FaYelp } from 'react-icons/fa';
import fullLogoImage from '@assets/C1779863-20FF-4284-87E7-F8622C11FE8C_1773603022797.png';

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
    { name: 'My Bookings', href: '/portal' },
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
    <footer className="relative text-white overflow-hidden" style={{ background: '#0a0a0d', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(245,197,66,0.4) 30%, rgba(255,220,120,0.6) 50%, rgba(245,197,66,0.4) 70%, transparent 95%)', backgroundSize: '200% 100%', animation: 'goldShimmer 4s ease-in-out infinite' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-5">
              <img
                src={fullLogoImage}
                alt="Self-Maid Cleaning Services LLC Logo - Professional Cleaning Montgomery AL"
                className="h-24 w-auto object-contain drop-shadow-lg"
                loading="lazy"
                width={200}
                height={96}
              />
            </div>
            <p className="text-white/40 leading-relaxed text-sm mb-5">
              Professional cleaning services you can trust. Serving Central Alabama with 16 years of experience.
            </p>
            <div className="flex space-x-2.5 mb-5">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-[#f5c542] transition-all duration-300 hover:scale-110"
                    style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)' }}
                    aria-label={`Visit us on ${social.label}`}
                    data-testid={`social-${social.label.toLowerCase()}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
            <div className="inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 shadow-md" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <span key={i} className="text-sm" style={{ color: '#f5c542' }}>&#9733;</span>)}
              </div>
              <span className="text-white font-bold text-sm">5.0</span>
              <span className="text-white/20">&middot;</span>
              <span className="text-white/40 text-xs">500+ Reviews</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[3px] text-white/50 mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service.href} 
                    className="text-white/35 hover:text-white/70 transition-colors duration-300 text-sm"
                    data-testid={`footer-service-${index}`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[3px] text-white/50 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-white/35 hover:text-white/70 transition-colors duration-300 text-sm"
                    data-testid={`footer-quick-link-${index}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[3px] text-white/50 mb-6">
              Contact
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a 
                  href="tel:334-877-9513" 
                  className="text-white/40 hover:text-white transition-colors duration-200 flex items-center text-sm group"
                  data-testid="footer-phone"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-2.5 transition-colors" style={{ background: 'rgba(245,197,66,0.08)' }}>
                    <Phone className="w-3.5 h-3.5" style={{ color: '#f5c542' }} />
                  </div>
                  (334) 877-9513
                </a>
              </li>
              <li>
                <a 
                  href="mailto:selfmaidclean@outlook.com" 
                  className="text-white/40 hover:text-white transition-colors duration-200 flex items-center text-sm group"
                  data-testid="footer-email"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-2.5 flex-shrink-0 transition-colors" style={{ background: 'rgba(245,197,66,0.08)' }}>
                    <Mail className="w-3.5 h-3.5" style={{ color: '#f5c542' }} />
                  </div>
                  <span className="truncate">selfmaidclean@outlook.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.google.com/maps/search/Self-Maid+Cleaning+Solutions+Montgomery+AL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors duration-200 flex items-center text-sm group"
                  data-testid="footer-maps"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-2.5 flex-shrink-0 transition-colors" style={{ background: 'rgba(245,197,66,0.08)' }}>
                    <MapPin className="w-3.5 h-3.5" style={{ color: '#f5c542' }} />
                  </div>
                  Google Maps
                  <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                </a>
              </li>
            </ul>

            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50 mt-6 mb-3">Service Areas</h4>
            <div className="flex flex-wrap gap-1">
              {[
                { name: 'Montgomery', href: '/house-cleaning-montgomery-al' },
                { name: 'Prattville', href: '/house-cleaning-prattville-al' },
                { name: 'Millbrook', href: '/house-cleaning-millbrook-al' },
                { name: 'Wetumpka', href: '/house-cleaning-wetumpka-al' },
                { name: 'Selma', href: '/house-cleaning-selma-al' },
                { name: 'Pike Road', href: '/services/pike-road-al' },
                { name: 'Homewood', href: '/services/homewood-al' },
                { name: 'Clanton', href: '/services/clanton-al' },
                { name: 'Alabaster', href: '/services/alabaster-al' },
              ].map((area, index, arr) => (
                <span key={area.name}>
                  <Link href={area.href} className="text-xs text-white/30 hover:text-[#f5c542] transition-colors">
                    {area.name}
                  </Link>
                  {index < arr.length - 1 && <span className="text-xs text-white/15"> &middot; </span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <details className="group">
            <summary className="text-center text-xs text-white/20 cursor-pointer hover:text-white/40 transition-colors select-none list-none flex items-center justify-center gap-1.5">
              <span className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <span>Find us on 15+ directories</span>
              <span className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
            </summary>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 mt-4 text-xs">
              {directoryLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/20 hover:text-[#f5c542] transition-colors duration-200 px-2 py-0.5 rounded hover:bg-white/5"
                  data-testid={`directory-link-${index}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </details>
        </div>

        <div className="py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs">
            {['Fully Insured','Bonded','Background Checked','Eco-Friendly','16 Yrs Experience','100% Guarantee'].map(badge => (
              <span key={badge} className="flex items-center gap-1.5 text-white/40 px-3.5 py-1.5 rounded-full transition-colors duration-200" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="font-bold text-xs" style={{ color: '#f5c542' }}>&#10003;</span>
                {badge}
              </span>
            ))}
          </div>
        </div>
        
        <div className="py-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p data-testid="footer-copyright" className="text-white/30 text-sm mb-1">
            &copy; {currentYear} Self-Maid Cleaning Solutions. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Professional cleaning services in Montgomery, Prattville, Selma, Homewood, and Clanton, Alabama.
          </p>
        </div>
      </div>
    </footer>
  );
}
