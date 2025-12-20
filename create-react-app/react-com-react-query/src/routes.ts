import App from "App";
import CrudCriacao from "component/crud/criacao/CrudCriacao";
import CrudInicio from "component/crud/CrudInicio";
import CrudEditar from "component/crud/edicao/CrudEditar";
import CrudPesquisa from "component/crud/pesquisa/CrudPesquisa";
import { createBrowserRouter } from "react-router";
import Home from "./component/home/Home";
import NotFound from "./component/not-found/NotFound";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      {
        path: "/crud",
        Component: CrudInicio,
        children: [
          { index: true, Component: CrudPesquisa },
          { path: "/crud/editar/:idAuthor", Component: CrudEditar },
          { path: "/crud/criar", Component: CrudCriacao },
        ],
      },
      { path: "*", Component: NotFound },
    ],
  },
]);

export default AppRoutes;
