import { BaseEntity } from '../common/entities/base.entity';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('pk_companyleads', ['id'], { unique: true })
@Entity('company_leads', { schema: 'public' })
export class CompanyLead extends BaseEntity {
  @Column('character varying', {
    name: 'name',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column('character varying', {
    name: 'structure',
    length: 20,
    nullable: false,
  })
  structure: string;

  @Column('character varying', {
    name: 'customer_name',
    length: 255,
    nullable: false,
  })
  customerName: string;

  @Column('character varying', {
    name: 'customer_email',
    length: 200,
    nullable: false,
  })
  customerEmail: string;
}
