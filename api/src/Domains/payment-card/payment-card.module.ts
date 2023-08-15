import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentCardService } from './services/payment-card.service';
import { PaymentCardEntity } from './entities/payment_card.entity';
import { PayRegistrationController } from '~/UseCases/pay-registration/api/pay-registration.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentCardEntity])],
  controllers: [PayRegistrationController],
  providers: [PaymentCardService],
})
export class PaymentCardModule {}
