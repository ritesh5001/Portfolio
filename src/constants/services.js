// Service pages exist to give each commercial intent its own URL. Copy is
// written from work actually delivered — every figure here traces back to a
// project in constants/index.js or constants/directory.js.
export const servicePages = [
  {
    slug: "wordpress-woocommerce-development",
    name: "WordPress & WooCommerce Development",
    shortName: "WordPress & WooCommerce",
    areaServed: "Lucknow",
    title:
      "WordPress & WooCommerce Developer in Lucknow — Ritesh Kumar Giri",
    description:
      "Freelance WordPress and WooCommerce developer in Lucknow. Product catalogues, payment gateways, filtering and checkout work across 50+ live stores in India.",
    intro:
      "Most of the stores I have shipped run on WooCommerce. It is the right answer when a business wants to own its catalogue, its customer data and its checkout without paying a platform fee on every order — and when the product model is ordinary enough that a platform will not fight you.",
    sections: [
      {
        heading: "What the work usually involves",
        body: "Catalogue structure and product variants, occasion or category filtering that matches how customers actually shop, payment gateway integration for UPI, cards and net banking, shipping and COD rules, wishlist and comparison, and the performance work that decides whether the store is usable on a mid-range Android phone over patchy mobile data.",
      },
      {
        heading: "Where it tends to go wrong",
        body: "Stores get built as a theme demo with products dropped in. The catalogue grows, filtering was never designed for it, the product page loads a dozen scripts, and conversion quietly falls. I build the catalogue model first and the visual layer second.",
      },
      {
        heading: "Maintenance",
        body: "I stay available after handover for plugin updates, payment gateway changes, seasonal collection work and the occasional emergency. You get access to everything — hosting, admin, repository — from day one.",
      },
    ],
    stack: ["WordPress", "WooCommerce", "PHP", "MySQL", "JavaScript", "CSS3"],
    relatedProjects: [
      "samaraha",
      "saurally",
      "newsaraswatisareecentre",
      "krushidoctor",
      "clickngreet",
      "sitaravastram",
    ],
  },
  {
    slug: "shopify-development",
    name: "Shopify Development",
    shortName: "Shopify",
    areaServed: "Lucknow",
    title: "Shopify Developer in Lucknow — Ritesh Kumar Giri",
    description:
      "Freelance Shopify developer in Lucknow building and customising storefronts for D2C brands across India. Theme development, catalogue setup and checkout configuration.",
    intro:
      "Shopify is the right call when a brand would rather pay a platform fee than run its own infrastructure — no server to patch, no plugin conflicts, PCI compliance handled. The engineering work moves to the storefront: theme, catalogue structure and the parts of the buying flow you can control.",
    sections: [
      {
        heading: "What the work usually involves",
        body: "Theme development and customisation, collection and variant structure, app selection and integration, checkout and shipping configuration, and migration of an existing catalogue when a brand is moving across from another platform.",
      },
      {
        heading: "Choosing between Shopify and WooCommerce",
        body: "If you want full control of data and no per-order platform cut, WooCommerce is usually better value and I will say so. If you want the operational burden to be someone else's problem and your catalogue fits Shopify's model, Shopify wins. I would rather have that conversation before the build than after.",
      },
    ],
    stack: ["Shopify", "Liquid", "JavaScript", "CSS3", "Shopify APIs"],
    relatedProjects: ["tatvivahtrends", "mahhika", "kalamohini"],
  },
  {
    slug: "mern-nextjs-development",
    name: "MERN & Next.js Development",
    shortName: "MERN & Next.js",
    areaServed: "India",
    title: "MERN & Next.js Developer in Lucknow — Ritesh Kumar Giri",
    description:
      "Freelance MERN and Next.js developer building custom platforms: multi-vendor marketplaces, B2B quoting engines, real-time dashboards and AI-powered products.",
    intro:
      "Some business models do not fit a storefront platform. Multi-vendor marketplaces with per-seller inventory and payouts, B2B quoting where the price depends on a negotiation, role-based approval chains, real-time messaging between parties. That is where a custom build earns its cost.",
    sections: [
      {
        heading: "What the work usually involves",
        body: "Data modelling and schema design, authentication with role-based access control, REST APIs, real-time features over Socket.IO, payment and transactional email integration, an admin surface the client can actually operate, and deployment with CI/CD.",
      },
      {
        heading: "Why Next.js",
        body: "Server rendering means the pages are in the HTML, which matters for anything that has to be found in search. It also means the first paint does not wait on a JavaScript bundle — the difference between a fast site and a slow one on a mid-range phone.",
      },
      {
        heading: "Scale and reliability",
        body: "Postgres with Prisma where the data is relational, Redis for caching and sessions, containerised deploys so staging and production behave the same way, and CI/CD so releases are boring.",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "MongoDB",
      "Socket.IO",
      "Docker",
    ],
    relatedProjects: ["maribiz", "tatvivahtrends", "thegrafftee"],
  },
];
