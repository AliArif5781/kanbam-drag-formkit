import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout";
import HeroSection from "../components/common/HeroSection";
import ProjectTask from "../components/common/ProjectTask";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HeroSection />,
      },
      {
        path: "/project/:id",
        element: <ProjectTask />,
      },
    ],
  },
]);

export default router;
