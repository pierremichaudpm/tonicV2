// Homepage functionality for Groupe Tonic

// Event data for the homepage
const events = [
    {
        id: 'beach-pro-tour',
        title: 'BEACH PRO TOUR',
        date: '13-17 août 2025',
        tagline: 'L\'ÉLITE MONDIALE DU VOLLEYBALL DE PLAGE',
        background: 'images/beach-pro-tour-hero.webp',
        logo: 'images/logo-beach-pro-tour.svg',
        cta: 'Découvrez nos services',
        location: 'Montréal, QC',
        gradient: 'rgba(255, 14, 155, 0.6), rgba(255, 105, 180, 0.4)'
    },
    {
        id: 'grands-prix-cyclistes',
        title: 'GRANDS PRIX CYCLISTES',
        date: 'Septembre 2025',
        tagline: 'LE CYCLISME D\'ÉLITE AU QUÉBEC',
        background: 'images/grands-prix-cyclistes-hero.webp',
        logo: 'images/logo-grands-prix-cyclistes.svg',
        cta: 'Découvrez nos services',
        location: 'Québec',
        gradient: 'rgba(147, 51, 234, 0.6), rgba(168, 85, 247, 0.4)'
    },
    {
        id: 'marathon-beneva',
        title: 'MARATHON BENEVA',
        date: 'Octobre 2025',
        tagline: 'DÉPASSEZ VOS LIMITES',
        background: 'images/marathon-beneva-hero.webp',
        logo: 'images/logo-marathon-beneva.svg',
        cta: 'Découvrez nos services',
        location: 'Montréal, QC',
        gradient: 'rgba(239, 68, 68, 0.6), rgba(248, 113, 113, 0.4)'
    },
    {
        id: '21k',
        title: '21K DE MONTRÉAL',
        date: 'Mai 2025',
        tagline: 'VOTRE DÉFI URBAIN',
        background: 'images/21k-hero.webp',
        logo: 'images/logo-21k.svg',
        cta: 'Découvrez nos services',
        location: 'Montréal, QC',
        gradient: 'rgba(245, 158, 11, 0.6), rgba(251, 191, 36, 0.4)'
    },
    {
        id: 'uci-2026',
        title: 'UCI 2026',
        date: '2026',
        tagline: 'CHAMPIONNATS DU MONDE CYCLISME',
        background: 'images/montreal-2026-uci-hero.webp',
        logo: 'images/logo-uci-2026.svg',
        cta: 'Découvrez nos services',
        location: 'Montréal, QC',
        gradient: 'rgba(59, 130, 246, 0.6), rgba(96, 165, 250, 0.4)'
    },
    {
        id: 'studio76',
        title: 'STUDIO 76',
        date: 'Services continus',
        tagline: 'PRODUCTION AUDIOVISUELLE CRÉATIVE',
        background: 'images/studio76-hero.webp',
        logo: 'images/logo-studio76.svg',
        cta: 'Découvrez nos services',
        location: 'Longueuil, QC',
        gradient: 'rgba(34, 197, 94, 0.6), rgba(74, 222, 128, 0.4)'
    },
    {
        id: 'dock619',
        title: 'DOCK 619',
        date: 'Événements corporatifs',
        tagline: 'ESPACE ÉVÉNEMENTIEL MULTIFONCTIONNEL',
        background: 'images/dock619-hero-new.webp',
        logo: 'images/logo-dock619.svg',
        cta: 'Découvrez nos services',
        location: 'Longueuil, QC',
        gradient: 'rgba(107, 114, 128, 0.6), rgba(156, 163, 175, 0.4)'
    }
];

// Current state
let currentView = 'splash';
let currentPropertyIndex = 0;
let autoPlayInterval = null;
let isAutoPlaying = false;

// Constants
const SPLASH_DURATION = 4500;
const AUTO_PLAY_INTERVAL = 7000;

// Initialize
function init() {
    showSplashScreen();
    setTimeout(() => {
        showGridView();
        setTimeout(startAutoPlay, 1000);
    }, SPLASH_DURATION);
}

