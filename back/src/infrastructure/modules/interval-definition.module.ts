// src/infrastructure/modules/interval-definition.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntervalDefinition } from 'src/domain/entities/interval-definition.entity';
import { SQLIntervalDefinitionRepository } from '../repositories/sql/sql-interval-definition.repository';
import { InMemoryIntervalDefinitionRepository } from '../repositories/in-memory/in-memory-interval-definition.repository';
import { CreateIntervalDefinitionUseCase } from 'src/application/use-cases/create-interval-definition.use-case';
import { UpdateIntervalDefinitionUseCase } from 'src/application/use-cases/update-interval-definition.use-case';
import { ListIntervalDefinitionsUseCase } from 'src/application/use-cases/list-interval-definitions.use-case';
import { DeleteIntervalDefinitionUseCase } from 'src/application/use-cases/delete-interval-definition.use-case';
import { IntervalDefinitionController } from 'src/interfaces/controllers/interval-definition.controller';
const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [TypeOrmModule.forFeature([IntervalDefinition])],
  controllers: [IntervalDefinitionController],
  providers: [
    {
      provide: 'CustomIntervalDefinitionRepository',
      useClass: isInMemory ? InMemoryIntervalDefinitionRepository : SQLIntervalDefinitionRepository,
    },
    CreateIntervalDefinitionUseCase,
    UpdateIntervalDefinitionUseCase,
    ListIntervalDefinitionsUseCase,
    DeleteIntervalDefinitionUseCase,
  ],
  // IMPORTANT : exporter le provider afin qu'il soit accessible dans d'autres modules
  exports: [
    'CustomIntervalDefinitionRepository',
    CreateIntervalDefinitionUseCase,
    UpdateIntervalDefinitionUseCase,
    ListIntervalDefinitionsUseCase,
    DeleteIntervalDefinitionUseCase,
  ],
})
export class IntervalDefinitionModule {}
