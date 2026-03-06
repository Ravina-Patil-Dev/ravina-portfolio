/*
  # Add index for events_volunteering table

  1. Performance Optimization
    - Add index on `start_date` column with descending order
    - This will significantly speed up the `ORDER BY start_date DESC` query
    - Prevents statement timeout errors when fetching events

  2. Benefits
    - Faster query execution
    - Reduced database load
    - Better user experience
*/

CREATE INDEX IF NOT EXISTS idx_events_volunteering_start_date 
ON events_volunteering (start_date DESC);