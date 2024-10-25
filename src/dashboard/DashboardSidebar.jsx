import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import {
  FaUser,
  FaUsers,
  FaSignOutAlt,
  FaEdit,
  FaEnvelope,
  FaDashcube,
  FaHome,
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
    <div className="bg-gray-800 w-32 sm:w-[200px] text-white flex flex-col h-full">
      {/* Adjusting width based on screen size */}
      <div className="px-4 pt-4">
        <div className="text-[12px] sm:text-sm text-center">
          {/* <img
            src={user.photoURL ? user.photoURL : "/profile-placeholder.png"}
            className="w-20 h-20 rounded-full p-2 mx-auto"
            alt="User Photo"
          /> */}
          <p>Hello,</p>
          <p>{user?.displayName}</p>
          <p>{user?.email}</p>
        </div>
      </div>
      <div className="divider divider-neutral"></div>
      <nav className="flex-1 text-[12px] sm:text-sm">
        <ul>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <FaHome />
              <span>Dashboard</span>
            </Link>
          </li>
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
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
