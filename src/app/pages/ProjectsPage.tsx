import React from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import "@splidejs/react-splide/css";
import { SEO } from "@/infra/SEO";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

const PROJECTS = [
    {
        id: 1,
        name: "EV Charging Orchestration Platform",
        description: `Distributed system for real-time EV charging, telemetry, and slot booking. Architected 8 microservices with 104 REST endpoints across IAM, Session, Billing, Telemetry, Notification, Analytics, and OCPP Gateway. Built with Next.js, NestJS, TypeScript, PostgreSQL, Redis, RabbitMQ, and Docker.`,
        link: "https://github.com/Victor-201",
        tech: "Next.js · NestJS · TypeScript · PostgreSQL · Redis · RabbitMQ · Docker · Flutter",
        period: "May 2026 – Sep 2026",
        type: "Capstone / Academic Engineering Project",
        images: [
            "/assets/projects-screenshots/ev-charging/1.png",
        ],
    },
    {
        id: 2,
        name: "StudyHub — Collaborative Social Learning Platform",
        description: `Microservice social learning platform for study groups, document sharing, and real-time messaging. 6 Express.js services behind Kong API Gateway, React 18 SPA with Redux Toolkit, OAuth 2.0 (Google/Facebook/GitHub/LinkedIn), Socket.IO real-time chat, and RabbitMQ event-driven notifications.`,
        link: "https://github.com/Victor-201",
        tech: "React 18 · Vite 7 · Node.js · Express.js · MySQL · MongoDB · Socket.IO · RabbitMQ · Kong · Docker · i18next · Cloudinary",
        period: "Nov 2025 – Sep 2026",
        type: "Full-Stack Academic Project",
        images: [
            "/assets/projects-screenshots/studyhub/1.png",
            "/assets/projects-screenshots/studyhub/2.png",
            "/assets/projects-screenshots/studyhub/3.png",
        ],
    },
    {
        id: 3,
        name: "Victorfolio — Developer Portfolio & Real-Time Web App",
        description: `Interactive developer portfolio with real-time visitor presence tracking and synchronized remote cursor. Built with React 19/TypeScript, bilingual EN/VI localization, GSAP/Framer Motion/Three.js animations, and deployed on Cloudflare Pages.`,
        link: "https://victorfolio.pages.dev/",
        tech: "React 19 · TypeScript · Vite · Tailwind CSS · Radix UI · Socket.IO · GSAP · Framer Motion · Three.js · Cloudflare Pages",
        period: "Aug 2025 – Sep 2026",
        type: "Personal Project",
        images: [
            "/assets/projects-screenshots/victorfolio/1.png",
        ],
    },
];

function ProjectsPage() {
    return (
        <>
            <SEO title="Featured Projects — Nguyễn Văn Thắng" />
            <div className="container mx-auto md:px-[50px] xl:px-[150px] text-zinc-300 h-full">
                <h1 className="text-4xl mt-[100px] mb-[50px]">Projects</h1>
                <ul className="grid  md:grid-cols-2 lg:grid-cols-3 gap-10 place-content-around ">
                    {PROJECTS.map((project) => (
                        <li
                            className="w-[300px] h-auto border-[.5px] rounded-md border-zinc-600 flex flex-col"
                            key={project.id}
                            style={{ backdropFilter: "blur(2px)" }}
                        >
                            <div className="h-[180px] shrink-0">
                                <Splide
                                    options={{
                                        type: "loop",
                                        interval: 3000,
                                        autoplay: true,
                                        speed: 2000,
                                        perMove: 1,
                                        rewind: true,
                                        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
                                        arrows: false,
                                    }}
                                    aria-label={`Screenshots of ${project.name}`}
                                >
                                    {project.images.map((image) => (
                                        <SplideSlide key={image}>
                                            <ImageWithFallback
                                                src={image}
                                                alt={`screenshot of "${project.name}`}
                                                className="w-[300px] h-[180px] rounded-t-md bg-zinc-900 object-cover"
                                                width={300}
                                                height={180}
                                                style={{ height: "180px" }}
                                                variant="project"
                                            />
                                        </SplideSlide>
                                    ))}
                                </Splide>
                            </div>
                            <div className="p-4 text-zinc-300 flex flex-col gap-1 flex-1">
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                    <span className="text-[10px] text-zinc-500">{project.period}</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 whitespace-nowrap">{project.type}</span>
                                </div>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-base font-semibold leading-snug hover:text-white transition-colors"
                                >
                                    {project.name}
                                </a>
                                <p className="text-xs text-zinc-500 leading-relaxed">
                                    {project.description}
                                </p>
                                {project.tech && (
                                    <p className="mt-auto pt-2 text-[10px] text-zinc-600 leading-relaxed border-t border-zinc-800">
                                        <span className="text-zinc-500 font-medium">Stack: </span>
                                        {project.tech}
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ProjectsPage;
