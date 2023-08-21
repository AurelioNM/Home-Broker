import { Injectable, Logger } from '@nestjs/common';
import { LeadDataDto } from '~/UseCases/lead-registration/api/dtos/lead-data.dto';

@Injectable()
export class LeadConverterService {

  private readonly logger = new Logger(LeadConverterService.name);

  async convertLeadToAddress(leadDataDto: LeadDataDto): Promise<string> {
    return 'customerId';
  }

  async convertLeadToCustomer(leadDataDto: LeadDataDto, addressId: string): Promise<string> {
    return 'customerId';
  }
}
