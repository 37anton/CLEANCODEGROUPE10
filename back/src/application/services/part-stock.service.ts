import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PartStock } from "../../domain/entities/part-stock.entity";
import { CreatePartStockDto } from "../../application/dto/create-part-stock.dto";
import { User } from "../../domain/entities/user.entity";
import { Part } from "../../domain/entities/part.entity";

@Injectable()
export class PartStockService {
  constructor(
    @InjectRepository(PartStock)
    private readonly partStockRepository: Repository<PartStock>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>
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
      // S'il n'existe pas, on le crée avec la relation associée à l'utilisateur
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
  
  
}