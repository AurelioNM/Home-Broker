import { Test, TestingModule } from '@nestjs/testing';
import { CompanyLeadDto } from '~/company-lead/dto/company-lead-dto';
import { CompanyLeadController } from '~/company-lead/api/company-lead.controller';
import { CompanyLeadEntity } from '~/company-lead/entities/company-lead.entity';
import { CompanyLeadService } from '~/company-lead/services/company-lead.service';
import { Response } from '~/common-util/factory-response';
import {
  mockListCompanyLead,
  mockOneCompanyLead,
  mockOneCompanyLeadWithId,
} from '../factory/company-lead.factory';
import { generateUUID } from '~/common-util/uuid';

describe('CompanyLeadController - Test', () => {
  let companyLeadController: CompanyLeadController;
  let spyCompanyLeadService: CompanyLeadService;

  const mockCompanyLeadService = {
    findAll: jest.fn((dto) => dto),
    findOne: jest.fn((dto) => dto),
    create: jest.fn((dto) => dto),
    update: jest.fn((dto) => dto),
    delete: jest.fn((dto) => dto),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CompanyLeadController],
      providers: [
        CompanyLeadService,
        {
          provide: CompanyLeadService,
          useValue: mockCompanyLeadService,
        },
      ],
    }).compile();

    companyLeadController = moduleRef.get<CompanyLeadController>(
      CompanyLeadController,
    );
    spyCompanyLeadService =
      moduleRef.get<CompanyLeadService>(CompanyLeadService);
  });

  describe('@Get -> findAll', () => {
    it('should get all CompanyLeads', async () => {
      const companyLeadList: CompanyLeadEntity[] = mockListCompanyLead();

      const listDto = Response.factory(
        CompanyLeadDto,
        companyLeadList,
      ) as unknown as CompanyLeadDto[];

      mockCompanyLeadService.findAll.mockResolvedValue(companyLeadList);
      const listResult = await companyLeadController.findAll();

      expect(spyCompanyLeadService.findAll).toBeCalled();
      listResult.forEach((result) => {
        const dtoFiltered = listDto.filter((value) => value.id === result.id);

        dtoFiltered.forEach((value) => {
          expect(result.name).toBe(value.name);
          expect(result.structure).toBe(value.structure);
          expect(result.customerName).toBe(value.customerName);
          expect(result.customerEmail).toBe(value.customerEmail);
        });
      });
    });
  });
});
