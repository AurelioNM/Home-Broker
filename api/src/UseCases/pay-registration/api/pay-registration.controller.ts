import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { Response } from '~/Common/factory-response';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MakePaymentDto } from './dtos/make-payment-dto.dto';
import { PaymentResponseDto } from './dtos/payment-response.dto';
import { PayRegistrationUseCase } from '../pay-registration.use-case';

// @AuthAuthenticated()
@ApiTags('pay-registration')
@Controller('pay-registration')
export class PayRegistrationController {
  constructor(private readonly payRegistrationUseCase: PayRegistrationUseCase) {}

  @ApiOkResponse({ type: PaymentResponseDto })
  @Post(':leadId')
  async pay(
    @Param('leadId', ParseUUIDPipe) leadId: string,
    @Body() makePaymentDto: MakePaymentDto,
  ): Promise<PaymentResponseDto> {
    const paymentResponse = this.payRegistrationUseCase.payRegistration(leadId, makePaymentDto);
    return Response.factory(PaymentResponseDto, paymentResponse);
  }
}
