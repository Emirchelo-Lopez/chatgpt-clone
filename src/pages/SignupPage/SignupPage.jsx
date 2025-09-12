import { NavLink, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button/Button";
import "./signup-page.scss";
import FormField from "../../components/ui/FormField/FormField";
import Navbar from "../../components/ui/Navbar/Navbar";
import { useFormik } from "formik";
import { signupSchema } from "../../schemas/validationSchemas"; //
import { registerUserService } from "../../api/userService"; //
import useAuth from "../../hooks/useAuth";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema, //
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const nameParts = values.fullName.trim().split(/\s+/);
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ") || firstName;

        const response = await registerUserService({
          //
          username: values.username,
          firstName: firstName,
          lastName: lastName,
          email: values.email,
          password: values.password,
        });

        // The token is nested in response.data.data.token
        const token = response.data?.data?.token;

        if (token) {
          login(token);
          navigate("/start");
        } else {
          throw new Error("Registration succeeded, but no token was received.");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Registration failed. Please try again.";
        alert(errorMessage);
        console.error("Registration error:", error);
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
            <h2 className="auth-form__title">Create your account</h2>
            <p className="auth-form__subtitle">
              Join millions of users and start chatting with AI
            </p>
          </div>

          {/* This form element links Formik's submission logic to our form */}
          <form onSubmit={formik.handleSubmit} className="auth-form__form">
            {/* These three props are CRITICAL for connecting the input to Formik:
              1. name="username" -> Must match a key in `initialValues` and `signupSchema`.
              2. value={formik.values.username} -> Displays the current state from Formik.
              3. onChange={formik.handleChange} -> Tells Formik to update the state when you type.
            */}
            <FormField
              label="Username"
              type="text"
              name="username"
              className="form-field__input"
              placeholder="letters, numbers, underscores only"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && formik.errors.username}
              required
            />
            <FormField
              label="Full name"
              type="text"
              name="fullName"
              className="form-field__input"
              placeholder="Enter your full name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && formik.errors.fullName}
              required
            />
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
              placeholder="Create a password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && formik.errors.password}
              required
            />
            <FormField
              label="Confirm password"
              type="password"
              name="confirmPassword"
              className="form-field__input"
              placeholder="Confirm your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              required
            />

            <Button
              type="submit"
              className="auth-form__submit-btn"
              disabled={formik.isSubmitting}
            >
              <span>
                {formik.isSubmitting ? "Creating..." : "Create Account"}
              </span>
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
