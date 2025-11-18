import fs from 'fs';
import https from 'https';

const backup = JSON.parse(fs.readFileSync('cms_backup_20250902-134445/news_fr.json', 'utf8'));

console.log(`📦 ${backup.data.length} communiqués à restaurer\n`);

// Commencer avec un tableau vide
let currentData = [];

async function restore() {
  for (let i = 0; i < backup.data.length; i++) {
    const article = backup.data[i];
    currentData.push(article);
    
    console.log(`📤 ${i+1}/${backup.data.length}: ${article.title.substring(0, 50)}...`);
    
    const data = JSON.stringify({ data: currentData });
    
    await new Promise((resolve, reject) => {
      const options = {
        hostname: 'www.groupetonic.ca',
        port: 443,
        path: '/api/cms/content/news/fr',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': 'Axelle20',
          'Content-Length': data.length
        }
      };
      
      const req = https.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => { responseData += chunk; });
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log(`  ✅ OK`);
            resolve();
          } else {
            console.log(`  ❌ Erreur ${res.statusCode}`);
            reject(new Error(`Status ${res.statusCode}`));
          }
        });
      });
      
      req.on('error', reject);
      req.write(data);
      req.end();
    }).catch(err => {
      console.log(`  ⚠️  Arrêt: ${err.message}`);
      process.exit(1);
    });
    
    await new Promise(r => setTimeout(r, 1000)); // Pause 1s entre chaque
  }
  
  console.log('\n✅ RESTAURATION TERMINÉE!');
}

restore();

