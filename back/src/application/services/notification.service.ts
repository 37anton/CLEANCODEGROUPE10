import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "../../domain/entities/notification.entity";
import { User } from "../../domain/entities/user.entity";

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification) private notificationRepo: Repository<Notification>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  @Cron("35 16 * * *") // Exécution tous les jours à 2h du matin
  async generateNotifications() {
    console.log("Exécution du cron pour générer les notifications");

    const users = await this.userRepo.find();

    for (const user of users) {
      await this.notificationRepo.save({
        user,
        message: "Entretien à venir pour votre moto !",
      });
    }
  }

  async getNotificationsForUser(userId: number) {
    return await this.notificationRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: "DESC" },
    });
  }
}