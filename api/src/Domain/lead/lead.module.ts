import { Module } from '@nestjs/common';
import { LeadService } from './services/lead.service';
import { LeadController } from './api/lead.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadEntity } from './entities/lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeadEntity])],
  controllers: [LeadController],
  providers: [LeadService],
})
export class LeadModule {}
