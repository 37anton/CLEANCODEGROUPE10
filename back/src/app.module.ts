import { NotificationService } from "./application/services/notification.service";
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './infrastructure/modules/auth.module';
import { ScheduleModule } from "@nestjs/schedule";
import { Notification } from "./domain/entities/notification.entity";
import { User } from "./domain/entities/user.entity";
import { NotificationModule } from "./infrastructure/modules/notification.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartModule } from "./infrastructure/modules/part.module";
import { DriverModule } from "./infrastructure/modules/driver.module";
import { PartStockModule } from "./infrastructure/modules/part-stock.module";
import { Part } from './domain/entities/part.entity';
import { PartStock } from './domain/entities/part-stock.entity';
import { MotorcycleModule } from './infrastructure/modules/motorcycle.module';
import { IntervalDefinitionModule } from './infrastructure/modules/interval-definition.module';
import { CronModule } from './application/cron/cron.module';
import { MaintenanceModule } from './infrastructure/modules/maintenance.module';
import { IncidentModule } from './infrastructure/modules/incident.module';
import { RepairModule } from './infrastructure/modules/repair.module';
import { WarrantyModule } from './infrastructure/modules/warranty.module';
import { OrderModule } from "./infrastructure/modules/order.module";
import { SupplierModule } from "./infrastructure/modules/supplier.module";
import { PartSupplierModule } from "./infrastructure/modules/part-supplier.module";
import { CompanyModule } from "./infrastructure/modules/company.module";
import { ConcessionModule } from "./infrastructure/modules/concession.module";
import { ClientModule } from "./infrastructure/modules/client.module";
import { ThresholdNotificationsCron } from "./application/cron/threshold-notifications.cron";
import { UserModule } from "./infrastructure/modules/user.module";

const databaseConfig: any = process.env.STORAGE_ADAPTER === 'postgres'
  ? {
    type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
  }
  : undefined;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ...(databaseConfig ? [TypeOrmModule.forFeature([User, Notification])] : []),
    ...(databaseConfig ? [TypeOrmModule.forRoot(databaseConfig)] : []),
    UserModule,
    PartSupplierModule,
    NotificationModule,
    ScheduleModule.forRoot(), 
    CompanyModule,
    ConcessionModule,
    ClientModule,
    AuthModule,
    PartModule,
    PartStockModule,
    MotorcycleModule,
    IntervalDefinitionModule,
    CronModule,
    MaintenanceModule, 
    IncidentModule,
    RepairModule,
    WarrantyModule,
    SupplierModule,
    OrderModule,
    DriverModule,
    CompanyModule,   
    ConcessionModule,
    ClientModule,
    RepairModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ThresholdNotificationsCron
  ],
})
export class AppModule {}
