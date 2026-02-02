export interface HealthCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  description?: string;
  specialties?: string[];
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  description?: string;
  centerId?: string;
  centerName?: string;
}
