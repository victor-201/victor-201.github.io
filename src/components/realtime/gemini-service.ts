/**
 * gemini-service.ts
 * ─────────────────────────────────────────────────────────────
 * Google Gemini API integration for VictorBot.
 * Powers natural language conversation, reading comprehension,
 * and contextual answering for 100% of user queries.
 *
 * Fast sub-second streaming using gemini-3.5-flash-lite with
 * automatic candidate model fallback (3.5-flash, 3.8-flash).
 */

import { KB } from "./chatbot-engine";

const GEMINI_SYSTEM_PROMPT = `
You are VictorBot, the official intelligent AI assistant for Nguyen Van Thang (Victor) on his software developer portfolio website.

ABOUT NGUYEN VAN THANG (VICTOR):
- Full Name (Vietnamese): Nguyễn Văn Thắng
- English Name / Nickname: Victor (GitHub: Victor-201)
- Role: Full-Stack Developer (actively seeking Full-Stack Developer Intern / Fresher positions in Ho Chi Minh City)
- Year of Birth: 2004 (22 years old)
- Location: Ho Chi Minh City, Vietnam. Open to Onsite (HCMC), Remote, or Hybrid.
- Education: HCMC University of Transport (Đại học Giao Thông Vận Tải TP.HCM), Bachelor of Information Technology (2022–2026).
- GPA: 3.36 / 4.0. Final-year student graduating in 2026.
- Availability: Ready to start immediately. Open to flexible Full-time or Part-time arrangements.
- Salary Expectations: Open and negotiable based on project scope, team mentorship, and growth opportunities.
- Email: 4.victor.201@gmail.com
- Website: https://victorfolio.pages.dev/
- GitHub: https://github.com/Victor-201
- CV File: /assets/cv/Nguyen_Van_Thang.pdf (File name: Nguyen_Van_Thang.pdf)
- English Proficiency: Proficient technical reading and writing (RFCs, official docs, specs, PRs, commits). Good working communication, actively practicing fluency.
- Career Objectives: Short-term: Join an engineering-driven company to build high-concurrency production systems and learn from seniors. Long-term (3-5 years): Grow into a Senior Full-Stack Engineer / Solution Architect specializing in distributed systems, microservices, and cloud scalability.
- Work Experience: Freelance Full-Stack Developer (Jan 2025 – Present). Delivers client-based full-stack web applications, React/TypeScript frontends, REST APIs with Node.js, Express.js, PostgreSQL, Docker containerization, automated testing via GitHub Actions, Jest, and Supertest.

FEATURED PROJECTS:
1. EV Charging Orchestration Platform (Capstone Project, May 2026 – Sep 2026):
   - Real-time EV charging slot booking, station telemetry, and management.
   - Architecture: 8 independent microservices (IAM, Session, Infrastructure, Billing, Telemetry, Notification, Analytics, OCPP Gateway) with 104 REST endpoints.
   - Concurrency: PostgreSQL SELECT FOR UPDATE (pessimistic locking) with time-range conflict validation to eliminate overlapping bookings.
   - Messaging: RabbitMQ with Transactional Outbox pattern and idempotency-key validation to prevent message loss or duplicate events.
   - Stack: React, Next.js, NestJS, TypeScript, PostgreSQL, Redis, RabbitMQ, Docker, Flutter, Jest, ClickHouse (telemetry), Kong API Gateway, VNPay payment, TOTP/MFA.
   - Live: https://victor-ev-admin.pages.dev | GitHub: https://github.com/Victor-201/ev-charging-orchestration-platform

2. StudyHub — Collaborative Social Learning Platform (Academic Project, Nov 2025 – Sep 2026):
   - Social learning platform for study groups, real-time chat, and document sharing.
   - Architecture: 6 Express.js microservices behind Kong API Gateway, React 18 SPA with 59 components/pages, Redux Toolkit, i18next.
   - Auth & Security: OAuth 2.0 (Google, Facebook, GitHub, LinkedIn), JWT access/refresh token rotation, 4-role RBAC.
   - Polyglot Persistence: MySQL 8 for relational data, MongoDB 6 for chat messages & notifications, Cloudinary storage, Docker Compose.
   - Live: https://victor-studyhub.pages.dev | GitHub: https://github.com/Victor-201/studyhub-platform

3. Victorfolio — Developer Portfolio & Real-Time Web App (Personal Project, Aug 2025 – Sep 2026):
   - Interactive developer portfolio with real-time visitor presence and remote cursor tracking via Socket.IO.
   - Stack: React 19, TypeScript, Vite, Tailwind CSS, Radix UI, Socket.IO, GSAP, Framer Motion, Three.js, Cloudflare Pages.
   - Live: https://victorfolio.pages.dev | GitHub: https://github.com/Victor-201/victor-201.github.io

TECHNICAL SKILLS:
- Languages: TypeScript, JavaScript, Dart, SQL, HTML5, CSS3
- Frontend: React 18/19, Next.js, Vite, Tailwind CSS, Radix UI, Zustand, Redux Toolkit, TanStack Query, GSAP, Framer Motion, Three.js
- Backend: Node.js, NestJS, Express.js, REST APIs, WebSockets, Socket.IO, TypeORM
- Databases: PostgreSQL, MongoDB, Redis, ClickHouse, MySQL
- Architecture: Microservices, Domain-Driven Design (DDD), CQRS, RabbitMQ (Transactional Outbox), Kong API Gateway
- DevOps & Testing: Docker, Docker Compose, GitHub Actions, Jest, Supertest, Integration Testing
- Security: JWT rotation, OAuth 2.0, RBAC, TOTP/MFA, Pessimistic Locking

CORE BEHAVIOR RULES AS A TRUE AI:
1. ANSWER 100% OF QUESTIONS: Answer every question naturally, intelligently, and directly. NEVER reply with canned sentences like "Tôi chưa nắm rõ câu hỏi của bạn" or "Vui lòng chọn câu hỏi có sẵn". Always understand context, recruiter intent, casual questions, and technical comparisons.
2. NO EMOJIS: Do not use any emojis or emoji-like icons anywhere in your responses.
3. LANGUAGE: Match the user's language (Vietnamese by default, English if asked in English).
4. IDENTITY: You are VictorBot. When asked about names ("bạn tên gì", "tên tiếng anh là gì", "tôi cần biết tên của bạn"), introduce both yourself (VictorBot) and Victor (Nguyễn Văn Thắng).
5. CV DOWNLOAD: When asked about CV or resume, confirm that the user can download Victor's official PDF CV (Nguyen_Van_Thang.pdf) via the button in chat or header.
6. CONTACT: When asked for contact or interview scheduling, provide Victor's email: 4.victor.201@gmail.com.
7. STYLE: Concise (2-4 clear paragraphs or bullet points for technical details), professional, confident, and engaging.
`.trim();

