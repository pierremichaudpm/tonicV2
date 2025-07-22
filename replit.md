# Overview

This is a full-stack web application built with React (frontend) and Express.js (backend), serving a bilingual (French/English) website for "Tonic Productions". The application features both static HTML pages and a React-based admin interface. It uses TypeScript throughout, Tailwind CSS for styling, and includes database functionality with Drizzle ORM and PostgreSQL.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for the admin interface
- **Vite** as the build tool and development server
- **Tailwind CSS** with shadcn/ui components for styling
- **Wouter** for client-side routing
- **TanStack Query** for API state management
- **Static HTML pages** for the main website content

### Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** structure (though routes aren't fully implemented yet)
- **Static file serving** for HTML, CSS, JS, and images
- **Multilingual routing** with separate routes for French and English content

### Database Layer
- **Drizzle ORM** for database operations
- **PostgreSQL** as the database (configured for Neon serverless)
- **Schema-driven development** with TypeScript types

## Key Components

### Static Website (Main Content)
- Bilingual website with French as default language
- Pages: Home, About, Press Releases, Jobs, Contact
- Vanilla JavaScript for interactivity
- Responsive design with shared CSS

### React Admin Interface
- Modern React application with TypeScript
- Component library using shadcn/ui (Radix UI primitives)
- Form handling with React Hook Form
- Toast notifications system
- Mobile-responsive hooks and components

### Server Infrastructure
- Express.js middleware for logging and error handling
- Static file serving with proper routing
- Development mode with Vite integration
- Production build support with esbuild

## Data Flow

1. **Static Content**: HTML pages served directly by Express with embedded JavaScript for dynamic content
2. **API Communication**: React frontend communicates with Express backend via fetch API
3. **Database Operations**: Server uses Drizzle ORM to interact with PostgreSQL
4. **State Management**: Client-side state managed by TanStack Query with caching

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Hook Form)
- Express.js for server
- Vite for development and building
- TypeScript for type safety

### UI and Styling
- Tailwind CSS for styling
- Radix UI primitives via shadcn/ui
- Lucide React for icons
- Class Variance Authority for component variants

### Database and Validation
- Drizzle ORM with PostgreSQL dialect
- Neon serverless database
- Zod for schema validation
- Drizzle-Zod for type-safe schema generation

### Development Tools
- Replit-specific plugins for development environment
- PostCSS and Autoprefixer for CSS processing
- ESBuild for production bundling

## Deployment Strategy

### Development Mode
- Vite dev server with HMR (Hot Module Replacement)
- Express server with middleware for API and static files
- Automatic TypeScript compilation
- Replit-specific development enhancements

### Production Build
- Vite builds React app to `dist/public`
- ESBuild bundles server code to `dist`
- Static files served from built directories
- Environment-based configuration

### Database Management
- Drizzle migrations in `./migrations` directory
- Schema defined in `./shared/schema.ts`
- Database push command for development: `npm run db:push`

### Key Files Structure
```
├── client/           # React frontend
│   ├── src/         # React source code
│   └── public/      # Static HTML pages and assets
├── server/          # Express backend
├── shared/          # Shared TypeScript schemas
├── migrations/      # Database migrations
└── dist/           # Production build output
```

The application is designed to serve both a public-facing bilingual website and provide a modern React-based admin interface, with a clean separation between static content and dynamic functionality.

## Recent Changes (July 2025)

### Migration Completion - July 22, 2025
- **Successfully migrated** complete multilingual Tonic Productions website to Express.js environment
- **Restored full functionality** of all English navigation pages (Jobs, News, Contact) from original working files
- **Maintained bilingual support** with proper French/English navigation and content
- **Fixed special logo treatments** for Grands Prix Cyclistes (1.45 scale) and Dock 619 (custom logo variant)
- **Completed CTA translations** from French to English while preserving brand names
- **Verified grid layout** and responsive breakpoints working across both language versions
- **Translation approach confirmed**: Interface navigation in English, all event names and branding remain French
- **Enhanced grid visual design** with prominent event-specific brand colors (pink, lime green, purple, etc.)
- **Implemented brand color overlays** using CSS variables and diagonal gradients for visual prominence
- **Reduced overlay darkness** to better showcase event branding while maintaining text readability

### Mobile Menu Fix - July 22, 2025
- **Fixed mobile menu visibility issue** on React-based homepage (both French and English versions)
- **Resolved dual mobile menu system**: Grid view and hero view mobile menus now both functional
- **Fixed icon color rendering** by wrapping React SVG icons in white color divs for proper visibility
- **Mobile menu now works correctly** in both hero view (individual event browsing) and grid view (all events)
- **Static HTML pages** (About, Jobs, Contact, News) already had working mobile menus
- **Complete mobile navigation** now functional across entire website

### Navigation Consistency Fix - July 22, 2025
- **Resolved navigation inconsistencies** between React homepage and static pages
- **Fixed menu behavior differences** between homepage and sub-pages
- **Updated navigation URLs** to maintain consistency across all page types
- **Verified all navigation links work correctly** across French and English versions
- **Navigation responsive behavior** confirmed working at different screen sizes
- **Minor responsiveness note**: Desktop navigation may wrap to 2 lines at intermediate screen sizes (acceptable behavior)

