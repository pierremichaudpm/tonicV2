# 🚀 Starting Strapi CMS

## Quick Start Commands

```bash
# Navigate to CMS directory
cd cms

# Start Strapi in development mode
npm run develop
```

This will:
1. Start Strapi on `http://localhost:1337`
2. Open admin panel at `http://localhost:1337/admin`
3. Connect to your PostgreSQL database
4. Enable bilingual content management

## First Time Setup

1. **Start Strapi** (command above)
2. **Create Admin User**: Visit `http://localhost:1337/admin` and create your admin account
3. **Test Integration**: Visit `/cms-demo.html` to see it working
4. **Add Content**: Use the admin panel to add jobs and news

## What's Already Configured

✅ **Database**: PostgreSQL connection configured  
✅ **Content Types**: Jobs and News with full bilingual support  
✅ **i18n**: French/English internationalization ready  
✅ **API Integration**: Frontend automatically detects and uses Strapi  
✅ **Fallback System**: Works offline with local data  
✅ **Admin Panel**: Full content management interface  

## Content Management

### Jobs Content Type
- Title (French/English)
- Department, Location, Type
- Description & Requirements (Rich text, French/English)
- Salary, Deadline, Contact Email
- PDF attachments
- Featured flag

### News Content Type
- Title & Slug (French/English)
- Excerpt & Content (Rich text, French/English)
- Featured images
- Categories, Tags
- Publish dates
- Featured flag

## API Integration

Your website now automatically:
- Checks if Strapi is running
- Loads content from CMS when available
- Falls back to local data files when offline
- Handles both French and English content
- Supports media uploads and rich formatting

## Next Steps

1. Start Strapi with the command above
2. Create your admin user
3. Start adding content through the admin panel
4. Content appears immediately on your website

The CMS integration is complete and production-ready!