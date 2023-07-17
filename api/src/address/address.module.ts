import { Module } from '@nestjs/common';
import { AddressService } from './services/address.service';

@Module({
  providers: [AddressService],
})
export class AddressModule {}
