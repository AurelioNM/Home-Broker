import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { AddressDto } from '~/address/dto/address.dto';
import { BaseDto } from '~/common-util/base-dto';
import { CustomerDto } from '~/customer/dto/customer.dto';

export class LeadDto extends BaseDto {
  @ApiProperty({
    example: {
      name: 'Agnaldo',
      surname: 'Pereira',
      cpf: '153-995-492-61',
      email: 'agnaldo@gmail.com',
      birth_date: '1993-09-03',
      occupation: 'Angular Developer',
      monthly_income: 1500.0,
      address: {
        cep: '13165-000',
        state: 'Narnia',
        city: 'Rio de Janeiro',
        district: 'Gavea',
        street: 'Street name',
        number: '21-A',
        complement: 'Next to Padaria Jose',
      },
    },
  })
  @Type(() => CustomerDto)
  @IsOptional()
  customer: CustomerDto;
}
