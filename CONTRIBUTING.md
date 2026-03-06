# Contributing to Premium Portfolio Website

Thank you for your interest in contributing! This document provides detailed guidelines for contributing to this project.

## 🎯 Ways to Contribute

### 🐛 Bug Reports
- Use the issue tracker to report bugs
- Include detailed reproduction steps
- Provide environment information
- Add screenshots or videos if helpful

### 💡 Feature Requests
- Describe the problem you're trying to solve
- Explain your proposed solution
- Consider the impact on existing users
- Provide mockups or examples if possible

### 📝 Documentation
- Improve existing documentation
- Add missing documentation
- Fix typos and grammar
- Translate documentation

### 💻 Code Contributions
- Fix bugs
- Implement new features
- Improve performance
- Add tests
- Refactor code

## 🛠️ Development Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Local Development
1. **Fork and clone**:
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment**:
   ```bash
   cp .env.example .env
   # Add your Supabase credentials (optional)
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**: http://localhost:5173

### Development Workflow
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Commit with clear messages
5. Push to your fork
6. Create a pull request

## 📋 Code Standards

### TypeScript Guidelines
- Use strict TypeScript configuration
- Define interfaces for all props and data structures
- Avoid `any` type - use proper typing
- Use generic types where appropriate

### React Best Practices
- Use functional components with hooks
- Implement proper error boundaries
- Use React.memo for performance optimization
- Follow the single responsibility principle

### File Organization
```
src/
├── components/
│   ├── admin/          # Admin panel components
│   ├── sections/       # Portfolio sections
│   ├── ui/            # Reusable UI components
│   └── Navigation.tsx # Main navigation
├── hooks/             # Custom React hooks
├── lib/               # Utilities and configurations
├── pages/             # Main pages/routes
├── types/             # TypeScript definitions
└── styles/            # Global styles
```

### Naming Conventions
- **Components**: PascalCase (`ProfileCard.tsx`)
- **Files**: kebab-case for utilities (`api-client.ts`)
- **Variables**: camelCase (`userName`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes**: kebab-case (`profile-card`)

### Component Structure
```typescript
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from 'lucide-react';

interface ComponentProps {
  required: string;
  optional?: number;
}

const Component: React.FC<ComponentProps> = ({ required, optional = 0 }) => {
  // 1. State declarations
  const [state, setState] = useState<Type>(initialValue);
  
  // 2. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 3. Event handlers
  const handleEvent = useCallback(() => {
    // Handler logic
  }, [dependencies]);
  
  // 4. Render logic
  if (loading) {
    return <LoadingComponent />;
  }
  
  return (
    <motion.div
      className="component-styles"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Component content */}
    </motion.div>
  );
};

export default Component;
```

## 🎨 Design Guidelines

### Visual Design
- **Apple-level aesthetics** - Clean, sophisticated, minimal
- **Consistent spacing** - Use 8px grid system
- **Color harmony** - Maintain consistent color palette
- **Typography** - Clear hierarchy with appropriate font weights

### Animation Principles
- **Purposeful motion** - Animations should enhance UX
- **Performance first** - Use transform and opacity
- **Respect preferences** - Support reduced motion
- **Smooth timing** - Use easing functions for natural feel

### Responsive Design
- **Mobile-first** - Design for mobile, enhance for desktop
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Touch-friendly** - Minimum 44px touch targets

## 🗄️ Database Guidelines

### Schema Design
- **Descriptive names** - Use clear, meaningful table and column names
- **Proper types** - Choose appropriate PostgreSQL data types
- **Default values** - Set sensible defaults for columns
- **Constraints** - Add necessary constraints and validations

### Migration Best Practices
- **One logical change per migration** - Keep migrations focused
- **Comprehensive comments** - Explain what and why
- **Safe operations** - Use IF EXISTS/IF NOT EXISTS
- **Rollback plan** - Consider how to undo changes

### Security
- **Enable RLS** - Always enable Row Level Security
- **Minimal permissions** - Grant only necessary access
- **Input validation** - Validate all user inputs
- **Audit trails** - Track important changes

## 🧪 Testing Guidelines

### Testing Strategy
- **Unit tests** - Test individual components and functions
- **Integration tests** - Test component interactions
- **E2E tests** - Test complete user workflows
- **Visual regression** - Test UI consistency

### Test Structure
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Component from './Component';

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component prop="value" />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interactions', () => {
    const mockHandler = vi.fn();
    render(<Component onAction={mockHandler} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandler).toHaveBeenCalled();
  });
});
```

## 📦 Release Process

### Version Management
- Follow [Semantic Versioning](https://semver.org/)
- **Major** (1.0.0) - Breaking changes
- **Minor** (0.1.0) - New features, backward compatible
- **Patch** (0.0.1) - Bug fixes, backward compatible

### Release Checklist
- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Test all features
- [ ] Update documentation
- [ ] Create release notes
- [ ] Tag the release
- [ ] Deploy to production

## 🤔 Questions?

### Before Asking
1. Check the documentation
2. Search existing issues
3. Look at closed issues
4. Review pull requests

### How to Ask
1. **Be specific** - Provide exact error messages
2. **Include context** - What were you trying to do?
3. **Share code** - Minimal reproduction example
4. **Environment details** - OS, browser, Node version

### Where to Ask
- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and ideas
- **Pull Request Comments** - Code-specific questions

## 🏆 Recognition

### Contributors
All contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

### Types of Contributions
- 💻 Code contributions
- 📖 Documentation improvements
- 🐛 Bug reports
- 💡 Feature suggestions
- 🎨 Design improvements
- 🧪 Testing and QA
- 🌍 Translations
- 📢 Community support

## 📜 Code of Conduct

### Our Standards
- **Be respectful** - Treat everyone with respect
- **Be inclusive** - Welcome people of all backgrounds
- **Be constructive** - Provide helpful feedback
- **Be patient** - Help others learn and grow

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Personal attacks
- Publishing private information
- Spam or off-topic content

### Enforcement
- Issues will be reviewed by maintainers
- Violations may result in temporary or permanent bans
- Contact maintainers for serious issues

---

Thank you for contributing to make this project better! 🎉