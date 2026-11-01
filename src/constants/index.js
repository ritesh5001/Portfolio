export const contactInfo = {
  name: "Ritesh Kumar Giri",
  title: "Freelance Full-Stack Developer",
  location: "Lucknow, India",
  phone: "+91-7007436164",
  email: "rgiri5001@gmail.com",
  whatsapp:
    "https://wa.me/917007436164?text=" +
    encodeURIComponent("Hi Ritesh, I'd like a quote for a website."),
  profileImage: "/images/pfp.webp",
  // Social crawlers (LinkedIn, WhatsApp) do not reliably render WebP og:image.
  profileImageOg: "/images/pfp.jpg",
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
      { title: "React Native (Expo)" },
      { title: "Zustand" },
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
      { title: "GraphQL" },
      { title: "WebSockets" },
      { title: "BullMQ" },
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
      { title: "RAG Architecture" },
      { title: "LLM Integration" },
      { title: "Prompt Engineering" },
    ],
  },
  {
    title: "DevOps & Tools",
    description:
      "Delivery, orchestration, and collaborative engineering workflows.",
    items: [
      { title: "Git / GitHub" },
      { title: "Docker" },
      { title: "Kubernetes" },
      { title: "CI/CD (GitHub Actions)" },
      { title: "AWS" },
      { title: "Vercel" },
      { title: "Nginx" },
      { title: "Linux" },
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
      "Shipped core features of a B2B maritime marketplace: end-to-end RFQ lifecycles, vendor onboarding and RBAC for 3 user roles.",
      "Built and documented 91+ RESTful API endpoints with Next.js 14, Node.js, Express.js and PostgreSQL in an agile team.",
      "Engineered real-time communication (Socket.IO) and automated email workflows (Resend API), cutting manual quote approvals.",
    ],
  },
  {
    company: "NextGen Fusion",
    location: "Remote",
    mode: "Freelance",
    role: "Full Stack Developer",
    duration: "Jan 2025 - Present",
    highlights: [
      "Delivered 65+ live client websites and web applications (React, Next.js, Node.js, WordPress) on time, with 5-star rated delivery.",
      "Automated CI/CD with GitHub Actions, Vercel and AWS; shipped Docker and Kubernetes deployments with zero downtime.",
      "Owned end-to-end delivery: system design, API engineering, database architecture, UI/UX implementation and cloud setup.",
    ],
  },
];

export const educationData = {
  institute: "Babu Banarasi Das Northern India Institute of Technology",
  degree: "Bachelor of Technology in Computer Science & Engineering",
  location: "Lucknow, India",
  duration: "2022 - 2026",
};

export const certifications = [
  "Job Ready Cohort (Sheryians Coding School): full-stack development, DSA, system design, Docker, Kubernetes and CI/CD.",
  "Data Science - AI & DSA (ShapeMySkills): Completed a 90-hour program focused on AI algorithms, machine learning, and Python.",
];

export const achievements = [
  "1st Prize Winner, Utkarsh 2022 Photography Competition.",
  "Cleared the Indian Air Force written exam.",
];

export const leadership = [
  "Coordinator, Discipline Team at BBDNIIT.",
  "Active open-source contributor on GitHub.",
];

