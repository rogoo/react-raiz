import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/" style={{ marginRight: ".5rem" }}>
        useTransition
      </NavLink>
      <NavLink to="/test-use-action-state" style={{ marginRight: ".5rem" }}>
        useActionState
      </NavLink>
    </nav>
  );
};

export default Navbar;
