import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCustomers1689632910247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE public.customers (
            id uuid PRIMARY KEY,
            alternativeid bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
            address_id uuid UNIQUE,

            name varchar(100) NOT NULL,
            surname varchar(100) NOT NULL,
            cpf varchar(11) UNIQUE NOT NULL,
            email varchar(200) UNIQUE NOT NULL,
            password varchar(255) NOT NULL,
            birth_date DATE NOT NULL,
            occupation varchar(200) NOT NULL,
            monthly_income DECIMAL(15, 2) DEFAULT 0.0,

            createddate timestamp with time zone NOT NULL,
            updateddate timestamp with time zone,
            deleteddate timestamp with time zone,

            CONSTRAINT fk_customer_address FOREIGN KEY (address_id) REFERENCES public.address (id)
          );

          CREATE INDEX idx_customer_cpf ON customers(cpf);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS public.customers;`);
  }
}
