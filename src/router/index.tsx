import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "../layouts/PublicLayout";
import { Home } from "../pages/Home/Home";
import { Projects } from "../pages/Projects/Projects";
import { Blogs } from "../pages/Blogs/Blogs";
import { Project } from "../pages/Projects/Project";
import { Blog } from "../pages/Blogs/Blog";
import { PrivateLayout } from "../layouts/PrivateLayout";


export const router = createBrowserRouter([
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
            }
        ]
    },
    {
        element: <PrivateLayout />,
        children: [
            /* {
                path: "/", 
                element: <Home />
            }, */
        ]
    }
]);