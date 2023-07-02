import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '~/utils-common/dto/base-dto';

export class CompanyLeadDto extends BaseDto {
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
