import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsObject } from 'class-validator';
import { PaymentCardDto } from './payment-card.dto';
import { CartDto } from './cart.dto';

export class MakePaymentDto {
  @ApiProperty({})
  @Expose()
  @IsNotEmpty()
  @IsObject()
  @Type(() => CartDto)
  cart: CartDto;

  @ApiProperty({})
  @Expose()
  @IsNotEmpty()
  @IsObject()
  @Type(() => PaymentCardDto)
  paymentCard?: PaymentCardDto;
}
