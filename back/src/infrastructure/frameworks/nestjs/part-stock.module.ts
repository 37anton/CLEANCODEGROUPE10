import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartStockService } from "../../../application/services/part-stock.service";
import { PartStockController } from "./part-stock.controller";
import { PartStock } from "../../../domain/entities/part-stock.entity";
import { Part } from "../../../domain/entities/part.entity";
import { User } from "../../../domain/entities/user.entity";
import { Notification } from "../../../domain/entities/notification.entity";
import { UserModule } from "../nestjs/user.module";

import { PART_STOCK_REPOSITORY } from "../../repositories/part-stock.repository"; // Jeton d'injection
import { SqlPartStockRepository } from "../../repositories/sql/part-stock.repository";
import { InMemoryPartStockRepository } from "../../repositories/in-memory/part-stock.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([PartStock, Part, User, Notification]), // Ajout des entités
    UserModule, // 🔹 Vérification que UserModule est bien importé
  ],
  controllers: [PartStockController],
  providers: [
    PartStockService,

    // Injection dynamique selon l'adaptateur utilisé
    {
      provide: PART_STOCK_REPOSITORY,
      useClass: process.env.STORAGE_ADAPTER === "in-memory"
        ? InMemoryPartStockRepository
        : SqlPartStockRepository,
    },
  ],
  exports: [PartStockService, PART_STOCK_REPOSITORY],
})
export class PartStockModule {}