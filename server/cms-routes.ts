import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();

// Simple user store - in production, use a proper database
const ADMIN_USER = {
  username: 'admin',
  password: '$2b$10$pImuRuEJZcalS.0L.WNq/ezUJiSTN744i.e5sHTScIMXKCQWsg9ym' // 'admin123'
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Data file paths
const JOBS_FILE_FR = path.join(process.cwd(), 'client/public/js/emplois-data.js');
const NEWS_FILE_FR = path.join(process.cwd(), 'client/public/js/communiques-data.js');
const JOBS_FILE_EN = path.join(process.cwd(), 'client/public/js/emplois-data-en.js');
const NEWS_FILE_EN = path.join(process.cwd(), 'client/public/js/communiques-data-en.js');

// Authentication middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login endpoint
router.post('/login', (req, res) => {
  try {
    console.log('CMS Login request received:', req.body);
    const { username, password } = req.body;
    
    // Direct comparison
    if (username === 'admin' && password === 'admin123') {
      const token = jwt.sign({ username: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
      console.log('Login successful, token generated');
      return res.json({ token, username: 'admin' });
    }
    
    console.log('Login failed - wrong credentials');
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Helper functions to read/write data files
async function readJobsData(lang: string = 'fr') {
  try {
    const file = lang === 'en' ? JOBS_FILE_EN : JOBS_FILE_FR;
    console.log(`Reading jobs from: ${file}`);
    
    // Use eval to execute the JavaScript and get the data
    const content = await fs.readFile(file, 'utf8');
    const vm = require('vm');
    const context = {};
    vm.createContext(context);
    vm.runInContext(content, context);
    
    const data = context.jobListings || context.jobsData || [];
    console.log(`Successfully loaded ${data.length} jobs for ${lang}`);
    return data;
  } catch (error) {
    console.error(`Error reading jobs file (${lang}):`, error);
    return [];
  }
}

async function writeJobsData(jobs: any[], lang: string = 'fr') {
  const content = `const jobsData = ${JSON.stringify(jobs, null, 2)};`;
  const file = lang === 'en' ? JOBS_FILE_EN : JOBS_FILE_FR;
  await fs.writeFile(file, content, 'utf8');
}

async function readNewsData(lang: string = 'fr') {
  try {
    const file = lang === 'en' ? NEWS_FILE_EN : NEWS_FILE_FR;
    console.log(`Reading news from: ${file}`);
    
    // Use eval to execute the JavaScript and get the data
    const content = await fs.readFile(file, 'utf8');
    const vm = require('vm');
    const context = {};
    vm.createContext(context);
    vm.runInContext(content, context);
    
    const data = context.pressReleases || context.communiquesData || [];
    console.log(`Successfully loaded ${data.length} news items for ${lang}`);
    return data;
  } catch (error) {
    console.error(`Error reading news file (${lang}):`, error);
    return [];
  }
}

async function writeNewsData(news: any[], lang: string = 'fr') {
  const content = `const communiquesData = ${JSON.stringify(news, null, 2)};`;
  const file = lang === 'en' ? NEWS_FILE_EN : NEWS_FILE_FR;
  await fs.writeFile(file, content, 'utf8');
}

// Jobs endpoints
router.get('/jobs', authenticateToken, async (req, res) => {
  try {
    const lang = req.query.lang as string || 'fr';
    const jobs = await readJobsData(lang);
    res.json({ jobs, lang });
  } catch (error) {
    res.status(500).json({ message: 'Error reading jobs data' });
  }
});

router.post('/jobs', authenticateToken, async (req, res) => {
  try {
    const lang = req.body.lang || 'fr';
    const jobs = await readJobsData(lang);
    const newJob = {
      id: Date.now(),
      ...req.body,
      datePosted: new Date().toISOString().split('T')[0]
    };
    delete newJob.lang; // Remove lang from job data
    jobs.push(newJob);
    await writeJobsData(jobs, lang);
    res.json(newJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job' });
  }
});

router.put('/jobs/:id', authenticateToken, async (req, res) => {
  try {
    const lang = req.body.lang || 'fr';
    const jobs = await readJobsData(lang);
    const index = jobs.findIndex((job: any) => job.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Job not found' });
    }
    const updatedJob = { ...jobs[index], ...req.body };
    delete updatedJob.lang;
    jobs[index] = updatedJob;
    await writeJobsData(jobs, lang);
    res.json(jobs[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating job' });
  }
});

router.delete('/jobs/:id', authenticateToken, async (req, res) => {
  try {
    const lang = req.query.lang as string || 'fr';
    const jobs = await readJobsData(lang);
    const filtered = jobs.filter((job: any) => job.id != req.params.id);
    await writeJobsData(filtered, lang);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job' });
  }
});

// News endpoints
router.get('/news', authenticateToken, async (req, res) => {
  try {
    const lang = req.query.lang as string || 'fr';
    const news = await readNewsData(lang);
    res.json({ news, lang });
  } catch (error) {
    res.status(500).json({ message: 'Error reading news data' });
  }
});

router.post('/news', authenticateToken, async (req, res) => {
  try {
    const lang = req.body.lang || 'fr';
    const news = await readNewsData(lang);
    const newArticle = {
      id: Date.now(),
      ...req.body
    };
    delete newArticle.lang;
    news.push(newArticle);
    await writeNewsData(news, lang);
    res.json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating news article' });
  }
});

router.put('/news/:id', authenticateToken, async (req, res) => {
  try {
    const lang = req.body.lang || 'fr';
    const news = await readNewsData(lang);
    const index = news.findIndex((article: any) => article.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Article not found' });
    }
    const updatedArticle = { ...news[index], ...req.body };
    delete updatedArticle.lang;
    news[index] = updatedArticle;
    await writeNewsData(news, lang);
    res.json(news[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating article' });
  }
});

router.delete('/news/:id', authenticateToken, async (req, res) => {
  try {
    const lang = req.query.lang as string || 'fr';
    const news = await readNewsData(lang);
    const filtered = news.filter((article: any) => article.id != req.params.id);
    await writeNewsData(filtered, lang);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article' });
  }
});

export default router;