import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interval } from 'src/domain/entities/interval.entity';
import { INTERVAL_REPOSITORY, IntervalRepository } from '../repositories/interval.repository';
import { InMemoryIntervalRepository } from '../repositories/in-memory/in-memory-interval.repository';
import { SQLIntervalRepository } from '../repositories/sql/sql-interval.repository';

// Déterminez si l'on est en mode in-memory ou SQL
const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    ...(!isInMemory ? [TypeOrmModule.forFeature([Interval])] : []),
  ],
  providers: [
    {
      provide: INTERVAL_REPOSITORY,
      useClass: isInMemory ? InMemoryIntervalRepository : SQLIntervalRepository,
    },
  ],
  exports: [INTERVAL_REPOSITORY],
})
export class IntervalModule {}