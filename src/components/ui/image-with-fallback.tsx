import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ImageOff } from "lucide-react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  style?: React.CSSProperties;
  variant?: "project" | "icon";
};

function splitClassName(className?: string) {
  if (!className) return { wrapperClasses: "", imgClasses: "" };
  const tokens = className.split(/\s+/);
  const wrapperTokens: string[] = [];
  const imgTokens: string[] = [];

  tokens.forEach((token) => {
    // Image-specific classes: object-fit, filters, transitions, scales, and opacity hover
    if (
      /^(object)-(cover|contain|fill|none|scale-down|top|bottom|left|right|center)$/.test(token) ||
      /^(transition|duration|ease|delay|scale|hover:scale)-/.test(token) ||
      token === "dark:invert" ||
      token === "invert" ||
      token === "transition-all" ||
      token === "transition"
    ) {
      imgTokens.push(token);
    } else {
      wrapperTokens.push(token);
    }
  });

  return {
    wrapperClasses: wrapperTokens.join(" "),
    imgClasses: imgTokens.join(" "),
  };
}

export function ImageWithFallback({
  src,
  alt,
  className,
  wrapperClassName,
  style,
  variant = "project",
  width,
  height,
  ...restProps
}: Props) {
  const [status, setStatus] = useState<"loading" | "error" | "loaded">("loading");
  const { wrapperClasses, imgClasses } = splitClassName(className);

  const wrapperStyle: React.CSSProperties = {
    ...style,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  return (
    <div
      className={cn("relative overflow-hidden", wrapperClasses, wrapperClassName)}
      style={wrapperStyle}
    >
      {status !== "loaded" && <Placeholder status={status} variant={variant} />}
      {status !== "error" && (
        <img
          className={cn(
            "transition-opacity duration-300",
            status === "loaded" ? "opacity-100" : "opacity-0 absolute inset-0",
            "w-full h-full",
            imgClasses,
          )}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          {...restProps}
        />
      )}
    </div>
  );
}

function Placeholder({
  status,
  variant,
}: {
  status: "loading" | "error";
  variant: "project" | "icon";
}) {
  if (variant === "icon") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 rounded-md">
        {status === "loading" ? (
          <div className="w-full h-full animate-pulse bg-neutral-200 dark:bg-slate-800 rounded-md" />
        ) : (
          <ImageOff className="w-1/2 h-1/2 text-neutral-400 dark:text-slate-500 max-w-4 max-h-4 min-w-[8px] min-h-[8px]" />
        )}
      </div>
    );
  }

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

