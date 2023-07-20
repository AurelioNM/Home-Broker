import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '~/common-util/base.entity';
import { CustomerEntity } from '~/customer/entities/customer.entity';
import { LeadDto } from '../dto/lead.dto';

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

  @Column('jsonb', { name: 'data' })
  data: LeadDto;
}
