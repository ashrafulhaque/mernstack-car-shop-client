import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const DashboardNavbar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };
  return (
    <>
      <div className="navbar bg-neutral text-neutral-content sticky top-0 z-50">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost text-xl font-courgette hover:bg-inherit"
          >
            <img src="/nfslogo.png" className="w-14 font-sans" alt="Logo" />
            <span className="hidden md:block font-bold">NFS CARSHOP</span>
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-[1] mt-3 w-32 p-2 shadow"
            >
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
