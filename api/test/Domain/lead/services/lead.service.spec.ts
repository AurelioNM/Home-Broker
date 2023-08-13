// Need to create unit tests for lead.service
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LeadEntity } from '~/Domain/lead/entities/lead.entity';
import { LeadService } from '~/Domain/lead/services/lead.service';
import {
  mockListLeadEntity,
  mockOneCreateLeadDto,
  mockOneLeadEntity,
} from '../factory/lead.factory';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { LeadExceptionEnum } from '~/Domain/lead/exceptions/lead.exceptions';
import { CreateLeadDto } from '~/Domain/lead/dto/create-lead.dto';
import { LeadDataDto } from '~/Domain/lead/dto/lead-data.dto';
import { generateUUID } from '~/common-util/uuid';
import { ExceptionConstants } from '~/common-util/exceptions-constants';

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
    findById: jest.fn((entity) => entity),
    create: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    update: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
    query: jest.fn((entity) => entity),
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
      const lead: LeadEntity = mockOneLeadEntity();

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

  describe('isEmailTaken', () => {
    it('should throw BadRequestException if email is taken', async () => {
      mockLeadRepository.query.mockResolvedValueOnce([{ count: 1 }]);

      const email = 'test@example.com';
      await expect(leadService.validateIfEmailIsTaken(email)).rejects.toThrow(
        new BadRequestException(LeadExceptionEnum.LEAD_EMAIL_ALREADY_EXIST),
      );
      expect(mockLeadRepository.query).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe('create', () => {
    it('should create one LeadEntity', async () => {
      const createLeadDto: CreateLeadDto = mockOneCreateLeadDto();

      const result: LeadEntity = await leadService.create(createLeadDto);

      expect(result.data.cpf).toBe(createLeadDto.cpf);
      expect(result.data.email).toBe(createLeadDto.email);
      expect(result.data.name).toBe(createLeadDto.name);
      expect(result.data.surname).toBe(createLeadDto.surname);

      expect(mockLeadRepository.create).toBeCalledTimes(1);
      expect(mockLeadRepository.save).toBeCalledTimes(1);
    });
  });

  describe('validateFieldsSize', () => {
    it('should throw BadRequestException if leadDataDto has no properties', async () => {
      const leadDataDto = new LeadDataDto();

      expect(() => leadService['validateFieldsSize'](leadDataDto)).toThrowError(
        new BadRequestException(ExceptionConstants.NO_FIELDS_TO_UPDATE),
      );
    });

    it('should not throw BadRequestException when leadDataDto has properties', () => {
      const leadDataDto: LeadDataDto = { name: 'John', surname: 'Doe' };

      expect(() =>
        leadService['validateFieldsSize'](leadDataDto),
      ).not.toThrowError(BadRequestException);
    });
  });

  describe('mergeCurrentDataWithNewData', () => {
    it('should merge current data with new data', () => {
      const leadDataDto: LeadDataDto = { name: 'John', surname: 'Doe' };
      const leadEntity: LeadEntity = new LeadEntity();
      leadEntity.data = {
        email: 'john@test.com',
      };

      const result = leadService['mergeCurrentDataWithNewData'](
        leadDataDto,
        leadEntity,
      );

      expect(result.data.name).toBe(leadDataDto.name);
      expect(result.data.surname).toBe(leadDataDto.surname);
      expect(result.data).toHaveProperty('email');
    });
  });

  // describe('updateLeadDataJson', () => {
  //   it('should update lead data json', async () => {
  //     const id = generateUUID();
  //     const leadDataDto: LeadDataDto = { name: 'John', surname: 'Doe' };
  //     const leadEntity: LeadEntity = new LeadEntity();
  //     leadEntity.data = {
  //       email: 'test@gmail.com',
  //     };

  //     const result = await leadService['updateLeadDataJson'](id, leadDataDto);

  //     expect(result.data.name).toBe(leadDataDto.name);
  //     expect(result.data.surname).toBe(leadDataDto.surname);
  //     expect(result.data).toHaveProperty('email');
  //   });
  // });
});
