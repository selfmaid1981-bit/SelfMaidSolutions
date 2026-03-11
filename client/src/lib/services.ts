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
  { value: 'airbnb', label: 'Short Term Rental Cleaning', baseRate: 0.114, minCharge: 95 },
  { value: 'commercial', label: 'Commercial/Office Cleaning', baseRate: 0.163, minCharge: 180 },
  { value: 'dorm', label: 'Student Dorm/Apartment Turnover', perRoom: 45, minCharge: 45 },
];

export const propertySizeOptions = [
  { value: 'small', label: 'Under 1,000 sq ft', multiplier: 1 },
  { value: 'medium', label: '1,000 – 2,000 sq ft', multiplier: 1.5 },
  { value: 'large', label: '2,000 – 3,000 sq ft', multiplier: 2 },
  { value: 'xlarge', label: '3,000+ sq ft', multiplier: 2.5 },
];

export const frequencyOptions = [
  { value: 'onetime', label: 'One-Time Service', discount: 0 },
  { value: 'weekly', label: 'Weekly (15% off)', discount: 0.15 },
  { value: 'biweekly', label: 'Bi-Weekly (10% off)', discount: 0.10 },
  { value: 'monthly', label: 'Monthly (5% off)', discount: 0.05 },
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

export function calculateQuotePrice(config: {
  serviceType: string;
  propertySize: string;
  customSqFt: string;
  frequency: string;
  selectedAddOns: string[];
  numberOfRooms?: string;
}): number {
  const { serviceType, propertySize, customSqFt, frequency, selectedAddOns, numberOfRooms } = config;
  if (!serviceType) return 0;

  const service = quoteServiceTypes.find(s => s.value === serviceType);
  const freq = frequencyOptions.find(f => f.value === frequency);
  if (!service || !freq) return 0;

  let basePrice = 0;

  if (serviceType === 'dorm') {
    const rooms = Math.max(0, parseInt(numberOfRooms || '') || 0);
    if (rooms > 0) {
      basePrice = rooms * ((service as any).perRoom || 45);
    } else {
      return 0;
    }
  } else if (customSqFt && parseInt(customSqFt) > 0) {
    const sqFt = parseInt(customSqFt);
    basePrice = Math.max(service.minCharge, sqFt * (service.baseRate || 0));
  } else if (propertySize) {
    const sizeOption = propertySizeOptions.find(s => s.value === propertySize);
    if (!sizeOption) return 0;
    basePrice = service.minCharge * sizeOption.multiplier;
  } else {
    return 0;
  }

  basePrice = basePrice * (1 - freq.discount);

  const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
    const addOn = addOnServices.find(a => a.id === addOnId);
    return total + (addOn?.price || 0);
  }, 0);

  return Math.round(basePrice + addOnTotal);
}
