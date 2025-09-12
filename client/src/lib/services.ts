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