// Show splash screen
function showSplashScreen() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="splash-container">
            <img src="images/tonic-logo.png" alt="Groupe Tonic" class="splash-logo">
            <div class="splash-tagline">Créateur d'expériences mémorables</div>
        </div>
    `;
    currentView = 'splash';
}

// Show grid view
function showGridView() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="grid-selection-container">
            <!-- Header -->
            <header class="header-gradient">
                <div class="header-content">
                    <div class="flex items-center flex-1">
                        <img src="images/tonic-logo.png" alt="Groupe Tonic" class="header-logo" onclick="showGridView()">
                        <div class="header-tagline-grid">Créateur d'expériences mémorables</div>
                    </div>
                    <nav class="navigation-menu hidden md:flex">
                        <a href="emplois.html" class="nav-item">Emplois</a>
                        <a href="communiques.html" class="nav-item">Communiqués</a>
                        <a href="nous-joindre.html" class="nav-item">Contact</a>
                        <div class="lang-divider"></div>
                        <a href="index-en.html" class="lang-switcher">EN</a>
                    </nav>
                    <button onclick="toggleMobileMenu()" class="md:hidden p-2 text-white">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </header>

            <!-- Mobile Menu -->
            <div id="mobileMenu" class="mobile-menu">
                <div class="container mx-auto px-4 py-4">
                    <button onclick="toggleMobileMenu()" class="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg" aria-label="Fermer">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <div class="space-y-2 mt-8">
                        <a href="index.html" class="nav-item active w-full">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="color: white; stroke: white;"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                            <span>Accueil</span>
                        </a>
                        <a href="a-propos.html" class="nav-item w-full">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="white" style="color: white; fill: white;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                            <span>À propos</span>
                        </a>
                        <a href="emplois.html" class="nav-item w-full">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="color: white; stroke: white;"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                            <span>Emplois</span>
                        </a>
                        <a href="communiques.html" class="nav-item w-full">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="color: white; stroke: white;"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M10 6h8"/><path d="M10 10h8"/><path d="M10 14h4"/></svg>
                            <span>Communiqués</span>
                        </a>
                        <a href="nous-joindre.html" class="nav-item w-full">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="color: white; stroke: white;"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            <span>Nous joindre</span>
                        </a>
                        <div class="h-px bg-white/10 my-4"></div>
                        <a href="index-en.html" class="nav-item w-full">
                            <span>English</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Grid -->
            <div class="grid-wrapper">
                <div class="selection-grid">
                    ${events.map((event, index) => `
                        <div class="selection-tile" style="--index: ${index}" onclick="showHeroView(${index})">
                            <div class="selection-tile-bg" style="background-image: url('${event.background}')"></div>
                            <div class="selection-tile-overlay" style="background: linear-gradient(135deg, ${event.gradient})">
                                <div class="selection-tile-logo-container">
                                    <img src="${event.logo}" alt="${event.title}" class="selection-tile-logo" onerror="this.style.display='none'">
                                </div>
                                <div class="selection-tile-content">
                                    <div class="selection-tile-title">${event.title}</div>
                                    <div class="selection-tile-date">${event.date}</div>
                                    <div class="selection-tile-tagline">${event.tagline}</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    currentView = 'grid';
}

