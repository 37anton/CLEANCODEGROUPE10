import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PartStockRepository } from "../../repositories/part-stock.repository";
import { PartStock } from "../../../domain/entities/part-stock.entity";
import { User } from "../../../domain/entities/user.entity";
import { CreatePartStockDto } from "../../../application/dto/create-part-stock.dto";

@Injectable()
export class SqlPartStockRepository implements PartStockRepository {
  constructor(
    @InjectRepository(PartStock)
    private readonly repository: Repository<PartStock>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async updateStock(userId: string, createPartStockDto: CreatePartStockDto): Promise<PartStock> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["company", "concession", "client"],
    });
  
    if (!user) {
      throw new UnauthorizedException("Utilisateur non trouvé");
    }
  
    // Charger l'entité complète de la pièce
    const part = await this.repository.manager.findOne(PartStock, {
      where: { part: { id: createPartStockDto.partId } },
      relations: ["part"]
    });
  
    if (!part) {
      throw new UnauthorizedException("Pièce non trouvée.");
    }
  
    const condition: Partial<PartStock> = { part: part.part }; // Utilisation de l'entité complète
    if (user.company) condition.company = user.company;
    if (user.concession) condition.concession = user.concession;
    if (user.client) condition.client = user.client;
  
    let stock = await this.repository.findOne({ where: condition });
  
    if (!stock) {
      stock = this.repository.create({
        part: part.part, // 🔍 On passe l'entité complète
        quantity: createPartStockDto.quantity,
        alertThreshold: createPartStockDto.alertThreshold,
        company: user.company || null,
        concession: user.concession || null,
        client: user.client || null,
      });
    } else {
      stock.quantity = createPartStockDto.quantity;
      stock.alertThreshold = createPartStockDto.alertThreshold;
    }
  
    return this.repository.save(stock);
  }
  

  async findAll(user: User): Promise<PartStock[]> {
    return this.repository.find({
      where: [
        { company: user.company },
        { concession: user.concession },
        { client: user.client }
      ],
      relations: ["part"]
    });
  }
}