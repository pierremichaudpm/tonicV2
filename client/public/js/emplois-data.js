// Données des emplois en français
const emploisData = [
    {
        id: 1,
        title: "Développeur Full-Stack",
        location: "Montréal, QC",
        type: "Temps plein",
        description: "Nous recherchons un développeur expérimenté pour rejoindre notre équipe technique.",
        requirements: [
            "3+ années d'expérience en développement web",
            "Maîtrise de JavaScript, React, Node.js",
            "Expérience avec les bases de données",
            "Excellent esprit d'équipe"
        ],
        posted: "2025-01-20"
    },
    {
        id: 2,
        title: "Gestionnaire de Projet",
        location: "Québec, QC",
        type: "Temps plein",
        description: "Poste de gestionnaire de projet pour superviser nos initiatives stratégiques.",
        requirements: [
            "5+ années en gestion de projet",
            "Certification PMP un atout",
            "Excellentes compétences en communication",
            "Bilingue français/anglais"
        ],
        posted: "2025-01-18"
    },
    {
        id: 3,
        title: "Spécialiste Marketing Digital",
        location: "Télétravail",
        type: "Temps partiel",
        description: "Développer et implémenter des stratégies de marketing digital innovantes.",
        requirements: [
            "2+ années en marketing digital",
            "Maîtrise des réseaux sociaux",
            "Expérience avec Google Analytics",
            "Créativité et sens de l'innovation"
        ],
        posted: "2025-01-15"
    }
];

// Fonction pour afficher les emplois
function loadEmplois() {
    const container = document.getElementById('emplois-list');
    if (!container) return;

    container.innerHTML = '';

    emploisData.forEach(emploi => {
        const item = document.createElement('div');
        item.className = 'emploi-item';
        item.innerHTML = `
            <h3>${emploi.title}</h3>
            <div class="location">${emploi.location} • ${emploi.type}</div>
            <p>${emploi.description}</p>
            <h4>Exigences:</h4>
            <ul>
                ${emploi.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
            <div class="date">Publié le: ${new Date(emploi.posted).toLocaleDateString('fr-FR')}</div>
            <button class="btn" onclick="applyForJob(${emploi.id})">Postuler</button>
        `;
        container.appendChild(item);
    });
}

// Fonction pour postuler à un emploi
function applyForJob(jobId) {
    alert(`Redirection vers le formulaire de candidature pour l'emploi ${jobId}`);
    // Ici, vous pourriez rediriger vers un formulaire de candidature
}

// Charger les emplois quand la page est prête
document.addEventListener('DOMContentLoaded', loadEmplois);
