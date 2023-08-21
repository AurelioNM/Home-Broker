import { Injectable, Logger } from "@nestjs/common";
import { LeadService } from "~/Domains/lead/services/lead.service";
import { MakePaymentDto } from "./api/dtos/make-payment-dto.dto";
import { PaymentCardValidatorService } from "~/Domains/payment-card/services/payment-card-validator.service";
import { LeadConverterService } from "~/Domains/lead/services/lead-converter.service";

@Injectable()
export class PayRegistrationUseCase {
  constructor(
    private readonly leadService: LeadService,
    private readonly paymentCardValidatorService: PaymentCardValidatorService,
    private readonly leadConverterService: LeadConverterService,
  ) {}

  private readonly logger = new Logger(PayRegistrationUseCase .name);

  async payRegistration(leadId: string, makePaymentDto: MakePaymentDto) {
    const lead = await this.leadService.findById(leadId);
    this.paymentCardValidatorService.isPaymentCardValid(makePaymentDto.paymentCard)

    const addressId = await this.leadConverterService.convertLeadToAddress(lead.data);
    const customerId = await this.leadConverterService.convertLeadToCustomer(lead.data, addressId);
    this.leadService.fillCustomerId(lead, customerId);

    this.logger.log('return customerID/token');
  }
}
