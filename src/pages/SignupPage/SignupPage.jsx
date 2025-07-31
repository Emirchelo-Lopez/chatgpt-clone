import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button/Button";
import "./signup-page.scss";
import FormField from "../../components/ui/FormField/FormField";
import Navbar from "../../components/ui/Navbar/Navbar";

const SignupPage = () => {
  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-page__container">
        {/* Signup Form */}
        <div className="auth-form">
          <div className="auth-form__header">
            <h2 className="auth-form__title">Create your account</h2>
            <p className="auth-form__subtitle">
              Join millions of users and start chatting with AI
            </p>
          </div>

          <form className="auth-form__form">
            <FormField
              label="Full name"
              type="text"
              className="form-field__input"
              placeholder="Enter your full name"
              required
            />
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
              placeholder="Create a password"
              required
            />
            <FormField
              label="Confirm password"
              type="password"
              className="form-field__input"
              placeholder="Confirm your password"
              required
            />

            <Button type="submit" className="auth-form__submit-btn">
              <span>Create Account</span>
              <ArrowRight size={18} />
            </Button>
          </form>

          <div className="auth-form__footer">
            <p>
              Already have an account?{" "}
              <NavLink to="/login" className="auth-form__link">
                Log in
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
