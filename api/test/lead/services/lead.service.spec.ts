// Need to create unit tests for lead.service
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LeadEntity } from '~/lead/entities/lead.entity';
import { LeadService } from '~/lead/services/lead.service';
import { mockListLeadEntity } from '../factory/lead.factory';
import { NotFoundException } from '@nestjs/common';
import { LeadExceptionEnum } from '~/lead/exceptions/lead.exceptions';

describe('LeadService - test', () => {
  let leadService: LeadService;

  const createQueryBuilder = jest.fn(() => ({
    execute: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
  }));

  const mockLeadRepository = {
    find: jest.fn((entity) => entity),
    findOneBy: jest.fn((entity) => entity),
    create: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    update: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
    createQueryBuilder,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadService,
        {
          provide: getRepositoryToken(LeadEntity),
          useValue: mockLeadRepository,
        },
      ],
    }).compile();

    leadService = module.get<LeadService>(LeadService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of Lead', async () => {
      const leadList: LeadEntity[] = mockListLeadEntity();

      mockLeadRepository.find.mockReturnValue(leadList);
      const resultList = await leadService.findAll();

      expect(resultList).toBe(leadList);
      expect(resultList).toHaveLength(3);
      expect(mockLeadRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return an array of Lead', async () => {
      const leadList: LeadEntity[] = [];

      mockLeadRepository.find.mockReturnValue(leadList);
      const resultList = await leadService.findAll();

      expect(resultList).toBe(leadList);
      expect(resultList).toHaveLength(0);
      expect(mockLeadRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return one Lead', async () => {
      const lead: LeadEntity = mockListLeadEntity()[0];

      mockLeadRepository.findOneBy.mockReturnValue(lead);
      const result = await leadService.findById(lead.id);

      expect(result).toBe(lead);
      expect(mockLeadRepository.findOneBy).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException', async () => {
      const lead: LeadEntity = mockListLeadEntity()[0];

      mockLeadRepository.findOneBy.mockReturnValue(null);
      await expect(leadService.findById(lead.id)).rejects.toThrowError(
        new NotFoundException(LeadExceptionEnum.LEAD_NOT_FOUND),
      );
      expect(mockLeadRepository.findOneBy).toHaveBeenCalledTimes(1);
    });
  });
});
