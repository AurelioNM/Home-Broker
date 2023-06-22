import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyLead } from './company-lead.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyLeadService {
  constructor(
    @InjectRepository(CompanyLead)
    private companyLeadRepository: Repository<CompanyLead>,
  ) {}

  async findAll(): Promise<CompanyLead[]> {
    return this.companyLeadRepository.find();
  }

  async findOne(id: string): Promise<CompanyLead> {
    return this.companyLeadRepository.findOne({ where: { id } });
  }

  async create(companyLead: Partial<CompanyLead>): Promise<CompanyLead> {
    const newCompanyLead = this.companyLeadRepository.create(companyLead);
    return this.companyLeadRepository.save(newCompanyLead);
  }

  async update(
    id: string,
    companyLead: Partial<CompanyLead>,
  ): Promise<CompanyLead> {
    await this.companyLeadRepository.update(id, companyLead);
    return this.companyLeadRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.companyLeadRepository.delete(id);
  }
}
