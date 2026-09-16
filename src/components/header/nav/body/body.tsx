import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { blur, translate } from "../../anim";
import { Link as LinkType } from "@/types";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import FunnyThemeToggle from "@/components/theme/funny-theme-toggle";
import { useLocale } from "@/locales/use-locale";

interface SelectedLink {
  isActive: boolean;
  index: number;
}

interface BodyProps {
  links: LinkType[];
  selectedLink: SelectedLink;
  setSelectedLink: (selectedLink: SelectedLink) => void;
  setIsActive: (isActive: boolean) => void;
}

export default function Body({
  links,
  selectedLink,
  setSelectedLink,
  setIsActive,
}: BodyProps) {
  const params = useLocation();
  const { t } = useLocale();
  const [currentHref, setCurrentHref] = useState("/");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { pathname, hash } = window.location;
    setCurrentHref(pathname + hash);
  }, [params]);

  const getChars = (word: string) => {
    let chars: React.JSX.Element[] = [];
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          className="pointer-events-none"
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>
      );
    });
    return chars;
  };

  return (
    <div className={cn("flex flex-wrap mt-[30px] flex-col items-end md:flex-row lg:max-w-[1200px] lg:mt-20")}>
      <FunnyThemeToggle className="w-6 h-6 mr-6 flex md:hidden" />
      {links.map((link, index) => {
        const { titleKey, href, target } = link;
        const title = t("common", titleKey) as string;

        return (
          <Link
            key={`l_${index}`}
            to={href}
            target={target}
            className="cursor-can-hover rounded-lg uppercase text-foreground no-underline"
          >
            <motion.p
              className={cn(
                "rounded-lg m-0 flex overflow-hidden whitespace-pre text-[32px] pr-[30px] pt-[10px] font-[350] lg:text-[5vw] lg:pr-[2vw]",
                currentHref !== href ? "text-muted-foreground" : "underline"
              )}
              onClick={() => {
                setIsActive(false);
                if (href.startsWith("/#") && currentHref === href) {
                  const targetId = href.split("#")[1];
                  document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              onMouseOver={() => setSelectedLink({ isActive: true, index })}
              onMouseLeave={() => setSelectedLink({ isActive: false, index })}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index
                  ? "open"
                  : "closed"
              }
            >
              {getChars(title)}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
}
