import { BadRequestException, Injectable, Logger, } from '@nestjs/common'; import { InjectRepository } from '@nestjs/typeorm';
import { LeadEntity } from '../entities/lead.entity';
import { Repository } from 'typeorm';
import { LeadExceptionEnum } from '../exceptions/lead.exceptions';
import { LeadDataDto } from '../../../UseCases/lead-registration/api/dtos/lead-data.dto';
import { ExceptionConstants } from '~/Common/exceptions-constants';

@Injectable()
export class LeadValidatorService {
  constructor(
    @InjectRepository(LeadEntity)
    private leadRepository: Repository<LeadEntity>,
  ) {}

  private readonly logger = new Logger(LeadValidatorService.name);

  validateFieldsSize(leadDataDto: LeadDataDto): void {
    const fieldsToUpdateSize = Object.keys(leadDataDto)
      .filter(key => leadDataDto[key] !== undefined).length

    if (fieldsToUpdateSize == 0) {
      this.logger.warn('No fields to update');
      throw new BadRequestException(ExceptionConstants.NO_FIELDS_TO_UPDATE);
    }
  }

  async validateIfEmailIsTaken(email: string): Promise<void> {
    if (await this.isEmailIsTaken(email)) {
      this.logger.warn('Email is taken -> ' + email);
      throw new BadRequestException(LeadExceptionEnum.LEAD_EMAIL_ALREADY_EXIST);
    }
  }

  private async isEmailIsTaken(email: string): Promise<boolean> {
    const result = await this.leadRepository.query(`
      SELECT COUNT(*)
      FROM leads
      WHERE data ->> 'email' = '${email}'
      AND deleteddate IS NULL
      LIMIT 1;
    `);
    this.logger.warn('Result: ' + JSON.stringify(result));
    this.logger.warn('Return: ' + (result[0].count > 0));
    return result[0].count > 0;
  }
}