export const projects = [
  {
    id: 1,
    name: "MariBiz - Global Marine Services & RFQ Marketplace",
    description:
      "Architected a B2B maritime SaaS with RFQ management, multi-vendor workflows and approval pipelines, RBAC for 3 user roles, real-time Socket.IO messaging and an analytics dashboard.",
    liveUrl: "https://maribiz.ai",
    repoUrl: "https://github.com/ritesh5001",
    caseStudy: "maribiz",
    image: "/assets/projects/personal/maribiz.webp",
    imageAlt:
      "MariBiz marketplace homepage showing the quick RFQ form and vendor counts",
    bgImage: "/assets/backgrounds/blanket.webp",
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
      "Built a multi-vendor e-commerce platform with RBAC, atomic checkout, real-time inventory, Razorpay with webhook verification, and a React Native shopping app.",
    liveUrl: "https://tatvivahtrends.com",
    repoUrl: "https://github.com/ritesh5001",
    caseStudy: "tatvivahtrends",
    image: "/assets/projects/personal/tatvivah.webp",
    imageAlt: "Tat Vivah storefront showing the ethnic wedding wear catalogue",
    bgImage: "/assets/backgrounds/curtains.webp",
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
    name: "MariMail - Marine Intelligence & Email Automation SaaS",
    description:
      "Built a full-stack SaaS for marine intelligence and ETA-triggered email automation, with worker services for auth, workspaces, CSV imports and background jobs.",
    liveUrl: "https://mail.maribiz.ai",
    repoUrl: "https://github.com/ritesh5001",
    image: "/assets/projects/personal/marimail.webp",
    imageAlt:
      "MariMail homepage: know which vessels need your services before they arrive at port",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "PostgreSQL" },
      { id: 4, name: "Prisma" },
      { id: 5, name: "Redis" },
      { id: 6, name: "BullMQ" },
    ],
  },
  {
    id: 4,
    name: "NextMentor - E-Learning & Affiliate Platform",
    description:
      "Built an e-learning and affiliate platform with Razorpay checkout, HLS video behind signed tokens, a commission engine on an append-only wallet ledger, and 130+ automated checks.",
    liveUrl: "https://nextmentor.in",
    repoUrl: "https://github.com/ritesh5001",
    image: "/assets/projects/personal/nextmentor.webp",
    imageAlt: "NextMentor homepage: learn the skill, freelance with confidence",
    frameworks: [
      { id: 1, name: "Next.js 16" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Hono" },
      { id: 4, name: "Drizzle" },
      { id: 5, name: "PostgreSQL" },
      { id: 6, name: "Razorpay" },
    ],
  },
];

