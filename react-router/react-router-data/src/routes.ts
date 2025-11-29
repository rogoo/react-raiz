import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./component/home/Home";
import LinkUm from "./component/link-1/LinkUm";
import LinkDois from "./component/link-2/LinkDois";
import NotFound from "./component/not-found/NotFound";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "/link-1/:nome", Component: LinkUm },
      { path: "/link-2", Component: LinkDois },
      { path: "*", Component: NotFound },
    ],
  },
]);

export default AppRoutes;
