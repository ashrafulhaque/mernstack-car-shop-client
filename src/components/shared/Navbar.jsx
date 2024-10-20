import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const user = null;
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

          <Link to="/" className="btn btn-ghost text-xl font-courgette">
            <img src="/nfslogo.png" className="w-14 font-sans" alt="Logo" />
            <span className="hidden md:block">NFS CARSHOP</span>
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
            <div className="flex items-center">
              <span className="text-pink-800 text-center font-semibold text-sm">
                Hello!<br></br>
                {user?.displayName}
              </span>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="Profile Image" src={user?.photoURL} />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li className="py-2">
                    <Link>Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
