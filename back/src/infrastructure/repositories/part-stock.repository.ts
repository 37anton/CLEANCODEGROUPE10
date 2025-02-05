export const PART_STOCK_REPOSITORY = "PART_STOCK_REPOSITORY";

import { PartStock } from "../../domain/entities/part-stock.entity";
import { User } from "../../domain/entities/user.entity";
import { CreatePartStockDto } from "../../application/dto/create-part-stock.dto";

export interface PartStockRepository {
  updateStock(userId: string, createPartStockDto: CreatePartStockDto): Promise<PartStock>;
  findAll(user: User): Promise<PartStock[]>;
}
