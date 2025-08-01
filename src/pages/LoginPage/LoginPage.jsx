import { ArrowRight } from "lucide-react";
import "./login-page.scss";
import FormField from "../../components/ui/FormField/FormField";
import Button from "../../components/ui/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../../components/ui/Navbar/Navbar";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/validationSchemas";
import { loginUserService } from "../../api/userService";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await loginUserService(values);
        login(response.data.token);
        navigate("/chat");
      } catch (error) {
        alert(`Login failed: ${error.message}`);
      }
    },
  });

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

          <form onSubmit={formik.handleSubmit} className="auth-form__form">
            <FormField
              label="Email address"
              type="email"
              name="email"
              className="form-field__input"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email}
              required
            />
            <FormField
              label="Password"
              type="password"
              name="password"
              className="form-field__input"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && formik.errors.password}
              required
            />

            <Button type="submit" className="auth-form__submit-btn">
              <span>Log In</span>
              <ArrowRight size={18} />
            </Button>
          </form>

          <div className="auth-form__footer">
            <p>
              Don't have an account?{" "}
              <NavLink to="/signup" className="auth-form__link">
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
