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

  async findById(id: string): Promise<LeadEntity> {
    const lead = await this.leadRepository.findOneBy({ id });
    if (!lead) {
      throw new NotFoundException();
    }
    return lead;
  }

  async create(leadDto: Partial<LeadDto>): Promise<LeadEntity> {
    this.logger.log('Lead dto -> ' + JSON.stringify(leadDto));

    const result = await this.leadRepository.query(`
      SELECT COUNT(*)
      FROM leads
      WHERE data ->> 'cpf' = '${leadDto.data.cpf}'
      AND deleteddate IS NULL
      LIMIT 1;
    `);

    if (result[0].count > 0) throw new Error('CPF REPETIDO');

    const leadEntity = this.leadRepository.create({
      data: leadDto,
    });
    this.logger.log('Creating lead -> ' + JSON.stringify(leadEntity));

    return await this.leadRepository.save(leadEntity);
  }

  async update(id: string, leadDto: Partial<LeadDto>): Promise<UpdateResult> {
    return await this.leadRepository.update(id, leadDto);
  }

  async delete(id: string): Promise<void> {
    await this.leadRepository.delete(id);
  }
}
