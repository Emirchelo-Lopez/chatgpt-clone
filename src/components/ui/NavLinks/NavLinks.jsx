import { NavLink } from "react-router-dom";
import "./nav-links.scss";

const NavLinks = () => {
  return (
    <ul className="navbar__nav">
      <li>
        <NavLink to="/" className="navbar__link" end>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" className="navbar__link">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/signup" className="navbar__link">
          Sign Up
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
