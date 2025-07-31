import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, token } = useAuth();

  if (!token || !user) {
    <Navigate to="/login" />;
  }

  return Outlet;
};

export default ProtectedRoute;
