import { Module } from '@nestjs/common';
import { LeadService } from './services/lead.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadEntity } from './entities/lead.entity';
import { LeadRegistrationController } from '~/UseCases/lead-registration/api/lead-registration.controller';
import { LeadRegistrationUseCase } from '~/UseCases/lead-registration/lead-registration.use-case';
import { LeadValidatorService } from './services/lead-validator.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeadEntity])],
  controllers: [LeadRegistrationController],
  providers: [LeadService, LeadRegistrationUseCase, LeadValidatorService],
})
export class LeadModule {}
