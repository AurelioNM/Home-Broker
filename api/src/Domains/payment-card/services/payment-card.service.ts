import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentCardEntity } from '../entities/payment_card.entity';
import { PaymentCardDto } from '~/UseCases/pay-registration/api/dtos/payment-card.dto';

@Injectable()
export class PaymentCardService {
  constructor(
    @InjectRepository(PaymentCardEntity)
    private paymentCardRepository: Repository<PaymentCardEntity>,
  ) {}

  private readonly logger = new Logger(PaymentCardService.name);

  async create(paymentCardPto: PaymentCardDto): Promise<PaymentCardEntity> {
    const paymentCardEntity = this.paymentCardRepository.create(paymentCardPto);
    this.logger.log('Creating lead -> ' + JSON.stringify(paymentCardEntity));

    return await this.paymentCardRepository.save(paymentCardEntity);
  }
}
