import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryColumn,
  BaseEntity as TypeOrmBaseEntity,
  UpdateDateColumn,
} from 'typeorm';
import { generateUUID } from '../utils';

export class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryColumn('uuid', {
    primary: true,
    name: 'id',
  })
  id: string = generateUUID();

  @Generated('increment')
  @Column({
    type: 'bigint',
    name: 'alternativeid',
  })
  alternativeid: number;

  @CreateDateColumn({
    name: 'createddate',
    type: 'time with time zone',
  })
  createddate = new Date(new Date().toUTCString());

  @UpdateDateColumn({
    name: 'updatedate',
    nullable: true,
    type: 'time with time zone',
  })
  updateddate?: Date;

  @DeleteDateColumn({
    name: 'deletedate',
    nullable: true,
    type: 'time with time zone',
  })
  deletedate?: Date;
}
