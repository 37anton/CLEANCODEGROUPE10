import { Module } from "@nestjs/common";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { NotificationService } from "../../application/services/notification.service";
import { NotificationController } from "../../application/controllers/notification.controller";
import { Notification } from "../../domain/entities/notification.entity";
import { User } from "../../domain/entities/user.entity";
import { NotificationRepository, NOTIFICATION_REPOSITORY } from "../repositories/notification.repository";
import { InMemoryNotificationRepository } from "../../infrastructure/repositories/in-memory/in-memory-notification.repository";
import { UserModule } from "./user.module";
import { SqlNotificationRepository } from "../repositories/sql/sql-notification.repository";

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    ...(!isInMemory ? [TypeOrmModule.forFeature([Notification, User])] : []),
    UserModule, 
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    {
      provide: NOTIFICATION_REPOSITORY,
      useClass: process.env.STORAGE_ADAPTER === 'in-memory' ? InMemoryNotificationRepository : SqlNotificationRepository,
    },
  ],
  exports: [
    NotificationService,
    NOTIFICATION_REPOSITORY,
    ...(isInMemory ? [] : [TypeOrmModule]),
  ],
})
export class NotificationModule {}
