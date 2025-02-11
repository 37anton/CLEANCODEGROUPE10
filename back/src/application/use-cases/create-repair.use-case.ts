import { Injectable, Inject } from '@nestjs/common';
import { Repair } from '../../domain/entities/repair.entity';
import { RepairRepository, REPAIR_REPOSITORY } from '../../infrastructure/repositories/repair.repository';
import * as crypto from 'crypto';
import { PartStockService } from '../../application/services/part-stock.service';
import { RepairPart } from '../../domain/entities/repair-part.entity';
import { CreateRepairDto } from '../dto/create-repair.dto';

@Injectable()
export class CreateRepairUseCase {
  constructor(
    @Inject(REPAIR_REPOSITORY)
    private readonly repairRepository: RepairRepository,
    private readonly partStockService: PartStockService,
  ) {}

  async execute(data: CreateRepairDto): Promise<Repair> {
    console.log('CreateRepairUseCase - DTO reçu:', data);

    const incident = await this.loadIncidentById(data.incidentId);
    if (!incident) {
      throw new Error(`Incident avec l'ID ${data.incidentId} introuvable.`);
    }
    console.log('Incident chargé:', incident);

    const repair = new Repair();
    repair.id = crypto.randomUUID();
    repair.repairDate = data.repairDate ? new Date(data.repairDate) : new Date();
    repair.description = data.description ?? '';
    repair.incident = incident;
    repair.repairParts = [];

    for (const partData of data.repairParts) {
      if (partData.quantity <= 0) {
        throw new Error(`La quantité pour la pièce ${partData.partId} doit être supérieure à zéro.`);
      }
      console.log(`Déduction du stock pour la pièce ${partData.partId} avec quantité ${partData.quantity}`);
      const updatedPartStock = await this.partStockService.deductStock(data.userId, partData.partId, partData.quantity);
      console.log('Stock mis à jour:', updatedPartStock);

      const repairPart = new RepairPart();
      repairPart.id = crypto.randomUUID();
      repairPart.partStock = updatedPartStock;
      repairPart.quantity = partData.quantity;
      repair.repairParts.push(repairPart);
    }

    console.log('Réparation avant sauvegarde:', repair);
    const createdRepair = await this.repairRepository.create(repair);
    console.log('Réparation créée:', createdRepair);

    return createdRepair;
  }

  async loadIncidentById(incidentId: string): Promise<any> {
    console.log(`Chargement de l'incident avec l'ID: ${incidentId}`);
    return { id: incidentId } as any;
  }
}
