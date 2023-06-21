import { Module } from '@nestjs/common';
import { CompanyLeadController } from './company-lead.controller';
import { CompanyLeadService } from './company-lead.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyLead } from './company-lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyLead])],
  controllers: [CompanyLeadController],
  providers: [CompanyLeadService],
})
export class CompanyLeadModule {}
