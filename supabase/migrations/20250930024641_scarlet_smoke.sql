/*
  # Create SEO settings table

  1. New Tables
    - `seo_settings`
      - `id` (uuid, primary key)
      - `site_title` (text, required)
      - `site_description` (text, required)
      - `site_keywords` (text, required)
      - `og_title` (text, required)
      - `og_description` (text, required)
      - `og_image` (text, required)
      - `twitter_handle` (text, required)
      - `canonical_url` (text, required)
      - `google_analytics_id` (text, optional)
      - `google_search_console` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `seo_settings` table
    - Add policies for public read access and authenticated user management
*/

CREATE TABLE IF NOT EXISTS public.seo_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  site_title text NOT NULL DEFAULT '',
  site_description text NOT NULL DEFAULT '',
  site_keywords text NOT NULL DEFAULT '',
  og_title text NOT NULL DEFAULT '',
  og_description text NOT NULL DEFAULT '',
  og_image text NOT NULL DEFAULT '',
  twitter_handle text NOT NULL DEFAULT '',
  canonical_url text NOT NULL DEFAULT '',
  google_analytics_id text DEFAULT '',
  google_search_console text DEFAULT '',
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" 
  ON public.seo_settings 
  FOR SELECT 
  USING (true);

CREATE POLICY "Enable insert for authenticated users only" 
  ON public.seo_settings 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" 
  ON public.seo_settings 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" 
  ON public.seo_settings 
  FOR DELETE 
  USING (auth.role() = 'authenticated');