// ============================================================
//  data.js — YOUR PERSONAL CONTENT
//  Edit this file to update your site content.
// ============================================================

const DATA = {
  name: "Viet H Tran",
  role: "Software Development Engineer & Engineering Specialist",
  // Typing animation — cycles through these roles in the Hero
  roles: [
    "Software Development Engineer",
    "Engineering Specialist",
    "Full Stack Developer",
    "Systems Integration Engineer",
  ],
  domains: ["Full Stack", "Systems & Integration", "Cloud & DevOps"],
  bio: "Full stack developer and systems engineer with 9+ years across aerospace (Blue Origin, Boeing, Honeywell) and medical devices (Siemens). Experienced shipping end-to-end web applications with React, Node.js, and Python on AWS/Azure/GCP. Brings mission-critical engineering rigor — integration, verification, and zero-defect delivery — to scalable software development.",
  location: "Renton, Washington",
  email: "vtranseattle@gmail.com",
  github: "https://github.com/vtrangithub",
  linkedin: "https://www.linkedin.com/in/viet-tran-95baab172/",

  // ── PROFILE PHOTO ──────────────────────────────────────────
  // Steps to add your photo:
  // 1. Copy your photo into the /public folder e.g. public/profile.jpg
  // 2. Change null below to "/profile.jpg"
  photo: "/profile.JPG", // e.g. "/profile.jpg"

  // ── GOOGLE ANALYTICS ──────────────────────────────────────
  // 1. Go to analytics.google.com and create a free account
  // 2. Create a property for your website
  // 3. Copy the Measurement ID (looks like "G-XXXXXXXXXX")
  // 4. Replace the value below with your real ID
  analyticsId: "G-8EHJL4L4JR",

  skills: [
    { category: "Languages", icon: "⌨", items: ["Python", "JavaScript", "TypeScript", "Java", "SQL", "C", "HTML/CSS"] },
    { category: "Frameworks & UI", icon: "⚛", items: ["React", "Redux", "Node.js", "Express", "Material-UI", "Bootstrap"] },
    { category: "Cloud & DevOps", icon: "☁", items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Git"] },
    { category: "Data & Tools", icon: "🛠", items: ["MongoDB", "REST APIs", "JWT", "Jest", "SAP", "LabVIEW", "SharePoint"] },
  ],

  projects: [
    {
      title: "Fitness Tracker App",
      url: "https://github.com/vtrangithub/fitness-tracker",
      tag: "Full Stack",
      stack: ["React", "Material-UI", "Express", "MongoDB", "JWT"],
      desc: "Full-stack app with JWT auth, CRUD operations, MongoDB aggregation pipelines, React + Material-UI front-end, and Express REST API — deployed end-to-end.",
    },
    {
      title: "SoccerStat Elite",
      url: "https://github.com/vtrangithub/SoccerStatElite-App",
      tag: "React · API Integration",
      stack: ["React", "Jest", "API-Football", "React Testing Library"],
      desc: "Real-time stats app integrating API-Football with React, dynamic routing, secure API key management, and full Jest + React Testing Library test coverage.",
    },
  ],

  career: [
    {
      year: "Sep 2021 — Present",
      role: "Ultrasound Acoustic Power Lab Lead & Engineering Specialist",
      company: "Siemens Medical Solutions · Issaquah, WA",
      bullets: [
        "Spearheaded end-to-end acoustic power lab operations — equipment calibration, measurement accuracy, compliance, and safety — in a regulated medical device environment with zero defect tolerance.",
        "Developed troubleshooting protocols resolving measurement inconsistencies; streamlined inventory and procurement workflows, improving lab throughput and uptime.",
        "Implemented ultrasound imaging software and managed system integration across hardware and software layers, demonstrating full-stack engineering ownership.",
      ],
    },
    {
      year: "Dec 2019 — Sep 2021",
      role: "R&D Integration Engineer",
      company: "Blue Origin LLC · Kent, WA",
      bullets: [
        "Directed integration, testing, and functional verification of mission-critical propulsion systems — systems-level reliability directly analogous to satellite network infrastructure.",
        "Built a new in-house test stand from requirements through verification, achieving significant cost savings and owning the full engineering lifecycle end-to-end.",
        "Managed high-risk operations involving hazardous materials and high-pressure systems; introduced process improvements that boosted operational efficiency.",
      ],
    },
    {
      year: "Apr 2018 — Dec 2019",
      role: "Aircraft Test Technician",
      company: "The Boeing Company · Renton, WA",
      bullets: [
        "Led testing and troubleshooting of complex mechanical and electrical aircraft systems, ensuring rigorous pre-flight validation using engineering blueprints and diagnostic test documents.",
        "Devised strategic work sequencing and cross-team troubleshooting approaches in a fast-paced, high-stakes manufacturing environment.",
      ],
    },
    {
      year: "Sep 2015 — Apr 2018",
      role: "FAA Avionics Specialist",
      company: "Honeywell · Renton, WA",
      bullets: [
        "FAA-certified avionics technician specializing in Radar Transceiver troubleshooting using oscilloscopes, spectrum analyzers, and signal generators — precision diagnostic skills transferable to software systems debugging.",
      ],
    },
  ],

  education: [
    { degree: "Full Stack Web Development Certificate", school: "University of Washington", year: "2024" },
    { degree: "Bachelor of Science in Engineering",     school: "University of Washington", year: "2015" },
    { degree: "Full Stack Web Dev Bootcamp (JS + Python/SQL/DevOps)", school: "Nucamp Bootcamp", year: "2022" },
    { degree: "Associate of Science in Engineering",    school: "Bellevue College",          year: "2011" },
  ],

  hobbies: [
    { tag: "Outdoor Adventure", icon: "🏔", title: "Hiking the Pacific Northwest", body: "The PNW has some of the most stunning trails in the country. From Mount Rainier to Olympic National Park — every hike is a reset button for the mind." },
    { tag: "Fishing", icon: "🎣", title: "Chasing Salmon in Washington Waters", body: "Early mornings on the water, reading currents and waiting for the right moment. The patience fishing demands translates surprisingly well to debugging and systems thinking." },
    { tag: "Fitness", icon: "🏋", title: "Gym, Discipline & the Long Game", body: "Consistent training keeps me sharp and energized. The same principles that build strength in the gym — progressive overload, tracking, patience — apply directly to mastering new technologies." },
  ],

  // ── BLOG POSTS ── Add, edit, or remove posts here ─────────────────────────
  blog: [
    {
      id: 1,
      category: "Tech & Coding",
      icon: "⚛",
      title: "Building My First Full-Stack App with React & Node.js",
      date: "Apr 2026",
      readTime: "5 min read",
      excerpt: "What I learned shipping a JWT-authenticated fitness tracker from zero to deployed — the wins, the bugs, and what I'd do differently.",
      content: `After completing the UW Full Stack bootcamp, I wanted to build something real. The Fitness Tracker app was my first serious end-to-end project — React frontend, Express backend, MongoDB database, and JWT auth.\n\nThe biggest lesson: authentication is harder than it looks. Getting JWT refresh tokens right took me two full days. But once it clicked, the whole system made sense.\n\nIf you're starting out, my advice: build something you'd actually use. The motivation to fix bugs is completely different when it's your own tool.`,
    },
    {
      id: 2,
      category: "Aerospace Engineering",
      icon: "🚀",
      title: "What Working at Blue Origin Taught Me About Systems Thinking",
      date: "Mar 2026",
      readTime: "6 min read",
      excerpt: "Propulsion system integration at Blue Origin gave me a framework for thinking about complex systems that applies directly to software architecture.",
      content: `At Blue Origin, I worked on integrating and verifying propulsion systems. Every component had dependencies, failure modes, and edge cases that had to be accounted for before anything went to test.\n\nThat same thinking now shapes how I write software. Before I write a single line of code, I ask: what are the dependencies? What are the failure modes? What does the test plan look like?\n\nSystems engineering and software engineering are more alike than most people realize. The rigor transfers directly.`,
    },
    {
      id: 3,
      category: "Tech & Coding",
      icon: "☁",
      title: "Why Every Engineer Should Learn the Basics of Cloud",
      date: "Feb 2026",
      readTime: "4 min read",
      excerpt: "You don't need to be a DevOps engineer to benefit from understanding AWS, Azure, and GCP. Here's where I'd start.",
      content: `I came to cloud through necessity — deploying my own projects. But what surprised me was how much cloud knowledge changed the way I think about system design at work.\n\nStart with S3 (storage), EC2 (compute), and IAM (permissions). Those three services alone will give you 80% of the mental model you need.\n\nOnce you understand those, Lambda, RDS, and API Gateway will start to make sense naturally. Don't try to learn everything at once — just build something and deploy it.`,
    },
    {
      id: 4,
      category: "Aerospace Engineering",
      icon: "✈",
      title: "From Aircraft Testing at Boeing to Writing Code",
      date: "Jan 2026",
      readTime: "5 min read",
      excerpt: "How testing aircraft systems at Boeing gave me a debugging mindset that makes me a better software developer today.",
      content: `At Boeing, I tested mechanical and electrical aircraft systems. The job was methodical — follow the test plan, document everything, escalate anomalies immediately.\n\nThat discipline is rare in software. Most developers debug by gut feeling. I debug by forming a hypothesis, isolating variables, and testing systematically — exactly like aircraft systems validation.\n\nIf you want to get better at debugging, study how engineers in safety-critical industries approach problem-solving. The methodology is transferable.`,
    },
  ],
};

export default DATA;
