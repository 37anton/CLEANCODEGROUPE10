import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Order } from "./order.entity";
import { PartSupplier } from "./part-supplier.entity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Order, (order) => order.orderItems, { nullable: false })
  order: Order;

  @ManyToOne(() => PartSupplier, { nullable: false })
  partSupplier: PartSupplier;

  @Column()
  quantity: number; // Quantité commandée

  @Column("decimal", { precision: 10, scale: 2 })
  price: number; // Prix unitaire au moment de la commande
}
