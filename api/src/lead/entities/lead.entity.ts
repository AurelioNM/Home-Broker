import { Column, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '~/common-util/base.entity';
import { CustomerEntity } from '~/customer/entities/customer.entity';
import { LeadDto } from '../dto/lead.dto';

export class LeadEntity extends BaseEntity {
  @OneToOne(() => CustomerEntity, (adress) => adress, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: true,
  })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer?: CustomerEntity;

  @Column('jsonb', { name: 'data' })
  data: LeadDto;
}
