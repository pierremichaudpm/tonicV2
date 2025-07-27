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

// Catch all routes - serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving static files from: ${path.join(__dirname, 'client/public')}`);
});
