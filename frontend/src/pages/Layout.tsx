import { Outlet, useLocation, useNavigate } from "react-router";
import { LucideHome } from "lucide-react";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current path matches and apply 'active' class accordingly
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <header className="p-4 text-center">
        <h1 className="text-2xl font-bold">Magnify.Cash</h1>
      </header>
      <main className="flex-grow px-4">
        <Outlet /> {/* This is where nested routes will render */}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-50">
        {[
          { path: "/", label: "Home", Icon: LucideHome },
          { path: "/profile", label: "Profile", Icon: LucideHome },
          { path: "/settings", label: "Settings", Icon: LucideHome },
        ].map(({ path, label, Icon }) => (
          <button
            key={path}
            className={`flex-1 py-2 bg-transparent text-gray-600 hover:bg-gray-100 focus:outline-none ${isActive(path) ? "bg-gray-200 text-gray-800" : ""}`}
            onClick={() => navigate(path)}
            aria-label={label}
          >
            <Icon className={`h-6 w-6 mx-auto mb-1 ${isActive(path) ? "text-gray-800" : "text-gray-500"}`} />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
