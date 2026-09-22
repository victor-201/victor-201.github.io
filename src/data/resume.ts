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

  bio: `Final-year Information Technology student graduating in 2026, focused on Full-Stack Web Development. Hands-on experience with React/Next.js, TypeScript, Node.js, NestJS, Express.js, and PostgreSQL, including distributed systems, concurrency, real-time communication, authentication, testing, and Docker. Seeking a Full-Stack Developer Intern/Fresher position.`,
};

// ─── Education ────────────────────────────────────────────
export const education = {
  institution: "HCMC University of Transport",
  degree: "Bachelor of Information Technology",
  period: "2022–2026",
  gpa: "3.36/4.0",
  graduationNote: "Expected Graduation: 2026",
};

// ─── Freelance / Independent Work ────────────────────────
export const freelance = {
  period: "Jan 2025 – Present",
  title: "Freelance Full-Stack Developer",
  location: "Remote / Project-Based",

  bullets: [
    "Delivered client-based full-stack web applications from requirements through milestones within a developer group.",
    "Built React/TypeScript interfaces and REST APIs with Node.js, Express.js, and PostgreSQL, including data modeling, validation, and JWT authentication.",
    "Containerized environments with Docker and automated linting/testing through GitHub Actions, Jest, and Supertest.",
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
      "Distributed system for real-time EV charging, telemetry, and slot booking.",

    bullets: [
      "Architected an 8-service distributed system with 104 REST endpoints across IAM, Session, Infrastructure, Billing, Telemetry, Notification, Analytics, and OCPP Gateway.",
      "Implemented concurrent booking with PostgreSQL SELECT FOR UPDATE and time-range conflict checks to prevent overlapping allocation.",
      "Designed RabbitMQ messaging with Transactional Outbox and idempotency-key validation for reliable duplicate-event handling.",
      "Built Next.js/React interfaces and integrated VNPay, TOTP/MFA, ClickHouse telemetry, Docker Compose, GitHub Actions, and Jest.",
      "Exposed services via Kong API Gateway with Redis rate limiting and auto-generated Swagger/OpenAPI docs.",
    ],

    tech: "React, Next.js, NestJS, TypeScript, PostgreSQL, Redis, RabbitMQ, Docker, Flutter, Jest",
  },

  {
    id: "studyhub",
    period: "Nov 2025 – Sep 2026",
    title: "StudyHub — Collaborative Social Learning Platform",
    type: "Full-Stack Academic Project",

    description:
      "Microservices platform for study groups, document sharing, and real-time chat.",

    bullets: [
      "Architected 6 Express.js microservices for auth, user, group, document, chat, and notification behind Kong API Gateway, with a React 18 SPA of 59 components/pages.",
      "Implemented OAuth 2.0 (Google, Facebook, GitHub, LinkedIn), JWT access/refresh rotation, 4-role RBAC, Socket.IO messaging, and RabbitMQ notifications with Transactional Outbox.",
      "Applied polyglot persistence with MySQL 8 for four relational services and MongoDB 6 for chat/notifications, with Cloudinary storage and Docker Compose.",
    ],

    tech: "React 18, Vite 7, Node.js, Express.js, MySQL, MongoDB, Socket.IO, RabbitMQ, Kong, Docker, Redux Toolkit, i18next, Cloudinary",
  },

  {
    id: "victorfolio",
    period: "Aug 2025 – Sep 2026",
    title: "Victorfolio — Developer Portfolio & Real-Time Web App",
    type: "Personal Project",

    description:
      "Interactive portfolio with real-time visitor features and reusable UI components.",

    bullets: [
      "Built a React 19/TypeScript application with bilingual EN/VI localization and reusable Radix UI/Tailwind components.",
      "Implemented real-time visitor presence and synchronized remote cursor tracking with Socket.IO, plus GSAP, Framer Motion, and Three.js interactions with Cloudflare Pages deployment.",
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
    items: ["Git", "GitHub", "Postman", "VS Code", "Antigravity"],
  },
];

// ─── CV Download ──────────────────────────────────────────
export const cvFile = {
  path: "/assets/cv/Nguyen_Van_Thang.pdf",
  name: "Nguyen_Van_Thang.pdf",
};

// ─── Footer ───────────────────────────────────────────────
export const footer = {
  label: "Nguyen Van Thang · Full-Stack Developer",
};

// ─── Section Headings ─────────────────────────────────────
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
