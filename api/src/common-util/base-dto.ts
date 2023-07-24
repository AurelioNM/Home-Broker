import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export abstract class BaseDto {
  @ApiProperty({ example: '4032597f-1765-44db-ad08-f6f0a096efc9' })
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
