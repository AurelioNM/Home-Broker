import { Injectable, Logger } from "@nestjs/common";
import { LeadEntity } from "~/Domains/lead/entities/lead.entity";
import { LeadService } from "~/Domains/lead/services/lead.service";
import { LeadDataDto } from "./api/dtos/lead-data.dto";
import { CreateLeadDto } from "./api/dtos/create-lead.dto";
import { LeadValidatorService } from "~/Domains/lead/services/lead-validator.service";

@Injectable()
export class LeadRegistrationUseCase {
  constructor(
    private readonly leadService: LeadService,
    private readonly leadValidatorService: LeadValidatorService,
  ) {}

  private readonly logger = new Logger(LeadRegistrationUseCase.name);

  async getAllLeadsInfo(): Promise<LeadEntity[]> {
    this.logger.log('Getting all Leads info by id');
    return await this.leadService.findAll();
  }

  async getLeadInfoById(id: string): Promise<LeadEntity> {
    this.logger.log('Getting Lead info by id');
    return await this.leadService.findById(id);
  }

  async createLeadRegistration(createLeadDto: CreateLeadDto): Promise<LeadEntity> {
    await this.leadValidatorService.validateIfEmailIsTaken(createLeadDto.email);

    this.logger.log('Creating Lead registration');
    return await this.leadService.createLeadEntity(createLeadDto);
  }

  async updateLeadRegistration(id: string, leadDataDto: LeadDataDto): Promise<LeadEntity> {
    this.logger.log('Updating registration of Lead: ' + id);
    this.leadValidatorService.validateFieldsSize(leadDataDto);

    let leadEntity = await this.leadService.findById(id);
    leadEntity = this.leadService.mergeCurrentLeadDataWithNewData(leadDataDto, leadEntity);

    return this.leadService.persistLeadEntity(leadEntity);
  }
}
