import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartSupplier } from "src/domain/entities/part-supplier.entity";
import { PartSupplierController } from "../../interfaces/controllers/part-supplier.controller";
import { PartSupplierService } from "../../application/services/part-supplier.service";
import { FindPartsBySupplierUseCase } from "../../application/use-cases/find-parts-by-supplier.use-case";
import { PartSupplierSqlRepository } from "../repositories/sql/part-supplier.repository.sql";
import { PartSupplierInMemoryRepository } from "../repositories/in-memory/part-supplier.repository.in-memory";
import { PART_SUPPLIER_REPOSITORY } from "../repositories/part-supplier.repository";

// Vérifie si on utilise In-Memory ou PostgreSQL
const isInMemory = process.env.STORAGE_ADAPTER === "in-memory";

@Module({
  imports: isInMemory ? [] : [TypeOrmModule.forFeature([PartSupplier])],
  controllers: [PartSupplierController],
  providers: [
    PartSupplierService,
    FindPartsBySupplierUseCase,
    {
      provide: PART_SUPPLIER_REPOSITORY,
      useClass: process.env.STORAGE_ADAPTER === "in-memory" ? PartSupplierInMemoryRepository : PartSupplierSqlRepository,
    },
  ],
  exports: [PartSupplierService, PART_SUPPLIER_REPOSITORY],
})
export class PartSupplierModule {}