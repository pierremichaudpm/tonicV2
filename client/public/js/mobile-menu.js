
// STANDARDIZED MOBILE MENU FUNCTIONALITY
// Single source of truth for all mobile menu operations

window.toggleMobileMenu = function(event) {
    console.log('toggleMobileMenu called - timestamp:', Date.now());

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu) {
        console.log('Mobile menu element not found');
        return;
    }

    const isCurrentlyOpen = mobileMenu.classList.contains('active') || 
                           mobileMenu.style.display === 'flex' ||
                           window.getComputedStyle(mobileMenu).display === 'flex';

    console.log('Menu currently open:', isCurrentlyOpen);

    if (isCurrentlyOpen) {
        mobileMenu.classList.remove('active');
        mobileMenu.style.display = 'none';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.opacity = '0';
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        console.log('Menu closed');
    } else {
        mobileMenu.classList.add('active');
        mobileMenu.style.display = 'flex';
        mobileMenu.style.visibility = 'visible';
        mobileMenu.style.opacity = '1';
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
        console.log('Menu opened');
    }
};

// Auto-run test for debugging
setTimeout(() => {
    console.log('🧪 Mobile menu script loaded on:', document.title);
    console.log('Mobile menu function available:', typeof window.toggleMobileMenu);
}, 1000);
