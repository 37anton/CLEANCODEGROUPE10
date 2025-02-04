// src/application/services/maintenance-cron.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { Interval } from '../../domain/entities/interval.entity';

@Injectable()
export class MaintenanceCronService {
  constructor(
    // ADDED
    // on injecte le repos moto, interval, user, notifications
    @Inject('CustomMotorcycleRepository')
    private readonly motorcycleRepo: {
      // un findAll pour charger toutes les motos
      findAll(): Promise<Motorcycle[]>;
    },
    @Inject('CustomIntervalRepository')
    private readonly intervalRepo: {
      findByMotorcycleId(motoId: string): Promise<Interval[]>;
    },
    @Inject('CustomUserRepository')
    private readonly userRepo: {
      findAllByCompanyId(companyId: string): Promise<any[]>;
      findAllByClientId(clientId: string): Promise<any[]>;
    },
    @Inject('CustomCompanyMotorcycleRepository')
    private readonly companyMotorcycleRepo: {
      findAllByMotorcycleId(motoId: string): Promise<any[]>;
    },
    @Inject('CustomClientMotorcycleRepository')
    private readonly clientMotorcycleRepo: {
      findAllByMotorcycleId(motoId: string): Promise<any[]>;
    },
    @Inject('CustomNotificationService')
    private readonly notificationService: {
      notifyUsers(users: any[], message: string): Promise<void>;
    },
  ) {}

  // ADDED: On schedule par exemple toutes les heures
  @Cron(CronExpression.EVERY_HOUR)
  async checkUpcomingMaintenances() {
    const allMotos = await this.motorcycleRepo.findAll(); 
    const now = new Date();

    for (const moto of allMotos) {
      const intervals = await this.intervalRepo.findByMotorcycleId(moto.id);
      for (const int of intervals) {
        const kmRemaining = int.km - moto.mileage;
        // ex. si <= 1000 km => envoi notif
        if (kmRemaining <= 1000 && kmRemaining > 0) {
          // On envoie "il reste 1000 km"
          const message = `La moto VIN:${moto.vin} est à ${kmRemaining} km d’un entretien (intervalle ${int.km}km)`;
          const users = await this.findUsersForMoto(moto.id);
          await this.notificationService.notifyUsers(users, message);
        }

        // Check par la date
        const nextMaintenanceDate = new Date(moto.lastMaintenanceDate);
        nextMaintenanceDate.setFullYear(nextMaintenanceDate.getFullYear() + int.timeInYears);
        const timeDiff = nextMaintenanceDate.getTime() - now.getTime();
        const oneMonth = 30 * 24 * 60 * 60 * 1000;
        if (timeDiff <= oneMonth && timeDiff > 0) {
          // on est à moins d’un mois de l’échéance
          const monthsLeft = (timeDiff / oneMonth).toFixed(1);
          const message = `La moto VIN:${moto.vin} est à ~${monthsLeft} mois d’une maintenance (intervalle ${int.timeInYears} an(s))`;
          const users = await this.findUsersForMoto(moto.id);
          await this.notificationService.notifyUsers(users, message);
        }
      }
    }
  }

  private async findUsersForMoto(motoId: string): Promise<any[]> {
    // on récupère si c'est une company ou client, etc.
    // Par ex. si la moto est dans companyMotorcycle => on charge la company => on trouve tous les users
    const companyMotos = await this.companyMotorcycleRepo.findAllByMotorcycleId(motoId);
    if (companyMotos.length) {
      const companyId = companyMotos[0].company.id;
      return this.userRepo.findAllByCompanyId(companyId);
    }
    const clientMotos = await this.clientMotorcycleRepo.findAllByMotorcycleId(motoId);
    if (clientMotos.length) {
      const clientId = clientMotos[0].client.id;
      return this.userRepo.findAllByClientId(clientId);
    }
    // etc. pour concession
    return [];
  }
}
