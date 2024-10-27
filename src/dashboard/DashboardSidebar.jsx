import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import {
  FaUser,
  FaUsers,
  FaSignOutAlt,
  FaHome,
  FaList,
  FaCar,
  FaCartPlus,
} from "react-icons/fa";

const DashboardSidebar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  return (
    <aside className="bg-base-200 min-h-screen w-64 overflow-y-auto">
      {/* User Profile Section */}
      <div className="sticky top-0 bg-base-200 z-20 p-4 border-b border-base-300">
        <div className="flex flex-col items-center">
          <div className="avatar placeholder mb-3">
            <div className="bg-primary text-neutral-content rounded-full w-16">
              <img alt="Navbar Photo" src={user?.photoURL} />
            </div>
          </div>
          <div className="text-center space-y-1">
            <h3 className="font-semibold text-base-content">
              {user?.displayName}
            </h3>
            <p className="text-sm text-base-content/70">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="px-4 py-6">
        <ul className="menu menu-vertical gap-2">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-content font-medium"
                    : "hover:bg-base-300"
                }`
              }
            >
              <FaHome className="text-lg" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-content font-medium"
                    : "hover:bg-base-300"
                }`
              }
            >
              <FaUser className="text-lg" />
              <span>Profile</span>
            </NavLink>
          </li>

          {user?.isActive && !user?.isAdmin && (
            <li>
              <NavLink
                to="/dashboard/userproductlist"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-primary-content font-medium"
                      : "hover:bg-base-300"
                  }`
                }
              >
                <FaCartPlus className="text-lg" />
                <span>My Cars</span>
              </NavLink>
            </li>
          )}

          {user?.isActive && user?.isAdmin && (
            <>
              <li>
                <NavLink
                  to="/dashboard/allusers"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-primary-content font-medium"
                        : "hover:bg-base-300"
                    }`
                  }
                >
                  <FaUsers className="text-lg" />
                  <span>All Users</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/allcategories"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-primary-content font-medium"
                        : "hover:bg-base-300"
                    }`
                  }
                >
                  <FaList className="text-lg" />
                  <span>All Categories</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/allproducts"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-primary-content font-medium"
                        : "hover:bg-base-300"
                    }`
                  }
                >
                  <FaCar className="text-lg" />
                  <span>All Cars</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="w-full p-4 bg-base-200 border-t border-base-300">
        <button
          onClick={handleLogout}
          className="btn btn-error w-full gap-2 text-white"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
