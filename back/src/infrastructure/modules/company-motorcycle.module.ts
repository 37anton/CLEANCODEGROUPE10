import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyMotorcycle } from 'src/domain/entities/company-motorcycle.entity';
import { COMPANY_MOTORCYCLE_REPOSITORY, CompanyMotorcycleRepository } from '../repositories/company-motorcycle.repository';
import { SQLCompanyMotorcycleRepository } from '../repositories/sql/sql-company-motorcycle.repository';
import { InMemoryCompanyMotorcycleRepository } from '../repositories/in-memory/in-memory-company-motorcycle.repository';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [...(!isInMemory ? [TypeOrmModule.forFeature([CompanyMotorcycle])] : [])],
  providers: [
    {
      provide: COMPANY_MOTORCYCLE_REPOSITORY,
      useClass: isInMemory ? InMemoryCompanyMotorcycleRepository : SQLCompanyMotorcycleRepository,
    },
  ],
  exports: [COMPANY_MOTORCYCLE_REPOSITORY],
})
export class CompanyMotorcycleModule {}