import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import DashboardNavbar from "../dashboard/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <DashboardNavbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar />
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
