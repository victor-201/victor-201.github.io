import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import React from "react";
import { Button } from "../ui/button";
import { File } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiFacebook, SiGithub, SiInstagram } from "react-icons/si";
import { config } from "@/lib/app-config";
import { useLocale } from "@/locales/use-locale";

import SectionWrapper from "../ui/section-wrapper";

const HeroSection = () => {
  const { t } = useLocale();
  const { isLoading } = usePreloader();

  return (
    <SectionWrapper id="home" className={cn("w-full h-screen py-0!")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-2",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 sm:pb-16 md:p-20 lg:p-24 xl:px-0 xl:py-28",
          )}
        >
          {!isLoading && (
            <div className="flex flex-col">
              <div>
                <BlurIn delay={0.7}>
                  <p
                    className={cn(
                      "md:self-start mt-4 font-thin text-md text-slate-500 dark:text-zinc-400",
                      "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text ",
                    )}
                  >
                    {t("common", "hero.greeting")}
                    <br className="md:hidden" />
                  </p>
                </BlurIn>

                <BlurIn delay={1}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <h1
                        className={cn(
                          "-ml-1.5 leading-none font-thin text-slate-900 dark:text-white text-left",
                          "font-thin text-7xl md:text-7xl lg:text-8xl xl:text-9xl",
                          "cursor-default text-edge-outline font-display ",
                        )}
                      >
                        {t("seo", "name")}
                      </h1>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="dark:bg-white dark:text-black"
                    >
                      {t("common", "easterEgg.tooltip")}
                    </TooltipContent>
                  </Tooltip>
                </BlurIn>
                <BlurIn delay={1.2}>
                  <p
                    className={cn(
                      "md:self-start md:mt-4 font-thin text-md text-slate-500 dark:text-zinc-400",
                      "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text ",
                    )}
                  >
                    {t("common", "hero.role")}
                  </p>
                </BlurIn>
              </div>
              <div className="mt-8 flex flex-col gap-3 w-fit">
                <Link
                  to={
                    "https://drive.google.com/file/d/1O97WCk2DrO9x6SHOqf7LvRbmHkMgGIb4/view?usp=sharing"
                  }
                  target="_blank"
                  className="flex-1"
                >
                  <BoxReveal delay={2} width="100%">
                    <Button className="flex items-center gap-2 w-full">
                      <File size={24} />
                      <p>{t("common", "hero.downloadResume")}</p>
                    </Button>
                  </BoxReveal>
                </Link>
                <div className="md:self-start flex gap-3">
                  <Button
                    variant={"outline"}
                    className="block w-full overflow-hidden"
                    onClick={() => {
                      const el = document.getElementById("contact");
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }}
                  >
                    {t("common", "hero.hireMe")}
                  </Button>
                  <div className="flex items-center h-full gap-2">
                    <Link to={config.social.facebook} target="_blank">
                      <Button variant={"outline"}>
                        <SiFacebook size={24} />
                      </Button>
                    </Link>
                    <Link
                      to={config.social.instagram}
                      target="_blank"
                      className="cursor-can-hover"
                    >
                      <Button variant={"outline"}>
                        <SiInstagram size={24} />
                      </Button>
                    </Link>
                    <Link
                      to={config.social.github}
                      target="_blank"
                      className="cursor-can-hover"
                    >
                      <Button variant={"outline"}>
                        <SiGithub size={24} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid col-span-1"></div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
