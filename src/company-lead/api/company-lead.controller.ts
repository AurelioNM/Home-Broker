import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CompanyLeadService } from '../services/company-lead.service';
import { CompanyLeadDto } from '../dto/company-lead-dto';
import { Response } from '~/utils-common/factory-response';

@Controller('company-lead')
export class CompanyLeadController {
  constructor(private readonly companyLeadService: CompanyLeadService) {}

  @Get()
  async findAll(): Promise<CompanyLeadDto[]> {
    const companyLeads = await this.companyLeadService.findAll();
    return Response.factory(
      CompanyLeadDto,
      companyLeads,
    ) as unknown as CompanyLeadDto[];
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CompanyLeadDto> {
    const companyLead = await this.companyLeadService.findOne(id);
    return Response.factory(CompanyLeadDto, companyLead);
  }

  @Post()
  async create(
    @Body() companyLeadDto: CompanyLeadDto,
  ): Promise<CompanyLeadDto> {
    const companyLead = this.companyLeadService.create(companyLeadDto);
    return Response.factory(CompanyLeadDto, companyLead);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() companyLeadDto: CompanyLeadDto,
  ): Promise<CompanyLeadDto> {
    await this.companyLeadService.update(id, companyLeadDto);
    const companyLeadUpdated = await this.companyLeadService.findOne(id);

    return Response.factory(CompanyLeadDto, companyLeadUpdated);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.companyLeadService.findOne(id);
    return this.companyLeadService.delete(id);
  }
}
