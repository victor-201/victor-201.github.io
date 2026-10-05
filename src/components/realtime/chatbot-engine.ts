/**
 * chatbot-engine.ts
 * ─────────────────────────────────────────────────────────────
 * Natural Language Processing Chatbot Engine for Victor's Portfolio.
 * Designed for HR, Recruiters, and Technical Interviewers.
 * 100% Client-side — Semantic comprehension with entity/intent parsing.
 * Pure clean typography — No emoji characters.
 */

import { personal, education, freelance, cvFile } from "@/data/resume";
import aboutVi from "@/locales/vi/about.json";

export type BotMessageType = "text" | "chips" | "link-list" | "cv-download";

export interface BotChip {
  label: string;
  value: string;
}

export interface BotLink {
  label: string;
  url: string;
}

export interface BotMessage {
  id: string;
  role: "user" | "bot";
  type: BotMessageType;
  text: string;
  chips?: BotChip[];
  links?: BotLink[];
  timestamp: Date;
}

// ─── Knowledge Base ────────────────────────────────────────────────────────

export const KB = {
  name: personal.fullName,
  nickname: "Victor",
  birthYear: 2004,
  role: personal.role,
  email: personal.email,
  location: personal.location,
  github: personal.github.url,
  website: personal.website.url,
  cvPath: cvFile.path,
  cvName: cvFile.name,
  workingModes: "Onsite (TP. Hồ Chí Minh), Hybrid, Remote",
  employmentType: "Full-time hoặc Part-time linh hoạt, sẵn sàng bắt đầu ngay",
  english:
    "Đọc hiểu tài liệu kỹ thuật tốt, viết code/PR/documentation bằng tiếng Anh chuẩn, giao tiếp cơ bản và đang tích cực trau dồi phản xạ",
  careerGoals:
    "Trở thành Full-Stack Software Engineer chuyên sâu về kiến trúc hệ thống phân tán, microservices và scalable web applications",

  education: {
    school: `${education.institution} (Đại học Giao Thông Vận Tải TP.HCM)`,
    degree: `${education.degree} (Cử nhân Công nghệ Thông tin)`,
    period: education.period,
    gpa: education.gpa,
    note: education.graduationNote,
  },

  bio: aboutVi.bio1,

  experience: {
    title: freelance.title,
    period: freelance.period,
    location: freelance.location,
    bullets: freelance.bullets,
  },

  projects: [
    {
      id: "ev-charging",
      name: "EV Charging Orchestration Platform",
      type: "Capstone / Đồ án Kỹ thuật Công nghệ",
      period: "May 2026 – Sep 2026",
      description:
        "Hệ thống phân tán quản lý sạc xe điện thời gian thực, giám sát telemetry và đặt trước vị trí sạc với 8 microservices và 104 REST endpoints.",
      tech: "React, Next.js, NestJS, TypeScript, PostgreSQL, Redis, RabbitMQ, Docker, Flutter, Jest",
      github: "https://github.com/Victor-201/ev-charging-orchestration-platform",
      live: "https://victor-ev-admin.pages.dev",
      highlights: [
        "Kiến trúc 8 microservices độc lập: IAM, Session, Infrastructure, Billing, Telemetry, Notification, Analytics, và OCPP Gateway.",
        "Xử lý đặt slot đồng thời (concurrent booking) sử dụng PostgreSQL SELECT FOR UPDATE và thuật toán kiểm tra xung đột khung giờ.",
        "Thiết kế message broker RabbitMQ theo mô hình Transactional Outbox pattern và idempotency-key validation chống duplicate event.",
        "Tích hợp cổng thanh toán VNPay, bảo mật TOTP/MFA, lưu trữ telemetry với ClickHouse, triển khai Docker Compose và CI/CD với GitHub Actions.",
        "Cổng kết nối Kong API Gateway tích hợp Redis rate limiting và Swagger/OpenAPI docs tự động.",
      ],
    },
    {
      id: "studyhub",
      name: "StudyHub — Collaborative Social Learning Platform",
      type: "Full-Stack Academic Project",
      period: "Nov 2025 – Sep 2026",
      description:
        "Nền tảng mạng xã hội học tập dành cho học nhóm, chia sẻ tài liệu và chat thời gian thực với 6 microservices Express.js.",
      tech: "React 18, Vite 7, Node.js, Express.js, MySQL, MongoDB, Socket.IO, RabbitMQ, Kong, Docker, Redux Toolkit, Cloudinary",
      github: "https://github.com/Victor-201/studyhub-platform",
      live: "https://victor-studyhub.pages.dev",
      highlights: [
        "Kiến trúc 6 Express.js microservices (auth, user, group, document, chat, notification) phía sau Kong API Gateway.",
        "Giao diện React 18 SPA với 59 components/pages, Redux Toolkit, đa ngôn ngữ i18next.",
        "Xác thực OAuth 2.0 (Google, Facebook, GitHub, LinkedIn), JWT access/refresh token rotation, phân quyền RBAC 4 vai trò.",
        "Mô hình lưu trữ Polyglot persistence: MySQL 8 cho dữ liệu quan hệ, MongoDB 6 cho tin nhắn chat và thông báo.",
        "Nhắn tin thời gian thực qua Socket.IO và xử lý thông báo bất đồng bộ qua RabbitMQ.",
      ],
    },
    {
      id: "victorfolio",
      name: "Victorfolio — Developer Portfolio & Real-Time Web App",
      type: "Dự án cá nhân",
      period: "Aug 2025 – Sep 2026",
      description:
        "Portfolio tương tác cao với tính năng hiển thị người xem online thời gian thực, đồng bộ con trỏ chuột và hỗ trợ song ngữ.",
      tech: "React 19, TypeScript, Vite, Tailwind CSS, Radix UI, Socket.IO, GSAP, Framer Motion, Three.js, Cloudflare Pages",
      github: "https://github.com/Victor-201/victor-201.github.io",
      live: "https://victorfolio.pages.dev",
      highlights: [
        "Xây dựng bằng React 19, TypeScript, Tailwind CSS và Radix UI với thiết kế song ngữ EN/VI hoàn chỉnh.",
        "Tính năng real-time visitor presence và đồng bộ con trỏ chuột từ xa qua Socket.IO.",
        "Tích hợp hiệu ứng hoạt họa GSAP, Framer Motion và Three.js, triển khai tự động trên Cloudflare Pages.",
      ],
    },
  ],

  skills: {
    Languages: ["TypeScript", "JavaScript", "Dart", "SQL", "HTML5", "CSS3"],
    Frontend: ["React", "Next.js", "Vite", "Tailwind CSS", "Zustand", "React Router", "TanStack Query"],
    Backend: ["Node.js", "NestJS", "Express.js", "REST APIs", "WebSockets", "Socket.IO"],
    Databases: ["PostgreSQL", "MongoDB", "Redis", "ClickHouse", "TypeORM", "MySQL"],
    "Architecture & Messaging": [
      "Microservices",
      "Domain-Driven Design (DDD)",
      "RabbitMQ",
      "Transactional Outbox",
      "CQRS",
      "API Gateway (Kong)",
    ],
    "DevOps & Testing": [
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "Jest",
      "Supertest",
      "Integration Testing",
    ],
    Security: [
      "JWT Access/Refresh Rotation",
      "OAuth 2.0",
      "RBAC",
      "TOTP/MFA",
      "Pessimistic Locking (SELECT FOR UPDATE)",
    ],
    Tools: ["Git", "GitHub", "Postman", "VS Code", "Antigravity"],
  },
};

// ─── Normalizer ────────────────────────────────────────────────────────────

function normalize(text: string): string {
  let s = text.toLowerCase();

  // Vietnamese diacritics removal
  s = s
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
    .replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ìíịỉĩ]/g, "i")
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ùúụủũưừứựửữ]/g, "u")
    .replace(/[ỳýỵỷỹ]/g, "y")
    .replace(/đ/g, "d");

  // Replace punctuation/symbols with spaces, preserve words
  s = s.replace(/[^a-z0-9\s]/g, " ");
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

// ─── Intent Types ──────────────────────────────────────────────────────────

