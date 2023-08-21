import { Injectable, Logger } from '@nestjs/common';
import { PaymentCardDto } from '~/UseCases/pay-registration/api/dtos/payment-card.dto';

@Injectable()
export class PaymentCardValidatorService {

  private readonly logger = new Logger(PaymentCardValidatorService.name);

  isPaymentCardValid(paymentCard: PaymentCardDto): boolean {
    this.logger.log('Validating Card: ' + JSON.stringify(paymentCard));
    return true;
  }
}
