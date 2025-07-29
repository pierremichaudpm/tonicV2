// shared.js - Shared JavaScript across all pages

// Navigation Icons SVG Components - Matching React homepage exactly
// Wrap in IIFE to avoid redeclaration conflicts
(function() {
    // Check if Icons already exists
    if (typeof window.Icons !== 'undefined') {
        return;
    }

    window.Icons = {
    grid: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',

    info: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',

    work: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',

    news: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M10 6h8"/><path d="M10 10h8"/><path d="M10 14h4"/></svg>',

    mail: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',

    lang: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5h12v4H3zM3 15h12v4H3zM8 10v4"/></svg>',

    instagram: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',

    linkedin: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',

    menu: () => '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',

    x: () => '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',

    // Legacy aliases for backwards compatibility
    briefcase: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    newspaper: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M10 6h8"/><path d="M10 10h8"/><path d="M10 14h4"/></svg>'
};
})(); // Close IIFE to avoid redeclaration conflicts

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

// Navigation factory functions matching React homepage exactly
function createNavItemsFrench() {
    return [
        {href: 'index.html', icon: window.Icons.grid(), label: 'Accueil'},
        {href: 'a-propos.html', icon: window.Icons.info(), label: 'À propos'},
        {href: 'emplois.html', icon: window.Icons.work(), label: 'Emplois'},
        {href: 'communiques.html', icon: window.Icons.news(), label: 'Communiqués'},
        {href: 'nous-joindre.html', icon: window.Icons.mail(), label: 'Nous joindre'},
        {href: 'https://www.instagram.com/groupetonic/', icon: window.Icons.instagram(), label: '', tooltip: 'Instagram', isSocial: true, target: '_blank'},
        {href: 'https://www.linkedin.com/company/groupe-tonic/', icon: window.Icons.linkedin(), label: '', tooltip: 'LinkedIn', isSocial: true, target: '_blank'}
    ];
}

function createNavItemsEnglish() {
    return [
        {href: 'index-en.html', icon: window.Icons.grid(), label: 'Home'},
        {href: 'about.html', icon: window.Icons.info(), label: 'About'},
        {href: 'emplois-en.html', icon: window.Icons.work(), label: 'Jobs'},
        {href: 'communiques-en.html', icon: window.Icons.news(), label: 'News'},
        {href: 'nous-joindre-en.html', icon: window.Icons.mail(), label: 'Contact'},
        {href: 'https://www.instagram.com/groupetonic/', icon: window.Icons.instagram(), label: '', tooltip: 'Instagram', isSocial: true, target: '_blank'},
        {href: 'https://www.linkedin.com/company/groupe-tonic/', icon: window.Icons.linkedin(), label: '', tooltip: 'LinkedIn', isSocial: true, target: '_blank'}
    ];
}

// Global state for mobile menu
window.mobileMenuOpen = false;

// Consistent mobile menu toggle function
function toggleMobileMenu() {
    console.log('toggleMobileMenu called - event timestamp:', Date.now());
    const mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu) {
        console.log('Mobile menu element not found');
        return;
    }

    // Initialize global state if not set
    if (typeof window.mobileMenuOpen === 'undefined') {
        window.mobileMenuOpen = false;
    }

    const isCurrentlyOpen = window.mobileMenuOpen;
    console.log('Menu currently open:', isCurrentlyOpen, 'Global state:', window.mobileMenuOpen);

    if (isCurrentlyOpen) {
        // Close menu
        mobileMenu.style.display = 'none';
        document.body.style.overflow = '';
        window.mobileMenuOpen = false;
        console.log('Menu closed - state updated to false');
    } else {
        // Open menu
        mobileMenu.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        window.mobileMenuOpen = true;
        console.log('Menu opened - state updated to true');
    }
}

// Simple, reliable mobile menu functionality  
function initializeMobileMenu() {
    console.log('initializeMobileMenu called');
    const hamburgerButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburgerButton && mobileMenu) {
        console.log('Mobile menu elements found, but skipping event listeners (using onclick)');
        // Skip adding event listeners since we're using onclick attributes

        // Close button - close menu (only if no onclick attribute)
        const closeButtons = mobileMenu.querySelectorAll('.mobile-close-btn');
        closeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleMobileMenu();
            });
        });

        // Close menu when clicking on navigation links (not social links)
        const navLinks = mobileMenu.querySelectorAll('a.nav-item:not([target="_blank"])');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Close menu after navigation
                setTimeout(() => {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }, 100);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(event.target) && 
                !hamburgerButton.contains(event.target)) {
                toggleMobileMenu();
            }
        });
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
const formatDate = DateUtils.formatFrench;
window.formatDate = formatDate;

