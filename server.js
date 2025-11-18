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

// Admin password for CMS (prefer .env, fallback for local dev)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Axelle20';

// Enable gzip compression
app.use(compression());

// Parse JSON bodies for API requests (increase limit for rich HTML with base64 images)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Uniform JSON error for payload too large instead of HTML (prevents client JSON parse errors)
app.use((err, req, res, next) => {
  if (err && (err.type === 'entity.too.large' || err.status === 413)) {
    return res.status(413).json({
      error: 'Payload too large',
      message: 'Le contenu à sauvegarder est trop volumineux. Réduisez la taille des images ou fractionnez le contenu.'
    });
  }
  return next(err);
});

// Resolve data directory for dynamic CMS files (persisted if DATA_DIR is mounted to a volume)
const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(__dirname, 'client/public/js');

// Ensure data directory exists (no-op if already exists)
try {
  fs.mkdirSync(DATA_DIR, { recursive: true });
} catch {}

// Seed DATA_DIR with initial JS data files if missing (non-destructif)
const SOURCE_JS_DIR = path.join(__dirname, 'client/public/js');
const seedSpecs = [
  { filename: 'communiques-data.js', variableName: 'pressReleases' },
  { filename: 'communiques-data-en.js', variableName: 'pressReleasesEn' },
  { filename: 'emplois-data.js', variableName: 'jobListings' },
  { filename: 'emplois-data-en.js', variableName: 'jobListingsEn' }
];

for (const { filename, variableName } of seedSpecs) {
  const destPath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(destPath)) {
      const sourcePath = path.join(SOURCE_JS_DIR, filename);
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`[DATA_DIR] Seeded ${filename} from bundled source`);
      } else {
        // Create a minimal default if source not found
        const defaultContent = `const ${variableName} = [];\n`;
        fs.writeFileSync(destPath, defaultContent, 'utf8');
        console.log(`[DATA_DIR] Created default ${filename}`);
      }
    }
  } catch (e) {
    console.warn(`[DATA_DIR] Failed to seed ${filename}:`, e?.message || e);
  }
}

