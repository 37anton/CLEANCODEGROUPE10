import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Concession } from "../../domain/entities/concession.entity";
import { CONCESSION_REPOSITORY } from "../repositories/concession.repository";
import { ConcessionSqlRepository } from "../repositories/sql/concession.repository.sql";
import { ConcessionInMemoryRepository } from "../repositories/in-memory/concession.repository.in-memory";
import { ConcessionService } from "src/application/services/concession.service";
import { CreateConcessionUseCase } from "src/application/use-cases/create-concession.use-case";

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [...(!isInMemory ? [TypeOrmModule.forFeature([Concession])] : [])],
  providers: [
    CreateConcessionUseCase,
    ConcessionService,
    { 
      provide: CONCESSION_REPOSITORY,
      useClass: isInMemory ? ConcessionInMemoryRepository : ConcessionSqlRepository
    }
  ],
  exports: [
    CONCESSION_REPOSITORY,
    ConcessionService
  ],
})
export class ConcessionModule {}
