import { BaseDto } from '~/Common/base-dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddressDto extends BaseDto {
  @ApiProperty({ example: 'cep' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  cep: string;

  @ApiProperty({ example: 'state' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ example: 'city' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: 'district' })
  @Expose()
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({ example: 'street' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ example: 'number' })
  @Expose()
  @IsOptional()
  @IsString()
  number?: string;

  @ApiProperty({ example: 'complement' })
  @Expose()
  @IsOptional()
  @IsString()
  complement?: string;
}
