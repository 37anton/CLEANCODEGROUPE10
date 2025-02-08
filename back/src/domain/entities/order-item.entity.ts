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
  quantity: number; 

  @Column("decimal", { precision: 10, scale: 2 })
  price: number; 
}
