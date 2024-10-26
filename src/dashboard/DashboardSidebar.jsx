import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaUser, FaUsers, FaSignOutAlt, FaHome } from "react-icons/fa";

const DashboardSidebar = () => {
  const { user, userLogout } = useContext(AuthContext);
  //console.log({user});
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
          <p>Hello,</p>
          <p>{user?.displayName}</p>
          <p>{user?.email}</p>
        </div>
      </div>
      <div className="divider divider-neutral"></div>
      <nav className="flex-1 text-[12px] sm:text-sm">
        <ul>
          <li className="px-4 py-2 hover:bg-gray-700">
            <NavLink to="/dashboard" className="flex items-center space-x-2">
              <FaHome />
              <span>Dashboard</span>
            </NavLink>
          </li>
          {user?.isActive && (
            <li className="px-4 py-2 hover:bg-gray-700">
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600 font-semibold flex items-center space-x-2"
                    : "flex items-center space-x-2"
                }
              >
                <FaUser />
                <span>Profile</span>
              </NavLink>
            </li>
          )}
          {user?.isActive && user?.isAdmin && (
            <>
              <li className="px-4 py-2 hover:bg-gray-700">
                <NavLink
                  to="/dashboard/allusers"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 font-semibold flex items-center space-x-2"
                      : "flex items-center space-x-2"
                  }
                >
                  <FaUsers />
                  <span>All Users</span>
                </NavLink>
              </li>
            </>
          )}
          <li className="px-4 py-2 hover:bg-gray-700">
            <NavLink
              to="#"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
