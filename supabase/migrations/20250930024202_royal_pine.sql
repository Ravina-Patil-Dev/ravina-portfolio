/*
  # Create performance settings table

  1. New Tables
    - `performance_settings`
      - `id` (uuid, primary key)
      - `lazy_loading` (boolean) - Enable lazy loading
      - `image_optimization` (boolean) - Enable image optimization
      - `preload_critical_resources` (boolean) - Preload critical resources
      - `enable_service_worker` (boolean) - Enable service worker
      - `compress_images` (boolean) - Enable image compression
      - `minify_css` (boolean) - Enable CSS minification
      - `defer_non_critical_js` (boolean) - Defer non-critical JavaScript
      - `enable_caching` (boolean) - Enable browser caching
      - `optimize_fonts` (boolean) - Enable font optimization
      - `reduce_animations_mobile` (boolean) - Reduce animations on mobile
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `performance_settings` table
    - Add policy for authenticated users to manage settings
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS performance_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lazy_loading boolean DEFAULT true,
  image_optimization boolean DEFAULT true,
  preload_critical_resources boolean DEFAULT true,
  enable_service_worker boolean DEFAULT false,
  compress_images boolean DEFAULT true,
  minify_css boolean DEFAULT true,
  defer_non_critical_js boolean DEFAULT true,
  enable_caching boolean DEFAULT true,
  optimize_fonts boolean DEFAULT true,
  reduce_animations_mobile boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE performance_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to manage performance_settings"
  ON performance_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to performance_settings"
  ON performance_settings
  FOR SELECT
  TO public
  USING (true);