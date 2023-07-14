import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyLeadService } from '~/company-lead/services/company-lead.service';
import { CompanyLeadEntity } from '~/company-lead/entities/company-lead.entity';
import { mockListCompanyLead } from '../factory/company-lead.factory';

describe('CompanyLeadService - test', () => {
  let companyLeadService: CompanyLeadService;

  const createQueryBuilder = jest.fn(() => ({
    execute: jest.fn().mockReturnThis(),
  }));

  const mockCompanyLeadRepository = {
    find: jest.fn((entity) => entity),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyLeadService,
        {
          provide: getRepositoryToken(CompanyLeadEntity),
          useValue: mockCompanyLeadRepository,
        },
      ],
    }).compile();

    companyLeadService = module.get<CompanyLeadService>(CompanyLeadService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of CompanyLead', async () => {
      const companyLeadList: CompanyLeadEntity[] = mockListCompanyLead();

      mockCompanyLeadRepository.find.mockReturnValue(companyLeadList);
      const companyLeadSimulated = await companyLeadService.findAll();

      expect(companyLeadSimulated).toBe(companyLeadList);
      expect(companyLeadSimulated).toHaveLength(3);
      expect(mockCompanyLeadRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});
