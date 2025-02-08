import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from 'src/domain/entities/driver.entity';
import { DriverController } from '../../interfaces/controllers/driver.controller';
import { DriverService } from '../../application/services/driver.service';
import { CreateDriverUseCase } from '../../application/use-cases/create-driver.use-case';
import { FindDriverByIdUseCase } from '../../application/use-cases/find-driver-by-id.use-case';
import { FindDriversByCompanyUseCase } from '../../application/use-cases/find-drivers-by-company.use-case';
import { DriverSqlRepository } from '../repositories/sql/driver.repository.sql';
import { DriverInMemoryRepository } from '../repositories/in-memory/driver.repository.in-memory';
import { DRIVER_REPOSITORY } from '../repositories/driver.repository';
import { UpdateDriverUseCase } from '../../application/use-cases/update-driver.use-case'; 

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [...(!isInMemory ? [TypeOrmModule.forFeature([Driver])] : []),],
  controllers: [DriverController],
  providers: [
    DriverService,
    CreateDriverUseCase,
    FindDriverByIdUseCase,
    FindDriversByCompanyUseCase,
    UpdateDriverUseCase,
    {
      provide: DRIVER_REPOSITORY,
      useClass: process.env.STORAGE_ADAPTER === 'in-memory' ? DriverInMemoryRepository : DriverSqlRepository,
    },
  ],
  exports: [DriverService, DRIVER_REPOSITORY],
})
export class DriverModule {}