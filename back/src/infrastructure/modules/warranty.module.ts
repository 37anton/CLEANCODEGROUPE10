// src/infrastructure/modules/warranty.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warranty } from '../../domain/entities/warranty.entity';
import { WarrantyController } from '../../interfaces/controllers/warranty.controller';
import { SQLWarrantyRepository } from '../../infrastructure/repositories/sql/sql-warranty.repository';
import { InMemoryWarrantyRepository } from '../../infrastructure/repositories/in-memory/in-memory-warranty.repository';
import { ReportWarrantyUseCase } from '../../application/use-cases/report-warranty.use-case';
import { GetWarrantyHistoryUseCase } from '../../application/use-cases/get-warranty-history.use-case';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    ...(!isInMemory ? [TypeOrmModule.forFeature([Warranty])] : []),
  ],
  controllers: [WarrantyController],
  providers: [
    isInMemory ? InMemoryWarrantyRepository : SQLWarrantyRepository,
    {
      provide: 'CustomWarrantyRepository',
      useClass: isInMemory ? InMemoryWarrantyRepository : SQLWarrantyRepository,
    },
    ReportWarrantyUseCase,
    GetWarrantyHistoryUseCase,
  ],
  exports: ['CustomWarrantyRepository', ReportWarrantyUseCase, GetWarrantyHistoryUseCase],
})
export class WarrantyModule {}
