import { createBrowserRouter } from "react-router";
import App from "./App";
import FetchCompCriacao from "./component/fetch/criacao/FetchCompCriacao";
import FetchCompEditar from "./component/fetch/edicao/FetchCompEditar";
import FetchCompInicio from "./component/fetch/FetchCompInicio";
import FetchCompPesquisa from "./component/fetch/pesquisa/FetchCompPesquisa";
import Home from "./component/home/Home";
import NotFound from "./component/not-found/NotFound";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      {
        path: "/fetchComp",
        Component: FetchCompInicio,
        children: [
          { index: true, Component: FetchCompPesquisa },
          { path: "/fetchComp/editar/:idAuthor", Component: FetchCompEditar },
          { path: "/fetchComp/criar", Component: FetchCompCriacao },
        ],
      },
      { path: "*", Component: NotFound },
    ],
  },
]);

export default AppRoutes;
