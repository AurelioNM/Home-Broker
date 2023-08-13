import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterTableCustomersToAddMainPaymentCard1691437008605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `
          ALTER TABLE public.customers ADD CONSTRAINT fk_customer_mainpaymentcard FOREIGN KEY (main_payment_card_id) REFERENCES public.payment_cards (id);
        `
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `
          ALTER TABLE public.customers DROP fk_customer_mainpaymentcard;
        `
      );
    }

}
