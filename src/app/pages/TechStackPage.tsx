"use client";
import React from "react";
import { SEO } from "@/infra/SEO";
import { SKILLS, getSkillIconUrl } from "@/lib/app-config";
import { useLocale } from "@/locales/use-locale";

function TechStackPage() {
  const { t } = useLocale();
  return (
    <>
      <SEO title={t("seo", "techStackPageTitle")} />
      <div className="container mx-auto px-4 pt-24 pb-20 text-zinc-300">
        <h1 className="text-4xl mb-8">{t("seo", "techStackPageHeading")}</h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {Object.values(SKILLS).map((skill) => (
            <div
              key={skill.id}
              className="flex flex-col items-center gap-2 p-3 border border-zinc-800 rounded-xl bg-zinc-900/40"
            >
              <img
                src={getSkillIconUrl(skill)}
                alt={t("skills", skill.name + ".label")}
                width={32}
                height={32}
                className="w-6 h-6 object-contain"
              />
              <span className="text-[11px] text-zinc-400 text-center leading-tight">
                {t("skills", skill.name + ".label")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TechStackPage;
