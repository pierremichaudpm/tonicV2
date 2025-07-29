
// Global mobile menu state
let isMobileMenuOpen = false;

// Generate desktop navigation matching React homepage
function generateDesktopNav() {
    return `
        <nav class="hidden md:flex items-center nav-container">
            <a href="index.html" class="nav-item" data-tooltip="Accueil">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                <span>Accueil</span>
            </a>
            <a href="a-propos.html" class="nav-item" data-tooltip="À propos">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <span>À propos</span>
            </a>
            <a href="emplois.html" class="nav-item" data-tooltip="Emplois">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                <span>Emplois</span>
            </a>
            <a href="communiques.html" class="nav-item" data-tooltip="Communiqués">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><path d="M10 10h8"/><path d="M10 14h4"/></svg>
                <span>Communiqués</span>
            </a>
            <a href="nous-joindre.html" class="nav-item" data-tooltip="Nous joindre">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span>Nous joindre</span>
            </a>
        </nav>

        <nav class="hidden md:flex items-center ml-8">
            <div class="lang-divider"></div>
            <a href="index-en.html" class="lang-switcher"><span>EN</span></a>
        </nav>
    `;
}

// Generate mobile menu matching React homepage
function generateMobileMenu() {
    return `
        <div id="mobileMenu" class="mobile-menu" style="padding-top: 0 !important;">
            <!-- Mobile Menu Header - Fixed at top -->
            <div class="bg-black/95 backdrop-blur-md border-b border-white/10 px-2 py-2 sm:px-4 sm:py-5" style="position: absolute; top: 0; left: 0; right: 0; z-index: 1000;">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <a href="index.html" class="header-logo">
                            <img src="images/tonic-logo.png" alt="Groupe Tonic" style="height: clamp(1.875rem, 3.75vw, 2.625rem); width: auto;" />
                        </a>
                        <span class="hidden sm:inline text-white text-sm">| Créateur d'expériences mémorables</span>
                    </div>
                    <button onclick="toggleMobileMenu()" class="text-white p-2 hover:bg-white/10 rounded-lg transition-colors" style="background: rgba(0,0,0,0.2); backdrop-filter: blur(10px);">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
            
            <!-- Navigation items with proper spacing from header -->
            <div style="padding-top: 5rem;">
                <a href="index.html" class="nav-item w-full">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                    <span>Accueil</span>
                </a>
                <a href="a-propos.html" class="nav-item w-full">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <span>À propos</span>
                </a>
                <a href="emplois.html" class="nav-item w-full">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    <span>Emplois</span>
                </a>
                <a href="communiques.html" class="nav-item w-full">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><path d="M10 10h8"/><path d="M10 14h4"/></svg>
                    <span>Communiqués</span>
                </a>
                <a href="nous-joindre.html" class="nav-item w-full">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    <span>Nous joindre</span>
                </a>
                <div class="border-t border-white/20 mt-6 pt-6">
                    <a href="index-en.html" class="nav-item w-full text-center">
                        <span>🌐 English</span>
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Generate mobile menu button matching React homepage standards
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
}

// Toggle mobile menu function
function toggleMobileMenu() {
    console.log('toggleMobileMenu called - event timestamp:', Date.now());
    const mobileMenu = document.getElementById('mobileMenu');
    
    console.log('Menu currently open:', isMobileMenuOpen, 'Global state:', isMobileMenuOpen);
    
    if (mobileMenu) {
        if (isMobileMenuOpen) {
            mobileMenu.classList.remove('active');
            isMobileMenuOpen = false;
            console.log('Menu closed - state updated to false');
        } else {
            mobileMenu.classList.add('active');
            isMobileMenuOpen = true;
            console.log('Menu opened - state updated to true');
        }
    }
}

// Generate standard header with navigation
function generateStandardHeader() {
    return `
        <header class="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
            <div class="container mx-auto px-4 py-5">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <a href="index.html" class="header-logo">
                            <img src="images/tonic-logo.png" alt="Groupe Tonic" style="height: clamp(1.875rem, 3.75vw, 2.625rem); width: auto;" />
                        </a>
                        <span class="hidden sm:inline text-white text-sm">| Créateur d'expériences mémorables</span>
                    </div>
                    ${generateDesktopNav()}
                    ${generateMobileMenuButton()}
                </div>
            </div>
        </header>
        ${generateMobileMenu()}
    `;
}

// Initialize mobile menu
function initializeMobileMenu() {
    console.log('initializeMobileMenu called');
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        console.log('Mobile menu elements found, but skipping event listeners (using onclick)');
    } else {
        console.log('Mobile menu elements not found');
    }
}

// PDF helper functions
function showPDFLoading() {
    const loadingDiv = document.getElementById('pdf-loading');
    if (loadingDiv) {
        loadingDiv.style.display = 'flex';
    }
}

function hidePDFLoading() {
    const loadingDiv = document.getElementById('pdf-loading');
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
}

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

// Export functions to window object for use in other pages
window.generateDesktopNav = generateDesktopNav;
window.generateMobileMenu = generateMobileMenu;
window.generateMobileMenuButton = generateMobileMenuButton;
window.toggleMobileMenu = toggleMobileMenu;
window.generateStandardHeader = generateStandardHeader;
window.initializeMobileMenu = initializeMobileMenu;
window.hidePDFLoading = hidePDFLoading;
window.showPDFLoading = showPDFLoading;
window.formatDate = formatDate;

// Ensure functions are immediately available
if (typeof window !== 'undefined') {
    // Auto-initialize if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeMobileMenu);
    } else {
        initializeMobileMenu();
    }
}
