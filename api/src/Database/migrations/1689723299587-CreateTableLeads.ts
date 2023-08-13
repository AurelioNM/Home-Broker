import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableLeads1689723299587 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              CREATE TABLE public.leads (
                id uuid PRIMARY KEY,
                alternativeid bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
                customer_id uuid UNIQUE,
    
                data jsonb NOT NULL,
    
                createddate timestamp with time zone NOT NULL,
                updateddate timestamp with time zone,
                deleteddate timestamp with time zone,
    
                CONSTRAINT fk_lead_customer FOREIGN KEY (customer_id) REFERENCES public.customers (id)
              );
    
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS public.leads;`);
  }
}
