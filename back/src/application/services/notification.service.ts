import { Injectable, Inject } from "@nestjs/common";
import { Notification } from "../../domain/entities/notification.entity";
import { User } from "../../domain/entities/user.entity";
import { NotificationRepository, NOTIFICATION_REPOSITORY } from "src/infrastructure/repositories/notification.repository";

@Injectable()
export class NotificationService {
  constructor(

    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: NotificationRepository, 
  ) {}

  async sendMaintenanceNotification(users: User[], message: string): Promise<void> {
    for (const user of users) {
      if (!user.id) continue;
      await this.notificationRepository.createNotification(user.id, message);
      console.log(`Notification enregistrée pour ${user.email}: ${message}`);
    }
  }

  async getNotificationsForUser(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async markNotificationAsRead(notificationId: string): Promise<{ message: string }> {
    await this.notificationRepository.update(notificationId, { isRead: true });
    return { message: 'Notification marquée comme lue.' };
  }
  
}
