// Unified PDF data storage system
// This file manages all PDF content for jobs, news, and general documents

// Storage key for PDF data
const PDF_STORAGE_KEY = 'unifiedPDFData';

// Category images mapping - using your actual images
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

// PDF Management Functions
function getPDFData() {
    return JSON.parse(localStorage.getItem(PDF_STORAGE_KEY) || '[]');
}

function savePDFData(data) {
    localStorage.setItem(PDF_STORAGE_KEY, JSON.stringify(data));
}

function addPDF(pdfData) {
    const saved = getPDFData();
    saved.unshift(pdfData);
    savePDFData(saved);
}

function deletePDF(id) {
    const saved = getPDFData();
    const filtered = saved.filter(p => p.id !== id);
    savePDFData(filtered);
}

function getPDFsByType(type) {
    return getPDFData().filter(pdf => pdf.type === type);
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

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Get category image
function getCategoryImage(category) {
    return categoryImages[category] || 'images/tonic-logo.png';
}