import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentCardService } from './services/payment-card.service';
import { PaymentCardEntity } from './entities/payment_card.entity';
import { PayRegistrationController } from '~/UseCases/pay-registration/api/pay-registration.controller';
import { PayRegistrationUseCase } from '~/UseCases/pay-registration/pay-registration.use-case';
import { PaymentCardValidatorService } from './services/payment-card-validator.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentCardEntity])],
  controllers: [PayRegistrationController],
  providers: [PaymentCardService, PayRegistrationUseCase, PaymentCardValidatorService],
})
export class PaymentCardModule {}
