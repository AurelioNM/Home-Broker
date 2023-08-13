import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import typeOrmConfigTest from './Config/typeorm-config-test';
import typeOrmConfig from './Config/typeorm.config';
import { CompanyLeadModule } from './Domain/company-lead/company-lead.module';
import { AuthModule } from './Auth/authy.module';
import { CacheModule } from '@nestjs/cache-manager';
import { tokenConfiguration } from './Config/tokenConfig';
import { CustomerModule } from './Domain/customer/customer.module';
import { AddressModule } from './address/address.module';
import { LeadModule } from './Domain/lead/lead.module';
import { PaymentCardModule } from './Domain/payment-card/payment-card.module';

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
    CompanyLeadModule,
    CustomerModule,
    AddressModule,
    LeadModule,
    PaymentCardModule,
  ],
})
export class AppModule {}