### Legal Pages Enhancement - July 22, 2025
- **Enhanced footer sections** across all static pages with proper legal page links
- **Upgraded footer consistency** with enhanced TONIC branding and professional layout
- **Corrected company information** in terms of use pages to use proper "Groupe Tonic" name
- **Updated contact address format**: Groupe Tonic, 615 Rue le Breton, Longueuil, QC J4G 1R9
- **Standardized email addresses** to info@groupetonic.ca across all legal pages

### Technical Architecture Status
- React-based interactive homepage with hero views, animations, and smooth transitions ✅
- Bilingual routing system (French default, English -en suffix) ✅  
- JavaScript-powered dynamic content loading for jobs and news ✅
- Special logo treatment system with CSS transforms ✅
- Responsive grid layout with proper breakpoints ✅
- Express.js static file serving with multilingual support ✅

The website is now fully operational and matches the original local/Netlify functionality.

### Performance & SEO Optimization - July 22, 2025
- **Removed all production console logs** from shared.js for security and performance  
- **Standardized 15+ title tags** to consistent "Page Name | Groupe Tonic" format across all pages
- **Enhanced meta descriptions** with 150+ character optimized descriptions mentioning 40+ years experience
- **SEO consistency**: All pages now use unified branding and professional descriptions  
- **Image optimization**: Confirmed lazy loading and proper alt tags across all dynamic content
- **Production code cleanup**: Eliminated development-mode console output

### Image Optimization - July 22, 2025
- **Major image compression completed** using ImageMagick
- **beach-pro-tour-hero.webp**: 3.7MB → 488KB (87% size reduction)
- **21k-hero.jpg**: 1.7MB → optimized with resize and quality compression  
- **marathon-beneva-hero.jpg**: 858KB → 796KB (7% reduction)
- **dock619-hero-optimized.jpg**: 7.8MB → 567KB (93% size reduction) - new corporate event image
- **Performance impact**: Significantly faster page loading, especially on mobile devices
- **Total image size reduction**: ~70% smaller hero images

### CDN Optimization Attempt - Reverted
- **Attempted**: Tailwind CDN removal to reduce external dependencies
- **Issue**: Broke visual styling including background photos and grid colors
- **Resolution**: Restored Tailwind CDN to all pages to maintain functionality
- **Lesson**: Site depends on comprehensive Tailwind classes that require careful migration planning

### Logo Rebranding - July 22, 2025
- **Complete TONIC text replacement** with custom logo image across all pages (splash screens, headers, footers)
- **Responsive logo sizing**: Homepage uses `clamp(2.5rem, 5vw, 3.5rem)`, subpages use `clamp(1.875rem, 3.75vw, 2.625rem)` (25% smaller)
- **Preserved taglines**: "Créateur d'expériences mémorables" / "Creator of memorable experiences" maintained
- **Legal content updates**: All references changed from "TONIC Productions" to "Groupe Tonic"
- **Improved splash screen spacing**: Increased margin between logo and tagline from 1rem to 3rem
- **Enhanced header spacing**: Increased header padding across all pages from py-5 (1.25rem) to py-8 (2rem) for better logo prominence
- **React homepage padding boost**: Increased hero content top padding from 5rem to 6rem for improved logo breathing room
- **Further enhanced header padding**: Increased to py-12 (3rem) on static pages and 2.5rem grid padding for maximum visual prominence
- **Hero view extra padding**: Boosted mobile hero padding from 6rem to 7.5rem for significantly more logo breathing room
- **Logo file**: `images/tonic-logo.png` (processed from user attachment)

### Job Postings Update - July 22, 2025
- **Added three new job listings** to both French and English job pages
- **Senior Executive Assistant** (ID: 101) - Administrative role with July 28, 2025 deadline
- **Event Coordinator DOCK619** (ID: 102) - Event venue position
- **Dishwasher** (ID: 103) - Kitchen role at $23/hour
- **Fixed JavaScript functionality** - Added missing utility functions (getJobsByDepartment, getDaysSincePosting, formatJobDate)
- **Enhanced department mapping** - Added support for Administration, Cuisine, Kitchen departments
- **Updated contact emails** - Jobs now use rh@gpcqm.ca as specified in original documents
- **Unique job IDs** - Resolved conflicts with existing job listings
- **Removed job filters** - Simplified both French and English job pages by removing department filter buttons
- **Streamlined job display** - All available positions now show directly without categorization

### Spacing & Visual Refinements - July 22, 2025
- **Grid spacing optimization**: Reduced desktop grid padding from 2.5rem/3vh to final 0.25rem for minimal spacing
- **Media query consistency**: Fixed all breakpoint overrides to use consistent 0.25rem padding values
- **Static page padding reduction**: Decreased from py-12 to py-8 for more reasonable spacing
- **Hero view mobile padding**: Enhanced to 8rem padding-top for improved visual hierarchy
- **Complete tagline brightness fix**: Removed all text-white opacity variants (70%, 80%, 90%, etc.) across entire website
- **Comprehensive opacity cleanup**: All header taglines now bright white instead of greyish appearance
- **Final grid wrapper values**: `padding: calc(80px + 0.25rem) max(1.5rem,3vw) 0.25rem` for consistent minimal spacing