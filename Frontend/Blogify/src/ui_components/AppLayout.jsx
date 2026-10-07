import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { NavBar } from "./NavBar";
import Footer from "./Footer";

const AppLayout = ({ isAuthenticated, username, setUsername, setIsAuthenticated }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("dark");
    return stored === null
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : stored === "true";
  });

  // Toggle on <html> so portaled UI (select menus, toasts) themes correctly too.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("dark", String(next));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar
        darkMode={darkMode}
        handleDarkMode={handleDarkMode}
        isAuthenticated={isAuthenticated}
        username={username}
        setUsername={setUsername}
        setIsAuthenticated={setIsAuthenticated}
      />
      <ToastContainer position="bottom-right" theme={darkMode ? "dark" : "light"} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
