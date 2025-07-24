// shared.js - Shared JavaScript across all pages

// Navigation Icons SVG Components
const Icons = {
    grid: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    
    briefcase: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    
    newspaper: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M10 6h8"/><path d="M10 10h8"/><path d="M10 14h4"/></svg>',
    
    mail: () => '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>'
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

// Format date in French
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-CA', options);
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