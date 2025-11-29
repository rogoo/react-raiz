import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="nav">
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/link-1/nome-do-menu" end>
        Link 1
      </NavLink>
      <NavLink to="/link-2" end>
        Link 2
      </NavLink>
    </nav>
  );
};

export default Navbar;
