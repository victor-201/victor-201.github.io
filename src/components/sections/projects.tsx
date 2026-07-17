"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { FloatingDock } from "../ui/floating-dock";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import SmoothScroll from "../smooth-scroll";
import projects, { Project } from "@/components/projects-data";
import { useLocale } from "@/locales/use-locale";
import { SectionHeader } from "./section-header";

import SectionWrapper from "../ui/section-wrapper";

const ProjectsSection = () => {
  const { t } = useLocale();
  return (
    <SectionWrapper id="projects">
      <SectionHeader id='projects' title={t("common", "nav.projects")} />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {projects.slice(0, 6).map((project) => (
          <Modall key={project.src} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
};
function useProjectLocale(project: Project) {
  const { t } = useLocale();
  const items = t("projects", "items") || [];
  return Array.isArray(items) ? items.find((p: { id: string }) => p.id === project.id) : null;
}

const Modall = ({ project }: { project: Project }) => {
  const { t } = useLocale();
  const projectLocale = useProjectLocale(project);
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-transparent flex justify-center group/modal-btn">
          <div
            className="relative w-100 h-auto rounded-lg overflow-hidden"
            style={{ aspectRatio: "3/2" }}
          >
            <img
              className="absolute w-full h-full top-0 left-0 hover:scale-[1.05] transition-all object-cover"
              src={project.src}
              alt={projectLocale?.title || ""}
              width={300}
              height={300}
            />
            <div className="absolute w-full h-1/2 bottom-0 left-0 bg-linear-to-t from-black via-black/85 to-transparent pointer-events-none">
              <div className="flex flex-col h-full items-start justify-end p-6">
                <div className="text-lg text-left">{projectLocale?.title}</div>
                <div className="text-xs bg-white text-black rounded-lg w-fit px-2">
                  {projectLocale?.category}
                </div>
              </div>
            </div>
          </div>
        </ModalTrigger>
        <ModalBody className="md:max-w-4xl md:max-h-[80%] overflow-auto">
          <SmoothScroll isInsideModal={true}>
            <ModalContent>
              <ProjectContents project={project} />
            </ModalContent>
          </SmoothScroll>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              {t("common", "buttons.cancel")}
            </button>
            {project.links ? (
              <div className="flex gap-2">
                {project.links.map((link) => (
                  <Link key={link.url} to={link.url} target="_blank">
                    <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-fit whitespace-nowrap">
                      {link.label}
                    </button>
                  </Link>
                ))}
              </div>
            ) : (
              <Link to={project.live} target="_blank">
                <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                  {t("common", "buttons.visit")}
                </button>
              </Link>
            )}
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default ProjectsSection;

const ProjectContents = ({ project }: { project: Project }) => {
  const { t } = useLocale();
  const items = t("projects", "items") || [];
  const projectLocale = Array.isArray(items) ? items.find((p: { id: string }) => p.id === project.id) : null;
  return (
    <>
      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
        {projectLocale?.title}
      </h4>
      <div className="flex flex-col md:flex-row md:justify-evenly max-w-screen overflow-hidden md:overflow-visible">
        <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-8">
          <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
            {t("common", "section.frontend")}
          </p>
          {project.skills.frontend?.length > 0 && (
            <FloatingDock items={project.skills.frontend} />
          )}
        </div>
        {project.skills.backend?.length > 0 && (
          <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-8">
            <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
              {t("common", "section.backend")}
            </p>
            <FloatingDock items={project.skills.backend} />
          </div>
        )}
      </div>
      <div>
        <p className="font-mono text-2xl text-center mb-4">
          {projectLocale?.title}
        </p>
        <p className="font-mono">
          {projectLocale?.description}
        </p>
        <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8 flex-wrap">
          {project.links ? project.links.map((link) => (
            <a
              key={link.url}
              className="font-mono underline flex gap-2"
              rel="noopener"
              target="_new"
              href={link.url}
            >
              <span className="px-2 py-1 bg-black text-white dark:bg-white dark:text-black text-sm rounded-md border border-black">
                {link.label}
                <ArrowUpRight className="ml-3 w-5 h-5 inline" />
              </span>
            </a>
          )) : (
            <a
              className="font-mono underline flex gap-2"
              rel="noopener"
              target="_new"
              href={project.live}
            >
              <span className="px-2 py-1 bg-black text-white dark:bg-white dark:text-black text-sm rounded-md border border-black">
                {t("common", "buttons.visitWebsite")}
                <ArrowUpRight className="ml-3 w-5 h-5 inline" />
              </span>
            </a>
          )}
          {project.github && (
            <a
              className="font-mono underline flex gap-2"
              rel="noopener"
              target="_new"
              href={project.github}
            >
              <span className="px-2 py-1 bg-black text-white dark:bg-white dark:text-black text-sm rounded-md border border-black">
                {t("common", "buttons.github")}
                <ArrowUpRight className="ml-3 w-5 h-5 inline" />
              </span>
            </a>
          )}
          {project.apk && (
            <a
              className="font-mono underline flex gap-2"
              rel="noopener"
              target="_new"
              href={project.apk}
            >
              <span className="px-2 py-1 bg-green-700 text-white dark:bg-green-600 dark:text-white text-sm rounded-md border border-green-700">
                📱 Download APK
                <ArrowUpRight className="ml-3 w-5 h-5 inline" />
              </span>
            </a>
          )}
        </div>
        {projectLocale?.techStack && (
          <>
            <h3 className="font-mono text-lg font-bold my-4 mt-8">{t("common", "section.techStack")}</h3>
            <p className="font-mono mb-2">{projectLocale?.techStack}</p>
          </>
        )}
      </div>
    </>
  );
};
