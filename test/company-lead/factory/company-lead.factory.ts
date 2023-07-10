import { CompanyLeadEntity } from '~/company-lead/entities/company-lead.entity';

export const mockOneCompanyLead = (): CompanyLeadEntity => {
  const companyLead: CompanyLeadEntity = new CompanyLeadEntity();
  companyLead.name = 'New Company';
  companyLead.structure = 'LLC';
  companyLead.customerName = 'New Company Customer';
  companyLead.customerEmail = 'email@test.com';

  return companyLead;
};

export const mockListCompanyLead = (): CompanyLeadEntity[] => {
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
