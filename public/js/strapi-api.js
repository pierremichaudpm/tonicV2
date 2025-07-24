// Simple API replacement (no Strapi)
// This file provides the same interface but uses our simple backend

// Get admin password from session
function getAdminPassword() {
    return sessionStorage.getItem('admin_password');
}

// Check if user is authenticated
function isAuthenticated() {
    return !!getAdminPassword();
}

// Make authenticated request
async function makeAuthenticatedRequest(url, options = {}) {
    const password = getAdminPassword();
    if (!password) {
        throw new Error('Not authenticated');
    }
    
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'X-Admin-Password': password,
            ...options.headers
        }
    });
}

// Load jobs data from API
async function loadJobsFromAPI(lang = 'fr') {
    try {
        const response = await fetch(`/api/public/jobs?lang=${lang}`);
        return await response.json();
    } catch (error) {
        console.error('Error loading jobs:', error);
        return [];
    }
}

// Load news data from API  
async function loadNewsFromAPI(lang = 'fr') {
    try {
        const response = await fetch(`/api/public/news?lang=${lang}`);
        return await response.json();
    } catch (error) {
        console.error('Error loading news:', error);
        return [];
    }
}

// For backwards compatibility, set the data on window object
window.loadJobsFromAPI = loadJobsFromAPI;
window.loadNewsFromAPI = loadNewsFromAPI;