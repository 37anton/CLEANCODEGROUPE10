import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PartStock } from "../../domain/entities/part-stock.entity";
import { CreatePartStockDto } from "../../application/dto/create-part-stock.dto";
import { User } from "../../domain/entities/user.entity";
import { Part } from "../../domain/entities/part.entity";

@Injectable()
export class PartStockService {
  constructor(
    @InjectRepository(PartStock)
    private readonly partStockRepository: Repository<PartStock>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>
  ) {}

  async updateStock(userId: string, createPartStockDto: CreatePartStockDto): Promise<PartStock> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["company", "concession", "client"],
    });

    if (!user) {
      throw new UnauthorizedException("Utilisateur non trouvé");
    }

    const part = await this.partRepository.findOne({ where: { id: createPartStockDto.partId } });

    if (!part) {
      throw new UnauthorizedException("Pièce non trouvée");
    }

    let stock = await this.partStockRepository.findOne({
      where: [
        { part: part, company: user.company },
        { part: part, concession: user.concession },
        { part: part, client: user.client }
      ],
    });

    if (!stock) {
      stock = this.partStockRepository.create({
        part,
        quantity: createPartStockDto.quantity,
        alertThreshold: createPartStockDto.alertThreshold,
        company: user.company || null,
        concession: user.concession || null,
        client: user.client || null,
      });
    } else {
      stock.quantity = createPartStockDto.quantity;
      stock.alertThreshold = createPartStockDto.alertThreshold;
    }

    return await this.partStockRepository.save(stock);
  }
}