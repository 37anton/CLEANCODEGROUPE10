// src/application/cron/cron.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MaintenanceNotificationCronService } from './maintenance-notification.cron';
import { MotorcycleModule } from '../../infrastructure/modules/motorcycle.module';

@Module({
  // Ne PAS appeler ScheduleModule.forRoot() ici car il est déjà importé dans AppModule
  imports: [
    // ScheduleModule.forRoot(),  <-- Supprimez cette ligne
    MotorcycleModule, // Permet d'accéder aux providers exportés (CustomMotorcycleRepository, GetMaintenancePlanUseCase, etc.)
  ],
  providers: [MaintenanceNotificationCronService],
  exports: [MaintenanceNotificationCronService],
})
export class CronModule {}
