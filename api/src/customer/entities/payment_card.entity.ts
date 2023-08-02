import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '~/common-util/base.entity';

@Index('pk_payment_cards', ['id'], { unique: true })
@Entity('payment_cards', { schema: 'public' })
export class PaymentCardEntity extends BaseEntity {
  @Column('character varying', {
    name: 'customer_id',
    length: 50,
    nullable: false,
  })
  customerId: string;

  @Column('character varying', {
    name: 'number',
    length: 20,
    nullable: false,
  })
  number: string;

  @Column('character varying', {
    name: 'name',
    length: 100,
    nullable: false,
  })
  owner_name: string;

  @Column('character varying', {
    name: 'expiry_date',
    length: 5,
    nullable: false,
  })
  expiryDate: string;

  @Column('character varying', {
    name: 'cvv',
    length: 3,
    nullable: false,
  })
  cvv: string;

  @Column('character varying', {
    name: 'brand',
    length: 50,
    nullable: false,
  })
  brand: string;
}
