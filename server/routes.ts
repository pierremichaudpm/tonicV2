import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Password for simple authentication
const ADMIN_PASSWORD = 'admin123';

// Simple authentication middleware
const authenticate = (req: any, res: any, next: any) => {
    const password = req.headers['x-admin-password'];
    if (password === ADMIN_PASSWORD) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Helper function to read data files
const readDataFile = (filename: string) => {
    try {
        const filePath = path.join(__dirname, '../client/public/js', filename);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Extract the array from the JavaScript file
        const match = content.match(/const \w+ = (\[[\s\S]*?\]);/);
        if (match) {
            return JSON.parse(match[1]);
        }
        return [];
    } catch (error) {
        console.error('Error reading data file:', error);
        return [];
    }
};

// Helper function to write data files
const writeDataFile = (filename: string, data: any[], variableName: string) => {
    try {
        const filePath = path.join(__dirname, '../client/public/js', filename);
        const content = `// ${filename.includes('en') ? 'English' : 'French'} ${filename.includes('communiques') ? 'news' : 'jobs'} data${filename.includes('en') ? '' : ''}  
const ${variableName} = ${JSON.stringify(data, null, 4)};`;
        
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing data file:', error);
        return false;
    }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from the public directory
  const publicPath = path.join(process.cwd(), "client", "public");
  
  // Serve CMS directly - MUST be first before any other middleware
  app.get("/cms", (req, res) => {
    res.sendFile(path.join(publicPath, "cms-full.html"));
  });

  // CMS API Routes
  
  // Get content endpoint
  app.get('/api/cms/content/:type/:lang', authenticate, (req, res) => {
      const { type, lang } = req.params;
      
      let data;
      
      if (type === 'news' && lang === 'fr') {
          data = readDataFile('communiques-data.js');
      } else if (type === 'news' && lang === 'en') {
          data = readDataFile('communiques-data-en.js');
      } else if (type === 'jobs' && lang === 'fr') {
          data = readDataFile('emplois-data.js');
      } else if (type === 'jobs' && lang === 'en') {
          data = readDataFile('emplois-data-en.js');
      } else {
          return res.status(400).json({ error: 'Invalid type or language' });
      }
      
      res.json({ data });
  });

  // Save content endpoint
  app.post('/api/cms/content/:type/:lang', authenticate, (req, res) => {
      const { type, lang } = req.params;
      const { data } = req.body;
      
      let success;
      
      if (type === 'news' && lang === 'fr') {
          success = writeDataFile('communiques-data.js', data, 'pressReleases');
      } else if (type === 'news' && lang === 'en') {
          success = writeDataFile('communiques-data-en.js', data, 'communiquesData');
      } else if (type === 'jobs' && lang === 'fr') {
          success = writeDataFile('emplois-data.js', data, 'jobListings');
      } else if (type === 'jobs' && lang === 'en') {
          success = writeDataFile('emplois-data-en.js', data, 'jobsData');
      } else {
          return res.status(400).json({ error: 'Invalid type or language' });
      }
      
      if (success) {
          res.json({ success: true, message: 'Content saved successfully' });
      } else {
          res.status(500).json({ error: 'Failed to save content' });
      }
  });
  
  // Login endpoint for CMS
  app.post('/api/cms/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid password' });
    }
  });
  
  // Serve CSS, JS, and images as static files
  app.use("/css", express.static(path.join(publicPath, "css")));
  app.use("/js", express.static(path.join(publicPath, "js")));
  app.use("/images", express.static(path.join(publicPath, "images")));
  
  // Routes for all HTML pages - maintaining the multilingual structure
  app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
  
  app.get("/en", (req, res) => {
    res.sendFile(path.join(publicPath, "index-en.html"));
  });
  
  app.get("/about", (req, res) => {
    res.sendFile(path.join(publicPath, "about.html"));
  });
  
  app.get("/a-propos", (req, res) => {
    res.sendFile(path.join(publicPath, "a-propos.html"));
  });
  
  app.get("/communiques", (req, res) => {
    res.sendFile(path.join(publicPath, "communiques.html"));
  });
  
  app.get("/communiques-en", (req, res) => {
    res.sendFile(path.join(publicPath, "communiques-en.html"));
  });
  
  app.get("/emplois", (req, res) => {
    res.sendFile(path.join(publicPath, "emplois.html"));
  });
  
  app.get("/emplois-en", (req, res) => {
    res.sendFile(path.join(publicPath, "emplois-en.html"));
  });
  
  app.get("/nous-joindre", (req, res) => {
    res.sendFile(path.join(publicPath, "nous-joindre.html"));
  });
  
  app.get("/nous-joindre-en", (req, res) => {
    res.sendFile(path.join(publicPath, "nous-joindre-en.html"));
  });

  // CMS Admin Interface (removed duplicate - using proper admin route below)
  
  // Legal pages routes
  app.get("/politique-de-confidentialite", (req, res) => {
    res.sendFile(path.join(publicPath, "politique-de-confidentialite.html"));
  });
  
  app.get("/privacy-policy", (req, res) => {
    res.sendFile(path.join(publicPath, "privacy-policy.html"));
  });
  
  app.get("/conditions-utilisation", (req, res) => {
    res.sendFile(path.join(publicPath, "conditions-utilisation.html"));
  });
  
  app.get("/terms-of-use", (req, res) => {
    res.sendFile(path.join(publicPath, "terms-of-use.html"));
  });
  
  // Handle legacy .html routes for compatibility  
  app.get("/index.html", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
  
  app.get("/index-en.html", (req, res) => {
    res.sendFile(path.join(publicPath, "index-en.html"));
  });





  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
