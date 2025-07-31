import { NavLink, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button/Button";
import "./signup-page.scss";
import FormField from "../../components/ui/FormField/FormField";
import Navbar from "../../components/ui/Navbar/Navbar";
import { useFormik } from "formik";
import { signupSchema } from "../../schemas/validationSchemas";
import { registerUserService } from "../../api/userService";

const SignupPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const nameParts = values.fullName.split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ");

        await registerUserService({
          first_name: firstName,
          last_name: lastName,
          email: values.email,
          password: values.password,
          gender: "M",
        });
        alert("Registration successful! Please log in.");
        navigate("/login");
      } catch (error) {
        alert(`Registration failed: ${error.message}`);
      }
    },
  });

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

          <form onSubmit={formik.handleSubmit} className="auth-form__form">
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
