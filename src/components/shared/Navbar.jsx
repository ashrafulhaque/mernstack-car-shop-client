import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current route is '/dashboard'
  const isDashboardRoute = location.pathname === "/dashboard";

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };
  return (
    <>
      <div className="navbar bg-base-100 border border-b-2 sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/allproducts">ALL Products</NavLink>
              </li>
            </ul>
          </div>

          <Link
            to="/"
            className="btn btn-ghost text-xl font-courgette hover:bg-inherit"
          >
            <img src="/nfslogo.png" className="w-14 font-sans" alt="Logo" />
            <span className="hidden md:block font-bold">NFS CARSHOP</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[15px]">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/allproducts">All Products</NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {!user ? (
            <div className="flex gap-2">
              <NavLink
                to="/signup"
                className="btn btn-primary btn-outline min-h-9 h-9"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="btn btn-primary btn-outline min-h-9 h-9"
              >
                Login
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="text-center">
                <span className="text-pink-800 text-center font-semibold text-sm">
                  {user?.displayName}
                </span>
              </div>
              {!isDashboardRoute ? (
                // Show Dashboard button if not on /dashboard
                <div className="btn btn-info min-h-10 h-10">
                  <Link to="/dashboard">Dashboard</Link>
                </div>
              ) : (
                // Show Logout button if on /dashboard
                <div
                  className="btn btn-error min-h-10 h-10"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              )}
            </div>
          )}

          <label className="grid cursor-pointer place-items-center ml-2">
            <input
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
            />
            <svg
              className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>
      </div>
    </>
  );
};

export default Navbar;
