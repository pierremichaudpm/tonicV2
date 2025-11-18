import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'client/public/js');
// Store backups on volume (persistent) if DATA_DIR is set, otherwise in repo
const BACKUP_DIR = process.env.DATA_DIR 
  ? path.join(path.dirname(path.resolve(process.env.DATA_DIR)), 'cms_backups')
  : path.join(__dirname, 'cms_backups');

// Créer le dossier de backup s'il n'existe pas
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Créer un backup avec timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
const backupFolder = path.join(BACKUP_DIR, `backup_${timestamp}`);
fs.mkdirSync(backupFolder, { recursive: true });

console.log(`📦 Création du backup CMS: ${timestamp}\n`);

const filesToBackup = [
  { file: 'hero-data.js', name: 'Héros & événements' },
  { file: 'hero-order.js', name: 'Ordre des héros' },
  { file: 'communiques-data.js', name: 'Communiqués FR' },
  { file: 'communiques-data-en.js', name: 'Communiqués EN' },
  { file: 'emplois-data.js', name: 'Emplois FR' },
  { file: 'emplois-data-en.js', name: 'Emplois EN' }
];

let backed = 0;
let totalSize = 0;

filesToBackup.forEach(({ file, name }) => {
  const sourcePath = path.join(DATA_DIR, file);
  const destPath = path.join(backupFolder, file);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    const stats = fs.statSync(destPath);
    totalSize += stats.size;
    console.log(`  ✅ ${name} (${(stats.size / 1024).toFixed(1)} KB)`);
    backed++;
  } else {
    console.log(`  ⚠️  ${name} - fichier absent`);
  }
});

console.log(`\n✅ Backup terminé: ${backed}/${filesToBackup.length} fichiers`);
console.log(`📁 Taille totale: ${(totalSize / 1024).toFixed(1)} KB`);
console.log(`📍 Emplacement: ${backupFolder}\n`);

// Nettoyer les vieux backups (garder seulement les 30 derniers)
const backups = fs.readdirSync(BACKUP_DIR)
  .filter(f => f.startsWith('backup_'))
  .sort()
  .reverse();

if (backups.length > 30) {
  console.log(`🧹 Nettoyage des anciens backups (garder 30 derniers)...`);
  backups.slice(30).forEach(old => {
    const oldPath = path.join(BACKUP_DIR, old);
    fs.rmSync(oldPath, { recursive: true, force: true });
    console.log(`  🗑️  Supprimé: ${old}`);
  });
}

console.log(`\n💡 Backups disponibles: ${Math.min(backups.length, 30)}`);

