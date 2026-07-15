export enum SkillNames {
  JS = "js",
  TS = "ts",
  HTML = "html",
  CSS = "css",
  REACT = "react",
  VUE = "vue",
  NEXTJS = "nextjs",
  TAILWIND = "tailwind",
  NODEJS = "nodejs",
  EXPRESS = "express",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  GIT = "git",
  GITHUB = "github",
  PRETTIER = "prettier",
  NPM = "npm",
  FIREBASE = "firebase",
  WORDPRESS = "wordpress",
  LINUX = "linux",
  DOCKER = "docker",
  NGINX = "nginx",
  AWS = "aws",
  VIM = "vim",
  VERCEL = "vercel",
}

export type Skill = {
  id: number;
  name: string;
  color: string;
  icon: string;
};

export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: { id: 1, name: "js", color: "#F7DF1E", icon: "javascript" },
  [SkillNames.TS]: { id: 2, name: "ts", color: "#3178C6", icon: "typescript" },
  [SkillNames.HTML]: { id: 3, name: "html", color: "#E34F26", icon: "html5" },
  [SkillNames.CSS]: { id: 4, name: "css", color: "#1572B6", icon: "css3" },
  [SkillNames.REACT]: { id: 5, name: "react", color: "#61DAFB", icon: "react" },
  [SkillNames.VUE]: { id: 6, name: "vue", color: "#4FC08D", icon: "vuedotjs" },
  [SkillNames.NEXTJS]: { id: 7, name: "nextjs", color: "#ffffffff", icon: "nextdotjs" },
  [SkillNames.TAILWIND]: { id: 8, name: "tailwind", color: "#06B6D4", icon: "tailwindcss" },
  [SkillNames.NODEJS]: { id: 9, name: "nodejs", color: "#5FA04E", icon: "nodedotjs" },
  [SkillNames.EXPRESS]: { id: 10, name: "express", color: "#666874ff", icon: "express" },
  [SkillNames.POSTGRES]: { id: 11, name: "postgres", color: "#4169E1", icon: "postgresql" },
  [SkillNames.MONGODB]: { id: 12, name: "mongodb", color: "#47A248", icon: "mongodb" },
  [SkillNames.GIT]: { id: 13, name: "git", color: "#F05032", icon: "git" },
  [SkillNames.GITHUB]: { id: 14, name: "github", color: "#666874ff", icon: "github" },
  [SkillNames.PRETTIER]: { id: 15, name: "prettier", color: "#F7B93E", icon: "prettier" },
  [SkillNames.NPM]: { id: 16, name: "npm", color: "#CB3837", icon: "npm" },
  [SkillNames.FIREBASE]: { id: 17, name: "firebase", color: "#FFCA28", icon: "firebase" },
  [SkillNames.WORDPRESS]: { id: 18, name: "wordpress", color: "#21759B", icon: "wordpress" },
  [SkillNames.LINUX]: { id: 19, name: "linux", color: "#FCC624", icon: "linux" },
  [SkillNames.DOCKER]: { id: 20, name: "docker", color: "#2496ED", icon: "docker" },
  [SkillNames.NGINX]: { id: 21, name: "nginx", color: "#009639", icon: "nginx" },
  [SkillNames.AWS]: { id: 22, name: "aws", color: "#FF9900", icon: "amazonwebservices" },
  [SkillNames.VIM]: { id: 23, name: "vim", color: "#019733", icon: "vim" },
  [SkillNames.VERCEL]: { id: 24, name: "vercel", color: "#000000", icon: "vercel" },
};

export function getSkillIconUrl(skill: Pick<Skill, "icon" | "color">): string {
  return `https://cdn.simpleicons.org/${skill.icon}/${skill.color.replace("#", "")}`;
}

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "Jul 2025",
    endDate: "Present",
    skills: [
      SkillNames.JS, SkillNames.TS, SkillNames.NODEJS, SkillNames.EXPRESS,
      SkillNames.POSTGRES, SkillNames.REACT, SkillNames.TAILWIND,
      SkillNames.GIT, SkillNames.GITHUB, SkillNames.DOCKER,
    ],
  },
  {
    id: 2,
    startDate: "Sep 2024",
    endDate: "Jun 2025",
    skills: [
      SkillNames.JS, SkillNames.REACT, SkillNames.NODEJS, SkillNames.MONGODB,
      SkillNames.GIT, SkillNames.GITHUB, SkillNames.HTML, SkillNames.CSS,
    ],
  },
];

export type ProjectSkill = {
  title: string;
  bg: string;
  fg: string;
  icon: React.ReactNode;
};

export type Project = {
  id: string;
  src: string;
  screenshots: string[];
  github?: string;
  live: string;
  skills: { frontend: ProjectSkill[]; backend: ProjectSkill[] };
};

export type ProjectSkillKey = "next" | "chakra" | "node" | "python" | "prisma" | "postgres" | "mongo" | "express" | "reactQuery" | "shadcn" | "aceternity" | "tailwind" | "docker" | "yjs" | "firebase" | "sockerio" | "js" | "ts" | "vue" | "react" | "sanity" | "spline" | "gsap" | "framerMotion" | "supabase";

export const config = {
  site: "https://victor-201.github.io",
  email: "4.victor.201@gmail.com",
  githubUsername: "Victor-201",
  githubRepo: "",
  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    facebook: "https://www.facebook.com/4.victor.201",
    instagram: "https://www.instagram.com/4.victor.201",
    github: "https://github.com/Victor-201",
  },
};
