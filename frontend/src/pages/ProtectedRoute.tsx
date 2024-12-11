// ProtectedRoute.js
import { Outlet, Navigate } from "react-router";
import { useAuth } from "../components/AuthContext"; // Adjust path as necessary

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // If authenticated, show the route's element, otherwise show the splash screen
  return isAuthenticated ? <Outlet /> : <Navigate to="/splash" replace />;
};

export default ProtectedRoute;
