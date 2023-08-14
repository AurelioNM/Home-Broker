import { Module } from '@nestjs/common';
import { LeadService } from './services/lead.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadEntity } from './entities/lead.entity';
import { LeadRegistrationController } from '~/UseCases/lead-registration/api/lead-registration.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LeadEntity])],
  controllers: [LeadRegistrationController],
  providers: [LeadService],
})
export class LeadModule {}
