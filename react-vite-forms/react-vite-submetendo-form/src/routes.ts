import { createBrowserRouter } from "react-router";
import App from "./App";
import FormUsandoFormDataComZod from "./pages/FormUsandoFormDataComZod";
import FormUsandoFormDataSemZod from "./pages/FormUsandoFormDataSemZod";
import FormUsandoRef from "./pages/FormUsandoRef";
import FormUsandoUseState from "./pages/FormUsandoUseState";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: FormUsandoRef },
      { path: "form-usando-usestate", Component: FormUsandoUseState },
      {
        path: "form-usando-formdata-sem-zod",
        Component: FormUsandoFormDataSemZod,
      },
      {
        path: "form-usando-formdata-com-zod",
        Component: FormUsandoFormDataComZod,
      },
    ],
  },
]);
export default appRoutes;
