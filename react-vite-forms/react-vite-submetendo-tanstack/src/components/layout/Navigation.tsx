import { NavLink } from "react-router";

const Navigation = () => {
  return (
    <nav className="navigation">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/form-tanstack-um">Form Tanstack</NavLink>
    </nav>
  );
};

export default Navigation;
