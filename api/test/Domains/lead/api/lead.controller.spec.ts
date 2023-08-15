import { Test, TestingModule } from '@nestjs/testing';
import { LeadRegistrationController } from '~/UseCases/lead-registration/api/lead-registration.controller';
import { LeadEntity } from '~/Domains/lead/entities/lead.entity';
import { LeadService } from '~/Domains/lead/services/lead.service';
import {
  mockOneCreateLeadDto,
  mockOneLeadEntity,
} from '../factory/lead.factory';
import { CreateLeadDto } from '~/UseCases/lead-registration/api/dtos/create-lead.dto';

describe('LeadDto Controller - Test', () => {
  let leadController: LeadRegistrationController;
  let spyLeadService: LeadService;

  const mockLeadService = {
    findAll: jest.fn((dto) => dto),
    findById: jest.fn((dto) => dto),
    create: jest.fn((dto) => dto),
    updateLeadData: jest.fn((dto) => dto),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [LeadRegistrationController],
      providers: [
        LeadService,
        {
          provide: LeadService,
          useValue: mockLeadService,
        },
      ],
    }).compile();

    leadController = moduleRef.get<LeadRegistrationController>(LeadRegistrationController);
    spyLeadService = moduleRef.get<LeadService>(LeadService);
  });

  describe('@Get -> findById', () => {
    it('should return a Lead by ID', async () => {
      const lead: LeadEntity = mockOneLeadEntity();
      const leadId = '7d8c3e55-1ee7-492a-bf3e-cbc0b1b77b86';

      mockLeadService.findById.mockReturnValue(lead);

      const result = await leadController.getLeadById(leadId);

      expect(result).toEqual(lead);
      expect(spyLeadService.findById).toHaveBeenCalledWith(leadId);
    });
  });

  describe('@Post -> create', () => {
    it('should create a new Lead', async () => {
      const lead: LeadEntity = mockOneLeadEntity();
      const createLeadDto: CreateLeadDto = mockOneCreateLeadDto();

      mockLeadService.create.mockReturnValue(lead);

      const result = await leadController.createLead(createLeadDto);

      expect(result).toEqual(lead);
      expect(spyLeadService.create).toHaveBeenCalledWith(createLeadDto);
    });
  });

  // describe('@Patch -> update', () => {
  //   it('should update a Lead by ID', async () => {
  //     const id = '7d8c3e55-1ee7-492a-bf3e-cbc0b1b77b86';
  //     const updatedLead: GetLeadDto = mockOneGetLeadDto();
  //     const leadDataDto: LeadDataDto = {
  //       occupation: 'Developer',
  //       monthly_income: 10000,
  //     };
  //     mockLeadService.updateLeadData.mockReturnValue(updatedLead);

  //     const result = await leadController.update(id, leadDataDto);

  //     console.log('Updated lead', JSON.stringify(result));

  //     expect(result.data.monthly_income).toEqual(leadDataDto.monthly_income);
  //     expect(result.data.occupation).toEqual(leadDataDto.occupation);
  //     expect(spyLeadService.updateLeadData).toHaveBeenCalledWith(
  //       id,
  //       leadDataDto,
  //     );
  //   });
  // });
});
