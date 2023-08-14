import { Module } from '@nestjs/common';
import { CompanyLeadController } from '../../Controllers/company-lead/company-lead.controller';
import { CompanyLeadService } from './services/company-lead.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyLeadEntity } from './entities/company-lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyLeadEntity])],
  controllers: [CompanyLeadController],
  providers: [CompanyLeadService],
})
export class CompanyLeadModule {}
