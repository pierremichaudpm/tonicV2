// Press Releases Data
// To add a new press release: Add a new object to the beginning of this array
// To edit: Modify the existing object
// To remove: Delete or comment out the object

const pressReleases = [
    // Example of a Groupe Tonic corporate press release
    /*
    {
        id: 6,
        date: "2024-12-01",
        title: "Groupe Tonic annonce un partenariat stratégique majeur",
        category: "Groupe Tonic",
        summary: "Un nouveau partenariat qui renforcera la position de leader de Groupe Tonic dans l'industrie événementielle.",
        content: `
            <p>Contenu du communiqué corporatif...</p>
        `,
        image: "images/groupe-tonic-news.jpg"
    },
    */
    {
        id: 5,
        date: "2024-11-15",
        title: "Tonic annonce le retour du Beach Pro Tour Montréal pour 2025",
        category: "Beach Pro Tour",
        summary: "L'élite mondiale du volleyball de plage sera de retour à Montréal du 13 au 17 août 2025 pour une étape majeure du circuit international.",
        content: `
            <p>Montréal, le 15 novembre 2024 – Groupe Tonic est fier d'annoncer le retour du Beach Pro Tour à Montréal pour une cinquième édition qui se tiendra du 13 au 17 août 2025 au parc Jean-Drapeau.</p>
            
            <p>Cette étape Elite16 du circuit mondial de volleyball de plage réunira les 16 meilleures équipes masculines et féminines de la planète pour cinq jours de compétition de haut niveau.</p>
            
            <h3>Points saillants de l'édition 2025</h3>
            <ul>
                <li>Prize money total de 300 000$ USD</li>
                <li>Diffusion internationale dans plus de 100 pays</li>
                <li>Village des partenaires et activités familiales</li>
                <li>Cliniques de volleyball avec les athlètes professionnels</li>
            </ul>
            
            <p>"Nous sommes ravis d'accueillir à nouveau l'élite mondiale du volleyball de plage à Montréal. L'engouement du public montréalais pour cet événement ne cesse de croître année après année", déclare [Nom], directeur général du Beach Pro Tour Montréal.</p>
            
            <p>Les billets seront mis en vente le 1er février 2025 sur le site officiel de l'événement.</p>
            
            <p><strong>À propos du Beach Pro Tour</strong><br>
            Le Beach Pro Tour est le circuit professionnel international de volleyball de plage, sanctionné par la FIVB (Fédération Internationale de Volleyball).</p>
        `,
        image: "images/beach-pro-tour-hero.webp"
    },
    {
        id: 4,
        date: "2024-10-22",
        title: "Les Championnats du Monde Route UCI 2026 dévoilent leur parcours",
        category: "Championnats du Monde UCI",
        summary: "Les tracés des épreuves sur route des Championnats du Monde UCI 2026 à Montréal ont été officiellement présentés, promettant des courses spectaculaires.",
        content: `
            <p>Montréal, le 22 octobre 2024 – Le comité organisateur des Championnats du Monde Route UCI Montréal 2026 a dévoilé aujourd'hui les parcours qui accueilleront l'élite mondiale du cyclisme du 19 au 27 septembre 2026.</p>
            
            <p>Les courses se dérouleront au cœur de la métropole, avec des départs et arrivées sur l'emblématique avenue du Parc, au pied du Mont-Royal.</p>
            
            <h3>Parcours élite</h3>
            <p>Le parcours de la course sur route élite hommes totalisera 267 km avec 4 200 mètres de dénivelé positif, incluant 17 ascensions de la côte Camillien-Houde. L'épreuve élite femmes couvrira 162 km avec 2 600 mètres de dénivelé.</p>
            
            <blockquote>"Ce parcours exigeant mettra en valeur les paysages iconiques de Montréal tout en offrant un défi technique à la hauteur d'un championnat du monde"</blockquote>
            
            <p>Plus de 1 000 athlètes représentant 75 nations sont attendus pour ces championnats qui généreront des retombées économiques estimées à 80 millions de dollars.</p>
        `,
        image: "images/montreal-2026-uci-hero.jpg"
    },
    {
        id: 3,
        date: "2024-09-30",
        title: "Record de participation au Marathon Beneva de Montréal 2024",
        category: "Marathon Beneva",
        summary: "Plus de 25 000 coureurs ont pris part à la 31e édition du Marathon Beneva de Montréal, établissant un nouveau record de participation.",
        content: `
            <p>Montréal, le 30 septembre 2024 – Le Marathon Beneva de Montréal a connu un succès retentissant avec plus de 25 000 participants venus de 65 pays, marquant un record historique pour l'événement.</p>
            
            <p>Les conditions météorologiques idéales ont permis d'établir plusieurs records de parcours, notamment chez les élites québécois.</p>
            
            <h3>Faits saillants</h3>
            <ul>
                <li>25 312 coureurs au total sur l'ensemble des distances</li>
                <li>Nouveau record du parcours masculin : 2h09'47"</li>
                <li>98% de satisfaction selon le sondage post-course</li>
                <li>2,5 millions $ amassés pour diverses causes</li>
            </ul>
            
            <p>L'édition 2025 aura lieu du 19 au 21 septembre et les inscriptions ouvriront le 1er décembre 2024.</p>
        `,
        image: "images/marathon-beneva-hero.jpg"
    },
    {
        id: 2,
        date: "2024-08-15",
        title: "Studio 76 lance une nouvelle division de production virtuelle",
        category: "Studio 76",
        summary: "Studio 76 innove avec l'ouverture d'un studio de production virtuelle équipé de la technologie LED volumétrique de pointe.",
        content: `
            <p>Longueuil, le 15 août 2024 – Studio 76, la division production de Groupe Tonic, annonce l'ouverture de son nouveau studio de production virtuelle, positionnant l'entreprise à l'avant-garde de l'innovation dans l'industrie.</p>
            
            <p>Ce nouvel espace de 10 000 pieds carrés est équipé d'un mur LED de 40 pieds de largeur offrant une résolution 8K, permettant de créer des environnements virtuels photoréalistes en temps réel.</p>
            
            <h3>Capacités du nouveau studio</h3>
            <ul>
                <li>Mur LED principal de 40' x 20' avec technologie HDR</li>
                <li>Plafond LED de 30' x 30' pour éclairage immersif</li>
                <li>Système de tracking en temps réel</li>
                <li>Pipeline de production Unreal Engine intégré</li>
            </ul>
            
            <p>"Cette technologie révolutionne notre approche de la production. Nous pouvons maintenant créer n'importe quel environnement sans les contraintes logistiques des tournages traditionnels", explique [Nom], directeur de Studio 76.</p>
            
            <p>Le studio est maintenant disponible pour des projets commerciaux, télévisuels et cinématographiques.</p>
        `,
        image: "images/tonic-productions-hero.jpg"
    },
    {
        id: 1,
        date: "2024-06-20",
        title: "Dock 619 : Nouvel espace événementiel sur les rives du Saint-Laurent",
        category: "Dock 619",
        summary: "Groupe Tonic dévoile Dock 619, un lieu événementiel unique offrant une vue spectaculaire sur le fleuve Saint-Laurent.",
        content: `
            <p>Longueuil, le 20 juin 2024 – Groupe Tonic est fier d'annoncer l'ouverture officielle de Dock 619, un espace événementiel exceptionnel situé sur les berges du Saint-Laurent à Longueuil.</p>
            
            <p>Avec sa superficie de 8 000 pieds carrés et sa terrasse de 3 000 pieds carrés surplombant le fleuve, Dock 619 peut accueillir jusqu'à 500 invités pour des événements corporatifs, mariages et célébrations privées.</p>
            
            <h3>Caractéristiques uniques</h3>
            <ul>
                <li>Vue panoramique sur Montréal et le fleuve</li>
                <li>Cuisine commerciale complète</li>
                <li>Système audiovisuel de pointe</li>
                <li>Stationnement gratuit pour 200 véhicules</li>
                <li>Accessibilité universelle</li>
            </ul>
            
            <p>"Dock 619 représente notre vision d'un espace événementiel moderne qui allie élégance, fonctionnalité et situation géographique exceptionnelle", souligne [Nom], directeur général de Groupe Tonic.</p>
            
            <p>Les réservations sont maintenant ouvertes pour l'automne 2024 et l'année 2025.</p>
        `,
        image: "images/dock619-hero.webp"
    }
];

// Function to get a press release by ID
function getPressReleaseById(id) {
    return pressReleases.find(pr => pr.id === parseInt(id));
}

// Function to format date in French
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-CA', options);
}
