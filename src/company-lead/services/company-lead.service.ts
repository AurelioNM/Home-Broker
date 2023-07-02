import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyLead } from '../entities/company-lead.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CompanyLeadDto } from '../dto/company-lead-dto';
import { CompanyLeadExceptionEnum } from '../exceptions/company-lead.exceptions';

@Injectable()
export class CompanyLeadService {
  constructor(
    @InjectRepository(CompanyLead)
    private companyLeadRepository: Repository<CompanyLead>,
  ) {}

  private readonly logger = new Logger(CompanyLeadService.name);

  async findAll(): Promise<CompanyLead[]> {
    return this.companyLeadRepository.find();
  }

  async findOne(id: string): Promise<CompanyLead> {
    const companyLead = await this.companyLeadRepository.findOneBy({ id });
    if (!companyLead) {
      throw new NotFoundException(
        CompanyLeadExceptionEnum.COMPANY_LEAD_NOT_FOUND,
      );
    }
    return companyLead;
  }

  async create(companyLeadDto: Partial<CompanyLeadDto>): Promise<CompanyLead> {
    const companyLead = await this.companyLeadRepository.findOneBy({
      name: companyLeadDto.name,
    });
    if (companyLead) {
      throw new BadRequestException(
        CompanyLeadExceptionEnum.COMPANY_LEAD_ALREADY_EXIST,
      );
    }

    const companyLeadEntity = this.companyLeadRepository.create(companyLeadDto);
    return await this.companyLeadRepository.save(companyLeadEntity);
  }

  async update(
    id: string,
    companyLeadDto: Partial<CompanyLead>,
  ): Promise<UpdateResult> {
    return await this.companyLeadRepository.update(id, companyLeadDto);
  }

  async delete(id: string): Promise<void> {
    await this.companyLeadRepository.delete(id);
  }
}
