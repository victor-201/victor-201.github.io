/**
 * MessageList.tsx
 * Scrollable list of MessageBubble items with auto-scroll to bottom.
 */
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { SuggestedChips } from "./SuggestedChips";
import type { ChatMessage } from "@/hooks/useChat";
import { VictorBotIcon } from "../realtime/victor-bot-icon";

interface Props {
  messages: ChatMessage[];
  showChips: boolean;
  onChipSelect: (text: string) => void;
  onRetry: () => void;
}

export function MessageList({ messages, showChips, onChipSelect, onRetry }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="flex-1 min-h-0" data-lenis-prevent>
      <div className="p-4 space-y-4 min-h-full">
        {/* Welcome state */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center space-y-3 pt-8 pb-4 opacity-80">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center shadow-lg">
              <VictorBotIcon size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Victor Assistant</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-[200px]">
                Xin chào! Tôi có thể giúp bạn tìm hiểu về Victor, dự án và cách liên hệ.
              </p>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onRetry={msg.error ? onRetry : undefined}
          />
        ))}

        <div ref={bottomRef} className="h-px" />
      </div>

      {/* Suggested chips — shown only when no messages yet */}
      {showChips && <SuggestedChips onSelect={onChipSelect} />}
    </ScrollArea>
  );
}
