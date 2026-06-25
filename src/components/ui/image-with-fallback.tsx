import { cn } from "@/lib/utils";
import React, { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  style?: React.CSSProperties;
};

export function ImageWithFallback({ src, alt, className, wrapperClassName, style }: Props) {
  const [status, setStatus] = useState<"loading" | "error" | "loaded">("loading");

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)} style={style}>
      {status !== "loaded" && <Placeholder status={status} />}
      {status !== "error" && (
        <img
          className={cn(
            "transition-opacity duration-300",
            status === "loaded" ? "opacity-100" : "opacity-0 absolute inset-0",
            className,
          )}
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}
    </div>
  );
}

function Placeholder({ status }: { status: "loading" | "error" }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-lg",
        "dark:bg-slate-900 dark:border dark:border-slate-700",
        "bg-neutral-100 border border-neutral-200",
      )}
      style={{ aspectRatio: "3/2" }}
    >
      {status === "loading" ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-neutral-300 dark:border-slate-600 border-t-neutral-500 dark:border-t-slate-400 rounded-full animate-spin" />
          <span className="text-xs text-neutral-400 dark:text-slate-500">Loading</span>
        </div>
      ) : (
        <div className="absolute inset-0 bg-black/60 rounded-lg" />
      )}
    </div>
  );
}
