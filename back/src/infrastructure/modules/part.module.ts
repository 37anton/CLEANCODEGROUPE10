import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartService } from "../../application/services/part.service";
import { PartController } from "../../application/controllers/part.controller";
import { Part } from "../../domain/entities/part.entity";
import { CreatePartUseCase } from "../../application/use-cases/create-part.use-case";
import { FindPartsUseCase } from "../../application/use-cases/find-parts.use-case";
import { PART_REPOSITORY } from "../repositories/part.repository";
import { PartSqlRepository } from '../repositories/sql/part.repository.sql';
import { PartInMemoryRepository } from '../repositories/in-memory/part.repository.in-memory';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [...(!isInMemory ? [TypeOrmModule.forFeature([Part])] : [])],
  controllers: [PartController],
  providers: [
    PartService,
    CreatePartUseCase,
    FindPartsUseCase,
    {
      provide: PART_REPOSITORY,
      useClass: isInMemory ? PartInMemoryRepository : PartSqlRepository,
    },
  ],
  exports: [PartService, PART_REPOSITORY],
})
export class PartModule {}