import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { opacity, background } from "./anim";
import Nav from "./nav";
import { cn } from "@/lib/utils";
import FunnyThemeToggle from "../theme/funny-theme-toggle";
import { Button } from "../ui/button";
import { config } from "@/lib/app-config";
import { useLocale } from "@/locales/use-locale";
import OnlineUsers from "../realtime/online-users";
import { GitHubStarsButton } from "../ui/shadcn-io/github-stars-button";
import LocaleToggle from "../locale-toggle";

interface HeaderProps {
  loader?: boolean;
}

const Header = ({ loader }: HeaderProps) => {
  const { t } = useLocale();
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      {/* Blur overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            variants={background}
            initial="initial"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[999] bg-transparent backdrop-blur-lg backdrop-saturate-[1.8]"
          />
        )}
      </AnimatePresence>

      <motion.header
        className={cn(
          "fixed inset-x-0 z-[1000] w-[95%] h-[var(--header-height)] mx-auto my-[15px] px-[30px] py-[15px] bg-[#D9D9D9]/20 backdrop-blur-xl [--angle:65deg] [--run:calc(var(--header-height)/tan(65deg))] [clip-path:polygon(round_12px,0_0,100%_0,calc(100%-var(--run))_100%,var(--run)_100%)] transition-colors delay-100 duration-500 ease-in",
          isActive && "h-auto [clip-path:none] rounded-[12px]"
        )}
        style={{
          background: isActive ? "hsl(var(--background) / .1)" : undefined,
        }}
        initial={{
          y: -80,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          delay: loader ? 3.5 : 0,
          duration: 0.8,
        }}
      >
        <div className="relative flex h-full items-center justify-between lowercase text-[12px] font-normal min-[600px]:text-[15px]">
          <Link to="/" className="flex items-center justify-center text-foreground no-underline pr-[12px]">
            <Button variant={"link"} className="text-xl">
              {t("seo", "author")}
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            <FunnyThemeToggle className="h-10 w-[calc(var(--header-height)*1.25)] md:flex" />

            <OnlineUsers />

            {config.githubUsername && (
              <GitHubStarsButton
                username={config.githubUsername}
                repo={config.githubRepo}
                className="inline-flex h-10 items-center"
              />
            )}

            <LocaleToggle />

            <Button
              variant={"ghost"}
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "m-0 p-0 h-10 bg-transparent flex items-center justify-center gap-3 cursor-pointer",
              )}
            >
              <div className="relative hidden md:flex items-center">
                <motion.p
                  variants={opacity}
                  animate={!isActive ? "open" : "closed"}
                  className="m-0"
                >
                  Menu
                </motion.p>
                <motion.p
                  variants={opacity}
                  animate={isActive ? "open" : "closed"}
                  className="m-0 absolute opacity-0"
                >
                  Close
                </motion.p>
              </div>

              <div
                className={cn(
                  "relative w-[22.5px] pointer-events-none",
                  "before:block before:relative before:h-px before:w-full before:bg-[hsl(var(--foreground))] before:content-[''] before:[transition:all_1s_cubic-bezier(0.76,0,0.24,1)]",
                  "after:block after:relative after:h-px after:w-full after:bg-[hsl(var(--foreground))] after:content-[''] after:[transition:all_1s_cubic-bezier(0.76,0,0.24,1)]",
                  isActive
                    ? "before:top-[-1px] before:rotate-45 after:top-[1px] after:-rotate-45"
                    : "before:top-[-4px] after:top-[4px]"
                )}
              ></div>
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isActive && <Nav setIsActive={setIsActive} />}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
