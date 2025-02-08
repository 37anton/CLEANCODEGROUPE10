export interface ReplacedPartDto {
    partId: string;
    quantity: number;
  }
  
  export interface CreateMaintenanceDto {
    vehicleId: string;
    scheduledDate?: string;
    status?: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
    scheduledMileage?: number;
    replacedParts: ReplacedPartDto[];
    cost?: number;
    technicianRecommendations?: string;
    userId: string; 
  }
  