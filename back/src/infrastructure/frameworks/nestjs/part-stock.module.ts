import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartStockService } from "../../../application/services/part-stock.service";
import { PartStockController } from "./part-stock.controller";
import { PartStock } from "../../../domain/entities/part-stock.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PartStock])],
  controllers: [PartStockController],
  providers: [PartStockService],
  exports: [PartStockService],
})
export class PartStockModule {}