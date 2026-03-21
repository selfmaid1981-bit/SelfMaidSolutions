export const SERVICES = {
  residential: {
    id: 'residential',
    name: 'Residential Cleaning',
    basePrice: 80,
    description: 'Professional home cleaning services',
  },
  deep: {
    id: 'deep',
    name: 'Deep Cleaning',
    basePrice: 250,
    description: 'Intensive top-to-bottom cleaning service',
    baseRate: 0.195,
  },
  commercial: {
    id: 'commercial',
    name: 'Commercial/Office',
    basePrice: 120,
    description: 'Office and commercial space cleaning',
  },
  airbnb: {
    id: 'airbnb',
    name: 'Airbnb Cleaning',
    basePrice: 65,
    description: 'Quick turnaround cleaning for short-term rentals',
  },
  moveout: {
    id: 'moveout',
    name: 'Move In/Out',
    basePrice: 150,
    description: 'Deep cleaning for moving day',
  },
  dorm: {
    id: 'dorm',
    name: 'Student Dorm',
    basePrice: 45,
    description: 'Affordable cleaning for student housing',
  },
} as const;

export type ServiceType = keyof typeof SERVICES;

export const getServiceByType = (type: string) => {
  return SERVICES[type as ServiceType] || null;
};

export const calculateServicePrice = (serviceType: ServiceType, multiplier: number = 1) => {
  const service = SERVICES[serviceType];
  return service ? service.basePrice * multiplier : 0;
};

export const serviceOptions = Object.values(SERVICES).map(service => ({
  value: service.id,
  label: service.name,
  price: service.basePrice,
  description: service.description,
}));

export const timeSlots = [
  '8:00 AM',
  '10:00 AM', 
  '12:00 PM',
  '2:00 PM',
  '4:00 PM',
];

export const getTomorrowDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const formatServicePrice = (price: number): string => {
  return `Starting at $${price}`;
};

export const getServiceOption = (value: string) => {
  return serviceOptions.find(service => service.value === value);
};

export const quoteServiceTypes = [
  { value: 'residential', label: 'Standard House Cleaning', baseRate: 0.13, minCharge: 120 },
  { value: 'deep', label: 'Deep Cleaning', baseRate: 0.195, minCharge: 250 },
  { value: 'moveout', label: 'Move-Out Cleaning', baseRate: 0.228, minCharge: 325 },
  { value: 'apartment', label: 'Apartment Turnover', baseRate: 0.171, minCharge: 108 },
  { value: 'shorttermrental', label: 'Short Term Rental', baseRate: 0.114, minCharge: 95 },
  { value: 'commercial', label: 'Commercial/Office Cleaning', baseRate: 0.163, minCharge: 180 },
  { value: 'construction', label: 'Construction Cleanup', baseRate: 0.293, minCharge: 400 },
  { value: 'dorm', label: 'Student Dorm/Apartment Turnover', baseRate: 0.12, minCharge: 45, perRoom: 45 },
];

export const sqFtServiceTypes = quoteServiceTypes.filter(s => s.value !== 'dorm');

export const propertySizeOptions = [
  { value: 'small', label: 'Under 1,000 sq ft', multiplier: 1 },
  { value: 'medium', label: '1,000 – 2,000 sq ft', multiplier: 1.5 },
  { value: 'large', label: '2,000 – 3,000 sq ft', multiplier: 2 },
  { value: 'xlarge', label: '3,000+ sq ft', multiplier: 2.5 },
];

export const frequencyOptions = [
  { value: 'onetime', label: 'One-Time Service', discount: 0 },
  { value: 'biweekly', label: 'Bi-Weekly (10% off)', discount: 0.10 },
  { value: 'monthly', label: 'Monthly (5% off)', discount: 0.05 },
];

export const homepageFrequencyOptions = [
  { value: 'onetime', label: 'One-Time Cleaning', discount: 0, badge: null },
  { value: 'weekly', label: 'Weekly Cleaning (15% off)', discount: 0.15, badge: null },
  { value: 'biweekly', label: 'Biweekly Cleaning (10% off)', discount: 0.10, badge: 'Most Popular' as const },
  { value: 'monthly', label: 'Monthly Cleaning (5% off)', discount: 0.05, badge: null },
];

export const fullQuoteFrequencyOptions = [
  { value: 'onetime', label: 'One-Time Service', discount: 0 },
  { value: 'weekly', label: 'Weekly (15% discount)', discount: 0.15 },
  { value: 'biweekly', label: 'Bi-Weekly (10% discount)', discount: 0.10 },
  { value: 'monthly', label: 'Monthly (5% discount)', discount: 0.05 },
];

