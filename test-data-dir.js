// Script de test pour vérifier DATA_DIR
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = process.env.DATA_DIR 
  ? path.resolve(process.env.DATA_DIR)
  : path.join(__dirname, 'client/public/js');

console.log('📁 DATA_DIR:', DATA_DIR);
console.log('📝 Fichiers CMS:');

const cmsFiles = [
  'hero-data.js',
  'hero-order.js',
  'communiques-data.js',
  'emplois-data.js'
];

cmsFiles.forEach(file => {
  const filePath = path.join(DATA_DIR, file);
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  console.log(`  ${exists ? '✅' : '❌'} ${file} (${size} bytes)`);
});

console.log('\n💡 Pour activer la persistance Railway:');
console.log('   1. Créez un Volume avec mount path: /data');
console.log('   2. Ajoutez la variable: DATA_DIR=/data');
console.log('   3. Redéployez le service');
