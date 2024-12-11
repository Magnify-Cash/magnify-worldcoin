import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.tsx";
import Settings from "./pages/Settings.tsx";
import Profile from "./pages/Profile.tsx";
import Layout from "./pages/Layout.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import SplashScreen from "./pages/SplashScreen";
import { AuthProvider } from "./components/AuthContext";

import "./index.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/splash" element={<SplashScreen />} />
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
