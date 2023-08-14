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
import { AuthAuthenticated } from '~/Auth/decorators/auth-authenticated.decorators';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LeadService } from '../../Domains/lead/services/lead.service';
import { CreateLeadDto } from './dtos/create-lead.dto';
import { GetLeadDto } from './dtos/get-lead.dto';
import { LeadDataDto } from './dtos/lead-data.dto';

// @AuthAuthenticated()
@ApiTags('lead')
@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @ApiOkResponse({ type: GetLeadDto, isArray: true })
  @Get()
  async findAll(): Promise<GetLeadDto[]> {
    const leads = await this.leadService.findAll();
    return Response.factory(GetLeadDto, leads) as unknown as GetLeadDto[];
  }

  @ApiOkResponse({ type: GetLeadDto })
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<GetLeadDto> {
    const lead = await this.leadService.findById(id);
    return Response.factory(GetLeadDto, lead);
  }

  @ApiOkResponse({ type: CreateLeadDto })
  @Post()
  async create(@Body() createLeadDto: CreateLeadDto): Promise<GetLeadDto> {
    const lead = this.leadService.create(createLeadDto);
    return Response.factory(GetLeadDto, lead);
  }

  @ApiOkResponse({ type: GetLeadDto })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() leadDataDto: LeadDataDto,
  ): Promise<GetLeadDto> {
    const lead = await this.leadService.updateLeadDataJson(id, leadDataDto);
    return Response.factory(GetLeadDto, lead);
  }
}
