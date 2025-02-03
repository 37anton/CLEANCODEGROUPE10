import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { PartStockService } from "../../../application/services/part-stock.service";
import { CreatePartStockDto } from "../../../application/dto/create-part-stock.dto";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { PartStock } from "../../../domain/entities/part-stock.entity";

@Controller("part-stock")
export class PartStockController {
  constructor(private readonly partStockService: PartStockService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPartStockDto: CreatePartStockDto): Promise<PartStock> {
    return this.partStockService.create(createPartStockDto);
  }
}