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

// Initialize with sample data if empty (for demonstration)
function initializeSampleData() {
    const existing = getPDFData();
    if (existing.length === 0) {
        const sampleData = [
            {
                id: 1,
                title: "Beach Pro Tour Montréal 2025",
                subtitle: "Découvrez tous les détails du tournoi de volleyball de plage",
                category: "Beach Pro Tour",
                date: "2025-01-15",
                type: "news",
                filename: "beach-pro-tour-2025.pdf",
                data: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8IC9Gb250IDw8IC9GNTEgNCAwIFIgPj4gPj4KL0NvbnRlbnRzIDUgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9UeXBlIC9Gb250IC9TdWJ0eXBlIC9UeXBlMSAvQmFzZUZvbnQgL0hlbHZldGljYQo+PgplbmRvYmoKNSAwIG9iago8PCAvcmEgWzMyIDEyIDAuMjUgMC4yNV0gL1RIIC9UaAo+PgpzdHJlYW0KQlQKL0Y1MSAxMiBUZgoyMCA3MjAgVGQKKEJlYWNoIFBybyBUb3VyIE1vbnRy6WFsIDIwMjUpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmCjAwMDAwMDAwMTUgMDAwMDAgbgowMDAwMDAwMDY5IDAwMDAwIG4KMDAwMDAwMDEyNCAwMDAwMCBuCjAwMDAwMDAyNTUgMDAwMDAgbgowMDAwMDAwMzEzIDAwMDAwIG4KdHJhaWxlcgo8PAovU2l6ZSA2IC9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo0MTIKJSVFT0Y="
            },
            {
                id: 2,
                title: "Marathon Beneva 21K News",
                subtitle: "Latest updates from the marathon organization",
                category: "Marathon Beneva 21K",
                date: "2025-01-10",
                type: "news",
                filename: "marathon-news-2025.pdf",
                data: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8IC9Gb250IDw8IC9GNTEgNCAwIFIgPj4gPj4KL0NvbnRlbnRzIDUgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9UeXBlIC9Gb250IC9TdWJ0eXBlIC9UeXBlMSAvQmFzZUZvbnQgL0hlbHZldGljYQo+PgplbmRvYmoKNSAwIG9iago8PCA+PgpzdHJlYW0KQlQKL0Y1MSAxMiBUZgoyMCA3MjAgVGQKKE1hcmF0aG9uIEJlbmV2YSAyMUsgTmV3cykgVGoKRVQKZW5kc3RyZWFtCmVuZG9iago="
            },
            {
                id: 3,
                title: "Software Developer Position",
                subtitle: "Join our development team",
                category: "Groupe Tonic",
                date: "2025-01-12",
                type: "job",
                filename: "developer-job.pdf",
                data: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8IC9Gb250IDw8IC9GNTEgNCAwIFIgPj4gPj4KL0NvbnRlbnRzIDUgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9UeXBlIC9Font IC9TdWJ0eXBlIC9UeXBlMSAvQmFzZUZvbnQgL0hlbHZldGljYQo+PgplbmRvYmoKNSAwIG9iago8PCA+PgpzdVJlYW0KQlQKL0Y1MSAxMiBUZgo0MCA3MjAgVGQKKFNvZnR3YXJlIERldmVsb3BlciBQb3NpdGlvbikgVGoKRVQKZW5kc3RyZWFtCmVuZG9iag=="
            }
        ];
        savePDFData(sampleData);
    }
}