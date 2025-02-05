import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../../../domain/entities/driver.entity';
import { DriverService } from '../../../application/services/driver.service';
import { DriverController } from '../../../infrastructure/frameworks/nestjs/driver.controller';
import { Company } from '../../../domain/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Company])],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
