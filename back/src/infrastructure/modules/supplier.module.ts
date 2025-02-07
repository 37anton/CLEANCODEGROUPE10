import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Supplier } from "src/domain/entities/supplier.entity";
import { SupplierController } from "../../interfaces/controllers/supplier.controller";
import { SupplierService } from "../../application/services/supplier.service";
import { FindSuppliersUseCase } from "../../application/use-cases/find-suppliers.use-case";
import { SupplierSqlRepository } from "../repositories/sql/supplier.repository.sql";
import { SupplierInMemoryRepository } from "../repositories/in-memory/supplier.repository.in-memory";
import { SUPPLIER_REPOSITORY } from "../repositories/supplier.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  controllers: [SupplierController],
  providers: [
    SupplierService,
    FindSuppliersUseCase,
    {
      provide: SUPPLIER_REPOSITORY,
      useClass: process.env.STORAGE_ADAPTER === "in-memory" ? SupplierInMemoryRepository : SupplierSqlRepository,
    },
  ],
  exports: [SupplierService, SUPPLIER_REPOSITORY],
})
export class SupplierModule {}