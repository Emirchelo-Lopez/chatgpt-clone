import { Home, ArrowLeft, Search, MessageSquare } from "lucide-react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <div className="navbar__logo-icon">
            <span>⚡</span>
          </div>
          <span className="navbar__logo-text">ChatGPT</span>
        </div>
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
      </div>
    </nav>
  );
};

export default Navbar;
