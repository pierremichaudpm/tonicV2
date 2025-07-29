// Navigation data
const navigationItems = [
    { text: 'Accueil', href: 'index.html', textEn: 'Home', hrefEn: 'index-en.html' },
    { text: 'À propos', href: 'a-propos.html', textEn: 'About', hrefEn: 'about.html' },
    { text: 'Emplois', href: 'emplois.html', textEn: 'Jobs', hrefEn: 'emplois-en.html' },
    { text: 'Communiqués', href: 'communiques.html', textEn: 'Press Releases', hrefEn: 'communiques-en.html' },
    { text: 'Nous joindre', href: 'nous-joindre.html', textEn: 'Contact Us', hrefEn: 'nous-joindre-en.html' }
];

// Check if current page is English version
function isEnglishPage() {
    return window.location.pathname.includes('-en.html') || window.location.pathname.includes('index-en.html');
}

// Generate desktop navigation
function generateDesktopNav() {
    const isEn = isEnglishPage();
    const currentPath = window.location.pathname.split('/').pop();

    return navigationItems.map(item => {
        const href = isEn ? item.hrefEn : item.href;
        const text = isEn ? item.textEn : item.text;
        const isActive = currentPath === href || 
                        (currentPath === 'index.html' && href === 'index.html') ||
                        (currentPath === 'index-en.html' && href === 'index-en.html') ||
                        (currentPath === '' && href === 'index.html');

        return `<a href="${href}" class="text-white hover:text-blue-300 transition-colors ${isActive ? 'border-b-2 border-blue-300 font-semibold' : ''}">${text}</a>`;
    }).join('');
}

// Generate mobile menu
function generateMobileMenu() {
    const isEn = isEnglishPage();
    const currentPath = window.location.pathname.split('/').pop();

    const menuItems = navigationItems.map(item => {
        const href = isEn ? item.hrefEn : item.href;
        const text = isEn ? item.textEn : item.text;
        const isActive = currentPath === href || 
                        (currentPath === 'index.html' && href === 'index.html') ||
                        (currentPath === 'index-en.html' && href === 'index-en.html') ||
                        (currentPath === '' && href === 'index.html');

        return `<a href="${href}" class="block px-4 py-3 text-white hover:bg-white/10 transition-colors ${isActive ? 'bg-white/20 font-semibold' : ''}">${text}</a>`;
    }).join('');

    const langSwitchText = isEn ? 'Français' : 'English';
    const langSwitchHref = isEn ? 
        currentPath.replace('-en.html', '.html').replace('index-en.html', 'index.html') :
        (currentPath === 'index.html' ? 'index-en.html' : currentPath.replace('.html', '-en.html'));

    return `
    <div id="mobileMenu" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
        <div class="fixed right-0 top-0 h-full w-80 bg-gray-900 shadow-xl transform translate-x-full transition-transform duration-300 ease-in-out" id="mobileMenuPanel">
            <div class="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 class="text-white text-lg font-semibold">Menu</h2>
                <button onclick="toggleMobileMenu()" class="text-white hover:text-gray-300 p-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <nav class="py-4">
                ${menuItems}
                <div class="border-t border-gray-700 mt-4 pt-4">
                    <a href="${langSwitchHref}" class="block px-4 py-3 text-blue-300 hover:bg-white/10 transition-colors">
                        🌐 ${langSwitchText}
                    </a>
                </div>
            </nav>
        </div>
    </div>`;
}

// Generate mobile menu button
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

// Toggle mobile menu - using DOM state instead of variable to avoid conflicts
function toggleMobileMenu() {
    console.log('toggleMobileMenu called - event timestamp:', Date.now());
    
    const mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu) {
        console.log('Mobile menu element not found');
        return;
    }

    // Check current state from DOM instead of variable
    const isCurrentlyOpen = mobileMenu.style.display === 'flex' || !mobileMenu.classList.contains('hidden');
    console.log('Menu currently open:', isCurrentlyOpen);

    if (isCurrentlyOpen) {
        // Close menu
        mobileMenu.style.display = 'none';
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
        console.log('Menu closed - state updated to false');
    } else {
        // Open menu
        mobileMenu.style.display = 'flex';
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        console.log('Menu opened - state updated to true');
    }
}

// Generate standard header
function generateStandardHeader() {
    const isEn = isEnglishPage();
    const langSwitchText = isEn ? 'Français' : 'English';
    const currentPath = window.location.pathname.split('/').pop();
    const langSwitchHref = isEn ? 
        currentPath.replace('-en.html', '.html').replace('index-en.html', 'index.html') :
        (currentPath === 'index.html' ? 'index-en.html' : currentPath.replace('.html', '-en.html'));

    return `
    <header class="bg-gradient-to-r from-gray-900 to-black text-white sticky top-0 z-40 backdrop-blur-md">
        <div class="container mx-auto px-4 py-3">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4">
                    <a href="${isEn ? 'index-en.html' : 'index.html'}" class="flex items-center space-x-3">
                        <img src="images/groupe-tonic-logo.svg" alt="Groupe Tonic" class="h-8 w-auto">
                        <span class="text-xl font-bold">Groupe Tonic</span>
                    </a>
                </div>

                <nav class="hidden md:flex items-center space-x-6">
                    ${generateDesktopNav()}
                    <a href="${langSwitchHref}" class="text-blue-300 hover:text-blue-200 transition-colors">
                        🌐 ${langSwitchText}
                    </a>
                </nav>

                ${generateMobileMenuButton()}
            </div>
        </div>
        ${generateMobileMenu()}
    </header>`;
}

// Initialize navigation
function initializeNavigation() {
    console.log('Page loaded, initializing navigation...');
    console.log('toggleMobileMenu available:', typeof window.toggleMobileMenu);
    console.log('formatDate available:', typeof window.formatDate);
}

// Initialize mobile menu
function initializeMobileMenu() {
    console.log('initializeMobileMenu called');
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuButton && mobileMenu) {
        console.log('Mobile menu elements found, but skipping event listeners (using onclick)');
    }
}

// PDF loading functions
function showPDFLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'pdfLoading';
    loadingDiv.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg text-center">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p>Chargement du PDF...</p>
            </div>
        </div>
    `;
    document.body.appendChild(loadingDiv);
}

function hidePDFLoading() {
    const loadingDiv = document.getElementById('pdfLoading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// Format date function
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
window.initializeNavigation = initializeNavigation;
window.initializeMobileMenu = initializeMobileMenu;
window.hidePDFLoading = hidePDFLoading;
window.showPDFLoading = showPDFLoading;
window.formatDate = formatDate;

// Ensure functions are immediately available and clean any existing conflicts
if (typeof window !== 'undefined') {
    // Clear any existing conflicting variables
    if (typeof window.isMobileMenuOpen !== 'undefined') {
        delete window.isMobileMenuOpen;
    }
    window.toggleMobileMenu = toggleMobileMenu;
}

// Optimized single initialization
document.addEventListener('DOMContentLoaded', initializeNavigation);