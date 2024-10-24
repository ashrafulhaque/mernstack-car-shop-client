import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import {
  FaUser,
  FaUsers,
  FaSignOutAlt,
  FaEdit,
  FaEnvelope,
} from "react-icons/fa";

const DashboardSidebar = () => {
  const { user, userLogout } = useContext(AuthContext);
  console.log({ user });
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };
  return (
    <div className="bg-gray-800 w-28 sm:w-64 text-white flex flex-col h-full">
      {/* Adjusting width based on screen size */}
      <div className="p-4 text-md sm:text-xl font-semibold">
        <Link to="/dashboard" className="block">
          Dashboard
        </Link>
      </div>
      <nav className="flex-1">
        <ul>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link
              to="/dashboard/profile"
              className="flex items-center space-x-2"
            >
              <FaUser />
              <span>Profile</span>
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link
              to="/dashboard/allusers"
              className="flex items-center space-x-2"
            >
              <FaUsers />
              <span>All Users</span>
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link
              to="#"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <FaSignOutAlt />
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
