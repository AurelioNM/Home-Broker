import { Exclude, Expose } from 'class-transformer';

export abstract class BaseDto {
  @Expose()
  id?: string;

  @Exclude()
  alternativeid?: number;

  @Expose()
  createddate?: Date;

  @Exclude()
  updateddate?: Date;

  @Exclude()
  deleteddate?: Date;
}
