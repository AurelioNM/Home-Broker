import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateLeadDto } from '~/UseCases/lead-registration/api/dtos/create-lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LeadEntity } from '../entities/lead.entity';
import { Repository } from 'typeorm';
import { LeadExceptionEnum } from '../exceptions/lead.exceptions';
import { LeadDataDto } from '~/UseCases/lead-registration/api/dtos/lead-data.dto';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(LeadEntity)
    private leadRepository: Repository<LeadEntity>,
  ) {}

  private readonly logger = new Logger(LeadService.name);

  async findById(id: string): Promise<LeadEntity> {
    const lead = await this.leadRepository.findOneBy({ id });
    if (!lead) {
      this.logger.warn('Lead not found');
      throw new NotFoundException(LeadExceptionEnum.LEAD_NOT_FOUND);
    }
    return lead;
  }

  async createLeadEntity(createLeadDto: Partial<CreateLeadDto>): Promise<LeadEntity> {
    const leadEntity = this.leadRepository.create({
      data: createLeadDto,
    });
    this.logger.log('Creating lead -> ' + JSON.stringify(leadEntity));

    return this.persistLeadEntity(leadEntity);
  }

  async persistLeadEntity(leadEntity: LeadEntity): Promise<LeadEntity> {
    return await this.leadRepository.save(leadEntity);
  }

  mergeCurrentLeadDataWithNewData(
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
}
