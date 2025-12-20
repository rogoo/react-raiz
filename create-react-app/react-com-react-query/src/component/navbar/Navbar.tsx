import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/crud" end>
          CRUD (React Query)
        </NavLink>
      </nav>
    </>
  );
};

export default Navbar;
