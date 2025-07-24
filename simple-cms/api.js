// Simple API to serve CMS data
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const dataFile = path.join(__dirname, 'cms-data.json');

// Initialize data file if it doesn't exist
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ jobs: [], news: [] }));
}

function readData() {
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

function writeData(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// Jobs API
app.get('/api/jobs', (req, res) => {
    const data = readData();
    res.json(data.jobs);
});

app.post('/api/jobs', (req, res) => {
    const data = readData();
    const job = {
        id: Date.now(),
        ...req.body,
        datePosted: new Date().toISOString().split('T')[0]
    };
    data.jobs.push(job);
    writeData(data);
    res.json(job);
});

app.delete('/api/jobs/:id', (req, res) => {
    const data = readData();
    data.jobs = data.jobs.filter(job => job.id != req.params.id);
    writeData(data);
    res.json({ success: true });
});

// News API
app.get('/api/news', (req, res) => {
    const data = readData();
    res.json(data.news);
});

app.post('/api/news', (req, res) => {
    const data = readData();
    const article = {
        id: Date.now(),
        ...req.body
    };
    data.news.push(article);
    writeData(data);
    res.json(article);
});

app.delete('/api/news/:id', (req, res) => {
    const data = readData();
    data.news = data.news.filter(article => article.id != req.params.id);
    writeData(data);
    res.json({ success: true });
});

// Serve CMS interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Simple CMS running on port ${PORT}`);
});