import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LeadEntity } from '../entities/lead.entity';
import { Repository, UpdateResult } from 'typeorm';
import { LeadExceptionEnum } from '../exceptions/lead.exceptions';

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
}
