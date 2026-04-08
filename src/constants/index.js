export const contactInfo = {
  name: "Ritesh Kumar Giri",
  title: "Software Engineer",
  location: "Lucknow, India",
  phone: "+91-7007436164",
  email: "rgiri5001@gmail.com",
  profileImage: "/images/pfp.png",
};

export const servicesData = [
  {
    title: "Languages",
    description: "Core programming languages I use in production.",
    items: [
      { title: "C++" },
      { title: "TypeScript" },
      { title: "JavaScript" },
      { title: "Python" },
      { title: "SQL" },
    ],
  },
  {
    title: "Frontend",
    description: "Modern interfaces focused on speed, UX, and maintainability.",
    items: [
      { title: "React.js" },
      { title: "Redux Toolkit" },
      { title: "Next.js" },
      { title: "HTML5 / CSS3" },
      { title: "Tailwind CSS" },
      { title: "Framer Motion" },
    ],
  },
  {
    title: "Backend",
    description: "Scalable APIs and real-time systems for business products.",
    items: [
      { title: "Node.js" },
      { title: "Express.js" },
      { title: "Prisma" },
      { title: "REST APIs" },
      { title: "Socket.IO" },
      { title: "Microservices" },
    ],
  },
  {
    title: "Databases",
    description: "Relational, document, vector, and in-memory storage stacks.",
    items: [
      { title: "PostgreSQL" },
      { title: "MongoDB" },
      { title: "Pinecone" },
      { title: "Redis" },
    ],
  },
  {
    title: "AI / ML",
    description: "Applied AI integrations for real-world product features.",
    items: [
      { title: "LangChain" },
      { title: "Google Gemini API" },
      { title: "Groq SDK" },
    ],
  },
  {
    title: "DevOps & Tools",
    description: "Delivery, orchestration, and collaborative engineering workflows.",
    items: [
      { title: "Git / GitHub" },
      { title: "Docker" },
      { title: "Kubernetes" },
      { title: "CI/CD (GitHub Actions)" },
      { title: "Postman" },
      { title: "VS Code" },
    ],
  },
];

export const experienceData = [
  {
    company: "CleanShip (MariBiz.ai)",
    location: "Lucknow, India",
    mode: "Hybrid",
    role: "Software Engineer",
    duration: "Mar 2026 - Present",
    highlights: [
      "Developing and maintaining a full-stack B2B maritime marketplace for complete RFQ lifecycles and vendor management.",
      "Collaborating in a hybrid team to build scalable enterprise solutions with Next.js, Node.js, Express, and PostgreSQL.",
    ],
  },
  {
    company: "NextGen Fusion",
    location: "Remote",
    mode: "Freelance",
    role: "Web Developer",
    duration: "Jan 2025 - Present",
    highlights: [
      "Develop and maintain 50+ live WordPress websites and 10+ MERN stack applications with scalable backend architecture.",
      "Orchestrate CI/CD pipelines across Vercel, Netlify, Render, AWS, and Hostinger for automated delivery.",
      "Deploy containerized production workloads using Docker and Kubernetes for consistency and reliability.",
      "Deliver end-to-end solutions including UI/UX, secure backend APIs, and complete hosting setup.",
    ],
  },
];

export const educationData = {
  institute: "Babu Banarasi Das Northern India Institute of Technology",
  degree: "Bachelor of Technology in Computer Science & Engineering",
  location: "Lucknow, India",
  duration: "2022 - Present",
};

export const certifications = [
  "Job Ready Cohort (Sheryians Coding School): Intensive full-stack training covering DSA, system design, and DevOps (Docker, CI/CD).",
  "Data Science - AI & DSA (ShapeMySkills): Completed a 90-hour program focused on AI algorithms, machine learning, and Python.",
];

export const achievements = [
  "1st Prize Winner, Utkarsh 2022 Photography Competition.",
  "Cleared Indian Air Force Exam.",
];

export const leadership = [
  "Coordinator, Discipline Team at BBDNIIT.",
];

export const projects = [
  {
    id: 1,
    name: "MariBiz - Global Marine Services & RFQ Marketplace",
    description:
      "Built a full-stack maritime marketplace with RFQ posting, quote submission, role-based approvals, Socket.IO chat, analytics, and automated transactional emails.",
    liveUrl: "https://maribiz.ai",
    repoUrl: "https://github.com/ritesh5001",
    image: "/assets/projects/mobile-accessories-store.jpg",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "Express" },
      { id: 4, name: "Prisma" },
      { id: 5, name: "PostgreSQL" },
      { id: 6, name: "Socket.IO" },
    ],
  },
  {
    id: 2,
    name: "Tat Vivah - Multi-Vendor Wedding E-Commerce",
    description:
      "Engineered a scalable multi-vendor commerce platform with JWT RBAC, real-time inventory, atomic checkout, Redis caching, and layered monolith architecture.",
    liveUrl: "https://tatvivahtrends.com",
    repoUrl: "https://github.com/ritesh5001",
    image: "/assets/projects/plant-shop.jpg",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "TypeScript" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "Prisma" },
      { id: 4, name: "PostgreSQL" },
      { id: 5, name: "Redis" },
    ],
  },
  {
    id: 3,
    name: "Explore Fusion - AI-Powered Travel Microservices App",
    description:
      "Architected a microservices-based travel ecosystem with API gateway, Groq AI trip planning, travel buddy matching, social feed, and real-time Socket.IO messaging.",
    liveUrl: "https://explorefusion.online",
    repoUrl: "https://github.com/ritesh5001",
    image: "/assets/projects/apple-tech-store.jpg",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "Socket.IO" },
      { id: 4, name: "Microservices" },
      { id: 5, name: "Groq SDK" },
      { id: 6, name: "JWT" },
    ],
  },
  {
    id: 4,
    name: "JARVIS AI - Full-Stack AI Chat Platform",
    description:
      "Developed an AI chat platform with secure JWT auth, long-term conversational memory via Pinecone, and context-aware responses using Google Gemini API.",
    liveUrl: "https://jarvisai.riteshgiri.dev",
    repoUrl: "https://github.com/ritesh5001",
    image: "/assets/projects/electronics-store.jpg",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "Express" },
      { id: 4, name: "Pinecone" },
      { id: 5, name: "Gemini API" },
    ],
  },
];

export const socials = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/ritesh5001",
  },
  {
    name: "GitHub",
    href: "https://github.com/ritesh5001",
  },
  {
    name: "Email",
    href: "mailto:rgiri5001@gmail.com",
  },
];
