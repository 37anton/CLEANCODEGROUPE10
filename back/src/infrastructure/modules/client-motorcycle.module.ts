import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientMotorcycle } from 'src/domain/entities/client-motorcycle.entity';
import { CLIENT_MOTORCYCLE_REPOSITORY, ClientMotorcycleRepository } from '../repositories/client-motorcycle.repository';
import { SQLClientMotorcycleRepository } from '../repositories/sql/sql-client-motorcycle.repository';
import { InMemoryClientMotorcycleRepository } from '../repositories/in-memory/in-memory-client-motorcycle.repository';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    ...(!isInMemory ? [TypeOrmModule.forFeature([ClientMotorcycle])] : []),
  ],
  providers: [
    {
      provide: CLIENT_MOTORCYCLE_REPOSITORY,
      useClass: isInMemory ? InMemoryClientMotorcycleRepository : SQLClientMotorcycleRepository,
    },
  ],
  exports: [CLIENT_MOTORCYCLE_REPOSITORY],
})
export class ClientMotorcycleModule {}