import { Injectable, Inject } from "@nestjs/common";
import { PART_STOCK_REPOSITORY, PartStockRepository } from "../../infrastructure/repositories/part-stock.repository";
import { User } from "../../domain/entities/user.entity";
import { PartStock } from "../../domain/entities/part-stock.entity";
import { CreatePartStockDto } from "../../application/dto/create-part-stock.dto";

@Injectable()
export class PartStockService {
  constructor(
    @Inject(PART_STOCK_REPOSITORY) private readonly partStockRepository: PartStockRepository
  ) {}

  async updateStock(userId: string, createPartStockDto: CreatePartStockDto): Promise<PartStock> {
    return this.partStockRepository.updateStock(userId, createPartStockDto);
  }

  async findAll(user: User): Promise<PartStock[]> {
    return this.partStockRepository.findAll(user);
  }
}