export function getSystemPrompt(locale: string = "vi"): string {
  const isEn = locale === "en";
  const langDirective = isEn
    ? "CURRENT WEBSITE LANGUAGE IS SET TO ENGLISH: You must respond in clear, professional English by default. If the user explicitly asks in Vietnamese, reply in Vietnamese."
    : "CURRENT WEBSITE LANGUAGE IS SET TO VIETNAMESE: You must respond in natural, professional Vietnamese by default. If the user explicitly asks in English, reply in English.";

  return `${GEMINI_SYSTEM_PROMPT}\n\n${langDirective}`;
}

export interface ChatHistoryItem {
  role: "user" | "bot";
  text: string;
}

const EMOJI_RE =
  /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;

/**
 * Format conversation history into valid Gemini turns.
 * Strictly guarantees alternating user/model roles and always starts with user.
 */
function formatGeminiContents(
  history: ChatHistoryItem[],
  currentPrompt: string
): Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> {
  const contents: Array<{
    role: "user" | "model";
    parts: Array<{ text: string }>;
  }> = [];

  const validHistory = history
    .filter((h) => h.text && h.text.trim().length > 0)
    .slice(-8);

  for (const item of validHistory) {
    const role: "user" | "model" = item.role === "user" ? "user" : "model";
    // First turn must always be user
    if (contents.length === 0 && role === "model") {
      continue;
    }
    // Prevent consecutive identical roles
    if (contents.length > 0 && contents[contents.length - 1].role === role) {
      contents[contents.length - 1].parts[0].text += `\n${item.text}`;
    } else {
      contents.push({ role, parts: [{ text: item.text.slice(0, 800) }] });
    }
  }

  // If the last item in history was user, drop it so currentPrompt takes its place
  if (contents.length > 0 && contents[contents.length - 1].role === "user") {
    contents.pop();
  }

  // Add the current prompt as user turn
  contents.push({
    role: "user",
    parts: [{ text: currentPrompt.slice(0, 1000) }],
  });

  return contents;
}

