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
    private readonly userRepository: UserService, // ✅ Correction de l'import
    private readonly notificationService: NotificationService,
  ) {}

  // Récupère les utilisateurs de la compagnie ou du client de la moto
private async getUsersByCompanyOrClient(motorcycle: Motorcycle): Promise<User[]> {
  let users: User[] = [];

  // Vérifie d'abord si la moto est bien associée à une entreprise
  if (motorcycle.companyMotorcycles?.length > 0) {
    const companyId = motorcycle.companyMotorcycles[0]?.company?.id;
    if (companyId) {
      users = await this.userRepository.findAllByCompanyId(companyId);
    }
  }

  // Vérifie si la moto est associée à un client
  if (motorcycle.clientMotorcycles?.length > 0) {
    const clientId = motorcycle.clientMotorcycles[0]?.client?.id;
    if (clientId) {
      users = [...users, ...(await this.userRepository.findAllByClientId(clientId))];
    }
  }

  return users;
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

    // Vérifier que la date du dernier entretien est valide
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

    // 🚨 Si la maintenance est due, récupérer les utilisateurs associés et notifier
    if (motorcycle.mileage >= computedNextMileage || now >= computedNextDate) {
      const usersToNotify = await this.getUsersByCompanyOrClient(motorcycle);
      if (usersToNotify.length > 0) {
        const message = `⚠️ Maintenance due pour la moto ${motorcycle.vin} (${motorcycle.model}). Veuillez planifier un entretien dès que possible.`;
        
        // Envoi des notifications
        await this.notificationService.sendMaintenanceNotification(usersToNotify, message);
      }

      return {
        nextMaintenanceMileage: "ASAP",
        nextMaintenanceDate: "ASAP",
      };
    }

    // ✅ Si la maintenance n'est pas encore due, retourner les prochaines échéances
    return {
      nextMaintenanceMileage: computedNextMileage.toString(),
      nextMaintenanceDate: computedNextDate.toLocaleDateString(), // ✅ Utilisation d'un format lisible
    };
  }
}
