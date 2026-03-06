/*
  # Create events and volunteering table

  1. New Tables
    - `events_volunteering`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `organization` (text, required)
      - `type` (text, required) - 'event' or 'volunteering'
      - `description` (text, required)
      - `location` (text, optional)
      - `start_date` (date, optional)
      - `end_date` (date, optional)
      - `current` (boolean, default false)
      - `role` (text, optional)
      - `achievements` (text array, optional)
      - `skills_gained` (text array, optional)
      - `images` (text array, optional)
      - `website_url` (text, optional)
      - `certificate_url` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `events_volunteering` table
    - Add policies for authenticated users to manage events
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS events_volunteering (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  organization text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'event',
  description text NOT NULL DEFAULT '',
  location text DEFAULT '',
  start_date date DEFAULT CURRENT_DATE,
  end_date date DEFAULT NULL,
  current boolean DEFAULT false,
  role text DEFAULT '',
  achievements text[] DEFAULT '{}',
  skills_gained text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  website_url text DEFAULT '',
  certificate_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add constraint for type field
ALTER TABLE events_volunteering 
ADD CONSTRAINT events_volunteering_type_check 
CHECK (type = ANY (ARRAY['event'::text, 'volunteering'::text]));

-- Enable RLS
ALTER TABLE events_volunteering ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Allow authenticated users to manage events_volunteering"
  ON events_volunteering
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to events_volunteering"
  ON events_volunteering
  FOR SELECT
  TO public
  USING (true);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_events_volunteering_type ON events_volunteering USING btree (type);
CREATE INDEX IF NOT EXISTS idx_events_volunteering_dates ON events_volunteering USING btree (start_date, end_date);