// Show hero view
function showHeroView(index) {
    stopAutoPlay();
    currentPropertyIndex = index;
    const event = events[index];

    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="hero-view-container">
            <div class="hero-background" style="background-image: url('${event.background}')"></div>
            <div class="hero-overlay" style="background: linear-gradient(135deg, ${event.gradient})"></div>

            <!-- Header -->
            <header class="header-gradient">
                <div class="header-content">
                    <div class="flex items-center flex-1">
                        <img src="images/tonic-logo.png" alt="Groupe Tonic" class="header-logo" onclick="showGridView()">
                        <div class="header-tagline-hero">Créateur d'expériences mémorables</div>
                    </div>
                    <nav class="navigation-menu hidden md:flex">
                        <button onclick="showGridView()" class="nav-item">Accueil</button>
                        <a href="emplois.html" class="nav-item">Emplois</a>
                        <a href="communiques.html" class="nav-item">Communiqués</a>
                        <a href="nous-joindre.html" class="nav-item">Contact</a>
                        <div class="lang-divider"></div>
                        <a href="index-en.html" class="lang-switcher">EN</a>
                    </nav>
                    <button onclick="toggleMobileMenu()" class="md:hidden p-2 text-white">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </header>

            <!-- Mobile Menu -->
            <div id="mobileMenu" class="mobile-menu">
                <div class="container mx-auto px-4 py-4">
                    <button onclick="toggleMobileMenu()" class="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg" aria-label="Fermer">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <div class="space-y-2 mt-8">
                        <button onclick="showGridView();toggleMobileMenu();" class="nav-item active w-full">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="color: white; stroke: white;"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                            <span>Accueil</span>
                        </button>
                        <a href="a-propos.html" class="nav-item w-full">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="white" style="color: white; fill: white;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                            <span>À propos</span>
                        </a>
                        <a href="emplois.html" class="nav-item w-full">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="color: white; stroke: white;"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                            <span>Emplois</span>
                        </a>
                        <a href="communiques.html" class="nav-item w-full">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="color: white; stroke: white;"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M10 6h8"/><path d="M10 10h8"/><path d="M10 14h4"/></svg>
                            <span>Communiqués</span>
                        </a>
                        <a href="nous-joindre.html" class="nav-item w-full">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="color: white; stroke: white;"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            <span>Nous joindre</span>
                        </a>
                        <div class="h-px bg-white/10 my-4"></div>
                        <a href="index-en.html" class="nav-item w-full">
                            <span>English</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Hero Content -->
            <div class="hero-main-content">
                <div class="hero-content">
                    <div class="hero-logo-container">
                        <img src="${event.logo}" alt="${event.title}" class="hero-logo" onerror="this.style.display='none'">
                    </div>
                    <h1 class="hero-title">${event.title}</h1>
                    <div class="hero-tagline-container">
                        <p class="hero-tagline">${event.tagline}</p>
                    </div>
                    <div class="hero-details">
                        <div class="detail-badge">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            ${event.date}
                        </div>
                        <div class="detail-badge">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            ${event.location}
                        </div>
                    </div>
                    <a href="nous-joindre.html" class="cta-button">
                        ${event.cta}
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </a>
                </div>
            </div>

            <!-- Navigation Arrows -->
            <button onclick="previousProperty()" class="fixed left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full hover:bg-black/70 transition-all z-20">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            <button onclick="nextProperty()" class="fixed right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full hover:bg-black/70 transition-all z-20">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    `;
    currentView = 'hero';
}

// Navigation functions
function nextProperty() {
    currentPropertyIndex = (currentPropertyIndex + 1) % events.length;
    showHeroView(currentPropertyIndex);
}

function previousProperty() {
    currentPropertyIndex = (currentPropertyIndex - 1 + events.length) % events.length;
    showHeroView(currentPropertyIndex);
}

// Optimized auto-play functions
function startAutoPlay() {
    if (currentView === 'grid' && !isAutoPlaying) {
        isAutoPlaying = true;
        autoPlayInterval = setInterval(() => {
            if (currentView === 'grid') {
                currentPropertyIndex = (currentPropertyIndex + 1) % events.length;
                showHeroView(currentPropertyIndex);
            }
        }, AUTO_PLAY_INTERVAL);
    }
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        isAutoPlaying = false;
    }
}

// IMMEDIATE MOBILE MENU FUNCTION DEFINITION - MUST BE FIRST
window.toggleMobileMenu = function(event) {
    console.log('toggleMobileMenu called from React homepage - timestamp:', Date.now());
    
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu) {
        console.error('Mobile menu not found');
        return;
    }
    
    const isCurrentlyOpen = mobileMenu.style.display === 'flex' || 
                           mobileMenu.classList.contains('active') ||
                           window.getComputedStyle(mobileMenu).display === 'flex';
    
    console.log('Menu currently open:', isCurrentlyOpen);
    
    if (isCurrentlyOpen) {
        // Close menu
        mobileMenu.classList.remove('active');
        mobileMenu.style.display = 'none';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.opacity = '0';
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        console.log('Menu closed');
    } else {
        // Open menu
        mobileMenu.classList.add('active');
        mobileMenu.style.display = 'flex';
        mobileMenu.style.visibility = 'visible';
        mobileMenu.style.opacity = '1';
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
        console.log('Menu opened');
    }
};

// Ensure function is globally available immediately
if (typeof window !== 'undefined') {
    window.toggleMobileMenu = window.toggleMobileMenu;
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', init);

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    if (currentView === 'hero') {
        if (e.key === 'ArrowLeft') {
            previousProperty();
        } else if (e.key === 'ArrowRight') {
            nextProperty();
        } else if (e.key === 'Escape') {
            showGridView();
        }
    }
});