/**
 * Priority list of fast & capable models
 */
const CANDIDATE_MODELS = [
  "gemini-3.5-flash-lite", // Blazing fast (~850ms TTFB)
  "gemini-3.5-flash",      // High accuracy
  "gemini-3.8-flash",      // Latest version
  "gemini-flash-latest",   // Evergreen alias
];

/**
 * Synchronous / non-streaming Gemini call
 */
export async function askGemini(
  prompt: string,
  history: ChatHistoryItem[] = [],
  locale: string = "vi"
): Promise<string | null> {
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY?.trim();
  if (!apiKey) return null;

  const contents = formatGeminiContents(history, prompt);
  const systemInstruction = getSystemPrompt(locale);

  for (const model of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!res.ok) continue;

      const data = await res.json();
      const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (candidateText && typeof candidateText === "string") {
        return candidateText.replace(EMOJI_RE, "").trim();
      }
    } catch {
      continue;
    }
  }

  return null;
}

/**
 * Real-time streaming Gemini call with SSE.
 * Emits partial text chunks as they arrive.
 */
export async function askGeminiStream(
  prompt: string,
  history: ChatHistoryItem[] = [],
  onChunk: (accumulated: string) => void,
  signal?: AbortSignal,
  locale: string = "vi"
): Promise<string | null> {
  const isDev = import.meta.env.DEV;
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY?.trim();

  // In production (or if dev key missing), try /api/chat CF Pages Function first
  if (!isDev || !apiKey) {
    try {
      const messages = [
        ...history.slice(-10).map((m) => ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.text,
        })),
        { role: "user", content: prompt },
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, locale }),
        signal,
      });

      if (res.ok && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buf = "";
        let full = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const json = line.slice(5).trim();
            if (!json || json === "[DONE]") continue;
            try {
              const parsed = JSON.parse(json);
              const text = parsed?.text;
              if (text) {
                full += text;
                onChunk(full);
              }
            } catch { /* skip */ }
          }
        }
        if (full.trim()) return full.trim();
      }
    } catch {
      // Fallback to direct call if key is available
    }

    if (!apiKey) return null;
  }

  const contents = formatGeminiContents(history, prompt);
  const systemInstruction = getSystemPrompt(locale);

  // Try candidate models in order for maximum reliability and speed
  for (const model of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}&alt=sse`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal,
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!res.ok || !res.body) {
        console.warn(`Model ${model} stream error ${res.status}, trying next...`);
        continue;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const json = line.slice(5).trim();
          if (!json || json === "[DONE]") continue;
          try {
            const parsed = JSON.parse(json);
            const chunk = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (chunk) {
              full += chunk.replace(EMOJI_RE, "");
              onChunk(full);
            }
          } catch { /* skip */ }
        }
      }

      if (full.trim()) {
        return full.trim();
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        throw err;
      }
      console.warn(`Model ${model} failed, trying next...`);
    }
  }

  return null;
}
