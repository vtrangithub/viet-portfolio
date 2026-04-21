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
  photo: null, // e.g. "/profile.jpg"

  // ── GOOGLE ANALYTICS ──────────────────────────────────────
  // 1. Go to analytics.google.com and create a free account
  // 2. Create a property for your website
  // 3. Copy the Measurement ID (looks like "G-XXXXXXXXXX")
  // 4. Replace the value below with your real ID
  analyticsId: "G-XXXXXXXXXX",

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

  // ── ORIGINAL MUSIC ── My own audio track ──────────────────
  // Steps to add your audio file:
  // 1. Copy your MP3 into the /public folder e.g. public/my-track.mp3
  // 2. Update the "src" below to match the filename, e.g. "/my-track.mp3"
  // 3. Update the title, artist, and description as you like
  music: {
    title: "Making My Way-Track",
    artist: "Viet H Tran",
    description: "An original piece I produced myself. Press play.",
    src: "/Making-My-Way-Remix.mp3", // <— change this to match your file in /public
  },

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
      id: 5,
      category: "Medical Devices",
      icon: "🏥",
      title: "Inside Siemens Ultrasound: What It Takes to Measure Acoustic Power",
      date: "Apr 2026",
      readTime: "6 min read",
      excerpt: "As Acoustic Power Lab Lead at Siemens, I work at the intersection of precision measurement, regulatory compliance, and medical imaging. Here's what that actually looks like day to day.",
      content: `Most people don't think about what goes into an ultrasound machine beyond the gel and the probe. But inside every Siemens ultrasound system is a complex chain of hardware, software, and calibration processes that has to meet some of the strictest safety standards in any industry.\n\nAt Siemens Medical Solutions in Issaquah, I lead the Acoustic Power lab — the team responsible for measuring and validating the acoustic output of ultrasound transducers before they can be cleared for clinical use.\n\nWhat is acoustic power measurement?\nUltrasound imaging works by emitting high-frequency sound waves into the body and listening for the echoes. But those waves carry energy — and too much energy can cause tissue heating or cavitation. The FDA and IEC 60601 standards set strict limits on acoustic output, and every transducer must be tested and documented before it ships.\n\nOur lab measures parameters like Total Acoustic Power (TAP), Spatial Peak Temporal Average Intensity (ISPTA), and Mechanical Index (MI) — all of which determine how safe a given transducer is for diagnostic use.\n\nThe calibration challenge\nThe hardest part isn't the measurement itself — it's maintaining calibration accuracy across dozens of transducer models. A hydrophone that's off by even a fraction of a dB can cascade into a compliance failure that delays a product launch by weeks. I developed troubleshooting protocols that cut our measurement inconsistency rate significantly and introduced a streamlined inventory system that improved lab uptime.\n\nWhere software meets hardware\nOne of the most interesting parts of this role is managing software integration — installing and validating imaging software updates on ultrasound machines and ensuring acoustic output profiles remain within spec after each update. This is where my software development background becomes directly useful. Working in a regulated medical device environment, where documentation is as important as the measurement itself, has made me a more rigorous engineer in every domain I work in.`,
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
