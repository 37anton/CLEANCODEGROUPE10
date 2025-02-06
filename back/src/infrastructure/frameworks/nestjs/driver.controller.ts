import { Controller, Post, Body, Get, Param, Req, UseGuards, Patch } from '@nestjs/common';
import { DriverService } from '../../../application/services/driver.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('drivers')
@UseGuards(JwtAuthGuard)
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() body: { name: string; license: string; experience: number }
  ) {
    if (!req.user) {
      return { message: "Utilisateur non authentifié." };
    }

    const user = req.user as any;
    const companyId = user.company?.id;

    if (!companyId) {
      return { message: "Vous n'êtes pas associé à une entreprise." };
    }

    return this.driverService.create(companyId, body.name, body.license, body.experience);
  }


  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.driverService.findById(id);
  }

  @Get()
  async findByCompany(@Req() req: Request) {
    const user = req.user as any;
    const companyId = user.company?.id;

    if (!companyId) {
      return { message: "Vous n'êtes pas associé à une entreprise." };
    }

    return this.driverService.findByCompany(companyId);
  }

  @Patch(':id')
  async updateDriver(
    @Param('id') driverId: string,
    @Req() req: Request,
    @Body() updateData: Partial<{ name: string; license: string; experience: number }>
  ) {
    if (!req.user) {
      return { message: "Utilisateur non authentifié." };
    }

    const user = req.user as any;
    const companyId = user.company?.id;

    if (!companyId) {
      return { message: "Vous n'êtes pas associé à une entreprise." };
    }

    return await this.driverService.updateDriver(driverId, companyId, updateData);
  }
}