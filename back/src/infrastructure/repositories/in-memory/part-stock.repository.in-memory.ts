import { Injectable } from '@nestjs/common';
import { PartStock } from '../../../domain/entities/part-stock.entity';
import { PartStockRepository } from '../part-stock.repository';

@Injectable()
export class PartStockInMemoryRepository implements PartStockRepository {
  private stocks: PartStock[] = [];

  async updateStock(userId: string, partId: string, quantity: number, alertThreshold: number): Promise<PartStock> {
    let stock = this.stocks.find(s => s.part.id === partId);
    
    if (!stock) {
      stock = new PartStock();
      stock.id = Math.random().toString(36).substring(7);
      stock.part = { id: partId } as any;
      stock.quantity = quantity;
      stock.alertThreshold = alertThreshold;
      this.stocks.push(stock);
    } else {
      stock.quantity = quantity;
      stock.alertThreshold = alertThreshold;
    }

    return stock;
  }

  async findAll(userId: string): Promise<PartStock[]> {
    return this.stocks;
  }
}