import { Module } from '@nestjs/common';
import { CompanyLeadModule } from './company-lead/company-lead.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import typeOrmConfigTest from './config/typeorm-config-test';
import typeOrmConfig from './config/typeorm.config';

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
    CompanyLeadModule,
  ],
})
export class AppModule {}
