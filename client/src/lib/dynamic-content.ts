const allTestimonials = [
  { id: 1, text: "Excellent service! My home has never looked better. They were thorough, professional, and I could tell they genuinely cared about doing a great job.", author: "Sarah L.", location: "Montgomery, AL" },
  { id: 2, text: "Professional and reliable. Highly recommended! They showed up on time, communicated clearly, and left everything spotless. Will definitely use again.", author: "James R.", location: "Prattville, AL" },
  { id: 3, text: "They helped me get my full deposit back when I moved out! The landlord was impressed. Best cleaning service in the area, hands down.", author: "David C.", location: "Selma, AL" },
  { id: 4, text: "I've tried three different cleaning companies and Self-Maid is by far the best. Consistent quality every single time. My go-to recommendation for friends.", author: "Angela T.", location: "Wetumpka, AL" },
  { id: 5, text: "The Airbnb turnover service is a game-changer. My guests always comment on how clean and fresh the space feels. 5 stars every time.", author: "Marcus W.", location: "Montgomery, AL" },
  { id: 6, text: "After our renovation, the deep cleaning they did was incredible. They got into every corner, behind appliances — places I didn't even think of. Worth every penny.", author: "Rachel H.", location: "Millbrook, AL" },
  { id: 7, text: "As a busy mom of three, Self-Maid gives me my weekends back. The team is always friendly, efficient, and my kids love coming home to a sparkling house.", author: "Tamara J.", location: "Pike Road, AL" },
  { id: 8, text: "Our office has never been cleaner. The staff is professional and thorough. We've been using them for over a year and the quality has never dropped.", author: "Kevin P.", location: "Montgomery, AL" },
  { id: 9, text: "I was nervous about hiring a cleaning service but Michelle put me at ease immediately. Background-checked team, insured, and incredibly detail-oriented.", author: "Linda M.", location: "Prattville, AL" },
];

export function getRotatingTestimonials(): typeof allTestimonials {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const setIndex = dayOfYear % Math.floor(allTestimonials.length / 3);
  const start = (setIndex * 3) % allTestimonials.length;
  const result = [];
  for (let i = 0; i < 3; i++) {
    result.push(allTestimonials[(start + i) % allTestimonials.length]);
  }
  return result;
}

const seasonalServices: Record<string, { highlight: string; tagline: string; badge: string }> = {
  spring: { highlight: 'Spring Deep Clean', tagline: 'Fresh start for the season — deep cleaning specials available', badge: 'SPRING SPECIAL' },
  summer: { highlight: 'Move-In/Move-Out', tagline: 'Moving season is here — get your deposit back guaranteed', badge: 'SUMMER DEALS' },
  fall: { highlight: 'Pre-Holiday Prep', tagline: 'Get your home guest-ready before the holidays', badge: 'FALL PREP' },
  winter: { highlight: 'Holiday Ready', tagline: 'Stress-free holidays start with a spotless home', badge: 'HOLIDAY SPECIAL' },
};

function getCurrentSeason(): string {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

export function getSeasonalPromo() {
  return seasonalServices[getCurrentSeason()];
}

export function getUrgencyMessage(): string {
  const day = new Date().getDay();
  const messages: Record<number, string> = {
    0: 'Book today for next-week availability',
    1: 'Only 3 slots left this week — book now',
    2: 'Midweek slots filling fast',
    3: 'Weekend cleaning spots almost gone',
    4: 'Last chance for weekend availability',
    5: 'Next week is booking up — secure your spot',
    6: 'Monday openings available — book ahead',
  };
  return messages[day] || 'Limited availability — book now';
}

const trustSignals = [
  { text: 'Trusted by 500+ Alabama families', icon: 'shield' },
  { text: 'Background-checked & insured team', icon: 'check' },
  { text: '16 years serving Central Alabama', icon: 'clock' },
  { text: '5.0 stars across 500+ reviews', icon: 'star' },
  { text: '100% satisfaction guarantee', icon: 'heart' },
  { text: 'Eco-friendly products, safe for pets & kids', icon: 'leaf' },
  { text: 'Same-day booking available', icon: 'zap' },
  { text: 'Licensed, bonded & fully insured', icon: 'award' },
];

export function getRotatingTrustSignals(count: number = 3): typeof trustSignals {
  const hour = new Date().getHours();
  const start = (hour % trustSignals.length);
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(trustSignals[(start + i) % trustSignals.length]);
  }
  return result;
}

const heroSubtexts = [
  'Premium cleaning that shows up on time — every time.',
  'Your home deserves the best — we deliver it.',
  'Trusted by hundreds of Alabama families since 2009.',
  'Professional results. Personal touch. Every visit.',
  'Where spotless meets stress-free.',
];

export function getRotatingSubtext(): string {
  const dayOfWeek = new Date().getDay();
  return heroSubtexts[dayOfWeek % heroSubtexts.length];
}
