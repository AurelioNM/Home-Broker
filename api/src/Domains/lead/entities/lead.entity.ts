import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '~/Domains/common-util/base.entity';
import { CustomerEntity } from '~/Domains/customer/entities/customer.entity';
import { LeadDataDto } from '../dto/lead-data.dto';

@Index('pk_leads', ['id'], { unique: true })
@Entity('leads', { schema: 'public' })
export class LeadEntity extends BaseEntity {
  @OneToOne(() => CustomerEntity, (adress) => adress, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: true,
  })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer?: CustomerEntity;

  @Column('uuid', { name: 'customer_id' })
  customerId?: string;

  @Column('jsonb', { name: 'data' })
  data: LeadDataDto;
}
