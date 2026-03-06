/*
  # Add date of birth to profiles table

  1. Schema Changes
    - Add `date_of_birth` column to `profiles` table
    - Column is optional (nullable) for existing records
    - Default value is null

  2. Security
    - Existing RLS policies remain unchanged
    - New column inherits existing security settings
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'date_of_birth'
  ) THEN
    ALTER TABLE profiles ADD COLUMN date_of_birth date DEFAULT null;
  END IF;
END $$;