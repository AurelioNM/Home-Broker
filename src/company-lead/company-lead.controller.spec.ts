import { Test, TestingModule } from '@nestjs/testing';
import { CompanyLeadController } from './company-lead.controller';

describe('CompanyLeadController', () => {
  let controller: CompanyLeadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyLeadController],
    }).compile();

    controller = module.get<CompanyLeadController>(CompanyLeadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
