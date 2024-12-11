// SplashScreen.js
import { useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { VerifyBlock } from "../components/Verify";
import { useNavigate } from "react-router";

const SplashScreen = () => {
  const { isAuthenticated, onVerifySuccess } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // If authenticated, navigate to the home page or wherever you want users to go after login
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <VerifyBlock onVerifySuccess={onVerifySuccess} />
    </div>
  );
};

export default SplashScreen;
