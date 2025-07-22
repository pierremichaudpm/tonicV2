// Job Listings Data - English
// To add a new job: Add a new object to the beginning of this array
// To edit: Modify the existing object
// To remove: Delete or comment out the object

const jobListings = [
    {
        id: 1,
        datePosted: "2024-11-20",
        title: "Operations Coordinator - Beach Pro Tour",
        department: "Events",
        type: "Full-time",
        location: "Montreal, QC",
        summary: "We are looking for a dynamic coordinator to join the Beach Pro Tour Montreal team.",
        description: `
            <p>Groupe Tonic is seeking an Operations Coordinator for Beach Pro Tour Montreal 2025. Reporting to the event director, the person will be responsible for the logistical coordination of this international beach volleyball competition.</p>
            
            <h3>Key Responsibilities</h3>
            <ul>
                <li>Coordinate international team logistics (accommodation, transportation, accreditations)</li>
                <li>Manage relationships with suppliers and partners</li>
                <li>Supervise competition site setup and breakdown</li>
                <li>Liaise with the International Volleyball Federation</li>
                <li>Participate in operations plan development</li>
            </ul>
            
            <h3>Required Qualifications</h3>
            <ul>
                <li>Bachelor's degree in event management, administration or related field</li>
                <li>2-3 years experience in sports event coordination</li>
                <li>Excellent proficiency in French and English (spoken and written)</li>
                <li>Ability to work under pressure and handle multiple files simultaneously</li>
                <li>Availability to work evenings and weekends during the event</li>
            </ul>
            
            <h3>Assets</h3>
            <ul>
                <li>Knowledge of beach volleyball</li>
                <li>Experience with international events</li>
                <li>Valid driver's license</li>
            </ul>
        `,
        salary: "Based on experience",
        startDate: "March 2025",
        emailSubject: "Application - Beach Pro Tour Operations Coordinator"
    },
    {
        id: 2,
        datePosted: "2024-11-18",
        title: "Digital Content Producer",
        department: "Production",
        type: "Full-time",
        location: "Longueuil, QC",
        summary: "Studio 76 seeks a creative producer to develop innovative digital content.",
        description: `
            <p>Studio 76, Groupe Tonic's production division, is looking for a digital content producer to join its expanding creative team.</p>
            
            <h3>Key Responsibilities</h3>
            <ul>
                <li>Develop and produce video content for digital platforms</li>
                <li>Manage production projects from A to Z</li>
                <li>Collaborate with creative and technical teams</li>
                <li>Supervise shoots and post-production</li>
                <li>Ensure budget and schedule compliance</li>
            </ul>
            
            <h3>Required Qualifications</h3>
            <ul>
                <li>3-5 years experience in digital content production</li>
                <li>Portfolio demonstrating creativity and technical expertise</li>
                <li>Proficiency in Adobe Creative Suite</li>
                <li>Knowledge of digital content and social media trends</li>
                <li>Excellent project management skills</li>
            </ul>
        `,
        salary: "$55,000 - $70,000 based on experience",
        startDate: "January 2025",
        emailSubject: "Application - Digital Content Producer"
    },
    {
        id: 3,
        datePosted: "2024-11-10",
        title: "Administrative Assistant - Groupe Tonic",
        department: "Administration",
        type: "Full-time",
        location: "Longueuil, QC",
        summary: "Administrative assistant position to support Groupe Tonic's daily operations.",
        description: `
            <p>We are looking for an organized and versatile administrative assistant to join Groupe Tonic's administrative team.</p>
            
            <h3>Key Responsibilities</h3>
            <ul>
                <li>Management of internal and external communications</li>
                <li>Meeting coordination and calendar management</li>
                <li>Document and report preparation</li>
                <li>Support to various departments as needed</li>
                <li>Office supplies management and supplier relations</li>
            </ul>
            
            <h3>Required Qualifications</h3>
            <ul>
                <li>DEC in administration or equivalent experience</li>
                <li>2+ years experience in administrative support</li>
                <li>Proficiency in MS Office and management software</li>
                <li>Excellent communication skills in French/English</li>
                <li>Autonomy and adaptability</li>
            </ul>
        `,
        salary: "$40,000 - $50,000 based on experience",
        startDate: "As soon as possible",
        emailSubject: "Application - Administrative Assistant"
    },
    {
        id: 4,
        datePosted: "2024-11-05",
        title: "Project Manager - Corporate Events",
        department: "Events",
        type: "Full-time",
        location: "Montreal, QC",
        summary: "Opportunity to manage large-scale corporate events for prestigious clientele.",
        description: `
            <p>Groupe Tonic seeks an experienced project manager to develop and manage our corporate events portfolio.</p>
            
            <h3>Key Responsibilities</h3>
            <ul>
                <li>Complete management of corporate event projects</li>
                <li>Development of creative concepts and commercial proposals</li>
                <li>Supplier negotiation and budget management</li>
                <li>Multidisciplinary team coordination</li>
                <li>Client follow-up and business development</li>
            </ul>
            
            <h3>Required Qualifications</h3>
            <ul>
                <li>Bachelor's degree in event management, marketing or equivalent</li>
                <li>5+ years experience in corporate event management</li>
                <li>Established network in the event industry</li>
                <li>Leadership and excellent interpersonal skills</li>
                <li>French/English bilingualism essential</li>
            </ul>
        `,
        salary: "$65,000 - $80,000 + performance bonus",
        startDate: "February 2025",
        emailSubject: "Application - Corporate Events Project Manager"
    }
];

// Make data available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { jobListings };
} else {
    window.jobListings = jobListings;
}