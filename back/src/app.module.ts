// src/app.module.ts
import { Module } from '@nestjs/common';


import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ScheduleModule } from "@nestjs/schedule";
import { NotificationService } from "./application/services/notification.service";
import { Notification } from "./domain/entities/notification.entity";
import { User } from "./domain/entities/user.entity";
import { NotificationModule } from "./infrastructure/modules/notification.module";

import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceModule } from './infrastructure/modules/maintenance.module';
import { FaultModule } from './infrastructure/modules/fault.module';
import { PartModule } from "./infrastructure/modules/part.module";
import { DriverModule  } from "./infrastructure/modules/driver.module";
import { PartStockModule } from "./infrastructure/modules/part-stock.module";
import { Part } from './domain/entities/part.entity';
import { PartStock } from './domain/entities/part-stock.entity';
import { OrderModule } from "./infrastructure/modules/order.module";
import { SupplierModule } from "./infrastructure/modules/supplier.module";
import { PartSupplierModule } from "./infrastructure/modules/part-supplier.module";



@Module({
  imports: [
    PartSupplierModule,
    NotificationModule,
    ScheduleModule.forRoot(), // Active le Cron Job
    TypeOrmModule.forFeature([User, Notification]), // Ajoute l'entité Notification et User

    // Configuration globale du ConfigModule
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    MaintenanceModule,
    FaultModule,
    PartModule,
    PartStockModule,
    NotificationModule,
    OrderModule,
    DriverModule,
    SupplierModule
  ],
  controllers: [AppController],
  providers: [AppService, NotificationService],
})
export class AppModule {}