import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "techdocs" })
export class TechDoc {
  @PrimaryGeneratedColumn("uuid")
  id!: string | number;

  @Column({ nullable: true})
  title!: string;

  @Column({ nullable: true})
  docnumber!: string;

  @Column({ nullable: true})
  lastupdate: string;


}
