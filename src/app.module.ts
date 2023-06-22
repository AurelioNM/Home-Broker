import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyLeadModule } from './company-lead/company-lead.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './config/typeorm.config';
import typeOrmConfigTest from './config/typeorm-config-test';
import typeOrmConfig from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [
        process.env.NODE_ENV === 'test' ? typeOrmConfigTest : typeOrmConfig,
      ],
    }),
    CompanyLeadModule,
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === 'test' ? typeOrmConfigTest() : typeormConfig(),
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
