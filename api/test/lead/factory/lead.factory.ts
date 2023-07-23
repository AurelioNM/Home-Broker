import { generateUUID } from '~/common-util/uuid';
import { CreateLeadDto } from '~/lead/dto/create-lead.dto';
import { LeadEntity } from '~/lead/entities/lead.entity';

export const mockOneCompanyLead = (): LeadEntity => {
  const lead: LeadEntity = new LeadEntity();
  lead.id = generateUUID();
  lead.data = mockOneCreateLeadDto();

  return lead;
};

export const mockOneCreateLeadDto = (): CreateLeadDto => {
  const createLeadDto: CreateLeadDto = new CreateLeadDto();
  createLeadDto.cpf = '434-583-434-65';
  createLeadDto.email = 'fakelead@gmail.com';
  createLeadDto.name = 'Fake';
  createLeadDto.surname = 'Lead';

  return createLeadDto;
};

export const mockListLead = (): LeadEntity[] => {
  const leadList: LeadEntity[] = [];

  for (let i = 1; i <= 3; i++) {
    const lead: LeadEntity = new LeadEntity();
    const createLeadDto: CreateLeadDto = new CreateLeadDto();
    createLeadDto.cpf = `434-583-434-6${i}`;
    createLeadDto.email = `fakelead${i}@gmail.com`;
    createLeadDto.name = `Fake`;
    createLeadDto.surname = `Lead ${i}`;

    lead.id = generateUUID();
    lead.data = createLeadDto;

    leadList.push(lead);
  }

  return leadList;
};
