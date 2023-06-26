import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyLead } from './company-lead.entity';
import { Repository } from 'typeorm';
import { CompanyLeadDto } from './dto/company-lead-dto';

@Injectable()
export class CompanyLeadService {
  constructor(
    @InjectRepository(CompanyLead)
    private companyLeadRepository: Repository<CompanyLead>,
  ) {}

  async findAll(): Promise<CompanyLeadDto> {
    const companyLeads = await this.companyLeadRepository.find();
    return CompanyLeadDto.factory(CompanyLeadDto, companyLeads);
  }

  async findOne(id: string): Promise<CompanyLeadDto> {
    const companyLead = await this.companyLeadRepository.findOne({
      where: { id },
    });
    return CompanyLeadDto.factory(CompanyLeadDto, companyLead);
  }

  async create(
    companyLeadDto: Partial<CompanyLeadDto>,
  ): Promise<CompanyLeadDto> {
    const newCompanyLead = this.companyLeadRepository.create(companyLeadDto);
    const companyLead = await this.companyLeadRepository.save(newCompanyLead);
    return CompanyLeadDto.factory(CompanyLeadDto, companyLead);
  }

  async update(
    id: string,
    companyLeadDto: Partial<CompanyLead>,
  ): Promise<CompanyLeadDto> {
    await this.companyLeadRepository.update(id, companyLeadDto);
    const companyLeadUpdated = await this.companyLeadRepository.findOne({
      where: { id },
    });
    return CompanyLeadDto.factory(CompanyLeadDto, companyLeadUpdated);
  }

  async delete(id: string): Promise<void> {
    await this.companyLeadRepository.delete(id);
  }
}
