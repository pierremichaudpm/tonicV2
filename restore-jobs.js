// Script de restauration des emplois via l'API CMS
import fs from 'fs';
import https from 'https';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Axelle20';
const BASE_URL = 'https://www.groupetonic.ca';

async function restoreJobs() {
  console.log('📦 Lecture des backups...');
  
  const jobsFr = JSON.parse(fs.readFileSync('cms_backup_20250902-134445/jobs_fr.json', 'utf8'));
  const jobsEn = JSON.parse(fs.readFileSync('cms_backup_20250902-134445/jobs_en.json', 'utf8'));
  
  console.log(`✅ ${jobsFr.data.length} emplois FR trouvés`);
  console.log(`✅ ${jobsEn.data.length} emplois EN trouvés`);
  
  // Note: Vous devrez appeler manuellement l'API ou utiliser le CMS pour restaurer
  console.log('\n⚠️  Pour restaurer en prod, deux options:');
  console.log('1. Configurer le Volume Railway + DATA_DIR=/data');
  console.log('2. Re-créer les emplois via /cms (login avec mot de passe)');
  console.log('\nOu si vous avez curl:');
  console.log(`curl -X POST ${BASE_URL}/api/cms/content/jobs/fr \\`);
  console.log(`  -H "x-admin-password: ${ADMIN_PASSWORD}" \\`);
  console.log(`  -H "Content-Type: application/json" \\`);
  console.log(`  -d '${JSON.stringify({data: jobsFr.data})}'`);
}

restoreJobs().catch(console.error);

