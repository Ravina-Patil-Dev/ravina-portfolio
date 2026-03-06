/*
  # Add category column to certificates table

  1. Schema Changes
    - Add `category` column to `certificates` table
    - Set default value to 'certification'
    - Add check constraint for valid categories

  2. Data Migration
    - Update existing records based on title/issuer patterns
    - Awards: titles containing 'award', 'winner', 'achievement'
    - Certifications: from known providers (AWS, Google, Microsoft, etc.)
    - Achievements: everything else

  3. Security
    - No changes to existing RLS policies
*/

-- Add category column with default value
ALTER TABLE certificates 
ADD COLUMN IF NOT EXISTS category text DEFAULT 'certification';

-- Add check constraint for valid categories
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'certificates_category_check' 
    AND table_name = 'certificates'
  ) THEN
    ALTER TABLE certificates 
    ADD CONSTRAINT certificates_category_check 
    CHECK (category IN ('certification', 'award', 'achievement'));
  END IF;
END $$;

-- Update existing records based on patterns
UPDATE certificates 
SET category = 'award' 
WHERE LOWER(title) LIKE '%award%' 
   OR LOWER(title) LIKE '%winner%' 
   OR LOWER(title) LIKE '%champion%'
   OR LOWER(title) LIKE '%first place%'
   OR LOWER(issuer) LIKE '%competition%'
   OR LOWER(issuer) LIKE '%contest%';

UPDATE certificates 
SET category = 'achievement' 
WHERE LOWER(title) LIKE '%achievement%' 
   OR LOWER(title) LIKE '%recognition%'
   OR LOWER(title) LIKE '%honor%'
   OR LOWER(title) LIKE '%excellence%'
   AND category = 'certification';

-- Keep certifications as default for known providers
UPDATE certificates 
SET category = 'certification' 
WHERE (LOWER(issuer) LIKE '%aws%' 
    OR LOWER(issuer) LIKE '%amazon%'
    OR LOWER(issuer) LIKE '%google%'
    OR LOWER(issuer) LIKE '%microsoft%'
    OR LOWER(issuer) LIKE '%oracle%'
    OR LOWER(issuer) LIKE '%cisco%'
    OR LOWER(issuer) LIKE '%comptia%'
    OR LOWER(title) LIKE '%certified%'
    OR LOWER(title) LIKE '%certification%')
   AND category != 'award';