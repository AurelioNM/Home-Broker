import { Test, TestingModule } from '@nestjs/testing';
import { CompanyLeadService } from '../../src/company-lead/services/company-lead.service';

describe('CompanyLeadService', () => {
  let service: CompanyLeadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyLeadService],
    }).compile();

    service = module.get<CompanyLeadService>(CompanyLeadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
