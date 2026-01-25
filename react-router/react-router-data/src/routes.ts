import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./component/home/Home";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      {
        path: "/link-1/:nome",
        lazy: () =>
          import("./component/link-1/LinkUm").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "/link-2",
        lazy: () =>
          import("./component/link-2/LinkDois").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "*",
        lazy: () =>
          import("./component/not-found/NotFound").then((module) => ({
            Component: module.default,
          })),
      },
    ],
  },
]);

export default AppRoutes;
