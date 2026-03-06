# 🚀 Premium Portfolio Website

A modern, feature-rich portfolio website built with React, TypeScript, and Supabase. This project showcases a complete personal portfolio with admin panel, database integration, and beautiful animations.

![Portfolio Preview](https://hmalveehasan.com)

## ✨ Features

### 🎨 Frontend Features
- **Modern Design**: Apple-level design aesthetics with glassmorphism effects
- **Responsive Layout**: Optimized for all devices (mobile, tablet, desktop)
- **Advanced Animations**: Framer Motion animations with 120Hz-like smoothness
- **Interactive Elements**: 3D profile cards, liquid ether background, scroll animations
- **Performance Optimized**: Lazy loading, image optimization, smooth scrolling

### 📊 Content Management
- **Admin Dashboard**: Complete CMS for managing all portfolio content
- **Profile Management**: Personal information, bio, contact details
- **Project Showcase**: Featured projects with technologies, demos, and descriptions
- **Work Experience**: Timeline view of professional experience
- **Education**: Academic background and achievements
- **Certificates**: Professional certifications and awards
- **Travel Experiences**: Interactive world map with travel stories
- **Events & Volunteering**: Community involvement and activities
- **Research Papers**: Academic publications and research work
- **Media Coverage**: Press mentions and articles
- **Social Links**: Customizable social media links

### 🔧 Technical Features
- **Database Integration**: Supabase for data storage and authentication
- **File Management**: Image upload and media file management
- **SEO Optimization**: Meta tags, structured data, analytics integration
- **Theme Customization**: Color schemes, fonts, and layout options
- **Performance Settings**: Optimization controls for better loading
- **Backup & Export**: Data export and import functionality

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animations and gestures
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Row Level Security** - Secure data access policies
- **Real-time subscriptions** - Live data updates
- **Authentication** - Email/password authentication

### Additional Libraries
- **Three.js** - 3D graphics and effects
- **React Simple Maps** - Interactive world map
- **React Hook Form** - Form management
- **React Hot Toast** - Notifications
- **React Dropzone** - File upload handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (optional - demo data available)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup (Optional)
If you want to use Supabase for data persistence:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy `.env.example` to `.env`
3. Add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup (If using Supabase)
The project includes migration files that will automatically create the required database schema:

```bash
# Migrations are located in supabase/migrations/
# They will be applied automatically when you set up Supabase
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see your portfolio!

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/              # Admin panel components
│   │   ├── AdminLayout.tsx
│   │   ├── ProfileManager.tsx
│   │   ├── ProjectManager.tsx
│   │   ├── AboutManager.tsx
│   │   └── ...
│   ├── sections/           # Portfolio sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── ...
│   ├── ui/                 # Reusable UI components
│   │   ├── BlurText.tsx
│   │   ├── Timeline.tsx
│   │   ├── ProfileCard.tsx
│   │   └── ...
│   └── Navigation.tsx
├── hooks/                  # Custom React hooks
│   └── useAuth.ts
├── lib/                    # Utilities and configurations
│   └── supabase.ts
├── pages/                  # Main pages
│   ├── Portfolio.tsx
│   ├── AdminLogin.tsx
│   └── AdminDashboard.tsx
├── types/                  # TypeScript type definitions
│   └── index.ts
└── main.tsx
```

## 🎯 Usage Guide

### For End Users

#### Viewing the Portfolio
- Navigate through sections using the sidebar navigation
- Click on projects to view details and live demos
- Explore the interactive travel map
- View certificates and achievements
- Check out research papers and media coverage

#### Admin Access
1. Go to `/admin` or `/access`
2. Sign in with your credentials
3. Use the admin dashboard to manage all content

### For Developers

#### Adding New Sections
1. Create a new component in `src/components/sections/`
2. Add the section to `Portfolio.tsx`
3. Update navigation in `Navigation.tsx`
4. Create corresponding admin manager if needed

#### Database Schema
The project uses the following main tables:
- `profiles` - Personal information
- `projects` - Portfolio projects
- `work_experience` - Professional experience
- `education` - Academic background
- `certificates` - Certifications and awards
- `travel_experiences` - Travel stories
- `events_volunteering` - Events and volunteer work
- `research_papers` - Academic publications
- `media_coverage` - Press mentions
- `social_links` - Social media links

## 🔧 Configuration

### Environment Variables
```env
# Supabase Configuration (Optional)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Demo Mode
The portfolio works without Supabase configuration by using demo data. This allows you to:
- Preview the design and functionality
- Test the user interface
- Understand the data structure
- Develop new features

## 🎨 Customization

### Theme Customization
Access the admin panel → Customization to modify:
- Color schemes (primary, secondary, accent)
- Background styles (gradient, solid, pattern)
- Font families
- Animation speeds
- Visual effects (particles, glassmorphism)

### Performance Settings
Configure performance optimizations:
- Lazy loading
- Image optimization
- Caching strategies
- Mobile animation reduction

### SEO Settings
Optimize for search engines:
- Meta titles and descriptions
- Open Graph tags
- Twitter cards
- Analytics integration
- Structured data

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### 🐛 Reporting Issues
1. Check existing issues first
2. Create a detailed issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### 💻 Development Setup
1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Start development server**:
   ```bash
   npm run dev
   ```

### 📝 Code Guidelines

#### File Organization
- **One component per file** - Keep files focused and under 300 lines
- **Logical grouping** - Use directories for related components
- **Clear naming** - Use descriptive, kebab-case file names
- **Proper imports** - Use absolute imports with path aliases

#### Code Style
- **TypeScript** - Use strict typing for all components
- **Functional Components** - Use React hooks instead of class components
- **Consistent formatting** - Follow the existing code style
- **Comments** - Add JSDoc comments for complex functions

#### Component Structure
```typescript
// 1. Imports (external libraries first, then internal)
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from 'lucide-react';
import { ComponentType } from '../types';

// 2. Interface definitions
interface ComponentProps {
  prop1: string;
  prop2?: number;
}

// 3. Component implementation
const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 4. State and hooks
  const [state, setState] = useState<Type>(initialValue);
  
  // 5. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 6. Event handlers
  const handleEvent = () => {
    // Handler logic
  };
  
  // 7. Render
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default Component;
```

### 🗃️ Database Contributions

#### Adding New Tables
1. Create migration file in `supabase/migrations/`
2. Include comprehensive comments explaining changes
3. Enable Row Level Security (RLS)
4. Add appropriate policies
5. Create indexes for performance
6. Update TypeScript types in `src/types/index.ts`

#### Migration File Template
```sql
/*
  # Add new feature table

  1. New Tables
    - `new_table`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `new_table`
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS new_table (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to manage new_table"
  ON new_table
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to new_table"
  ON new_table
  FOR SELECT
  TO public
  USING (true);
```

### 🎨 UI/UX Contributions

#### Design Principles
- **Apple-level aesthetics** - Clean, sophisticated, attention to detail
- **Accessibility first** - WCAG 2.1 AA compliance
- **Mobile-first** - Responsive design for all screen sizes
- **Performance focused** - Smooth 60fps+ animations
- **Consistent spacing** - 8px grid system

#### Animation Guidelines
- **Meaningful motion** - Animations should enhance UX, not distract
- **Performance optimized** - Use `transform` and `opacity` for animations
- **Reduced motion support** - Respect user preferences
- **Staggered animations** - Create visual hierarchy with timing

### 🧪 Testing

#### Before Submitting
1. **Test all features** - Ensure nothing is broken
2. **Check responsiveness** - Test on different screen sizes
3. **Verify accessibility** - Use screen readers and keyboard navigation
4. **Performance audit** - Run Lighthouse tests
5. **Cross-browser testing** - Test in Chrome, Firefox, Safari

#### Running Tests
```bash
# Lint code
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### 📤 Submitting Changes

#### Pull Request Process
1. **Update documentation** - Include README updates if needed
2. **Add changeset** - Describe what changed and why
3. **Include screenshots** - For UI changes
4. **Test thoroughly** - Ensure all functionality works
5. **Write clear commit messages**:
   ```
   feat: add new certificate management feature
   
   - Add certificate upload functionality
   - Implement expiry date tracking
   - Add certificate verification links
   - Update admin panel with certificate manager
   ```

#### Commit Message Format
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation updates
- `style:` - Code formatting changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests

### 🏷️ Feature Requests

#### Suggesting New Features
1. **Check existing issues** - Avoid duplicates
2. **Provide detailed description**:
   - What problem does it solve?
   - How should it work?
   - Who would benefit?
   - Any design considerations?
3. **Include mockups** - Visual representations help
4. **Consider implementation** - Technical feasibility

#### Priority Labels
- 🔴 **Critical** - Security issues, major bugs
- 🟡 **High** - Important features, performance issues
- 🟢 **Medium** - Nice-to-have features, minor improvements
- 🔵 **Low** - Documentation, code cleanup

## 📚 API Documentation

### Supabase Tables

#### Profiles Table
```typescript
interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  date_of_birth?: string;
  profile_image?: string;
  resume_url?: string;
}
```

#### Projects Table
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  technologies: string[];
  featured: boolean;
  order_index: number;
}
```

[View complete type definitions in `src/types/index.ts`]

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables

### Deploy to Custom Server
1. Build the project: `npm run build`
2. Serve the `dist` folder with any static file server
3. Configure your web server for SPA routing

## 🔒 Security

### Authentication
- Email/password authentication via Supabase Auth
- Row Level Security (RLS) policies protect data
- Admin-only access to management features

### Data Protection
- All sensitive data is protected by RLS policies
- File uploads are validated and sanitized
- SQL injection protection through Supabase

## 📈 Performance

### Optimization Features
- **Code splitting** - Lazy loading of components
- **Image optimization** - WebP format, responsive images
- **Bundle optimization** - Tree shaking, minification
- **Caching strategies** - Browser and CDN caching
- **Performance monitoring** - Lighthouse integration

### Performance Metrics
- **Lighthouse Score**: 95+ across all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🐛 Troubleshooting

### Common Issues

#### Supabase Connection Issues
```bash
# Check environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Verify Supabase project is active
# Check RLS policies are properly configured
```

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run build
```

#### Performance Issues
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Check for memory leaks
# Use React DevTools Profiler
```

### Getting Help
1. **Check the documentation** - Most issues are covered here
2. **Search existing issues** - Someone might have faced the same problem
3. **Create a new issue** - Provide detailed information
4. **Join discussions** - Participate in community discussions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Apple's design philosophy and modern web trends
- **Icons**: [Lucide React](https://lucide.dev/) for beautiful icons
- **Images**: [Pexels](https://pexels.com/) for stock photography
- **Animations**: [Framer Motion](https://framer.com/motion/) for smooth animations
- **Backend**: [Supabase](https://supabase.com/) for database and authentication

## 📞 Support

### Community
- **GitHub Discussions** - Ask questions and share ideas
- **Issues** - Report bugs and request features
- **Pull Requests** - Contribute code improvements

### Professional Support
For professional support, custom development, or consulting:
- Email: [your-email@example.com]
- LinkedIn: [Your LinkedIn Profile]
- Website: [Your Website]

---

## 🚀 Getting Started Checklist

### For Users
- [ ] Clone the repository
- [ ] Install dependencies (`npm install`)
- [ ] Start development server (`npm run dev`)
- [ ] Access admin panel at `/admin`
- [ ] Customize your content
- [ ] Deploy to your preferred platform

### For Contributors
- [ ] Read the contribution guidelines
- [ ] Set up development environment
- [ ] Create a feature branch
- [ ] Make your changes
- [ ] Test thoroughly
- [ ] Submit a pull request

### For Maintainers
- [ ] Review pull requests
- [ ] Update documentation
- [ ] Manage releases
- [ ] Monitor performance
- [ ] Respond to issues

---

**Made with ❤️ by HM Alvee Hasan**

*Star ⭐ this repository if you found it helpful!*
