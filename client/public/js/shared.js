// Fonctions partagées pour toutes les pages

// Fonction pour gérer la navigation active
function updateActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === '/') ||
            (currentPath === '/en' && link.getAttribute('href') === '/en')) {
            link.classList.add('active');
        }
    });
}

// Fonction pour gérer les formulaires de contact
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            // Simulation d'envoi (remplacer par votre logique d'envoi réelle)
            console.log('Données du formulaire:', data);
            alert('Merci pour votre message! Nous vous contacterons bientôt.');
            
            // Réinitialiser le formulaire
            this.reset();
        });
    }
}

// Fonction pour gérer le responsive du menu
function setupMobileNavigation() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Ajouter un bouton de menu mobile si nécessaire
    if (window.innerWidth <= 768) {
        // Logique pour menu mobile peut être ajoutée ici
    }
}

// Fonction pour smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fonction pour animation d'entrée des éléments
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les cartes et autres éléments
    document.querySelectorAll('.card, .communique-item, .emploi-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Fonction utilitaire pour formater les dates
function formatDate(dateString, locale = 'fr-FR') {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Fonction pour gérer le changement de langue
function setupLanguageToggle() {
    const languageLinks = document.querySelectorAll('a[href*="en"], a[href="/"]');
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Ajouter une classe de transition si nécessaire
            document.body.classList.add('language-transition');
            setTimeout(() => {
                document.body.classList.remove('language-transition');
            }, 300);
        });
    });
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavigation();
    setupContactForm();
    setupMobileNavigation();
    setupSmoothScroll();
    setupAnimations();
    setupLanguageToggle();
    
    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', setupMobileNavigation);
});

// Fonctions utilitaires globales
window.TonicUtils = {
    formatDate,
    updateActiveNavigation,
    setupContactForm,
    setupMobileNavigation,
    setupSmoothScroll,
    setupAnimations,
    setupLanguageToggle
};

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    // Vous pouvez ajouter ici un système de rapport d'erreurs
});

// Performance monitoring basique
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Temps de chargement de la page:', loadTime + 'ms');
        }, 0);
    });
}
