import React, { useEffect, useState } from "react";
import { animate, motion, type Easing, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Download } from "lucide-react";
import { useLocale } from "@/locales/use-locale";
import {
  personal,
  education,
  freelance,
  projects,
  skills,
  cvFile,
  footer,
  sections,
  labels,
} from "@/data/resume";

const PAPER_W = 794;
const FALL_DURATION = 3.4;

const smooth = (t: number): number => t * t * (3 - 2 * t);
const easeOutCubic = (t: number): number => 1 - (1 - t) * (1 - t) * (1 - t);
const easeOutQuart = (t: number): number => 1 - (1 - t) * (1 - t) * (1 - t) * (1 - t);

export default function ResumePage() {
  const { t } = useLocale();
  const [footerOverlap, setFooterOverlap] = useState(0);
  const [landed, setLanded] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.title = t("common", "resume.pageTitle") || "Resume — Nguyen Van Thang";
  }, [t]);

  useEffect(() => {
    const handleScroll = () => {
      const footers = document.querySelectorAll("footer");
      if (!footers.length) return;
      const siteFooter = footers[footers.length - 1];
      const footerRect = siteFooter.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerRect.top < windowHeight) {
        setFooterOverlap(windowHeight - footerRect.top);
      } else {
        setFooterOverlap(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleExportPDF = () => {
    const a = document.createElement("a");
    a.href = cvFile.path;
    a.download = cvFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const [spawn] = useState(() => {
    if (typeof window === "undefined") return { x: 320, y: -320 };
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxOffset = Math.max(0, (vw - PAPER_W) / 2);
    return {
      x: Math.min(Math.max(vw * 0.32, 160), Math.max(maxOffset, 220)),
      y: -(vh * 0.3) - 40,
    };
  });

  const progress = useMotionValue(reduceMotion ? 1 : 0);
  const enterX = useTransform(progress, (p: number) => spawn.x * (1 - easeOutCubic(smooth(p))));
  const enterY = useTransform(progress, (p: number) => spawn.y * (1 - easeOutQuart(smooth(p))));

  const rot = useMotionValue(0);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const scale = useMotionValue(1);

  const bend1 = useMotionValue(0);
  const bend2 = useMotionValue(0);
  const shear = useMotionValue(0);

  const bend1s = useSpring(bend1, { stiffness: 42, damping: 12, mass: 1.6 });
  const bend2s = useSpring(bend2, { stiffness: 60, damping: 15, mass: 1.3 });
  const shears = useSpring(shear, { stiffness: 30, damping: 12, mass: 2 });

  const bend = useTransform([bend1s, bend2s], ([a, b]: number[]) => a + 0.45 * b);
  const skew = shears;

  useEffect(() => {
    if (reduceMotion) {
      progress.set(1);
      return;
    }

    const ease: Easing[] = ["easeIn", "easeOut", "easeInOut", "easeInOut"];
    const fall = animate(progress, 1, {
      duration: FALL_DURATION,
      ease: "linear",
      onComplete: () => setLanded(true),
    });
    const aRot = animate(rot, [0, 13, 7, -3, 1.6, 0], { duration: FALL_DURATION, times: [0, 0.28, 0.5, 0.7, 0.85, 1], ease: "easeInOut" });
    const aRotX = animate(rotX, [0, -6, 3, -1.2, 0.5, 0], { duration: FALL_DURATION, times: [0, 0.28, 0.5, 0.7, 0.85, 1], ease: "easeInOut" });
    const aRotY = animate(rotY, [0, -9, 4, -2, 0.8, 0], { duration: FALL_DURATION, times: [0, 0.28, 0.5, 0.7, 0.85, 1], ease: "easeInOut" });
    const aScale = animate(scale, [0, 1.05, 1.015, 1.004, 1.001, 1], { duration: FALL_DURATION, times: [0, 0.28, 0.5, 0.7, 0.85, 1], ease: "easeInOut" });
const b1 = animate(bend1, [0, 5.5, 2.2, 0.4, 0], { duration: FALL_DURATION, times: [0, 0.3, 0.55, 0.8, 1], ease });
const b2 = animate(bend2, [0, 1.6, -1, 0.3, 0], { duration: FALL_DURATION, times: [0, 0.32, 0.58, 0.82, 1], ease });
const sh = animate(shear, [0, 2.2, 0.9, 0.25, 0], { duration: FALL_DURATION, times: [0, 0.3, 0.55, 0.8, 1], ease });

    return () => {
      fall.stop();
      aRot.stop();
      aRotX.stop();
      aRotY.stop();
      aScale.stop();
      b1.stop();
      b2.stop();
      sh.stop();
    };
  }, [reduceMotion, progress, rot, rotX, rotY, scale, bend1, bend2, shear]);

  useEffect(() => {
    if (!landed || reduceMotion) return;

    const w1 = animate(bend1, [0, 1.5, -1.05, 0.5, -1.3, 0], { duration: 7.4, times: [0, 0.16, 0.4, 0.62, 0.84, 1], ease: "easeInOut", repeat: Infinity });
    const w2 = animate(bend2, [0, 0.8, -0.5, 0.25, -0.65, 0], { duration: 10.6, times: [0, 0.2, 0.44, 0.66, 0.88, 1], ease: "easeInOut", repeat: Infinity });
    const ws = animate(shear, [0, 0.32, -0.2, 0.12, -0.28, 0], { duration: 5.9, times: [0, 0.17, 0.4, 0.62, 0.84, 1], ease: "easeInOut", repeat: Infinity });

    return () => {
      w1.stop();
      w2.stop();
      ws.stop();
    };
  }, [landed, reduceMotion, bend1, bend2, shear]);

  return (
    <div className="cv-page-wrapper relative min-h-screen bg-transparent text-[#2B2118] font-['Inter',Arial,sans-serif] pt-[100px] pb-16 px-3 sm:px-6 flex flex-col items-center print:bg-[#FAF8F4] print:p-0 print:m-0">
      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }

        .cv-page {
          width: 210mm !important;
          min-width: 210mm !important;
          max-width: 210mm !important;
          height: 297mm !important;
          min-height: 297mm !important;
          max-height: 297mm !important;
          box-sizing: border-box !important;
          overflow: hidden !important;
          flex-shrink: 0 !important;
        }
        .cv-layout-row {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          width: 100% !important;
          height: 100% !important;
          gap: 0 !important;
          align-items: flex-start !important;
          justify-content: space-between !important;
          box-sizing: border-box !important;
        }
        .cv-main-col {
          width: 68% !important;
          min-width: 68% !important;
          max-width: 68% !important;
          flex: 0 0 68% !important;
          padding-right: 5mm !important;
          order: 1 !important;
          box-sizing: border-box !important;
        }
        .cv-sidebar-col {
          width: 32% !important;
          min-width: 32% !important;
          max-width: 32% !important;
          flex: 0 0 32% !important;
          padding: 4mm !important;
          order: 2 !important;
          box-sizing: border-box !important;
        }

        .cv-fall-path {
          perspective: 2200px;
          will-change: transform;
        }
        .cv-page {
          transform-origin: 50% 0%;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .cv-fall-path,
          .cv-page {
            animation: none !important;
            transform: none !important;
            filter: none !important;
            opacity: 1 !important;
            perspective: none !important;
          }
        }

        @media print {
          html,
          html.dark,
          body,
          body.dark {
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #FAF8F4 !important;
            background-color: #FAF8F4 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color: #2B2118 !important;
            overflow: hidden !important;
          }

          *, *::before, *::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          header,
          .print\\:hidden,
          [class*="print:hidden"],
          nav,
          [class*="z-[99]"],
          [class*="z-99"],
          [class*="z-[1000]"],
          #cursor-root {
            display: none !important;
          }

          body > footer,
          #root footer:not(.cv-footer) {
            display: none !important;
          }

          .cv-page,
          .cv-fall-path {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
            filter: none !important;
            perspective: none !important;
            will-change: auto !important;
          }

          .cv-page-wrapper {
            background: #FAF8F4 !important;
            padding: 0 !important;
            margin: 0 !important;
            min-height: auto !important;
            width: 210mm !important;
            display: block !important;
          }

          .cv-page {
            width: 210mm !important;
            min-width: 210mm !important;
            max-width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            padding: 10mm 14mm !important;
            margin: 0 !important;
            background: #FAF8F4 !important;
            background-color: #FAF8F4 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            display: block !important;
          }

          .cv-layout-row {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            width: 100% !important;
            gap: 0 !important;
            align-items: flex-start !important;
            justify-content: space-between !important;
            box-sizing: border-box !important;
          }

          .cv-main-col {
            width: 68% !important;
            max-width: 68% !important;
            flex: 0 0 68% !important;
            padding-right: 5mm !important;
            order: 1 !important;
            background: #FAF8F4 !important;
            background-color: #FAF8F4 !important;
            display: block !important;
            box-sizing: border-box !important;
          }

          .cv-sidebar-col {
            width: 32% !important;
            max-width: 32% !important;
            flex: 0 0 32% !important;
            padding: 4mm !important;
            order: 2 !important;
            background: #EFE9DE !important;
            background-color: #EFE9DE !important;
            border-radius: 3pt !important;
            display: block !important;
            box-sizing: border-box !important;
          }

          .section,
          .experience-item,
          .project,
          .education-item {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      <div className="w-full overflow-x-auto flex flex-col items-center pt-4 pb-28 print:p-0 print:m-0 print:overflow-visible">
        <motion.div
          className="cv-fall-path shrink-0 my-[20px] print:my-0"
          style={{
            x: enterX,
            y: enterY,
            rotate: rot,
            rotateX: rotX,
            rotateY: rotY,
            scale,
            willChange: "transform",
          }}
        >
          <motion.main
            className="cv-page relative z-10 w-[210mm] min-w-[210mm] max-w-[210mm] h-[297mm] min-h-[297mm] max-h-[297mm] bg-[#FAF8F4] text-[#2B2118] shadow-[0_10px_40px_rgba(0,0,0,0.22)] rounded-sm p-[10mm_14mm] print:p-[10mm_14mm] print:shadow-none print:rounded-none overflow-hidden shrink-0 box-border"
            style={{
              transformOrigin: "50% 0%",
              transformPerspective: 2200,
              rotateX: bend,
              skewX: skew,
              willChange: "transform",
            }}
          >
            <div className="cv-layout-row flex flex-row flex-nowrap items-start justify-between gap-0 w-full h-full box-border">
              <section className="cv-main-col w-[68%] min-w-[68%] max-w-[68%] shrink-0 bg-[#FAF8F4] pr-[5mm] order-1 box-border">
                <div className="p-0">
                  <h1 className="font-bold text-[25pt] leading-none tracking-[-0.3pt] mb-[6pt] text-[#2B2118]">
                    {personal.fullName}
                  </h1>
                  <div className="font-medium text-[11pt] leading-[1.2] tracking-[0.4px] uppercase text-[#B9863C] mb-[4pt]">
                    {personal.role}
                  </div>
                  <p className="text-[9pt] font-normal leading-[1.3] text-[#2B2118] mb-[6pt] max-w-full">
                    {personal.bio}
                  </p>
                </div>

                <div className="section mt-[10pt] mb-0 print:break-inside-avoid">
                  <h2 className="font-bold text-[10.5pt] leading-[1.2] tracking-[0.15pt] uppercase text-[#2B2118] pb-[3pt] mb-[5pt] border-b-[0.6pt] border-[#8A5A34]">
                    {sections.freelance}
                  </h2>

                  <article className="experience-item mb-[6pt] print:break-inside-avoid">
                    <div className="flex items-center gap-[4pt] text-[8pt] font-normal text-[#8A5A34] leading-[1.25] mb-[1pt]">
                      <span className="w-[4pt] h-[4pt] rounded-full bg-[#8A5A34] shrink-0" />
                      {freelance.period}
                    </div>
                    <div className="text-[10pt] font-semibold text-[#2B2118] leading-[1.2] mb-[2pt]">
                      <span className="font-semibold">{freelance.title}</span> &middot;{" "}
                      <span className="text-[#8A5A34] font-semibold">{freelance.location}</span>
                    </div>
                    <ul className="pl-[13pt] flex flex-col list-none p-0 m-0">
                      {freelance.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="relative pl-[8pt] text-[8.8pt] font-normal leading-[1.28] text-[#2B2118] mb-[1.5pt] last:mb-0 before:content-[''] before:absolute before:left-0 before:top-[5pt] before:w-[3pt] before:h-[3pt] before:rounded-full before:bg-[#B9863C]"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>

                <div className="section mt-[10pt] mb-0 print:break-inside-avoid">
                  <h2 className="font-bold text-[10.5pt] leading-[1.2] tracking-[0.15pt] uppercase text-[#2B2118] pb-[3pt] mb-[5pt] border-b-[0.6pt] border-[#8A5A34]">
                    {sections.projects}
                  </h2>

                  {projects.map((project, idx) => (
                    <article
                      key={project.id}
                      className={`project ${idx < projects.length - 1 ? "mb-[6pt]" : "mb-0"} print:break-inside-avoid`}
                    >
                      <div className="flex items-center gap-[4pt] text-[8pt] font-normal text-[#8A5A34] leading-[1.25] mb-[1pt]">
                        <span className="w-[4pt] h-[4pt] rounded-full bg-[#8A5A34] shrink-0" />
                        {project.period}
                      </div>
                      <h3 className="text-[10pt] font-semibold text-[#2B2118] leading-[1.2] mb-[1pt]">
                        {project.title}
                      </h3>
                      <div className="text-[8pt] font-normal text-[#6B5D4E] leading-[1.25] mb-[1.5pt]">
                        {project.type}
                      </div>
                      <p className="text-[9pt] font-normal text-[#6B5D4E] leading-[1.3] mb-[2pt]">
                        {project.description}
                      </p>
                      <ul className="pl-[13pt] flex flex-col list-none p-0 m-0">
                        {project.bullets.map((bullet, i) => (
                          <li
                            key={i}
                            className="relative pl-[8pt] text-[8.8pt] font-normal leading-[1.28] text-[#2B2118] mb-[1.5pt] last:mb-0 before:content-[''] before:absolute before:left-0 before:top-[5pt] before:w-[3pt] before:h-[3pt] before:rounded-full before:bg-[#B9863C]"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-[2pt] text-[8pt] font-normal leading-[1.25] text-[#6B5D4E]">
                        <strong className="text-[#2B2118] font-semibold">{labels.tech}</strong>{" "}
                        {project.tech}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="cv-footer flex justify-between items-center px-0 pt-[3mm] mt-[4pt] border-t border-[#DCD1BE] text-[7.5pt] leading-[1.2] text-[#6B5D4E]">
                  <span>{footer.label}</span>
                </div>
              </section>

              <aside className="cv-sidebar-col w-[32%] min-w-[32%] max-w-[32%] shrink-0 bg-[#EFE9DE] rounded-sm p-[4mm] order-2 box-border">
                <div className="p-0">
                  <div className="w-[30mm] h-[40mm] rounded-[3pt] overflow-hidden relative mx-auto mb-[4mm] bg-[#40301F] shadow-[0_2px_10px_rgba(64,48,31,0.35)] print:shadow-none group">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#40301F] to-[#332615] text-[#B9863C] font-bold text-[14pt] tracking-[1px]">
                      {personal.initials}
                    </div>
                    <img
                      src={personal.avatar}
                      alt={personal.fullName}
                      className="absolute inset-0 w-full h-full object-cover object-[center_top] transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>

                  <ul className="mt-[6pt] flex flex-col gap-[4pt] list-none p-0 m-0">
                    <li className="flex items-center gap-[4pt] text-[8.5pt] font-normal leading-[1.3] text-[#2B2118] break-words">
                      <span className="w-[14pt] h-[14pt] rounded-full border-[1px] border-[#8A5A34] bg-[#FAF8F4] flex items-center justify-center shrink-0">
                        <svg className="w-[7pt] h-[7pt] stroke-[#B9863C] fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12z" />
                          <circle cx="12" cy="9" r="2.4" />
                        </svg>
                      </span>
                      <span>{personal.location}</span>
                    </li>

                    <li className="flex items-center gap-[4pt] text-[8.5pt] font-normal leading-[1.3] text-[#2B2118] break-words">
                      <span className="w-[14pt] h-[14pt] rounded-full border-[1px] border-[#8A5A34] bg-[#FAF8F4] flex items-center justify-center shrink-0">
                        <svg className="w-[7pt] h-[7pt] stroke-[#B9863C] fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18v12H3z" />
                          <path d="M3 6l9 7 9-7" />
                        </svg>
                      </span>
                      <a href={`mailto:${personal.email}`} className="hover:text-[#8A5A34] transition-colors">
                        {personal.email}
                      </a>
                    </li>

                    <li className="flex items-center gap-[4pt] text-[8.5pt] font-normal leading-[1.3] text-[#2B2118] break-words">
                      <span className="w-[14pt] h-[14pt] rounded-full border-[1px] border-[#8A5A34] bg-[#FAF8F4] flex items-center justify-center shrink-0">
                        <svg className="w-[7pt] h-[7pt] stroke-[#B9863C] fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-4 1.5-4-1-6-1m12 3v-3.4c0-1 .3-1.6 1-2.2 3-.3 6-1.5 6-6.6a5.4 5.4 0 0 0-1.5-3.7 5 5 0 0 0-.1-3.7s-1.2-.4-4 1.4a13.6 13.6 0 0 0-7 0C6.6.9 5.4 1.3 5.4 1.3a5 5 0 0 0-.1 3.7A5.4 5.4 0 0 0 3.8 8.7c0 5 3 6.3 6 6.6.7.6 1 1.2 1 2.2V21" />
                        </svg>
                      </span>
                      <a href={personal.github.url} target="_blank" rel="noreferrer" className="hover:text-[#8A5A34] transition-colors">
                        {personal.github.label}
                      </a>
                    </li>

                    <li className="flex items-center gap-[4pt] text-[8.5pt] font-normal leading-[1.3] text-[#2B2118] break-words">
                      <span className="w-[14pt] h-[14pt] rounded-full border-[1px] border-[#8A5A34] bg-[#FAF8F4] flex items-center justify-center shrink-0">
                        <svg className="w-[7pt] h-[7pt] stroke-[#B9863C] fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M3 12h18M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
                        </svg>
                      </span>
                      <a href={personal.website.url} target="_blank" rel="noreferrer" className="hover:text-[#8A5A34] transition-colors">
                        {personal.website.label}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="section education-item mt-[10pt] print:break-inside-avoid">
                  <h2 className="font-bold text-[10.5pt] leading-[1.2] tracking-[0.15pt] uppercase text-[#2B2118] pb-[3pt] mb-[5pt] border-b-[0.6pt] border-[#8A5A34]">
                    {sections.education}
                  </h2>
                  <div>
                    <h3 className="text-[10pt] font-semibold text-[#2B2118] leading-[1.2] mb-[1pt]">
                      {education.institution}
                    </h3>
                    <p className="text-[8pt] font-normal text-[#6B5D4E] leading-[1.25]">
                      {education.degree} &middot; {education.period}
                    </p>
                    <p className="text-[8pt] font-normal text-[#6B5D4E] leading-[1.25]">
                      GPA: {education.gpa} &middot; {education.graduationNote}
                    </p>
                  </div>
                </div>

                <div className="section mt-[10pt]">
                  <h2 className="font-bold text-[10.5pt] leading-[1.2] tracking-[0.15pt] uppercase text-[#2B2118] pb-[3pt] mb-[5pt] border-b-[0.6pt] border-[#8A5A34]">
                    {sections.skills}
                  </h2>

                  {skills.map((group, idx) => (
                    <div key={group.category} className={`mb-[2.5pt] ${idx === skills.length - 1 ? "mb-0" : ""}`}>
                      <h4 className="font-semibold text-[9pt] tracking-[0.3px] uppercase text-[#8A5A34] leading-[1.25] mb-[2pt]">
                        {group.category}
                      </h4>
                      <div className="flex flex-wrap gap-[4pt] items-center">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="bg-[#E5DDCC] text-[#42331F] text-[8.5pt] font-normal px-[4pt] py-[1pt] rounded-[3pt] whitespace-nowrap leading-[1.25]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </motion.main>
        </motion.div>
      </div>

      <div
        className="fixed right-6 sm:right-8 z-40 print:hidden transition-[bottom] duration-150 ease-out"
        style={{
          bottom: `${24 + footerOverlap}px`,
        }}
      >
        <button
          type="button"
          onClick={handleExportPDF}
          className="cursor-can-hover cursor-pointer relative inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium text-zinc-200 bg-zinc-950/85 hover:bg-zinc-900/90 backdrop-blur-2xl border border-white/15 hover:border-[#B9863C]/60 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(185,134,60,0.15),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(185,134,60,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-300 active:scale-95 group overflow-hidden"
          title={t("common", "resume.downloadCV") || "Export PDF"}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#B9863C] shadow-[0_0_8px_rgba(185,134,60,0.9)] animate-pulse pointer-events-none" />
          <Download className="w-4 h-4 text-[#B9863C] group-hover:text-amber-300 transition-all duration-300 group-hover:translate-y-0.5 pointer-events-none" />
          <span className="tracking-wide group-hover:text-white transition-colors duration-200 pointer-events-none">
            {t("common", "resume.downloadCV") || "Export PDF"}
          </span>
        </button>
      </div>
    </div>
  );
}