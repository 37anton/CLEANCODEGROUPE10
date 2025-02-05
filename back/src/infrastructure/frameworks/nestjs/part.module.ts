import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartService } from "../../../application/services/part.service";
import { PartController } from "../../frameworks/nestjs/part.controller";
import { Part } from "../../../domain/entities/part.entity";
import { PART_REPOSITORY } from "../../repositories/part.repository";
import { SqlPartRepository } from "../../repositories/sql/part.repository";
import { InMemoryPartRepository } from "../../repositories/in-memory/part.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Part])],
  controllers: [PartController],
  providers: [
    PartService,
    {
      provide: PART_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY === "true" ? InMemoryPartRepository : SqlPartRepository
    }
  ],
  exports: [PartService, PART_REPOSITORY],
})
export class PartModule {}