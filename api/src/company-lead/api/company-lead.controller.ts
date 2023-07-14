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
import { Response } from '~/common-util/factory-response';
import { AuthAuthenticated } from '~/auth/decorators/auth-authenticated.decorators';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@AuthAuthenticated()
@ApiTags('companyLead')
@Controller('company-lead')
export class CompanyLeadController {
  constructor(private readonly companyLeadService: CompanyLeadService) {}

  @ApiOkResponse({ type: CompanyLeadDto, isArray: true })
  @Get()
  async getAll(): Promise<CompanyLeadDto[]> {
    const companyLeads = await this.companyLeadService.findAll();
    return Response.factory(
      CompanyLeadDto,
      companyLeads,
    ) as unknown as CompanyLeadDto[];
  }

  @ApiOkResponse({ type: CompanyLeadDto })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CompanyLeadDto> {
    const companyLead = await this.companyLeadService.findOne(id);
    return Response.factory(CompanyLeadDto, companyLead);
  }

  @ApiOkResponse({ type: CompanyLeadDto })
  @Post()
  async create(
    @Body() companyLeadDto: CompanyLeadDto,
  ): Promise<CompanyLeadDto> {
    const companyLead = this.companyLeadService.create(companyLeadDto);
    return Response.factory(CompanyLeadDto, companyLead);
  }

  @ApiOkResponse({ type: CompanyLeadDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() companyLeadDto: CompanyLeadDto,
  ): Promise<CompanyLeadDto> {
    await this.companyLeadService.update(id, companyLeadDto);
    const companyLeadUpdated = await this.companyLeadService.findOne(id);

    return Response.factory(CompanyLeadDto, companyLeadUpdated);
  }

  @ApiOkResponse()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.companyLeadService.findOne(id);
    return this.companyLeadService.delete(id);
  }
}
