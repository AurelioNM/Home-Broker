import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCompanyLeads1688426122262
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public.company_leads (
          id uuid NOT NULL,
          alternativeid bigint NOT NULL GENERATED ALWAYS AS IDENTITY,

          name varchar(255) NOT NULL,
          structure varchar(20) NOT NULL,
          customer_name varchar(255) NOT NULL,
          customer_email varchar(200) NOT NULL,

          createddate timestamp with time zone NOT NULL,
          updateddate timestamp with time zone,
          deleteddate timestamp with time zone,
          
          CONSTRAINT company_leads_name_unique UNIQUE (name)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS public.company_leads;`);
  }
}
