"use client";

import { motion } from "framer-motion";
import { Server, Layers, ShieldCheck } from "lucide-react";
import { BlurIn } from "../reveal-animations";
import { useLocale } from "@/locales/use-locale";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { config } from "@/lib/app-config";
import { cn } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 16,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const AboutSection = () => {
  const { t } = useLocale();

  const pillars = [
    {
      icon: Server,
      title: t("about", "pillar1_title"),
      desc: t("about", "pillar1_desc"),
      color: "from-blue-500 to-indigo-500",
      iconColor: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
      borderColor: "hover:border-blue-500/30 dark:hover:border-blue-500/20",
    },
    {
      icon: Layers,
      title: t("about", "pillar2_title"),
      desc: t("about", "pillar2_desc"),
      color: "from-purple-500 to-pink-500",
      iconColor: "text-purple-600 dark:text-purple-400 bg-purple-500/10",
      borderColor: "hover:border-purple-500/30 dark:hover:border-purple-500/20",
    },
    {
      icon: ShieldCheck,
      title: t("about", "pillar3_title"),
      desc: t("about", "pillar3_desc"),
      color: "from-emerald-500 to-teal-500",
      iconColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
      borderColor: "hover:border-emerald-500/30 dark:hover:border-emerald-500/20",
    },
  ];

  return (
    <SectionWrapper id="about" className="min-h-screen scroll-mt-[80px]">
      <SectionHeader id="about" title={t("about", "title")} desc={t("about", "desc")} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-4 sm:px-8 mt-16 md:mt-24 items-start max-w-6xl mx-auto">

        {/* Left Column: Biography */}
        <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6">
          <BlurIn delay={0.2} duration={0.8}>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-zinc-200 tracking-tight">
              {t("about", "name")}
            </h3>
          </BlurIn>

          <BlurIn delay={0.4} duration={0.8}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("about", "bio1")}
            </p>
          </BlurIn>

          <BlurIn delay={0.6} duration={0.8}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("about", "bio2")}
            </p>
          </BlurIn>

          <BlurIn delay={0.8} duration={0.8}>
            <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start w-full">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm font-medium text-emerald-600 dark:text-emerald-400 shadow-sm">
                <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
                {t("about", "available")}
              </div>
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-secondary/50 hover:bg-secondary border border-border hover:border-primary/20 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 shadow-sm"
              >
                <span className="inline-block size-2 rounded-full bg-blue-500" />
                {config.email}
              </a>
            </div>
          </BlurIn>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
