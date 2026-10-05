/**
 * SuggestedChips.tsx
 * Quick-action suggestion chips shown on first open.
 */
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "Victor làm được gì?",
  "Dự án nổi bật?",
  "Liên hệ thế nào?",
  "Tải CV của Victor",
  "Trình độ kỹ thuật?",
  "Đang tìm việc gì?",
];

interface Props {
  onSelect: (text: string) => void;
}

export function SuggestedChips({ onSelect }: Props) {
  return (
    <div className="px-4 pb-3">
      <p className="text-xs text-muted-foreground mb-2">Cau hoi goi y:</p>
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-full border transition-all duration-200",
              "border-[#5865f2]/40 text-[#5865f2] dark:text-[#7289da]",
              "hover:bg-[#5865f2]/10 hover:border-[#5865f2] hover:scale-[1.02]",
              "dark:border-[#5865f2]/50 dark:hover:bg-[#5865f2]/20",
              "active:scale-95 font-medium"
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
