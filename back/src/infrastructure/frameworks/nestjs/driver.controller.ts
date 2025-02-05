import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DriverService } from '../../../application/services/driver.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('drivers')
@UseGuards(JwtAuthGuard) // Protège l'accès avec le JWT
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  async getDrivers(@Req() req: Request) {
    // Récupérer l'entreprise de l'utilisateur à partir du JWT
    const user = req.user as any; // Typage du user
    const companyId = user.company?.id;

    if (!companyId) {
      return { message: "Vous n'êtes pas associé à une entreprise." };
    }

    // Récupération des conducteurs de la même entreprise
    const drivers = await this.driverService.getDriversByCompany(companyId);
    return drivers;
  }
}
