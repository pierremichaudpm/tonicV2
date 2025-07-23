import { execSync } from 'child_process';
import { spawn } from 'child_process';

console.log('Starting Strapi CMS...');

// Build Strapi first
try {
  console.log('Building Strapi...');
  execSync('npm run build', { stdio: 'inherit', cwd: process.cwd() });
} catch (error) {
  console.error('Failed to build Strapi:', error);
}

// Start Strapi
const strapi = spawn('npm', ['run', 'start'], {
  stdio: 'inherit',
  cwd: process.cwd(),
  env: {
    ...process.env,
    PORT: process.env.STRAPI_PORT || '3001',
    NODE_ENV: 'production'
  }
});

strapi.on('error', (err) => {
  console.error('Failed to start Strapi:', err);
});

strapi.on('exit', (code) => {
  console.log(`Strapi exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  strapi.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  strapi.kill();
  process.exit();
});