import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { AddressEntity } from '~/address/entities/address.entity';
import { BaseEntity } from '~/common-util/base.entity';

@Index('pk_customers', ['id'], { unique: true })
@Entity('customers', { schema: 'public' })
export class CustomerEntity extends BaseEntity {
  @OneToOne(() => AddressEntity, (adress) => adress, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: true,
  })
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: AddressEntity;

  @Column('character varying', {
    name: 'name',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column('character varying', {
    name: 'surname',
    length: 100,
    nullable: false,
  })
  surname: string;

  @Column('character varying', {
    name: 'cpf',
    length: 11,
    nullable: false,
    unique: true,
  })
  cpf: string;

  @Column('character varying', {
    name: 'email',
    length: 200,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column('character varying', {
    name: 'password',
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    name: 'birth_date',
    type: 'time without time zone',
    nullable: false,
  })
  birth_date: Date;

  @Column('character varying', {
    name: 'occupation',
    length: 200,
    nullable: false,
  })
  occupation: string;

  @Column('numeric', {
    name: 'monthly_income',
    precision: 15,
    scale: 2,
    default: 0.0,
  })
  monthly_income: number;
}
