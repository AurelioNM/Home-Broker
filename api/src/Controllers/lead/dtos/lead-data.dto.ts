import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { AddressDto } from '~/Controllers/customer/dtos/address.dto';

export class LeadDataDto {
  @ApiProperty({ example: 'name' })
  @Expose()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'surname' })
  @Expose()
  @IsOptional()
  @IsString()
  surname?: string;

  @ApiProperty({ example: 'cpf' })
  @Expose()
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiProperty({ example: 'email' })
  @Expose()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: 'password' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ example: 'birth_date' })
  @Expose()
  @IsOptional()
  @IsString()
  birth_date?: Date;

  @ApiProperty({ example: 'occupation' })
  @Expose()
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiProperty({ example: 'monthly_income' })
  @Expose()
  @IsOptional()
  @IsNumber()
  monthly_income?: number;

  @ApiProperty({
    example: {
      cep: '13165-000',
      state: 'Narnia',
      city: 'Rio de Janeiro',
      district: 'Gavea',
      street: 'Street name',
      number: '21-A',
      complement: 'Next to Padaria Jose',
    },
  })
  @Expose()
  @IsOptional()
  @Type(() => AddressDto)
  address?: AddressDto;
}
