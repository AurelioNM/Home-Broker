import { Test, TestingModule } from '@nestjs/testing';
import { LeadController } from '~/Domain/lead/api/lead.controller';
import { LeadEntity } from '~/Domain/lead/entities/lead.entity';
import { LeadService } from '~/Domain/lead/services/lead.service';
import {
  mockListGetLeadDto,
  mockOneCreateLeadDto,
  mockOneGetLeadDto,
  mockOneLeadEntity,
} from '../factory/lead.factory';
import { CreateLeadDto } from '~/Domain/lead/dto/create-lead.dto';
import { GetLeadDto } from '~/Domain/lead/dto/get-lead.dto';
import { LeadDataDto } from '~/Domain/lead/dto/lead-data.dto';

describe('LeadDto Controller - Test', () => {
  let leadController: LeadController;
  let spyLeadService: LeadService;

  const mockLeadService = {
    findAll: jest.fn((dto) => dto),
    findById: jest.fn((dto) => dto),
    create: jest.fn((dto) => dto),
    updateLeadData: jest.fn((dto) => dto),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [LeadController],
      providers: [
        LeadService,
        {
          provide: LeadService,
          useValue: mockLeadService,
        },
      ],
    }).compile();

    leadController = moduleRef.get<LeadController>(LeadController);
    spyLeadService = moduleRef.get<LeadService>(LeadService);
  });

  describe('@Get -> findAll', () => {
    it('should return an array of Leads', async () => {
      const leads: GetLeadDto[] = mockListGetLeadDto();
      mockLeadService.findAll.mockReturnValue(leads);

      const result = await leadController.findAll();

      expect(result).toEqual(leads);
      expect(spyLeadService.findAll).toHaveBeenCalled();
    });
  });

  describe('@Get -> findById', () => {
    it('should return a Lead by ID', async () => {
      const lead: LeadEntity = mockOneLeadEntity();
      const leadId = '7d8c3e55-1ee7-492a-bf3e-cbc0b1b77b86';

      mockLeadService.findById.mockReturnValue(lead);

      const result = await leadController.findById(leadId);

      expect(result).toEqual(lead);
      expect(spyLeadService.findById).toHaveBeenCalledWith(leadId);
    });
  });

  describe('@Post -> create', () => {
    it('should create a new Lead', async () => {
      const lead: LeadEntity = mockOneLeadEntity();
      const createLeadDto: CreateLeadDto = mockOneCreateLeadDto();

      mockLeadService.create.mockReturnValue(lead);

      const result = await leadController.create(createLeadDto);

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
