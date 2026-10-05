"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowDown, Send, ExternalLink, Download, Trash2, RotateCcw, X } from "lucide-react";
import { VictorBotIcon } from "./victor-bot-icon";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocale } from "@/locales/use-locale";
import {
  BotMessage,
  processUserMessageStreamAsync,
  createUserMessage,
  getWelcomeMessage,
  KB,
} from "./chatbot-engine";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ─── Liquid Shockwave Panel Animation Variants ──────────────────────────────
const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.78,
    clipPath: "circle(26px at calc(100% - 26px) calc(100% - 26px))",
    filter: "blur(14px) brightness(1.8)",
    transformOrigin: "bottom right",
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "circle(180% at calc(100% - 26px) calc(100% - 26px))",
    filter: "blur(0px) brightness(1)",
    transformOrigin: "bottom right",
    transition: {
      clipPath: {
        duration: 0.65,
        ease: [0.12, 0.98, 0.28, 1] as [number, number, number, number],
      },
      scale: {
        type: "spring",
        stiffness: 340,
        damping: 22,
        mass: 0.7,
      },
      opacity: {
        duration: 0.18,
        ease: "easeOut",
      },
      filter: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    clipPath: "circle(26px at calc(100% - 26px) calc(100% - 26px))",
    filter: "blur(12px)",
    transformOrigin: "bottom right",
    transition: {
      clipPath: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
      scale: {
        duration: 0.28,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
      opacity: {
        duration: 0.18,
        ease: "easeIn",
      },
    },
  },
};

// ─── Markdown renderer for bot responses ──────────────────────────────────
const BotMarkdown = ({ content }: { content: string }) => (
  <div
    className={cn(
      "prose prose-sm dark:prose-invert max-w-none break-words",
      "prose-p:my-1 prose-p:leading-relaxed text-[13px] font-normal text-zinc-200",
      "prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-li:text-zinc-300",
      "prose-strong:font-medium prose-strong:text-white",
      "prose-a:text-white prose-a:underline prose-a:underline-offset-4 prose-a:decoration-white/40 hover:prose-a:decoration-white prose-a:font-medium",
      "prose-code:bg-white/[0.08] prose-code:border prose-code:border-white/10 prose-code:text-zinc-200 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-xs prose-code:font-mono",
      "prose-pre:bg-black/60 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:text-xs prose-pre:p-3 prose-pre:text-zinc-200",
      "prose-h1:text-sm prose-h2:text-sm prose-h3:text-xs prose-h4:text-xs prose-headings:font-medium prose-headings:text-white",
      "prose-blockquote:border-l-white/20 prose-blockquote:text-zinc-400 prose-blockquote:italic"
    )}
  >
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
          >
            {children}
            <ExternalLink className="w-3 h-3 inline opacity-70" />
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);

