// shared.js - Shared JavaScript across all pages

// Navigation Icons SVG Components - Matching React homepage exactly
const Icons = {
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
        {href: 'index.html', icon: Icons.grid(), label: 'Accueil'},
        {href: 'a-propos.html', icon: Icons.info(), label: 'À propos'},
        {href: 'emplois.html', icon: Icons.work(), label: 'Emplois'},
        {href: 'communiques.html', icon: Icons.news(), label: 'Communiqués'},
        {href: 'nous-joindre.html', icon: Icons.mail(), label: 'Nous joindre'},
        {href: 'https://www.instagram.com/groupetonic/', icon: Icons.instagram(), label: '', tooltip: 'Instagram', isSocial: true, target: '_blank'},
        {href: 'https://www.linkedin.com/company/groupe-tonic/', icon: Icons.linkedin(), label: '', tooltip: 'LinkedIn', isSocial: true, target: '_blank'}
    ];
}

function createNavItemsEnglish() {
    return [
        {href: 'index-en.html', icon: Icons.grid(), label: 'Home'},
        {href: 'about.html', icon: Icons.info(), label: 'About'},
        {href: 'emplois-en.html', icon: Icons.work(), label: 'Jobs'},
        {href: 'communiques-en.html', icon: Icons.news(), label: 'News'},
        {href: 'nous-joindre-en.html', icon: Icons.mail(), label: 'Contact'},
        {href: 'https://www.instagram.com/groupetonic/', icon: Icons.instagram(), label: '', tooltip: 'Instagram', isSocial: true, target: '_blank'},
        {href: 'https://www.linkedin.com/company/groupe-tonic/', icon: Icons.linkedin(), label: '', tooltip: 'LinkedIn', isSocial: true, target: '_blank'}
    ];
}

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

// Generate desktop navigation menu matching React homepage
function generateDesktopNav(isEnglish = false) {
    const navItems = isEnglish ? createNavItemsEnglish() : createNavItemsFrench();
    const langLink = isEnglish ? 'index.html' : 'index-en.html';
    const langText = isEnglish ? 'FR' : 'EN';
    
    return `
        <nav class="hidden md:flex lg:flex items-center gap-0.5 px-2 py-0.5 rounded-full nav-container" style="background:rgba(0,0,0,0.2);backdrop-filter:blur(10px)">
            ${navItems.map(item => `
                <a href="${item.href}" ${item.target ? `target="${item.target}"` : ''} class="nav-item flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/10 transition-all text-white hover:text-white cursor-pointer" data-tooltip="${item.tooltip || item.label}">
                    <div style="color:white">${item.icon}</div>
                    ${item.label ? `<span class="text-xs font-medium" ${item.isSocial ? 'data-social="true"' : ''}>${item.label}</span>` : ''}
                </a>
            `).join('')}
            <div class="lang-divider"></div>
            <a href="${langLink}" class="lang-switcher"><span>${langText}</span></a>
        </nav>
    `;
}

// Generate mobile menu matching React homepage
function generateMobileMenu(isEnglish = false) {
    const navItems = isEnglish ? createNavItemsEnglish() : createNavItemsFrench();
    const langLink = isEnglish ? 'index.html' : 'index-en.html';
    const langText = isEnglish ? 'Français' : 'English';
    const langIcon = Icons.lang();
    
    return `
        <div id="mobileMenu" class="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-md" style="display: none;">
            <div class="h-full pt-20 pb-6">
                <div class="container mx-auto px-4 py-4">
                    <div class="space-y-2">
                        ${navItems.map(item => `
                            <a href="${item.href}" ${item.target ? `target="${item.target}"` : ''} class="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all cursor-pointer text-white">
                                <div style="color:white">${item.icon}</div>
                                ${item.label ? `<span class="font-medium text-white">${item.label}</span>` : ''}
                                ${!item.label && item.tooltip ? `<span class="font-medium text-white">${item.tooltip}</span>` : ''}
                            </a>
                        `).join('')}
                        <a href="${langLink}" class="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all cursor-pointer text-white">
                            <div style="color:white">${langIcon}</div>
                            <span class="font-medium text-white">${langText}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Generate mobile menu button matching React homepage
function generateMobileMenuButton() {
    return `
        <button onclick="toggleMobileMenu()" class="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-white" style="background:rgba(0,0,0,0.2);backdrop-filter:blur(10px);color:white">
            <div style="color:white" id="menuIcon">${Icons.menu()}</div>
        </button>
    `;
}

// Update mobile menu button icon when toggling
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    
    if (mobileMenu) {
        const isActive = mobileMenu.style.display !== 'none';
        mobileMenu.style.display = isActive ? 'none' : 'block';
        
        if (menuIcon) {
            menuIcon.innerHTML = isActive ? Icons.menu() : Icons.x();
        }
    }
}

// Initialize shared components
document.addEventListener('DOMContentLoaded', function() {
    // Production-ready initialization

    // Use local Tailwind CSS only - no CDN loading

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuButton = event.target.closest('button[onclick*="toggleMobileMenu"]');

        if (mobileMenu && mobileMenu.style.display !== 'none' && !mobileMenu.contains(event.target) && !menuButton) {
            mobileMenu.style.display = 'none';
            const menuIcon = document.getElementById('menuIcon');
            if (menuIcon) {
                menuIcon.innerHTML = Icons.menu();
            }
        }
    });

    // Handle escape key to close mobile menu
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && mobileMenu.style.display !== 'none') {
                mobileMenu.style.display = 'none';
                const menuIcon = document.getElementById('menuIcon');
                if (menuIcon) {
                    menuIcon.innerHTML = Icons.menu();
                }
            }
        }
    });
});