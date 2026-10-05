/**
 * MessageBubble.tsx
 * Renders a single chat message bubble with full Markdown support.
 * Links open in new tab. Streaming shows a blinking cursor.
 */
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AlertCircle, RefreshCw, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/hooks/useChat";

interface Props {
  message: ChatMessage;
  onRetry?: () => void;
}

export function MessageBubble({ message, onRetry }: Props) {
  const isUser = message.role === "user";
  const isError = message.error;

  return (
    <div className={cn("flex gap-3 group", isUser && "flex-row-reverse")}>
      {/* Avatar */}
      <div className="flex-shrink-0 mt-0.5">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            You
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5865f2] to-[#7289da] flex items-center justify-center shadow-sm">
            <Bot className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Bubble */}
      <div className={cn("flex-1 min-w-0 max-w-[85%]", isUser && "flex flex-col items-end")}>
        {/* Name row */}
        <div className={cn("flex items-center gap-1.5 mb-1", isUser && "flex-row-reverse")}>
          <span className={cn("text-xs font-semibold",
            isUser ? "text-emerald-500" : "text-[#5865f2] dark:text-[#7289da]"
          )}>
            {isUser ? "You" : "Victor Assistant"}
          </span>
          {!isUser && (
            <span className="bg-[#5865f2] text-white text-[9px] px-1 py-0.5 rounded font-bold leading-none">
              AI
            </span>
          )}
        </div>

        {/* Content */}
        <div className={cn(
          "rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-[#5865f2] text-white rounded-tr-sm"
            : isError
              ? "bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded-tl-sm"
              : "bg-secondary/80 dark:bg-zinc-800/80 text-foreground rounded-tl-sm border border-border/50"
        )}>
          {isError ? (
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p>{message.content}</p>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500 dark:text-red-400 hover:underline"
                  >
                    <RefreshCw className="w-3 h-3" /> Thử lại
                  </button>
                )}
              </div>
            </div>
          ) : message.streaming && message.content === "" ? (
            /* Loading dots while waiting for first token */
            <div className="flex items-center gap-1 py-1">
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0ms] opacity-60" />
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:150ms] opacity-60" />
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:300ms] opacity-60" />
            </div>
          ) : isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <div className={cn(
              "prose prose-sm dark:prose-invert max-w-none",
              "prose-p:my-1 prose-p:leading-relaxed",
              "prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5",
              "prose-strong:font-semibold",
              "prose-a:text-[#5865f2] prose-a:no-underline hover:prose-a:underline",
              "prose-code:bg-zinc-200 dark:prose-code:bg-zinc-700 prose-code:rounded prose-code:px-1 prose-code:text-xs",
              "prose-pre:bg-zinc-900 prose-pre:rounded-lg prose-pre:text-xs",
              "prose-h1:text-base prose-h2:text-sm prose-h3:text-sm",
              "prose-blockquote:border-l-[#5865f2] prose-blockquote:text-muted-foreground"
            )}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
              {/* Blinking cursor while streaming */}
              {message.streaming && (
                <span className="inline-block w-0.5 h-4 bg-current ml-0.5 animate-pulse align-middle" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
