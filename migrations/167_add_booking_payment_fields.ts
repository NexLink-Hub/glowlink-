import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBookingPaymentFields1670000000000 implements MigrationInterface {
  name = "AddBookingPaymentFields1670000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE bookings
      ADD COLUMN IF NOT EXISTS total_amount_cents bigint NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS deposit_payment_intent_id character varying(255),
      ADD COLUMN IF NOT EXISTS completion_payment_intent_id character varying(255),
      ADD COLUMN IF NOT EXISTS cancellation_payment_intent_id character varying(255),
      ADD COLUMN IF NOT EXISTS deposit_paid boolean NOT NULL DEFAULT false,
      ADD COLUMN IF NOT EXISTS completion_paid boolean NOT NULL DEFAULT false,
      ADD COLUMN IF NOT EXISTS cancellation_paid boolean NOT NULL DEFAULT false;`);

    await queryRunner.query(`ALTER TABLE providers ADD COLUMN IF NOT EXISTS stripe_connected_account_id character varying(255);`);
    await queryRunner.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_customer_id character varying(255);`);

    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_bookings_deposit_intent ON bookings(deposit_payment_intent_id);`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_bookings_completion_intent ON bookings(completion_payment_intent_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE bookings
      DROP COLUMN IF EXISTS total_amount_cents,
      DROP COLUMN IF EXISTS deposit_payment_intent_id,
      DROP COLUMN IF EXISTS completion_payment_intent_id,
      DROP COLUMN IF EXISTS cancellation_payment_intent_id,
      DROP COLUMN IF EXISTS deposit_paid,
      DROP COLUMN IF EXISTS completion_paid,
      DROP COLUMN IF EXISTS cancellation_paid;`);

    await queryRunner.query(`ALTER TABLE providers DROP COLUMN IF EXISTS stripe_connected_account_id;`);
    await queryRunner.query(`ALTER TABLE users DROP COLUMN IF EXISTS stripe_customer_id;`);

    await queryRunner.query(`DROP INDEX IF EXISTS idx_bookings_deposit_intent;`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_bookings_completion_intent;`);
  }
}
