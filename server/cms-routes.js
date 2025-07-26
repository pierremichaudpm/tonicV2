import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// Password for simple authentication
const ADMIN_PASSWORD = 'admin123';

// Simple authentication middleware
const authenticate = (req, res, next) => {
    const password = req.headers['x-admin-password'];
    if (password === ADMIN_PASSWORD) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Helper function to read data files
const readDataFile = (filename) => {
    try {
        const filePath = path.join(__dirname, '../client/public/js', filename);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Extract the array from the JavaScript file
        const match = content.match(/const \w+ = (\[[\s\S]*?\]);/);
        if (match) {
            return JSON.parse(match[1]);
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
        const filePath = path.join(__dirname, '../client/public/js', filename);
        const content = `// ${filename.includes('en') ? 'English' : 'French'} ${filename.includes('communiques') ? 'news' : 'jobs'} data${filename.includes('en') ? '' : ''}  
const ${variableName} = ${JSON.stringify(data, null, 4)};`;
        
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing data file:', error);
        return false;
    }
};

// Get content endpoint
router.get('/content/:type/:lang', authenticate, (req, res) => {
    const { type, lang } = req.params;
    
    let filename, data;
    
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

// Save content endpoint
router.post('/content/:type/:lang', authenticate, (req, res) => {
    const { type, lang } = req.params;
    const { data } = req.body;
    
    let filename, variableName, success;
    
    if (type === 'news' && lang === 'fr') {
        success = writeDataFile('communiques-data.js', data, 'pressReleases');
    } else if (type === 'news' && lang === 'en') {
        success = writeDataFile('communiques-data-en.js', data, 'communiquesData');
    } else if (type === 'jobs' && lang === 'fr') {
        success = writeDataFile('emplois-data.js', data, 'jobListings');
    } else if (type === 'jobs' && lang === 'en') {
        success = writeDataFile('emplois-data-en.js', data, 'jobsData');
    } else {
        return res.status(400).json({ error: 'Invalid type or language' });
    }
    
    if (success) {
        res.json({ success: true, message: 'Content saved successfully' });
    } else {
        res.status(500).json({ error: 'Failed to save content' });
    }
});

export default router;