import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MaintenanceNotificationCronService } from './maintenance-notification.cron';
import { MotorcycleModule } from '../../infrastructure/modules/motorcycle.module';

@Module({

  imports: [

    MotorcycleModule, 
  ],
  providers: [MaintenanceNotificationCronService],
  exports: [MaintenanceNotificationCronService],
})
export class CronModule {}
