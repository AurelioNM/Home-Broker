import { Test, TestingModule } from '@nestjs/testing';
import { LeadController } from '../../../src/lead/api/lead.controller';
import { LeadService } from '../../../src/lead/services/lead.service';

describe('LeadController', () => {
  let controller: LeadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadController],
      providers: [LeadService],
    }).compile();

    controller = module.get<LeadController>(LeadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