export const addOnServices = [
  { id: 'carpet', label: 'Carpet Cleaning', price: 75 },
  { id: 'appliances', label: 'Appliance Cleaning', price: 35 },
  { id: 'refrigerator', label: 'Refrigerator Cleaning', price: 30 },
  { id: 'stove', label: 'Stove Cleaning', price: 25 },
  { id: 'garage', label: 'Garage Cleaning', price: 60 },
  { id: 'blinds', label: 'Blind Cleaning', price: 35 },
  { id: 'baseboards', label: 'Baseboard Cleaning', price: 30 },
];

export const PET_SURCHARGE = 25;

export function estimateSqFt(bedrooms: number, bathrooms: number): number {
  if (bedrooms <= 0 && bathrooms <= 0) return 0;
  return Math.round(400 + (bedrooms * 250) + (bathrooms * 75));
}

export const cleanTypeTiers = [
  { value: 'standard', label: 'Ongoing', description: 'Maintenance clean', multiplier: 1.0, badge: null, includes: [] as string[] },
  { value: 'premium', label: 'Premium', description: 'More detailed, polished clean', multiplier: 1.25, badge: 'MOST POPULAR' as const, includes: ['Cabinet fronts', 'Baseboards (spot)', 'Mirrors & glass', 'Bed making'] },
  { value: 'deep', label: 'Deep Clean', description: 'Full home reset', multiplier: 1.5, badge: null, includes: ['Oven & fridge', 'Grout scrubbing', 'Fixtures & fans', 'Window tracks'] },
] as const;

export type CleanType = typeof cleanTypeTiers[number]['value'];

export function calcBasePrice(beds: number, baths: number, sqft: number, cleanType: CleanType = 'premium'): number {
  let total = 120 + (beds * 25) + (baths * 20);

  if (sqft > 3000) total += 40;
  else if (sqft > 2000) total += 25;

  const tier = cleanTypeTiers.find(t => t.value === cleanType);
  total *= tier?.multiplier || 1;

  if (total < 150) total = 150;

  return Math.round(total / 10) * 10;
}

export function calculateQuotePrice(config: {
  serviceType: string;
  propertySize?: string;
  customSqFt?: string;
  frequency: string;
  selectedAddOns?: string[];
  numberOfRooms?: string;
  bedrooms?: string;
  bathrooms?: string;
  pets?: string;
  cleanType?: CleanType;
}): number {
  const {
    serviceType,
    propertySize = '',
    customSqFt = '',
    frequency,
    selectedAddOns = [],
    numberOfRooms,
    bedrooms = '',
    bathrooms = '',
    pets = 'no',
    cleanType = 'premium',
  } = config;
  if (!serviceType) return 0;

  const service = quoteServiceTypes.find(s => s.value === serviceType);
  const freqList = [...frequencyOptions, ...fullQuoteFrequencyOptions];
  const freq = freqList.find(f => f.value === frequency);
  if (!service || !freq) return 0;

  let sqFt = parseInt(customSqFt) || 0;
  const beds = parseInt(bedrooms) || 0;
  const baths = parseFloat(bathrooms) || 0;

  let basePrice = 0;

  if (serviceType === 'dorm' && numberOfRooms) {
    const rooms = Math.max(0, parseInt(numberOfRooms) || 0);
    if (rooms > 0) {
      basePrice = rooms * ((service as any).perRoom || 45);
    } else {
      return 0;
    }
  } else if (beds > 0 || baths > 0 || sqFt > 0) {
    if (sqFt <= 0 && (beds > 0 || baths > 0)) {
      sqFt = estimateSqFt(beds, baths);
    }
    basePrice = Math.max(service.minCharge, calcBasePrice(beds, baths, sqFt, cleanType));
  } else if (propertySize) {
    const sizeOption = propertySizeOptions.find(s => s.value === propertySize);
    if (!sizeOption) return 0;
    basePrice = Math.round(service.minCharge * sizeOption.multiplier);
  } else {
    return 0;
  }

  if (pets === 'yes') basePrice += PET_SURCHARGE;

  basePrice = Math.round(basePrice * (1 - freq.discount));

  const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
    const addOn = addOnServices.find(a => a.id === addOnId);
    return total + (addOn?.price || 0);
  }, 0);

  let total = basePrice + addOnTotal;
  if (total < 150) total = 150;
  return Math.round(total / 10) * 10;
}
