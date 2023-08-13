import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { CustomerDto } from '../dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  private readonly logger = new Logger(CustomerService.name);

  async findAll(): Promise<CustomerEntity[]> {
    return this.customerRepository.find();
  }

  async findOne(id: string): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException();
    }
    return customer;
  }

  async create(customerDto: Partial<CustomerDto>): Promise<CustomerEntity> {
    const addressEntity = this.customerRepository.create(customerDto);
    this.logger.log(
      'Trying to create customer -> ' + JSON.stringify(addressEntity),
    );

    return await this.customerRepository.save(addressEntity);
  }

  async update(
    id: string,
    customerDto: Partial<CustomerDto>,
  ): Promise<UpdateResult> {
    return await this.customerRepository.update(id, customerDto);
  }

  async delete(id: string): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
