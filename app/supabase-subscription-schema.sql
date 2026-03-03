-- Add cancel_at_period_end column to subscriptions table if it doesn't exist
-- Run this in Supabase SQL Editor

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'subscriptions'
        AND column_name = 'cancel_at_period_end'
    ) THEN
        ALTER TABLE subscriptions ADD COLUMN cancel_at_period_end BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Optional: Update existing records to set default
UPDATE subscriptions
SET cancel_at_period_end = false
WHERE cancel_at_period_end IS NULL;
