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