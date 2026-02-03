import { NavLink } from "react-router";

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: "whitesmoke",
        padding: ".5rem",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <NavLink to="/">Form useRef</NavLink>|
      <NavLink to="/form-usando-usestate">Form useState</NavLink>|
      <NavLink to="/form-usando-formdata-sem-zod">
        Form FormData sem Zod
      </NavLink>
      |
      <NavLink to="/form-usando-formdata-com-zod">
        Form FormData com Zod
      </NavLink>
    </header>
  );
};

export default Header;
