import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyLead } from '../entities/company-lead.entity';
import { Repository } from 'typeorm';
import { CompanyLeadDto } from '../dto/company-lead-dto';

@Injectable()
export class CompanyLeadService {
  constructor(
    @InjectRepository(CompanyLead)
    private companyLeadRepository: Repository<CompanyLead>,
  ) {}

  private readonly logger = new Logger(CompanyLeadService.name)

  async findAll(): Promise<CompanyLeadDto> {
    try {
      const companyLeads = await this.companyLeadRepository.find();
      return CompanyLeadDto.factory(CompanyLeadDto, companyLeads);
    } catch(error) {

    }
  }

  async findOne(id: string): Promise<CompanyLeadDto> {
    try {
      const companyLead = await this.companyLeadRepository.findOne({
        where: { id },
      });
      return CompanyLeadDto.factory(CompanyLeadDto, companyLead) as CompanyLeadDto;
    } catch(error) {

    }
  }

  async create(
    companyLeadDto: Partial<CompanyLeadDto>,
  ): Promise<CompanyLeadDto> {
    try {
      const newCompanyLead = this.companyLeadRepository.create(companyLeadDto);
      const companyLead = await this.companyLeadRepository.save(newCompanyLead);
      this.logger.log("CompanyLead created");
      return CompanyLeadDto.factory(CompanyLeadDto, companyLead);
    } catch(error) {

    }
  }

  async update(
    id: string,
    companyLeadDto: Partial<CompanyLead>,
  ): Promise<CompanyLeadDto> {
    try {
      await this.companyLeadRepository.update(id, companyLeadDto);
      const companyLeadUpdated = await this.companyLeadRepository.findOne({
        where: { id },
      });
      return CompanyLeadDto.factory(CompanyLeadDto, companyLeadUpdated);
    } catch(error) {

    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.companyLeadRepository.delete(id);
    } catch(error) {

    }
  }
}
