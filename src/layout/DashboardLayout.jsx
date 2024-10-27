import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import DashboardNavbar from "../dashboard/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <>
      <DashboardNavbar />
      <div className="flex min-h-screen bg-base-100">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