export type Intent =
  | "name-general"
  | "name-english"
  | "name-full"
  | "bot-identity"
  | "bot-creator"
  | "who"
  | "age"
  | "career-goals"
  | "education"
  | "experience"
  | "skills"
  | "frontend-skills"
  | "backend-skills"
  | "tech-docker"
  | "tech-database"
  | "tech-microservices"
  | "tech-testing"
  | "tech-security"
  | "english"
  | "soft-skills"
  | "project-list"
  | "project-ev"
  | "project-studyhub"
  | "project-portfolio"
  | "contact"
  | "cv-download"
  | "github"
  | "hiring"
  | "availability"
  | "salary"
  | "location"
  | "strengths"
  | "weakness"
  | "why-hire"
  | "tech-stack"
  | "personal-status"
  | "hobbies"
  | "help"
  | "goodbye"
  | "greeting"
  | "unknown";

// ─── Semantic Intent Parser ────────────────────────────────────────────────
// Real reading comprehension: understands semantic roles (subject, predicate, modifiers)
// Handles natural language variations flexibly without rigid exact-phrase requirements.

export function detectIntent(input: string): Intent {
  const norm = normalize(input);
  if (!norm) return "unknown";

  const text = " " + norm + " ";
  const has = (...terms: string[]) => terms.some((t) => text.includes(" " + t + " ") || norm.includes(t));
  const hasAny = (...terms: string[]) => terms.some((t) => norm.includes(t));

  // ── 1. NAMES & IDENTITY ───────────────────────────────────────────────────
  // Handles:
  // "tôi cần biết tên của bạn", "tên bạn là gì", "tên của bạn", "bạn tên gì",
  // "tên anh ấy là gì", "tên của chủ trang web", "tên tiếng anh của bạn là gì",
  // "tên thật của bạn là gì", "tên đầy đủ", "cho tôi biết tên"
  const isAskingName =
    has("ten", "name", "nickname", "danh xung") ||
    hasAny("ban ten gi", "may ten gi", "ten gi", "ten la gi", "biet danh", "goi la gi", "can biet ten", "xin ten");

  if (isAskingName) {
    // English name?
    if (hasAny("tieng anh", "english", "nickname", "sao goi la victor", "tai sao la victor")) {
      return "name-english";
    }
    // Real / Full name?
    if (hasAny("that", "day du", "khai sinh", "tieng viet", "chinh xac", "goc", "real", "full")) {
      return "name-full";
    }
    // Any general name query (e.g. "tôi cần biết tên của bạn", "tên bạn là gì", "bạn tên gì", "tên anh ấy là gì")
    return "name-general";
  }

  // Who made the bot?
  if (
    hasAny("ai tao ra", "ai lam ra", "ai viet ra", "ai build", "ai code", "who made", "who created", "who built")
  ) {
    return "bot-creator";
  }

  // Who is the bot?
  if (
    hasAny("ban la ai", "may la ai", "cau la ai", "who are you", "what are you", "bot nay la gi")
  ) {
    return "bot-identity";
  }

  // ── 2. CV / RESUME DOWNLOAD ───────────────────────────────────────────────
  // Handles: "tải sv", "tải cv", "xin cv", "gửi cv", "download resume", "file pdf", "xem cv", "lấy cv"
  if (
    hasAny("tai cv", "tai sv", "download cv", "download resume", "xin cv", "gui cv", "lay cv", "cv pdf", "file cv", "file resume", "xem cv", "ho so xin viec", "so yeu ly lich", "tai ho so", "get cv", "get resume") ||
    (hasAny("cv", "resume", "ho so", "sv") && hasAny("tai", "download", "xin", "gui", "lay", "cho", "can", "co file", "pdf", "file", "xem")) ||
    (hasAny("tai", "download") && hasAny("ho so", "sv", "cv", "resume"))
  ) {
    return "cv-download";
  }

  // ── 3. AGE / YEAR OF BIRTH ────────────────────────────────────────────────
  // e.g. "sinh năm bao nhiêu", "bao nhiêu tuổi", "sinh năm mấy", "how old"
  if (
    hasAny("sinh nam bao nhieu", "bao nhieu tuoi", "sinh nam may", "nam sinh", "tuoi cua victor", "how old", "year of birth", "what year was he born", "age of victor") ||
    (hasAny("sinh nam", "tuoi", "nam sinh", "age", "born") && hasAny("bao nhieu", "may", "nhieu", "gi", "how old", "what"))
  ) {
    return "age";
  }

  // ── 4. CAREER GOALS & OBJECTIVES ──────────────────────────────────────────
  if (
    hasAny("muc tieu nghe nghiep", "dinh huong nghe nghiep", "dinh huong phat trien", "muc tieu tuong lai", "dinh huong tuong lai", "career goal", "career objective", "dinh huong", "muc tieu")
  ) {
    return "career-goals";
  }

  // ── 5. ENGLISH PROFICIENCY (Language skills) ──────────────────────────────
  if (
    hasAny("trinh do tieng anh", "tieng anh the nao", "kha nang tieng anh", "co biet tieng anh khong", "co noi duoc tieng anh", "giao tiep tieng anh", "english skill", "english skills", "english proficiency", "speak english", "ielts", "toeic", "ngoai ngu") ||
    (hasAny("tieng anh", "english") && hasAny("trinh do", "kha nang", "chung chi", "giao tiep", "tot", "doc", "viet", "noi", "gioi"))
  ) {
    return "english";
  }

  // ── 6. SPECIFIC PROJECTS (Prioritized before general education/skills) ────
  if (hasAny("ev charging", "sac xe dien", "xe dien", "tram sac", "capstone", "ocpp", "do an tot nghiep", "do an capstone", "do an")) {
    return "project-ev";
  }
  if (hasAny("studyhub", "study hub", "hoc nhom", "chia se tai lieu", "social learning")) {
    return "project-studyhub";
  }
  if (hasAny("victorfolio", "trang web nay", "web nay", "portfolio website", "this website", "trang ca nhan", "website nay")) {
    return "project-portfolio";
  }

  // ── 7. EDUCATION & GPA ────────────────────────────────────────────────────
  if (
    hasAny("gpa", "diem trung binh", "diem so", "ket qua hoc tap", "hoc luc", "bang cap", "chuyen nganh", "nganh hoc", "tot nghiep", "sinh vien nam may", "hoc truong nao", "hoc o dau", "truong dai hoc", "dai hoc", "giao thong van tai", "dh gtvt", "university", "college", "degree", "bachelor", "academic")
  ) {
    return "education";
  }

  // ── 8. STRENGTHS ──────────────────────────────────────────────────────────
  if (
    hasAny("diem manh", "the manh", "uu diem", "gioi nhat", "lam tot nhat", "noi bat o diem gi", "strengths", "strong points", "what is he best at", "advantages", "manh nhat", "noi troi")
  ) {
    return "strengths";
  }

  // ── 9. WEAKNESSES ─────────────────────────────────────────────────────────
  if (
    hasAny("diem yeu", "nhuoc diem", "han che", "can cai thien", "chua tot o dau", "weakness", "weaknesses", "areas for improvement", "limitations", "shortcomings", "kem nhat", "chua gioi")
  ) {
    return "weakness";
  }

  // ── 10. WHY HIRE ──────────────────────────────────────────────────────────
  if (
    hasAny("tai sao nen tuyen", "vi sao nen tuyen", "tai sao chon victor", "ly do tuyen dung", "co nen tuyen khong", "why should we hire", "why hire victor", "why hire him", "why choose victor", "tai sao phai nhan", "ly do nhan")
  ) {
    return "why-hire";
  }

  // ── 11. AVAILABILITY & WORK SCHEDULE ──────────────────────────────────────
  if (
    hasAny("full time", "fulltime", "part time", "parttime", "di lam ngay", "khi nao bat dau", "khi nao di lam", "co the di lam ngay", "thoi gian lam viec", "san sang lam viec", "start date", "when can he start", "can he work full time", "notice period", "availability", "khi nao co the di lam", "thoi gian di lam")
  ) {
    return "availability";
  }

  // ── 12. SALARY ────────────────────────────────────────────────────────────
  if (
    hasAny("muc luong", "luong mong muon", "thu nhap", "muc luong ky vong", "dai ngo", "salary", "compensation", "expected salary", "salary range", "pay", "bao nhieu tien", "luong bao nhieu", "luong the nao")
  ) {
    return "salary";
  }

  // ── 13. LOCATION & REMOTE ─────────────────────────────────────────────────
  if (
    hasAny("dia diem lam viec", "o dau", "lam viec o dau", "lam remote", "co lam remote", "onsite", "hybrid", "tp hcm", "ho chi minh", "where is he based", "where does he live", "song o dau", "dia chi")
  ) {
    return "location";
  }

  // ── 14. CONTACT & PHONE & EMAIL & INTERVIEW ───────────────────────────────
  if (
    hasAny("lien he", "lien lac", "cach lien he", "email", "so dien thoai", "sdt", "phone", "thong tin lien he", "how to contact", "get in touch", "reach him", "contact details", "zalo", "telegram", "hen lich", "dat lich phong van", "phong van", "trao doi truc tiep", "so phone", "mail cua")
  ) {
    return "contact";
  }

  // ── 15. SPECIFIC TECH INQUIRIES ───────────────────────────────────────────
  if (hasAny("docker", "docker compose", "devops", "ci cd", "cicd", "github actions", "container")) {
    return "tech-docker";
  }
  if (hasAny("postgresql", "postgres", "mongodb", "mongo", "redis", "clickhouse", "mysql", "database", "co so du lieu", "typeorm", "sql", "nosql")) {
    return "tech-database";
  }
  if (hasAny("microservice", "microservices", "rabbitmq", "message queue", "outbox", "transactional outbox", "cqrs", "kong", "gateway", "phan tan")) {
    return "tech-microservices";
  }
  if (hasAny("testing", "unit test", "integration test", "jest", "supertest", "kiem thu", "viet test")) {
    return "tech-testing";
  }
  if (hasAny("security", "bao mat", "jwt", "oauth", "oauth2", "rbac", "totp", "mfa", "xac thuc", "phan quyen")) {
    return "tech-security";
  }
  if (hasAny("frontend", "front end", "react", "nextjs", "next js", "tailwind", "zustand", "threejs", "three js", "gsap", "framer motion")) {
    return "frontend-skills";
  }
  if (hasAny("backend", "back end", "nodejs", "node js", "nestjs", "express", "rest api", "api", "socket io", "websocket")) {
    return "backend-skills";
  }
  if (hasAny("ky nang mem", "soft skill", "soft skills", "teamwork", "lam viec nhom", "giao tiep", "communication")) {
    return "soft-skills";
  }

  // ── 16. EXPERIENCE & FREELANCE ────────────────────────────────────────────
  if (hasAny("kinh nghiem", "experience", "freelance", "da lam viec o dau", "lich su lam viec", "work history", "tung lam gi", "da lam o dau", "di lam chua")) {
    return "experience";
  }

  // ── 17. PROJECTS (General) ────────────────────────────────────────────────
  if (hasAny("du an", "projects", "what projects", "what did he build", "danh sach du an", "cac du an", "da lam du an gi", "san pham")) {
    return "project-list";
  }

  // ── 18. GENERAL TECH STACK / SKILLS ───────────────────────────────────────
  if (hasAny("tech stack", "bo cong nghe", "toan bo cong nghe", "technology stack")) {
    return "tech-stack";
  }
  if (hasAny("ky nang", "skills", "technologies", "biet gi", "cong nghe gi", "lam duoc gi", "chuyen mon", "ngon ngu lap trinh", "biet nhung gi")) {
    return "skills";
  }

  // ── 19. GITHUB ────────────────────────────────────────────────────────────
  if (hasAny("github", "source code", "repo", "repository", "ma nguon")) {
    return "github";
  }

  // ── 20. HIRING / RECRUITMENT ──────────────────────────────────────────────
  if (hasAny("tuyen dung", "ung tuyen", "vi tri ung tuyen", "dang tim viec gi", "intern", "fresher", "hire him", "recruiting", "tim viec")) {
    return "hiring";
  }

  // ── 21. WHO IS VICTOR / TELL ME ABOUT HIM ─────────────────────────────────
  if (
    hasAny("victor la ai", "nguyen van thang la ai", "gioi thieu ve victor", "gioi thieu ve anh ay", "thong tin ve victor", "who is victor", "who is he", "tell me about victor", "about victor", "ve victor", "ve anh ay") ||
    (hasAny("victor", "thang", "anh ay", "nguoi nay") && hasAny("la ai", "nhu the nao", "who", "gioi thieu", "thong tin"))
  ) {
    return "who";
  }

  // ── 22. CASUAL / FUN QUESTIONS ────────────────────────────────────────────
  if (hasAny("nguoi yeu", "co bo chua", "ban gai", "dating", "girlfriend")) {
    return "personal-status";
  }
  if (hasAny("so thich", "hobby", "hobbies", "thich lam gi", "luc ranh")) {
    return "hobbies";
  }

  // ── 23. GREETINGS & GOODBYES ──────────────────────────────────────────────
  if (hasAny("hello", "hi", "hey", "xin chao", "chao ban", "chao", "good morning", "good afternoon", "good evening", "alo")) {
    return "greeting";
  }
  if (hasAny("bye", "goodbye", "tam biet", "cam on", "thank you", "thanks")) {
    return "goodbye";
  }
  if (hasAny("help", "tro giup", "huong dan", "co the hoi gi", "menu")) {
    return "help";
  }

  return "unknown";
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function msg(text: string, chips?: BotChip[]): Omit<BotMessage, "id" | "timestamp"> {
  return { role: "bot", type: chips ? "chips" : "text", text, chips };
}

function linkMsg(text: string, links: BotLink[], chips?: BotChip[]): Omit<BotMessage, "id" | "timestamp"> {
  return { role: "bot", type: "link-list", text, links, chips };
}

// ─── Responses Map (Pure Clean Markdown, No Emojis) ─────────────────────────

const RESPONSES: Record<Intent, () => Omit<BotMessage, "id" | "timestamp">> = {

  "name-general": () => msg(
    `**Nguyen Van Thang (Victor)**\n\n- **Tên tiếng Việt đầy đủ:** **Nguyễn Văn Thắng**\n- **Tên tiếng Anh / Nickname làm việc:** **Victor**\n- **Tôi là:** **VictorBot** — trợ lý AI ảo đại diện cho anh ấy trên portfolio này!\n\nBạn có thể hỏi tôi bất cứ điều gì về Victor — từ kỹ năng, các dự án thực chiến, học vấn cho đến cách liên hệ và tải CV.`,
    [
      { label: "Victor là ai?", value: "Victor là ai?" },
      { label: "Xem các dự án đã làm", value: "Anh ấy đã làm những dự án nào?" },
      { label: "Kỹ năng kỹ thuật", value: "Anh ấy biết những công nghệ gì?" },
      { label: "Tải CV", value: "Tôi muốn tải CV của anh ấy" },
      { label: "Liên hệ", value: "Làm sao để liên hệ với Victor?" },
    ]
  ),

  "name-english": () => msg(
    `Tên tiếng Anh của anh ấy là **Victor**.\n\n- **Tên tiếng Việt đầy đủ:** **Nguyễn Văn Thắng**\n- **Tên tiếng Anh / Nickname làm việc:** **Victor**\n\nCòn tôi là **VictorBot** — trợ lý AI ảo đại diện cho anh ấy trên trang portfolio này để trả lời các câu hỏi của bạn.`,
    [
      { label: "Tên thật của anh ấy?", value: "Tên thật đầy đủ của anh ấy là gì?" },
      { label: "Victor là ai?", value: "Victor là ai?" },
      { label: "Xem các dự án", value: "Anh ấy đã làm những dự án nào?" },
      { label: "Tải CV", value: "Tôi muốn tải CV của anh ấy" },
    ]
  ),

  "name-full": () => msg(
    `Tên tiếng Việt đầy đủ của anh ấy là **Nguyễn Văn Thắng**.\n\nTrong công việc và trên các nền tảng kỹ thuật (GitHub, Portfolio), anh ấy thường sử dụng tên tiếng Anh là **Victor** (Victor-201).`,
    [
      { label: "Tên tiếng Anh là gì?", value: "Tên tiếng Anh của bạn là gì?" },
      { label: "Giới thiệu về Victor", value: "Victor là ai?" },
      { label: "Tải CV", value: "Tôi muốn tải CV của anh ấy" },
      { label: "Liên hệ", value: "Làm sao để liên hệ với anh ấy?" },
    ]
  ),

  "bot-identity": () => msg(
    `Tôi là **VictorBot** — trợ lý AI ảo được tích hợp trên portfolio của **Nguyễn Văn Thắng (Victor)**.\n\nNhiệm vụ của tôi là hỗ trợ các bạn HR, phỏng vấn viên và khách ghé thăm tìm hiểu nhanh chóng về kỹ năng kỹ thuật, kinh nghiệm dự án, thông tin liên hệ và tải CV của Victor.`,
    [
      { label: "Victor là ai?", value: "Victor là ai?" },
      { label: "Ai tạo ra bạn?", value: "Ai tạo ra bạn?" },
      { label: "Dự án đã làm", value: "Anh ấy đã làm những dự án nào?" },
      { label: "Tải CV", value: "Tôi muốn tải CV" },
    ]
  ),

  "bot-creator": () => msg(
    `Tôi được xây dựng và lập trình bởi chính **Nguyễn Văn Thắng (Victor)**.\n\nToàn bộ logic phân tích ngữ nghĩa tự nhiên của tôi chạy 100% phía client trên trình duyệt bằng React và TypeScript, không phụ thuộc vào bất kỳ API bên ngoài nào.`,
    [
      { label: "Xem mã nguồn GitHub", value: "Cho tôi xem GitHub của anh ấy" },
      { label: "Kỹ năng lập trình", value: "Anh ấy biết những công nghệ gì?" },
      { label: "Tải CV", value: "Tôi muốn tải CV" },
    ]
  ),

  greeting: () => msg(
    `Xin chào! Tôi là VictorBot, trợ lý tự động của **Nguyen Van Thang (Victor)**.\n\nTôi có thể cung cấp đầy đủ thông tin về kỹ năng, dự án thực chiến, học vấn, kinh nghiệm, thông tin liên hệ và hỗ trợ tải CV. Bạn có thể hỏi tôi bằng bất kỳ câu hỏi tự nhiên nào.`,
    [
      { label: "Victor là ai?", value: "Bạn có thể giới thiệu về Victor không?" },
      { label: "Dự án đã làm", value: "Anh ấy đã làm những dự án nào?" },
      { label: "Kỹ năng kỹ thuật", value: "Anh ấy biết những công nghệ gì?" },
      { label: "Tải CV", value: "Tôi muốn tải CV của anh ấy" },
      { label: "Liên hệ", value: "Làm sao để liên hệ với Victor?" },
    ]
  ),

  who: () => msg(
    `**Nguyen Van Thang — Victor**\n\n${KB.bio}\n\n- **Vị trí tìm kiếm:** ${KB.role}\n- **Học vấn:** ${KB.education.school} (GPA: ${KB.education.gpa})\n- **Địa điểm:** ${KB.location}\n- **Email:** ${KB.email}\n- **Website:** ${KB.website}`,
    [
      { label: "Xem dự án nổi bật", value: "Anh ấy đã làm những dự án nào?" },
      { label: "Kỹ năng kỹ thuật", value: "Kỹ năng công nghệ của anh ấy gồm những gì?" },
      { label: "Tải CV", value: "Tôi muốn tải CV" },
      { label: "Liên hệ", value: "Làm sao để liên hệ với Victor?" },
    ]
  ),

  age: () => msg(
    `**Thông tin năm sinh và độ tuổi**\n\n- **Năm sinh:** ${KB.birthYear}\n- **Độ tuổi:** Khoảng 22 tuổi\n- **Tình trạng:** Hiện là sinh viên năm cuối tại ${KB.education.school}, dự kiến tốt nghiệp năm 2026 và đã sẵn sàng tham gia công việc full-time / intern / fresher.`,
    [
      { label: "Thời gian đi làm", value: "Anh ấy có thể đi làm full-time không?" },
      { label: "Học vấn", value: "Anh ấy học ở đâu?" },
      { label: "Tải CV", value: "Tôi muốn tải CV" },
    ]
  ),

  "career-goals": () => msg(
    `**Mục tiêu và định hướng nghề nghiệp**\n\n${KB.careerGoals}.\n\n- **Ngắn hạn (1-2 năm tới):** Gia nhập môi trường phát triển sản phẩm chuyên nghiệp (product hoặc tech startup), cọ xát với hệ thống production quy mô lớn, đóng góp ở cả frontend và backend, đồng thời học hỏi từ các senior engineer.\n- **Dài hạn (3-5 năm):** Phát triển thành Senior Full-Stack Engineer / Technical Lead, chuyên sâu về system design, high concurrency và cloud infrastructure.`,
    [
      { label: "Tại sao nên tuyển?", value: "Tại sao nên tuyển Victor?" },
      { label: "Dự án đã làm", value: "Các dự án nổi bật của anh ấy là gì?" },
      { label: "Liên hệ phỏng vấn", value: "Làm sao để liên hệ phỏng vấn?" },
    ]
  ),

  education: () => msg(
    `**Học vấn & Bằng cấp**\n\n- **Trường:** ${KB.education.school}\n- **Ngành:** ${KB.education.degree}\n- **Thời gian đào tạo:** ${KB.education.period}\n- **Điểm trung bình (GPA):** ${KB.education.gpa}\n- **Tình trạng:** ${KB.education.note}\n\nVictor có nền tảng học thuật vững vàng kết hợp song song với các dự án kỹ thuật thực tế quy mô lớn.`,
    [
      { label: "Đồ án tốt nghiệp", value: "Đồ án tốt nghiệp của anh ấy là gì?" },
      { label: "Kinh nghiệm làm việc", value: "Anh ấy có kinh nghiệm gì rồi?" },
      { label: "Tải CV", value: "Tôi muốn tải CV" },
    ]
  ),

  experience: () => msg(
    `**Kinh nghiệm làm việc**\n\n**${KB.experience.title}** (${KB.experience.period})\nĐịa điểm: ${KB.experience.location}\n\nChi tiết công việc:\n${KB.experience.bullets.map((b) => `- ${b}`).join("\n")}\n\nNgoài freelance, Victor đã hoàn thành các dự án kỹ thuật lớn với kiến trúc microservices và concurrency cao.`,
    [
      { label: "Dự án EV Charging", value: "Kể về dự án EV Charging" },
      { label: "Dự án StudyHub", value: "Dự án StudyHub là gì?" },
      { label: "Thời gian bắt đầu", value: "Khi nào anh ấy có thể đi làm?" },
    ]
  ),

  skills: () => msg(
    `**Tổng quan kỹ năng kỹ thuật của Victor**\n\n${Object.entries(KB.skills)
      .map(([cat, items]) => `**${cat}:** ${items.join(", ")}`)
      .join("\n")}`,
    [
      { label: "Frontend", value: "Kỹ năng Frontend của anh ấy là gì?" },
      { label: "Backend", value: "Kỹ năng Backend của anh ấy là gì?" },
      { label: "Docker & DevOps", value: "Anh ấy có biết dùng Docker không?" },
      { label: "Microservices", value: "Anh ấy có kinh nghiệm về Microservices không?" },
    ]
  ),

  "frontend-skills": () => msg(
    `**Kỹ năng Frontend**\n\n- **Core:** ${KB.skills.Frontend.join(", ")}\n- **Languages:** TypeScript, JavaScript, HTML5, CSS3\n- **Animation & Visuals:** GSAP, Framer Motion, Three.js\n- **UI Kits:** Tailwind CSS, Radix UI\n\nVictor thành thạo việc tạo UI tối ưu hiệu năng, responsive, animation mượt mà, và quản lý state phức tạp (Zustand, Redux Toolkit, TanStack Query).`,
    [
      { label: "Kỹ năng Backend", value: "Kỹ năng Backend của anh ấy là gì?" },
      { label: "Xem Portfolio", value: "Trang portfolio này làm bằng gì?" },
      { label: "Tải CV", value: "Tôi muốn tải CV" },
    ]
  ),

  "backend-skills": () => msg(
    `**Kỹ năng Backend**\n\n- **Frameworks & Runtimes:** Node.js, NestJS, Express.js, TypeScript\n- **APIs & Protocols:** RESTful APIs, WebSockets, Socket.IO\n- **Databases:** PostgreSQL, MongoDB, Redis, ClickHouse, MySQL\n- **Kiến trúc:** Microservices, DDD, RabbitMQ, Transactional Outbox, Kong API Gateway\n\nVictor có kinh nghiệm thực tế về xử lý đồng thời (concurrency), locking trong database, và message broker tin cậy.`,
    [
      { label: "Kinh nghiệm Microservices", value: "Có kinh nghiệm về Microservices không?" },
      { label: "Docker & DevOps", value: "Có biết dùng Docker không?" },
      { label: "Dự án EV Charging", value: "Kể về dự án EV Charging" },
    ]
  ),

  "tech-docker": () => msg(
    `**Kỹ năng Docker & DevOps**\n\n- **Docker & Docker Compose:** Đã đóng gói toàn bộ môi trường phát triển và production cho hệ thống 8 microservices (EV Charging) và 6 microservices (StudyHub).\n- **CI/CD:** Xây dựng workflow tự động hóa với **GitHub Actions** để chạy linter, unit test (Jest) và integration test trước khi merge code.\n- **Deployment:** Triển khai static frontend và full-stack apps trên Cloudflare Pages và cloud environments.\n- **API Gateway:** Cấu hình **Kong API Gateway** để reverse proxy, quản lý rate limiting với Redis.`,
    [
      { label: "Kiến trúc Microservices", value: "Kinh nghiệm về Microservices ra sao?" },
      { label: "Databases sử dụng", value: "Anh ấy sử dụng những database nào?" },
      { label: "Xem dự án EV Charging", value: "Kể về dự án EV Charging" },
    ]
  ),

  "tech-database": () => msg(
    `**Kỹ năng Cơ sở dữ liệu (Databases)**\n\n- **PostgreSQL:** Thiết kế schema quan hệ phức tạp, tối ưu query, áp dụng **SELECT FOR UPDATE (Pessimistic Locking)** để giải quyết bài toán đặt chỗ trùng lặp (concurrent booking).\n- **MongoDB:** Lưu trữ dữ liệu phi cấu trúc, tin nhắn realtime chat, lịch sử thông báo.\n- **Redis:** Làm cache tốc độ cao, quản lý session và áp dụng rate limiting tại API Gateway.\n- **ClickHouse:** Lưu trữ và phân tích dữ liệu telemetry dòng thời gian (time-series telemetry) quy mô lớn trong dự án sạc xe điện.\n- **MySQL & TypeORM:** Quản lý migration, quan hệ thực thể và ORM mapping.`,
    [
      { label: "Dự án EV Charging", value: "Kể về dự án EV Charging" },
      { label: "Dự án StudyHub", value: "Kể về dự án StudyHub" },
      { label: "Kỹ năng Backend", value: "Kỹ năng Backend của anh ấy là gì?" },
    ]
  ),

  "tech-microservices": () => msg(
    `**Kinh nghiệm Microservices & Kiến trúc phân tán**\n\nVictor đã trực tiếp thiết kế và triển khai 2 hệ thống microservices hoàn chỉnh:\n\n1. **EV Charging Platform (8 microservices):**\n- Các service: IAM, Session, Infrastructure, Billing, Telemetry, Notification, Analytics, OCPP Gateway.\n- Sử dụng **RabbitMQ** với **Transactional Outbox Pattern** và idempotency-key validation để đảm bảo tin nhắn không bị thất thoát hoặc trùng lặp.\n- Kong API Gateway điều phối routing và rate limit.\n\n2. **StudyHub (6 microservices):**\n- Các service: Auth, User, Group, Document, Chat, Notification.\n- Polyglot persistence: MySQL kết hợp MongoDB.`,
    [
      { label: "Chi tiết dự án EV Charging", value: "Kể chi tiết về dự án EV Charging" },
      { label: "Chi tiết dự án StudyHub", value: "Dự án StudyHub như thế nào?" },
      { label: "Tải CV", value: "Tôi muốn tải CV của anh ấy" },
    ]
  ),

  "tech-testing": () => msg(
    `**Kiểm thử phần mềm (Testing)**\n\nVictor chú trọng chất lượng mã nguồn và có kinh nghiệm thực tế về:\n\n- **Unit Testing:** Sử dụng **Jest** để kiểm thử logic nghiệp vụ và utility functions.\n- **Integration Testing:** Dùng **Supertest** để test các REST API endpoints, kiểm tra status code, payload schema và authentication middleware.\n- **CI Integration:** Toàn bộ test suite được kích hoạt tự động qua **GitHub Actions** khi có Pull Request mới.`,
    [
      { label: "Bảo mật hệ thống", value: "Bảo mật hệ thống như thế nào?" },
      { label: "Xem GitHub", value: "Cho tôi xem GitHub của anh ấy" },
      { label: "Tải CV", value: "Tôi muốn tải CV" },
    ]
  ),

  "tech-security": () => msg(
    `**Kỹ năng Bảo mật (Security)**\n\n- **Authentication & Authorization:** JWT Access/Refresh Token rotation, 4-role RBAC (Role-Based Access Control).\n- **OAuth 2.0:** Tích hợp đăng nhập bên thứ 3 (Google, Facebook, GitHub, LinkedIn).\n- **Two-Factor Authentication:** Triển khai **TOTP / MFA** (Time-based One-Time Password).\n- **Database Security:** Chống race condition với Pessimistic Locking, sanitize input chống SQL Injection và XSS.`,
    [
      { label: "Xem dự án EV Charging", value: "Kể về dự án EV Charging" },
      { label: "Xem dự án StudyHub", value: "Kể về dự án StudyHub" },
      { label: "Liên hệ", value: "Làm sao để liên hệ?" },
    ]
  ),

  english: () => msg(
    `**Trình độ Tiếng Anh của Victor**\n\n- **Đọc & Viết:** Thành thạo trong môi trường kỹ thuật. Đọc hiểu tốt các tài liệu công nghệ (Official Documentation, RFC, Specs), viết commit message, PR description và tài liệu dự án bằng tiếng Anh tiêu chuẩn.\n- **Giao tiếp:** Giao tiếp cơ bản, có thể trình bày ý tưởng kỹ thuật và đang tích cực rèn luyện nâng cao sự lưu loát trong môi trường quốc tế.`,
    [
      { label: "Tên tiếng Anh của anh ấy?", value: "Tên tiếng Anh của bạn là gì?" },
      { label: "Điểm mạnh", value: "Điểm mạnh của anh ấy là gì?" },
      { label: "Kỹ năng mềm", value: "Kỹ năng mềm của anh ấy ra sao?" },
      { label: "Tải CV", value: "Tôi muốn tải CV" },
    ]
  ),

  "soft-skills": () => msg(
    `**Kỹ năng mềm & Tác phong làm việc**\n\n- **Chủ động tự học và giải quyết vấn đề:** Khả năng nghiên cứu công nghệ mới nhanh chóng và đưa vào dự án thực chiến (đã tự làm chủ Docker, RabbitMQ, ClickHouse, Three.js).\n- **Làm việc nhóm & Giao tiếp:** Đã làm việc theo nhóm trong các đồ án kỹ thuật phức tạp, sử dụng Git feature branch workflow, code review và thống nhất tài liệu API.\n- **Trách nhiệm & Hoàn thành mục tiêu:** Bàn giao sản phẩm freelance đúng hạn, chú trọng chất lượng sản phẩm từ trải nghiệm người dùng đến cấu trúc mã nguồn.`,
    [
      { label: "Tại sao nên tuyển?", value: "Tại sao nên tuyển Victor?" },
      { label: "Kinh nghiệm làm việc", value: "Anh ấy có kinh nghiệm gì rồi?" },
      { label: "Liên hệ", value: "Làm sao để liên hệ với anh ấy?" },
    ]
  ),

  "project-list": () => msg(
    `**Các dự án nổi bật của Victor**\n\n${KB.projects
      .map((p, i) => `**${i + 1}. ${p.name}** (${p.type})\n${p.description}\nTech: ${p.tech}`)
      .join("\n\n")}\n\nBạn muốn tìm hiểu chi tiết về dự án nào?`,
    [
      { label: "EV Charging Platform", value: "Kể cho tôi nghe về dự án EV Charging" },
      { label: "StudyHub Platform", value: "Dự án StudyHub là như thế nào?" },
      { label: "Portfolio Website", value: "Trang portfolio này được xây dựng như thế nào?" },
      { label: "Xem GitHub", value: "Cho tôi xem GitHub của anh ấy" },
    ]
  ),

  "project-ev": () => {
    const p = KB.projects[0];
    return msg(
      `**${p.name}**\nLoại hình: ${p.type} (${p.period})\n\n${p.description}\n\n**Điểm nổi bật về kỹ thuật:**\n${p.highlights.map((h) => `- ${h}`).join("\n")}\n\n**Tech Stack:** ${p.tech}\n\n- Demo Live: ${p.live}\n- GitHub: ${p.github}`,
      [
        { label: "Dự án StudyHub", value: "Dự án StudyHub là gì?" },
        { label: "Xem GitHub", value: "Cho tôi xem GitHub" },
        { label: "Tải CV", value: "Tôi muốn tải CV" },
      ]
    );
  },

  "project-studyhub": () => {
    const p = KB.projects[1];
    return msg(
      `**${p.name}**\nLoại hình: ${p.type} (${p.period})\n\n${p.description}\n\n**Điểm nổi bật về kỹ thuật:**\n${p.highlights.map((h) => `- ${h}`).join("\n")}\n\n**Tech Stack:** ${p.tech}\n\n- Demo Live: ${p.live}\n- GitHub: ${p.github}`,
      [
        { label: "Dự án EV Charging", value: "Kể về dự án EV Charging" },
        { label: "Trang portfolio này", value: "Trang web portfolio này làm bằng gì?" },
        { label: "Liên hệ Victor", value: "Làm sao để liên hệ với Victor?" },
      ]
    );
  },

  "project-portfolio": () => {
    const p = KB.projects[2];
    return msg(
      `**${p.name}**\nLoại hình: ${p.type} (${p.period})\n\n${p.description}\n\n**Điểm nổi bật:**\n${p.highlights.map((h) => `- ${h}`).join("\n")}\n\n**Tech Stack:** ${p.tech}\n\n- GitHub: ${p.github}\n- Live: ${p.live}`,
      [
        { label: "Tất cả dự án", value: "Anh ấy đã làm những dự án nào?" },
        { label: "Kỹ năng frontend", value: "Kỹ năng Frontend của anh ấy là gì?" },
        { label: "Tải CV", value: "Tôi muốn tải CV" },
      ]
    );
  },

  contact: () => msg(
    `**Thông tin liên hệ với Victor**\n\n- **Email:** ${KB.email}\n- **Website:** ${KB.website}\n- **GitHub:** ${KB.github}\n- **Địa điểm:** ${KB.location}\n\nBạn có thể gửi email trực tiếp hoặc sử dụng form liên hệ ở phần Contact của trang web này để hẹn lịch phỏng vấn hoặc trao đổi công việc.`,
    [
      { label: "Tải CV", value: "Tôi muốn tải CV của anh ấy" },
      { label: "Xem GitHub", value: "Cho tôi xem GitHub" },
      { label: "Thời gian đi làm", value: "Anh ấy có thể bắt đầu khi nào?" },
    ]
  ),

  "cv-download": () => ({
    role: "bot",
    type: "cv-download",
    text: `**Tải CV của Nguyen Van Thang (Victor)**\n\nNhấn nút bên dưới để tải trực tiếp file PDF CV mới nhất về máy của bạn.\n\nTên file: ${KB.cvName}`,
    chips: [
      { label: "Liên hệ qua Email", value: "Làm sao để liên hệ với anh ấy?" },
      { label: "Xem dự án nổi bật", value: "Anh ấy đã làm những dự án nào?" },
      { label: "Kỹ năng kỹ thuật", value: "Kỹ năng công nghệ của anh ấy gồm những gì?" },
    ],
  }),

  github: () => linkMsg(
    `**GitHub của Victor**\n\nToàn bộ mã nguồn dự án được lưu trữ công khai tại:\n${KB.github}\n\nCác repository tiêu biểu:`,
    [
      { label: "EV Charging Platform", url: KB.projects[0].github },
      { label: "StudyHub Platform", url: KB.projects[1].github },
      { label: "Portfolio Website", url: KB.projects[2].github },
      { label: "Trang cá nhân GitHub", url: KB.github },
    ],
    [
      { label: "Tải CV", value: "Tôi muốn tải CV của anh ấy" },
      { label: "Liên hệ", value: "Làm sao để liên hệ với Victor?" },
    ]
  ),

  hiring: () => msg(
    `**Thông tin Tuyển dụng**\n\nVictor đang tích cực tìm kiếm cơ hội cho vị trí **${KB.role}**.\n\n- **Hình thức làm việc:** ${KB.workingModes}\n- **Thời gian làm việc:** ${KB.employmentType}\n- **Môi trường mong muốn:** Doanh nghiệp sản phẩm (product company), tech startup hoặc công ty có quy trình kỹ thuật chuẩn chỉnh và có đội ngũ mentor hướng dẫn.\n\nEmail trao đổi tuyển dụng: ${KB.email}`,
    [
      { label: "Tải CV", value: "Tôi muốn tải CV của anh ấy" },
      { label: "Thời gian bắt đầu", value: "Khi nào anh ấy có thể đi làm?" },
      { label: "Tại sao nên tuyển?", value: "Tại sao nên tuyển Victor?" },
    ]
  ),

  availability: () => msg(
    `**Thời gian sẵn sàng làm việc**\n\n- **Trạng thái:** Hiện là sinh viên năm cuối (tốt nghiệp 2026), các môn học đã hoàn tất phần lớn.\n- **Hình thức:** Có thể làm việc **Full-time** hoặc Part-time linh hoạt.\n- **Thời gian bắt đầu:** Sẵn sàng bắt đầu công việc ngay lập tức theo thỏa thuận.\n- **Địa điểm:** Sẵn sàng làm việc onsite tại TP. Hồ Chí Minh hoặc remote/hybrid.`,
    [
      { label: "Liên hệ phỏng vấn", value: "Làm sao để liên hệ với Victor?" },
      { label: "Tải CV", value: "Tôi muốn tải CV" },
      { label: "Mức lương mong muốn", value: "Mức lương mong muốn là bao nhiêu?" },
    ]
  ),

  salary: () => msg(
    `**Mức lương mong muốn**\n\nVictor đang ứng tuyển vị trí Intern / Fresher. Mức đãi ngộ hoàn toàn mở và sẵn sàng thương lượng dựa trên:\n\n- Phạm vi công việc và trách nhiệm\n- Hình thức làm việc (onsite / remote)\n- Môi trường phát triển và cơ hội học hỏi kỹ thuật\n\nĐể trao đổi chi tiết, quý công ty có thể liên hệ trực tiếp qua email: ${KB.email}`,
    [
      { label: "Liên hệ phỏng vấn", value: "Làm sao để liên hệ với Victor?" },
      { label: "Tải CV", value: "Tôi muốn tải CV" },
      { label: "Thời gian bắt đầu", value: "Anh ấy có thể đi làm khi nào?" },
    ]
  ),

  location: () => msg(
    `**Địa điểm làm việc**\n\nVictor hiện đang sinh sống và học tập tại **TP. Hồ Chí Minh, Việt Nam**.\n\n- **Onsite:** Sẵn sàng làm việc tại các văn phòng ở TP.HCM\n- **Remote:** Đã có kinh nghiệm làm việc từ xa hiệu quả qua các dự án freelance\n- **Hybrid:** Hoàn toàn linh hoạt và đáp ứng tốt`,
    [
      { label: "Thời gian bắt đầu", value: "Anh ấy có thể đi làm khi nào?" },
      { label: "Liên hệ", value: "Làm sao để liên hệ?" },
    ]
  ),

  strengths: () => msg(
    `**Điểm mạnh nổi bật của Victor**\n\n1. **Kỹ năng thực chiến cao:** Đã tự tay thiết kế và xây dựng hệ thống phân tán 8 microservices với 104 endpoints — hiểu sâu về luồng dữ liệu thay vì chỉ code theo tutorial.\n2. **Full-Stack thực thụ:** Tự tin cả frontend (React, Next.js, TypeScript, animations) lẫn backend (NestJS, Express, PostgreSQL, RabbitMQ, Docker).\n3. **Tư duy kiến trúc & chất lượng mã nguồn:** Áp dụng DDD, Transactional Outbox, Pessimistic Locking và viết automated testing (Jest, Supertest).\n4. **Chủ động và tốc độ tự học:** Nắm bắt công nghệ mới nhanh và áp dụng hiệu quả vào dự án.\n5. **Học vấn tốt:** GPA 3.36/4.0 ngành Công nghệ Thông tin.`,
    [
      { label: "Điểm cần cải thiện", value: "Điểm yếu của anh ấy là gì?" },
      { label: "Tại sao nên tuyển?", value: "Tại sao nên tuyển Victor?" },
      { label: "Xem dự án", value: "Cho tôi xem dự án của anh ấy" },
    ]
  ),

  weakness: () => msg(
    `**Điểm cần cải thiện**\n\nVictor luôn có tinh thần tự đánh giá trung thực để không ngừng hoàn thiện:\n\n- **Kinh nghiệm môi trường enterprise lớn:** Phần lớn kinh nghiệm hiện tại đến từ các dự án kỹ thuật quy mô lớn độc lập và freelance, đang tìm kiếm môi trường công ty để làm quen với quy trình doanh nghiệp lớn.\n- **Tiếng Anh giao tiếp:** Đọc hiểu tài liệu kỹ thuật rất tốt nhưng đang tiếp tục thực hành để giao tiếp phản xạ tự nhiên hơn trong môi trường đa quốc gia.\n- **Mobile development:** Đã tiếp xúc với Flutter ở mức cơ bản, hiện đang tập trung chuyên sâu tối đa cho Web Full-Stack.`,
    [
      { label: "Điểm mạnh", value: "Điểm mạnh của anh ấy là gì?" },
      { label: "Học vấn", value: "Anh ấy học ở đâu?" },
      { label: "Tải CV", value: "Tôi muốn tải CV" },
    ]
  ),

  "why-hire": () => msg(
    `**Tại sao công ty nên tuyển Victor?**\n\n- **Sẵn sàng đóng góp ngay:** Có thể bắt tay vào xây dựng tính năng ở cả frontend và backend ngay từ ngày đầu, không mất nhiều thời gian đào tạo lại các kiến thức cơ bản.\n- **Hiểu sâu về hệ thống:** Đã có trải nghiệm giải quyết các bài toán khó: concurrency, locking, duplicate events trong message queue, polyglot databases.\n- **Nền tảng vững chắc:** Sinh viên năm cuối Đại học Giao Thông Vận Tải TP.HCM với GPA 3.36/4.0.\n- **Thái độ chuyên nghiệp:** Tinh thần trách nhiệm cao, cầu tiến, ham học hỏi và luôn chủ động lắng nghe phản hồi.`,
    [
      { label: "Tải CV", value: "Tôi muốn tải CV của anh ấy" },
      { label: "Liên hệ phỏng vấn", value: "Làm sao để liên hệ với Victor?" },
      { label: "Xem dự án", value: "Cho tôi xem các dự án tiêu biểu" },
    ]
  ),

  "tech-stack": () => msg(
    `**Tổng hợp Tech Stack của Victor**\n\n- **Frontend:** React 19, Next.js, Vite, TypeScript, Tailwind CSS, Radix UI, Zustand, Redux Toolkit, TanStack Query, GSAP, Framer Motion, Three.js\n- **Backend:** Node.js, NestJS, Express.js, REST APIs, WebSockets, Socket.IO\n- **Databases:** PostgreSQL, MongoDB, Redis, ClickHouse, MySQL, TypeORM\n- **Architecture:** Microservices, DDD, CQRS, API Gateway (Kong), RabbitMQ (Transactional Outbox)\n- **DevOps & CI/CD:** Docker, Docker Compose, GitHub Actions, Cloudflare Pages\n- **Testing:** Jest, Supertest, Integration Testing\n- **Security:** JWT rotation, OAuth 2.0, RBAC, TOTP/MFA`,
    [
      { label: "Frontend chi tiết", value: "Kỹ năng frontend cụ thể là gì?" },
      { label: "Backend chi tiết", value: "Kỹ năng backend cụ thể là gì?" },
      { label: "Tải CV", value: "Tôi muốn tải CV" },
    ]
  ),

  "personal-status": () => msg(
    `Victor hiện tại đang độc thân và dành toàn bộ năng lượng, đam mê cho việc học tập, nghiên cứu công nghệ mới và xây dựng các sản phẩm phần mềm chất lượng.`,
    [
      { label: "Mục tiêu nghề nghiệp", value: "Mục tiêu nghề nghiệp của anh ấy là gì?" },
      { label: "Xem dự án đã làm", value: "Anh ấy đã làm những dự án nào?" },
      { label: "Kỹ năng kỹ thuật", value: "Anh ấy biết những công nghệ gì?" },
    ]
  ),

  hobbies: () => msg(
    `**Sở thích cá nhân của Victor**\n\n- Tìm hiểu và thử nghiệm các kiến trúc hệ thống mới, công nghệ backend và web animations\n- Đọc tài liệu công nghệ, tham gia các cộng đồng lập trình mã nguồn mở\n- Nghe nhạc khi lập trình và rèn luyện sức khỏe`,
    [
      { label: "Xem các dự án", value: "Anh ấy đã làm những dự án nào?" },
      { label: "Kỹ năng chuyên môn", value: "Kỹ năng của anh ấy là gì?" },
      { label: "Tải CV", value: "Tôi muốn tải CV" },
    ]
  ),

  help: () => msg(
    `**VictorBot có thể giải đáp cho bạn các chủ đề:**\n\n- **Giới thiệu chung:** Tên thật, tên tiếng Anh, năm sinh, mục tiêu nghề nghiệp\n- **Học vấn:** Trường đại học, GPA, năm tốt nghiệp\n- **Kinh nghiệm:** Freelance, các hệ thống đã triển khai\n- **Kỹ năng chuyên môn:** Frontend, Backend, Docker, Databases, Microservices, Testing, Security\n- **Dự án:** EV Charging Platform, StudyHub Platform, Victorfolio\n- **Tuyển dụng:** Vị trí tìm kiếm, thời gian đi làm, full-time/part-time, mức lương, địa điểm\n- **Hồ sơ & Liên hệ:** Tải file CV PDF, GitHub, email liên hệ\n\nBạn có thể nhập bất kỳ câu hỏi nào bằng ngôn ngữ tự nhiên.`,
    [
      { label: "Tên tiếng Anh của bạn?", value: "Tên tiếng Anh của bạn là gì?" },
      { label: "Giới thiệu Victor", value: "Bạn có thể giới thiệu về Victor không?" },
      { label: "Xem các dự án", value: "Anh ấy đã làm những dự án nào?" },
      { label: "Tải CV", value: "Tôi muốn tải CV" },
    ]
  ),

  goodbye: () => msg(
    `Cảm ơn bạn đã quan tâm đến portfolio của Victor!\n\nNếu bạn muốn trao đổi thêm hoặc sắp xếp phỏng vấn, vui lòng liên hệ qua email:\n**${KB.email}**\n\nChúc bạn một ngày làm việc hiệu quả và thành công!`,
    [
      { label: "Thông tin liên hệ", value: "Làm sao để liên hệ với Victor?" },
      { label: "Tải CV", value: "Tôi muốn tải CV" },
    ]
  ),

  unknown: () => msg(
    `Tôi là **VictorBot** — trợ lý AI của **Nguyễn Văn Thắng (Victor)**.\n\nVictor là lập trình viên Full-Stack tốt nghiệp năm 2026 tại ĐH Giao thông Vận tải TP.HCM (GPA 3.36/4.0), có thế mạnh chuyên sâu về React/Next.js, TypeScript, Node.js, NestJS, PostgreSQL, kiến trúc Microservices và Docker.\n\nTôi có thể giải đáp chi tiết về các dự án thực chiến, năng lực công nghệ, kế hoạch phỏng vấn hoặc gửi file CV chính thức của Victor. Bạn muốn tìm hiểu nội dung nào?`,
    [
      { label: "Victor là ai & định hướng?", value: "Victor là ai và định hướng nghề nghiệp là gì?" },
      { label: "Dự án Microservices nổi bật?", value: "Các dự án nổi bật của Victor là gì?" },
      { label: "Kỹ năng Full-Stack & DevOps?", value: "Kỹ năng công nghệ của Victor gồm những gì?" },
      { label: "Học vấn & GPA (3.36)?", value: "Học vấn và điểm GPA của Victor như thế nào?" },
      { label: "Tải CV (PDF)", value: "Tôi muốn tải CV của Victor" },
      { label: "Liên hệ phỏng vấn", value: "Làm sao để liên hệ phỏng vấn với Victor?" },
    ]
  ),
};

// ─── Public API ────────────────────────────────────────────────────────────

import { askGemini, askGeminiStream } from "./gemini-service";

export async function processUserMessageStreamAsync(
  input: string,
  history: BotMessage[] = [],
  onChunk: (accumulated: string) => void,
  signal?: AbortSignal,
  locale: string = "vi"
): Promise<BotMessage> {
  const isEn = locale === "en";
  const chatHistory = history.map((m) => ({
    role: m.role,
    text: m.text,
  }));

  const aiAnswer = await askGeminiStream(input, chatHistory, onChunk, signal, locale);

  if (aiAnswer) {
    const norm = normalize(input);
    const isCVRelated =
      norm.includes("cv") ||
      norm.includes("sv") ||
      norm.includes("resume") ||
      aiAnswer.toLowerCase().includes("nguyen_van_thang.pdf");

    const chips: BotChip[] = isEn
      ? [
          { label: "Featured Projects?", value: "What are Victor's most impressive projects?" },
          { label: "Full-Stack Skills?", value: "What technical skills does Victor have?" },
          { label: "Download Resume", value: "I would like to download Victor's resume." },
          { label: "Contact for Interview", value: "How can I contact Victor for an interview?" },
        ]
      : [
          { label: "Dự án Microservices nổi bật?", value: "Các dự án nổi bật của Victor là gì?" },
          { label: "Kỹ năng Full-Stack & DevOps?", value: "Kỹ năng công nghệ của Victor gồm những gì?" },
          { label: "Tải CV (PDF)", value: "Tôi muốn tải CV của Victor" },
          { label: "Liên hệ phỏng vấn", value: "Làm sao để liên hệ phỏng vấn với Victor?" },
        ];

    return {
      id: generateId(),
      role: "bot",
      type: isCVRelated ? "cv-download" : "text",
      text: aiAnswer,
      chips,
      timestamp: new Date(),
    };
  }

  // Fallback to local semantic engine
  const fallback = processUserMessage(input, locale);
  onChunk(fallback.text);
  return fallback;
}

export async function processUserMessageAsync(
  input: string,
  history: BotMessage[] = [],
  locale: string = "vi"
): Promise<BotMessage> {
  const chatHistory = history.map((m) => ({
    role: m.role,
    text: m.text,
  }));

  // 1. Try Google Gemini LLM for answering ANY arbitrary question
  const aiAnswer = await askGemini(input, chatHistory, locale);

  if (aiAnswer) {
    const norm = normalize(input);
    const isCVRelated =
      norm.includes("cv") ||
      norm.includes("sv") ||
      norm.includes("resume") ||
      aiAnswer.toLowerCase().includes("nguyen_van_thang.pdf");

    const isEn = locale === "en";
    const chips: BotChip[] = isEn
      ? [
          { label: "Featured Projects?", value: "What are Victor's most impressive projects?" },
          { label: "Full-Stack Skills?", value: "What technical skills does Victor have?" },
          { label: "Download Resume", value: "I would like to download Victor's resume." },
          { label: "Contact Victor", value: "How can I contact Victor?" },
        ]
      : [
          { label: "Dự án đã làm", value: "Anh ấy đã làm những dự án nào?" },
          { label: "Kỹ năng kỹ thuật", value: "Anh ấy biết những công nghệ gì?" },
          { label: "Tải CV", value: "Tôi muốn tải CV của anh ấy" },
          { label: "Liên hệ", value: "Làm sao để liên hệ với Victor?" },
        ];

    return {
      id: generateId(),
      role: "bot",
      type: isCVRelated ? "cv-download" : "text",
      text: aiAnswer,
      chips,
      timestamp: new Date(),
    };
  }

  // 2. Fallback to local semantic reading comprehension engine
  return processUserMessage(input, locale);
}

export function processUserMessage(input: string, locale: string = "vi"): BotMessage {
  const intent = detectIntent(input);
  if (locale === "en" && intent === "unknown") {
    return {
      id: generateId(),
      role: "bot",
      type: "chips",
      text: "I am **VictorBot** — official AI assistant for **Nguyen Van Thang (Victor)**.\n\nVictor is a final-year IT student graduating in 2026 from HCMC University of Transport (GPA 3.36/4.0), specialized in React/Next.js, TypeScript, Node.js, NestJS, PostgreSQL, Microservices architecture, and Docker.\n\nFeel free to ask about his projects, technical expertise, interview availability, or download his official resume below.",
      chips: [
        { label: "Who is Victor & Goals?", value: "Who is Victor and what are his career goals?" },
        { label: "Featured Microservices Projects?", value: "What are Victor's most impressive projects?" },
        { label: "Full-Stack & DevOps Skills?", value: "What technical skills does Victor have?" },
        { label: "Download Resume (PDF)", value: "I would like to download Victor's resume." },
        { label: "Interview & Contact Info", value: "How can I contact Victor for an interview?" },
      ],
      timestamp: new Date(),
    };
  }
  const response = RESPONSES[intent]();
  return { id: generateId(), timestamp: new Date(), ...response } as BotMessage;
}

export function createUserMessage(text: string): BotMessage {
  return { id: generateId(), role: "user", type: "text", text, timestamp: new Date() };
}

export function getWelcomeMessage(locale: string = "vi"): BotMessage {
  const isEn = locale === "en";
  return {
    id: generateId(),
    role: "bot",
    type: "chips",
    text: isEn
      ? `Hi there! I am **VictorBot** — AI assistant for **Nguyen Van Thang (Victor)**.\n\nI can answer questions about Victor's microservices architecture, featured projects (EV Charging, StudyHub), Full-Stack skillset, academic background, or help you download his CV and schedule an interview. What would you like to know?`
      : `Xin chào! Tôi là **VictorBot** — trợ lý AI của **Nguyễn Văn Thắng (Victor)**.\n\nTôi có thể giải đáp chi tiết về kinh nghiệm phát triển hệ thống phân tán, các dự án thực chiến (EV Charging, StudyHub), kỹ năng Full-Stack, thông tin học vấn hoặc hỗ trợ tải CV và kết nối phỏng vấn. Bạn muốn tìm hiểu về nội dung nào?`,
    chips: isEn
      ? [
          { label: "Who is Victor & Goals?", value: "Who is Victor and what are his career goals?" },
          { label: "Featured Microservices Projects?", value: "What are Victor's most impressive projects?" },
          { label: "Full-Stack & DevOps Skills?", value: "What technical skills does Victor have?" },
          { label: "Education & GPA (3.36)?", value: "Tell me about Victor's university education and GPA." },
          { label: "Download Resume (PDF)", value: "I would like to download Victor's resume." },
          { label: "Interview & Contact Info", value: "How can I contact Victor for an interview?" },
        ]
      : [
          { label: "Victor là ai & định hướng?", value: "Victor là ai và định hướng nghề nghiệp là gì?" },
          { label: "Dự án Microservices nổi bật?", value: "Các dự án nổi bật của Victor là gì?" },
          { label: "Kỹ năng Full-Stack & DevOps?", value: "Kỹ năng công nghệ của Victor gồm những gì?" },
          { label: "Học vấn & GPA (3.36)?", value: "Học vấn và điểm GPA của Victor như thế nào?" },
          { label: "Tải CV Nguyễn Văn Thắng (PDF)", value: "Tôi muốn tải CV của Victor" },
          { label: "Liên hệ phỏng vấn", value: "Làm sao để liên hệ phỏng vấn với Victor?" },
        ],
    timestamp: new Date(),
  };
}
