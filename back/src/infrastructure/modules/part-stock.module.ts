import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartStock } from 'src/domain/entities/part-stock.entity';
import { PartStockController } from '../../interfaces/controllers/part-stock.controller';
import { PartStockService } from '../../application/services/part-stock.service';
import { UpdatePartStockUseCase } from '../../application/use-cases/update-part-stock.use-case';
import { FindPartStockUseCase } from '../../application/use-cases/find-part-stock.use-case';
import { PartStockSqlRepository } from '../repositories/sql/part-stock.repository.sql';
import { PartStockInMemoryRepository } from '../repositories/in-memory/part-stock.repository.in-memory';
import { PART_STOCK_REPOSITORY } from '../repositories/part-stock.repository';
import { User } from 'src/domain/entities/user.entity';
import { Part } from 'src/domain/entities/part.entity';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PartStock, Part, User]),
    UserModule
  ],
  controllers: [PartStockController],
  providers: [
    PartStockService,
    UpdatePartStockUseCase,
    FindPartStockUseCase,
    {
      provide: PART_STOCK_REPOSITORY,
      useClass: process.env.USE_MEMORY_DB === 'true' ? PartStockInMemoryRepository : PartStockSqlRepository,
    },
  ],
  exports: [PartStockService, PART_STOCK_REPOSITORY],
})
export class PartStockModule {}