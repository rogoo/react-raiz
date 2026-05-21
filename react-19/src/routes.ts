import { createBrowserRouter } from "react-router";
import App from "./App";
import FormUseTransition from "./comp/useTransition/FormUseTransition";

const MyRoutes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [{ index: true, Component: FormUseTransition }],
  },
]);

export default MyRoutes;
