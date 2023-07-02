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
import { CompanyLeadService } from '../services/company-lead.service';
import { CompanyLeadDto } from '../dto/company-lead-dto';

@Controller('company-lead')
export class CompanyLeadController {
  constructor(private readonly companyLeadService: CompanyLeadService) {}

  @Get()
  async findAll(): Promise<CompanyLeadDto> {
    return this.companyLeadService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CompanyLeadDto> {
    const companyLead = await this.companyLeadService.findOne(id);
    if (!companyLead) {
      throw new NotFoundException('Company Lead does not exist!');
    } else {
      return companyLead;
    }
  }

  @Post()
  async create(
    @Body() companyLeadDto: CompanyLeadDto,
  ): Promise<CompanyLeadDto> {
    return this.companyLeadService.create(companyLeadDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() companyLeadDto: CompanyLeadDto,
  ): Promise<CompanyLeadDto> {
    return this.companyLeadService.update(id, companyLeadDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    const companyLead = await this.companyLeadService.findOne(id);
    if (!companyLead) {
      throw new NotFoundException('Company Lead does not exist!');
    }
    return this.companyLeadService.delete(id);
  }
}
