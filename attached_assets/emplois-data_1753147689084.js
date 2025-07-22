// Job Listings Data
// To add a new job: Add a new object to the beginning of this array
// To edit: Modify the existing object
// To remove: Delete or comment out the object

const jobListings = [
    {
        id: 1,
        datePosted: "2024-11-20",
        title: "Coordonnateur(trice) aux opérations - Beach Pro Tour",
        department: "Événements",
        type: "Temps plein",
        location: "Montréal, QC",
        summary: "Nous recherchons un(e) coordonnateur(trice) dynamique pour joindre l'équipe du Beach Pro Tour Montréal.",
        description: `
            <p>Groupe Tonic est à la recherche d'un(e) coordonnateur(trice) aux opérations pour le Beach Pro Tour Montréal 2025. Relevant du directeur de l'événement, la personne sera responsable de la coordination logistique de cette compétition internationale de volleyball de plage.</p>
            
            <h3>Responsabilités principales</h3>
            <ul>
                <li>Coordonner la logistique des équipes internationales (hébergement, transport, accréditations)</li>
                <li>Gérer les relations avec les fournisseurs et partenaires</li>
                <li>Superviser le montage et démontage du site de compétition</li>
                <li>Assurer la liaison avec la Fédération Internationale de Volleyball</li>
                <li>Participer à l'élaboration du plan d'opérations</li>
            </ul>
            
            <h3>Qualifications requises</h3>
            <ul>
                <li>Baccalauréat en gestion d'événements, administration ou domaine connexe</li>
                <li>2-3 ans d'expérience en coordination d'événements sportifs</li>
                <li>Excellente maîtrise du français et de l'anglais (parlé et écrit)</li>
                <li>Capacité à travailler sous pression et gérer plusieurs dossiers simultanément</li>
                <li>Disponibilité pour travailler les soirs et fins de semaine durant l'événement</li>
            </ul>
            
            <h3>Atouts</h3>
            <ul>
                <li>Connaissance du volleyball de plage</li>
                <li>Expérience avec des événements internationaux</li>
                <li>Permis de conduire valide</li>
            </ul>
        `,
        salary: "Selon expérience",
        startDate: "Mars 2025",
        emailSubject: "Candidature - Coordonnateur(trice) aux opérations Beach Pro Tour"
    },
    {
        id: 2,
        datePosted: "2024-11-18",
        title: "Producteur(trice) de contenu numérique",
        department: "Production",
        type: "Temps plein",
        location: "Longueuil, QC",
        summary: "Studio 76 recherche un(e) producteur(trice) créatif(ve) pour développer du contenu numérique innovant.",
        description: `
            <p>Studio 76, la division production de Groupe Tonic, est à la recherche d'un(e) producteur(trice) de contenu numérique pour joindre son équipe créative en pleine expansion.</p>
            
            <h3>Responsabilités principales</h3>
            <ul>
                <li>Développer et produire du contenu vidéo pour les plateformes numériques</li>
                <li>Gérer des projets de production de A à Z</li>
                <li>Collaborer avec les équipes créatives et techniques</li>
                <li>Superviser les tournages et la post-production</li>
                <li>Assurer le respect des budgets et échéanciers</li>
            </ul>
            
            <h3>Qualifications requises</h3>
            <ul>
                <li>3-5 ans d'expérience en production de contenu numérique</li>
                <li>Portfolio démontrant une créativité et expertise technique</li>
                <li>Maîtrise des logiciels Adobe Creative Suite</li>
                <li>Connaissance des tendances en contenu numérique et médias sociaux</li>
                <li>Excellentes compétences en gestion de projet</li>
            </ul>
            
            <h3>Environnement de travail</h3>
            <ul>
                <li>Studio de production à la fine pointe de la technologie</li>
                <li>Équipe créative dynamique</li>
                <li>Projets variés et stimulants</li>
                <li>Possibilité de télétravail hybride</li>
            </ul>
        `,
        salary: "65 000$ - 80 000$ selon expérience",
        startDate: "Dès que possible",
        emailSubject: "Candidature - Producteur(trice) de contenu numérique"
    },
    {
        id: 3,
        datePosted: "2024-11-15",
        title: "Directeur(trice) marketing et commandites",
        department: "Groupe Tonic",
        type: "Temps plein",
        location: "Longueuil, QC",
        summary: "Poste stratégique pour développer les partenariats et maximiser la visibilité de nos événements majeurs.",
        description: `
            <p>Groupe Tonic recherche un(e) directeur(trice) marketing et commandites pour joindre son équipe de direction. Ce poste clé sera responsable du développement des partenariats commerciaux pour l'ensemble du portefeuille d'événements.</p>
            
            <h3>Responsabilités principales</h3>
            <ul>
                <li>Élaborer et mettre en œuvre la stratégie de commandites</li>
                <li>Développer et maintenir des relations avec les partenaires corporatifs</li>
                <li>Négocier et finaliser les ententes de partenariat</li>
                <li>Superviser l'activation des commandites lors des événements</li>
                <li>Gérer une équipe de 3-4 personnes</li>
                <li>Collaborer avec les directeurs d'événements pour maximiser les revenus</li>
            </ul>
            
            <h3>Profil recherché</h3>
            <ul>
                <li>Baccalauréat en marketing, administration ou domaine connexe</li>
                <li>7-10 ans d'expérience en développement de partenariats</li>
                <li>Réseau établi dans le milieu corporatif québécois</li>
                <li>Leadership et capacité à mobiliser une équipe</li>
                <li>Bilinguisme essentiel</li>
            </ul>
            
            <h3>Ce que nous offrons</h3>
            <ul>
                <li>Poste permanent avec excellents avantages sociaux</li>
                <li>Environnement de travail stimulant</li>
                <li>Opportunité de travailler sur des événements d'envergure internationale</li>
                <li>Bureau moderne avec vue sur le fleuve au Dock 619</li>
            </ul>
        `,
        salary: "90 000$ - 110 000$ + bonus de performance",
        startDate: "Janvier 2025",
        emailSubject: "Candidature - Directeur(trice) marketing et commandites"
    }
];

// Function to get jobs by department
function getJobsByDepartment(department) {
    if (department === 'all') return jobListings;
    return jobListings.filter(job => job.department === department);
}

// Function to format date in French
function formatJobDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-CA', options);
}

// Function to calculate days since posting
function getDaysSincePosting(dateString) {
    const posted = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaine${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
    return `Il y a ${Math.floor(diffDays / 30)} mois`;
}

// Add debug log
console.log('emplois-data.js loaded successfully with', jobListings.length, 'jobs');
