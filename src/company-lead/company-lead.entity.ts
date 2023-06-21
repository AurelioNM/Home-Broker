import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CompanyLead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  structure: string;

  @Column()
  customerName: string;

  @Column()
  customerEmail: string;
}
