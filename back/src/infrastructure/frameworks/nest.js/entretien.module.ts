import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entretien } from '../../../domain/entities/entretien.entity';
import { InMemoryEntretienRepository } from '../../repositories/in-memory-entretien.repository';
import { SqlEntretienRepository } from '../../repositories/sql-entretien.repository';
import { PlanifierEntretienUseCase } from '../../../application/use-cases/planifier-entretien.use-case';
import { EntretienController } from '../../../interface/controllers/entretien.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Entretien])],
  controllers: [EntretienController],
  providers: [
    PlanifierEntretienUseCase,
    {
      provide: 'EntretienRepository',
      useClass:
        process.env.STORAGE_ADAPTER === 'in-memory'
          ? InMemoryEntretienRepository
          : SqlEntretienRepository,
    },
  ],
  exports: ['EntretienRepository'],
})
export class EntretienModule {}
