// src/application/services/notification.service.ts
import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { Notification } from "../../domain/entities/notification.entity";
import { User } from "../../domain/entities/user.entity";
import { NotificationRepository } from "src/infrastructure/repositories/sql/sql-notification.repository";
NotificationRepository

@Injectable()
export class NotificationService {
  constructor(
    @Inject('CustomNotificationRepository')
    private readonly notificationRepository: NotificationRepository, // Injection via le token
  ) {}

  async sendMaintenanceNotification(users: User[], message: string): Promise<void> {
    for (const user of users) {
      if (!user.id) continue;
      // On utilise la méthode customisée pour créer une notification
      await this.notificationRepository.createNotification(user.id, message);
      console.log(`📧 Notification enregistrée pour ${user.email}: ${message}`);
    }
  }

  // Récupérer toutes les notifications d'un utilisateur
  async getNotificationsForUser(userId: string) {
    return this.notificationRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  // Marquer une notification comme lue
  async markNotificationAsRead(notificationId: string) {
    await this.notificationRepository.update(notificationId, { isRead: true });
    return { message: 'Notification marquée comme lue.' };
  }
}
