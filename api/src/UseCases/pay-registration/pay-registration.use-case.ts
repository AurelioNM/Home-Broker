import { Injectable, Logger } from "@nestjs/common";
import { LeadService } from "~/Domains/lead/services/lead.service";

@Injectable()
export class PayRegistrationUseCase {
  constructor(
    private readonly leadService: LeadService,
  ) {}

  private readonly logger = new Logger(PayRegistrationUseCase .name);

  async convertLeadIntoCustomer(leadId: string) {
    this.logger.log('Converting Lead into Customer');
    this.logger.debug('Get Lead data json');
    this.logger.debug('Create Customer');
    this.logger.debug('Create Address');

    this.logger.debug('Fill customerId on Lead');
    this.logger.debug('RETURN CustomerID');
  }
}
