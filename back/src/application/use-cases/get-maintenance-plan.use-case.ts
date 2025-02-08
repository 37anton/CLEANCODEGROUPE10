import { Injectable, Inject } from '@nestjs/common';
import { MOTORCYCLE_REPOSITORY, MotorcycleRepository } from '../../infrastructure/repositories/motorcycle.repository';
import { MaintenancePlan } from '../../domain/models/maintenance-plan.model';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { NotificationService } from '../services/notification.service';
import { User } from '../../domain/entities/user.entity';
import { UserService } from '../services/user.service';

@Injectable()
export class GetMaintenancePlanUseCase {
  constructor(
    @Inject(MOTORCYCLE_REPOSITORY)
    private readonly motorcycleRepository: MotorcycleRepository,
    private readonly userRepository: UserService,
    private readonly notificationService: NotificationService,
  ) {}

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
    const motorcycle: Motorcycle = await this.motorcycleRepository.findById(motorcycleId);
    
    if (!motorcycle) {
      throw new Error(`❌ Moto avec l'ID ${motorcycleId} introuvable.`);
    }

    if (!motorcycle.intervals || motorcycle.intervals.length === 0) {
      throw new Error("❌ Aucun intervalle d'entretien défini pour cette moto.");
    }

    const interval = motorcycle.intervals[0];

    const lastMaintenance = new Date(motorcycle.lastMaintenanceDate);
    if (isNaN(lastMaintenance.getTime())) {
      return {
        nextMaintenanceMileage: "ASAP",
        nextMaintenanceDate: "ASAP",
      };
    }

    const computedNextMileage = motorcycle.lastMaintenanceMileage + interval.km;
    const computedNextDate = new Date(lastMaintenance);
    computedNextDate.setFullYear(lastMaintenance.getFullYear() + interval.timeInYears);

    const now = new Date();

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
