// src/domain/config/maintenance-interval.config.ts
export interface MaintenanceInterval {
    km: number;
    timeInYears: number;
  }
  
  export const maintenanceIntervals: Record<string, MaintenanceInterval> = {
    'Street Triple': { km: 10000, timeInYears: 1 },
    'Tiger Sport 660': { km: 16000, timeInYears: 1 },
    // Add more models if needed
  };
  