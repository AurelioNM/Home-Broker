import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyLeadService } from '~/company-lead/services/company-lead.service';
import { CompanyLeadEntity } from '~/company-lead/entities/company-lead.entity';
import {
  mockListCompanyLeadEntity,
  mockOneCompanyLead,
  mockOneCompanyLeadDto,
} from '../factory/company-lead.factory';
import { generateUUID } from '~/common-util/uuid';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CompanyLeadExceptionEnum } from '~/company-lead/exceptions/company-lead.exceptions';
import { CompanyLeadDto } from '~/company-lead/dto/company-lead-dto';

describe('CompanyLeadService - test', () => {
  let companyLeadService: CompanyLeadService;

  const createQueryBuilder = jest.fn(() => ({
    execute: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
  }));

  const mockCompanyLeadRepository = {
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
      const companyLeadList: CompanyLeadEntity[] = mockListCompanyLeadEntity();

      mockCompanyLeadRepository.find.mockReturnValue(companyLeadList);
      const resultList = await companyLeadService.findAll();

      expect(resultList).toBe(companyLeadList);
      expect(resultList).toHaveLength(3);
      expect(mockCompanyLeadRepository.find).toBeCalled();
    });
  });

  describe('findOne', () => {
    it('should return one CompanyLead', async () => {
      const companyLead: CompanyLeadEntity = mockOneCompanyLead();
      mockCompanyLeadRepository.findOneBy.mockReturnValue(companyLead);

      const result = await companyLeadService.findOne(companyLead.id);

      expect(result).toBe(companyLead);
      expect(mockCompanyLeadRepository.findOneBy).toBeCalled();
    });

    it('should throw NotFoundException', async () => {
      const uuid: string = generateUUID();
      mockCompanyLeadRepository.findOneBy.mockReturnValue(null);

      await expect(companyLeadService.findOne(uuid)).rejects.toThrow(
        new NotFoundException(CompanyLeadExceptionEnum.COMPANY_LEAD_NOT_FOUND),
      );
      expect(mockCompanyLeadRepository.findOneBy).toBeCalled();
    });
  });

  describe('create', () => {
    it('should create one CompanyLead', async () => {
      const companyLeadDto: CompanyLeadDto = mockOneCompanyLeadDto();

      mockCompanyLeadRepository.findOneBy.mockReturnValue(null);

      const result: CompanyLeadEntity = await companyLeadService.create(
        companyLeadDto,
      );

      expect(result.name).toBe(companyLeadDto.name);
      expect(result.structure).toBe(companyLeadDto.structure);
      expect(result.customerName).toBe(companyLeadDto.customerName);
      expect(result.customerEmail).toBe(companyLeadDto.customerEmail);

      expect(mockCompanyLeadRepository.findOneBy).toBeCalled();
      expect(mockCompanyLeadRepository.create).toBeCalled();
      expect(mockCompanyLeadRepository.save).toBeCalled();
    });

    it('should throw NotFoundException when CompanyLead name already exists', async () => {
      const companyLead: CompanyLeadEntity = mockOneCompanyLead();
      const companyLeadDto: CompanyLeadDto = mockOneCompanyLeadDto();
      mockCompanyLeadRepository.findOneBy.mockReturnValue(companyLead);

      await expect(companyLeadService.create(companyLeadDto)).rejects.toThrow(
        new BadRequestException(
          CompanyLeadExceptionEnum.COMPANY_LEAD_ALREADY_EXIST,
        ),
      );

      expect(mockCompanyLeadRepository.findOneBy).toBeCalled();
    });
  });

  describe('create', () => {
    it('should create a new CompanyLead', async () => {
      const companyLeadDto: CompanyLeadDto = mockOneCompanyLeadDto();
      const companyLead: CompanyLeadEntity = mockOneCompanyLead();

      mockCompanyLeadRepository.findOneBy.mockResolvedValueOnce(null);
      mockCompanyLeadRepository.create.mockReturnValueOnce(companyLead);
      mockCompanyLeadRepository.save.mockResolvedValueOnce(companyLead);

      const result = await companyLeadService.create(companyLeadDto);

      expect(mockCompanyLeadRepository.findOneBy).toHaveBeenCalledWith({
        name: companyLeadDto.name,
      });
      expect(mockCompanyLeadRepository.create).toHaveBeenCalledWith(
        companyLeadDto,
      );
      expect(mockCompanyLeadRepository.save).toHaveBeenCalledWith(companyLead);
      expect(result).toBeInstanceOf(CompanyLeadEntity);
      expect(result).toBe(companyLead);
    });

    it('should throw an exception if CompanyLead already exists', async () => {
      const companyLeadDto: CompanyLeadDto = mockOneCompanyLeadDto();
      const existingCompanyLead: CompanyLeadEntity = mockOneCompanyLead();

      mockCompanyLeadRepository.findOneBy.mockResolvedValueOnce(
        existingCompanyLead,
      );

      await expect(companyLeadService.create(companyLeadDto)).rejects.toThrow(
        new BadRequestException(
          CompanyLeadExceptionEnum.COMPANY_LEAD_ALREADY_EXIST,
        ),
      );
      expect(mockCompanyLeadRepository.findOneBy).toHaveBeenCalledWith({
        name: companyLeadDto.name,
      });
      expect(mockCompanyLeadRepository.create).not.toHaveBeenCalled();
      expect(mockCompanyLeadRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update the CompanyLead', async () => {
      const companyLeadDto: Partial<CompanyLeadDto> = {
        id: generateUUID(),
        name: 'Updated Company Lead',
      };

      mockCompanyLeadRepository
        .createQueryBuilder()
        .execute.mockReturnValueOnce({ affected: 1 });

      await companyLeadService.update(companyLeadDto.id, companyLeadDto);

      expect(mockCompanyLeadRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a company lead by id', async () => {
      const id = generateUUID();

      await companyLeadService.delete(id);

      expect(mockCompanyLeadRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
