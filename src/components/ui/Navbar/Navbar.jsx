import { Home, ArrowLeft, Search, MessageSquare } from "lucide-react";
import "./navbar.scss";

const Navbar = () => {
  return (
    <nav className="error-navbar">
      <div className="error-navbar__container">
        <div className="error-navbar__logo">
          <div className="error-navbar__logo-icon">
            <span>⚡</span>
          </div>
          <span className="error-navbar__logo-text">ChatGPT</span>
        </div>
        <div className="error-navbar__nav">
          <a href="#" className="error-navbar__link">
            Home
          </a>
          <a href="#" className="error-navbar__link">
            Log In
          </a>
          <a
            href="#"
            className="error-navbar__link error-navbar__link--primary"
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
