import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entretien } from '../../../domain/entities/entretien.entity';
import { InMemoryEntretienRepository } from '../../repositories/in-memory-entretien.repository';
import { SqlEntretienRepository } from '../../repositories/sql-entretien.repository';
import { PlanifierEntretienUseCase } from '../../../application/use-cases/planifier-entretien.use-case';
import { EntretienController } from '../../../interface/controllers/entretien.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entretien]), // Intégration TypeORM avec l'entité Entretien
  ],
  controllers: [EntretienController],
  providers: [
    PlanifierEntretienUseCase,
    {
      provide: 'EntretienRepository',
      useClass: (() => {
        // Choix dynamique de l'adaptateur
        switch (process.env.STORAGE_ADAPTER) {
          case 'in-memory':
            return InMemoryEntretienRepository;
          case 'sql':
            return SqlEntretienRepository;
          default:
            throw new Error(
              "STORAGE_ADAPTER doit être défini comme 'in-memory' ou 'sql'.",
            );
        }
      })(),
    },
  ],
  exports: [TypeOrmModule, 'EntretienRepository'], // Export si nécessaire
})
export class EntretienModule {}
