import { Injectable } from '@nestjs/common';
import { Notification } from '../../../domain/entities/notification.entity';
import { NotificationRepository } from '../notification.repository';

@Injectable()
export class InMemoryNotificationRepository implements NotificationRepository {
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

  async find(options: any): Promise<Notification[]> {
    return this.notifications.filter(n => n.user.id === options.where.user.id);
  }

  async update(id: number | string, partialEntity: Partial<Notification>): Promise<void> {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      Object.assign(notification, partialEntity);
    }
  }
}
