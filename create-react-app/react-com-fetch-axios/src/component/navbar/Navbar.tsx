import { useApi } from "context/ApiContext";
import { ChangeEvent } from "react";
import { NavLink } from "react-router";
import AuthorServiceAxios from "service/AuthorServiceAxios";
import AuthorServiceFetch from "service/AuthorServiceFetch";

const Navbar = () => {
  const { definirCurrentApi } = useApi();

  const handleTrocaApi = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case "A":
        definirCurrentApi(AuthorServiceAxios);
        break;
      case "F":
        definirCurrentApi(AuthorServiceFetch);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/fetchComp" end>
          Form (CRUD)
        </NavLink>
        <span className="menu-api">
          Escolha API:&nbsp;
          <select onChange={handleTrocaApi}>
            <option value="A">Axios</option>
            <option value="F">Fetch</option>
          </select>
        </span>
      </nav>
    </>
  );
};

export default Navbar;
