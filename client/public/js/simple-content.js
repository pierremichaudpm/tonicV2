// Simple content management system for Groupe Tonic

// Category images mapping
const categoryImages = {
    'Beach Pro Tour': 'images/beach-pro-tour-hero.webp',
    'Grands Prix Cyclistes': 'images/grands-prix-cyclistes-hero.jpg',
    'Marathon Beneva 21K': 'images/marathon-beneva-hero.jpg',
    'UCI 2026': 'images/montreal-2026-uci-hero.jpg',
    'Studio 76': 'images/studio76-logo.png',
    'Dock 619': 'images/dock619-hero-new.jpg',
    '21K de Montréal': 'images/21k-hero.jpg',
    'Groupe Tonic': 'images/tonic-logo.png'
};

// Get image for category
function getImage(category) {
    return categoryImages[category] || 'images/tonic-logo.png';
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Get news content
function getNews() {
    if (typeof pressReleases !== 'undefined') {
        return pressReleases;
    }
    return [];
}

// Get jobs content
function getJobs() {
    if (typeof jobListings !== 'undefined') {
        return jobListings;
    }
    return [];
}

// Add new content (basic implementation)
function addNewContent(item) {
    if (item.type === 'news') {
        item.id = Date.now();
        if (typeof pressReleases !== 'undefined') {
            pressReleases.unshift(item);
        }
    } else if (item.type === 'jobs') {
        item.id = Date.now();
        if (typeof jobListings !== 'undefined') {
            jobListings.unshift(item);
        }
    }
}

// Delete content (basic implementation)
function deleteContent(id) {
    if (typeof pressReleases !== 'undefined') {
        const newsIndex = pressReleases.findIndex(item => item.id === id);
        if (newsIndex > -1) {
            pressReleases.splice(newsIndex, 1);
            return;
        }
    }
    
    if (typeof jobListings !== 'undefined') {
        const jobIndex = jobListings.findIndex(item => item.id === id);
        if (jobIndex > -1) {
            jobListings.splice(jobIndex, 1);
        }
    }
}