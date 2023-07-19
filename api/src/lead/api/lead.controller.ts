import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Response } from '~/common-util/factory-response';
import { AuthAuthenticated } from '~/auth/decorators/auth-authenticated.decorators';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LeadService } from '../services/lead.service';
import { LeadDto } from '../dto/lead.dto';

@AuthAuthenticated()
@ApiTags('lead')
@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @ApiOkResponse({ type: LeadDto, isArray: true })
  @Get()
  async getAll(): Promise<LeadDto[]> {
    const leads = await this.leadService.findAll();
    return Response.factory(LeadDto, leads) as unknown as LeadDto[];
  }

  @ApiOkResponse({ type: LeadDto })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<LeadDto> {
    const lead = await this.leadService.findOne(id);
    return Response.factory(LeadDto, lead);
  }

  @ApiOkResponse({ type: LeadDto })
  @Post()
  async create(@Body() leadDto: LeadDto): Promise<LeadDto> {
    const lead = this.leadService.create(leadDto);
    return Response.factory(LeadDto, lead);
  }

  @ApiOkResponse({ type: LeadDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() leadDto: LeadDto,
  ): Promise<LeadDto> {
    await this.leadService.update(id, leadDto);
    const leadUpdated = await this.leadService.findOne(id);

    return Response.factory(LeadDto, leadUpdated);
  }

  @ApiOkResponse()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.leadService.findOne(id);
    return this.leadService.delete(id);
  }
}
