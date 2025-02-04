import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartStockService } from "../../../application/services/part-stock.service";
import { PartStockController } from "./part-stock.controller";
import { PartStock } from "../../../domain/entities/part-stock.entity";
import { Part } from "../../../domain/entities/part.entity";
import { User } from "../../../domain/entities/user.entity";
import { UserModule } from "../nestjs/user.module";
import { Notification } from "../../../domain/entities/notification.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([PartStock, Part, User, Notification]),
    UserModule
  ],
  controllers: [PartStockController],
  providers: [PartStockService],
  exports: [PartStockService],
})
export class PartStockModule {}