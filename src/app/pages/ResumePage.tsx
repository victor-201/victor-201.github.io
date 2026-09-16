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


  return (
    <div className="relative min-h-screen bg-[#030712] text-[#2B2118] font-['Inter',Arial,sans-serif] py-6 px-3 sm:px-6 flex flex-col items-center print:bg-[#FAF8F4] print:p-0 print:m-0">
      {/* Print styles matching cv-design.json */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }
        @media print {
          body {
            background: #FAF8F4 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
        .section,
        .experience-item,
        .project,
        .education-item {
          break-inside: avoid;
          page-break-inside: avoid;
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

        <a
          href={cvFile.path}
          download={cvFile.name}
          className="cursor-can-hover inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-900 bg-white hover:bg-zinc-200 border border-white/20 shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-200 active:scale-95 group [&_*]:!pointer-events-none"
          title={t("common", "resume.downloadCV")}
        >
          <Download style={{ pointerEvents: "none" }} className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5 text-zinc-800" />
          <span style={{ pointerEvents: "none" }}>{t("common", "resume.downloadCV")}</span>
        </a>
      </header>

      {/* Main CV Paper Container (padding: 12mm 15mm, contentWidth: 180mm, contentHeight: 273mm) */}
      <main className="relative z-10 w-full max-w-[210mm] min-h-[297mm] bg-[#FAF8F4] text-[#2B2118] shadow-[0_10px_40px_rgba(0,0,0,0.22)] rounded-sm p-[12mm_15mm] my-[20px] print:my-0 print:p-[12mm_15mm] print:w-[210mm] print:min-h-[297mm] print:shadow-none print:rounded-none print:bg-[#FAF8F4]">
        <div className="flex flex-col md:flex-row items-start gap-0 w-full">
          {/* ================= MAIN COLUMN (66%) ================= */}
          <section className="w-full md:w-[66%] bg-[#FAF8F4] order-2 md:order-1 pr-0 md:pr-[6mm]">
            {/* Header Band */}
            <div className="p-0">
              <h1 className="font-bold text-[28pt] leading-none tracking-[-0.4pt] mb-[2pt] text-[#2B2118]">
                {personal.fullName}
              </h1>
              <div className="font-medium text-[12pt] leading-[1.2] tracking-[0.5px] uppercase text-[#B9863C] mb-[5pt]">
                {personal.role}
              </div>
              <p className="text-[9.5pt] font-normal leading-[1.3] text-[#2B2118] max-w-[98%]">
                {personal.bio}
              </p>
            </div>

            {/* Freelance & Independent Work */}
            <div className="section mt-[13pt] mb-0 print:break-inside-avoid">
              <h2 className="font-bold text-[11pt] leading-[1.2] tracking-[0.2pt] uppercase text-[#2B2118] pb-[4pt] mb-[6pt] border-b-[0.6pt] border-[#8A5A34]">
                {sections.freelance}
              </h2>

              <article className="experience-item mb-[9pt] print:break-inside-avoid">
                <div className="flex items-center gap-[4pt] text-[8.5pt] font-normal text-[#8A5A34] leading-[1.3] mb-[1pt]">
                  <span className="w-[4.5pt] h-[4.5pt] rounded-full bg-[#8A5A34] shrink-0" />
                  {freelance.period}
                </div>
                <div className="text-[10.5pt] font-semibold text-[#2B2118] leading-[1.2] mb-[3pt]">
                  <span className="font-semibold">{freelance.title}</span> &middot;{" "}
                  <span className="text-[#8A5A34] font-semibold">{freelance.location}</span>
                </div>
                <ul className="pl-[14pt] flex flex-col list-none p-0 m-0">
                  {freelance.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="relative pl-[10pt] text-[9.5pt] font-normal leading-[1.3] text-[#2B2118] mb-[2.5pt] last:mb-0 before:content-[''] before:absolute before:left-0 before:top-[5.5pt] before:w-[3.5pt] before:h-[3.5pt] before:rounded-full before:bg-[#B9863C]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            {/* Featured Projects */}
            <div className="section mt-[13pt] mb-0 print:break-inside-avoid">
              <h2 className="font-bold text-[11pt] leading-[1.2] tracking-[0.2pt] uppercase text-[#2B2118] pb-[4pt] mb-[6pt] border-b-[0.6pt] border-[#8A5A34]">
                {sections.projects}
              </h2>

              {projects.map((project, idx) => (
                <article
                  key={project.id}
                  className={`project ${idx < projects.length - 1 ? "mb-[8pt]" : "mb-0"} print:break-inside-avoid`}
                >
                  <div className="flex items-center gap-[4pt] text-[8.5pt] font-normal text-[#8A5A34] leading-[1.3] mb-[1pt]">
                    <span className="w-[4.5pt] h-[4.5pt] rounded-full bg-[#8A5A34] shrink-0" />
                    {project.period}
                  </div>
                  <h3 className="text-[10.5pt] font-semibold text-[#2B2118] leading-[1.2] mb-[1pt]">
                    {project.title}
                  </h3>
                  <div className="text-[8.5pt] font-normal text-[#6B5D4E] leading-[1.3] -mt-[1pt] mb-[2pt]">
                    {project.type}
                  </div>
                  <p className="text-[9.5pt] font-normal text-[#6B5D4E] leading-[1.3] mb-[3pt]">
                    {project.description}
                  </p>
                  <ul className="pl-[14pt] flex flex-col list-none p-0 m-0">
                    {project.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="relative pl-[10pt] text-[9.5pt] font-normal leading-[1.3] text-[#2B2118] mb-[2.5pt] last:mb-0 before:content-[''] before:absolute before:left-0 before:top-[5.5pt] before:w-[3.5pt] before:h-[3.5pt] before:rounded-full before:bg-[#B9863C]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-[3pt] text-[8.5pt] font-normal leading-[1.3] text-[#6B5D4E]">
                    <strong className="text-[#2B2118] font-semibold">{labels.tech}</strong>{" "}
                    {project.tech}
                  </p>
                </article>
              ))}
            </div>

            {/* Footer */}
            <footer className="flex justify-between items-center px-0 pt-[5mm] mt-[6pt] border-t border-[#DCD1BE] text-[8pt] text-[#6B5D4E]">
              <span>{footer.label}</span>
            </footer>
          </section>

          {/* ================= SIDEBAR (34%) ================= */}
          <aside className="w-full md:w-[34%] bg-[#EFE9DE] rounded-sm order-1 md:order-2 p-3 md:p-[5mm_5mm_6mm_5mm]">
            {/* Sidebar Top: Photo + Contact */}
            <div className="p-0">
              {/* Photo */}
              <div className="w-[32mm] md:w-[34mm] aspect-[3/4] rounded-[3pt] overflow-hidden relative mx-auto mb-[5mm] bg-[#40301F] shadow-[0_2px_10px_rgba(64,48,31,0.35)] group">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#40301F] to-[#332615] text-[#B9863C] font-bold text-[16pt] tracking-[1px]">
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
              <ul className="mt-[8pt] flex flex-col gap-[6pt] list-none p-0 m-0">
                {/* Location */}
                <li className="flex items-center gap-[5pt] text-[9pt] font-normal leading-[1.4] text-[#2B2118] break-words">
                  <span className="w-[15pt] h-[15pt] rounded-full border-[1.5px] border-[#40301F] bg-[#FAF8F4] flex items-center justify-center shrink-0">
                    <svg className="w-[7.5pt] h-[7.5pt] stroke-[#B9863C] fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12z" />
                      <circle cx="12" cy="9" r="2.4" />
                    </svg>
                  </span>
                  <span>{personal.location}</span>
                </li>

                {/* Email */}
                <li className="flex items-center gap-[5pt] text-[9pt] font-normal leading-[1.4] text-[#2B2118] break-words">
                  <span className="w-[15pt] h-[15pt] rounded-full border-[1.5px] border-[#40301F] bg-[#FAF8F4] flex items-center justify-center shrink-0">
                    <svg className="w-[7.5pt] h-[7.5pt] stroke-[#B9863C] fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18v12H3z" />
                      <path d="M3 6l9 7 9-7" />
                    </svg>
                  </span>
                  <a href={`mailto:${personal.email}`} className="hover:text-[#8A5A34] transition-colors">
                    {personal.email}
                  </a>
                </li>

                {/* GitHub */}
                <li className="flex items-center gap-[5pt] text-[9pt] font-normal leading-[1.4] text-[#2B2118] break-words">
                  <span className="w-[15pt] h-[15pt] rounded-full border-[1.5px] border-[#40301F] bg-[#FAF8F4] flex items-center justify-center shrink-0">
                    <svg className="w-[7.5pt] h-[7.5pt] stroke-[#B9863C] fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-4 1.5-4-1-6-1m12 3v-3.4c0-1 .3-1.6 1-2.2 3-.3 6-1.5 6-6.6a5.4 5.4 0 0 0-1.5-3.7 5 5 0 0 0-.1-3.7s-1.2-.4-4 1.4a13.6 13.6 0 0 0-7 0C6.6.9 5.4 1.3 5.4 1.3a5 5 0 0 0-.1 3.7A5.4 5.4 0 0 0 3.8 8.7c0 5 3 6.3 6 6.6.7.6 1 1.2 1 2.2V21" />
                    </svg>
                  </span>
                  <a href={personal.github.url} target="_blank" rel="noreferrer" className="hover:text-[#8A5A34] transition-colors">
                    {personal.github.label}
                  </a>
                </li>

                {/* Website */}
                <li className="flex items-center gap-[5pt] text-[9pt] font-normal leading-[1.4] text-[#2B2118] break-words">
                  <span className="w-[15pt] h-[15pt] rounded-full border-[1.5px] border-[#40301F] bg-[#FAF8F4] flex items-center justify-center shrink-0">
                    <svg className="w-[7.5pt] h-[7.5pt] stroke-[#B9863C] fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <div className="section education-item mt-[13pt] print:break-inside-avoid">
              <h2 className="font-bold text-[11pt] leading-[1.2] tracking-[0.2pt] uppercase text-[#2B2118] pb-[4pt] mb-[6pt] border-b-[0.6pt] border-[#8A5A34]">
                {sections.education}
              </h2>
              <div>
                <h3 className="text-[10.5pt] font-semibold text-[#2B2118] leading-[1.2] mb-[2pt]">
                  {education.institution}
                </h3>
                <p className="text-[8.5pt] font-normal text-[#6B5D4E] leading-[1.3]">
                  {education.degree} &middot; {education.period}
                </p>
                <p className="text-[8.5pt] font-normal text-[#6B5D4E] leading-[1.3]">
                  GPA: {education.gpa} &middot; {education.graduationNote}
                </p>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="section mt-[13pt]">
              <h2 className="font-bold text-[11pt] leading-[1.2] tracking-[0.2pt] uppercase text-[#2B2118] pb-[4pt] mb-[6pt] border-b-[0.6pt] border-[#8A5A34]">
                {sections.skills}
              </h2>

              {skills.map((group, idx) => (
                <div key={group.category} className={`mb-[3.5pt] ${idx === skills.length - 1 ? "mb-0" : ""}`}>
                  <h4 className="font-semibold text-[9.5pt] tracking-[0.4px] uppercase text-[#8A5A34] leading-[1.3] mb-[2pt]">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-[8pt] items-center">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="bg-[#E5DDCC] text-[#42331F] text-[9.5pt] font-normal px-[5pt] py-[1.5pt] rounded-[3pt] whitespace-nowrap leading-[1.3]"
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