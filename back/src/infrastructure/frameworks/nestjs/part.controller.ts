import { Controller, Post, Get, Body, UseGuards } from "@nestjs/common";
import { PartService } from "../../../application/services/part.service";
import { CreatePartDto } from "../../../application/dto/create-part.dto";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { Part } from "../../../domain/entities/part.entity";

@Controller("parts")
export class PartController {
  constructor(private readonly partService: PartService) {}
  
  @UseGuards(JwtAuthGuard) // Vérifie que l'utilisateur est bien connecté via JWT
  @Post()
  async create(@Body() createPartDto: CreatePartDto): Promise<Part> {
    return this.partService.create(createPartDto);
  }

  @Get()
  async findAll(): Promise<Part[]> {
    return this.partService.findAll();
  }
}