import { Module } from '@nestjs/common';
import { CompanyLeadController } from './api/company-lead.controller';
import { CompanyLeadService } from './services/company-lead.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyLead } from './entities/company-lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyLead])],
  controllers: [CompanyLeadController],
  providers: [CompanyLeadService],
})
export class CompanyLeadModule {}
