import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentCardEntity } from '../entities/payment_card.entity';
import { MakePaymentDto } from '~/UseCases/pay-registration/api/dtos/make-payment-dto.dto';
import { PaymentResponseDto } from '~/UseCases/pay-registration/api/dtos/payment-response.dto';
import { PaymentCardDto } from '~/UseCases/pay-registration/api/dtos/payment-card.dto';

@Injectable()
export class PaymentCardService {
  constructor(
    @InjectRepository(PaymentCardEntity)
    private paymentCardRepository: Repository<PaymentCardEntity>,
  ) {}

  private readonly logger = new Logger(PaymentCardService.name);

  async makePayment(
    makePaymentDto: MakePaymentDto,
  ): Promise<PaymentResponseDto> {
    this.logger.log('MakePayment payload -> ' + JSON.stringify(makePaymentDto));
    this.validateCard(makePaymentDto.paymentCard);

    this.logger.log('Conver lead into customer');
    const paymentCardEntity = this.paymentCardRepository.create();
    this.logger.log(
      'Creating payment card -> ' + JSON.stringify(paymentCardEntity),
    );

    // await this.paymentCardRepository.save(paymentCardEntity);
    return new PaymentResponseDto();
  }

  async create(paymentCardPto: PaymentCardDto): Promise<PaymentCardEntity> {
    const paymentCardEntity = this.paymentCardRepository.create(paymentCardPto);
    this.logger.log('Creating lead -> ' + JSON.stringify(paymentCardEntity));

    return await this.paymentCardRepository.save(paymentCardEntity);
  }

  private validateCard(paymentCard: PaymentCardDto): void {
    this.logger.log('Validating Card: ' + JSON.stringify(paymentCard));
  }
}
