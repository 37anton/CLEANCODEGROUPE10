import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PartSupplier } from "./part-supplier.entity";

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  deliveryTime: number; 

  @Column()
  city: string;

  @OneToMany(() => PartSupplier, (partSupplier) => partSupplier.supplier)
  partSuppliers: PartSupplier[];
}