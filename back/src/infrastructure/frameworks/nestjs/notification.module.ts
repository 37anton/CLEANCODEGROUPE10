import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationService } from "../../../application/services/notification.service";
import { NotificationController } from "./notification.controller";
import { Notification } from "../../../domain/entities/notification.entity";
import { User } from "../../../domain/entities/user.entity";
import { NotificationRepository } from "../../../infrastructure/repositories/sql/sql-notification.repository";
import { InMemoryNotificationRepository } from "../../../infrastructure/repositories/in-memory/in-memory-notification.repository";
import { UserModule } from "../nestjs/user.module"; // ✅ Importer UserModule

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, User]), // ✅ Vérifier que User est bien géré par TypeORM
    UserModule, // ✅ Permet d’accéder à UserService sans erreur d’injection
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    {
      provide: 'CustomNotificationRepository',
      useClass: isInMemory ? InMemoryNotificationRepository : NotificationRepository,
    },
  ],
  exports: [
    NotificationService,
    'CustomNotificationRepository',
    TypeOrmModule, // ✅ Ajout pour éviter des erreurs d’injection ailleurs
  ],
})
export class NotificationModule {}