// Optimized desktop navigation generation
function generateDesktopNav(isEnglish = false, currentPage = '') {
    const navItems = isEnglish ? createNavItemsEnglish() : createNavItemsFrench();
    const langLink = isEnglish ? 'index.html' : 'index-en.html';
    const langText = isEnglish ? 'FR' : 'EN';
    const normalizedCurrentPage = currentPage.toLowerCase().replace(/^\//, '');

    const navHTML = navItems.map(item => {
        const isActive = item.href && normalizedCurrentPage && 
            (item.href.toLowerCase() === normalizedCurrentPage || 
             item.href.toLowerCase().endsWith('/' + normalizedCurrentPage));

        return `<a href="${item.href}" ${item.target ? `target="${item.target}"` : ''} class="nav-item flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/10 transition-all text-white hover:text-white cursor-pointer${isActive ? ' bg-white/10' : ''}" data-tooltip="${item.tooltip || item.label}">
            <div style="color:white">${item.icon}</div>
            ${item.label ? `<span class="text-xs font-medium" ${item.isSocial ? 'data-social="true"' : ''}>${item.label}</span>` : ''}
        </a>`;
    }).join('');

    return `<nav class="hidden md:flex lg:flex items-center gap-0.5 px-2 py-0.5 rounded-full nav-container" style="background:rgba(0,0,0,0.2);backdrop-filter:blur(10px)">
        ${navHTML}
        <div class="lang-divider"></div>
        <a href="${langLink}" class="lang-switcher"><span>${langText}</span></a>
    </nav>`;
}

// Optimized mobile menu generation
function generateMobileMenu(isEnglish = false, currentPage = '') {
    const navItems = isEnglish ? createNavItemsEnglish() : createNavItemsFrench();
    const langLink = isEnglish ? 'index.html' : 'index-en.html';
    const langText = isEnglish ? 'Français' : 'English';
    const normalizedCurrentPage = currentPage.toLowerCase().replace(/^\//, '');

    const menuItems = navItems.map(item => {
        const isActive = item.href && normalizedCurrentPage && 
            (item.href.toLowerCase() === normalizedCurrentPage || 
             item.href.toLowerCase().endsWith('/' + normalizedCurrentPage));

        return `<a href="${item.href}" ${item.target ? `target="${item.target}"` : ''} class="nav-item w-full${isActive ? ' active' : ''}">
            <div style="color: white; stroke: white;">${item.icon}</div>
            <span>${item.label || item.tooltip}</span>
        </a>`;
    }).join('');

    return `<div id="mobileMenu" class="mobile-menu" style="padding-top: 0 !important;">
        <div class="bg-black/95 backdrop-blur-md border-b border-white/10 px-2 py-2 sm:px-4 sm:py-5" style="position: absolute; top: 0; left: 0; right: 0; z-index: 1000;">
            <div class="flex items-center justify-between">
                <div class="flex flex-col items-start gap-0">
                    <img src="images/tonic-logo.png" alt="Groupe Tonic Logo" style="width: clamp(180px,35vw,250px); height: auto;" />
                    <span class="text-white text-xs md:text-sm font-medium leading-tight" style="text-shadow: 0 2px 10px rgba(0,0,0,0.9);">Créateur d'expériences mémorables</span>
                </div>
                <button onclick="toggleMobileMenu()" class="p-2 hover:bg-white/10 rounded-lg" aria-label="Close">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
        <div class="container mx-auto px-4" style="padding-top: 100px; padding-bottom: 2rem;">
            <div class="space-y-2">
                ${menuItems}
                <a href="${langLink}" class="nav-item w-full">
                    <div style="color: white; stroke: white;">${window.Icons.lang()}</div>
                    <span>${langText}</span>
                </a>
            </div>
        </div>
    </div>`;
}

// Generate mobile menu button matching Replit standards
function generateMobileMenuButton() {
    return `
        <button id="mobileMenuButton" onclick="toggleMobileMenu()" 
                class="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-white" 
                style="background: rgba(0,0,0,0.2); backdrop-filter: blur(10px); color: white;">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color: white;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12h18M3 6h18M3 18h18"></path>
            </svg>
        </button>
    `;
}act homepage
function generateMobileMenuButton() {
    return `
        <button id="mobileMenuButton" onclick="toggleMobileMenu()" class="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-white" style="background:rgba(0,0,0,0.2);backdrop-filter:blur(10px);color:white">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12h18M3 6h18M3 18h18"></path>
            </svg>
        </button>
    `;
}

// Ensure mobile menu close functionality works across all pages
document.addEventListener('DOMContentLoaded', function() {
    // Make sure toggleMobileMenu is available globally
    if (typeof window.toggleMobileMenu === 'undefined') {
        window.toggleMobileMenu = toggleMobileMenu;
    }



    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuButton = event.target.closest('button[onclick*="toggleMobileMenu"]') || 
                          event.target.closest('#mobileMenuButton') ||
                          event.target.closest('.md\\:hidden button') ||
                          event.target.closest('header button');

        if (mobileMenu && 
            mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !menuButton) {

            mobileMenu.style.display = 'none';
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            // Reset menu button icon to hamburger
            const headerButton = document.getElementById('mobileMenuButton');
            if (headerButton) {
                const svg = headerButton.querySelector('svg');
                if (svg) {
                    svg.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"></path>';
                }
            }
        }
    });

    // Handle escape key to close mobile menu
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.style.display = 'none';
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                // Reset menu button icon to hamburger
                const headerButton = document.getElementById('mobileMenuButton');
                if (headerButton) {
                    const svg = headerButton.querySelector('svg');
                    if (svg) {
                        svg.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"></path>';
                    }
                }
            }
        }
    });
});



