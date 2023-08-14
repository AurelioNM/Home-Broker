import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { AddressEntity } from '../entities/address.entity';
import { AddressDto } from '../../../Controllers/customer/dtos/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
  ) {}

  private readonly logger = new Logger(AddressService.name);

  async findAll(): Promise<AddressEntity[]> {
    return this.addressRepository.find();
  }

  async findOne(id: string): Promise<AddressEntity> {
    const address = await this.addressRepository.findOneBy({ id });
    if (!address) {
      throw new NotFoundException();
    }
    return address;
  }

  async create(addressDto: Partial<AddressDto>): Promise<AddressEntity> {
    const addressEntity = this.addressRepository.create(addressDto);
    this.logger.log(
      'Trying to create address -> ' + JSON.stringify(addressEntity),
    );

    return await this.addressRepository.save(addressEntity);
  }

  async update(
    id: string,
    addressDto: Partial<AddressDto>,
  ): Promise<UpdateResult> {
    return await this.addressRepository.update(id, addressDto);
  }

  async delete(id: string): Promise<void> {
    await this.addressRepository.delete(id);
  }
}
