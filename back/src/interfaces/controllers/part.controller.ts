import { Controller, Post, Get, Body, UseGuards } from "@nestjs/common";
import { PartService } from "../../application/services/part.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { Part } from "../../domain/entities/part.entity";

@Controller("parts")
export class PartController {
  constructor(private readonly partService: PartService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: { name: string }): Promise<Part> {
    return this.partService.create(body.name);
  }

  @Get()
  async findAll(): Promise<Part[]> {
    return this.partService.findAll();
  }
}