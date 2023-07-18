import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAddress1689632876697 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE public.address (
            id uuid PRIMARY KEY,
            alternativeid bigint NOT NULL GENERATED ALWAYS AS IDENTITY,

            cep VARCHAR(10) NOT NULL,
            state VARCHAR(100) NOT NULL,
            city VARCHAR(100) NOT NULL,
            district VARCHAR(100),
            street VARCHAR(100) NOT NULL,
            number VARCHAR(20),
            complement VARCHAR(100),

            createddate timestamp with time zone NOT NULL,
            updateddate timestamp with time zone,
            deleteddate timestamp with time zone
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS public.address;`);
  }
}
