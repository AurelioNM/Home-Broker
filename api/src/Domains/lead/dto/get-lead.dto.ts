import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsObject, IsUUID } from 'class-validator';
import { BaseDto } from '~/Domains/common-util/base-dto';
import { LeadDataDto } from './lead-data.dto';

export class GetLeadDto extends BaseDto {
  @ApiProperty({ example: '4032597f-1765-44db-ad08-f6f0a096efc9' })
  @Expose()
  @IsUUID()
  customerId?: string;

  @ApiProperty({ example: {} })
  @Expose()
  @IsObject()
  data: LeadDataDto;
}
