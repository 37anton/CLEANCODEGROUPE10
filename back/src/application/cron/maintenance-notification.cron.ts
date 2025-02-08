import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MotorcycleRepository } from '../../infrastructure/repositories/motorcycle.repository';
import { GetMaintenancePlanUseCase } from '../use-cases/get-maintenance-plan.use-case';

@Injectable()
export class MaintenanceNotificationCronService {
  private readonly logger = new Logger(MaintenanceNotificationCronService.name);

  constructor(
    @Inject('CustomMotorcycleRepository')
    private readonly motorcycleRepository: MotorcycleRepository,
    private readonly getMaintenancePlanUseCase: GetMaintenancePlanUseCase,
  ) {}

  @Cron('*/1 * * * *')
  async handleCron() {
    this.logger.log('Cron job: vérification des maintenances dues...');
    try {
      const motorcycles = await this.motorcycleRepository.findAll();
      for (const motorcycle of motorcycles) {
        try {
          await this.getMaintenancePlanUseCase.execute(motorcycle.id);
        } catch (error: any) {
          this.logger.error(`Erreur pour la moto ${motorcycle.id}: ${error.message}`);
        }
      }
    } catch (error: any) {
      this.logger.error(`Erreur dans le cron: ${error.message}`);
    }
  }
}
