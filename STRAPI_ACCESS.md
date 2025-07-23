# How to Access Strapi CMS

## Step 1: Start Strapi Server

## For Development in Replit:
Open the Shell terminal in Replit and run:

```bash
cd cms
PORT=3001 npm run develop
```

## For Deployed Site:

**IMPORTANT**: You need to set environment variables for your deployed domain:

1. In your Replit deployment settings, add these environment variables:
   ```
   ADMIN_URL=https://YOUR-DEPLOYED-DOMAIN.com/admin
   PUBLIC_URL=https://YOUR-DEPLOYED-DOMAIN.com
   ```

2. Replace `YOUR-DEPLOYED-DOMAIN.com` with your actual deployed URL

3. After setting these variables, redeploy the project

4. The CMS will then be accessible at your deployed domain + `/admin`

You'll see output like:
```
[INFO] Including the following ENV variables as part of the JS bundle:
    - ADMIN_PATH
    - STRAPI_ADMIN_BACKEND_URL
    - STRAPI_TELEMETRY_DISABLED
    - STRAPI_ANALYTICS_URL
✔ Building admin panel
[2025-07-23 19:25:00.000] info: Starting your app...
[2025-07-23 19:25:00.000] info: Server started on port 1337
```

## Step 2: Access Admin Panel

Once Strapi is running, open your browser and go to:

**http://localhost:1337/admin**

## Step 3: First Time Setup

If this is your first time:

1. **Create Admin Account**: Fill out the form to create your administrator account
2. **Login**: Use the credentials you just created
3. **French Interface**: The interface will automatically be in French

## Step 4: Start Managing Content

Once logged in, you'll see:

- **Gestionnaire de contenu** (Content Manager)
  - **Job** - Manage job postings
  - **News** - Manage news articles
- **Médiathèque** (Media Library) - Upload files and images
- **Paramètres** (Settings) - Configure the CMS

## Quick Access URLs

- **Admin Panel**: http://localhost:1337/admin
- **API Documentation**: http://localhost:1337/documentation
- **Jobs API**: http://localhost:1337/api/jobs
- **News API**: http://localhost:1337/api/news

## Troubleshooting

If you get connection errors:
1. Make sure Strapi is running (step 1)
2. Wait 30-60 seconds for full startup
3. Check the terminal for any error messages
4. Verify you're using the correct URL: localhost:1337/admin

The interface will be completely in French and ready for content management!