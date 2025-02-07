import { Injectable, Inject } from '@nestjs/common';
import { PartStockRepository, PART_STOCK_REPOSITORY } from '../../infrastructure/repositories/part-stock.repository';

@Injectable()
export class FindPartStockUseCase {
  constructor(
    @Inject(PART_STOCK_REPOSITORY) private readonly partStockRepository: PartStockRepository,
  ) {}

  async execute(userId: string) {
    return await this.partStockRepository.findAll(userId);
  }
}