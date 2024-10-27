import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaSignOutAlt } from "react-icons/fa";

const DashboardNavbar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  return (
    <div className="navbar bg-neutral text-neutral-content sticky top-0 z-50 px-4 shadow-md">
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <img
            src="/nfslogo.png"
            className="w-14 h-14 object-contain"
            alt="NFS CARSHOP Logo"
          />
          <span className="hidden md:block text-xl font-bold tracking-wide">
            NFS CARSHOP
          </span>
        </Link>
      </div>

      <div className="flex-none">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-gray-200 transition-colors group"
        >
          <FaSignOutAlt className="text-neutral text-lg group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
