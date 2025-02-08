import { Injectable, Inject } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PART_STOCK_REPOSITORY } from "../../infrastructure/repositories/part-stock.repository";
import { USER_REPOSITORY } from "../../infrastructure/repositories/user.repository";
import { NOTIFICATION_REPOSITORY } from "../../infrastructure/repositories/notification.repository";
import { PartStockRepository } from "../../infrastructure/repositories/part-stock.repository";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { NotificationRepository } from "../../infrastructure/repositories/notification.repository";

@Injectable()
export class ThresholdNotificationsCron {
  constructor(
    @Inject(PART_STOCK_REPOSITORY) private readonly partStockRepository: PartStockRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(NOTIFICATION_REPOSITORY) private readonly notificationRepository: NotificationRepository
  ) {}

  @Cron("*/30 * * * * *") // Exécution toutes les 30 secondes
  async checkStockThresholds() {
    console.log("Vérification des seuils d'alerte de stock...");

    const stocks = await this.partStockRepository.findAllWithoutUser();

    for (const stock of stocks) {
      if (stock.alertThreshold > 0 && stock.quantity < stock.alertThreshold) {
        const entityId = stock.company?.id || stock.concession?.id || stock.client?.id;
        if (!entityId) continue;

        console.log(`Stock bas pour ${stock.part.name} - Seuil: ${stock.alertThreshold}, Disponible: ${stock.quantity}`);

        // Récupérer tous les utilisateurs liés à cette entité
        const users = await this.userRepository.findByEntity(entityId);

        for (const user of users) {
          await this.notificationRepository.createNotification(
            user.id,
            `Stock bas: ${stock.part.name} - Seuil: ${stock.alertThreshold}, Disponible: ${stock.quantity}`
          );
        }
      }
    }
  }
}