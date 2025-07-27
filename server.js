import express from 'express';
import path from 'path';
import compression from 'compression';
import { fileURLToPath } from 'url';
import fs from 'fs';

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
    
    // Extract the data from the JavaScript file
    if (filename.includes('communiques-data.js')) {
      const match = content.match(/const pressReleases = (\[[\s\S]*?\]);/);
      return match ? JSON.parse(match[1]) : [];
    } else if (filename.includes('communiques-data-en.js')) {
      const match = content.match(/const communiquesData = (\[[\s\S]*?\]);/);
      return match ? JSON.parse(match[1]) : [];
    } else if (filename.includes('emplois-data.js')) {
      const match = content.match(/const jobListings = (\[[\s\S]*?\]);/);
      return match ? JSON.parse(match[1]) : [];
    } else if (filename.includes('emplois-data-en.js')) {
      const match = content.match(/const jobsData = (\[[\s\S]*?\]);/);
      return match ? JSON.parse(match[1]) : [];
    }
    return [];
  } catch (error) {
    console.error('Error reading data file:', error);
    return [];
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