// ─── Bot Bubble (LEFT) ─────────────────────────────────────────────────────
const BotBubble = ({
  msg,
  isStreaming,
  onChipClick,
  onRetry,
  isLast,
}: {
  msg: BotMessage;
  isStreaming?: boolean;
  onChipClick: (v: string) => void;
  onRetry?: () => void;
  isLast?: boolean;
}) => {
  const { locale, t } = useLocale();

  const handleCVDownload = () => {
    const a = document.createElement("a");
    a.href = KB.cvPath;
    a.download = KB.cvName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const showCVButton =
    msg.type === "cv-download" ||
    (!isStreaming &&
      /tải.*cv|tai.*cv|download.*cv|cv.*pdf|resume/i.test(msg.text.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex items-start gap-2.5 max-w-[92%] mb-3.5"
    >
      {/* Bot Avatar */}
      <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-zinc-200">
        <VictorBotIcon size={14} className="text-zinc-200" />
      </div>

      <div className="flex-1 min-w-0">
        {/* Meta row */}
        <div className="flex items-center gap-1.5 mb-1 pl-0.5">
          <span className="font-medium text-[11px] text-zinc-400 tracking-tight">VictorBot</span>
          <span className="text-[9px] text-zinc-600 font-mono px-1 rounded border border-white/10 bg-white/[0.03]">AI</span>
          <span className="text-[10px] text-zinc-600 font-mono">
            {msg.timestamp.toLocaleTimeString(locale === "en" ? "en-US" : "vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Bubble */}
        <div className="rounded-2xl rounded-tl-xs px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] text-zinc-200 text-[13px] backdrop-blur-xs">
          <BotMarkdown content={msg.text} />
          {isStreaming && (
            <span className="inline-block w-1.5 h-3.5 bg-white/70 ml-1 animate-pulse align-middle rounded-xs" />
          )}
        </div>

        {/* CV download */}
        {showCVButton && (
          <button
            onClick={handleCVDownload}
            className="mt-2.5 inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/30 text-white text-xs font-medium px-3.5 py-2 rounded-xl transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-zinc-300" />
            <span>{t("chat", "downloadCV")} — {t("chat", "cvFileName")}</span>
          </button>
        )}

        {/* Links */}
        {msg.type === "link-list" && msg.links && (
          <div className="mt-2 flex flex-col gap-1">
            {msg.links.map((link, i) => (
              <button
                key={i}
                onClick={() => window.open(link.url, "_blank", "noopener noreferrer")}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all cursor-pointer"
              >
                <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
                <span>{link.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Chips */}
        {!isStreaming && msg.chips && msg.chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {msg.chips.map((chip, i) => (
              <button
                key={i}
                onClick={() => onChipClick(chip.value)}
                className="text-xs px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer backdrop-blur-xs active:scale-95"
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}

        {/* Retry */}
        {isLast && msg.text.includes(t("chat", "errorNotice")) && onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t("chat", "retry")}</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

// ─── User Bubble (RIGHT, no avatar) ───────────────────────────────────────
const UserBubble = ({ msg }: { msg: BotMessage }) => {
  const { locale } = useLocale();
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex flex-col items-end ml-auto max-w-[85%] mb-3.5"
    >
      <div className="rounded-2xl rounded-tr-xs px-4 py-2.5 bg-white/10 border border-white/15 text-white text-[13px] leading-relaxed whitespace-pre-wrap break-words font-normal">
        {msg.text}
      </div>
      <span className="text-[10px] text-zinc-600 mt-1 pr-1 font-mono">
        {msg.timestamp.toLocaleTimeString(locale === "en" ? "en-US" : "vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </motion.div>
  );
};

// ─── Typing Indicator ─────────────────────────────────────────────────────
const TypingBubble = () => {
  const { t } = useLocale();
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      className="flex items-center gap-2 ml-1 mb-3"
    >
      <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300">
        <VictorBotIcon size={12} className="text-zinc-300" />
      </div>
      <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.07]">
        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
      </div>
      <span className="text-[10px] text-zinc-500 font-mono">{t("chat", "typing")}</span>
    </motion.div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────
export const OnlineUsers = () => {
  const { locale, t } = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<BotMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null);
  const [unreads, setUnreads] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  // Welcome message
  useEffect(() => {
    setMessages([getWelcomeMessage(locale)]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) return [getWelcomeMessage(locale)];
      return prev;
    });
  }, [locale]);

  const scrollToBottom = useCallback((smooth = true) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
    setUnreads(0);
    isAtBottomRef.current = true;
    setShowScrollButton(false);
  }, []);

  useEffect(() => {
    if (isAtBottomRef.current) scrollToBottom();
    else if (!isOpen) setUnreads((c) => c + 1);
  }, [messages, isOpen, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setUnreads(0);
      setTimeout(() => {
        scrollToBottom(false);
        inputRef.current?.focus();
      }, 80);
    }
  }, [isOpen, scrollToBottom]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
    isAtBottomRef.current = dist < 80;
    setShowScrollButton(dist > 120);
    if (isAtBottomRef.current) setUnreads(0);
  };

  const handleClear = () => {
    abortRef.current?.abort();
    setMessages([getWelcomeMessage(locale)]);
    setIsTyping(false);
    setStreamingMsgId(null);
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg = createUserMessage(trimmed);
    const botId = `bot-${Date.now()}`;
    const initialBotMsg: BotMessage = { id: botId, role: "bot", type: "text", text: "", timestamp: new Date() };

    setMessages((prev) => [...prev, userMsg, initialBotMsg]);
    setInputValue("");
    isAtBottomRef.current = true;
    setIsTyping(true);
    setStreamingMsgId(botId);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      let accumulated = "";
      const updatedBotMsg = await processUserMessageStreamAsync(
        trimmed,
        messages,
        (chunk) => {
          accumulated = chunk;
          setMessages((prev) => prev.map((m) => (m.id === botId ? { ...m, text: chunk } : m)));
        },
        ctrl.signal,
        locale
      );
      setMessages((prev) =>
        prev.map((m) => (m.id === botId ? { ...updatedBotMsg, text: accumulated || updatedBotMsg.text } : m))
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        setMessages((prev) => prev.filter((m) => m.id !== botId));
      } else {
        setMessages((prev) =>
          prev.map((m) => (m.id === botId ? { ...m, text: t("chat", "errorNotice") } : m))
        );
      }
    } finally {
      setIsTyping(false);
      setStreamingMsgId(null);
      abortRef.current = null;
    }
  };

  const handleRetry = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser) sendMessage(lastUser.text);
  };

  const isAwaitingFirstToken =
    isTyping && streamingMsgId && messages.find((m) => m.id === streamingMsgId)?.text === "";

  if (!mounted) return null;

  return createPortal(
    <>
      {/* ── Expanding Water Ripple Shockwaves (Cơn sóng lan tỏa mạnh mẽ) ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Full screen flash burst */}
            <motion.div
              key="screen-flash"
              className="pointer-events-none fixed inset-0 z-[99990]"
              initial={{ opacity: 0.18 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              style={{
                background: "radial-gradient(ellipse at 100% 100%, rgba(56,189,248,0.22) 0%, rgba(52,211,153,0.12) 30%, transparent 65%)",
              }}
              aria-hidden="true"
            />
            {/* Primary Neon Cyan Shockwave Ring — huge */}
            <motion.div
              key="shockwave-ring-1"
              className="pointer-events-none fixed bottom-5 right-5 sm:bottom-6 sm:right-6 rounded-full z-[99997]"
              initial={{ width: 60, height: 60, scale: 0.9, opacity: 1 }}
              animate={{ scale: [0.9, 18], opacity: [1, 0.7, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: [0.12, 0.98, 0.28, 1] }}
              style={{
                border: "4px solid rgba(56, 189, 248, 1)",
                boxShadow: "0 0 80px 12px rgba(56, 189, 248, 0.9), inset 0 0 50px rgba(56, 189, 248, 0.7)",
              }}
              aria-hidden="true"
            />
            {/* Secondary Emerald Ring */}
            <motion.div
              key="shockwave-ring-2"
              className="pointer-events-none fixed bottom-5 right-5 sm:bottom-6 sm:right-6 rounded-full z-[99997]"
              initial={{ width: 60, height: 60, scale: 0.9, opacity: 1 }}
              animate={{ scale: [0.9, 13], opacity: [1, 0.8, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.72, delay: 0.06, ease: [0.12, 0.98, 0.28, 1] }}
              style={{
                border: "3.5px solid rgba(52, 211, 153, 1)",
                boxShadow: "0 0 60px 8px rgba(52, 211, 153, 0.85), inset 0 0 35px rgba(52, 211, 153, 0.6)",
              }}
              aria-hidden="true"
            />
            {/* Tertiary white sparkling ring */}
            <motion.div
              key="shockwave-ring-3"
              className="pointer-events-none fixed bottom-5 right-5 sm:bottom-6 sm:right-6 rounded-full z-[99997]"
              initial={{ width: 60, height: 60, scale: 0.9, opacity: 0.95 }}
              animate={{ scale: [0.9, 8], opacity: [0.95, 0.6, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.12, 0.98, 0.28, 1] }}
              style={{
                border: "2.5px solid rgba(255, 255, 255, 1)",
                boxShadow: "0 0 40px 6px rgba(255, 255, 255, 0.9)",
              }}
              aria-hidden="true"
            />
            {/* Fourth ultra-fast tight ring */}
            <motion.div
              key="shockwave-ring-4"
              className="pointer-events-none fixed bottom-5 right-5 sm:bottom-6 sm:right-6 rounded-full z-[99997]"
              initial={{ width: 60, height: 60, scale: 0.9, opacity: 1 }}
              animate={{ scale: [0.9, 5.5], opacity: [1, 0.5, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38, delay: 0.0, ease: [0.12, 0.98, 0.28, 1] }}
              style={{
                border: "5px solid rgba(165, 243, 252, 1)",
                boxShadow: "0 0 30px 4px rgba(165, 243, 252, 1)",
              }}
              aria-hidden="true"
            />
          </>
        )}
      </AnimatePresence>

      <div
        ref={wrapperRef}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[99999] flex flex-col items-end pointer-events-auto"
        style={{ bottom: "20px", right: "20px" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!isOpen ? (
            <motion.button
              key="chat-bubble"
              type="button"
              aria-label={t("chat", "triggerTooltip")}
              title={t("chat", "triggerTooltip")}
              onClick={() => setIsOpen(true)}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.35, opacity: 0, filter: "blur(6px)" }}
              transition={{
                scale: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.18, ease: "easeOut" },
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className={cn(
                "w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center relative cursor-pointer",
                "bg-[#070a14]/92 hover:bg-[#0e1428]/95 text-white",
                "border border-white/20 hover:border-white/35 backdrop-blur-2xl",
                "shadow-[0_12px_36px_rgba(0,0,0,0.7),0_0_24px_rgba(255,255,255,0.06),inset_0_1px_1px_rgba(255,255,255,0.2)]",
                "transition-colors duration-200"
              )}
            >
              <VictorBotIcon size={24} className="text-zinc-100" />

              {/* Online green indicator dot */}
              <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#070a14] shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              </span>

              {/* Unread badge */}
              {unreads > 0 && (
                <span className="absolute -top-1.5 -left-1.5 flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full text-[10px] font-bold bg-white text-black shadow-md border border-black/10">
                  {unreads > 9 ? "9+" : unreads}
                </span>
              )}
            </motion.button>
          ) : (
            <motion.div
              key="chat-panel"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ transformOrigin: "bottom right", maxHeight: "min(540px, calc(100dvh - 40px))" }}
              className={cn(
                "w-[360px] sm:w-[400px] max-w-[calc(100vw-28px)]",
                "h-[540px]",
                "flex flex-col rounded-2xl overflow-hidden",
                "bg-[#05070e]/96 backdrop-blur-2xl",
                "border border-white/[0.12]",
                "shadow-[0_24px_64px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.06)]",
                "text-zinc-200 relative"
              )}
              role="dialog"
              aria-label={t("chat", "triggerTooltip")}
              aria-modal="true"
            >
              {/* Luminous wave crest ring — bright leading edge inside the box */}
              <motion.div
                className="pointer-events-none absolute -bottom-8 -right-8 rounded-full z-30"
                initial={{ width: 60, height: 60, scale: 0.5, opacity: 1 }}
                animate={{ scale: [0.5, 18], opacity: [1, 0.85, 0] }}
                transition={{ duration: 0.7, ease: [0.12, 0.98, 0.28, 1] }}
                style={{
                  border: "3.5px solid rgba(56, 189, 248, 1)",
                  boxShadow: "0 0 60px 8px rgba(56, 189, 248, 1), inset 0 0 30px rgba(52, 211, 153, 0.9)",
                }}
                aria-hidden="true"
              />
              {/* Second internal wave ring — emerald */}
              <motion.div
                className="pointer-events-none absolute -bottom-8 -right-8 rounded-full z-30"
                initial={{ width: 60, height: 60, scale: 0.5, opacity: 1 }}
                animate={{ scale: [0.5, 12], opacity: [1, 0.7, 0] }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.12, 0.98, 0.28, 1] }}
                style={{
                  border: "2.5px solid rgba(52, 211, 153, 1)",
                  boxShadow: "0 0 40px 6px rgba(52, 211, 153, 0.9)",
                }}
                aria-hidden="true"
              />

              {/* Internal expanding radial flash — bright white burst */}
              <motion.div
                className="pointer-events-none absolute inset-0 z-0"
                initial={{ opacity: 1, scale: 0.2, transformOrigin: "bottom right" }}
                animate={{ opacity: 0, scale: 2.5 }}
                transition={{ duration: 0.65, ease: [0.12, 0.98, 0.28, 1] }}
                style={{
                  background: "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.55) 0%, rgba(56,189,248,0.35) 25%, rgba(52,211,153,0.2) 45%, transparent 65%)",
                }}
                aria-hidden="true"
              />
              {/* Second softer wave pulse */}
              <motion.div
                className="pointer-events-none absolute inset-0 z-0"
                initial={{ opacity: 0.7, scale: 0.15, transformOrigin: "bottom right" }}
                animate={{ opacity: 0, scale: 3 }}
                transition={{ duration: 0.8, delay: 0.05, ease: [0.12, 0.98, 0.28, 1] }}
                style={{
                  background: "radial-gradient(circle at 100% 100%, rgba(56,189,248,0.3) 0%, rgba(52,211,153,0.15) 35%, transparent 60%)",
                }}
                aria-hidden="true"
              />
            {/* Stardust grid texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
              aria-hidden="true"
            />
            {/* Top nebula glow */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04)_0%,transparent_70%)]"
              aria-hidden="true"
            />

            {/* Header */}
            <div className="relative z-10 h-[52px] px-4 flex items-center justify-between border-b border-white/[0.07] bg-white/[0.015] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
                  <VictorBotIcon size={14} className="text-zinc-200" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-white tracking-tight">
                    <span>VictorBot</span>
                    <span className="text-[9px] text-zinc-500 font-mono px-1 rounded border border-white/10 bg-white/[0.03]">AI</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_5px_rgba(52,211,153,0.7)]" />
                    <span>{t("chat", "onlineStatus")}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 1 && (
                  <button
                    onClick={handleClear}
                    title={t("chat", "clearChat")}
                    aria-label={t("chat", "clearChat")}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  title={t("chat", "close") || "Close"}
                  aria-label="Close"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="relative flex flex-col flex-1 overflow-hidden z-10">
              <ScrollArea
                className="flex-1 h-full"
                data-lenis-prevent
                ref={chatContainerRef}
                type="always"
                onScrollCapture={handleScroll}
              >
                <div className="p-4 space-y-1">
                  {messages.map((msg, idx) => {
                    if (msg.id === streamingMsgId && msg.text === "") return null;
                    if (msg.role === "user") return <UserBubble key={msg.id} msg={msg} />;
                    return (
                      <BotBubble
                        key={msg.id}
                        msg={msg}
                        isStreaming={msg.id === streamingMsgId}
                        onChipClick={(v) => sendMessage(v)}
                        onRetry={handleRetry}
                        isLast={idx === messages.length - 1}
                      />
                    );
                  })}

                  <AnimatePresence>{isAwaitingFirstToken && <TypingBubble />}</AnimatePresence>
                  <div ref={bottomRef} className="h-1" />
                </div>
              </ScrollArea>

              {/* Scroll-to-bottom pill */}
              <AnimatePresence>
                {showScrollButton && (
                  <motion.button
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    onClick={() => scrollToBottom(true)}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a0d15]/95 hover:bg-[#111520] border border-white/15 text-white text-xs cursor-pointer backdrop-blur-md transition-colors"
                  >
                    {unreads > 0 ? (
                      <><span>{unreads} {t("chat", "newMessages")}</span><ArrowDown className="w-3.5 h-3.5" /></>
                    ) : (
                      <><span>{t("chat", "scrollToBottom")}</span><ArrowDown className="w-3.5 h-3.5" /></>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Input bar */}
            <div className="relative z-10 p-3 pt-2 bg-black/50 border-t border-white/[0.07] backdrop-blur-md">
              <div className="rounded-xl bg-white/[0.04] border border-white/10 focus-within:border-white/25 focus-within:bg-white/[0.06] transition-all p-1 pl-3.5 flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(inputValue)}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-500/70 min-w-0"
                  placeholder={t("chat", "inputPlaceholder")}
                  autoComplete="off"
                  disabled={isTyping}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={t("chat", "sendButton")}
                  className="h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/25 text-white shrink-0 cursor-pointer disabled:opacity-20 disabled:pointer-events-none transition-all border border-white/10"
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>,
    document.body
  );
};

export default OnlineUsers;
