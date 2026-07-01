import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import TechStackPage from "./pages/TechStackPage";
import AboutPage from "./pages/AboutPage";
import ResumePage from "./pages/ResumePage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "projects", element: <ProjectsPage /> },
            { path: "projects/:slug", element: <ProjectDetailPage /> },
            { path: "tech-stack", element: <TechStackPage /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "404", element: <NotFoundPage /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
    // Resume page is a standalone route — no RootLayout, no navbar/header
    { path: "/resume", element: <ResumePage /> },
]);
