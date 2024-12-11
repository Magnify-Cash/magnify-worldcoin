// AuthContext.ts // Note: Changed to .ts for TypeScript
import { createContext, useState, useContext } from "react";

// Define the shape of the context
interface AuthContextType {
  isAuthenticated: boolean;
  onVerifySuccess: () => void;
  logout: () => void;
}

// Provide a default value to satisfy TypeScript
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  onVerifySuccess: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Function to handle successful verification
  const onVerifySuccess = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, onVerifySuccess, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
