// Unified Content Management System
// This file manages all content for jobs and news with mobile-friendly text and optional PDF attachments

// Storage key for content data
const CONTENT_STORAGE_KEY = 'unifiedContentData';

// Category images mapping
const categoryImages = {
    'Beach Pro Tour': 'images/beach-pro-tour-hero.webp',
    'Grands Prix Cyclistes': 'images/grands-prix-cyclistes-hero.jpg',
    'Marathon Beneva 21K': 'images/marathon-beneva-hero.jpg',
    'UCI 2026': 'images/montreal-2026-uci-hero.jpg',
    'Studio 76': 'images/studio-76-hero.jpg',
    'Dock 619': 'images/dock619-hero-new.jpg',
    '21K de Montréal': 'images/21k-hero.jpg',
    'Groupe Tonic': 'images/tonic-logo.png'
};

// Content Management Functions
function getContentData() {
    return JSON.parse(localStorage.getItem(CONTENT_STORAGE_KEY) || '[]');
}

function saveContentData(data) {
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(data));
}

function addContent(contentItem) {
    const saved = getContentData();
    contentItem.id = Date.now(); // Simple ID generation
    saved.unshift(contentItem);
    saveContentData(saved);
    return contentItem;
}

function updateContent(id, updatedData) {
    const saved = getContentData();
    const index = saved.findIndex(item => item.id === id);
    if (index !== -1) {
        saved[index] = { ...saved[index], ...updatedData };
        saveContentData(saved);
        return saved[index];
    }
    return null;
}

function deleteContent(id) {
    const saved = getContentData();
    const filtered = saved.filter(item => item.id !== id);
    saveContentData(filtered);
}

function getContentByType(type) {
    return getContentData().filter(item => item.type === type);
}

// Get category class for styling
function getCategoryClass(category) {
    const categoryMap = {
        'Beach Pro Tour': 'category-beach',
        'Grands Prix Cyclistes': 'category-cycling',
        'Marathon Beneva 21K': 'category-marathon',
        'UCI 2026': 'category-uci',
        'Studio 76': 'category-studio',
        'Dock 619': 'category-dock',
        '21K de Montréal': 'category-21k',
        'Groupe Tonic': 'category-tonic'
    };
    return categoryMap[category] || 'bg-gray-600';
}

