import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentResponseDto {
  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  CustomerId: string;

  @ApiProperty({})
  @Expose()
  @IsString()
  @IsNotEmpty()
  token: string;
}
