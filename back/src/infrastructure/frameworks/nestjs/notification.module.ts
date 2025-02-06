import { Module } from "@nestjs/common";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { NotificationService } from "../../../application/services/notification.service";
import { NotificationController } from "./notification.controller";
import { Notification } from "../../../domain/entities/notification.entity";
import { User } from "../../../domain/entities/user.entity";
import { NotificationRepository } from "../../../infrastructure/repositories/sql/sql-notification.repository";
import { InMemoryNotificationRepository } from "../../../infrastructure/repositories/in-memory/in-memory-notification.repository";
import { UserModule } from "../nestjs/user.module";

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, User]),
    UserModule,
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    {
      provide: 'CustomNotificationRepository',
      useFactory: (notificationRepo: any) => {
        return isInMemory
          ? new InMemoryNotificationRepository()
          : new NotificationRepository(notificationRepo);
      },
      inject: [getRepositoryToken(Notification)],
    },
  ],
  exports: [
    NotificationService,
    'CustomNotificationRepository',
    TypeOrmModule,
  ],
})
export class NotificationModule {}
