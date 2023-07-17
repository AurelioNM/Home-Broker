import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import typeOrmConfigTest from './config/typeorm-config-test';
import typeOrmConfig from './config/typeorm.config';
import { CompanyLeadModule } from './company-lead/company-lead.module';
import { AuthModule } from './auth/authy.module';
import { CacheModule } from '@nestjs/cache-manager';
import { tokenConfiguration } from './config/tokenConfig';
import { CustomerModule } from './customer/customer.module';
import { AddressModule } from './address/address.module';

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
  ],
})
export class AppModule {}
