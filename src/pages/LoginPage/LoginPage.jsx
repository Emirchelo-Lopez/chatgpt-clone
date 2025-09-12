import { ArrowRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import "./login-page.scss";
import FormField from "../../components/ui/FormField/FormField";
import Button from "../../components/ui/Button/Button";
import Navbar from "../../components/ui/Navbar/Navbar";
import { loginUserService } from "../../api/userService";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Username or email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // 1. Get the full response from the API call
        const response = await loginUserService(values);

        // 2. FIX: Correctly access the nested token string
        // The path is response -> axios `data` property -> your `data` object -> `token`
        const token = response.data?.data?.token;

        if (token && typeof token === "string") {
          // 3. Pass the valid token string to the login function
          login(token);
          navigate("/start");
        } else {
          // This will handle cases where the login is successful but the token is missing
          throw new Error("Login succeeded, but no token was received.");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Login failed. Check your credentials.";
        alert(errorMessage);
        console.error("Login error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-page__container">
        <div className="auth-form">
          <div className="auth-form__header">
            <h2 className="auth-form__title">Welcome back</h2>
            <p className="auth-form__subtitle">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="auth-form__form">
            <FormField
              label="Username or Email"
              type="text"
              name="username"
              className="form-field__input"
              placeholder="Enter your username or email"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && formik.errors.username}
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

            <Button
              type="submit"
              className="auth-form__submit-btn"
              disabled={formik.isSubmitting}
            >
              <span>{formik.isSubmitting ? "Logging In..." : "Log In"}</span>
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
