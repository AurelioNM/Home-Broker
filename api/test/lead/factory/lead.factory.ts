import { generateUUID } from '~/common-util/uuid';
import { CreateLeadDto } from '~/lead/dto/create-lead.dto';
import { GetLeadDto } from '~/lead/dto/get-lead.dto';
import { LeadDataDto } from '~/lead/dto/lead-data.dto';
import { LeadEntity } from '~/lead/entities/lead.entity';

export const mockListGetLeadDto = (): GetLeadDto[] => {
  const leadList: GetLeadDto[] = [];

  for (let i = 1; i <= 3; i++) {
    const lead: GetLeadDto = new GetLeadDto();

    lead.id = generateUUID();
    lead.createddate = new Date(new Date().toUTCString());
    lead.customerId = null;
    lead.data = {
      cpf: `153-995-492-6${i}`,
      name: `Lead ${i}`,
      email: `leadtest${i}@gmail.com`,
      surname: 'Test',
    };

    leadList.push(lead);
  }

  return leadList;
};

export const mockOneCreateLeadDto = (): CreateLeadDto => {
  const createLeadDto: CreateLeadDto = new CreateLeadDto();
  createLeadDto.cpf = '434-583-434-65';
  createLeadDto.email = 'fakelead@gmail.com';
  createLeadDto.name = 'Fake';
  createLeadDto.surname = 'Lead';

  return createLeadDto;
};

export const mockOneLeadEntity = (): LeadEntity => {
  const lead: LeadEntity = new LeadEntity();
  lead.id = generateUUID();
  lead.createddate = new Date(new Date().toUTCString());
  lead.customerId = null;
  lead.data = {
    cpf: '153-995-492-61',
    name: 'Agnaldo',
    email: 'agnaldo@gmail.com',
    surname: 'Pereira',
  };

  return lead;
};

export const mockListLeadEntity = (): LeadEntity[] => {
  const leadList: LeadEntity[] = [];

  for (let i = 1; i <= 3; i++) {
    const lead: LeadEntity = new LeadEntity();

    lead.id = generateUUID();
    lead.createddate = new Date(new Date().toUTCString());
    lead.customerId = null;

    const leadDataDto: LeadDataDto = new LeadDataDto();
    leadDataDto.cpf = `153-995-492-6${i}`;
    leadDataDto.name = `Lead ${i}`;
    leadDataDto.surname = 'Test';
    leadDataDto.email = `leadData@gmail.com`;

    lead.data = leadDataDto;

    leadList.push(lead);
  }

  return leadList;
};
