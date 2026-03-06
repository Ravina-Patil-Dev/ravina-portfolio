/*
  # Portfolio Website Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `name` (text) - Full name
      - `title` (text) - Professional title
      - `bio` (text) - Biography
      - `email` (text) - Contact email
      - `phone` (text) - Phone number
      - `location` (text) - Current location
      - `profile_image` (text) - Profile image URL
      - `resume_url` (text) - Resume/CV URL
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `projects`
      - `id` (uuid, primary key)
      - `title` (text) - Project title
      - `description` (text) - Short description
      - `long_description` (text) - Detailed description
      - `image_url` (text) - Project image
      - `demo_url` (text) - Live demo URL
      - `github_url` (text) - GitHub repository URL
      - `technologies` (text[]) - Array of technologies used
      - `featured` (boolean) - Whether project is featured
      - `order_index` (integer) - Display order
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `travel_experiences`
      - `id` (uuid, primary key)
      - `destination` (text) - City/location name
      - `country` (text) - Country name
      - `description` (text) - Experience description
      - `date_visited` (date) - Date of visit
      - `latitude` (decimal) - GPS latitude
      - `longitude` (decimal) - GPS longitude
      - `images` (text[]) - Array of image URLs
      - `highlights` (text[]) - Array of experience highlights
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `certificates`
      - `id` (uuid, primary key)
      - `title` (text) - Certificate title
      - `issuer` (text) - Issuing organization
      - `issue_date` (date) - Date issued
      - `expiry_date` (date) - Expiration date (optional)
      - `credential_id` (text) - Credential ID
      - `credential_url` (text) - Verification URL
      - `image_url` (text) - Certificate image
      - `description` (text) - Additional details
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `work_experience`
      - `id` (uuid, primary key)
      - `company` (text) - Company name
      - `position` (text) - Job title
      - `location` (text) - Work location
      - `start_date` (date) - Start date
      - `end_date` (date) - End date (optional if current)
      - `current` (boolean) - Is current position
      - `description` (text) - Role description
      - `responsibilities` (text[]) - Key responsibilities
      - `technologies` (text[]) - Technologies used
      - `achievements` (text[]) - Key achievements
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `education`
      - `id` (uuid, primary key)
      - `institution` (text) - School/university name
      - `degree` (text) - Degree type
      - `field_of_study` (text) - Major/field of study
      - `start_date` (date) - Start date
      - `end_date` (date) - End date (optional if current)
      - `current` (boolean) - Is currently studying
      - `gpa` (decimal) - Grade point average
      - `description` (text) - Additional details
      - `achievements` (text[]) - Academic achievements
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `research_papers`
      - `id` (uuid, primary key)
      - `title` (text) - Paper title
      - `abstract` (text) - Paper abstract
      - `authors` (text[]) - List of authors
      - `publication_date` (date) - Publication date
      - `journal` (text) - Journal name (optional)
      - `conference` (text) - Conference name (optional)
      - `doi` (text) - Digital Object Identifier
      - `pdf_url` (text) - PDF download link
      - `status` (text) - Publication status
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `media_coverage`
      - `id` (uuid, primary key)
      - `title` (text) - Article/mention title
      - `publication` (text) - Publication name
      - `url` (text) - Article URL
      - `publication_date` (date) - Publication date
      - `description` (text) - Article description
      - `image_url` (text) - Featured image
      - `featured` (boolean) - Is featured coverage
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `social_links`
      - `id` (uuid, primary key)
      - `platform` (text) - Social platform name
      - `url` (text) - Profile URL
      - `username` (text) - Username on platform
      - `order_index` (integer) - Display order
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage content
    - Public read access for portfolio display
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  location text NOT NULL DEFAULT '',
  profile_image text DEFAULT '',
  resume_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  long_description text DEFAULT '',
  image_url text DEFAULT '',
  demo_url text DEFAULT '',
  github_url text DEFAULT '',
  technologies text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create travel_experiences table
CREATE TABLE IF NOT EXISTS travel_experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination text NOT NULL DEFAULT '',
  country text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  date_visited date DEFAULT CURRENT_DATE,
  latitude decimal DEFAULT NULL,
  longitude decimal DEFAULT NULL,
  images text[] DEFAULT '{}',
  highlights text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  issuer text NOT NULL DEFAULT '',
  issue_date date DEFAULT CURRENT_DATE,
  expiry_date date DEFAULT NULL,
  credential_id text DEFAULT '',
  credential_url text DEFAULT '',
  image_url text DEFAULT '',
  description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create work_experience table
CREATE TABLE IF NOT EXISTS work_experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL DEFAULT '',
  position text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  start_date date DEFAULT CURRENT_DATE,
  end_date date DEFAULT NULL,
  current boolean DEFAULT false,
  description text NOT NULL DEFAULT '',
  responsibilities text[] DEFAULT '{}',
  technologies text[] DEFAULT '{}',
  achievements text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution text NOT NULL DEFAULT '',
  degree text NOT NULL DEFAULT '',
  field_of_study text NOT NULL DEFAULT '',
  start_date date DEFAULT CURRENT_DATE,
  end_date date DEFAULT NULL,
  current boolean DEFAULT false,
  gpa decimal DEFAULT NULL,
  description text DEFAULT '',
  achievements text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create research_papers table
CREATE TABLE IF NOT EXISTS research_papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  abstract text NOT NULL DEFAULT '',
  authors text[] DEFAULT '{}',
  publication_date date DEFAULT CURRENT_DATE,
  journal text DEFAULT '',
  conference text DEFAULT '',
  doi text DEFAULT '',
  pdf_url text DEFAULT '',
  status text DEFAULT 'draft' CHECK (status IN ('published', 'in-review', 'draft')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create media_coverage table
CREATE TABLE IF NOT EXISTS media_coverage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  publication text NOT NULL DEFAULT '',
  url text NOT NULL DEFAULT '',
  publication_date date DEFAULT CURRENT_DATE,
  description text DEFAULT '',
  image_url text DEFAULT '',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create social_links table
CREATE TABLE IF NOT EXISTS social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL DEFAULT '',
  url text NOT NULL DEFAULT '',
  username text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_coverage ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to profiles"
  ON profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to projects"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to travel_experiences"
  ON travel_experiences FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to certificates"
  ON certificates FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to work_experience"
  ON work_experience FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to education"
  ON education FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to research_papers"
  ON research_papers FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to media_coverage"
  ON media_coverage FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to social_links"
  ON social_links FOR SELECT
  TO public
  USING (true);

-- Create policies for authenticated users to manage content
CREATE POLICY "Allow authenticated users to manage profiles"
  ON profiles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage projects"
  ON projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage travel_experiences"
  ON travel_experiences FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage certificates"
  ON certificates FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage work_experience"
  ON work_experience FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage education"
  ON education FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage research_papers"
  ON research_papers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage media_coverage"
  ON media_coverage FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage social_links"
  ON social_links FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_work_experience_dates ON work_experience(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_education_dates ON education(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_media_coverage_featured ON media_coverage(featured);
CREATE INDEX IF NOT EXISTS idx_social_links_order ON social_links(order_index);

-- Insert some sample data
INSERT INTO profiles (name, title, bio, email, location) 
VALUES (
  'Hasan Alvee',
  'Full-Stack Developer & CS Student',
  'Passionate computer science student with expertise in full-stack development, machine learning, and a love for exploring new technologies and cultures through travel and research.',
  'hmalveehasan@gmail.com',
  'Dhaka, Bangladesh'
) ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, description, long_description, technologies, featured, order_index)
VALUES 
  (
    'E-Commerce Platform',
    'Full-stack e-commerce solution with React, Node.js, and PostgreSQL',
    'A comprehensive e-commerce platform featuring user authentication, product management, shopping cart, payment integration, and admin dashboard. Built with modern technologies and best practices.',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'JWT'],
    true,
    1
  ),
  (
    'AI-Powered Analytics Dashboard',
    'Machine learning dashboard for data visualization and predictions',
    'An intelligent analytics platform that uses machine learning to provide insights and predictions from complex datasets. Features real-time data processing and interactive visualizations.',
    ARRAY['Python', 'TensorFlow', 'React', 'D3.js', 'Flask'],
    true,
    2
  ),
  (
    'Mobile Task Manager',
    'Cross-platform mobile app for task and project management',
    'A comprehensive task management application with real-time synchronization, team collaboration features, and advanced project tracking capabilities.',
    ARRAY['React Native', 'Firebase', 'Redux', 'TypeScript'],
    false,
    3
  )
ON CONFLICT DO NOTHING;

-- Insert sample social links
INSERT INTO social_links (platform, url, username, order_index)
VALUES
  ('GitHub', 'https://github.com/hmalveehasan', 'hmalveehasan', 1),
  ('LinkedIn', 'https://www.linkedin.com/in/hmalveehasan/', 'hmalveehasan', 2),
  ('Email', 'mailto:hmalveehasan@gmail.com', 'hmalveehasan@gmail.com', 3)
ON CONFLICT DO NOTHING;