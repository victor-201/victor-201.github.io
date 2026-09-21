import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import TechStackPage from "./pages/TechStackPage";
import ResumePage from "./pages/ResumePage";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "resume", element: <ResumePage /> },
            { path: "projects", element: <ProjectsPage /> },
            { path: "projects/:slug", element: <ProjectDetailPage /> },
            { path: "tech-stack", element: <TechStackPage /> },
            { path: "about", element: <Navigate to="/#about" replace /> },
            { path: "skills", element: <Navigate to="/#skills" replace /> },
            { path: "experience", element: <Navigate to="/#experience" replace /> },
            { path: "contact", element: <Navigate to="/#contact" replace /> },
            { path: "404", element: <NotFoundPage /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);
