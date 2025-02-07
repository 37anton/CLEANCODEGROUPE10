import { Controller, Post, Body, UseGuards, Request, Get } from "@nestjs/common";
import { PartStockService } from "../../application/services/part-stock.service";
import { CreatePartStockDto } from "../../application/dto/create-part-stock.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { PartStock } from "../../domain/entities/part-stock.entity";

@Controller("part-stock")
export class PartStockController {
  constructor(private readonly partStockService: PartStockService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async updateStock(@Request() req, @Body() createPartStockDto: { partId: string, quantity: number, alertThreshold: number }) {
    return this.partStockService.updateStock(
      req.user.id, 
      createPartStockDto.partId, 
      createPartStockDto.quantity, 
      createPartStockDto.alertThreshold
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req): Promise<PartStock[]> {
    return this.partStockService.findAll(req.user.id);
  }
}