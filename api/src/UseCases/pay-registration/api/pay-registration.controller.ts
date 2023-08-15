import { Body, Controller, Post } from '@nestjs/common';
import { Response } from '~/Common/factory-response';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaymentCardService } from '~/Domains/payment-card/services/payment-card.service';
import { MakePaymentDto } from './dtos/make-payment-dto.dto';
import { PaymentResponseDto } from './dtos/payment-response.dto';

// @AuthAuthenticated()
@ApiTags('pay-registration')
@Controller('pay-registration')
export class PayRegistrationController {
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
