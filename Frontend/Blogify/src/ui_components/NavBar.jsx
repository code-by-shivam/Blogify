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
      <nav className="max-container padding-x py-6 flex justify-between items-center  gap-6 sticky top-0 z-10 bg-[#F6F6F7] dark:bg-[#141624]">
        <Link to="/" className="text-[#141624] text-2xl dark:text-[#FFFFFF]">
          Blogify
        </Link>
        <ul className="flex items-center  justify-end gap-9 text-[#3B3C4A] lg:flex-1 max-md:hidden dark:text-[#FFFFFF]">
          {/* <li>
           <NavLink to="/profile" className={({isActive})=> isActive ? "active" : " "}>Hi, Shivam</NavLink>
        </li> */}
          {isAuthenticated ? (
            <>
              <li>Hi, {username}</li>
              <li onClick={logout} className="cursor-pointer">
                Logout
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/signin"
                  className={({ isActive }) => (isActive ? "active" : " ")}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => (isActive ? "active" : " ")}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}

          <li className="font-semibold">
            <NavLink
              to="/create"
              className={({ isActive }) => (isActive ? "active" : " ")}
            >
              Create Post
            </NavLink>
          </li>
        </ul>
        <Switch onCheckedChange={handleDarkMode} checked={darkMode} />
        <FaHamburger
          className="text-2xl cursor-pointer hidden max-md:block dark:text-white"
          onClick={() => setShowNavBar((curr) => !curr)}
        />
      </nav>
      {showNavBar && <ResponsiveNavBar isAuthenticated={isAuthenticated} username={username} logout={logout} />}
    </>
  );
};
