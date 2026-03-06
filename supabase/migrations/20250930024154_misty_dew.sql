/*
  # Create customization settings table

  1. New Tables
    - `customization_settings`
      - `id` (uuid, primary key)
      - `primary_color` (text) - Primary theme color
      - `secondary_color` (text) - Secondary theme color
      - `accent_color` (text) - Accent theme color
      - `background_style` (text) - Background style preference
      - `font_family` (text) - Font family selection
      - `hero_style` (text) - Hero section style
      - `navigation_style` (text) - Navigation layout style
      - `animation_speed` (text) - Animation speed preference
      - `particle_effects` (boolean) - Enable particle effects
      - `glassmorphism` (boolean) - Enable glassmorphism effects
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `customization_settings` table
    - Add policy for authenticated users to manage settings
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS customization_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_color text DEFAULT '#3b82f6',
  secondary_color text DEFAULT '#8b5cf6',
  accent_color text DEFAULT '#10b981',
  background_style text DEFAULT 'gradient',
  font_family text DEFAULT 'Inter',
  hero_style text DEFAULT 'modern',
  navigation_style text DEFAULT 'sidebar',
  animation_speed text DEFAULT 'normal',
  particle_effects boolean DEFAULT true,
  glassmorphism boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE customization_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to manage customization_settings"
  ON customization_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to customization_settings"
  ON customization_settings
  FOR SELECT
  TO public
  USING (true);