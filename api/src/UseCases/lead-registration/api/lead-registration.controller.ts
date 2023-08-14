import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Response } from '~/Common/factory-response';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LeadService } from '~/Domains/lead/services/lead.service';
import { CreateLeadDto } from './dtos/create-lead.dto';
import { GetLeadDto } from './dtos/get-lead.dto';
import { LeadDataDto } from './dtos/lead-data.dto';
import { LeadRegistrationUseCase } from '../lead-registration.use-case';

// @AuthAuthenticated()
@ApiTags('lead')
@Controller('lead')
export class LeadRegistrationController {
  constructor(private readonly leadRegistrationUseCase: LeadRegistrationUseCase) {}

  @ApiOkResponse({ type: GetLeadDto })
  @Get(':id')
  async getLeadById(@Param('id', ParseUUIDPipe) id: string): Promise<GetLeadDto> {
    const lead = await this.leadRegistrationUseCase.getLeadInfoById(id);
    return Response.factory(GetLeadDto, lead);
  }

  @ApiOkResponse({ type: CreateLeadDto })
  @Post()
  async createLead(@Body() createLeadDto: CreateLeadDto): Promise<GetLeadDto> {
    const lead = this.leadRegistrationUseCase.createLeadRegistration(createLeadDto);
    return Response.factory(GetLeadDto, lead);
  }

  @ApiOkResponse({ type: GetLeadDto })
  @Patch(':id')
  async updateLead(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() leadDataDto: LeadDataDto,
  ): Promise<GetLeadDto> {
    const lead = await this.leadRegistrationUseCase.updateLeadRegistration(id, leadDataDto);
    return Response.factory(GetLeadDto, lead);
  }
}
