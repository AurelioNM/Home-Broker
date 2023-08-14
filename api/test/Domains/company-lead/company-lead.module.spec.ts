import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyLeadModule } from '~/Domains/company-lead/company-lead.module';
import { CompanyLeadEntity } from '~/Domains/company-lead/entities/company-lead.entity';
import { CompanyLeadService } from '~/Domains/company-lead/services/company-lead.service';

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
