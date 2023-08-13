import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '~/Common/base-dto';

export class CompanyLeadDto extends BaseDto {
  @ApiProperty({ example: 'Fake Company' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'LLC' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  structure: string;

  @ApiProperty({ example: 'Fake Customer' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @ApiProperty({ example: 'fake@gmail.com' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  customerEmail: string;
}
