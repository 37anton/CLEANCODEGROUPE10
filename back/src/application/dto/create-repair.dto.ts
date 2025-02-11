export interface RepairPartDto {
    partId: string;
    quantity: number;
  }
  
  export interface CreateRepairDto {
    incidentId: string;
    repairDate?: string;
    description?: string;
    repairParts: RepairPartDto[];
    userId: string;
  }
  