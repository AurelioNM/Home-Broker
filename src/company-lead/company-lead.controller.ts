import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CompanyLeadService } from './company-lead.service';
import { CompanyLead } from './company-lead.entity';

@Controller('company-lead')
export class CompanyLeadController {
  constructor(private readonly companyLeadService: CompanyLeadService) {}

  @Get()
  async findAll(): Promise<CompanyLead[]> {
    return this.companyLeadService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CompanyLead> {
    const companyLead = await this.companyLeadService.findOne(id);
    if (!companyLead) {
      throw new NotFoundException('Company Lead does not exist!');
    } else {
      return companyLead;
    }
  }

  @Post()
  async create(@Body() companyLead: CompanyLead): Promise<CompanyLead> {
    return this.companyLeadService.create(companyLead);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() companyLead: CompanyLead,
  ): Promise<any> {
    return this.companyLeadService.update(id, companyLead);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const companyLead = await this.companyLeadService.findOne(id);
    if (!companyLead) {
      throw new NotFoundException('Company Lead does not exist!');
    }
    return this.companyLeadService.delete(id);
  }
}
