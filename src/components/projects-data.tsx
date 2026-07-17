import AceTernityLogo from "@/components/logos/aceternity";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
    SiChakraui,
    SiDocker,
    SiExpress,
    SiFirebase,
    SiFlutter,
    SiJavascript,
    SiMongodb,
    SiNestjs,
    SiPostgresql,
    SiPrisma,
    SiPython,
    SiRabbitmq,
    SiReactquery,
    SiRedis,
    SiSanity,
    SiShadcnui,
    SiSocketdotio,
    SiSupabase,
    SiTailwindcss,
    SiThreedotjs,
    SiTypescript,
    SiVuedotjs,
} from "react-icons/si";
import { TbBrandFramerMotion, TbLetterG, TbLetterY } from "react-icons/tb";

export type ProjectSkill = {
    title: string;
    bg: string;
    fg: string;
    icon: ReactNode;
};

export const PROJECT_SKILLS: Record<string, ProjectSkill> = {
    next: { title: "Next.js", bg: "black", fg: "white", icon: <RiNextjsFill /> },
    chakra: { title: "Chakra UI", bg: "black", fg: "white", icon: <SiChakraui /> },
    node: { title: "Node.js", bg: "black", fg: "white", icon: <RiNodejsFill /> },
    python: { title: "Python", bg: "black", fg: "white", icon: <SiPython /> },
    prisma: { title: "prisma", bg: "black", fg: "white", icon: <SiPrisma /> },
    postgres: { title: "PostgreSQL", bg: "black", fg: "white", icon: <SiPostgresql /> },
    mongo: { title: "MongoDB", bg: "black", fg: "white", icon: <SiMongodb /> },
    express: { title: "Express", bg: "black", fg: "white", icon: <SiExpress /> },
    reactQuery: { title: "React Query", bg: "black", fg: "white", icon: <SiReactquery /> },
    shadcn: { title: "ShanCN UI", bg: "black", fg: "white", icon: <SiShadcnui /> },
    aceternity: { title: "Aceternity", bg: "black", fg: "white", icon: <AceTernityLogo /> },
    tailwind: { title: "Tailwind", bg: "black", fg: "white", icon: <SiTailwindcss /> },
    docker: { title: "Docker", bg: "black", fg: "white", icon: <SiDocker /> },
    yjs: { title: "Y.js", bg: "black", fg: "white", icon: <TbLetterY /> },
    firebase: { title: "Firebase", bg: "black", fg: "white", icon: <SiFirebase /> },
    sockerio: { title: "Socket.io", bg: "black", fg: "white", icon: <SiSocketdotio /> },
    js: { title: "JavaScript", bg: "black", fg: "white", icon: <SiJavascript /> },
    ts: { title: "TypeScript", bg: "black", fg: "white", icon: <SiTypescript /> },
    vue: { title: "Vue.js", bg: "black", fg: "white", icon: <SiVuedotjs /> },
    react: { title: "React.js", bg: "black", fg: "white", icon: <RiReactjsFill /> },
    sanity: { title: "Sanity", bg: "black", fg: "white", icon: <SiSanity /> },
    spline: { title: "Spline", bg: "black", fg: "white", icon: <SiThreedotjs /> },
    gsap: { title: "GSAP", bg: "black", fg: "white", icon: <TbLetterG /> },
    framerMotion: { title: "Framer Motion", bg: "black", fg: "white", icon: <TbBrandFramerMotion /> },
    supabase: { title: "Supabase", bg: "black", fg: "white", icon: <SiSupabase /> },
    nestjs: { title: "NestJS", bg: "black", fg: "white", icon: <SiNestjs /> },
    redis: { title: "Redis", bg: "black", fg: "white", icon: <SiRedis /> },
    rabbitmq: { title: "RabbitMQ", bg: "black", fg: "white", icon: <SiRabbitmq /> },
    flutter: { title: "Flutter", bg: "black", fg: "white", icon: <SiFlutter /> },
};

export type ProjectLink = {
    label: string;
    url: string;
};

export type Project = {
    id: string;
    src: string;
    screenshots: string[];
    skills: { frontend: ProjectSkill[]; backend: ProjectSkill[] };
    github?: string;
    live: string;
    links?: ProjectLink[];
    apk?: string;
};

