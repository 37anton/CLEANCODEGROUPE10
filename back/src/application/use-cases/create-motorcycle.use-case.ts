// src/application/use-cases/create-motorcycle.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { defaultIntervalsConfig } from '../../domain/config/maintenance-interval.config'; // un fichier où vous stockez la config
import { Interval } from '../../domain/entities/interval.entity';
import * as crypto from 'crypto';

@Injectable()
export class CreateMotorcycleUseCase {
  constructor(
    @Inject('CustomMotorcycleRepository')
    private readonly motorcycleRepository: {
      create(motorcycle: Motorcycle): Promise<Motorcycle>;
    },
    @Inject('CustomCompanyMotorcycleRepository')
    private readonly companyMotorcycleRepository: {
      create(cm: any): Promise<any>;
    },
    @Inject('CustomClientMotorcycleRepository')
    private readonly clientMotorcycleRepository: {
      create(cm: any): Promise<any>;
    },
    @Inject('CustomIntervalRepository') // ADDED
    private readonly intervalRepository: {
      create(interval: Interval): Promise<Interval>;
    },
  ) {}

  async execute(motorcycleData: Omit<Motorcycle, 'id'>, user: any): Promise<Motorcycle> {
    const motorcycle = new Motorcycle();
    motorcycle.id = crypto.randomUUID();
    motorcycle.vin = motorcycleData.vin;
    motorcycle.model = motorcycleData.model;
    motorcycle.manufactureDate = new Date(motorcycleData.manufactureDate);
    motorcycle.lastMaintenanceDate = new Date(motorcycleData.lastMaintenanceDate);
    motorcycle.mileage = motorcycleData.mileage;
    motorcycle.lastMaintenanceMileage = motorcycleData.lastMaintenanceMileage;

    const createdMotorcycle = await this.motorcycleRepository.create(motorcycle);

    // Affectation (company / client)
    if (user.companyId) {
      await this.companyMotorcycleRepository.create({
        id: crypto.randomUUID(),
        company: { id: user.companyId },
        motorcycle: createdMotorcycle,
      });
    } else if (user.clientId) {
      await this.clientMotorcycleRepository.create({
        id: crypto.randomUUID(),
        client: { id: user.clientId },
        motorcycle: createdMotorcycle,
      });
    }

    // ADDED: Création des intervalles en fonction du modèle
    const intervalsForModel = defaultIntervalsConfig[motorcycle.model];
    if (intervalsForModel) {
      for (const cfg of intervalsForModel) {
        const intervalEntity = new Interval();
        intervalEntity.id = crypto.randomUUID();
        intervalEntity.km = cfg.km;
        intervalEntity.timeInYears = cfg.timeInYears;
        intervalEntity.motorcycle = createdMotorcycle;
        await this.intervalRepository.create(intervalEntity);
      }
    }

    return createdMotorcycle;
  }
}