// Generate complete standardized header matching React homepage
function generateStandardHeader(isEnglish = false, currentPage = '') {
    const logoAlt = isEnglish 
        ? "Groupe Tonic Logo - Creator of memorable experiences for over 40 years"
        : "Logo Groupe Tonic - Créateur d'expériences mémorables depuis plus de 40 ans";

    const taglineDesktop = isEnglish 
        ? "| Creator of memorable experiences"
        : "| Créateur d'expériences mémorables";

    const taglineMobile = isEnglish 
        ? "Creator of memorable experiences"
        : "Créateur d'expériences mémorables";

    return `
        <header class="fixed top-0 left-0 right-0 z-50" style="background: linear-gradient(180deg, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.85) 100%); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); box-shadow: 0 4px 30px rgba(0,0,0,0.5);">
            <div class="container mx-auto px-2 py-2 sm:px-4 sm:py-5">
                <div class="flex items-center justify-between">
                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-4">
                        <h1 class="header-logo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none" 
                            style="text-shadow: 0 4px 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8); cursor: pointer;"
                            onclick="window.location.href='${isEnglish ? 'index-en.html' : 'index.html'}'">
                            <img src="images/tonic-logo.png" alt="${logoAlt}" style="width: clamp(180px,35vw,250px); height: auto;" />
                        </h1>
                        <span class="text-white text-xs md:text-sm font-medium leading-tight"
                            style="text-shadow: 0 2px 10px rgba(0,0,0,0.9);">
                            <span class="hidden sm:inline">${taglineDesktop}</span>
                            <span class="sm:hidden">${taglineMobile}</span>
                        </span>
                    </div>
                    <div class="flex items-center gap-4">
                        ${generateDesktopNav(isEnglish, currentPage)}
                        ${generateMobileMenuButton()}
                    </div>
                </div>
            </div>
            ${generateMobileMenu(isEnglish, currentPage)}
        </header>
    `;
}

// Initialize navigation on page load
function initializeNavigation(isEnglish = false, currentPage = '') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initializeNavigation(isEnglish, currentPage);
        });
        return;
    }

    // Find header element - looking for main-header id
    const headerElement = document.getElementById('main-header') || document.querySelector('header');
    if (headerElement) {
        // Replace the entire header with standardized version
        headerElement.outerHTML = generateStandardHeader(isEnglish, currentPage);
    } else {
        console.error('Header element not found');
    }
}

// PDF Loading functions
function hidePDFLoading() {
    const loadingElement = document.getElementById('pdfLoading');
    if (loadingElement) {
        loadingElement.classList.add('hidden');
    }
}

function showPDFLoading() {
    const loadingElement = document.getElementById('pdfLoading');
    if (loadingElement) {
        loadingElement.classList.remove('hidden');
    }
}

// Export functions to window object for use in other pages
window.generateDesktopNav = generateDesktopNav;
window.generateMobileMenu = generateMobileMenu;
```text
// Add formatDate function
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

window.generateMobileMenuButton = generateMobileMenuButton;
window.toggleMobileMenu = toggleMobileMenu;
window.generateStandardHeader = generateStandardHeader;
window.initializeNavigation = initializeNavigation;
window.initializeMobileMenu = initializeMobileMenu;
window.hidePDFLoading = hidePDFLoading;
window.showPDFLoading = showPDFLoading;
window.formatDate = formatDate;

// Ensure functions are immediately available
if (typeof window !== 'undefined') {
    window.toggleMobileMenu = toggleMobileMenu;
}

// Optimized single initialization
document.addEventListener('DOMContentLoaded', initializeMobileMenu);