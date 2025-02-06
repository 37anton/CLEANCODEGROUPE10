import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repair } from '../../domain/entities/repair.entity';
import { SQLRepairRepository } from '../../infrastructure/repositories/sql/sql-repair.repository';
import { InMemoryRepairRepository } from '../../infrastructure/repositories/in-memory/in-memory-repair.repository';
import { CreateRepairUseCase } from '../../application/use-cases/create-repair.use-case';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [TypeOrmModule.forFeature([Repair])],
  providers: [
    {
      provide: 'CustomRepairRepository',
      useClass: isInMemory ? InMemoryRepairRepository : SQLRepairRepository,
    },
    CreateRepairUseCase,
  ],
  exports: [
    CreateRepairUseCase,
    'CustomRepairRepository',
    TypeOrmModule,
  ],
})
export class RepairModule {}
