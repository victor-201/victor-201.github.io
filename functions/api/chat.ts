/**
 * functions/api/chat.ts
 * Cloudflare Pages Function - POST /api/chat
 * SSE streaming proxy to Google Gemini. API key stays server-side.
 * Rate limiting, CORS, prompt injection protection built-in.
 */

import { getSystemPrompt } from '../../src/data/knowledge';

interface Env {
  GEMINI_API_KEY: string;
  GEMINI_MODEL?: string;
  ALLOWED_ORIGIN?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
  locale?: string;
}

// Rate limiting
const ipHits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

function corsHeaders(origin: string, allowed: string): HeadersInit {
  const ok =
    allowed === '*' ||
    origin === allowed ||
    origin.endsWith('.pages.dev') ||
    origin === 'http://localhost:5173' ||
    origin === 'http://localhost:4173';
  return {
    'Access-Control-Allow-Origin': ok ? origin : allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get('origin') ?? '';
  const allowed = env.ALLOWED_ORIGIN ?? 'https://victorfolio.pages.dev';
  const cors = corsHeaders(origin, allowed);

  const ip =
    request.headers.get('CF-Connecting-IP') ??
    request.headers.get('X-Forwarded-For') ??
    'unknown';
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', ...cors },
    });
  }

  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...cors },
    });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...cors },
    });
  }

  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json', ...cors },
    });
  }

  const MAX_TURNS = 10;
  const sanitized = body.messages.slice(-MAX_TURNS).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: String(m.content ?? '').slice(0, 500) }],
  }));

  const model = env.GEMINI_MODEL ?? 'gemini-3.8-flash';
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}&alt=sse`;

  const SYSTEM_PROMPT = getSystemPrompt();

  const payload = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: sanitized,
    generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  };

  let geminiRes: Response;
  try {
    geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Upstream network error' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', ...cors },
    });
  }

  if (!geminiRes.ok || !geminiRes.body) {
    return new Response(JSON.stringify({ error: 'Upstream error' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', ...cors },
    });
  }

  const EMOJI_RE = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  (async () => {
    const reader = geminiRes.body!.getReader();
    let buf = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop() ?? '';
      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const json = line.slice(5).trim();
        if (!json || json === '[DONE]') continue;
        try {
          const parsed = JSON.parse(json);
          const text: string | undefined =
            parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const clean = text.replace(EMOJI_RE, '');
            await writer.write(encoder.encode('data: ' + JSON.stringify({ text: clean }) + '\n\n'));
          }
        } catch { /* skip */ }
      }
    }
    await writer.write(encoder.encode('data: [DONE]\n\n'));
    await writer.close();
  })().catch(() => writer.abort());

  return new Response(readable as unknown as ReadableStream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
      ...cors,
    },
  });
};

export const onRequestOptions: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get('origin') ?? '';
  const allowed = env.ALLOWED_ORIGIN ?? 'https://victorfolio.pages.dev';
  return new Response(null, { status: 204, headers: corsHeaders(origin, allowed) });
};

