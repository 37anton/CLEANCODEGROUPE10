// src/application/use-cases/get-maintenance-plan.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { MotorcycleRepository } from '../../infrastructure/repositories/motorcycle.repository';
import { MaintenancePlan } from '../../domain/models/maintenance-plan.model';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { NotificationService } from '../services/notification.service';
import { User } from '../../domain/entities/user.entity';
import { UserService } from '../services/user.service';

@Injectable()
export class GetMaintenancePlanUseCase {
  constructor(
    @Inject('CustomMotorcycleRepository')
    private readonly motorcycleRepository: MotorcycleRepository,
    @Inject('CustomUserRepository')
    private readonly userRepository: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  // On privilégie l'association "company" ; sinon, on renvoie celle du client
  private async getUsersByCompanyOrClient(motorcycle: Motorcycle): Promise<User[]> {
    if (motorcycle.companyMotorcycles?.length > 0) {
      const companyId = motorcycle.companyMotorcycles[0]?.company?.id;
      if (companyId) {
        return await this.userRepository.findAllByCompanyId(companyId);
      }
    } else if (motorcycle.clientMotorcycles?.length > 0) {
      const clientId = motorcycle.clientMotorcycles[0]?.client?.id;
      if (clientId) {
        return await this.userRepository.findAllByClientId(clientId);
      }
    }
    return [];
  }

  async execute(motorcycleId: string): Promise<MaintenancePlan> {
    // Récupération de la moto avec ses intervalles chargés
    const motorcycle: Motorcycle = await this.motorcycleRepository.findById(motorcycleId);
    
    if (!motorcycle) {
      throw new Error(`❌ Moto avec l'ID ${motorcycleId} introuvable.`);
    }

    if (!motorcycle.intervals || motorcycle.intervals.length === 0) {
      throw new Error("❌ Aucun intervalle d'entretien défini pour cette moto.");
    }

    const interval = motorcycle.intervals[0];

    // Vérifie que la date du dernier entretien est valide
    const lastMaintenance = new Date(motorcycle.lastMaintenanceDate);
    if (isNaN(lastMaintenance.getTime())) {
      return {
        nextMaintenanceMileage: "ASAP",
        nextMaintenanceDate: "ASAP",
      };
    }

    // Calcul des seuils d'entretien
    const computedNextMileage = motorcycle.lastMaintenanceMileage + interval.km;
    const computedNextDate = new Date(lastMaintenance);
    computedNextDate.setFullYear(lastMaintenance.getFullYear() + interval.timeInYears);

    const now = new Date();

    // Si la maintenance est due, notifier les utilisateurs
    if (motorcycle.mileage >= computedNextMileage || now >= computedNextDate) {
      const usersToNotify = await this.getUsersByCompanyOrClient(motorcycle);
      if (usersToNotify.length > 0) {
        const message = `⚠️ Maintenance due pour la moto ${motorcycle.vin} (${motorcycle.model}). Veuillez planifier un entretien dès que possible.`;
        await this.notificationService.sendMaintenanceNotification(usersToNotify, message);
      }
      return {
        nextMaintenanceMileage: "ASAP",
        nextMaintenanceDate: "ASAP",
      };
    }

    return {
      nextMaintenanceMileage: computedNextMileage.toString(),
      nextMaintenanceDate: computedNextDate.toLocaleDateString(),
    };
  }
}
