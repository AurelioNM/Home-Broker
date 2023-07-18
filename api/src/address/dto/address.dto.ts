import { BaseDto } from '~/common-util/base-dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsString()
  district?: string;

  @ApiProperty({ example: 'street' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ example: 'number' })
  @Expose()
  @IsString()
  number?: string;

  @ApiProperty({ example: 'complement' })
  @Expose()
  @IsString()
  complement?: string;
}
