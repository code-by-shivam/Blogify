import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Moon, PenLine, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResponsiveNavBar from "./ResponsiveNavBar";

const linkCls = ({ isActive }) =>
  `text-sm transition-colors ${
    isActive ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
  }`;

export const NavBar = ({
  darkMode,
  handleDarkMode,
  isAuthenticated,
  username,
  setUsername,
  setIsAuthenticated,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    setUsername(null);
    setOpen(false);
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <nav className="page flex h-14 items-center justify-between gap-4 sm:h-16 sm:gap-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground">
            <PenLine className="size-4" />
          </span>
          Blogify
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {isAuthenticated && username ? (
            <>
              <NavLink to={`/profile/${username}`} className={linkCls}>@{username}</NavLink>
              <button onClick={logout} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signin" className={linkCls}>Login</NavLink>
              <NavLink to="/signup" className={linkCls}>Register</NavLink>
            </>
          )}
          <Button asChild size="sm">
            <Link to="/create">Write a post</Link>
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={handleDarkMode} aria-label="Toggle theme">
            {darkMode ? <Sun /> : <Moon />}
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <Button variant="ghost" size="icon-sm" onClick={handleDarkMode} aria-label="Toggle theme">
            {darkMode ? <Sun /> : <Moon />}
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>
      {open && (
        <ResponsiveNavBar
          isAuthenticated={isAuthenticated}
          username={username}
          logout={logout}
          close={() => setOpen(false)}
        />
      )}
    </header>
  );
};
