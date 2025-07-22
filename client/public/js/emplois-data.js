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
        `,
        salary: "55 000$ - 70 000$ selon expérience",
        startDate: "Janvier 2025",
        emailSubject: "Candidature - Producteur(trice) de contenu numérique"
    },
    {
        id: 3,
        datePosted: "2024-11-10",
        title: "Assistant(e) administratif(ve) - Groupe Tonic",
        department: "Administration",
        type: "Temps plein",
        location: "Longueuil, QC",
        summary: "Poste d'assistant(e) administratif(ve) pour supporter les opérations quotidiennes de Groupe Tonic.",
        description: `
            <p>Nous sommes à la recherche d'un(e) assistant(e) administratif(ve) organisé(e) et polyvalent(e) pour joindre l'équipe administrative de Groupe Tonic.</p>
            
            <h3>Responsabilités principales</h3>
            <ul>
                <li>Gestion des communications internes et externes</li>
                <li>Coordination des réunions et gestion des calendriers</li>
                <li>Préparation de documents et rapports</li>
                <li>Support aux différents départements selon les besoins</li>
                <li>Gestion des fournitures de bureau et relations avec fournisseurs</li>
            </ul>
            
            <h3>Qualifications requises</h3>
            <ul>
                <li>DEC en administration ou expérience équivalente</li>
                <li>2+ ans d'expérience en support administratif</li>
                <li>Maîtrise de MS Office et logiciels de gestion</li>
                <li>Excellentes compétences en communication français/anglais</li>
                <li>Autonomie et capacité d'adaptation</li>
            </ul>
        `,
        salary: "40 000$ - 50 000$ selon expérience",
        startDate: "Dès que possible",
        emailSubject: "Candidature - Assistant(e) administratif(ve)"
    },
    {
        id: 4,
        datePosted: "2024-11-05",
        title: "Chargé(e) de projet - Événements corporatifs",
        department: "Événements",
        type: "Temps plein",
        location: "Montréal, QC",
        summary: "Opportunité de gérer des événements corporatifs d'envergure pour une clientèle prestigieuse.",
        description: `
            <p>Groupe Tonic recherche un(e) chargé(e) de projet expérimenté(e) pour développer et gérer notre portefeuille d'événements corporatifs.</p>
            
            <h3>Responsabilités principales</h3>
            <ul>
                <li>Gestion complète de projets événementiels corporatifs</li>
                <li>Développement de concepts créatifs et propositions commerciales</li>
                <li>Négociation avec fournisseurs et gestion budgétaire</li>
                <li>Coordination d'équipes multidisciplinaires</li>
                <li>Suivi client et développement d'affaires</li>
            </ul>
            
            <h3>Qualifications requises</h3>
            <ul>
                <li>Baccalauréat en gestion d'événements, marketing ou équivalent</li>
                <li>5+ ans d'expérience en gestion d'événements corporatifs</li>
                <li>Réseau établi dans l'industrie événementielle</li>
                <li>Leadership et excellentes compétences interpersonnelles</li>
                <li>Bilinguisme français/anglais essentiel</li>
            </ul>
        `,
        salary: "65 000$ - 80 000$ + bonus selon performance",
        startDate: "Février 2025",
        emailSubject: "Candidature - Chargé(e) de projet Événements corporatifs"
    }
];

// Make data available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { jobListings };
} else {
    window.jobListings = jobListings;
}