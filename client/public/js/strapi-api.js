// Strapi API Integration
// This file provides functions to load data from Strapi CMS
// Falls back to local data files if Strapi is unavailable

// Update this URL after deploying Strapi to Render:
const STRAPI_BASE_URL = 'https://your-cms-name.onrender.com/api'; // TODO: Replace with your Render URL
// For local development: 'http://localhost:1337/api'

// Check if Strapi is available
async function isStrapiAvailable() {
    try {
        const response = await fetch(`${STRAPI_BASE_URL}/jobs?pagination[limit]=1`);
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Convert Strapi job data to our existing format
function convertStrapiJob(strapiJob) {
    const job = strapiJob.attributes;
    return {
        id: strapiJob.id,
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        description: job.description,
        requirements: job.requirements || '',
        salary: job.salary || '',
        deadline: job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : null,
        contact: job.contact_email || 'rh@gpcqm.ca',
        featured: job.featured || false,
        pdfUrl: job.pdf_attachment?.data?.attributes?.url || null
    };
}

// Convert Strapi news data to our existing format
function convertStrapiNews(strapiNews) {
    const news = strapiNews.attributes;
    return {
        id: strapiNews.id,
        date: news.publish_date ? new Date(news.publish_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        title: news.title,
        category: news.category === 'press-release' ? 'Groupe Tonic' : news.category,
        summary: news.excerpt,
        content: news.content,
        image: news.featured_image?.data?.attributes?.url || null
    };
}

// Load jobs from Strapi
async function loadJobsFromStrapi() {
    try {
        const response = await fetch(`${STRAPI_BASE_URL}/jobs?populate=pdf_attachment&locale=fr&sort=createdAt:desc`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        
        const data = await response.json();
        return data.data.map(convertStrapiJob);
    } catch (error) {
        console.error('Error loading jobs from Strapi:', error);
        return null;
    }
}

// Load news from Strapi
async function loadNewsFromStrapi() {
    try {
        const response = await fetch(`${STRAPI_BASE_URL}/news-articles?populate=featured_image&locale=fr&sort=publish_date:desc`);
        if (!response.ok) throw new Error('Failed to fetch news');
        
        const data = await response.json();
        return data.data.map(convertStrapiNews);
    } catch (error) {
        console.error('Error loading news from Strapi:', error);
        return null;
    }
}

// Main function to load jobs (tries Strapi first, falls back to local data)
async function loadJobsData() {
    const strapiJobs = await loadJobsFromStrapi();
    if (strapiJobs && strapiJobs.length > 0) {
        console.log('✅ Jobs loaded from Strapi CMS');
        return strapiJobs;
    }
    
    // Fallback to local data
    console.log('📄 Using local jobs data');
    return typeof jobListings !== 'undefined' ? jobListings : [];
}

// Main function to load news (tries Strapi first, falls back to local data)
async function loadNewsData() {
    const strapiNews = await loadNewsFromStrapi();
    if (strapiNews && strapiNews.length > 0) {
        console.log('✅ News loaded from Strapi CMS');
        return strapiNews;
    }
    
    // Fallback to local data
    console.log('📄 Using local news data');
    return typeof pressReleases !== 'undefined' ? pressReleases : [];
}

// Export functions for use in other scripts
window.loadJobsData = loadJobsData;
window.loadNewsData = loadNewsData;