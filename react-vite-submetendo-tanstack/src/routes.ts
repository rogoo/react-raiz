import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      {
        path: "/form-tanstack-um",
        lazy: () =>
          import("./pages/FormTanstackUm.tsx").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "*",
        lazy: () =>
          import("./pages/NotFound.tsx").then((module) => ({
            Component: module.default,
          })),
      },
    ],
  },
]);
