import { Injectable } from '@nestjs/common';
import { Notification } from '../../../domain/entities/notification.entity';

@Injectable()
export class InMemoryNotificationRepository {
  private notifications: Notification[] = [];
  private idCounter = 1; // 🔹 Utilisation d'un compteur pour les IDs

  async createNotification(userId: string, message: string): Promise<Notification> {
    const notification: Notification = {
      id: this.idCounter++, // 🔹 Génère un ID numérique auto-incrémenté
      user: { id: userId } as any, // 🔹 Assurer la compatibilité avec User
      message,
      isRead: false,
      createdAt: new Date(),
    };

    this.notifications.push(notification);
    return notification;
  }

  async getNotifications(): Promise<Notification[]> {
    return this.notifications;
  }
}
