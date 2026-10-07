import { NavLink } from "react-router-dom";

const item = ({ isActive }) =>
  `block rounded-lg px-3 py-2.5 text-sm ${
    isActive ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:bg-muted"
  }`;

const ResponsiveNavBar = ({ username, logout, isAuthenticated, close }) => (
  <div className="border-t bg-background md:hidden">
    <ul className="page flex flex-col gap-1 py-3">
      {isAuthenticated && username ? (
        <>
          <li><NavLink to={`/profile/${username}`} onClick={close} className={item}>@{username}</NavLink></li>
          <li>
            <button onClick={logout} className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-muted">
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li><NavLink to="/signin" onClick={close} className={item}>Login</NavLink></li>
          <li><NavLink to="/signup" onClick={close} className={item}>Register</NavLink></li>
        </>
      )}
      <li><NavLink to="/create" onClick={close} className={item}>Write a post</NavLink></li>
    </ul>
  </div>
);

export default ResponsiveNavBar;
