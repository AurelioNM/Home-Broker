import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyLeadEntity } from '../entities/company-lead.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CompanyLeadDto } from '../dto/company-lead-dto';
import { CompanyLeadExceptionEnum } from '../exceptions/company-lead.exceptions';

@Injectable()
export class CompanyLeadService {
  constructor(
    @InjectRepository(CompanyLeadEntity)
    private companyLeadRepository: Repository<CompanyLeadEntity>,
  ) {}

  private readonly logger = new Logger(CompanyLeadService.name);

  async findAll(): Promise<CompanyLeadEntity[]> {
    return this.companyLeadRepository.find();
  }

  async findOne(id: string): Promise<CompanyLeadEntity> {
    const companyLead = await this.companyLeadRepository.findOneBy({ id });
    if (!companyLead) {
      throw new NotFoundException(
        CompanyLeadExceptionEnum.COMPANY_LEAD_NOT_FOUND,
      );
    }
    return companyLead;
  }

  async create(
    companyLeadDto: Partial<CompanyLeadDto>,
  ): Promise<CompanyLeadEntity> {
    const companyLead = await this.companyLeadRepository.findOneBy({
      name: companyLeadDto.name,
    });
    if (companyLead) {
      throw new BadRequestException(
        CompanyLeadExceptionEnum.COMPANY_LEAD_ALREADY_EXIST,
      );
    }

    const companyLeadEntity = this.companyLeadRepository.create(companyLeadDto);
    this.logger.log(
      'Trying to create CompanyLead -> ' + JSON.stringify(companyLeadEntity),
    );

    return await this.companyLeadRepository.save(companyLeadEntity);
  }

  async update(
    id: string,
    companyLeadDto: Partial<CompanyLeadDto>,
  ): Promise<UpdateResult> {
    return await this.companyLeadRepository.update(id, companyLeadDto);
  }

  async delete(id: string): Promise<void> {
    await this.companyLeadRepository.delete(id);
  }
}
