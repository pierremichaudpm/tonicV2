// Super Simple Content System - Just Works
let allContent = [
    {
        id: 1,
        title: "Beach Pro Tour Montréal 2025",
        subtitle: "Le plus grand événement de volleyball de plage au Canada",
        category: "Beach Pro Tour",
        date: "2025-01-15",
        type: "news",
        content: "Le Beach Pro Tour revient à Montréal avec les meilleurs athlètes mondiaux. Trois jours de compétition intense du 25 au 27 juillet 2025."
    },
    {
        id: 2,
        title: "Développeur Web",
        subtitle: "Rejoignez notre équipe technique",
        category: "Groupe Tonic",
        date: "2025-01-12",
        type: "job",
        salary: "70 000$ - 85 000$",
        content: "Nous recherchons un développeur full-stack pour nos projets événementiels. Expérience en React/Node.js requise."
    }
];

// Category images
const images = {
    'Beach Pro Tour': 'images/beach-pro-tour-hero.webp',
    'Grands Prix Cyclistes': 'images/grands-prix-cyclistes-hero.jpg',
    'Marathon Beneva 21K': 'images/marathon-beneva-hero.jpg',
    'UCI 2026': 'images/montreal-2026-uci-hero.jpg',
    'Studio 76': 'images/studio-76-hero.jpg',
    'Dock 619': 'images/dock619-hero-new.jpg',
    '21K de Montréal': 'images/21k-hero.jpg',
    'Groupe Tonic': 'images/tonic-logo.png'
};

// Simple functions
function getNews() {
    return allContent.filter(item => item.type === 'news');
}

function getJobs() {
    return allContent.filter(item => item.type === 'job');
}

function getImage(category) {
    return images[category] || 'images/tonic-logo.png';
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('fr-FR', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    });
}

function addNewContent(item) {
    item.id = Date.now();
    allContent.unshift(item);
}

function deleteContent(id) {
    allContent = allContent.filter(item => item.id !== id);
}