export const clientProjects = [
  {
    id: "tatvivahtrends",
    slug: "tatvivahtrends",
    featured: true,
    name: "TatVivah Trends",
    tagline: "Premium Ethnic Wedding Wear Marketplace",
    domain: "tatvivahtrends.com",
    liveUrl: "https://tatvivahtrends.com",
    role: "Full-Stack Developer",
    type: "Next.js / Full-Stack",
    description:
      "Built Next.js marketplace for ethnic wear with 3000+ products including sherwanis, kurtas, and Modi jackets. Implemented occasion-based filtering for wedding, haldi, and mehendi events. Integrated verified seller system, Razorpay payments, and 10-day returns. Created product showcase, gift cards, and mobile-responsive design for premium wedding fashion.",
    deliverables: [
      "Next.js Marketplace Development",
      "Multi-Vendor Platform Architecture",
      "Occasion-Based Product Filtering",
      "Razorpay Payment Gateway Integration",
      "Wedding Fashion E-Commerce",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Razorpay",
      "PostgreSQL",
      "Prisma",
    ],
    ogImage: "/assets/projects/tatvivahtrends/og.jpg",
    images: [
      "/assets/projects/tatvivahtrends/1.webp",
      "/assets/projects/tatvivahtrends/2.webp",
      "/assets/projects/tatvivahtrends/3.webp",
    ],
  },
  {
    id: "maribiz",
    slug: "maribiz",
    featured: true,
    name: "MariBiz",
    tagline: "Global Marine Procurement Marketplace Platform",
    domain: "maribiz.ai",
    liveUrl: "https://maribiz.ai",
    role: "Full-Stack Developer",
    type: "Next.js / Full-Stack",
    description:
      "Built global marine procurement marketplace connecting 3,226+ vendors with shipowners. Implemented RFQ system with vendor verification and real-time messaging. Created vendor profiles across 121 categories including maintenance, spare parts, hull cleaning, and crew transport. Integrated quote comparison and port service discovery for the maritime industry.",
    deliverables: [
      "B2B Marketplace Development",
      "RFQ & Vendor Management System",
      "Real-Time Communication Features",
      "Port & Service Discovery Platform",
      "Maritime Industry Solutions",
    ],
    tech: [
      "Next.js",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Socket.IO",
      "Prisma",
    ],
    ogImage: "/assets/projects/maribiz/og.jpg",
    images: [
      "/assets/projects/maribiz/1.webp",
      "/assets/projects/maribiz/2.webp",
      "/assets/projects/maribiz/3.webp",
    ],
  },
  {
    id: "hcbengineering",
    slug: "hcbengineering",
    featured: false,
    name: "HCB Engineering",
    tagline: "Electrical Solutions Website Development",
    domain: "hcbengineering.in",
    // Domain lapsed and no longer resolves; the case study stays, the dead
    // outbound link does not.
    liveUrl: null,
    role: "Full-Stack Developer",
    type: "WordPress",
    description:
      "Developed a comprehensive website for HCB Engineering, a government-licensed electrical contracting company with 20+ years of experience. Created a professional online presence showcasing commercial, residential, and specialty electrical services. Implemented responsive design, service portfolio pages, client testimonials, and contact forms for lead generation.",
    deliverables: [
      "Website Development",
      "Responsive Web Design",
      "WordPress Development",
      "Contact Form Integration",
      "Service Portfolio Showcase",
    ],
    tech: ["WordPress", "PHP", "HTML5", "CSS3", "JavaScript"],
    ogImage: "/assets/projects/hcbengineering/og.jpg",
    images: ["/assets/projects/hcbengineering/1.webp"],
  },
  {
    id: "samaraha",
    slug: "samaraha",
    featured: false,
    name: "Samaraha",
    tagline: "Premium Silk Saree E-Commerce Platform",
    domain: "samaraha.com",
    liveUrl: "https://samaraha.com",
    role: "Full-Stack Developer",
    type: "WooCommerce",
    description:
      "Developed a sophisticated e-commerce platform specializing in premium traditional silk sarees including Banarasi, Tussar, and Hand Printed varieties. Built a comprehensive WooCommerce shopping experience with advanced product filtering, 25+ SKU catalog, wishlist, comparison, and cart functionality. Integrated UPI and digital wallet payment gateways with SSL-secured checkout.",
    deliverables: [
      "WooCommerce E-Commerce Development",
      "Product Catalog & Inventory Management",
      "Responsive UI/UX Design",
      "Payment Gateway Integration",
      "SSL Security & Checkout Optimization",
    ],
    tech: ["WooCommerce", "WordPress", "PHP", "JavaScript", "CSS3"],
    ogImage: "/assets/projects/samaraha/og.jpg",
    images: ["/assets/projects/samaraha/1.webp"],
  },
  {
    id: "thegrafftee",
    slug: "thegrafftee",
    featured: false,
    name: "The Grafftee",
    tagline: "HR & Talent Acquisition Platform Website",
    domain: "thegrafftee.com",
    liveUrl: "https://thegrafftee.com",
    role: "Full-Stack Developer",
    type: "WordPress",
    description:
      "Developed a comprehensive HR and talent acquisition platform for Grafftee, India's leading recruitment and workforce solutions company. Built multi-feature web application showcasing talent acquisition, virtual HR support, payroll management, and employee experience tools. Implemented interactive service modules, demo booking systems, and candidate placement pages.",
    deliverables: [
      "Full-Stack Web Development",
      "Responsive Web Design",
      "HR Platform Development",
      "Form Integration & Automation",
      "Service Module Architecture",
    ],
    tech: ["WordPress", "PHP", "JavaScript", "HTML5", "CSS3"],
    ogImage: "/assets/projects/thegrafftee/og.jpg",
    images: ["/assets/projects/thegrafftee/1.webp"],
  },
  {
    id: "saurally",
    slug: "saurally",
    featured: false,
    name: "Saurally Solar",
    tagline: "Renewable Energy E-Commerce Platform",
    domain: "saurally.com",
    liveUrl: "https://saurally.com",
    role: "Full-Stack Developer",
    type: "WooCommerce",
    description:
      "Built a WooCommerce solar platform for Saurally Solar featuring 40+ products. Implemented product filtering, comparison tools, and dynamic pricing. Integrated multi-gateway payments including UPI, cards, and net banking. Built wishlist and WhatsApp support features. Created mobile-optimized design with free shipping and delivery tracking.",
    deliverables: [
      "WooCommerce Development",
      "Solar Product Catalog Design",
      "Multi-Gateway Payment Integration",
      "Advanced Product Filtering",
      "Customer Support Integration",
    ],
    tech: ["WooCommerce", "WordPress", "PHP", "JavaScript", "CSS3"],
    ogImage: "/assets/projects/saurally/og.jpg",
    images: ["/assets/projects/saurally/1.webp"],
  },
  {
    id: "terrestrialyt",
    slug: "terrestrialyt",
    featured: false,
    name: "TerrestrialYT",
    tagline: "Gaming & Anime E-Commerce Store",
    domain: "terrestrialyt.com",
    liveUrl: "https://terrestrialyt.com",
    role: "Full-Stack Developer",
    type: "WooCommerce",
    description:
      "Built WooCommerce store for TerrestrialYT featuring gaming and anime merchandise including mousepads, posters, tapestries, tote bags, and coasters. Implemented product variations, dynamic pricing, and wishlist functionality. Integrated social media links for Instagram, YouTube, Twitch, and Discord. Created responsive mobile design with secure checkout and global shipping support.",
    deliverables: [
      "WooCommerce E-Commerce Development",
      "Product Variations & Variants Management",
      "Social Media Integration",
      "Community Forum Integration",
      "Merchandise Store Design",
    ],
    tech: ["WooCommerce", "WordPress", "PHP", "JavaScript", "CSS3"],
    ogImage: "/assets/projects/terrestrialyt/og.jpg",
    images: ["/assets/projects/terrestrialyt/1.webp"],
  },
  {
    id: "newsaraswatisareecentre",
    slug: "newsaraswatisareecentre",
    featured: false,
    name: "New Saraswati Saree Centre",
    tagline: "Handwoven Textiles E-Commerce Store",
    domain: "newsaraswatisareecentre.in",
    liveUrl: "https://newsaraswatisareecentre.in",
    role: "Full-Stack Developer",
    type: "WooCommerce",
    description:
      "Built WooCommerce saree marketplace featuring 40+ handwoven products including cotton, muslin, and paithani varieties. Implemented product filtering, dynamic pricing, and secure checkout. Integrated multi-gateway payments, wishlist, and product comparison tools. Created festive collection pages, customer testimonials, and mobile-optimized design with free shipping.",
    deliverables: [
      "WooCommerce Development",
      "Traditional Textile E-Commerce",
      "Multi-Gateway Payment Integration",
      "Festive Collection Management",
      "Mobile-Responsive Design",
    ],
    tech: ["WooCommerce", "WordPress", "PHP", "JavaScript", "CSS3"],
    ogImage: "/assets/projects/newsaraswatisareecentre/og.jpg",
    images: ["/assets/projects/newsaraswatisareecentre/1.webp"],
  },
  {
    id: "sitaravastram",
    slug: "sitaravastram",
    featured: false,
    name: "Sitara Vastram",
    tagline: "Premium Limited-Piece Ethnic Wear Store",
    domain: "sitaravastram.com",
    liveUrl: "https://sitaravastram.com",
    role: "Full-Stack Developer",
    type: "WooCommerce",
    description:
      "Built WooCommerce ethnic wear store featuring limited collections across festive, everyday, and exclusive categories. Implemented product variants, dynamic pricing, and a style video section with 6+ reels. Integrated testimonials, WhatsApp support, and wishlist functionality. Designed mobile-responsive interface with free shipping, COD, and secure checkout.",
    deliverables: [
      "WooCommerce E-Commerce Development",
      "Limited-Edition Collection Management",
      "Style Video Integration",
      "WhatsApp Business Integration",
      "Premium Fashion Store Design",
    ],
    tech: ["WooCommerce", "WordPress", "PHP", "JavaScript", "CSS3"],
    ogImage: "/assets/projects/sitaravastram/og.jpg",
    images: ["/assets/projects/sitaravastram/1.webp"],
  },
  {
    id: "clickngreet",
    slug: "clickngreet",
    featured: false,
    name: "ClickNGreet",
    tagline: "Personalized Gift Shop & Marketplace",
    domain: "clickngreet.in",
    liveUrl: "https://clickngreet.in",
    role: "Full-Stack Developer",
    type: "WooCommerce",
    description:
      "Built WooCommerce gift store with 20+ categories including frames, mugs, T-shirts, and resin art. Implemented product variants, pricing, filtering, and occasion-based shopping. Integrated testimonials, WhatsApp support, and bulk order management. Designed mobile-first interface with fast delivery, seamless checkout, and pan-India shipping.",
    deliverables: [
      "WooCommerce E-Commerce Development",
      "Multi-Category Gift Marketplace",
      "Occasion-Based Product Filtering",
      "Bulk Order Management System",
      "Personalized Product Showcase",
    ],
    tech: ["WooCommerce", "WordPress", "PHP", "JavaScript", "CSS3"],
    ogImage: "/assets/projects/clickngreet/og.jpg",
    images: ["/assets/projects/clickngreet/1.webp"],
  },
  {
    id: "krushidoctor",
    slug: "krushidoctor",
    featured: false,
    name: "Krushi Doctor",
    tagline: "Agri Guidance & Farming Platform",
    domain: "krushidoctor.com",
    liveUrl: "https://krushidoctor.com",
    role: "Full-Stack Developer",
    type: "WooCommerce",
    description:
      "Built WooCommerce agricultural platform with 100+ products including crop schedules and sticky traps. Implemented crop PDF guides with WhatsApp support. Created categories for insecticides, fertilizers, and equipment. Integrated farmer testimonials and blog. Designed mobile interface with 24/7 support, free shipping, and easy returns serving 1.2 lakh+ farmers.",
    deliverables: [
      "WooCommerce Agricultural Platform Development",
      "Crop Schedule & Digital Guidance System",
      "Multi-Category Agricultural Products Management",
      "WhatsApp Integration & Support System",
      "Farmer Community & Testimonial Platform",
    ],
    tech: ["WooCommerce", "WordPress", "PHP", "JavaScript", "CSS3"],
    ogImage: "/assets/projects/krushidoctor/og.jpg",
    images: ["/assets/projects/krushidoctor/1.webp"],
  },
  {
    id: "kalamohini",
    slug: "kalamohini",
    featured: false,
    name: "Kalamohini",
    tagline: "Traditional Art & Ethnic Fashion Store",
    domain: "kalamohini.in",
    liveUrl: "https://kalamohini.in",
    role: "Full-Stack Developer",
    type: "WooCommerce",
    description:
      "Built a WooCommerce-powered e-commerce platform for Kalamohini, a traditional Indian art and ethnic fashion brand. Implemented product catalog management with dynamic pricing, advanced filtering, and mobile-responsive design. Integrated multiple payment gateways, wishlist functionality, and seamless checkout for a premium shopping experience.",
    deliverables: [
      "WooCommerce E-Commerce Development",
      "Product Catalog Management",
      "Mobile-Responsive Design",
      "Payment Gateway Integration",
      "Brand Identity & UI Design",
    ],
    tech: ["WooCommerce", "WordPress", "PHP", "JavaScript", "CSS3"],
    ogImage: "/assets/projects/kalamohini/og.jpg",
    images: ["/assets/projects/kalamohini/1.webp"],
  },
  {
    id: "mahhika",
    slug: "mahhika",
    featured: false,
    name: "Mahhika",
    tagline: "Premium Fashion & Lifestyle Store",
    domain: "mahhika.com",
    liveUrl: "https://mahhika.com",
    role: "Full-Stack Developer",
    type: "WooCommerce",
    description:
      "Developed a sophisticated WooCommerce fashion store for Mahhika, a premium lifestyle and fashion brand. Created an elegant product showcase with advanced filtering, wishlist functionality, product variation management, and seamless multi-gateway payment processing for a premium online shopping experience.",
    deliverables: [
      "WooCommerce E-Commerce Development",
      "Premium Fashion Store Design",
      "Product Variants Management",
      "Wishlist & Comparison Features",
      "Responsive Mobile Design",
    ],
    tech: ["WooCommerce", "WordPress", "PHP", "JavaScript", "CSS3"],
    ogImage: "/assets/projects/mahhika/og.jpg",
    images: ["/assets/projects/mahhika/1.webp"],
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

// Real client quotes only: { quote, name, business, project? (case-study slug) }.
// The homepage testimonial section stays hidden while this is empty.
export const testimonials = [];
