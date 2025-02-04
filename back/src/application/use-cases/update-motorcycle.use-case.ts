// src/application/use-cases/update-motorcycle.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { Interval } from '../../domain/entities/interval.entity';
import * as crypto from 'crypto';

@Injectable()
export class UpdateMotorcycleUseCase {
  constructor(
    @Inject('CustomMotorcycleRepository')
    private readonly motorcycleRepo: {
      findById(id: string): Promise<Motorcycle>;
      update(motorcycle: Motorcycle): Promise<Motorcycle>;
    },
    @Inject('CustomCompanyMotorcycleRepository')
    private readonly companyMotorcycleRepo: {
      findOneByMotorcycleAndCompany(motorcycleId: string, companyId: string): Promise<any>;
    },
    @Inject('CustomClientMotorcycleRepository')
    private readonly clientMotorcycleRepo: {
      findOneByMotorcycleAndClient(motorcycleId: string, clientId: string): Promise<any>;
    },
    @Inject('CustomIntervalRepository')
    private readonly intervalRepo: {
      findByMotorcycleId(motorcycleId: string): Promise<Interval[]>;
    },
    @Inject('CustomUserRepository') // ADDED
    private readonly userRepo: {
      findAllByCompanyId(companyId: string): Promise<any[]>;
      findAllByClientId(clientId: string): Promise<any[]>;
      // etc
    },
    @Inject('CustomNotificationService') // ADDED
    private readonly notificationService: {
      notifyUsers(users: any[], message: string): Promise<void>;
    },
  ) {}

  async execute(user: any, motorcycleId: string, updateData: Partial<Motorcycle>): Promise<Motorcycle> {
    await this.ensureOwnership(user, motorcycleId);

    const motorcycle = await this.motorcycleRepo.findById(motorcycleId);

    // Màj des champs
    if (updateData.mileage !== undefined) {
      motorcycle.mileage = updateData.mileage;
    }
    if (updateData.lastMaintenanceDate !== undefined) {
      motorcycle.lastMaintenanceDate = new Date(updateData.lastMaintenanceDate);
    }
    if (updateData.lastMaintenanceMileage !== undefined) {
      motorcycle.lastMaintenanceMileage = updateData.lastMaintenanceMileage;
    }

    const updatedMotorcycle = await this.motorcycleRepo.update(motorcycle);

    // Vérification dépassement d’intervalle
    const intervals = await this.intervalRepo.findByMotorcycleId(motorcycleId);
    const messages: string[] = [];
    const now = new Date();

    for (const int of intervals) {
      // km check
      if (updatedMotorcycle.mileage >= int.km) {
        messages.push(`La moto VIN:${updatedMotorcycle.vin} a dépassé l’intervalle de ${int.km} km !`);
      }
      // time check
      const nextMaintenanceDate = new Date(updatedMotorcycle.lastMaintenanceDate);
      nextMaintenanceDate.setFullYear(nextMaintenanceDate.getFullYear() + int.timeInYears);
      if (now >= nextMaintenanceDate) {
        messages.push(`La moto VIN:${updatedMotorcycle.vin} a dépassé l’intervalle de ${int.timeInYears} an(s) !`);
      }
    }

    // Si on a des messages, on envoie aux utilisateurs
    if (messages.length > 0) {
      const relevantUsers = await this.findUsersForMotorcycle(user);
      const finalMessage = messages.join('\n');
      await this.notificationService.notifyUsers(relevantUsers, finalMessage);
    }

    return updatedMotorcycle;
  }

  private async ensureOwnership(user: any, motorcycleId: string): Promise<void> {
    if (user.companyId) {
      const cm = await this.companyMotorcycleRepo.findOneByMotorcycleAndCompany(motorcycleId, user.companyId);
      if (!cm) throw new Error('Cette moto ne vous appartient pas (company).');
    } else if (user.clientId) {
      const cm = await this.clientMotorcycleRepo.findOneByMotorcycleAndClient(motorcycleId, user.clientId);
      if (!cm) throw new Error('Cette moto ne vous appartient pas (client).');
    } else {
      // Idem pour concession
      throw new Error('Aucun companyId, clientId ou concessionId trouvé.');
    }
  }

  private async findUsersForMotorcycle(user: any): Promise<any[]> {
    // s’il a un companyId => on récupère tous les users de la même company
    if (user.companyId) {
      return this.userRepo.findAllByCompanyId(user.companyId);
    } else if (user.clientId) {
      return this.userRepo.findAllByClientId(user.clientId);
    }
    // etc.
    return [];
  }
}
