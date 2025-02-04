// src/domain/config/maintenance-interval.config.ts
// ADDED: On stocke ici des tableaux d'intervalles pour chaque modèle
export interface MaintenanceInterval {
  km: number;
  timeInYears: number;
}

export const defaultIntervalsConfig: Record<string, MaintenanceInterval[]> = {
  'Street Triple': [
    { km: 10000, timeInYears: 1 },
    { km: 20000, timeInYears: 2 },
    { km: 30000, timeInYears: 3 },
  ],
  'Tiger Sport 660': [
    { km: 16000, timeInYears: 1 },
    { km: 32000, timeInYears: 2 },
  ],
};
