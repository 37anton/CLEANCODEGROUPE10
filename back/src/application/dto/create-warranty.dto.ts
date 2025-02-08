export interface CreateWarrantyDto {
    motorcycleId: string; 
    startDate?: string;
    endDate?: string;
    warrantyParts?: any[]; 
  }
  