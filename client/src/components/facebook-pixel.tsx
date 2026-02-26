import { useEffect } from 'react';
import { useLocation } from 'wouter';

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

const PIXEL_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID;

export function trackLead(data?: { name?: string; email?: string; serviceType?: string; value?: number }) {
  if (!PIXEL_ID || typeof window.fbq !== 'function') return;
  window.fbq('track', 'Lead', {
    content_name: data?.serviceType || 'Cleaning Service',
    value: data?.value || 0,
    currency: 'USD',
  });
}

export function trackBooking(value: number) {
  if (!PIXEL_ID || typeof window.fbq !== 'function') return;
  window.fbq('track', 'Purchase', { value, currency: 'USD' });
}

export function FacebookPixel() {
  const [location] = useLocation();

  useEffect(() => {
    if (!PIXEL_ID) return;

    if (typeof window.fbq !== 'function') {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);

      const noscript = document.createElement('noscript');
      const img = document.createElement('img');
      img.height = 1;
      img.width = 1;
      img.style.display = 'none';
      img.src = `https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`;
      noscript.appendChild(img);
      document.head.appendChild(noscript);
    } else {
      window.fbq('track', 'PageView');
    }
  }, [location]);

  return null;
}
