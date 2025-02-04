import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PartStock } from "../../domain/entities/part-stock.entity";
import { CreatePartStockDto } from "../../application/dto/create-part-stock.dto";
import { User } from "../../domain/entities/user.entity";
import { Part } from "../../domain/entities/part.entity";
import { Notification } from "../../domain/entities/notification.entity";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class PartStockService {
  constructor(
    @InjectRepository(PartStock)
    private readonly partStockRepository: Repository<PartStock>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>
  ) {}

  async updateStock(userId: string, createPartStockDto: CreatePartStockDto): Promise<PartStock> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["company", "concession", "client"],
    });
  
    if (!user) {
      throw new UnauthorizedException("Utilisateur non trouvé");
    }
  
    const part = await this.partRepository.findOne({ where: { id: createPartStockDto.partId } });
    if (!part) {
      throw new UnauthorizedException("Pièce non trouvée");
    }
  
    // Définir la condition en fonction de la relation de l'utilisateur
    let condition: Partial<PartStock> = { part: part };
    if (user.company) {
      condition.company = user.company;
    } else if (user.concession) {
      condition.concession = user.concession;
    } else if (user.client) {
      condition.client = user.client;
    }
  
    // Recherche uniquement le stock correspondant à la relation de l'utilisateur
    let stock = await this.partStockRepository.findOne({ where: condition });
  
    if (!stock) {
      // Si aucun stock n'existe, on le crée avec la relation associée à l'utilisateur
      stock = this.partStockRepository.create({
        part,
        quantity: createPartStockDto.quantity,
        alertThreshold: createPartStockDto.alertThreshold,
        company: user.company || null,
        concession: user.concession || null,
        client: user.client || null,
      });
    } else {
      // Sinon, on met à jour la quantité et le seuil d'alerte
      stock.quantity = createPartStockDto.quantity;
      stock.alertThreshold = createPartStockDto.alertThreshold;
    }
  
    return await this.partStockRepository.save(stock);
  }
  
  async findAll(user: User): Promise<PartStock[]> {
    const fullUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ["company", "concession", "client"],
    });
  
    if (!fullUser) {
      throw new UnauthorizedException("Utilisateur non trouvé");
    }
  
    console.log("Utilisateur complet dans findAll :", fullUser);
  
    const query = this.partStockRepository.createQueryBuilder("partStock")
      .leftJoinAndSelect("partStock.part", "part");
  
    if (fullUser.company) {
      query.where("partStock.companyId = :companyId", { companyId: fullUser.company.id });
    } else if (fullUser.concession) {
      query.where("partStock.concessionId = :concessionId", { concessionId: fullUser.concession.id });
    } else if (fullUser.client) {
      query.where("partStock.clientId = :clientId", { clientId: fullUser.client.id });
    } else {
      console.log("Aucune entreprise, concession ou client associé à cet utilisateur.");
      return []; // Aucune relation → retourne un tableau vide
    }
  
    console.log("Requête SQL générée :", query.getQueryAndParameters());
  
    const stocks = await query.getMany();
  
    console.log("Stocks récupérés pour l'utilisateur", user.id, ":", stocks);
    return stocks;
  }
  
  // Cron job qui s'exécute tous les jours à 4h du matin
  @Cron('0 4 * * *')
  async checkStocksAndNotify() {
    console.log("Déclenchement du cron pour vérifier les stocks");
    
    // Récupérer tous les part stocks avec leurs relations (part, company, concession, client)
    const stocks = await this.partStockRepository.find({
      relations: ["part", "company", "concession", "client"]
    });
  
    for (const stock of stocks) {
      if (stock.quantity < stock.alertThreshold) {
        // On détermine les utilisateurs concernés en fonction de la relation présente
        let users: User[] = [];
        if (stock.company) {
          users = await this.userRepository.find({ where: { company: { id: stock.company.id } } });
        } else if (stock.concession) {
          users = await this.userRepository.find({ where: { concession: { id: stock.concession.id } } });
        } else if (stock.client) {
          users = await this.userRepository.find({ where: { client: { id: stock.client.id } } });
        }
  
        // Création du message de notification
        const message = `Attention : le stock de ${stock.part.name} est insuffisant (Quantité: ${stock.quantity}, Seuil: ${stock.alertThreshold}).`;
  
        // Création d'une notification pour chaque utilisateur concerné
        for (const user of users) {
          const notification = this.notificationRepository.create({
            message,
            isRead: false,
            user: user
          });
          await this.notificationRepository.save(notification);
          console.log(`Notification créée pour ${user.email} pour la pièce ${stock.part.name}.`);
        }
      }
    }
  }
}
