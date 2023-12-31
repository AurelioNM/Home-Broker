import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LeadEntity } from '~/Domains/lead/entities/lead.entity';
import { LeadModule } from '~/Domains/lead/lead.module';
import { LeadService } from '~/Domains/lead/services/lead.service';

describe('LeadModule', () => {
  it('should compile the AppModule', async () => {
    const module = await Test.createTestingModule({
      providers: [
        LeadModule,
        LeadService,
        {
          provide: getRepositoryToken(LeadEntity),
          useValue: {},
        },
      ],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(LeadService)).toBeInstanceOf(LeadService);
  });
});