const projects: Project[] = [
    {
        id: "ev-charging",
        src: "/assets/projects-screenshots/ev-charging/landing.png",
        screenshots: ["landing.png"],
        github: "https://github.com/Victor-201/ev-charging-orchestration-platform",
        live: "https://victor-ev-admin.pages.dev",
        links: [
            { label: "EVoltBoard Admin", url: "https://victor-ev-admin.pages.dev" },
            { label: "EVOLTTOUCH Kiosk", url: "https://victor-ev-kiosk.pages.dev" },
        ],
        skills: {
            frontend: [
                PROJECT_SKILLS.next,
                PROJECT_SKILLS.react,
                PROJECT_SKILLS.ts,
                PROJECT_SKILLS.tailwind,
                PROJECT_SKILLS.flutter,
            ],
            backend: [
                PROJECT_SKILLS.nestjs,
                PROJECT_SKILLS.node,
                PROJECT_SKILLS.postgres,
                PROJECT_SKILLS.redis,
                PROJECT_SKILLS.rabbitmq,
                PROJECT_SKILLS.docker,
                PROJECT_SKILLS.sockerio,
            ],
        },
    },
    {
        id: "studyhub",
        src: "/assets/projects-screenshots/studyhub/landing.png",
        screenshots: ["landing.png"],
        github: "https://github.com/Victor-201/studyhub-platform",
        live: "https://victor-studyhub.pages.dev",
        skills: {
            frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.react],
            backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.docker],
        },
    },
    {
        id: "customer-debt",
        src: "/assets/projects-screenshots/customer-debt/landing.png",
        screenshots: ["landing.png"],
        github: "https://github.com/Victor-201/customer-debt-management",
        live: "https://victor-debt.pages.dev",
        skills: {
            frontend: [PROJECT_SKILLS.js],
            backend: [PROJECT_SKILLS.postgres, PROJECT_SKILLS.node],
        },
    },
    {
        id: "queens-hill-climbing",
        src: "/assets/projects-screenshots/queens-hill-climbing/landing.png",
        screenshots: ["landing.png"],
        github: "https://github.com/Victor-201/queens-hill-climbing",
        live: "https://victor-queens.pages.dev",
        skills: {
            frontend: [
                PROJECT_SKILLS.react,
                PROJECT_SKILLS.tailwind,
            ],
            backend: [],
        },
    },
    {
        id: "social-network",
        src: "/assets/projects-screenshots/social-network/landing.png",
        screenshots: ["landing.png"],
        github: "https://github.com/Victor-201/capstone-group7-social-network",
        live: "https://github.com/Victor-201/capstone-group7-social-network",
        skills: {
            frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.react],
            backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.mongo],
        },
    },
    {
        id: "web-video-translator",
        src: "/assets/projects-screenshots/web-video-translator/landing.png",
        screenshots: ["landing.png"],
        github: "https://github.com/Victor-201/web-video-translator",
        live: "https://github.com/Victor-201/web-video-translator",
        skills: {
            frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.js],
            backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.node],
        },
    },
    {
        id: "smtp-linux",
        src: "/assets/projects-screenshots/ev-charging/landing.png",
        screenshots: [],
        github: "https://github.com/Victor-201/smtp-linux",
        live: "https://github.com/Victor-201/smtp-linux",
        skills: {
            frontend: [],
            backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.js],
        },
    },
    {
        id: "se-drowsiness-alert",
        src: "/assets/projects-screenshots/drowsiness-alert/landing.png",
        screenshots: ["landing.png"],
        github: "https://github.com/Victor-201/se-drowsiness-alert",
        live: "https://github.com/Victor-201/se-drowsiness-alert",
        skills: {
            frontend: [],
            backend: [PROJECT_SKILLS.python],
        },
    },
    {
        id: "victor-portfolio",
        src: "/assets/projects-screenshots/studyhub/landing.png",
        screenshots: [],
        github: "https://github.com/Victor-201/victor-201.github.io",
        live: "https://victorfolio.pages.dev",
        skills: {
            frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind, PROJECT_SKILLS.js],
            backend: [],
        },
    },
];

export default projects;
