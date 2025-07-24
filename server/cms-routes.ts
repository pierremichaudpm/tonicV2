import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();

// Simple user store - in production, use a proper database
const ADMIN_USER = {
  username: 'admin',
  password: '$2a$10$8K1p/a0dHCEW0FHPJHQ9eOeSYgL4UMwuS/JhBe0xE3VFkTg5U8fvi' // 'admin123'
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Data file paths
const JOBS_FILE = path.join(process.cwd(), 'client/public/js/emplois-data.js');
const NEWS_FILE = path.join(process.cwd(), 'client/public/js/communiques-data.js');

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
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USER.username) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isValidPassword = await bcrypt.compare(password, ADMIN_USER.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, username });
});

// Helper functions to read/write data files
async function readJobsData() {
  try {
    const content = await fs.readFile(JOBS_FILE, 'utf8');
    const match = content.match(/const jobsData = (\[.*?\]);/);
    return match ? JSON.parse(match[1]) : [];
  } catch (error) {
    return [];
  }
}

async function writeJobsData(jobs: any[]) {
  const content = `const jobsData = ${JSON.stringify(jobs, null, 2)};`;
  await fs.writeFile(JOBS_FILE, content, 'utf8');
}

async function readNewsData() {
  try {
    const content = await fs.readFile(NEWS_FILE, 'utf8');
    const match = content.match(/const communiquesData = (\[.*?\]);/);
    return match ? JSON.parse(match[1]) : [];
  } catch (error) {
    return [];
  }
}

async function writeNewsData(news: any[]) {
  const content = `const communiquesData = ${JSON.stringify(news, null, 2)};`;
  await fs.writeFile(NEWS_FILE, content, 'utf8');
}

// Jobs endpoints
router.get('/jobs', authenticateToken, async (req, res) => {
  try {
    const jobs = await readJobsData();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error reading jobs data' });
  }
});

router.post('/jobs', authenticateToken, async (req, res) => {
  try {
    const jobs = await readJobsData();
    const newJob = {
      id: Date.now(),
      ...req.body,
      datePosted: new Date().toISOString().split('T')[0]
    };
    jobs.push(newJob);
    await writeJobsData(jobs);
    res.json(newJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job' });
  }
});

router.put('/jobs/:id', authenticateToken, async (req, res) => {
  try {
    const jobs = await readJobsData();
    const index = jobs.findIndex((job: any) => job.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Job not found' });
    }
    jobs[index] = { ...jobs[index], ...req.body };
    await writeJobsData(jobs);
    res.json(jobs[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating job' });
  }
});

router.delete('/jobs/:id', authenticateToken, async (req, res) => {
  try {
    const jobs = await readJobsData();
    const filtered = jobs.filter((job: any) => job.id != req.params.id);
    await writeJobsData(filtered);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job' });
  }
});

// News endpoints
router.get('/news', authenticateToken, async (req, res) => {
  try {
    const news = await readNewsData();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error reading news data' });
  }
});

router.post('/news', authenticateToken, async (req, res) => {
  try {
    const news = await readNewsData();
    const newArticle = {
      id: Date.now(),
      ...req.body
    };
    news.push(newArticle);
    await writeNewsData(news);
    res.json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating news article' });
  }
});

router.put('/news/:id', authenticateToken, async (req, res) => {
  try {
    const news = await readNewsData();
    const index = news.findIndex((article: any) => article.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Article not found' });
    }
    news[index] = { ...news[index], ...req.body };
    await writeNewsData(news);
    res.json(news[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating article' });
  }
});

router.delete('/news/:id', authenticateToken, async (req, res) => {
  try {
    const news = await readNewsData();
    const filtered = news.filter((article: any) => article.id != req.params.id);
    await writeNewsData(filtered);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article' });
  }
});

export default router;