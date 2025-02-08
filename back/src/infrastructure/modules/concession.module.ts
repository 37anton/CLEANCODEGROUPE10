import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Concession } from "../../domain/entities/concession.entity";
import { CONCESSION_REPOSITORY } from "../repositories/concession.repository";
import { ConcessionSqlRepository } from "../repositories/sql/concession.repository.sql";
import { ConcessionInMemoryRepository } from "../repositories/in-memory/concession.repository.in-memory";

@Module({
  imports: [TypeOrmModule.forFeature([Concession])],
  providers: [
    { 
      provide: CONCESSION_REPOSITORY,
      useClass: process.env.STORAGE_ADAPTER === 'in-memory' ? ConcessionInMemoryRepository : ConcessionSqlRepository
    }
  ],
  exports: [CONCESSION_REPOSITORY],
})
export class ConcessionModule {}
