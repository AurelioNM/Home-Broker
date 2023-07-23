import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from '~/common-util/base-dto';

export class CreateLeadDto {
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
}
