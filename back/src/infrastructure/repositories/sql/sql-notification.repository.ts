import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../../../domain/entities/notification.entity';

@Injectable()
export class NotificationRepository extends Repository<Notification> { // ✅ Hérite de Repository<Notification>
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {
    super(notificationRepo.target, notificationRepo.manager, notificationRepo.queryRunner); // ✅ Corrige l'héritage
  }

  async createNotification(userId: string, message: string): Promise<Notification> {
    const notification = this.notificationRepo.create({
      user: { id: userId }, // Associe la notification à un utilisateur
      message,
      isRead: false,
      createdAt: new Date(),
    });
    return this.notificationRepo.save(notification);
  }
}
