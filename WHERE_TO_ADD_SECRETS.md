# Where to Add Environment Variables in Replit

## Step-by-Step Instructions:

1. **In your Replit project interface**, look at the **left sidebar**

2. **Click on the "Secrets" tab** (it looks like a key icon)

3. **You'll see a form with two fields:**
   - **Key** (left field)
   - **Value** (right field)

4. **Add the first secret:**
   - Key: `ADMIN_URL`
   - Value: `https://website-migrator-pmicho.replit.app/admin`
   - Click "Add new secret"

5. **Add the second secret:**
   - Key: `PUBLIC_URL` 
   - Value: `https://website-migrator-pmicho.replit.app`
   - Click "Add new secret"

## Visual Guide:
```
Secrets Tab
┌─────────────────────────────────────┐
│ Key:   [ADMIN_URL                 ] │
│ Value: [https://website-migrator-  ] │
│        [pmicho.replit.app/admin   ] │
│                    [Add new secret] │
├─────────────────────────────────────┤
│ Key:   [PUBLIC_URL                ] │
│ Value: [https://website-migrator-  ] │
│        [pmicho.replit.app         ] │
│                    [Add new secret] │
└─────────────────────────────────────┘
```

## After Adding Both Secrets:
- Click the **Deploy** button (usually at the top of your project)
- Wait for deployment to complete
- Your CMS will then work at: https://website-migrator-pmicho.replit.app/admin

The Secrets tab is where Replit stores environment variables securely for your deployed application.