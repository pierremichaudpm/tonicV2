// Job Listings Data - English
// To add a new job: Add a new object to the beginning of this array
// To edit: Modify the existing object
// To remove: Delete or comment out the object

const jobListings = [
    {
        id: 101,
        datePosted: "2025-07-22",
        title: "Senior Executive Assistant",
        department: "Administration",
        type: "Full-time / Permanent",
        location: "Longueuil, South Shore",
        summary: "Seeking a senior executive assistant to provide strategic and operational support to senior management.",
        description: `
            <p>Reporting to the Vice President and General Manager, the senior assistant acts as strategic and operational support for senior management. They ensure effective coordination of priorities, facilitate information flow, prepare key documents, and actively participate in cross-functional project management.</p>
            
            <h3>Main Responsibilities</h3>
            <ul>
                <li>Assist the vice-presidency and general management in planning, monitoring and coordinating activities</li>
                <li>Coordinate exchanges with team members, partners, decision-making bodies and stakeholders</li>
                <li>Participate in preparing documents for grant applications and financial reports</li>
                <li>Participate in preparing management meetings, board meetings and committees, and ensure associated logistics</li>
                <li>Manage agenda, organize internal and external meetings, prepare agendas, minutes and follow-ups</li>
                <li>Write, revise and format documents, presentations, reports, letters and official communications</li>
                <li>Support deployment and monitoring of special or strategic projects</li>
            </ul>
            
            <h3>Required Profile</h3>
            <ul>
                <li>University or college diploma in administration, management, communication or related field</li>
                <li>Minimum 5-7 years of relevant experience in a similar position, ideally in a complex or multi-project environment</li>
                <li>Excellent written and oral communication skills in French and English</li>
                <li>Strong organizational skills, rigor, discretion and ability to manage multiple priorities</li>
                <li>Proficiency in office tools (Google Suite, Microsoft 365, PowerPoint, Canva)</li>
                <li>Initiative, autonomy, diplomacy and ability to work under pressure</li>
            </ul>
            
            <h3>Working Conditions</h3>
            <ul>
                <li>Competitive salary based on experience</li>
                <li>Full-time position (37.5 hours/week)</li>
                <li>Hybrid work mode with 4-5 days/week office presence required</li>
                <li>Dynamic, stimulating and collaboration-focused environment</li>
                <li>Group insurance and RRSP + employer participation offered after probation period</li>
            </ul>
        `,
        salary: "Competitive based on experience",
        startDate: "ASAP",
        emailSubject: "Application - Senior Executive Assistant",
        applyEmail: "rh@gpcqm.ca",
        deadline: "July 28, 2025"
    },
    {
        id: 102,
        datePosted: "2025-07-22",
        title: "Event Coordinator - DOCK619",
        department: "Events",
        type: "Permanent",
        location: "Longueuil, QC",
        summary: "Support the team in organizing, logistics and executing events at our unique venue DOCK619.",
        description: `
            <p>DOCK619 is a multifunctional event space located in the industrial district of Longueuil. The interaction between its industrial architecture and warm design creates a unique ambiance. DOCK619 offers the chance to receive guests in a uniquely designed space with modern style, cutting-edge technology, and an open market cuisine.</p>
            
            <h3>Your Mission</h3>
            <p>Support the team in organizing, logistics and executing events, as well as in deploying internal and external communications, participate in promoting the event venue to a target audience and ensure smooth running of ongoing events.</p>
            
            <h3>Your Responsibilities</h3>
            <ul>
                <li>Manage DOCK619 social media and website updates</li>
                <li>Plan and coordinate logistical aspects of events (schedules, procedures and scenarios, menu choices, etc.)</li>
                <li>Establish server schedules and create mini-training sessions to improve their knowledge of the menu and service techniques</li>
                <li>Participate in hiring new servers</li>
                <li>Perform various clerical work such as maintaining the event calendar and participating in inventory counts</li>
            </ul>
            
            <h3>Your Profile</h3>
            <ul>
                <li>DEC in a relevant field</li>
                <li>Professional experience in event organization, event marketing or project management</li>
                <li>Strong interest in social media</li>
                <li>Proficiency in Office suite and experience with Photoshop</li>
                <li>Passionate about organization and events</li>
                <li>Initiative, proactivity, creativity, dynamism, versatility and team spirit</li>
                <li>Organizational skills, attention to detail and thoroughness</li>
                <li>Good priority management and ability to handle multiple files at once</li>
                <li>Perfect command of French and good knowledge of English</li>
                <li>Available to work outside regular hours during events</li>
            </ul>
            
            <h3>Our Offer</h3>
            <ul>
                <li>Workplace in Longueuil</li>
                <li>Participation in stimulating projects within a growing team</li>
                <li>Internal mobility</li>
                <li>Comprehensive competitive benefits package</li>
            </ul>
        `,
        salary: "Based on experience",
        startDate: "ASAP",
        emailSubject: "Application - Event Coordinator DOCK619",
        applyEmail: "rh@gpcqm.ca"
    },
    {
        id: 103,
        datePosted: "2025-07-22",
        title: "Dishwasher",
        department: "Kitchen",
        type: "Hourly",
        location: "Longueuil, QC",
        summary: "Join our kitchen team at DOCK619 in an essential role ensuring impeccable cleanliness and supporting exceptional service.",
        description: `
            <p>At the heart of the action, the dishwasher plays a fundamental role in the restaurant's smooth operation. Through rigorous work, they ensure impeccable cleanliness of dishes and equipment, allowing the kitchen to serve consistently flawless dishes.</p>
            
            <p>Located 20 minutes from downtown Montreal on the South Shore, DOCK619 is a place of endless possibilities. Its modern and warm decor and multiple configuration options were specifically designed to bring memorable events to life. Under the guidance of Chef Hugo St-Jacques, 2014 Chef of the Year in Canada, modern and creative cuisine rooted in terroir flavors is promoted.</p>
            
            <h3>The Profile of an Excellent Dishwasher</h3>
            <p>A dynamic person who keeps smiling even in the heat of action and loves when things are busy. They build strong relationships with colleagues, show reliability and adapt to team needs. They communicate clearly, share objectives and don't hesitate to raise their hand when there's a challenge to tackle.</p>
            
            <h3>Your Daily Responsibilities</h3>
            <ul>
                <li>Maintain kitchen and equipment cleanliness according to hygiene and sanitation standards</li>
                <li>Wash dishes after each meal and store them in appropriate places</li>
                <li>Clean equipment used after each use (pots, pans, stove, etc.)</li>
                <li>Assembly and disassembly of event hall installations</li>
                <li>All other related tasks</li>
            </ul>
            
            <h3>Desired Assets</h3>
            <ul>
                <li>Basic knowledge of French</li>
                <li>Minimum one year experience in a similar position</li>
                <li>Good physical abilities and endurance</li>
            </ul>
            
            <h3>Conditions</h3>
            <ul>
                <li>Hourly pay at $23/hour</li>
                <li>2 weeks vacation</li>
                <li>Group insurance</li>
                <li>RRSP and employer participation</li>
                <li>Schedule: Monday to Friday, weekends as needed, day and evening shifts</li>
            </ul>
        `,
        salary: "$23/hour",
        startDate: "ASAP",
        emailSubject: "Application - Dishwasher",
        applyEmail: "rh@gpcqm.ca"
    }
];

// Make data available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { jobListings };
} else {
    window.jobListings = jobListings;
}