// Simple content management system for Groupe Tonic

// Category images mapping - optimized WebP versions
const categoryImages = {
    'Beach Pro Tour': 'images/beach-pro-tour-hero.webp',
    'Grands Prix Cyclistes': 'images/grands-prix-cyclistes-hero.webp',
    'Marathon Beneva 21K': 'images/marathon-beneva-hero.webp',
    'UCI 2026': 'images/montreal-2026-uci-hero.webp',
    'Studio 76': 'images/studio76-hero.webp',
    'Dock 619': 'images/dock619-hero-new.webp',
    '21K de Montréal': 'images/21k-hero.webp',
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

// Get English news content
function getNewsEn() {
    if (typeof communiquesData !== 'undefined') {
        return communiquesData;
    }
    return [];
}

// Get English jobs content
function getJobsEn() {
    if (typeof jobsData !== 'undefined') {
        return jobsData;
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

// Add English content functions
function addNewContentEn(item) {
    item.id = Date.now();
    if (typeof communiquesData !== 'undefined') {
        communiquesData.unshift(item);
    }
}

function addNewJobEn(item) {
    item.id = Date.now();
    if (typeof jobsData !== 'undefined') {
        jobsData.unshift(item);
    }
}

function addNewJob(item) {
    item.id = Date.now();
    if (typeof jobListings !== 'undefined') {
        jobListings.unshift(item);
    }
}

// Delete content functions
function deleteNewsItem(id) {
    if (typeof pressReleases !== 'undefined') {
        const newsIndex = pressReleases.findIndex(item => item.id === id);
        if (newsIndex > -1) {
            pressReleases.splice(newsIndex, 1);
        }
    }
}

function deleteNewsItemEn(id) {
    if (typeof communiquesData !== 'undefined') {
        const newsIndex = communiquesData.findIndex(item => item.id === id);
        if (newsIndex > -1) {
            communiquesData.splice(newsIndex, 1);
        }
    }
}

function deleteJobItem(id) {
    if (typeof jobListings !== 'undefined') {
        const jobIndex = jobListings.findIndex(item => item.id === id);
        if (jobIndex > -1) {
            jobListings.splice(jobIndex, 1);
        }
    }
}

function deleteJobItemEn(id) {
    if (typeof jobsData !== 'undefined') {
        const jobIndex = jobsData.findIndex(item => item.id === id);
        if (jobIndex > -1) {
            jobsData.splice(jobIndex, 1);
        }
    }
}

// Legacy delete function for backward compatibility
function deleteContent(id) {
    deleteNewsItem(id);
    deleteJobItem(id);
}

// Render jobs function for French job page
function renderJobs() {
    const jobsList = document.getElementById('jobsList');
    if (!jobsList) return;

    const jobs = getJobs();
    
    if (jobs.length === 0) {
        jobsList.innerHTML = '<p class="text-center text-gray-400">Aucun poste disponible pour le moment.</p>';
        return;
    }

    jobsList.innerHTML = jobs.map(job => `
        <article class="job-card bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-black/60 transition-all duration-300 cursor-pointer" onclick="openJobModal('${job.id}')">
            <div class="flex flex-col sm:flex-row">
                <div class="sm:w-48 h-32 bg-gray-800 flex-shrink-0 relative overflow-hidden">
                    <img src="${getImage(job.category)}" alt="${job.category}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                </div>
                <div class="p-6 flex-1">
                    <div class="flex flex-wrap items-center gap-2 mb-3">
                        <span class="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">${job.category}</span>
                        <span class="text-gray-400 text-sm">${formatDate(job.date)}</span>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">${job.title}</h3>
                    <p class="text-gray-300 text-sm mb-3">${job.subtitle}</p>
                    <button class="text-orange-400 hover:text-orange-300 font-medium text-sm transition-colors">
                        Voir les détails →
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

// Render news function for French news page
function renderNews() {
    const prList = document.getElementById('prList');
    if (!prList) return;

    const news = getNews();
    
    if (news.length === 0) {
        prList.innerHTML = '<p class="text-center text-gray-400">Aucun communiqué disponible pour le moment.</p>';
        return;
    }

    prList.innerHTML = news.map(item => `
        <article class="pr-card bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-black/60 transition-all duration-300 cursor-pointer" onclick="openNewsModal('${item.id}')">
            <div class="flex flex-col sm:flex-row">
                <div class="sm:w-48 h-32 bg-gray-800 flex-shrink-0 relative overflow-hidden">
                    <img src="${getImage(item.category)}" alt="${item.category}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                </div>
                <div class="p-6 flex-1">
                    <div class="flex flex-wrap items-center gap-2 mb-3">
                        <span class="px-3 py-1 bg-pink-600/20 text-pink-400 rounded-full text-sm font-medium">${item.category}</span>
                        <span class="text-gray-400 text-sm">${formatDate(item.date)}</span>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">${item.title}</h3>
                    <p class="text-gray-300 text-sm mb-3">${item.subtitle}</p>
                    <button class="text-orange-400 hover:text-orange-300 font-medium text-sm transition-colors">
                        Lire la suite →
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

// Render English jobs function
function renderJobsEn() {
    const jobsList = document.getElementById('jobsList');
    if (!jobsList) return;

    const jobs = getJobsEn();
    
    if (jobs.length === 0) {
        jobsList.innerHTML = '<p class="text-center text-gray-400">No positions available at the moment.</p>';
        return;
    }

    jobsList.innerHTML = jobs.map(job => `
        <article class="job-card bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-black/60 transition-all duration-300 cursor-pointer" onclick="openJobModal('${job.id}')">
            <div class="flex flex-col sm:flex-row">
                <div class="sm:w-48 h-32 bg-gray-800 flex-shrink-0 relative overflow-hidden">
                    <img src="${getImage(job.category)}" alt="${job.category}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                </div>
                <div class="p-6 flex-1">
                    <div class="flex flex-wrap items-center gap-2 mb-3">
                        <span class="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">${job.category}</span>
                        <span class="text-gray-400 text-sm">${formatDate(job.date)}</span>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">${job.title}</h3>
                    <p class="text-gray-300 text-sm mb-3">${job.subtitle}</p>
                    <button class="text-orange-400 hover:text-orange-300 font-medium text-sm transition-colors">
                        View details →
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

// Render English news function
function renderNewsEn() {
    const prList = document.getElementById('prList');
    if (!prList) return;

    const news = getNewsEn();
    
    if (news.length === 0) {
        prList.innerHTML = '<p class="text-center text-gray-400">No press releases available at the moment.</p>';
        return;
    }

    prList.innerHTML = news.map(item => `
        <article class="news-card bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-black/60 transition-all duration-300 cursor-pointer" onclick="openNewsModal('${item.id}')">
            <div class="flex flex-col sm:flex-row">
                <div class="sm:w-48 h-32 bg-gray-800 flex-shrink-0 relative overflow-hidden">
                    <img src="${getImage(item.category)}" alt="${item.category}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                </div>
                <div class="p-6 flex-1">
                    <div class="flex flex-wrap items-center gap-2 mb-3">
                        <span class="px-3 py-1 bg-pink-600/20 text-pink-400 rounded-full text-sm font-medium">${item.category}</span>
                        <span class="text-gray-400 text-sm">${formatDate(item.date)}</span>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">${item.title}</h3>
                    <p class="text-gray-300 text-sm mb-3">${item.subtitle}</p>
                    <button class="text-orange-400 hover:text-orange-300 font-medium text-sm transition-colors">
                        Read more →
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

// Modal functions
function openJobModal(jobId) {
    const jobs = getJobs().concat(getJobsEn());
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const modal = document.getElementById('jobModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    if (modal && modalTitle && modalContent) {
        modalTitle.textContent = job.title;
        modalContent.innerHTML = `
            <div class="space-y-4">
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">${job.category}</span>
                    <span class="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">${job.subtitle}</span>
                </div>
                <div class="prose prose-invert max-w-none">
                    ${job.content || '<p>Aucune description disponible.</p>'}
                </div>
            </div>
        `;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function openNewsModal(newsId) {
    const news = getNews().concat(getNewsEn());
    const item = news.find(n => n.id === newsId);
    if (!item) return;

    const modal = document.getElementById('newsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    if (modal && modalTitle && modalContent) {
        modalTitle.textContent = item.title;
        modalContent.innerHTML = `
            <div class="space-y-4">
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="px-3 py-1 bg-pink-600/20 text-pink-400 rounded-full text-sm">${item.category}</span>
                    <span class="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">${formatDate(item.date)}</span>
                </div>
                <div class="prose prose-invert max-w-none">
                    ${item.content || '<p>Aucun contenu disponible.</p>'}
                </div>
            </div>
        `;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const jobModal = document.getElementById('jobModal');
    const newsModal = document.getElementById('newsModal');
    
    if (jobModal) {
        jobModal.style.display = 'none';
    }
    if (newsModal) {
        newsModal.style.display = 'none';
    }
    document.body.style.overflow = 'auto';
}

// Initialize page content when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Check what page we're on and render appropriate content
    if (document.getElementById('jobsList')) {
        if (window.location.pathname.includes('-en.html')) {
            renderJobsEn();
        } else {
            renderJobs();
        }
    }
    
    if (document.getElementById('prList')) {
        if (window.location.pathname.includes('-en.html')) {
            renderNewsEn();
        } else {
            renderNews();
        }
    }

    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-backdrop')) {
            closeModal();
        }
    });
});