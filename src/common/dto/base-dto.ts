import { Exclude } from 'class-transformer';

export abstract class BaseDto {
  id?: string;

  createddate?: Date;

  @Exclude()
  alternativeid?: number;

  @Exclude()
  updateddate?: Date;

  @Exclude()
  deleteddate?: Date;
}
