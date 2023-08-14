import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentCardController } from '../../Controllers/payment-card/payment-card.controller';
import { PaymentCardService } from './services/payment-card.service';
import { PaymentCardEntity } from './entities/payment_card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentCardEntity])],
  controllers: [PaymentCardController],
  providers: [PaymentCardService],
})
export class PaymentCardModule {}
