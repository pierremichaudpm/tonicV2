// Données des communiqués en français
const communiquesData = [
    {
        id: 1,
        title: "Nouveau partenariat stratégique annoncé",
        date: "2025-01-15",
        content: "Tonic annonce un nouveau partenariat qui renforcera notre position sur le marché.",
        summary: "Un partenariat important pour notre croissance future."
    },
    {
        id: 2,
        title: "Expansion des services offerts",
        date: "2025-01-10",
        content: "Nous élargissons notre gamme de services pour mieux servir nos clients.",
        summary: "De nouveaux services pour répondre aux besoins croissants."
    },
    {
        id: 3,
        title: "Récompense pour l'innovation",
        date: "2025-01-05",
        content: "Tonic a été récompensé pour ses innovations dans l'industrie.",
        summary: "Une reconnaissance de notre travail d'innovation."
    }
];

// Fonction pour afficher les communiqués
function loadCommuniques() {
    const container = document.getElementById('communiques-list');
    if (!container) return;

    container.innerHTML = '';

    communiquesData.forEach(communique => {
        const item = document.createElement('div');
        item.className = 'communique-item';
        item.innerHTML = `
            <h3>${communique.title}</h3>
            <div class="date">${new Date(communique.date).toLocaleDateString('fr-FR')}</div>
            <p>${communique.summary}</p>
            <p><strong>Détails:</strong> ${communique.content}</p>
        `;
        container.appendChild(item);
    });
}

// Charger les communiqués quand la page est prête
document.addEventListener('DOMContentLoaded', loadCommuniques);
