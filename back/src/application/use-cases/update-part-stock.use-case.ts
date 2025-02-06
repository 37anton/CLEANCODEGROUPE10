import { Injectable, Inject } from '@nestjs/common';
import { PartStockRepository, PART_STOCK_REPOSITORY } from '../../infrastructure/repositories/part-stock.repository';

@Injectable()
export class UpdatePartStockUseCase {
  constructor(
    @Inject(PART_STOCK_REPOSITORY) private readonly partStockRepository: PartStockRepository,
  ) {}

  async execute(userId: string, partId: string, quantity: number, alertThreshold: number) {
    return await this.partStockRepository.updateStock(userId, partId, quantity, alertThreshold);
  }
}