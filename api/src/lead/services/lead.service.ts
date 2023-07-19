import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { LeadDto } from '../dto/lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LeadEntity } from '../entities/lead.entity';
import { Repository, UpdateResult } from 'typeorm';

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

  async findOne(id: string): Promise<LeadEntity> {
    const lead = await this.leadRepository.findOneBy({ id });
    if (!lead) {
      throw new NotFoundException();
    }
    return lead;
  }

  async create(leadDto: Partial<LeadDto>): Promise<LeadEntity> {
    const leadEntity = this.leadRepository.create(leadDto);
    this.logger.log('Trying to create lead -> ' + JSON.stringify(leadEntity));

    return await this.leadRepository.save(leadEntity);
  }

  async update(id: string, leadDto: Partial<LeadDto>): Promise<UpdateResult> {
    return await this.leadRepository.update(id, leadDto);
  }

  async delete(id: string): Promise<void> {
    await this.leadRepository.delete(id);
  }
}
