// Press releases data in English
const communiquesData = [
    {
        id: 1,
        title: "New Strategic Partnership Announced",
        date: "2025-01-15",
        content: "Tonic announces a new partnership that will strengthen our market position.",
        summary: "An important partnership for our future growth."
    },
    {
        id: 2,
        title: "Expansion of Services Offered",
        date: "2025-01-10",
        content: "We are expanding our range of services to better serve our clients.",
        summary: "New services to meet growing needs."
    },
    {
        id: 3,
        title: "Innovation Award Received",
        date: "2025-01-05",
        content: "Tonic has been recognized for its innovations in the industry.",
        summary: "Recognition of our innovative work."
    }
];

// Function to display press releases
function loadCommuniques() {
    const container = document.getElementById('communiques-list');
    if (!container) return;

    container.innerHTML = '';

    communiquesData.forEach(communique => {
        const item = document.createElement('div');
        item.className = 'communique-item';
        item.innerHTML = `
            <h3>${communique.title}</h3>
            <div class="date">${new Date(communique.date).toLocaleDateString('en-US')}</div>
            <p>${communique.summary}</p>
            <p><strong>Details:</strong> ${communique.content}</p>
        `;
        container.appendChild(item);
    });
}

// Load press releases when page is ready
document.addEventListener('DOMContentLoaded', loadCommuniques);
