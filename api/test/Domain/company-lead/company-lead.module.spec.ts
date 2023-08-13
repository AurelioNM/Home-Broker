import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyLeadModule } from '~/Domain/company-lead/company-lead.module';
import { CompanyLeadEntity } from '~/Domain/company-lead/entities/company-lead.entity';
import { CompanyLeadService } from '~/Domain/company-lead/services/company-lead.service';

describe('CompanyLeadModule', () => {
  it('should compile the AppModule', async () => {
    const module = await Test.createTestingModule({
      providers: [
        CompanyLeadModule,
        CompanyLeadService,
        {
          provide: getRepositoryToken(CompanyLeadEntity),
          useValue: {},
        },
      ],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(CompanyLeadService)).toBeInstanceOf(CompanyLeadService);
  });
});
