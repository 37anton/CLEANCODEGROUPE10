import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationService } from "../../../application/services/notification.service";
import { NotificationController } from "./notification.controller";
import { Notification } from "../../../domain/entities/notification.entity";
import { User } from "../../../domain/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Notification, User])],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}