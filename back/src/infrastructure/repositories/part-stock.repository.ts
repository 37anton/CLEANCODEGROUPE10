export const PART_STOCK_REPOSITORY = 'PART_STOCK_REPOSITORY';

export interface PartStockRepository {
  updateStock(userId: string, partId: string, quantity: number, alertThreshold: number): Promise<any>;
  findAll(userId: string): Promise<any>;
}