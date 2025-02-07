import { Injectable, Inject } from '@nestjs/common';
import { UpdatePartStockUseCase } from '../use-cases/update-part-stock.use-case';
import { FindPartStockUseCase } from '../use-cases/find-part-stock.use-case';
import { PART_STOCK_REPOSITORY, PartStockRepository } from '../../infrastructure/repositories/part-stock.repository';


@Injectable()
export class PartStockService {
  constructor(
    private readonly updatePartStockUseCase: UpdatePartStockUseCase,
    private readonly findPartStockUseCase: FindPartStockUseCase,
    @Inject(PART_STOCK_REPOSITORY)
    private readonly partStockRepository: PartStockRepository,
  ) {}

  async updateStock(userId: string, partId: string, quantity: number, alertThreshold: number) {
    return await this.updatePartStockUseCase.execute(userId, partId, quantity, alertThreshold);
  }

  async findAll(userId: string) {
    return await this.findPartStockUseCase.execute(userId);
  }

  async deductStock(userId: string, partId: string, quantity: number): Promise<any> {
    // Récupère tous les stocks pour l'utilisateur
    const stocks = await this.partStockRepository.findAll(userId);
    // Trouver le stock correspondant à la pièce
    const currentStock = stocks.find((stock: any) => stock.part.id === partId);
    if (!currentStock) {
      throw new Error(`Stock introuvable pour la pièce ${partId}.`);
    }
    if (currentStock.quantity < quantity) {
      throw new Error(`Quantité insuffisante pour la pièce ${partId}. Stock actuel: ${currentStock.quantity}.`);
    }
    // Calcul du nouveau stock
    const newQuantity = currentStock.quantity - quantity;
    // Mettre à jour le stock et retourner l'enregistrement mis à jour
    return await this.partStockRepository.updateStock(userId, partId, newQuantity, currentStock.alertThreshold);
  }
}