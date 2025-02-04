// src/application/use-cases/report-warranty.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Warranty } from '../../domain/entities/warranty.entity';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';

@Injectable()
export class ReportWarrantyUseCase {
  constructor(
    @Inject('CustomWarrantyRepository')
    private readonly warrantyRepository: {
      save(warranty: Warranty): Promise<Warranty>;
    },
  ) {}

  async execute(motorcycle: Motorcycle, startDate: Date, endDate: Date): Promise<Warranty> {
    const warranty = new Warranty();
    warranty.id = crypto.randomUUID();
    warranty.startDate = startDate;
    warranty.endDate = endDate;
    warranty.motorcycle = motorcycle;
    return await this.warrantyRepository.save(warranty);
  }
}
