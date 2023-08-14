import { CompanyLeadDto } from '~/Controllers/company-lead/dtos/company-lead-dto';
import { CompanyLeadEntity } from '~/Domains/company-lead/entities/company-lead.entity';

export const mockOneCompanyLead = (): CompanyLeadEntity => {
  const companyLead: CompanyLeadEntity = new CompanyLeadEntity();
  companyLead.id = '123';
  companyLead.name = 'New Company';
  companyLead.structure = 'LLC';
  companyLead.customerName = 'New Company Customer';
  companyLead.customerEmail = 'email@test.com';

  return companyLead;
};

export const mockOneCompanyLeadDto = (): CompanyLeadDto => {
  const companyLead: CompanyLeadDto = new CompanyLeadDto();
  companyLead.id = '123';
  companyLead.name = 'New Company';
  companyLead.structure = 'LLC';
  companyLead.customerName = 'New Company Customer';
  companyLead.customerEmail = 'email@test.com';

  return companyLead;
};

export const mockOneCompanyLeadWithId = (id: string): CompanyLeadEntity => {
  const companyLead: CompanyLeadEntity = new CompanyLeadEntity();
  companyLead.id = id;
  companyLead.name = 'New Company';
  companyLead.structure = 'LLC';
  companyLead.customerName = 'New Company Customer';
  companyLead.customerEmail = 'email@test.com';

  return companyLead;
};

export const mockListCompanyLeadEntity = (): CompanyLeadEntity[] => {
  const companyLeadList: CompanyLeadEntity[] = [];

  for (let i = 1; i <= 3; i++) {
    const companyLead: CompanyLeadEntity = new CompanyLeadEntity();
    companyLead.name = `New Company${i}`;
    companyLead.structure = 'LLC';
    companyLead.customerName = `New Company Customer${i}`;
    companyLead.customerEmail = `email${i}@test.com`;

    companyLeadList.push(companyLead);
  }

  return companyLeadList;
};
