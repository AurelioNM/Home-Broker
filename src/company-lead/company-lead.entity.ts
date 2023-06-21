import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('pk_companyleads', ['id'], { unique: true })
@Entity('companyleads', { schema: 'public' })
export class CompanyLead {

  @Column('character varying', { 
    name: 'name', 
    length: 255, 
    nullable: false 
  })
  name: string;

  @Column('character varying', {
    name: 'structure',
    length: 20,
    nullable: false,
  })
  structure: string;

  @Column('character varying', {
    name: 'customerName',
    length: 255,
    nullable: false,
  })
  customerName: string;

  @Column('character varying', {
    name: 'customerEmail',
    length: 200,
    nullable: false,
  })
  customerEmail: string;
}
