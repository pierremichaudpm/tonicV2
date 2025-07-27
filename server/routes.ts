import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import fetch from 'node-fetch';

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
        
        console.log('Reading file:', filename);
        
        // Extract the array from the JavaScript file based on variable names
        let match;
        if (filename.includes('emplois-data-en')) {
            match = content.match(/const\s+jobsData\s*=\s*(\[[\s\S]*?\]);/);
        } else if (filename.includes('emplois-data')) {
            match = content.match(/const\s+jobListings\s*=\s*(\[[\s\S]*?\]);/);
        } else if (filename.includes('communiques-data-en')) {
            match = content.match(/const\s+communiquesData\s*=\s*(\[[\s\S]*?\]);/);
        } else if (filename.includes('communiques-data')) {
            match = content.match(/const\s+pressReleases\s*=\s*(\[[\s\S]*?\]);/);
        }
        
        console.log('Match found:', !!match);
        
        if (match) {
            try {
                // First try JSON parsing for simple cases
                return JSON.parse(match[1]);
            } catch (e) {
                console.log('JSON parse failed, trying eval');
                // If JSON fails, evaluate the JavaScript array (safe in controlled context)
                try {
                    // Use Function constructor instead of eval for safety
                    const fn = new Function('return ' + match[1]);
                    const result = fn();
                    console.log('Eval successful, items count:', result.length);
                    return result;
                } catch (evalError) {
                    console.error('Both JSON and Function constructor failed:', evalError);
                    return [];
                }
            }
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
    res.sendFile(path.join(publicPath, "cms.html"));
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
  
  // Delete content endpoint
  app.delete('/api/cms/content/:type/:lang/:id', authenticate, (req, res) => {
      const { type, lang, id } = req.params;
      
      let data;
      let filename;
      let variableName;
      
      if (type === 'news' && lang === 'fr') {
          data = readDataFile('communiques-data.js');
          filename = 'communiques-data.js';
          variableName = 'pressReleases';
      } else if (type === 'news' && lang === 'en') {
          data = readDataFile('communiques-data-en.js');
          filename = 'communiques-data-en.js';
          variableName = 'communiquesData';
      } else if (type === 'jobs' && lang === 'fr') {
          data = readDataFile('emplois-data.js');
          filename = 'emplois-data.js';
          variableName = 'jobListings';
      } else if (type === 'jobs' && lang === 'en') {
          data = readDataFile('emplois-data-en.js');
          filename = 'emplois-data-en.js';
          variableName = 'jobsData';
      } else {
          return res.status(400).json({ error: 'Invalid type or language' });
      }
      
      // Filter out the item with matching ID
      const originalLength = data.length;
      const filteredData = data.filter((item: any) => {
          return String(item.id) !== String(id) && String(item.title) !== String(id);
      });
      
      if (filteredData.length === originalLength) {
          return res.status(404).json({ error: 'Item not found' });
      }
      
      // Save the filtered data
      const success = writeDataFile(filename, filteredData, variableName);
      
      if (success) {
          res.json({ success: true, message: 'Item deleted successfully' });
      } else {
          res.status(500).json({ error: 'Failed to delete item' });
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

  // AI Translation endpoint (password protected)
  app.post('/api/translate', authenticate, async (req, res) => {
    try {
      const { text, fromLang, toLang } = req.body;
      
      if (!text || !fromLang || !toLang) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
      
      // Use Anthropic API for translation
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY || '',
          'anthropic-version': '2023-06-01'
        } as Record<string, string>,
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 8192,
          messages: [{
            role: 'user',
            content: `Translate the following ${fromLang === 'fr' ? 'French' : 'English'} text to ${toLang === 'en' ? 'English' : 'French'}. 
            
            CRITICAL RULES:
            1. Preserve ALL HTML tags exactly as they are (including spans, links, etc.)
            2. Keep proper names in their original form (Montréal, Gilles-Villeneuve, etc.)
            3. Maintain the same formatting and structure
            4. Only translate the actual text content, not HTML attributes
            5. Return the COMPLETE translated text with preserved HTML - do not truncate
            6. Translate ALL content, even long passages
            
            Text to translate:
            ${text}`
          }]
        })
      });
      
      if (!response.ok) {
        console.error('Anthropic API error:', response.status);
        return res.status(500).json({ error: 'Translation service unavailable' });
      }
      
      const result = await response.json() as any;
      const translatedText = result.content?.[0]?.text || text;
      
      res.json({ translatedText });
      
    } catch (error) {
      console.error('Translation error:', error);
      res.status(500).json({ error: 'Translation failed' });
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
  
  // Explicit .html routes for all pages
  app.get("/emplois.html", (req, res) => {
    res.sendFile(path.join(publicPath, "emplois.html"));
  });
  
  app.get("/emplois-en.html", (req, res) => {
    res.sendFile(path.join(publicPath, "emplois-en.html"));
  });
  
  app.get("/communiques.html", (req, res) => {
    res.sendFile(path.join(publicPath, "communiques.html"));
  });
  
  app.get("/communiques-en.html", (req, res) => {
    res.sendFile(path.join(publicPath, "communiques-en.html"));
  });
  
  app.get("/nous-joindre.html", (req, res) => {
    res.sendFile(path.join(publicPath, "nous-joindre.html"));
  });
  
  app.get("/nous-joindre-en.html", (req, res) => {
    res.sendFile(path.join(publicPath, "nous-joindre-en.html"));
  });
  
  app.get("/a-propos.html", (req, res) => {
    res.sendFile(path.join(publicPath, "a-propos.html"));
  });
  
  app.get("/about.html", (req, res) => {
    res.sendFile(path.join(publicPath, "about.html"));
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
