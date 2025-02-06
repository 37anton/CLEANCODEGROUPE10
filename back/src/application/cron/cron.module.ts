// src/application/cron/cron.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MaintenanceNotificationCronService } from './maintenance-notification.cron';
import { MotorcycleModule } from '../../infrastructure/modules/motorcycle.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MotorcycleModule, // Importé, il exporte désormais GetMaintenancePlanUseCase et CustomMotorcycleRepository
  ],
  providers: [MaintenanceNotificationCronService],
  exports: [MaintenanceNotificationCronService],
})
export class CronModule {}
