import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import MyRoutes from "./routes.ts";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={MyRoutes} />,
);
