import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryColumn,
  BaseEntity as TypeOrmBaseEntity,
  UpdateDateColumn,
} from 'typeorm';
import { generateUUID } from '../uuid';

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
    name: 'updateddate',
    nullable: true,
    type: 'time with time zone',
  })
  updateddate?: Date;

  @DeleteDateColumn({
    name: 'deleteddate',
    nullable: true,
    type: 'time with time zone',
  })
  deletedate?: Date;
}
