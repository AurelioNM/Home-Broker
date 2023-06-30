import { Exclude } from 'class-transformer';

export abstract class BaseDto {
  id?: string;

  @Exclude()
  alternativeid?: number;

  createddate?: Date;

  @Exclude()
  updateddate?: Date;

  @Exclude()
  deleteddate?: Date;
}
