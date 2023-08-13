import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '~/Domains/common-util/base.entity';

@Index('pk_address', ['id'], { unique: true })
@Entity('address', { schema: 'public' })
export class AddressEntity extends BaseEntity {
  @Column('character varying', {
    name: 'cep',
    length: 10,
    nullable: false,
  })
  cep: string;

  @Column('character varying', {
    name: 'state',
    length: 100,
    nullable: false,
  })
  state: string;

  @Column('character varying', {
    name: 'city',
    length: 100,
    nullable: false,
  })
  city: string;

  @Column('character varying', {
    name: 'district',
    length: 100,
    nullable: true,
  })
  district?: string;

  @Column('character varying', {
    name: 'street',
    length: 100,
    nullable: false,
  })
  street: string;

  @Column('character varying', {
    name: 'number',
    length: 20,
    nullable: true,
  })
  number?: string;

  @Column('character varying', {
    name: 'complement',
    length: 100,
    nullable: true,
  })
  complement?: string;
}
