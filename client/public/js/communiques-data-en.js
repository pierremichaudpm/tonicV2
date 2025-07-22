// Press Releases Data - English
// To add a new press release: Add a new object to the beginning of this array
// To edit: Modify the existing object
// To remove: Delete or comment out the object

const pressReleases = [
    {
        id: 5,
        date: "2024-11-15",
        title: "Tonic announces the return of Beach Pro Tour Montreal for 2025",
        category: "Beach Pro Tour",
        summary: "The world's beach volleyball elite will return to Montreal from August 13-17, 2025 for a major international circuit stop.",
        content: `
            <p>Montreal, November 15, 2024 – Groupe Tonic is proud to announce the return of the Beach Pro Tour to Montreal for a fifth edition taking place from August 13-17, 2025 at Parc Jean-Drapeau.</p>
            
            <p>This Elite16 stop on the world beach volleyball circuit will bring together the 16 best men's and women's teams on the planet for five days of high-level competition.</p>
            
            <h3>2025 Edition Highlights</h3>
            <ul>
                <li>Total prize money of $300,000 USD</li>
                <li>International broadcast in over 100 countries</li>
                <li>Partner village and family activities</li>
                <li>Volleyball clinics with professional athletes</li>
            </ul>
            
            <p>"We are delighted to welcome the world's beach volleyball elite to Montreal once again. The enthusiasm of the Montreal public for this event continues to grow year after year," says [Name], General Director of Beach Pro Tour Montreal.</p>
            
            <p>Tickets will go on sale February 1, 2025 on the event's official website.</p>
            
            <p><strong>About the Beach Pro Tour</strong><br>
            The Beach Pro Tour is the international professional beach volleyball circuit, sanctioned by FIVB (International Volleyball Federation).</p>
        `,
        image: "images/beach-pro-tour-hero.webp"
    },
    {
        id: 4,
        date: "2024-10-22",
        title: "UCI Road World Championships 2026 unveil their course",
        category: "UCI World Championships",
        summary: "The route layouts for the UCI Road World Championships 2026 in Montreal have been officially presented, promising spectacular races.",
        content: `
            <p>Montreal, October 22, 2024 – The organizing committee for the UCI Road World Championships Montreal 2026 unveiled today the courses that will host the world's cycling elite from September 19-27, 2026.</p>
            
            <p>The races will take place in the heart of the metropolis, with starts and finishes on the emblematic Park Avenue, at the foot of Mount Royal.</p>
            
            <h3>Elite Course</h3>
            <p>The elite men's road race course will total 267 km with 4,200 meters of positive elevation, including 17 ascents of the Camillien-Houde hill. The elite women's event will cover 162 km with 2,600 meters of elevation.</p>
            
            <blockquote>"This demanding course will showcase Montreal's iconic landscapes while offering a technical challenge worthy of a world championship"</blockquote>
            
            <p>More than 1,000 athletes representing 75 nations are expected for these championships which will generate estimated economic benefits of $80 million.</p>
        `,
        image: "images/montreal-2026-uci-hero.jpg"
    },
    {
        id: 3,
        date: "2024-09-30",
        title: "Record participation at the 2024 Marathon Beneva de Montréal",
        category: "Marathon Beneva",
        summary: "More than 25,000 runners took part in the 31st edition of the Marathon Beneva de Montréal, setting a new participation record.",
        content: `
            <p>Montreal, September 30, 2024 – The 31st edition of the Marathon Beneva de Montréal concluded on Sunday on a historic note with a record participation of more than 25,000 runners across all distances.</p>
            
            <p>This 2024 edition was marked by perfect weather conditions and flawless organization that contributed to creating an exceptional festive atmosphere in the streets of Montreal.</p>
            
            <h3>Event Highlights</h3>
            <ul>
                <li>25,347 total participants (absolute record)</li>
                <li>Representation from 89 different countries</li>
                <li>Completion rate of 97.8% across all distances</li>
                <li>More than 1,200 volunteers mobilized</li>
            </ul>
            
            <p>The event continues to strengthen its position as one of Canada's most popular marathons and confirms Montreal as a destination of choice for international runners.</p>
        `,
        image: "images/marathon-beneva-hero.jpg"
    },
    {
        id: 2,
        date: "2024-09-16",
        title: "Resounding success for the 2024 Grand Prix Cyclistes de Québec et Montréal",
        category: "Grand Prix Cyclistes",
        summary: "The UCI WorldTour events attracted the biggest names in world cycling and hundreds of thousands of spectators.",
        content: `
            <p>Montreal/Quebec, September 16, 2024 – The 14th editions of the Grand Prix Cyclistes de Québec et Montréal concluded enthusiastically with the participation of the world's road cycling elite.</p>
            
            <p>These two UCI WorldTour events, the only ones in North America, once again demonstrated their ability to bring together the planet's best riders in an exceptional setting.</p>
            
            <h3>2024 Edition Summary</h3>
            <ul>
                <li>19 UCI WorldTour teams present</li>
                <li>More than 400,000 spectators at both sites</li>
                <li>Broadcast in more than 150 countries</li>
                <li>Economic benefits estimated at $35 million</li>
            </ul>
            
            <p>The exemplary organization and warm atmosphere of the Quebec and Montreal public continue to make these events essential dates on the world cycling calendar.</p>
        `,
        image: "images/grands-prix-cyclistes-hero.jpg"
    },
    {
        id: 1,
        date: "2024-08-20",
        title: "Beach Pro Tour Montreal 2024: A phenomenal success at Parc Jean-Drapeau",
        category: "Beach Pro Tour",
        summary: "The 4th edition of Beach Pro Tour Montreal welcomed more than 45,000 spectators and confirmed Montreal as a preferred destination for world beach volleyball.",
        content: `
            <p>Montreal, August 20, 2024 – The 4th edition of Beach Pro Tour Montreal concluded on Sunday evening on a triumphant note, once again confirming Montreal's place on the international beach volleyball scene.</p>
            
            <p>Organized from August 14-18 at Parc Jean-Drapeau, this Elite16 event brought together the 16 best men's and women's pairs from the world circuit for five days of intense competition under the Center Court lights.</p>
            
            <h3>A Record Edition</h3>
            <ul>
                <li>More than 45,000 spectators over five days</li>
                <li>16 pairs per category representing 20 nations</li>
                <li>Live broadcast in 100+ countries</li>
                <li>$300,000 USD prize money distributed</li>
            </ul>
            
            <blockquote>"The electrifying atmosphere of the Montreal public and the impeccable organization make this stop one of the athletes' favorites on the circuit"</blockquote>
            
            <p>This success confirms Groupe Tonic's commitment to positioning Montreal as a destination of choice for major international sporting events.</p>
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