export const PART_STOCK_REPOSITORY = 'PART_STOCK_REPOSITORY';

export interface PartStockRepository {
  updateStock(userId: string, partId: string, quantity: number, alertThreshold: number): Promise<any>;
  updateStockWithoutThreshold(stockId: string, newQuantity: number): Promise<void>;
  findAll(userId: string): Promise<any>;
  findStock(entityId: string, partId: string): Promise<any>;
  createStock(entityId: string, partId: string, quantity: number): Promise<void>;
  findAllWithoutUser(): Promise<any>;
}