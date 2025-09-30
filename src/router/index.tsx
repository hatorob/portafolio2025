import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "../layouts/PublicLayout";
import { Home } from "../pages/Home/Home";
import { Projects } from "../pages/Projects/Projects";
import { Blogs } from "../pages/Blogs/Blogs";
import { Project } from "../pages/Projects/Project";
import { Blog } from "../pages/Blogs/Blog";
import { PrivateLayout } from "../layouts/PrivateLayout";
import { Login } from "../pages/Login/Login";
import { HomeAdmin } from "../admin/pages/HomeAdmin/HomeAdmin";
import { ExperiencesAdmin } from "../admin/pages/ExperiencesAdmin/ExperiencesAdmin";
import { ProjectAdmin } from "../admin/pages/ProjectsAdmin/ProjectAdmin";
import { BlogsAdmin } from "../admin/pages/BlogsAdmin/BlogsAdmin";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        element: <PublicLayout />,
        children: [
            {
                path: "/", 
                element: <Home />
            },
            {
                path: "/proyectos", 
                element: <Projects />
            },
            {
                path: "/proyectos/:slug", 
                element: <Project />
            },
            {
                path: "/blogs", 
                element: <Blogs />
            },
            {
                path: "/blogs/:slug", 
                element: <Blog />
            },
        ]
    },
    {
        element: <PrivateLayout />,
        children: [
            {
                path: "/admin", 
                element: <HomeAdmin />
            },
            {
                path:"/admin/experiencia",
                element: <ExperiencesAdmin />
            },
            {
                path:"/admin/proyectos",
                element: <ProjectAdmin />
            },
            {
                path:"/admin/blogs",
                element: <BlogsAdmin />
            },
        ]
    }
]);