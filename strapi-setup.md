# Strapi CMS Setup Guide

## Overview
This project now includes Strapi CMS integration for managing jobs and news content. The frontend automatically detects if Strapi is running and falls back to local data files if not available.

## Setup Instructions

### 1. Install Strapi Dependencies
```bash
cd cms
npm install
```

### 2. Configure Environment
The CMS is already configured with:
- PostgreSQL database connection (uses same DATABASE_URL)
- French/English internationalization
- Content types for Jobs and News
- Admin panel access

### 3. Start Strapi
```bash
cd cms
npm run develop
```

This will:
- Build the admin panel
- Start Strapi on http://localhost:1337
- Create admin panel at http://localhost:1337/admin

### 4. Create Admin User
On first run, visit http://localhost:1337/admin to create your admin user.

## Content Types

### Jobs (`/api/jobs`)
Fields:
- title (localized)
- department 
- location
- type (full-time, part-time, contract, temporary)
- description (localized, rich text)
- requirements (localized, rich text)
- salary
- deadline (date)
- contact_email
- featured (boolean)
- pdf_attachment (file upload)

### News (`/api/news`)
Fields:
- title (localized)
- slug (auto-generated)
- excerpt (localized)
- content (localized, rich text)
- featured_image (image upload)
- category (press-release, event, announcement, partnership)
- featured (boolean)
- publish_date
- tags (JSON)

## API Usage

The frontend automatically uses Strapi APIs when available:
- Jobs: `GET /api/jobs?populate=pdf_attachment&locale=fr`
- News: `GET /api/news?populate=featured_image&locale=fr`

If Strapi is offline, it falls back to local data files.

## Demo Page

Visit `/cms-demo.html` to see the integration in action and test the connection.

## Migration Notes

The existing job and news data can be migrated to Strapi through:
1. Manual entry via admin panel
2. Import scripts (to be created)
3. API bulk uploads

The current local data files remain as fallback for reliability.