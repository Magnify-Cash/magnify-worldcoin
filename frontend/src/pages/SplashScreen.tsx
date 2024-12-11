// SplashScreen.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router";
import { VerifyBlock } from "../components/Verify";

const SplashScreen = () => {
  const { isAuthenticated, onVerifySuccess } = useAuth();
  const navigate = useNavigate();
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const { handleVerify } = VerifyBlock({
    onVerifySuccess,
    onVerifyError: (error) => {
      if ("message" in error) {
        setVerificationError(error.message || "An error occurred during verification.");
      } else {
        setVerificationError("An unknown error occurred during verification.");
      }
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Your Identity</h1>
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
          onClick={handleVerify}
        >
          Verify
        </button>
        {verificationError && <p className="text-red-500 mt-4">{verificationError}</p>}
      </div>
    </div>
  );
};

export default SplashScreen;
