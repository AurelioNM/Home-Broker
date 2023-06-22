import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyLeadModule } from './company-lead/company-lead.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfigTest from './config/typeorm-config-test';
import typeOrmConfig from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRoot(typeOrmConfig()),
    CompanyLeadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
