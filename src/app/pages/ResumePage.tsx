import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import Particles from "@/components/Particles";
import ElasticCursor from "@/components/ui/ElasticCursor";
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

export default function ResumePage() {
  const { t } = useLocale();

  useEffect(() => {
    document.title = t("common", "resume.pageTitle") || "Resume — Nguyen Van Thang";
  }, [t]);

  const handleExportPDF = () => {
    const originalTitle = document.title;
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
    }
    document.title = "CV_NguyenVanThang_FullStackDeveloper";

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
        if (isDark) {
          document.documentElement.classList.add("dark");
        }
      }, 500);
    }, 50);
  };

  return (
    <div className="cv-page-wrapper relative min-h-screen bg-[#030712] text-[#2B2118] font-['Inter',Arial,sans-serif] py-6 px-3 sm:px-6 flex flex-col items-center print:bg-[#FAF8F4] print:p-0 print:m-0">
      {/* Print styles matching design.cv.md */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
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
          nav {
            display: none !important;
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

      {/* Elastic Cursor on Resume Page - hidden in print */}
      <div className="print:hidden">
        <ElasticCursor />
      </div>

      {/* Background Particles (starry sky) - hidden in print */}
      <div className="print:hidden">
        <Particles
          className="fixed inset-0 z-0 pointer-events-none"
          quantity={120}
        />
      </div>

      {/* Top Action Bar (hidden in print) */}
      <header className="relative z-10 w-full max-w-[210mm] mb-5 flex items-center justify-between gap-3 px-4 py-3 bg-zinc-900/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.36)] print:hidden">
        <Link
          to="/"
          className="cursor-can-hover inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-95 group [&_*]:!pointer-events-none"
          title={t("common", "resume.backHome")}
        >
          <ArrowLeft style={{ pointerEvents: "none" }} className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5 text-zinc-400 group-hover:text-white" />
          <span style={{ pointerEvents: "none" }}>{t("common", "resume.backHome")}</span>
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-zinc-400 select-none">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
          <span className="text-zinc-300 font-semibold">{t("common", "resume.statusLabel")}</span>
          <span className="text-zinc-600">·</span>
          <span>{t("common", "resume.statusAuthor")}</span>
        </div>

        <button
          type="button"
          onClick={handleExportPDF}
          className="cursor-can-hover cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-900 bg-white hover:bg-zinc-200 border border-white/20 shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-200 active:scale-95 group"
          title={t("common", "resume.downloadCV")}
        >
          <Download className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5 text-zinc-800 pointer-events-none" />
          <span className="pointer-events-none">{t("common", "resume.downloadCV")}</span>
        </button>
      </header>

      {/* Main CV Paper Container (margins: 10mm 14mm, content: 182mm × 277mm) */}
      <main className="cv-page relative z-10 w-full max-w-[210mm] min-h-[297mm] bg-[#FAF8F4] text-[#2B2118] shadow-[0_10px_40px_rgba(0,0,0,0.22)] rounded-sm p-[10mm_14mm] my-[20px] print:my-0 print:p-[10mm_14mm] print:w-[210mm] print:min-h-[297mm] print:max-h-[297mm] print:shadow-none print:rounded-none print:bg-[#FAF8F4] print:overflow-hidden">
        <div className="cv-layout-row flex flex-col md:flex-row print:flex-row items-start gap-0 w-full">
          {/* ================= MAIN COLUMN (68%) ================= */}
          <section className="cv-main-col w-full md:w-[68%] print:w-[68%] bg-[#FAF8F4] order-2 md:order-1 print:order-1 pr-0 md:pr-[5mm] print:pr-[5mm]">
            {/* Header Band */}
            <div className="p-0">
              <h1 className="font-bold text-[25pt] leading-none tracking-[-0.3pt] mb-[2pt] text-[#2B2118]">
                {personal.fullName}
              </h1>
              <div className="font-medium text-[11pt] leading-[1.2] tracking-[0.4px] uppercase text-[#B9863C] mb-[4pt]">
                {personal.role}
              </div>
              <p className="text-[9pt] font-normal leading-[1.3] text-[#2B2118] mb-[6pt] max-w-full">
                {personal.bio}
              </p>
            </div>

            {/* Freelance & Independent Work */}
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

            {/* Featured Projects */}
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

            {/* Footer */}
            <footer className="flex justify-between items-center px-0 pt-[3mm] mt-[4pt] border-t border-[#DCD1BE] text-[7.5pt] leading-[1.2] text-[#6B5D4E]">
              <span>{footer.label}</span>
            </footer>
          </section>

          {/* ================= SIDEBAR (32%) ================= */}
          <aside className="cv-sidebar-col w-full md:w-[32%] print:w-[32%] bg-[#EFE9DE] rounded-sm order-1 md:order-2 print:order-2 p-3 md:p-[4mm] print:p-[4mm]">
            {/* Sidebar Top: Photo + Contact */}
            <div className="p-0">
              {/* Photo */}
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

              {/* Contact List */}
              <ul className="mt-[6pt] flex flex-col gap-[4pt] list-none p-0 m-0">
                {/* Location */}
                <li className="flex items-center gap-[4pt] text-[8.5pt] font-normal leading-[1.3] text-[#2B2118] break-words">
                  <span className="w-[14pt] h-[14pt] rounded-full border-[1px] border-[#8A5A34] bg-[#FAF8F4] flex items-center justify-center shrink-0">
                    <svg className="w-[7pt] h-[7pt] stroke-[#B9863C] fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12z" />
                      <circle cx="12" cy="9" r="2.4" />
                    </svg>
                  </span>
                  <span>{personal.location}</span>
                </li>

                {/* Email */}
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

                {/* GitHub */}
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

                {/* Website */}
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

            {/* Education */}
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

            {/* Technical Skills */}
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
      </main>
    </div>
  );
}