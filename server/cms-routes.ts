import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();

// Simple password authentication
const ADMIN_PASSWORD = 'admin123';

// Data file paths
const JOBS_FILE_FR = path.join(process.cwd(), 'client/public/js/emplois-data.js');
const NEWS_FILE_FR = path.join(process.cwd(), 'client/public/js/communiques-data.js');
const JOBS_FILE_EN = path.join(process.cwd(), 'client/public/js/emplois-data-en.js');
const NEWS_FILE_EN = path.join(process.cwd(), 'client/public/js/communiques-data-en.js');

// Simple authentication middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const password = req.headers['x-admin-password'];

  if (!password) {
    console.log('No password provided');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (password === ADMIN_PASSWORD) {
    console.log('Authentication successful');
    next();
  } else {
    console.log('Authentication failed - wrong password');
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Simple login endpoint (password only)
router.post('/login', (req, res) => {
  try {
    console.log('CMS Login request received:', req.body);
    const { password } = req.body;
    
    // Simple password check
    if (password === ADMIN_PASSWORD) {
      console.log('Login successful');
      return res.json({ success: true, message: 'Login successful' });
    }
    
    console.log('Login failed - wrong password');
    return res.status(401).json({ success: false, message: 'Invalid password' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Helper functions to read/write data files
async function readJobsData(lang: string = 'fr') {
  try {
    const file = lang === 'en' ? JOBS_FILE_EN : JOBS_FILE_FR;
    const content = await fs.readFile(file, 'utf8');
    
    // Extract the data from the file content
    if (lang === 'fr') {
      // French file uses jobListings variable
      const match = content.match(/const jobListings = (\[[\s\S]*?\]);/);
      if (match) {
        return eval(match[1]);
      }
    } else {
      // English file uses jobsData variable
      const match = content.match(/const jobsData = (\[[\s\S]*?\]);/);
      if (match) {
        return eval(match[1]);
      }
    }
  } catch (error) {
    console.error('Error reading jobs file:', error);
  }
  
  // Fallback to empty array if file reading fails
  return [];
}

async function writeJobsData(jobs: any[], lang: string = 'fr') {
  const variableName = lang === 'fr' ? 'jobListings' : 'jobsData';
  const content = `const ${variableName} = ${JSON.stringify(jobs, null, 2)};`;
  const file = lang === 'en' ? JOBS_FILE_EN : JOBS_FILE_FR;
  await fs.writeFile(file, content, 'utf8');
}

async function readNewsData(lang: string = 'fr') {
  try {
    const file = lang === 'en' ? NEWS_FILE_EN : NEWS_FILE_FR;
    const content = await fs.readFile(file, 'utf8');
    
    // Extract the data from the file content
    if (lang === 'fr') {
      // French file uses pressReleases variable
      const match = content.match(/const pressReleases = (\[[\s\S]*?\]);/);
      if (match) {
        return eval(match[1]);
      }
    } else {
      // English file uses communiquesData variable
      const match = content.match(/const communiquesData = (\[[\s\S]*?\]);/);
      if (match) {
        return eval(match[1]);
      }
    }
  } catch (error) {
    console.error('Error reading news file:', error);
  }
  
  // Fallback to empty array if file reading fails
  return [];
}

async function writeNewsData(news: any[], lang: string = 'fr') {
  const variableName = lang === 'fr' ? 'pressReleases' : 'communiquesData';
  const content = `const ${variableName} = ${JSON.stringify(news, null, 2)};`;
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
      datePosted: new Date().toISOString().split('T')[0],
      image: getCategoryImage(req.body.department) // Automatically assign image based on department
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
    const updatedJob = { 
      ...jobs[index], 
      ...req.body,
      image: getCategoryImage(req.body.department) // Automatically assign image based on department
    };
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

// Helper function to automatically assign image based on category
function getCategoryImage(category: string): string {
  const imageMap: { [key: string]: string } = {
    'Beach Pro Tour': 'images/beach-pro-tour-hero.webp',
    'Grands Prix Cyclistes': 'images/grands-prix-cyclistes-hero.jpg',
    'Marathon Beneva 21K': 'images/marathon-beneva-hero.jpg',
    'UCI 2026': 'images/montreal-2026-uci-hero.jpg',
    'Studio 76': 'images/studio-76-hero.jpg',
    'Dock 619': 'images/dock619-hero-new.jpg',
    '21K de Montréal': 'images/21k-hero.jpg',
    'Groupe Tonic': 'images/tonic-logo.png'
  };
  return imageMap[category] || 'images/tonic-logo.png';
}

router.post('/news', authenticateToken, async (req, res) => {
  try {
    const lang = req.body.lang || 'fr';
    const news = await readNewsData(lang);
    const newArticle = {
      id: Date.now(),
      ...req.body,
      image: getCategoryImage(req.body.category) // Automatically assign image based on category
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
    const updatedArticle = { 
      ...news[index], 
      ...req.body,
      image: getCategoryImage(req.body.category) // Automatically assign image based on category
    };
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