# Groupe Tonic Website

A sophisticated multilingual React.js website for event management and job listings, with integrated Strapi CMS backend.

## 🌟 Features

### Main Website
- **Bilingual Support**: French (default) and English versions
- **Responsive Design**: Mobile-first design with 4K presentation optimization
- **Interactive Homepage**: React-based with smooth animations and hero views
- **Event Showcase**: 7 major events including Beach Pro Tour, Marathon Beneva, UCI Championships
- **Job Listings**: Dynamic job postings with department filtering
- **News System**: Press releases and company announcements

### Technical Features
- **4K Display Optimization**: Perfect grid layout for large screen presentations
- **SEO Optimized**: Meta tags, Open Graph, structured data
- **Performance Optimized**: Compressed images, lazy loading, efficient caching
- **Accessibility**: Universal design principles, keyboard navigation
- **Mobile Menu**: Touch-friendly navigation with backdrop blur effects

## 🚀 Live Demo

Déploiement recommandé: Railway

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Wouter** for routing
- **TanStack Query** for API state management
- **Framer Motion** for animations

### Backend
- **Express.js** server with TypeScript
- **Drizzle ORM** with PostgreSQL
- **Strapi v5.19.0** headless CMS (external hosting required)
- **RESTful API** architecture

### Development Tools
- **Vite** for development and building
- **TypeScript** for type safety
- **PostCSS** and **Autoprefixer**

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (Vertical stack layout)
- **Tablet**: 768px - 1799px (4-3 grid: 4 tiles top, 3 wider tiles bottom)
- **Desktop**: 1024px - 1799px (4-3 grid layout)
- **4K Displays**: 1800px+ (Optimized 4-3 grid for presentations)

## 🏗️ Project Structure

```
├── client/              # React frontend
│   ├── src/            # React components and pages
│   └── public/         # Static HTML pages and assets
├── server/             # Express backend
├── shared/             # Shared TypeScript schemas
├── cms/                # Strapi CMS configuration
└── attached_assets/    # Design assets and documentation
```

## 🌐 Events Showcase

1. **Beach Pro Tour Montréal** - International volleyball tournament
2. **Grands Prix Cyclistes** - UCI WorldTour cycling events
3. **Marathon Beneva de Montréal** - Major running event
4. **21K de Montréal** - Half marathon race
5. **UCI 2026 World Championships** - World cycling championships
6. **Studio 76** - Video production services
7. **Dock 619** - Premium event venue (up to 400 guests)

## 📄 Key Pages

- **Homepage**: Interactive React-based event showcase
- **About**: Company history and mission (40+ years experience)
- **Jobs**: Dynamic job listings with department filtering
- **News**: Press releases and company announcements
- **Contact**: Company information and location

## 🎨 Design Features

- **Brand Colors**: Event-specific color themes (purple, lime, blue, red)
- **Logo Scaling**: Custom logo treatments for different events
- **Image Optimization**: Compressed hero images for fast loading
- **Typography**: Professional font hierarchy with French typography standards
- **Animations**: Smooth transitions and hover effects

## 🚀 Deployment

### Main Website
- Déployé sur **Railway** (Node.js service)
- URL de production avec SSL/TLS
- Optionnel: activer un CDN en frontal (Railway + Cloudflare)

### Persistance des données CMS (DATA_DIR)
- Les contenus (news/jobs) sont stockés sous forme de fichiers JS.
- En production, utilisez la variable d’environnement `DATA_DIR` pour pointer vers un répertoire persistant.
- Le serveur monte `DATA_DIR` sur l’URL `/js` avant les fichiers statiques packagés, ce qui permet d’écraser les fichiers embarqués.
- Recommandation Railway: créer un Volume et le monter sur `/data`, puis définir `DATA_DIR=/data`.

Variables d’environnement minimales:
- `ADMIN_PASSWORD` (obligatoire pour le CMS)
- `ANTHROPIC_API_KEY` (pour la traduction FR→EN)
- `NODE_ENV=production`
- `DATA_DIR=/data` (si vous souhaitez la persistance via Volume)

### CMS (Strapi)
- Requires separate hosting (Render, Railway, or Heroku)
- PostgreSQL database integration
- French admin interface
- Bilingual content management

## 📈 Performance

- **Image Compression**: 70%+ size reduction on hero images
- **SEO Optimized**: All pages have proper meta tags and descriptions
- **Mobile Performance**: Optimized for mobile-first experience
- **4K Optimization**: Specifically designed for large screen presentations

## 🌍 Internationalization

- **French**: Default language (Quebec-based company)
- **English**: Full translation of interface and content
- **Consistent Branding**: French taglines maintained across both languages
- **Locale-specific**: Canadian French formatting and terminology

## 🔧 Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm run dev`
5. Access at `http://localhost:5000`

## 📝 Recent Updates (July 2025)

- ✅ Complete 4K display grid layout optimization
- ✅ Bilingual website migration to Express.js
- ✅ Strapi CMS integration (v5.19.0)
- ✅ Mobile navigation fixes
- ✅ SEO and performance optimization
- ✅ Logo rebranding and visual enhancements
- ✅ Job postings system update
- ✅ Image compression and optimization

## 👥 Company

**Groupe Tonic** - Créateur d'expériences mémorables  
40+ years of experience in event management  
350K+ participants across major Quebec events  
100+ successful projects delivered

---

*Built with ❤️ in Quebec, Canada*