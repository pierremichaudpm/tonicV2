import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read existing data files and convert to JSON format
async function migrateData() {
  const dataDir = path.join(__dirname, 'data');
  
  try {
    // Ensure data directory exists
    await fs.mkdir(dataDir, { recursive: true });
    
    // Migrate French jobs
    try {
      const frJobsContent = await fs.readFile(path.join(__dirname, 'client/public/js/emplois-data.js'), 'utf8');
      const jobsMatch = frJobsContent.match(/const jobListings = (\[[\s\S]*?\]);/);
      if (jobsMatch) {
        const jobsData = eval(jobsMatch[1]);
        await fs.writeFile(path.join(dataDir, 'jobs-fr.json'), JSON.stringify(jobsData, null, 2));
        console.log('✅ French jobs migrated');
      }
    } catch (e) {
      console.log('⚠️ French jobs file not found or error:', e.message);
    }
    
    // Migrate English jobs
    try {
      const enJobsContent = await fs.readFile(path.join(__dirname, 'client/public/js/emplois-data-en.js'), 'utf8');
      const jobsMatch = enJobsContent.match(/const jobsData = (\[[\s\S]*?\]);/);
      if (jobsMatch) {
        const jobsData = eval(jobsMatch[1]);
        await fs.writeFile(path.join(dataDir, 'jobs-en.json'), JSON.stringify(jobsData, null, 2));
        console.log('✅ English jobs migrated');
      }
    } catch (e) {
      console.log('⚠️ English jobs file not found or error:', e.message);
    }
    
    // Migrate French news
    try {
      const frNewsContent = await fs.readFile(path.join(__dirname, 'client/public/js/communiques-data.js'), 'utf8');
      const newsMatch = frNewsContent.match(/const pressReleases = (\[[\s\S]*?\]);/);
      if (newsMatch) {
        const newsData = eval(newsMatch[1]);
        await fs.writeFile(path.join(dataDir, 'news-fr.json'), JSON.stringify(newsData, null, 2));
        console.log('✅ French news migrated');
      }
    } catch (e) {
      console.log('⚠️ French news file not found or error:', e.message);
    }
    
    // Migrate English news
    try {
      const enNewsContent = await fs.readFile(path.join(__dirname, 'client/public/js/communiques-data-en.js'), 'utf8');
      const newsMatch = enNewsContent.match(/const communiquesData = (\[[\s\S]*?\]);/);
      if (newsMatch) {
        const newsData = eval(newsMatch[1]);
        await fs.writeFile(path.join(dataDir, 'news-en.json'), JSON.stringify(newsData, null, 2));
        console.log('✅ English news migrated');
      }
    } catch (e) {
      console.log('⚠️ English news file not found or error:', e.message);
    }
    
    console.log('🎉 Data migration completed!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

migrateData();