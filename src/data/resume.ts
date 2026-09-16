/**
 * resume.ts — src/data/resume.ts
 * ──────────────────────────────────────────────────────────
 * Source of truth for all CV content.
 * All text is intentionally kept in English (international CV standard).
 *
 * Edit this file to update CV content.
 * The ResumePage component reads from here and never hard-codes text.
 */

// ─── Personal Info ────────────────────────────────────────
export const personal = {
  fullName: "Nguyen Van Thang",
  role: "Full-Stack Developer",
  email: "4.victor.201@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  github: {
    label: "GitHub: Victor-201",
    url: "https://github.com/Victor-201",
  },
  website: {
    label: "victorfolio.pages.dev",
    url: "https://victorfolio.pages.dev/",
  },
  avatar: "/assets/cv/avatar.png",
  initials: "NVT",
  bio: `Final-year Information Technology student graduating in 2026, focused on Full-Stack Web Development across frontend and backend engineering. Experienced in building web applications with React, Next.js, TypeScript, Node.js, NestJS, Express.js, and PostgreSQL, with hands-on work in concurrency control, event-driven systems, real-time communication, authentication, testing, and Docker. Seeking a Full-Stack Developer Intern/Fresher position to contribute to end-to-end web development.`,
};

// ─── Education ────────────────────────────────────────────
export const education = {
  institution: "HCMC University of Transport",
  degree: "Bachelor of Information Technology",
  period: "2022–2026",
  gpa: "3.2+/4.0",
  graduationNote: "Expected Graduation: 2026",
};

// ─── Freelance / Independent Work ────────────────────────
export const freelance = {
  period: "Jan 2025 – Present",
  title: "Freelance Full-Stack Developer",
  location: "Remote / Project-Based",
  bullets: [
    "Collaborated in a developer group to deliver client-based full-stack web applications from requirements through milestone delivery.",
    "Developed responsive React/TypeScript interfaces and RESTful APIs with Node.js, Express.js, and PostgreSQL.",
    "Implemented relational data models, input validation, JWT authentication, and reusable application components.",
    "Containerized development and staging environments with Docker and configured GitHub Actions for automated linting and testing.",
    "Wrote unit and API integration tests with Jest and Supertest to validate endpoint behavior and data integrity before handoff.",
  ],
};

// ─── Featured Projects ────────────────────────────────────
export const projects = [
  {
    id: "ev-charging",
    period: "May 2026 – Sep 2026",
    title: "EV Charging Orchestration Platform",
    type: "Capstone / Academic Engineering Project",
    description:
      "Distributed system for real-time EV charging orchestration, telemetry processing, and automated charging-slot booking.",
    bullets: [
      "Architected an 8-service distributed system with 104 documented REST endpoints across IAM, Session, Infrastructure, Billing, Telemetry, Notification, Analytics, and OCPP Gateway services.",
      "Implemented concurrent booking with PostgreSQL row-level pessimistic locking (SELECT FOR UPDATE) and time-range conflict checks to prevent overlapping slot allocation.",
      "Designed asynchronous inter-service messaging with RabbitMQ and the Transactional Outbox pattern, including idempotency-key validation for duplicate event handling.",
      "Built administrative and self-service interfaces with Next.js, React, TypeScript, QR scanning, and Leaflet.",
      "Integrated VNPay payment processing, ledger accounting, TOTP-based MFA, ClickHouse telemetry ingestion, Docker Compose environments, GitHub Actions workflows, and Jest unit/integration tests.",
    ],
    tech: "React, Next.js, NestJS, TypeScript, PostgreSQL, Redis, RabbitMQ, Docker, Flutter, Jest",
  },
  {
    id: "studyhub",
    period: "Nov 2025 – Jul 2026",
    title: "StudyHub — Collaborative Social Learning Platform",
    type: "Full-Stack Academic Project",
    description:
      "Full-stack social learning platform for study groups, resource sharing, real-time messaging, and community features.",
    bullets: [
      "Developed 6 Express.js backend services exposing 94 REST endpoints behind Kong API Gateway.",
      "Built a modular React SPA with 93 components/views using Vite, React Router, Tailwind CSS, React Hook Form, and i18next for EN/VI localization.",
      "Engineered room-based real-time messaging with Socket.IO and MongoDB for message persistence and unread-message tracking.",
      "Implemented JWT access/refresh token rotation, bcrypt password hashing, Google OAuth 2.0, and RBAC.",
      "Applied polyglot persistence with PostgreSQL for relational business data and MongoDB for conversation history, with RabbitMQ for asynchronous notification events.",
    ],
    tech: "React, Vite, Node.js, Express.js, PostgreSQL, MongoDB, Socket.IO, RabbitMQ, Kong Gateway, Docker, Tailwind CSS",
  },
  {
    id: "victorfolio",
    period: "Aug 2025 – Sep 2026",
    title: "Victorfolio — Developer Portfolio & Real-Time Web App",
    type: "Personal Project",
    description:
      "Interactive personal web application combining portfolio content with real-time visitor features and reusable UI components.",
    bullets: [
      "Built a responsive React 19/TypeScript application with a mobile-first component structure and bilingual EN/VI localization.",
      "Implemented real-time visitor presence and synchronized remote cursor tracking across browser sessions using Socket.IO.",
      "Developed reusable UI components with Radix UI and Tailwind CSS, including theme switching and client-side form validation with Zod.",
      "Integrated GSAP, Framer Motion, and Three.js/Spline for interactive animations and 3D elements with error-boundary fallbacks.",
      "Configured email delivery through EmailJS and continuous deployment to Cloudflare Pages via Git integration.",
    ],
    tech: "React 19, TypeScript, Vite, Tailwind CSS, Radix UI, Socket.IO, GSAP, Framer Motion, Three.js, Cloudflare Pages",
  },
];

// ─── Technical Skills ─────────────────────────────────────
export const skills: { category: string; items: string[] }[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Dart", "SQL", "HTML5", "CSS3"],
  },
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "Zustand",
      "React Router",
      "TanStack Query",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express.js",
      "REST APIs",
      "WebSockets",
      "Socket.IO",
    ],
  },
  {
    category: "Databases",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "ClickHouse",
      "TypeORM",
      "Mongoose",
    ],
  },
  {
    category: "Architecture & Messaging",
    items: [
      "Microservices",
      "DDD",
      "RabbitMQ",
      "Transactional Outbox",
      "CQRS",
      "API Gateway",
    ],
  },
  {
    category: "DevOps & Testing",
    items: [
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "Jest",
      "Supertest",
      "Integration Testing",
    ],
  },
  {
    category: "Security",
    items: [
      "JWT",
      "OAuth 2.0",
      "RBAC",
      "TOTP/MFA",
      "Pessimistic Locking",
    ],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Postman", "Flutter"],
  },
];

// ─── CV download ──────────────────────────────────────────
export const cvFile = {
  path: "/assets/cv/Nguyen_Van_Thang.pdf",
  name: "Nguyen_Van_Thang.pdf",
};

// ─── Footer ───────────────────────────────────────────────
export const footer = {
  label: "Nguyen Van Thang · Full-Stack Developer",
};

// ─── Section headings ─────────────────────────────────────
export const sections = {
  freelance: "Freelance & Independent Work",
  projects: "Featured Projects",
  education: "Education",
  skills: "Technical Skills",
};

// ─── Labels inside CV ─────────────────────────────────────
export const labels = {
  tech: "Tech:",
};
