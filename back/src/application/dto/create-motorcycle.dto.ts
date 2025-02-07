import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateMotorcycleDto {
  @IsString()
  @IsNotEmpty()
  vin: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsDateString()
  manufactureDate: Date;

  @IsDateString()
  lastMaintenanceDate: Date;

  @IsNumber()
  mileage: number;

  @IsNumber()
  lastMaintenanceMileage: number;
}
