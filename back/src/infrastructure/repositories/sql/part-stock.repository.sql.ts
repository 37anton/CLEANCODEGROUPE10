import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PartStock } from '../../../domain/entities/part-stock.entity';
import { Injectable } from '@nestjs/common';
import { PartStockRepository } from '../part-stock.repository';
import { User } from '../../../domain/entities/user.entity';
import { Part } from '../../../domain/entities/part.entity';

@Injectable()
export class PartStockSqlRepository implements PartStockRepository {
  constructor(
    @InjectRepository(PartStock)
    private readonly partStockRepository: Repository<PartStock>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>,
  ) {}

  async updateStock(userId: string, partId: string, quantity: number, alertThreshold: number): Promise<PartStock> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ["company", "concession", "client"] });
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    const part = await this.partRepository.findOne({ where: { id: partId } });
    if (!part) {
      throw new Error("Pièce non trouvée");
    }

    let condition: Partial<PartStock> = { part: part };
    if (user.company) {
      condition.company = user.company;
    } else if (user.concession) {
      condition.concession = user.concession;
    } else if (user.client) {
      condition.client = user.client;
    }

    let stock = await this.partStockRepository.findOne({ where: condition });

    if (!stock) {
      stock = this.partStockRepository.create({
        part,
        quantity,
        alertThreshold,
        company: user.company || null,
        concession: user.concession || null,
        client: user.client || null,
      });
    } else {
      stock.quantity = quantity;
      stock.alertThreshold = alertThreshold;
    }

    return await this.partStockRepository.save(stock);
  }

  async findAll(userId: string): Promise<PartStock[]> {
    // Vérifier que `userId` est bien une chaîne UUID
    if (typeof userId !== 'string') {
      throw new Error("Invalid userId: Expected a string UUID.");
    }
  
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["company", "concession", "client"],
    });
  
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }
  
    const query = this.partStockRepository.createQueryBuilder("partStock")
      .leftJoinAndSelect("partStock.part", "part");
  
    if (user.company) {
      query.where("partStock.companyId = :companyId", { companyId: user.company.id });
    } else if (user.concession) {
      query.where("partStock.concessionId = :concessionId", { concessionId: user.concession.id });
    } else if (user.client) {
      query.where("partStock.clientId = :clientId", { clientId: user.client.id });
    } else {
      return [];
    }
  
    return await query.getMany();
  }
  
}