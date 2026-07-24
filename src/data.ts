import { Project, Experience, Certification, SkillCategory } from './types';

export const ME_INFO = {
  name: "Megha Gusain",
  role: "Full-Stack Developer & AI Automation Engineer",
  email: "meghagusain03@gmail.com",
  phone: "+91 98884 27804",
  location: "Chandigarh, India",
  linkedin: "https://linkedin.com/in/megha-gusain-27438437a",
  github: "https://github.com/megzz001",
  leetcode: "https://leetcode.com/u/Megz_001",
  objective: "Computer Science Engineering student with strong foundations in Java, Python, Data Structures, Algorithms, and Full Stack Development. Experienced in building scalable web applications, RESTful APIs, and AI-powered automation systems. Passionate about solving complex engineering problems, designing efficient software systems, and leveraging cloud technologies and data-driven insights in financial and enterprise environments.",
  additionalInfo: [
    "Strong interest in financial technology, data-driven systems, and cloud-native applications.",
    "Experienced in Agile development practices and collaborative software engineering.",
    "Comfortable working across frontend, backend, databases, APIs, and automation workflows.",
    "Active problem solver with hands-on experience building end-to-end software solutions."
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "interview-prep",
    title: "Gen AI Interview Preparation System",
    tech: ["Node.js", "Express.js", "MongoDB", "Gemini API", "JWT", "REST APIs"],
    description: "An AI-driven platform designed to analyze resumes and job descriptions, identify skill gaps, and generate customized preparation plans.",
    highlights: [
      "Developed an AI-driven platform to analyze resumes and job descriptions and identify skill gaps.",
      "Generated personalized interview preparation plans and technical question sets.",
      "Designed secure REST APIs using JWT authentication and scalable backend architecture.",
      "Applied prompt engineering techniques and automation workflows to improve user outcomes."
    ],
    details: [
      "The system acts as a personalized coach. When a user uploads their resume and pastes a job description, the platform dissects the requirements using advanced LLM prompts.",
      "Identifies exact technical and behavioral gaps, mapping out a visual learning path.",
      "Utilizes a robust Express and MongoDB backend for secure student authentication and progress tracking.",
      "Includes interactive mock interview sessions with real-time feedback and structured scoring metrics."
    ],
    role: "Full-Stack Developer / Prompt Engineer",
    period: "2026",
    githubUrl: "https://github.com/megzz001/Full-Stack-AI-Resume-Analyzer-and-Interview-Question-Generator-using-GenAI"
  },
  {
    id: "real-estate",
    title: "Real Estate Marketplace",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "MERN Stack"],
    description: "A comprehensive full-stack property marketplace featuring real-time authentication, rich listings management, and advanced search filters.",
    highlights: [
      "Built a full-stack property marketplace with authentication, listings, advanced search, and filtering.",
      "Designed MongoDB schemas and REST APIs for secure property management.",
      "Implemented responsive user interfaces and optimized backend performance.",
      "Deployed scalable production-ready application using modern web technologies."
    ],
    details: [
      "Created a seamless search and filtering engine allowing users to filter properties by location, price, size, and layout.",
      "Features secure user authentication and property ownership verification dashboards.",
      "Optimized database queries with MongoDB indexing, reducing list loading times by 40%.",
      "Features a mobile-first responsive layout with custom image carousels and maps integrations."
    ],
    role: "Lead MERN Developer",
    period: "Aug 2025 - Present",
    githubUrl: "https://github.com/megzz001/cloudware-Hierarchical-File-Management-System"
  },
  {
    id: "ai-blog",
    title: "Full Stack AI Blog Platform",
    tech: ["Next.js", "MongoDB", "n8n Workflows", "LangChain", "Node.js", "AI Automation"],
    description: "An automated content creation and management workspace leveraging multi-agent workflows and automated publication cycles.",
    highlights: [
      "Automated content creation workflows using Next.js, LangChain, MongoDB, and n8n.",
      "Reduced manual blogging and editing effort by approximately 80% through AI-powered automation.",
      "Implemented role-based access control and improved database efficiency.",
      "Built end-to-end workflows integrating AI services and backend systems."
    ],
    details: [
      "Designed advanced autonomous workflows in n8n that fetch daily topics, outline drafts, verify facts, and generate SEO-optimized content.",
      "Utilized Next.js for high-performance static rendering of blog articles coupled with server-side incremental regeneration.",
      "Includes a gorgeous admin control panel to tweak AI agents' parameters, view agent execution histories, and approve or reject posts.",
      "Secured API endpoints with role-based access controls for contributors, editors, and administrators."
    ],
    role: "Backend & Automation Engineer",
    period: "May 2025 - Jul 2025",
    githubUrl: "https://github.com/megzz001"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: "edu-cu",
    role: "B.E. in Computer Science and Engineering",
    company: "Chandigarh University",
    location: "Chandigarh, India",
    period: "Aug 2022 - May 2026",
    description: "Pursuing Bachelor of Engineering with a special focus on software development, cloud technologies, data structures, and intelligent automation systems.",
    highlights: [
      "Maintained a strong academic record with CGPA: 7.59",
      "Relevant Coursework: Data Structures & Algorithms, DBMS, OOP, Operating Systems, Computer Networks, Software Engineering, Cloud Computing",
      "Actively built real-world full-stack and AI-driven systems, proving leadership and execution capabilities."
    ]
  },
  {
    id: "edu-ggmsss",
    role: "Intermediate (CBSE) - Science & Computer Science",
    company: "GGMSSS 18-C",
    location: "Chandigarh, India",
    period: "Apr 2020 - Mar 2022",
    description: "Completed secondary education specializing in Physics, Chemistry, Mathematics, and Computer Science.",
    highlights: [
      "Graduated with distinction scoring 87%",
      "Developed a solid foundation in programming basics, object-oriented concepts, and algebraic mathematics."
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-ibm",
    title: "Java Full Stack Developer Professional Certificate",
    issuer: "IBM (via Coursera)",
    date: "2025"
  },
  {
    id: "cert-nptel",
    title: "Cloud Computing",
    issuer: "NPTEL (IIT Kanpur)",
    date: "2024"
  },
  {
    id: "cert-metacrafter",
    title: "Blockchain Technology (Ethereum & Polygon)",
    issuer: "Metacrafter",
    date: "2025"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    items: [
      { name: "Java", level: 90 },
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "Python", level: 85 },
      { name: "SQL", level: 88 },
      { name: "HTML", level: 92 },
      { name: "CSS", level: 88 }
    ]
  },
  {
    category: "Technologies & Frameworks",
    items: [
      { name: "Bootstrap", level: 85 },
      { name: "React.js", level: 92 },
      { name: "Next.js", level: 88 },
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 90 },
      { name: "REST APIs", level: 95 }
    ]
  },
  {
    category: "AI & Automation",
    items: [
      { name: "LLMs & Prompts", level: 90 },
      { name: "n8n Workflows", level: 88 },
      { name: "LangChain", level: 85 },
      { name: "Agentic Workflows", level: 85 }
    ]
  },
  {
    category: "Databases & Tools",
    items: [
      { name: "MySQL", level: 86 },
      { name: "MongoDB", level: 92 },
      { name: "Redis", level: 80 },
      { name: "PostgreSQL", level: 85 },
      { name: "GitHub / Git", level: 90 },
      { name: "Postman", level: 92 }
    ]
  },
  {
    category: "Deployment & Hosting",
    items: [
      { name: "Vercel", level: 88 },
      { name: "Render", level: 85 }
    ]
  },
  {
    category: "Core CS Fundamentals",
    items: [
      { name: "Data Structures & Algorithms", level: 90 },
      { name: "OOP", level: 92 },
      { name: "DBMS", level: 88 },
      { name: "Operating Systems", level: 82 },
      { name: "Computer Networks", level: 84 }
    ]
  }
];

export const SOFT_SKILLS: string[] = [
  "Problem-Solving",
  "Project Management",
  "Leadership",
  "Teamwork"
];
