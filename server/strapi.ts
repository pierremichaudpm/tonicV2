import Strapi from '@strapi/strapi';
import path from 'path';

let strapiInstance: any = null;

export async function startStrapi() {
  if (!strapiInstance) {
    const strapiPath = path.resolve('./cms');
    process.chdir(strapiPath);
    
    strapiInstance = Strapi({
      distDir: './dist',
      appDir: strapiPath,
    });
    
    await strapiInstance.load();
    await strapiInstance.start();
    
    console.log('🚀 Strapi started on http://localhost:1337');
  }
  return strapiInstance;
}

export { strapiInstance };