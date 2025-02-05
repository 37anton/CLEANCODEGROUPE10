import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartStockService } from "../../../application/services/part-stock.service";
import { PartStockController } from "../../frameworks/nestjs/part-stock.controller";
import { PartStock } from "../../../domain/entities/part-stock.entity";
import { PART_STOCK_REPOSITORY } from "../../repositories/part-stock.repository";
import { SqlPartStockRepository } from "../../repositories/sql/part-stock.repository";
import { InMemoryPartStockRepository } from "../../repositories/in-memory/part-stock.repository";

@Module({
  imports: [TypeOrmModule.forFeature([PartStock])],
  controllers: [PartStockController],
  providers: [
    PartStockService,
    {
      provide: PART_STOCK_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY === "true" ? InMemoryPartStockRepository : SqlPartStockRepository
    }
  ],
  exports: [PartStockService, PART_STOCK_REPOSITORY],
})
export class PartStockModule {}