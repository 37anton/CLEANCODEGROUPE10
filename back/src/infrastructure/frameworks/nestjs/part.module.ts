import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartService } from "../../../application/services/part.service";
import { PartController } from "./part.controller";
import { Part } from "../../../domain/entities/part.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Part])],
  controllers: [PartController],
  providers: [PartService],
  exports: [PartService],
})
export class PartModule {}