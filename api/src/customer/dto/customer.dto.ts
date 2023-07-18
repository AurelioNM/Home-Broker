import { BaseDto } from '~/common-util/base-dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AddressDto } from '~/address/dto/address.dto';

export class CustomerDto extends BaseDto {
  @ApiProperty()
  @Expose()
  @Type(() => AddressDto)
  address?: AddressDto;

  @ApiProperty({ example: 'name' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'surname' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({ example: 'cpf' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @ApiProperty({ example: 'email' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'password' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'birth_date' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  birth_date: Date;

  @ApiProperty({ example: 'occupation' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  occupation: string;

  @ApiProperty({ example: 'monthly_income' })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  monthly_income: number;
}
