import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PartStock } from "../../domain/entities/part-stock.entity";
import { CreatePartStockDto } from "../../application/dto/create-part-stock.dto";

@Injectable()
export class PartStockService {
  constructor(
    @InjectRepository(PartStock)
    private readonly partStockRepository: Repository<PartStock>
  ) {}

  async create(createPartStockDto: CreatePartStockDto): Promise<PartStock> {
    const newStock = this.partStockRepository.create(createPartStockDto);
    return await this.partStockRepository.save(newStock);
  }
}