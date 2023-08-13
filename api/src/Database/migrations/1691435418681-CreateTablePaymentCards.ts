import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTablePaymentCards1691435418681 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE public.payment_cards (
            id uuid PRIMARY KEY,
            alternativeid bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
            customer_id uuid UNIQUE NOT NULL,

            last_digits int NOT NULL,
            owner_name varchar(100) NOT NULL,
            expiry_date varchar(5) NOT NULL,
            cvv varchar(3) NOT NULL,
            brand varchar(50) NOT NULL,

            createddate timestamp with time zone NOT NULL,
            updateddate timestamp with time zone,
            deleteddate timestamp with time zone,

            CONSTRAINT fk_paymentcard_customer FOREIGN KEY (customer_id) REFERENCES public.customers (id)
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS public.payment_cards;`);
  }
}