// Serve dynamic data files first from DATA_DIR under /js to override bundled ones
app.use('/js', express.static(DATA_DIR, {
  maxAge: '0',
  setHeaders: (res, filePath) => {
    if (filePath.match(/\.js$/)) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
}));

// Fallback to bundled JS if not present in DATA_DIR
app.use('/js', express.static(path.join(__dirname, 'client/public/js'), {
  maxAge: '0',
  setHeaders: (res, filePath) => {
    if (filePath.match(/\.js$/)) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
}));

// Serve static files from client/public with caching
app.use(express.static(path.join(__dirname, 'client/public'), {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else if (filePath.match(/\.(jpg|jpeg|png|gif|webp|ico|svg)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    } else if (filePath.match(/\.css$/)) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    } else if (filePath.match(/\.js$/)) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
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
    const filePath = path.join(DATA_DIR, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract the data from the JavaScript file using Function constructor for safety
    let match;
      if (filename.includes('emplois-data-en')) {
    match = content.match(/const\s+jobListingsEn\s*=\s*(\[[\s\S]*?\]);/);
  } else if (filename.includes('emplois-data')) {
    match = content.match(/const\s+jobListings\s*=\s*(\[[\s\S]*?\]);/);
  } else if (filename.includes('communiques-data-en')) {
    match = content.match(/const\s+pressReleasesEn\s*=\s*(\[[\s\S]*?\]);/);
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
    const filePath = path.join(DATA_DIR, filename);
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

// --- Hero order helpers ---
const HERO_ORDER_FILE = 'hero-order.js';
const readHeroOrder = () => {
  try {
    const filePath = path.join(DATA_DIR, HERO_ORDER_FILE);
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/heroOrder\s*=\s*(\[[\s\S]*?\])/);
    if (match) {
      return JSON.parse(match[1]);
    }
  } catch (e) {
    console.warn('Failed to read hero order:', e?.message || e);
  }
  return [];
};

const writeHeroOrder = (orderArray) => {
  try {
    const filePath = path.join(DATA_DIR, HERO_ORDER_FILE);
    const safe = Array.isArray(orderArray) ? orderArray.map(Number).filter(n => Number.isFinite(n)) : [];
    const content = `window.heroOrder = ${JSON.stringify(safe, null, 2)};\n`;
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  } catch (e) {
    console.error('Failed to write hero order:', e?.message || e);
    return false;
  }
};

// Hero order API
app.get('/api/cms/hero-order', authenticate, (req, res) => {
  const order = readHeroOrder();
  res.json({ order });
});

app.post('/api/cms/hero-order', authenticate, (req, res) => {
  const { order } = req.body || {};
  if (!Array.isArray(order)) {
    return res.status(400).json({ error: 'Invalid order payload' });
  }
  const ok = writeHeroOrder(order);
  if (ok) return res.json({ success: true });
  return res.status(500).json({ error: 'Failed to save order' });
});

// --- Hero data (titles, locations, dates, countdown, taglines, display mode) ---
const HERO_DATA_FILE = 'hero-data.js';
const readHeroData = () => {
  try {
    const filePath = path.join(DATA_DIR, HERO_DATA_FILE);
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/heroData\s*=\s*(\[[\s\S]*?\])/);
    if (match) {
      return JSON.parse(match[1]);
    }
  } catch (e) {
    console.warn('Failed to read hero data:', e?.message || e);
  }
  return [];
};

const writeHeroData = (dataArray) => {
  try {
    const filePath = path.join(DATA_DIR, HERO_DATA_FILE);
    const safe = Array.isArray(dataArray) ? dataArray : [];
    const content = `window.heroData = ${JSON.stringify(safe, null, 2)};\n`;
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  } catch (e) {
    console.error('Failed to write hero data:', e?.message || e);
    return false;
  }
};

// Seed minimal hero-data if missing (ids only)
try {
  const heroDataPath = path.join(DATA_DIR, HERO_DATA_FILE);
  if (!fs.existsSync(heroDataPath)) {
    const seed = [2,1,5,3,4,6,7].map(id => ({
      id,
      nameFr: '',
      nameEn: '',
      locationFr: '',
      locationEn: '',
      dateFr: '',
      dateEn: '',
      taglineFr: '',
      taglineEn: '',
      countdownEnabled: false,
      countdownISO: '',
      displayMode: id === 7 ? 'logoOnly' : 'logo+text'
    }));
    writeHeroData(seed);
  }
} catch {}

// Hero data API
app.get('/api/cms/heroes', authenticate, (req, res) => {
  const data = readHeroData();
  res.json({ data });
});

app.post('/api/cms/heroes', authenticate, (req, res) => {
  const { data } = req.body || {};
  if (!Array.isArray(data)) return res.status(400).json({ error: 'Invalid payload' });
  const ok = writeHeroData(data);
  if (ok) return res.json({ success: true });
  return res.status(500).json({ error: 'Failed to save hero data' });
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

  // Restrict translation direction to French -> English only
  if (fromLang !== 'fr' || toLang !== 'en') {
    return res.status(400).json({
      error: 'Seule la traduction du français vers l\'anglais est supportée',
      translatedText: text
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn('[translate] Missing ANTHROPIC_API_KEY');
    return res.json({ translatedText: text, message: 'Translation service unavailable (missing API key), using original text' });
  }

  // Preserve <img> tags (including base64) by replacing them with placeholders before translation
  const imgTags = [];
  const textWithoutImages = String(text || '').replace(/<img[\s\S]*?>/gi, (match) => {
    const index = imgTags.push(match) - 1;
    return `__IMG_${index}__`;
  });

  // Try a small, safe list of model fallbacks
  const candidateModels = [
    'claude-3-7-sonnet-2025-02-19',
    'claude-3-5-sonnet-latest',
    'claude-3-5-sonnet-20241022',
    'claude-3-opus-20240229',
    'claude-3-haiku-20240307',
    // Original model kept last, in case the key supports it
    'claude-sonnet-4-20250514'
  ];

  const systemPrompt = `You are a professional French-English translator specializing in business content for Groupe Tonic, a Quebec-based event production company. Translate text while preserving:
- HTML formatting (spans, links, bold, etc.)
- Professional tone and business terminology
- Brand names (keep French: "Groupe Tonic", "Beach Pro Tour", etc.)
- Quebec French cultural context when translating to English
- All technical formatting and structure

Return ONLY the translated text, no explanations. Do not truncate or summarize; return the full translation with all sections.`;

  // Helper: call Anthropic once
  async function callAnthropicOnce(model, content) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model,
        max_tokens: 6000,
        system: systemPrompt,
        messages: [{ role: 'user', content }]
      })
    });
    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status} ${errText?.slice(0, 240)}`);
    }
    const result = await response.json();
    return result?.content?.[0]?.text ?? '';
  }

  // Helper: try multiple models
  async function translateWithFallback(content) {
    let lastErr = '';
    for (const model of candidateModels) {
      try {
        const prompt = `Translate this French text to English:\n\n${content}`;
        const out = await callAnthropicOnce(model, prompt);
        if (out && out.trim()) return { text: out, model };
      } catch (e) {
        lastErr = e?.message || String(e);
        console.error(`[translate] ${model} failed:`, lastErr);
        if (/HTTP\s+(401|403)/.test(lastErr)) break; // auth error → stop
      }
    }
    return { text: '', error: lastErr };
  }

  // Chunking for long HTML to avoid truncation
  function splitHtmlIntoChunks(html, maxLen = 5000) {
    const parts = html.split(/(<\/p>|<li\b[^>]*>|<\/li>|<br\s*\/?>|\n\n+)/i);
    const chunks = [];
    let buf = '';
    for (const part of parts) {
      if ((buf + part).length > maxLen && buf) {
        chunks.push(buf);
        buf = part;
      } else {
        buf += part;
      }
    }
    if (buf) chunks.push(buf);
    return chunks;
  }

  const chunks = splitHtmlIntoChunks(textWithoutImages, 4500);
  let translated = '';
  let usedModel = '';
  for (let i = 0; i < chunks.length; i++) {
    const { text: piece, model, error } = await translateWithFallback(chunks[i]);
    if (!piece) {
      console.warn('[translate] chunk failed, falling back to original for this chunk:', error);
      translated += chunks[i];
      continue;
    }
    if (!usedModel) usedModel = model;
    translated += piece;
  }

  // Remove any stray bracketed meta-notes the model might add
  translated = translated.replace(/\n?\s*\[[^\]]*(translate|translation|continued|formatting)[^\]]*\]\s*/gi, '\n');

  // Restore images
  translated = translated.replace(/__IMG_(\d+)__/g, (_, n) => imgTags[Number(n)] ?? '');

  if (!translated || !translated.trim()) {
    return res.json({ translatedText: text, message: 'Translation service unavailable, using original text' });
  }

  return res.json({ translatedText: translated, message: `Translated using Claude API${usedModel ? ` (${usedModel})` : ''}` });
});

// Save/Update content endpoint
// EMERGENCY: Restore from bundled backup
app.post('/api/cms/emergency-restore', authenticate, (req, res) => {
  try {
    console.log('[EMERGENCY] Starting restore from bundled files...');
    
    // Restore news FR
    const newsFrPath = path.join(__dirname, 'client/public/js/communiques-data.js');
    if (fs.existsSync(newsFrPath)) {
      const destPath = path.join(DATA_DIR, 'communiques-data.js');
      fs.copyFileSync(newsFrPath, destPath);
      console.log('[EMERGENCY] ✓ Restored communiques-data.js');
    }
    
    // Restore news EN
    const newsEnPath = path.join(__dirname, 'client/public/js/communiques-data-en.js');
    if (fs.existsSync(newsEnPath)) {
      const destPath = path.join(DATA_DIR, 'communiques-data-en.js');
      fs.copyFileSync(newsEnPath, destPath);
      console.log('[EMERGENCY] ✓ Restored communiques-data-en.js');
    }
    
    // Restore jobs FR
    const jobsFrPath = path.join(__dirname, 'client/public/js/emplois-data.js');
    if (fs.existsSync(jobsFrPath)) {
      const destPath = path.join(DATA_DIR, 'emplois-data.js');
      fs.copyFileSync(jobsFrPath, destPath);
      console.log('[EMERGENCY] ✓ Restored emplois-data.js');
    }
    
    // Restore jobs EN
    const jobsEnPath = path.join(__dirname, 'client/public/js/emplois-data-en.js');
    if (fs.existsSync(jobsEnPath)) {
      const destPath = path.join(DATA_DIR, 'emplois-data-en.js');
      fs.copyFileSync(jobsEnPath, destPath);
      console.log('[EMERGENCY] ✓ Restored emplois-data-en.js');
    }
    
    res.json({ success: true, message: 'Emergency restore completed' });
  } catch (err) {
    console.error('[EMERGENCY] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/cms/content/:type/:lang', authenticate, (req, res) => {
  const { type, lang } = req.params;
  const { data } = req.body;
  
  console.log(`Saving ${type} content for ${lang}`);
  console.log(`Received ${data?.length || 0} items to save`);
  
  // Log first item for debugging
  if (data.length > 0) {
    console.log('First item:', {
      id: data[0].id,
      title: data[0].title?.substring(0, 50) + '...',
      category: data[0].category
    });
  }
  
  let filename, variableName;
  
  if (type === 'news' && lang === 'fr') {
    filename = 'communiques-data.js';
    variableName = 'pressReleases';
  } else if (type === 'news' && lang === 'en') {
    filename = 'communiques-data-en.js';
    variableName = 'pressReleasesEn';
  } else if (type === 'jobs' && lang === 'fr') {
    filename = 'emplois-data.js';
    variableName = 'jobListings';
  } else if (type === 'jobs' && lang === 'en') {
    filename = 'emplois-data-en.js';
    variableName = 'jobListingsEn';
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
    variableName = 'pressReleasesEn';
  } else if (type === 'jobs' && lang === 'fr') {
    filename = 'emplois-data.js';
    variableName = 'jobListings';
  } else if (type === 'jobs' && lang === 'en') {
    filename = 'emplois-data-en.js';
    variableName = 'jobListingsEn';
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

// Specific routes for CMS (still separate)
app.get('/cms', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/cms.html'));
});

app.get('/cms.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/cms.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/cms.html'));
});

// SPA Routes - All routes now serve the main index.html
// The client-side JavaScript will handle the routing
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.get('/a-propos', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.get('/emplois', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.get('/emplois-en', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.get('/communiques', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.get('/communiques-en', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.get('/nous-joindre', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.get('/nous-joindre-en', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

// Homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.get('/index-en.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

// Lightweight health check for platform probes
app.get('/healthz', (req, res) => {
  res.status(200).send('ok');
});

// Catch-all route for SPA - serves index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

// Bind explicitly to 0.0.0.0 for Railway/public networking compatibility
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving static files from: ${path.join(__dirname, 'client/public')}`);
});

// Graceful shutdown to avoid crashy logs on rolling deploys
const shutdown = (signal) => {
  try {
    console.log(`[lifecycle] Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      console.log('[lifecycle] HTTP server closed. Exiting.');
      process.exit(0);
    });
    // Failsafe in case close hangs
    setTimeout(() => {
      console.warn('[lifecycle] Force exit after timeout');
      process.exit(0);
    }, 10000).unref();
  } catch (e) {
    console.error('[lifecycle] Shutdown error:', e?.message || e);
    process.exit(0);
  }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
