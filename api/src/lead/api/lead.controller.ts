import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Response } from '~/common-util/factory-response';
import { AuthAuthenticated } from '~/auth/decorators/auth-authenticated.decorators';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LeadService } from '../services/lead.service';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { GetLeadDto } from '../dto/get-lead.dto copy';

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
  async findById(@Param('id') id: string): Promise<GetLeadDto> {
    const lead = await this.leadService.findById(id);
    return Response.factory(GetLeadDto, lead);
  }

  @ApiOkResponse({ type: CreateLeadDto })
  @Post()
  async create(@Body() createLeadDto: CreateLeadDto): Promise<CreateLeadDto> {
    const lead = this.leadService.create(createLeadDto);
    return Response.factory(CreateLeadDto, lead) as CreateLeadDto;
  }
}
