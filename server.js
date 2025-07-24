import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Simple authentication
const ADMIN_PASSWORD = 'admin123'; // Change this to your desired password

// Data directories
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Helper functions
async function readData(filename) {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, filename), 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeData(filename, data) {
  await fs.writeFile(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2));
}

// Authentication middleware
function authenticate(req, res, next) {
  const password = req.body.password || req.headers['x-admin-password'];
  if (password === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ message: 'Invalid password' });
  }
}

// Routes

// Login
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// Public endpoints (for website)
app.get('/api/public/jobs', async (req, res) => {
  const lang = req.query.lang || 'fr';
  const jobs = await readData(`jobs-${lang}.json`);
  res.json(jobs);
});

app.get('/api/public/news', async (req, res) => {
  const lang = req.query.lang || 'fr';
  const news = await readData(`news-${lang}.json`);
  res.json(news);
});

// CMS endpoints (password protected)
app.get('/api/cms/jobs', authenticate, async (req, res) => {
  const lang = req.query.lang || 'fr';
  const jobs = await readData(`jobs-${lang}.json`);
  res.json({ jobs });
});

app.post('/api/cms/jobs', authenticate, async (req, res) => {
  const lang = req.body.lang || 'fr';
  const jobs = await readData(`jobs-${lang}.json`);
  const newJob = { id: Date.now(), ...req.body };
  jobs.push(newJob);
  await writeData(`jobs-${lang}.json`, jobs);
  res.json(newJob);
});

app.put('/api/cms/jobs/:id', authenticate, async (req, res) => {
  const lang = req.body.lang || 'fr';
  const jobs = await readData(`jobs-${lang}.json`);
  const index = jobs.findIndex(j => j.id == req.params.id);
  if (index !== -1) {
    jobs[index] = { ...jobs[index], ...req.body };
    await writeData(`jobs-${lang}.json`, jobs);
    res.json(jobs[index]);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

app.delete('/api/cms/jobs/:id', authenticate, async (req, res) => {
  const lang = req.query.lang || 'fr';
  const jobs = await readData(`jobs-${lang}.json`);
  const filtered = jobs.filter(j => j.id != req.params.id);
  await writeData(`jobs-${lang}.json`, filtered);
  res.json({ message: 'Job deleted' });
});

// News endpoints (same pattern)
app.get('/api/cms/news', authenticate, async (req, res) => {
  const lang = req.query.lang || 'fr';
  const news = await readData(`news-${lang}.json`);
  res.json({ news });
});

app.post('/api/cms/news', authenticate, async (req, res) => {
  const lang = req.body.lang || 'fr';
  const news = await readData(`news-${lang}.json`);
  const newNews = { id: Date.now(), ...req.body };
  news.push(newNews);
  await writeData(`news-${lang}.json`, news);
  res.json(newNews);
});

app.put('/api/cms/news/:id', authenticate, async (req, res) => {
  const lang = req.body.lang || 'fr';
  const news = await readData(`news-${lang}.json`);
  const index = news.findIndex(n => n.id == req.params.id);
  if (index !== -1) {
    news[index] = { ...news[index], ...req.body };
    await writeData(`news-${lang}.json`, news);
    res.json(news[index]);
  } else {
    res.status(404).json({ message: 'News not found' });
  }
});

app.delete('/api/cms/news/:id', authenticate, async (req, res) => {
  const lang = req.query.lang || 'fr';
  const news = await readData(`news-${lang}.json`);
  const filtered = news.filter(n => n.id != req.params.id);
  await writeData(`news-${lang}.json`, filtered);
  res.json({ message: 'News deleted' });
});

// Serve admin login page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

// Start server
async function start() {
  await ensureDataDir();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();