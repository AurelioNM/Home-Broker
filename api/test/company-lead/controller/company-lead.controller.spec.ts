import { Test, TestingModule } from '@nestjs/testing';
import { CompanyLeadDto } from '~/company-lead/dto/company-lead-dto';
import { CompanyLeadController } from '~/company-lead/api/company-lead.controller';
import { CompanyLeadEntity } from '~/company-lead/entities/company-lead.entity';
import { CompanyLeadService } from '~/company-lead/services/company-lead.service';
import { Response } from '~/common-util/factory-response';
import { mockListCompanyLead } from '../factory/company-lead.factory';

describe('CompanyLeadController - Test', () => {
  let companyLeadController: CompanyLeadController;
  let spyCompanyLeadService: CompanyLeadService;

  const mockCompanyLeadService = {
    findAll: jest.fn((dto) => dto),
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

  describe('@Get -> getAll', () => {
    it('should get all CompanyLeads', async () => {
      const companyLeadList: CompanyLeadEntity[] = mockListCompanyLead();

      const listDto = Response.factory(
        CompanyLeadDto,
        companyLeadList,
      ) as unknown as CompanyLeadDto[];

      mockCompanyLeadService.findAll.mockResolvedValue(listDto);
      const listResult = await companyLeadController.getAll();

      expect(spyCompanyLeadService.findAll).toBeCalled();
      listResult.forEach((result) => {
        const dtoFiltered = listDto.filter((value) => value.id === result.id);

        dtoFiltered.forEach((value) => {
          expect(value.name).toBe(result.name);
          expect(value.structure).toBe(result.structure);
          expect(value.customerName).toBe(result.customerName);
          expect(value.customerEmail).toBe(result.customerEmail);
        });
      });
    });
  });
});
