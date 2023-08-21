import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import typeOrmConfigTest from './Config/typeorm-config-test';
import typeOrmConfig from './Config/typeorm.config';
import { AuthModule } from './Auth/authy.module';
import { CacheModule } from '@nestjs/cache-manager';
import { tokenConfiguration } from './Config/tokenConfig';
import { CustomerModule } from './Domains/customer/customer.module';
import { AddressModule } from './Domains/address/address.module';
import { LeadModule } from './Domains/lead/lead.module';
import { PaymentCardModule } from './Domains/payment-card/payment-card.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === 'test' ? typeOrmConfigTest() : typeOrmConfig(),
    ),
    AuthModule,
    CacheModule.register(tokenConfiguration()),
    CustomerModule,
    AddressModule,
    LeadModule,
    // PaymentCardModule,
  ],
})
export class AppModule {}
