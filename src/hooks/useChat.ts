/**
 * useChat.ts
 * Custom hook managing chat state + SSE streaming.
 *
 * Strategy:
 *  - Production (Cloudflare Pages): POST /api/chat  CF Pages Function (key server-side)
 *  - Local dev (Vite DEV):          calls Gemini API directly via VITE_GEMINI_API_KEY
 *    The key is only in .env (gitignored) and only used in dev, never shipped to prod.
 */

import { useState, useCallback, useRef } from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;      // full accumulated text
  streaming?: boolean;  // true while token stream is incoming
  error?: boolean;      // true when the message is an error notice
}

const MAX_HISTORY = 10;
const IS_DEV = import.meta.env.DEV;

let idCounter = 0;
function uid() {
  return `msg-${Date.now()}-${idCounter++}`;
}

// Dev-only: call Gemini directly from browser -----------------------------------------------
async function devCallGemini(
  history: Array<{ role: string; content: string }>,
  onChunk: (text: string) => void,
  signal: AbortSignal
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiKey = ((import.meta as any).env?.VITE_GEMINI_API_KEY as string | undefined)?.trim();
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY not set in .env");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const model = ((import.meta as any).env?.VITE_GEMINI_MODEL as string | undefined)?.trim() || "gemini-3.8-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}&alt=sse`;

  const contents = history.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content.slice(0, 500) }],
  }));

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      system_instruction: { parts: [{ text: DEV_SYSTEM_PROMPT }] },
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    }),
  });

  if (!res.ok || !res.body) throw new Error(`Gemini HTTP ${res.status}`);

  const EMOJI_RE = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";

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
        const text: string | undefined = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) onChunk(text.replace(EMOJI_RE, ""));
      } catch { /* skip malformed chunk */ }
    }
  }
}

// Production: consume SSE stream from /api/chat CF Pages Function ---------------------------
async function prodCallApi(
  history: Array<{ role: string; content: string }>,
  onChunk: (text: string) => void,
  signal: AbortSignal
): Promise<void> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: history }),
    signal,
  });

  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";

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
        const parsed = JSON.parse(json) as { text: string };
        if (parsed.text) onChunk(parsed.text);
      } catch { /* skip */ }
    }
  }
}

// Hook ------------------------------------------------------------------------------------------
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      const userMsg: ChatMessage = { id: uid(), role: "user", content: trimmed };
      setMessages((prev) => [...prev, userMsg]);

      const asstId = uid();
      setMessages((prev) => [
        ...prev,
        { id: asstId, role: "assistant", content: "", streaming: true },
      ]);
      setIsStreaming(true);
      abortRef.current = new AbortController();

      try {
        const history = [...messages, userMsg]
          .slice(-MAX_HISTORY)
          .map((m) => ({ role: m.role, content: m.content }));

        let accumulated = "";
        const onChunk = (chunk: string) => {
          accumulated += chunk;
          setMessages((prev) =>
            prev.map((m) => (m.id === asstId ? { ...m, content: accumulated } : m))
          );
        };

        if (IS_DEV) {
          await devCallGemini(history, onChunk, abortRef.current.signal);
        } else {
          await prodCallApi(history, onChunk, abortRef.current.signal);
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === asstId
              ? { ...m, streaming: false, content: accumulated || "(no response)" }
              : m
          )
        );
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          setMessages((prev) => prev.filter((m) => m.id !== asstId));
        } else {
          const isKeyMissing = err instanceof Error && err.message.includes("VITE_GEMINI_API_KEY");
          setMessages((prev) =>
            prev.map((m) =>
              m.id === asstId
                ? {
                    ...m,
                    streaming: false,
                    error: true,
                    content: isKeyMissing
                      ? "Chua cau hinh API key. Them VITE_GEMINI_API_KEY=... vao file .env roi restart dev server."
                      : "Xin loi, co loi ket noi. Ban co the thu lai khong?",
                  }
                : m
            )
          );
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, isStreaming]
  );

  const retryLast = useCallback(() => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    setMessages((prev) => {
      const idx = prev.findIndex((m) => m.id === lastUser.id);
      return prev.slice(0, idx);
    });
    sendMessage(lastUser.content);
  }, [messages, sendMessage]);

  const clearMessages = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setIsStreaming(false);
  }, []);

  return { messages, isStreaming, sendMessage, retryLast, clearMessages };
}

// Dev system prompt (only bundled in dev builds, tree-shaken in prod) -------------------------
const DEV_SYSTEM_PROMPT = `
Ban la "Victor Assistant", tro ly AI chinh thuc tren website portfolio cua Nguyen Van Thang (Victor), Full-Stack Developer tai TP. Ho Chi Minh.

CHI tra loi dua tren knowledge base duoi day. Khong bia so lieu, cong ty, muc luong.
Neu khong co thong tin: noi thang va goi y lien he 4.victor.201@gmail.com.

KNOWLEDGE BASE:
- Ten: Nguyen Van Thang (Victor), sinh 2004, TP.HCM. GitHub: Victor-201.
- Hoc van: DH Giao thong Van tai TP.HCM, CNTT, 2022-2026, GPA 3.36/4.0.
- Kinh nghiem: Freelance Full-Stack Developer tu 01/2025.
- Ky nang: TypeScript, React 18/19, Next.js, Node.js, NestJS, Express.js, PostgreSQL, MongoDB, Redis, Docker, RabbitMQ, Kong, OAuth 2.0, Jest, Flutter.
- Du an chinh:
  1. EV Charging Platform: 8 microservices, 104 REST endpoints, pessimistic locking, RabbitMQ Outbox. Demo: victor-ev-admin.pages.dev
  2. StudyHub: 6 microservices, OAuth 2.0 (Google/Facebook/GitHub/LinkedIn), real-time chat. Demo: victor-studyhub.pages.dev
  3. Victorfolio: portfolio nay, React 19, Socket.IO realtime presence. Demo: victorfolio.pages.dev
- Tim viec: Full-Stack Developer Intern/Fresher, TP.HCM, Onsite/Remote/Hybrid.
- Lien he: 4.victor.201@gmail.com | github.com/Victor-201 | victorfolio.pages.dev
- CV PDF: /assets/cv/Nguyen_Van_Thang.pdf

QUY TAC:
1. Tra loi dung ngon ngu nguoi dung (Viet/Anh). Mac dinh tieng Viet.
2. Ngan gon (2-5 cau). Chi dung bullet khi hoi chi tiet.
3. Khong dung emoji.
4. Chuyen nghiep nhung gan gui, noi ve Victor o ngoi thu ba.
5. Cau hoi ngoai pham vi portfolio: tu choi lich su.
`.trim();
