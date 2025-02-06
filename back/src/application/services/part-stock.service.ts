import { Injectable } from '@nestjs/common';
import { UpdatePartStockUseCase } from '../use-cases/update-part-stock.use-case';
import { FindPartStockUseCase } from '../use-cases/find-part-stock.use-case';

@Injectable()
export class PartStockService {
  constructor(
    private readonly updatePartStockUseCase: UpdatePartStockUseCase,
    private readonly findPartStockUseCase: FindPartStockUseCase,
  ) {}

  async updateStock(userId: string, partId: string, quantity: number, alertThreshold: number) {
    return await this.updatePartStockUseCase.execute(userId, partId, quantity, alertThreshold);
  }

  async findAll(userId: string) {
    return await this.findPartStockUseCase.execute(userId);
  }
}