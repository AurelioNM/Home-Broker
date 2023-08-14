import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateLeadDto } from '../../../Controllers/lead/dtos/create-lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LeadEntity } from '../entities/lead.entity';
import { Repository } from 'typeorm';
import { LeadExceptionEnum } from '../exceptions/lead.exceptions';
import { LeadDataDto } from '../../../Controllers/lead/dtos/lead-data.dto';
import { ExceptionConstants } from '~/Common/exceptions-constants';
import { GetLeadDto } from '../../../Controllers/lead/dtos/get-lead.dto';
import { CustomerEntity } from '~/Domains/customer/entities/customer.entity';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(LeadEntity)
    private leadRepository: Repository<LeadEntity>,
  ) {}

  private readonly logger = new Logger(LeadService.name);

  async findAll(): Promise<LeadEntity[]> {
    return this.leadRepository.find();
  }

  async findById(id: string): Promise<LeadEntity> {
    const lead = await this.leadRepository.findOneBy({ id });
    if (!lead) {
      this.logger.warn('Lead not found');
      throw new NotFoundException(LeadExceptionEnum.LEAD_NOT_FOUND);
    }
    return lead;
  }

  async create(createLeadDto: Partial<CreateLeadDto>): Promise<LeadEntity> {
    await this.validateIfEmailIsTaken(createLeadDto.email);

    const leadEntity = this.leadRepository.create({
      data: createLeadDto,
    });
    this.logger.log('Creating lead -> ' + JSON.stringify(leadEntity));

    return await this.leadRepository.save(leadEntity);
  }

  async validateIfEmailIsTaken(email: string): Promise<void> {
    const result = await this.leadRepository.query(`
      SELECT COUNT(*)
      FROM leads
      WHERE data ->> 'email' = '${email}'
      AND deleteddate IS NULL
      LIMIT 1;
    `);
    if (result[0].count > 0) {
      this.logger.warn('Email is taken -> ' + email);
      throw new BadRequestException(LeadExceptionEnum.LEAD_EMAIL_ALREADY_EXIST);
    }
  }

  async updateLeadDataJson(
    id: string,
    leadDataDto: LeadDataDto,
  ): Promise<GetLeadDto> {
    this.validateFieldsSize(leadDataDto);

    let leadEntity = await this.findById(id);
    leadEntity = this.mergeCurrentDataWithNewData(leadDataDto, leadEntity);

    return await this.leadRepository.save(leadEntity);
  }

  private validateFieldsSize(leadDataDto: LeadDataDto): void {
    if (Object.keys(leadDataDto).length === 0) {
      this.logger.warn('No fields to update');
      throw new BadRequestException(ExceptionConstants.NO_FIELDS_TO_UPDATE);
    }
  }

  private mergeCurrentDataWithNewData(
    leadDataDto: LeadDataDto,
    leadEntity: LeadEntity,
  ): LeadEntity {
    this.logger.debug('Current info -> ' + JSON.stringify(leadEntity.data));
    this.logger.debug('Info to update -> ' + JSON.stringify(leadDataDto));

    leadEntity.data = {
      ...leadDataDto,
      ...leadEntity.data,
    };
    this.logger.debug('Data after merge -> ' + JSON.stringify(leadEntity.data));

    return leadEntity;
  }

  async convertLeadIntoCustomer(leadId: string) {
    this.logger.debug('Get Lead data json');
    this.logger.debug('Create Customer');
    this.logger.debug('Create Address');

    this.logger.debug('Fill customerId on Lead');
    this.logger.debug('RETURN CustomerID');
  }
}
