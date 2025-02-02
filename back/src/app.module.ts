import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ScheduleModule } from "@nestjs/schedule";
import { NotificationService } from "./modules/notification/notification.service";
import { Notification } from "./domain/entities/notification.entity";
import { User } from "./domain/entities/user.entity";

import { TypeOrmModule } from '@nestjs/typeorm';
import { EntretienModule } from './infrastructure/frameworks/nest.js/entretien.module';

@Module({
  imports: [
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
    EntretienModule,


    AuthModule, // AuthModule peut maintenant utiliser ConfigService

  ],
  providers: [NotificationService],
})
export class AppModule {}