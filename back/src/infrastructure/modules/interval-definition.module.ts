import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntervalDefinition } from 'src/domain/entities/interval-definition.entity';
import { SQLIntervalDefinitionRepository } from '../repositories/sql/sql-interval-definition.repository';
import { InMemoryIntervalDefinitionRepository } from '../repositories/in-memory/in-memory-interval-definition.repository';
import { CreateIntervalDefinitionUseCase } from 'src/application/use-cases/create-interval-definition.use-case';
import { UpdateIntervalDefinitionUseCase } from 'src/application/use-cases/update-interval-definition.use-case';
import { ListIntervalDefinitionsUseCase } from 'src/application/use-cases/list-interval-definitions.use-case';
import { DeleteIntervalDefinitionUseCase } from 'src/application/use-cases/delete-interval-definition.use-case';
import { IntervalDefinitionController } from 'src/application/controllers/interval-definition.controller';
import { INTERVAL_DEFINITION_REPOSITORY } from '../repositories/interval-definition.repository';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';


@Module({
  imports: [...(!isInMemory ? [TypeOrmModule.forFeature([IntervalDefinition])] : []),],
  controllers: [IntervalDefinitionController],
  providers: [
    {
      provide: INTERVAL_DEFINITION_REPOSITORY,
      useClass: isInMemory ? InMemoryIntervalDefinitionRepository : SQLIntervalDefinitionRepository,
    },
    CreateIntervalDefinitionUseCase,
    UpdateIntervalDefinitionUseCase,
    ListIntervalDefinitionsUseCase,
    DeleteIntervalDefinitionUseCase,
  ],
  exports: [
    INTERVAL_DEFINITION_REPOSITORY,
    CreateIntervalDefinitionUseCase,
    UpdateIntervalDefinitionUseCase,
    ListIntervalDefinitionsUseCase,
    DeleteIntervalDefinitionUseCase,
  ],
})
export class IntervalDefinitionModule {}
