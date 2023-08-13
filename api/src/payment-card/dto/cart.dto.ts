import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CartDto {
  @ApiProperty({ example: 150.00 })
  @Expose()
  @IsNotEmpty()
  total: number;
}
