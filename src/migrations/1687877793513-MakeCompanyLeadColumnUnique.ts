import { query } from "express";
import {MigrationInterface, QueryRunner} from "typeorm";

export class MakeCompanyLeadColumnUnique1687877793513 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `ALTER TABLE company_leads ADD CONSTRAINT unique_company_name UNIQUE (name);`
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `ALTER TABLE company_leads DROP CONSTRAINT unique_company_name;`
      );
    }

}
