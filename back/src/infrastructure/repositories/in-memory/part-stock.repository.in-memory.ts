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

  async findStock(entityId: string, partId: string): Promise<PartStock | null> {
    return this.stocks.find(s => s.part.id === partId && (
      s.company?.id === entityId || s.concession?.id === entityId || s.client?.id === entityId
    )) || null;
  }

  async updateStockWithoutThreshold(stockId: string, newQuantity: number): Promise<void> {
    const stock = this.stocks.find(s => s.id === stockId);
    if (stock) {
      stock.quantity = newQuantity;
    }
  }

  async createStock(entityId: string, partId: string, quantity: number): Promise<void> {
    const newStock = new PartStock();
    newStock.id = Math.random().toString(36).substring(7);
    newStock.part = { id: partId } as any;
    newStock.quantity = quantity;
    newStock.alertThreshold = 5;

    if (entityId.startsWith("C")) {
      newStock.company = { id: entityId } as any;
    } else if (entityId.startsWith("X")) {
      newStock.concession = { id: entityId } as any;
    } else {
      newStock.client = { id: entityId } as any;
    }

    this.stocks.push(newStock);
  }
}