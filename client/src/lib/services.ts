export const SERVICES = {
  residential: {
    id: 'residential',
    name: 'Residential Cleaning',
    basePrice: 80,
    description: 'Professional home cleaning services',
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

// Service options array for forms and components
export const serviceOptions = Object.values(SERVICES).map(service => ({
  value: service.id,
  label: service.name,
  price: service.basePrice,
  description: service.description,
}));

// Time slots for booking
export const timeSlots = [
  '8:00 AM',
  '10:00 AM', 
  '12:00 PM',
  '2:00 PM',
  '4:00 PM',
];

// Utility functions for consistent date handling
export const getTomorrowDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Format price for display
export const formatServicePrice = (price: number): string => {
  return `Starting at $${price}`;
};

// Get service option by value
export const getServiceOption = (value: string) => {
  return serviceOptions.find(service => service.value === value);
};
