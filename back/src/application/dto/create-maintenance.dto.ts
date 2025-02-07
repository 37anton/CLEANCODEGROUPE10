// src/application/dto/create-maintenance.dto.ts
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
    userId: string; // ID de l'utilisateur connecté (pour la gestion du stock)
  }
  