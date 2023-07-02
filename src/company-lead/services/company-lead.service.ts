import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyLead } from '../entities/company-lead.entity';
import { Repository } from 'typeorm';
import { CompanyLeadDto } from '../dto/company-lead-dto';
import { Response } from '~/utils-common/factory-response';
import { CompanyLeadExceptionEnum } from '../exceptions/company-lead.exceptions';

@Injectable()
export class CompanyLeadService {
  constructor(
    @InjectRepository(CompanyLead)
    private companyLeadRepository: Repository<CompanyLead>,
  ) {}

  private readonly logger = new Logger(CompanyLeadService.name);

  async findAll(): Promise<CompanyLeadDto> {
    const companyLeads = await this.companyLeadRepository.find();
    return Response.factory(CompanyLeadDto, companyLeads);
  }

  async findOne(id: string): Promise<CompanyLeadDto> {
    const companyLead = await this.companyLeadRepository.findOne({
      where: { id },
    });

    return Response.factory(CompanyLeadDto, companyLead) as CompanyLeadDto;
  }

  async create(
    companyLeadDto: Partial<CompanyLeadDto>,
  ): Promise<CompanyLeadDto> {
    const companyLead = await this.companyLeadRepository.findOne({
      where: { name: companyLeadDto.name },
    });
    if (companyLead) {
      throw new BadRequestException(
        CompanyLeadExceptionEnum.USER_ALREADY_EXIST,
      );
    }

    const companyLeadEntity = this.companyLeadRepository.create(companyLeadDto);
    const companyLeadSaved = await this.companyLeadRepository.save(
      companyLeadEntity,
    );
    this.logger.log('CompanyLead created: ', companyLeadSaved.name);

    return Response.factory(CompanyLeadDto, companyLead) as CompanyLeadDto;
  }

  async update(
    id: string,
    companyLeadDto: Partial<CompanyLead>,
  ): Promise<CompanyLeadDto> {
    await this.companyLeadRepository.update(id, companyLeadDto);
    const companyLeadUpdated = await this.companyLeadRepository.findOne({
      where: { id },
    });

    return Response.factory(CompanyLeadDto, companyLeadUpdated);
  }

  async delete(id: string): Promise<void> {
    await this.companyLeadRepository.delete(id);
  }
}
