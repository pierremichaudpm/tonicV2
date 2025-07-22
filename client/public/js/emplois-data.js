// Job Listings Data
// To add a new job: Add a new object to the beginning of this array
// To edit: Modify the existing object
// To remove: Delete or comment out the object

const jobListings = [
    {
        id: 101,
        datePosted: "2025-07-22",
        title: "Adjoint(e) senior à la Direction",
        department: "Administration",
        type: "Temps plein / poste permanent",
        location: "Longueuil - Rive Sud",
        summary: "Recherche d'un(e) adjoint(e) senior pour offrir un soutien stratégique et opérationnel auprès de la haute direction.",
        description: `
            <p>Relevant de la Vice-présidente directrice générale, l'adjoint·e senior agit à titre de soutien stratégique et opérationnel auprès de la haute direction. Il ou elle assure une coordination efficace des priorités, facilite la circulation de l'information, prépare les documents clés et participe activement à la gestion de projets transversaux.</p>
            
            <h3>Responsabilités principales</h3>
            <ul>
                <li>Assister la vice-présidence et les directions générales dans la planification, le suivi et la coordination de ses activités</li>
                <li>Coordonner les échanges avec les membres de l'équipe, les partenaires, les instances décisionnelles et les parties prenantes</li>
                <li>Participer à la préparation des documents pour les demandes de subventions et les rééditions de compte</li>
                <li>Participer à la préparation des réunions de direction, des conseils d'administration et des comités, et assurer la logistique associée</li>
                <li>Gérer l'agenda, organiser les rencontres internes et externes, préparer les ordres du jour, les comptes rendus et les suivis</li>
                <li>Rédiger, réviser et mettre en forme des documents, présentations, rapports, lettres et communications officielles</li>
                <li>Soutenir le déploiement et le suivi de projets spéciaux ou stratégiques</li>
            </ul>
            
            <h3>Profil recherché</h3>
            <ul>
                <li>Diplôme d'études universitaires ou collégiales en administration, gestion, communication ou domaine connexe</li>
                <li>Minimum de 5 à 7 ans d'expérience pertinente dans un poste similaire, idéalement dans un environnement complexe ou multi-projets</li>
                <li>Excellentes habiletés en communication écrite et orale en français et en anglais</li>
                <li>Sens aigu de l'organisation, rigueur, discrétion et capacité à gérer plusieurs priorités</li>
                <li>Maîtrise des outils bureautiques (Suite Google, Microsoft 365, Powerpoint, Canva)</li>
                <li>Esprit d'initiative, autonomie, diplomatie et capacité à travailler sous pression</li>
            </ul>
            
            <h3>Conditions de travail</h3>
            <ul>
                <li>Salaire compétitif en fonction de l'expérience</li>
                <li>Poste à temps plein (37,5 h/semaine)</li>
                <li>Mode de travail hybride avec présence au bureau requise 4 à 5 jours/semaine</li>
                <li>Milieu dynamique, stimulant et axé sur la collaboration</li>
                <li>Assurances collectives et REER + participation de l'employeur offerts après période de probation</li>
            </ul>
        `,
        salary: "Compétitif en fonction de l'expérience",
        startDate: "Dès que possible",
        emailSubject: "Candidature - Adjoint(e) senior à la Direction",
        applyEmail: "rh@gpcqm.ca",
        deadline: "28 juillet 2025"
    },
    {
        id: 102,
        datePosted: "2025-07-22",
        title: "Coordonnateur, Événements – DOCK619",
        department: "Événements",
        type: "Permanent",
        location: "Longueuil, QC",
        summary: "Appuyer l'équipe dans l'organisation, la logistique et la réalisation des événements au DOCK619.",
        description: `
            <p>Le Dock619 est un espace événementiel multifonctionnel situé dans le quartier industriel de Longueuil. L'interaction entre son architecture industrielle et un design chaleureux crée une ambiance unique. Le Dock619 offre la chance de recevoir les invités dans un espace de conception unique grâce à son style moderne, à la fine pointe de la technologie, offrant une cuisine du marché éclatée.</p>
            
            <h3>Votre mission</h3>
            <p>Appuyer l'équipe dans l'organisation, la logistique et la réalisation des événements, ainsi que dans le déploiement des communications internes et externes, participer à promouvoir la salle événementielle auprès d'un public cible et s'assurer du bon déroulement des événements en cours.</p>
            
            <h3>Vos responsabilités</h3>
            <ul>
                <li>Assurer la gestion des réseaux sociaux du DOCK619 et la mise à jour du site web</li>
                <li>Planifier et coordonner des aspects logistiques des événements (échéanciers, déroulements et scénarios, choix des menus, etc.)</li>
                <li>Établir les horaires des serveurs et créer des mini-formations pour améliorer leurs connaissances quant au menu et aux techniques de service</li>
                <li>Participer à l'embauche de nouveaux serveurs</li>
                <li>Effectuer divers travaux cléricaux tels que tenir à jour le calendrier des événements et participer aux prises d'inventaire</li>
            </ul>
            
            <h3>Votre profil</h3>
            <ul>
                <li>DEC dans un domaine pertinent</li>
                <li>Expérience professionnelle en organisation d'événements, en marketing événementiel ou en gestion de projet</li>
                <li>Intérêt marqué pour les réseaux sociaux</li>
                <li>Maîtrise de la suite Office et expérience avec Photoshop</li>
                <li>Passionné par l'organisation et l'événementiel</li>
                <li>Initiative, proactivité, créativité, dynamisme, polyvalence et esprit d'équipe</li>
                <li>Sens de l'organisation, minutie et souci du détail</li>
                <li>Bonne gestion des priorités et capacité à gérer plusieurs dossiers à la fois</li>
                <li>Parfaite maîtrise de la langue française et bonne connaissance de la langue anglaise</li>
                <li>Disponible pour travailler en dehors de heures habituelles lors d'événements</li>
            </ul>
            
            <h3>Notre offre</h3>
            <ul>
                <li>Lieu de travail à Longueuil</li>
                <li>Participation à des projets stimulants au sein d'une équipe en croissance</li>
                <li>Mobilité interne</li>
                <li>Régime complet d'avantages sociaux compétitifs</li>
            </ul>
        `,
        salary: "Selon expérience",
        startDate: "Dès que possible",
        emailSubject: "Candidature - Coordonnateur Événements DOCK619",
        applyEmail: "rh@gpcqm.ca"
    },
    {
        id: 103,
        datePosted: "2025-07-22",
        title: "Plongeur",
        department: "Cuisine",
        type: "Horaire",
        location: "Longueuil, QC",
        summary: "Rejoignez notre équipe de cuisine au DOCK619 dans un rôle essentiel pour assurer une propreté impeccable et soutenir un service exceptionnel.",
        description: `
            <p>Au cœur de l'action, le plongeur joue un rôle fondamental dans le bon fonctionnement du restaurant. Grâce à son travail rigoureux, il assure la propreté impeccable de la vaisselle et des équipements, permettant ainsi à la cuisine de servir des plats toujours irréprochables.</p>
            
            <p>Situé à 20 minutes du centre-ville de Montréal, sur la Rive-Sud, le Dock619 est un lieu de tous les possibles. Son décor moderne et chaleureux ainsi que ses multiples options de configurations ont spécifiquement été pensés pour donner vie à des événements mémorables. Sous la gouverne du chef Hugo St-Jacques, chef de l'année au Canada en 2014, une cuisine moderne et créative, ancrée dans les saveurs du terroir est mise de l'avant.</p>
            
            <h3>Le profil d'un excellent plongeur</h3>
            <p>C'est une personne dynamique, qui garde le sourire même dans le feu de l'action et qui aime quand ça bouge. Il tisse des liens solides avec ses collègues, fait preuve de fiabilité et sait s'adapter aux besoins de l'équipe. Il communique avec clarté, partage ses objectifs et n'hésite pas à lever la main lorsqu'il y a un défi à relever.</p>
            
            <h3>Votre quotidien avec nous</h3>
            <ul>
                <li>Veiller au maintien de la propreté de la cuisine et des équipements selon les normes d'hygiène et de salubrité</li>
                <li>Laver la vaisselle après chaque repas et la ranger aux endroits appropriés</li>
                <li>Nettoyer les équipements utilisés après chaque utilisation (marmite, casseroles, cuisinière, etc.)</li>
                <li>Montage et démontage des installations de la salle événementielle</li>
                <li>Toutes autres tâches connexes</li>
            </ul>
            
            <h3>Atouts recherchés</h3>
            <ul>
                <li>Connaissance minimale du français</li>
                <li>Expérience minimale d'un an dans un poste similaire</li>
                <li>Bonnes capacités physiques et endurance</li>
            </ul>
            
            <h3>Conditions</h3>
            <ul>
                <li>Payé à l'heure au taux horaire de 23$</li>
                <li>2 semaines de vacances</li>
                <li>Assurances collectives</li>
                <li>REER et participation de l'employeur</li>
                <li>Horaire : Du lundi au vendredi, fins de semaine au besoin, quart de jour et de soir</li>
            </ul>
        `,
        salary: "23$/heure",
        startDate: "Dès que possible",
        emailSubject: "Candidature - Plongeur",
        applyEmail: "rh@gpcqm.ca"
    }
];

// Make data available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { jobListings };
} else {
    window.jobListings = jobListings;
}