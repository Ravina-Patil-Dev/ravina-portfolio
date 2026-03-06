/*
  # Create About Me table

  1. New Tables
    - `about_me`
      - `id` (uuid, primary key)
      - `bio` (text, the main about me description)
      - `skills` (text array, list of skills)
      - `stats` (jsonb, statistics like projects completed, years experience, etc.)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `about_me` table
    - Add policy for authenticated users to manage about_me
    - Add policy for public read access to about_me
*/

CREATE TABLE IF NOT EXISTS about_me (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bio text NOT NULL DEFAULT '',
  skills text[] DEFAULT '{}',
  stats jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE about_me ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to manage about_me"
  ON about_me
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to about_me"
  ON about_me
  FOR SELECT
  TO public
  USING (true);