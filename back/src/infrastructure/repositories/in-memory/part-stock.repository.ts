import { Injectable } from "@nestjs/common";
import { PartStockRepository } from "../../../infrastructure/repositories/part-stock.repository";
import { PartStock } from "../../../domain/entities/part-stock.entity";
import { User } from "../../../domain/entities/user.entity";
import { CreatePartStockDto } from "../../../application/dto/create-part-stock.dto";

@Injectable()
export class InMemoryPartStockRepository implements PartStockRepository {
  private stocks: PartStock[] = [];

  async updateStock(userId: string, createPartStockDto: CreatePartStockDto): Promise<PartStock> {
    let stock = this.stocks.find(stock => stock.part.id === createPartStockDto.partId);

    if (!stock) {
      stock = new PartStock();
      stock.id = (Math.random() * 1000000).toFixed(0);
      stock.part = { id: createPartStockDto.partId } as any;
      stock.quantity = createPartStockDto.quantity;
      stock.alertThreshold = createPartStockDto.alertThreshold;
      this.stocks.push(stock);
    } else {
      stock.quantity = createPartStockDto.quantity;
      stock.alertThreshold = createPartStockDto.alertThreshold;
    }

    return stock;
  }

  async findAll(user: User): Promise<PartStock[]> {
    return this.stocks;
  }
}
