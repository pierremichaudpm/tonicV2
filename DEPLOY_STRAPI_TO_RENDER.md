# Deploy Strapi to Render.com in 10 Minutes

## Step 1: Prepare CMS for Deployment

1. Create a new GitHub repository for your CMS
2. Copy the `/cms` folder contents to this new repo
3. Push to GitHub

## Step 2: Sign up for Render.com

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (free)
3. Authorize Render to access your repositories

## Step 3: Deploy with One Click

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Connect your CMS GitHub repository
3. Render will auto-detect it's a Node.js app

## Step 4: Configure Service

**Basic Settings:**
- Name: `tonic-cms` (or your choice)
- Region: Choose closest to you
- Branch: `main`
- Root Directory: Leave blank (if CMS is in root) or `cms`
- Environment: `Node`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

## Step 5: Add Environment Variables

Click "Advanced" and add these:

```
NODE_VERSION=18.17.0
NODE_ENV=production
APP_KEYS=(click Generate)
API_TOKEN_SALT=(click Generate)
ADMIN_JWT_SECRET=(click Generate)
TRANSFER_TOKEN_SALT=(click Generate)
JWT_SECRET=(click Generate)
```

## Step 6: Add Database

1. In Render, create a new PostgreSQL database (free tier)
2. Copy the Internal Database URL
3. Add it as `DATABASE_URL` environment variable

## Step 7: Set CMS URLs

After deployment, add these variables with your actual Render URL:
```
ADMIN_URL=https://your-service-name.onrender.com/admin
PUBLIC_URL=https://your-service-name.onrender.com
```

## Step 8: Deploy!

Click **"Create Web Service"** and wait ~5 minutes for deployment.

## Step 9: Update Your Website

In your website code, update the Strapi API URLs to point to your Render deployment:
- Change `http://localhost:1337` to `https://your-cms.onrender.com`

## Total Time: ~10-15 minutes

Your CMS will be live at: `https://your-service-name.onrender.com/admin`

## Note on Free Tier
- Render free tier spins down after 15 minutes of inactivity
- First request after inactivity takes ~30 seconds to wake up
- Perfect for content management that doesn't need 24/7 availability