/*
  # Add index for certificates issue_date

  1. Performance Optimization
    - Add index on `issue_date` column to speed up ORDER BY queries
    - This will resolve statement timeout errors when fetching certificates
*/

CREATE INDEX IF NOT EXISTS idx_certificates_issue_date 
ON certificates (issue_date DESC);