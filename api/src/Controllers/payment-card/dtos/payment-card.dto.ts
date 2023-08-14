import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentCardDto{
  @ApiProperty({ example: '3745 3749 8938 2738' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  number?: string;

  @ApiProperty({ example: 'Rogerinho Marrento' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  ownerName?: string;

  @ApiProperty({ example: '05/31' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  expiryDate?: string;

  @ApiProperty({ example: '534' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  cvv?: string;

  @ApiProperty({ example: 'Mastercard' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  brand?: string;
}
