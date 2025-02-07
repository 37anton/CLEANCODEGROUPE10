import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from '../../../domain/entities/notification.entity';

@Injectable()
export class NotificationRepository {
  constructor(
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  async createNotification(userId: string, message: string): Promise<Notification> {
    const notification = this.notificationRepo.create({
      user: { id: userId },
      message,
      isRead: false,
      createdAt: new Date(),
    });
    return this.notificationRepo.save(notification);
  }

  async find(options: any): Promise<Notification[]> {
    return this.notificationRepo.find(options);
  }

  async update(id: number | string, partialEntity: Partial<Notification>): Promise<void> {
    await this.notificationRepo.update(id, partialEntity);
  }
}
