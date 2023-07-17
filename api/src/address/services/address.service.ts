import { Injectable } from '@nestjs/common';
import { AddressDto } from '../dto/address.dto';

@Injectable()
export class AddressService {
  create(createAddressDto: AddressDto) {
    return 'This action adds a new address';
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, addressDto: Partial<AddressDto>) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
