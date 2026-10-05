/**
 * ChatInput.tsx
 * Text input bar with send button, max-length, disabled state.
 */
import { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

const MAX_CHARS = 500;

export function ChatInput({ value, onChange, onSend, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const remaining = MAX_CHARS - value.length;
  const isNearLimit = remaining < 50;

  return (
    <div className="px-4 pb-4 pt-2">
      <div className={cn(
        "relative flex items-center gap-2 rounded-xl px-3 py-2.5 transition-all duration-200",
        "bg-secondary/60 dark:bg-zinc-800/70 border border-border/60",
        "focus-within:border-[#5865f2]/60 focus-within:bg-background/80 focus-within:shadow-sm"
      )}>
        <input
          ref={inputRef}
          id="chat-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoComplete="off"
          placeholder="Hỏi về Victor..."
          aria-label="Nhập câu hỏi"
          className={cn(
            "flex-1 bg-transparent outline-none border-none text-sm",
            "text-foreground placeholder:text-muted-foreground/60",
            "disabled:opacity-50 disabled:cursor-not-allowed min-w-0"
          )}
        />
        {isNearLimit && (
          <span className={cn(
            "text-[10px] font-mono flex-shrink-0",
            remaining <= 0 ? "text-red-500" : "text-muted-foreground"
          )}>
            {remaining}
          </span>
        )}
        <button
          onClick={onSend}
          disabled={!value.trim() || disabled}
          aria-label="Gửi tin nhắn"
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
            "transition-all duration-200",
            value.trim() && !disabled
              ? "bg-[#5865f2] hover:bg-[#4752c4] text-white shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
              : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
          )}
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
