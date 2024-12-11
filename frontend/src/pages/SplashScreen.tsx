// SplashScreen.js
import { useAuth } from "../components/AuthContext";
import { VerifyBlock } from "../components/Verify";

const SplashScreen = () => {
  const { onVerifySuccess } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <VerifyBlock onVerifySuccess={onVerifySuccess} />
    </div>
  );
};

export default SplashScreen;
