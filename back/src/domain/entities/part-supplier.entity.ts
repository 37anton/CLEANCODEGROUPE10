import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Supplier } from "./supplier.entity";
import { Part } from "./part.entity";

@Entity()
export class PartSupplier {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.partSuppliers, { nullable: false })
  supplier: Supplier;

  @ManyToOne(() => Part, (part) => part.partSuppliers, { nullable: false })
  part: Part;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number; // Prix de la pièce fixé par le fournisseur
}