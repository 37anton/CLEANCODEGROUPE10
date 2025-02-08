export const NOTIFICATION_REPOSITORY = 'NOTIFICATION_REPOSITORY';

import { Notification } from "../../domain/entities/notification.entity";

export interface NotificationRepository {
  createNotification(userId: string, message: string): Promise<Notification>;
  find(options: any): Promise<Notification[]>;
  update(id: number | string, partialEntity: Partial<Notification>): Promise<void>;
}