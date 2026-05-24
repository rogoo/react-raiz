import { createBrowserRouter } from "react-router";
import App from "./App";
import TestUseActionState from "./comp/use-action-state/TestUseActionState";
import FormUseTransition from "./comp/use-transition/FormUseTransition";

const MyRoutes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: FormUseTransition },
      { path: "test-use-action-state", Component: TestUseActionState },
    ],
  },
]);

export default MyRoutes;
