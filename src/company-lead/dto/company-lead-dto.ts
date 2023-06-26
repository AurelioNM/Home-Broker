import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { BaseDto } from '~/common/dto/base-dto';

export class CompanyLeadDto extends BaseDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  structure: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  customerEmail: string;
}
