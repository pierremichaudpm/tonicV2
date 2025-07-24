const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 1337;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize database tables
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        title_fr TEXT NOT NULL,
        title_en TEXT NOT NULL,
        department_fr TEXT,
        department_en TEXT,
        description_fr TEXT,
        description_en TEXT,
        location TEXT,
        salary TEXT,
        deadline DATE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        title_fr TEXT NOT NULL,
        title_en TEXT NOT NULL,
        content_fr TEXT,
        content_en TEXT,
        image_url TEXT,
        published_date DATE DEFAULT CURRENT_DATE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    console.log('Database tables initialized');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// API Routes
app.get('/api/jobs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/news', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM news ORDER BY published_date DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/jobs', async (req, res) => {
  const { title_fr, title_en, department_fr, department_en, description_fr, description_en, location, salary, deadline } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO jobs (title_fr, title_en, department_fr, department_en, description_fr, description_en, location, salary, deadline) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [title_fr, title_en, department_fr, department_en, description_fr, description_en, location, salary, deadline]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/news', async (req, res) => {
  const { title_fr, title_en, content_fr, content_en, image_url, published_date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO news (title_fr, title_en, content_fr, content_en, image_url, published_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title_fr, title_en, content_fr, content_en, image_url, published_date]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Simple admin interface
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Tonic CMS API', 
    endpoints: {
      jobs: '/api/jobs',
      news: '/api/news',
      admin: '/admin'
    }
  });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`CMS running on port ${port}`);
  initDB();
});