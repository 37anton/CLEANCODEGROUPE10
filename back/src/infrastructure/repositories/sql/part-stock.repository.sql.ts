import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PartStock } from '../../../domain/entities/part-stock.entity';
import { Inject, Injectable } from '@nestjs/common';
import { PartStockRepository } from '../part-stock.repository';
import { User } from '../../../domain/entities/user.entity';
import { Part } from '../../../domain/entities/part.entity';
import { COMPANY_REPOSITORY, CompanyRepository } from "../company.repository";
import { CONCESSION_REPOSITORY, ConcessionRepository } from "../concession.repository";
import { CLIENT_REPOSITORY, ClientRepository } from "../client.repository";

@Injectable()
export class PartStockSqlRepository implements PartStockRepository {
  constructor(
    @InjectRepository(PartStock)
    private readonly partStockRepository: Repository<PartStock>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>,
    @Inject(COMPANY_REPOSITORY) private readonly companyRepository: CompanyRepository,
    @Inject(CONCESSION_REPOSITORY) private readonly concessionRepository: ConcessionRepository,
    @Inject(CLIENT_REPOSITORY) private readonly clientRepository: ClientRepository
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

  async findStock(entityId: string, partId: string): Promise<PartStock | null> {
    return this.partStockRepository.findOne({
      where: [
        { part: { id: partId }, company: { id: entityId } },
        { part: { id: partId }, concession: { id: entityId } },
        { part: { id: partId }, client: { id: entityId } }
      ],
      relations: ["part", "company", "concession", "client"]
    });
  }

  async updateStockWithoutThreshold(stockId: string, newQuantity: number): Promise<void> {
    await this.partStockRepository.update(stockId, { quantity: newQuantity });
  }

  async createStock(entityId: string, partId: string, quantity: number): Promise<void> {
    const part = await this.partRepository.findOne({ where: { id: partId } });
    if (!part) {
      console.error(`Impossible de trouver la pièce ID: ${partId}`);
      return;
    }

    const stock = this.partStockRepository.create({
      part,
      quantity,
      alertThreshold: 5
    });

    const company = await this.companyRepository.findOne(entityId);
    const concession = await this.concessionRepository.findOne(entityId);
    const client = await this.clientRepository.findOne(entityId);

    if (company) {
      stock.company = company;
    } else if (concession) {
      stock.concession = concession;
    } else if (client) {
      stock.client = client;
    } else {
      console.error(`Entité ID ${entityId} introuvable`);
      return;
    }

    await this.partStockRepository.save(stock);
  }

  async findAllWithoutUser(): Promise<PartStock[]> {
    return this.partStockRepository.createQueryBuilder("partStock")
      .leftJoinAndSelect("partStock.part", "part")
      .leftJoinAndSelect("partStock.company", "company")  
      .leftJoinAndSelect("partStock.concession", "concession")  
      .leftJoinAndSelect("partStock.client", "client")   
      .getMany();
  }
  
}