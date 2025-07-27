// shared.js - Shared JavaScript across all pages

// Navigation Icons SVG Components
const Icons = {
    grid: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    
    briefcase: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    
    newspaper: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M10 6h8"/><path d="M10 10h8"/><path d="M10 14h4"/></svg>',
    
    mail: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>'
};

// Category utilities
const CategoryUtils = {
    // Get category image path
    getImage(category) {
        const imageMap = {
            'Beach Pro Tour': '/images/beach-pro-tour-hero.webp',
            'Grands Prix Cyclistes': '/images/grands-prix-cyclistes-hero.jpg',
            'Marathon Beneva 21K': '/images/marathon-beneva-hero.jpg',
            'UCI 2026': '/images/montreal-2026-uci-hero.jpg',
            'Studio 76': '/images/tonic-productions-hero.jpg',
            'Dock 619': '/images/dock619-hero-new.jpg',
            '21K de Montréal': '/images/21k-hero.jpg',
            'Groupe Tonic': '/images/groupe-tonic-logo.svg'
        };
        return imageMap[category] || '/images/tonic-productions-hero.jpg';
    },
    
    // Get category CSS class
    getClass(category) {
        const classMap = {
            'Beach Pro Tour': 'category-beach',
            'Grands Prix Cyclistes': 'category-cycling',
            'Marathon Beneva 21K': 'category-marathon',
            'UCI 2026': 'category-uci',
            'Studio 76': 'category-studio',
            'Dock 619': 'category-dock',
            '21K de Montréal': 'category-21k',
            'Groupe Tonic': 'category-tonic'
        };
        return classMap[category] || 'category-tonic';
    }
};

// Toggle Mobile Menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Handle form submission (for contact form)
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Contact - ${data.subject}`);
    const body = encodeURIComponent(`
Nom: ${data.name}
Courriel: ${data.email}
Sujet: ${data.subject}

Message:
${data.message}
    `);
    
    // Open email client
    window.location.href = `mailto:info@groupetonic.ca?subject=${subject}&body=${body}`;
    
    // Reset form
    event.target.reset();
    
    // Show success message (optional)
    alert('Votre message a été préparé. Veuillez l\'envoyer via votre client de messagerie.');
}

// Date formatting utilities
const DateUtils = {
    // Format date in French
    formatFrench(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-CA', options);
    },
    
    // Format date in English
    formatEnglish(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    },
    
    // Get days since posting in French
    getDaysSinceFrench(dateString) {
        const posted = new Date(dateString);
        const today = new Date();
        const diffTime = Math.abs(today - posted);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return "Aujourd'hui";
        if (diffDays === 1) return "Hier";
        if (diffDays < 7) return `Il y a ${diffDays} jours`;
        if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaine${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
        return `Il y a ${Math.floor(diffDays / 30)} mois`;
    },
    
    // Get days since posting in English
    getDaysSinceEnglish(dateString) {
        const posted = new Date(dateString);
        const today = new Date();
        const diffTime = Math.abs(today - posted);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
        return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
    }
};

// Backwards compatibility
function formatDate(dateString) {
    return DateUtils.formatFrench(dateString);
}

// Initialize shared components
document.addEventListener('DOMContentLoaded', function() {
    // Track page load time for performance (production ready)
    const loadTime = performance.now();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuButton = event.target.closest('button[onclick*="toggleMobileMenu"]');
        
        if (mobileMenu && mobileMenu.classList.contains('active') && !mobileMenu.contains(event.target) && !menuButton) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Handle escape key to close mobile menu
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        }
    });
});