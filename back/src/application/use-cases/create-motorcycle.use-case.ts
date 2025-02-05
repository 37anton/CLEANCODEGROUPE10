import { Injectable, Inject } from '@nestjs/common';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
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
    console.log('Created motorcycle:', createdMotorcycle);

    // Récupération de l'identifiant company ou client depuis l'objet user
    const companyId = user.companyId || (user.company && user.company.id);
    const clientId = user.clientId || (user.client && user.client.id);

    if (companyId) {
      const companyData = {
        id: crypto.randomUUID(),
        company: { id: companyId },
        motorcycle: createdMotorcycle,
      };
      console.log('Creating CompanyMotorcycle record with data:', companyData);
      await this.companyMotorcycleRepository.create(companyData);
    } else if (clientId) {
      const clientData = {
        id: crypto.randomUUID(),
        client: { id: clientId },
        motorcycle: createdMotorcycle,
      };
      console.log('Creating ClientMotorcycle record with data:', clientData);
      await this.clientMotorcycleRepository.create(clientData);
    } else {
      console.warn('No company or client identifier found in user:', user);
    }
    return createdMotorcycle;
  }
}
