"use client";
import {
  EXPERIENCE,
  SkillNames,
  SKILLS,
  getSkillIconUrl,
  type Experience,
} from "@/lib/app-config";
import { useLocale } from "@/locales/use-locale";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const cardTransition = (index: number) => ({
  duration: 0.4,
  delay: index * 0.1,
  ease: "easeOut" as const,
});

function isDarkColor(hex: string): boolean {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.08;
}

const ExperienceSection = () => {
  const { t } = useLocale();
  return (
    <SectionWrapper id="experience">
      <SectionHeader
        id="experience"
        title={t("common", "section.experience")}
        desc={t("common", "section.experienceDesc")}
      />
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto flex flex-col gap-8 md:gap-12 relative">
        <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-border hidden md:block -translate-x-1/2" />
        {EXPERIENCE.map((exp, index) => (
          <div key={exp.id} className="relative">
            <ExperienceCard experience={exp} index={index} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) => {
  const { t } = useLocale();
  const items = t("experience", "items");
  const expData = useMemo(
    () =>
      Array.isArray(items)
        ? items.find((e: { id: number }) => e.id === experience.id)
        : null,
    [items, experience.id],
  );

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      transition={cardTransition(index)}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card
        className={cn(
          "bg-card text-card-foreground border-border",
          "hover:border-primary/20 transition-colors duration-300",
          "shadow-sm hover:shadow-md",
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight">
                {expData?.title}
              </CardTitle>
              <div className="text-base font-medium text-muted-foreground">
                {expData?.company}
              </div>
            </div>
            <Badge
              variant="secondary"
              className="w-fit font-mono text-xs font-normal"
            >
              {experience.startDate} - {experience.endDate}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="list-disc list-outside ml-4 space-y-2 text-base text-muted-foreground leading-relaxed">
            {(expData?.description ?? []).map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skillName) => {
              const skill = SKILLS[skillName as SkillNames];
              return (
                <Badge
                  key={skillName}
                  variant="outline"
                  className="gap-2 text-xs font-normal bg-secondary/30 hover:bg-secondary/50 transition-colors border-transparent"
                >
                  <ImageWithFallback
                    src={getSkillIconUrl(skill)}
                    alt={t("skills", skill.name + ".label")}
                    className={cn(
                      "w-3.5 h-3.5 object-contain opacity-80",
                      isDarkColor(skill.color) && "dark:invert",
                    )}
                    variant="icon"
                  />
                  {t("skills", skill.name + ".label")}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceSection;
