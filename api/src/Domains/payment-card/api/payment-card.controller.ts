import { Body, Controller, Post } from '@nestjs/common';
import { Response } from '~/Domains/common-util/factory-response';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaymentCardService } from '../services/payment-card.service';
import { MakePaymentDto } from '../dto/make-payment-dto.dto';
import { PaymentResponseDto } from '../dto/payment-response.dto';

// @AuthAuthenticated()
@ApiTags('payment')
@Controller('payment')
export class PaymentCardController {
  constructor(private readonly paymentService: PaymentCardService) {}

  @ApiOkResponse({ type: PaymentResponseDto })
  @Post()
  async pay(
    @Body() makePaymentDto: MakePaymentDto,
  ): Promise<PaymentResponseDto> {
    const paymentResponse = this.paymentService.makePayment(makePaymentDto);
    return Response.factory(PaymentResponseDto, paymentResponse);
  }
}
