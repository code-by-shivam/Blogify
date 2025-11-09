import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { FaHamburger } from "react-icons/fa";
import ResponsiveNavBar from "./ResponsiveNavBar";
import { Link, NavLink } from "react-router-dom";
export const NavBar = ({
  darkMode,
  handleDarkMode,
  isAuthenticated,
  username,
  setUsername,
  setIsAuthenticated,
}) => {
  const [showNavBar, setShowNavBar] = useState(false);
  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    setUsername(null);
  }
  return (
    <>
      <nav className="max-container padding-x py-6 flex justify-between items-center gap-6 sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <Link to="/" className="text-gray-900 text-2xl font-semibold dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
          Blogify
        </Link>
        <ul className="flex items-center justify-end gap-9 text-gray-600 lg:flex-1 max-md:hidden dark:text-gray-300">
          {isAuthenticated && username ? (
            <>
              <li>
                <NavLink
                  to={`/profile/${username}`}
                  className={({ isActive }) => (isActive ? "active text-gray-900 dark:text-white font-medium" : "hover:text-gray-900 dark:hover:text-white transition-colors duration-200")}
                >
                  Hi, {username}
                </NavLink>
              </li>
              <li onClick={logout} className="cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                Logout
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/signin"
                  className={({ isActive }) => (isActive ? "active text-gray-900 dark:text-white font-medium" : "hover:text-gray-900 dark:hover:text-white transition-colors duration-200")}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => (isActive ? "active text-gray-900 dark:text-white font-medium" : "hover:text-gray-900 dark:hover:text-white transition-colors duration-200")}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}

          <li className="font-semibold">
            <NavLink
              to="/create"
              className={({ isActive }) => (isActive ? "active text-gray-900 dark:text-white font-semibold" : "hover:text-gray-900 dark:hover:text-white transition-colors duration-200")}
            >
              Create Post
            </NavLink>
          </li>
        </ul>
        <Switch onCheckedChange={handleDarkMode} checked={darkMode} />
        <FaHamburger
          className="text-2xl cursor-pointer hidden max-md:block text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300 transition-colors duration-200"
          onClick={() => setShowNavBar((curr) => !curr)}
        />
      </nav>
      {showNavBar && (
        <ResponsiveNavBar
          isAuthenticated={isAuthenticated}
          username={username}
          logout={logout}
        />
      )}
    </>
  );
};