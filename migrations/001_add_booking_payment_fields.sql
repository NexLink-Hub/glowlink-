-- SQL migration: add payment-related fields to bookings and provider tables
-- Adapt table and column names to your schema as necessary.

-- Add payment columns to bookings
ALTER TABLE bookings
  ADD COLUMN total_amount_cents BIGINT NOT NULL DEFAULT 0,
  ADD COLUMN deposit_payment_intent_id VARCHAR(255),
  ADD COLUMN completion_payment_intent_id VARCHAR(255),
  ADD COLUMN cancellation_payment_intent_id VARCHAR(255),
  ADD COLUMN deposit_paid BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN completion_paid BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN cancellation_paid BOOLEAN NOT NULL DEFAULT FALSE;

-- Add provider connected account id to providers table
ALTER TABLE providers
  ADD COLUMN stripe_connected_account_id VARCHAR(255);

-- Optional: add stripe customer id to users table if not present
ALTER TABLE users
  ADD COLUMN stripe_customer_id VARCHAR(255);

-- Indexes (optional)
CREATE INDEX IF NOT EXISTS idx_bookings_deposit_intent ON bookings(deposit_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_bookings_completion_intent ON bookings(completion_payment_intent_id);
