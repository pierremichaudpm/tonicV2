import express from 'express';
import path from 'path';
import compression from 'compression';
import { fileURLToPath } from 'url';
import fs from 'fs';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Admin password for CMS
const ADMIN_PASSWORD = 'admin123';

// Enable gzip compression
app.use(compression());

// Parse JSON bodies for API requests
app.use(express.json());

// Serve static files from client/public with caching
app.use(express.static(path.join(__dirname, 'client/public'), {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else if (filePath.match(/\.(jpg|jpeg|png|gif|webp|ico|svg)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    } else if (filePath.match(/\.(css|js)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }
}));

// Authentication middleware
const authenticate = (req, res, next) => {
  const password = req.headers['x-admin-password'];
  if (password === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Helper function to read data files
const readDataFile = (filename) => {
  try {
    const filePath = path.join(__dirname, 'client/public/js', filename);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract the data from the JavaScript file using Function constructor for safety
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
    
    if (match) {
      try {
        return JSON.parse(match[1]);
      } catch (e) {
        // Use Function constructor for JavaScript array evaluation
        const fn = new Function('return ' + match[1]);
        return fn();
      }
    }
    return [];
  } catch (error) {
    console.error('Error reading data file:', error);
    return [];
  }
};

// Helper function to write data files
const writeDataFile = (filename, data, variableName) => {
  try {
    const filePath = path.join(__dirname, 'client/public/js', filename);
    const content = `const ${variableName} = ${JSON.stringify(data, null, 4)};`;
    
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing data file:', error);
    return false;
  }
};

// CMS API Routes
app.post('/api/cms/login', (req, res) => {
  const { password } = req.body;
  console.log('CMS Login request received');
  
  if (password === ADMIN_PASSWORD) {
    console.log('Login successful');
    res.json({ success: true, message: 'Login successful' });
  } else {
    console.log('Login failed - wrong password');
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// Get content endpoint
app.get('/api/cms/content/:type/:lang', authenticate, (req, res) => {
  const { type, lang } = req.params;
  console.log(`Getting ${type} content for ${lang}`);
  
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

// Translation API endpoint using Claude API
app.post('/api/translate', authenticate, async (req, res) => {
  const { text, fromLang, toLang } = req.body;
  console.log(`Translation request: ${fromLang} -> ${toLang}`);
  
  if (!text || fromLang === toLang) {
    return res.json({ translatedText: text });
  }
  
  try {
    // Use Claude API for translation
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8192,
        system: `You are a professional French-English translator specializing in business content for Groupe Tonic, a Quebec-based event production company. Translate text while preserving:
- HTML formatting (spans, links, bold, etc.)
- Professional tone and business terminology
- Brand names (keep French: "Groupe Tonic", "Beach Pro Tour", etc.)
- Quebec French cultural context when translating to English
- All technical formatting and structure

Return ONLY the translated text, no explanations.`,
        messages: [{
          role: 'user',
          content: `Translate this ${fromLang === 'fr' ? 'French' : 'English'} text to ${toLang === 'en' ? 'English' : 'French'}:\n\n${text}`
        }]
      })
    });

    if (!response.ok) {
      console.error('Claude API error:', response.status);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const result = await response.json();
    const translatedText = result.content[0].text;

    res.json({ 
      translatedText: translatedText,
      message: 'Translated using Claude API'
    });

  } catch (error) {
    console.error('Translation failed:', error);
    
    // Fallback to simple response if Claude fails
    res.json({ 
      translatedText: text,
      message: 'Translation service unavailable, using original text'
    });
  }
});

// Save/Update content endpoint
app.post('/api/cms/content/:type/:lang', authenticate, (req, res) => {
  const { type, lang } = req.params;
  const { data } = req.body;
  
  console.log(`Saving ${type} content for ${lang}`);
  
  let filename, variableName;
  
  if (type === 'news' && lang === 'fr') {
    filename = 'communiques-data.js';
    variableName = 'pressReleases';
  } else if (type === 'news' && lang === 'en') {
    filename = 'communiques-data-en.js';
    variableName = 'communiquesData';
  } else if (type === 'jobs' && lang === 'fr') {
    filename = 'emplois-data.js';
    variableName = 'jobListings';
  } else if (type === 'jobs' && lang === 'en') {
    filename = 'emplois-data-en.js';
    variableName = 'jobsData';
  } else {
    return res.status(400).json({ error: 'Invalid type or language' });
  }
  
  const success = writeDataFile(filename, data, variableName);
  
  if (success) {
    res.json({ success: true, message: 'Content saved successfully' });
  } else {
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// Delete content endpoint
app.delete('/api/cms/content/:type/:lang/:id', authenticate, (req, res) => {
  const { type, lang, id } = req.params;
  
  console.log(`Deleting ${type} item ${id} for ${lang}`);
  
  let filename, variableName;
  
  if (type === 'news' && lang === 'fr') {
    filename = 'communiques-data.js';
    variableName = 'pressReleases';
  } else if (type === 'news' && lang === 'en') {
    filename = 'communiques-data-en.js';
    variableName = 'communiquesData';
  } else if (type === 'jobs' && lang === 'fr') {
    filename = 'emplois-data.js';
    variableName = 'jobListings';
  } else if (type === 'jobs' && lang === 'en') {
    filename = 'emplois-data-en.js';
    variableName = 'jobsData';
  } else {
    return res.status(400).json({ error: 'Invalid type or language' });
  }
  
  // Read current data
  const currentData = readDataFile(filename);
  
  // Filter out the item to delete
  const filteredData = currentData.filter(item => String(item.id) !== String(id));
  
  // Write back the filtered data
  const success = writeDataFile(filename, filteredData, variableName);
  
  if (success) {
    res.json({ success: true, message: 'Content deleted successfully' });
  } else {
    res.status(500).json({ error: 'Failed to delete content' });
  }
});

// Specific routes for important pages
app.get('/cms', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/cms.html'));
});

app.get('/cms.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/cms.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/cms.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/about.html'));
});

app.get('/a-propos', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/a-propos.html'));
});

app.get('/emplois', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/emplois.html'));
});

app.get('/emplois-en', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/emplois-en.html'));
});

app.get('/communiques', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/communiques.html'));
});

app.get('/communiques-en', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/communiques-en.html'));
});

app.get('/nous-joindre', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/nous-joindre.html'));
});

app.get('/nous-joindre-en', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/nous-joindre-en.html'));
});

// Catch-all route for homepage variations only
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.get('/index-en.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index-en.html'));
});

// 404 for any other route
app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving static files from: ${path.join(__dirname, 'client/public')}`);
});
