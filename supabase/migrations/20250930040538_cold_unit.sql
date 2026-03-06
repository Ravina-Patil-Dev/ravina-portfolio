/*
  # Add index for media coverage performance

  1. Performance Optimization
    - Add index on `publication_date` column with descending order
    - This will speed up the `ORDER BY publication_date DESC` query
    - Prevents statement timeout errors

  2. Security
    - No changes to existing RLS policies
*/

-- Add index for better query performance on publication_date
CREATE INDEX IF NOT EXISTS idx_media_coverage_publication_date 
ON public.media_coverage (publication_date DESC);