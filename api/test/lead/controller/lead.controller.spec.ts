import { Test, TestingModule } from '@nestjs/testing';
import { LeadController } from '~/lead/api/lead.controller';
import { LeadEntity } from '~/lead/entities/lead.entity';
import { LeadService } from '~/lead/services/lead.service';
import { mockListLead } from '../factory/lead.factory';
import { CreateLeadDto } from '~/lead/dto/create-lead.dto';
import { Response } from '~/common-util/factory-response';

describe('LeadDto Controller - Test', () => {
  let leadController: LeadController;
  let spyLeadService: LeadService;

  const mockLeadService = {
    findAll: jest.fn((dto) => dto),
    findOne: jest.fn((dto) => dto),
    create: jest.fn((dto) => dto),
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

  describe('@Post -> create', () => {
    it('should create a lead', async () => {
      const createLeadDto: CreateLeadDto = {
        name: 'John',
        surname: 'Doe',
        cpf: '12345678900',
        email: 'john.doe@example.com',
      };

      const result = await leadController.create(createLeadDto);
      expect(result).toEqual(createLeadDto);
      expect(spyLeadService.create).toHaveBeenCalledWith(createLeadDto);
    });
  });
});
