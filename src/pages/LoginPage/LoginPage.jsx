import { ArrowRight } from "lucide-react";
import "./login-page.scss";
import FormField from "../../components/ui/FormField/FormField";
import Button from "../../components/ui/Button/Button";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/ui/Navbar/Navbar";

const LoginPage = () => {
  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-page__container">
        {/* Login Form */}
        <div className="auth-form">
          <div className="auth-form__header">
            <h2 className="auth-form__title">Welcome back</h2>
            <p className="auth-form__subtitle">
              Sign in to your account to continue
            </p>
          </div>

          <form className="auth-form__form">
            <FormField
              label="Email address"
              type="email"
              className="form-field__input"
              placeholder="Enter your email"
              required
            />
            <FormField
              label="Password"
              type="password"
              className="form-field__input"
              placeholder="Enter your password"
              required
            />

            <Button type="submit" className="auth-form__submit-btn">
              <span>Sign In</span>
              <ArrowRight size={18} />
            </Button>
          </form>

          <div className="auth-form__footer">
            <p>
              Don't have an account?{" "}
              <NavLink href="/signup" className="auth-form__link">
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
