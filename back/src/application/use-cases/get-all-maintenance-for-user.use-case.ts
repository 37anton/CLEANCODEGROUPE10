// src/application/use-cases/get-all-maintenance-for-user.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Maintenance } from '../../domain/entities/maintenance.entity';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';

@Injectable()
export class GetAllMaintenanceForUserUseCase {
  constructor(
    @Inject('CustomCompanyMotorcycleRepository')
    private readonly companyMotorcycleRepo: {
      findAllByCompanyId(companyId: string): Promise<Motorcycle[]>;
    },
    @Inject('CustomClientMotorcycleRepository')
    private readonly clientMotorcycleRepo: {
      findAllByClientId(clientId: string): Promise<Motorcycle[]>;
    },
    @Inject('CustomMaintenanceRepository')
    private readonly maintenanceRepo: {
      findByVehicleId(vehicleId: string): Promise<Maintenance[]>;
    },
  ) {}

  async execute(user: any): Promise<Maintenance[]> {
    let motorcycles: Motorcycle[] = [];

    if (user.companyId) {
      motorcycles = await this.companyMotorcycleRepo.findAllByCompanyId(user.companyId);
    } else if (user.clientId) {
      motorcycles = await this.clientMotorcycleRepo.findAllByClientId(user.clientId);
    }
    // etc. pour concession
    const allMaintenances: Maintenance[] = [];

    for (const moto of motorcycles) {
      const mtns = await this.maintenanceRepo.findByVehicleId(moto.id);
      allMaintenances.push(...mtns);
    }

    return allMaintenances;
  }
}