// Get category image
function getCategoryImage(category) {
    return categoryImages[category] || 'images/tonic-logo.png';
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Initialize with sample content
function initializeSampleContent() {
    const existing = getContentData();
    if (existing.length === 0) {
        const sampleContent = [
            {
                id: 1,
                title: "Beach Pro Tour Montréal 2025 - Annonce officielle",
                subtitle: "Le plus grand événement de volleyball de plage au Canada revient à Montréal",
                category: "Beach Pro Tour",
                date: "2025-01-15",
                type: "news",
                content: `<p><strong>MONTRÉAL, le 15 janvier 2025</strong> - Groupe Tonic est fier d'annoncer le retour du Beach Pro Tour à Montréal pour une édition 2025 qui promet d'être exceptionnelle.</p>

<p>Cet événement unique rassemblera les meilleurs athlètes mondiaux de volleyball de plage dans un cadre spectaculaire au cœur de la métropole québécoise. Avec plus de 200 athlètes de 40 pays, le tournoi offrira trois jours de compétition intense.</p>

<h3>Programme de l'événement</h3>
<ul>
<li><strong>Vendredi 25 juillet :</strong> Tours préliminaires et qualifications</li>
<li><strong>Samedi 26 juillet :</strong> Phases éliminatoires et demi-finales</li>
<li><strong>Dimanche 27 juillet :</strong> Finales hommes et femmes</li>
</ul>

<p>Les billets seront disponibles dès le 1er février sur notre site web. Ne manquez pas cette occasion unique de voir les champions olympiques et mondiaux s'affronter dans votre ville!</p>

<p><strong>Informations et billetterie :</strong><br>
Site web : <a href="https://beachprotour.com" target="_blank">beachprotour.com</a><br>
Téléphone : 514-555-BEACH</p>`,
                pdfAttachment: null // No PDF required - mobile-friendly text content
            },
            {
                id: 2,
                title: "Marathon Beneva 21K - Inscriptions ouvertes",
                subtitle: "Rejoignez des milliers de coureurs pour l'événement running de l'année",
                category: "Marathon Beneva 21K",
                date: "2025-01-10",
                type: "news",
                content: `<p><strong>Les inscriptions sont maintenant ouvertes</strong> pour le Marathon Beneva 21K qui aura lieu le dimanche 14 septembre 2025.</p>

<p>Cette course emblématique de Montréal propose trois distances pour tous les niveaux :</p>

<ul>
<li><strong>21K :</strong> Le défi ultime avec un parcours scenic à travers la ville</li>
<li><strong>10K :</strong> Perfect pour les coureurs intermédiaires</li>
<li><strong>5K :</strong> Idéal pour les débutants et les familles</li>
</ul>

<h3>Nouveautés 2025</h3>
<p>Cette année, nous sommes fiers d'introduire plusieurs améliorations :</p>
<ul>
<li>Parcours repensé avec plus de points de vue panoramiques</li>
<li>Stations de ravitaillement améliorées</li>
<li>Zone d'arrivée agrandie avec plus d'activités</li>
<li>Application mobile dédiée pour le suivi GPS</li>
</ul>

<p><strong>Tarifs Early Bird (jusqu'au 31 mars) :</strong><br>
21K : 75$ | 10K : 45$ | 5K : 25$</p>

<p>Inscrivez-vous dès maintenant sur <a href="https://marathon21k.com" target="_blank">marathon21k.com</a></p>`,
                pdfAttachment: null
            },
            {
                id: 3,
                title: "Développeur Full-Stack",
                subtitle: "Rejoignez notre équipe technique dynamique",
                category: "Groupe Tonic",
                date: "2025-01-12",
                type: "job",
                location: "Montréal, QC",
                jobType: "Temps plein",
                salary: "70 000$ - 85 000$",
                content: `<h3>À propos du poste</h3>
<p>Nous recherchons un développeur full-stack passionné pour rejoindre notre équipe technique. Vous travaillerez sur des projets innovants pour nos événements sportifs majeurs.</p>

<h3>Responsabilités principales</h3>
<ul>
<li>Développement d'applications web React/Node.js</li>
<li>Intégration d'APIs et services tiers</li>
<li>Optimisation des performances et SEO</li>
<li>Collaboration avec l'équipe design et marketing</li>
<li>Maintenance et évolution des plateformes existantes</li>
</ul>

<h3>Qualifications requises</h3>
<ul>
<li>3+ années d'expérience en développement web</li>
<li>Maîtrise de JavaScript, React, Node.js</li>
<li>Expérience avec les bases de données (PostgreSQL)</li>
<li>Connaissance des pratiques DevOps (Docker, CI/CD)</li>
<li>Excellentes compétences en communication</li>
</ul>

<h3>Ce que nous offrons</h3>
<ul>
<li>Salaire compétitif avec bonus de performance</li>
<li>Assurances complètes</li>
<li>Télétravail hybride (3 jours bureau / 2 jours maison)</li>
<li>Formation continue et budget développement professionnel</li>
<li>Billets gratuits pour tous nos événements</li>
</ul>

<p><strong>Pour postuler :</strong> Envoyez votre CV et portfolio à <a href="mailto:carrieres@groupetonic.ca">carrieres@groupetonic.ca</a></p>`,
                pdfAttachment: null
            },
            {
                id: 4,
                title: "Coordinateur Événements - Beach Pro Tour",
                subtitle: "Gestionnaire de projet pour nos événements de volleyball",
                category: "Beach Pro Tour",
                date: "2025-01-08",
                type: "job",
                location: "Montréal, QC",
                jobType: "Contrat (6 mois)",
                salary: "55 000$ - 65 000$ (pro rata)",
                content: `<h3>Description du poste</h3>
<p>Nous cherchons un coordinateur d'événements expérimenté pour superviser l'organisation du Beach Pro Tour 2025. Ce poste contractuel de 6 mois offre une opportunité unique de travailler sur un événement sportif international.</p>

<h3>Principales responsabilités</h3>
<ul>
<li>Coordination avec les fédérations sportives internationales</li>
<li>Gestion des accréditations et protocoles VIP</li>
<li>Supervision de l'installation des terrains de compétition</li>
<li>Coordination des équipes de bénévoles (50+ personnes)</li>
<li>Interface avec les médias et relations publiques</li>
<li>Gestion budgétaire et suivi des dépenses</li>
</ul>

<h3>Profil recherché</h3>
<ul>
<li>5+ années en gestion d'événements sportifs</li>
<li>Expérience avec les événements internationaux</li>
<li>Bilinguisme français/anglais obligatoire</li>
<li>Maîtrise des outils de gestion de projet</li>
<li>Excellentes compétences interpersonnelles</li>
<li>Disponibilité pour voyages occasionnels</li>
</ul>

<h3>Conditions exceptionnelles</h3>
<ul>
<li>Travail au cœur de l'action sportive internationale</li>
<li>Équipe passionnée et environnement stimulant</li>
<li>Possibilité d'extension de contrat</li>
<li>Accès privilégié aux événements sportifs</li>
</ul>

<p><strong>Envoyez votre candidature à :</strong> <a href="mailto:rh@groupetonic.ca">rh@groupetonic.ca</a><br>
<strong>Référence :</strong> COORD-BPT-2025</p>`,
                pdfAttachment: null
            }
        ];
        saveContentData(sampleContent);
    }
}