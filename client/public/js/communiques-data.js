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
            <p>Montréal, le 30 septembre 2024 – La 31e édition du Marathon Beneva de Montréal s'est clôturée dimanche sur une note historique avec une participation record de plus de 25 000 coureurs répartis sur toutes les distances.</p>
            
            <p>Cette édition 2024 a été marquée par des conditions météorologiques parfaites et une organisation sans faille qui ont contribué à créer une atmosphère festive exceptionnelle dans les rues de Montréal.</p>
            
            <h3>Faits saillants de l'événement</h3>
            <ul>
                <li>25 347 participants au total (record absolu)</li>
                <li>Représentation de 89 pays différents</li>
                <li>Taux de complétion de 97,8% toutes distances confondues</li>
                <li>Plus de 1 200 bénévoles mobilisés</li>
            </ul>
            
            <p>L'événement continue de renforcer sa position comme l'un des marathons les plus prisés au Canada et confirme Montréal comme destination de choix pour les coureurs internationaux.</p>
        `,
        image: "images/marathon-beneva-hero.jpg"
    },
    {
        id: 2,
        date: "2024-09-16",
        title: "Succès retentissant pour les Grands Prix Cyclistes de Québec et Montréal 2024",
        category: "Grands Prix Cyclistes",
        summary: "Les épreuves UCI WorldTour ont attiré les plus grands noms du cyclisme mondial et des centaines de milliers de spectateurs.",
        content: `
            <p>Montréal/Québec, le 16 septembre 2024 – Les 14e éditions des Grands Prix Cyclistes de Québec et Montréal se sont achevées dans l'enthousiasme avec la participation de l'élite mondiale du cyclisme sur route.</p>
            
            <p>Ces deux épreuves UCI WorldTour, les seules en Amérique du Nord, ont une fois de plus démontré leur capacité à réunir les meilleurs coureurs de la planète dans un cadre exceptionnel.</p>
            
            <h3>Bilan de l'édition 2024</h3>
            <ul>
                <li>19 équipes UCI WorldTour présentes</li>
                <li>Plus de 400 000 spectateurs sur les deux sites</li>
                <li>Diffusion dans plus de 150 pays</li>
                <li>Retombées économiques estimées à 35 millions de dollars</li>
            </ul>
            
            <p>L'organisation exemplaire et l'ambiance chaleureuse du public québécois et montréalais continuent de faire de ces épreuves des rendez-vous incontournables du calendrier cycliste mondial.</p>
        `,
        image: "images/grands-prix-cyclistes-hero.jpg"
    },
    {
        id: 1,
        date: "2024-08-20",
        title: "Beach Pro Tour Montréal 2024 : Un succès phénoménal au parc Jean-Drapeau",
        category: "Beach Pro Tour",
        summary: "La 4e édition du Beach Pro Tour Montréal a accueilli plus de 45 000 spectateurs et confirmé Montréal comme destination privilégiée du volleyball de plage mondial.",
        content: `
            <p>Montréal, le 20 août 2024 – La 4e édition du Beach Pro Tour Montréal s'est achevée dimanche soir sur une note triomphale, confirmant une fois de plus la place de Montréal sur la scène internationale du volleyball de plage.</p>
            
            <p>Organisé du 14 au 18 août au parc Jean-Drapeau, cet événement Elite16 a réuni les 16 meilleures paires masculines et féminines du circuit mondial pour cinq jours de compétition intense sous les projecteurs du Center Court.</p>
            
            <h3>Une édition record</h3>
            <ul>
                <li>Plus de 45 000 spectateurs sur les cinq jours</li>
                <li>16 paires par catégorie représentant 20 nations</li>
                <li>Diffusion en direct dans 100+ pays</li>
                <li>Prize money de 300 000$ USD distribué</li>
            </ul>
            
            <blockquote>"L'atmosphère électrisante du public montréalais et l'organisation impeccable font de cette étape l'une des préférées des athlètes sur le circuit"</blockquote>
            
            <p>Cette réussite confirme l'engagement de Groupe Tonic à positionner Montréal comme une destination de choix pour les grands événements sportifs internationaux.</p>
        `,
        image: "images/beach-pro-tour-hero.webp"
    }
];

// Make data available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { pressReleases };
} else {
    window.pressReleases = pressReleases;
}