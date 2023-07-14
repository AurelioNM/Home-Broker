import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export abstract class BaseDto {
  @Expose()
  id?: string;

  @ApiHideProperty()
  @Exclude()
  alternativeid?: number;

  @Expose()
  createddate?: Date;

  @ApiHideProperty()
  @Exclude()
  updateddate?: Date;

  @ApiHideProperty()
  @Exclude()
  deleteddate?: Date;
}
