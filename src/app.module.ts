import { Module } from '@nestjs/common';
import { CompanyLeadModule } from './company-lead/company-lead.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfigTest from './config/typeorm-config-test';
import typeOrmConfig from './config/typeorm.config';

@Module({
  imports: [
    //ConfigModule.forRoot({
    //  envFilePath: '.env',
    //  isGlobal: true,
    //  load: [
    //    process.env.NODE_ENV === 'test' ? typeOrmConfigTest : typeOrmConfig,
    //  ],
    //}),
    CompanyLeadModule,
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === 'test' ? typeOrmConfigTest() : typeOrmConfig(),
    ),
  ],
})
export class AppModule {}
