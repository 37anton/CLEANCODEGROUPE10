// src/infrastructure/modules/warranty.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warranty } from '../../domain/entities/warranty.entity';
import { SQLWarrantyRepository } from '../../infrastructure/repositories/sql/sql-warranty.repository';
import { InMemoryWarrantyRepository } from '../../infrastructure/repositories/in-memory/in-memory-warranty.repository';
import { CreateWarrantyUseCase } from '../../application/use-cases/create-warranty.use-case';
import { GetWarrantyHistoryUseCase } from '../../application/use-cases/get-warranty-history.use-case';
import { WarrantyController } from 'src/interfaces/controllers/warranty.controller';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [TypeOrmModule.forFeature([Warranty])],
  controllers: [WarrantyController],
  providers: [
    {
      provide: 'CustomWarrantyRepository',
      useClass: isInMemory ? InMemoryWarrantyRepository : SQLWarrantyRepository,
    },
    CreateWarrantyUseCase,
    GetWarrantyHistoryUseCase,
  ],
  exports: [
    CreateWarrantyUseCase,
    GetWarrantyHistoryUseCase,
    'CustomWarrantyRepository',
    TypeOrmModule,
  ],
})
export class WarrantyModule {}
