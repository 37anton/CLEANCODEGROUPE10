import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderRepository } from "../../repositories/order.repository";
import { Order } from "../../../domain/entities/order.entity";

@Injectable()
export class SqlOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async findByCompany(companyId: string): Promise<Order[]> {
    return this.repository.find({
      where: { company: { id: companyId } },
      relations: ["supplier", "orderItems", "orderItems.partSupplier", "orderItems.partSupplier.part"],
    });
  }

  async findByConcession(concessionId: string): Promise<Order[]> {
    return this.repository.find({
      where: { concession: { id: concessionId } },
      relations: ["supplier", "orderItems", "orderItems.partSupplier", "orderItems.partSupplier.part"],
    });
  }

  async findByClient(clientId: string): Promise<Order[]> {
    return this.repository.find({
      where: { client: { id: clientId } },
      relations: ["supplier", "orderItems", "orderItems.partSupplier", "orderItems.partSupplier.part"],
    });
  }
}
