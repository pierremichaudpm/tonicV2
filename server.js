import express from 'express';
import path from 'path';
import compression from 'compression';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression());

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
