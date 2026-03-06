/*
  # Add online course category to certificates

  1. Schema Changes
    - Update certificate category constraint to include 'online-course'
    - Allow for online course certificates alongside existing categories

  2. Data Migration
    - Existing records remain unchanged
    - New online course certificates can be added

  3. Validation
    - Category must be one of: certification, award, achievement, online-course
*/

-- Drop existing constraint
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'certificates_category_check' 
    AND table_name = 'certificates'
  ) THEN
    ALTER TABLE certificates DROP CONSTRAINT certificates_category_check;
  END IF;
END $$;

-- Add new constraint with online-course option
ALTER TABLE certificates 
ADD CONSTRAINT certificates_category_check 
CHECK (category = ANY (ARRAY['certification'::text, 'award'::text, 'achievement'::text, 'online-course'::text]));