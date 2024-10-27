import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import {
  FaUsers,
  FaCarSide,
  FaListAlt,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";

import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalCategories: 0,
    totalSales: 0,
    userPurchases: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (user?.isAdmin) {
          // Fetch admin stats
          const [usersRes, productsRes, categoriesRes, salesRes] =
            await Promise.all([
              fetch("https://mernstack-car-shop-server.vercel.app/userList"),
              fetch("https://mernstack-car-shop-server.vercel.app/products"),
              fetch("https://mernstack-car-shop-server.vercel.app/categories"),
              fetch("https://mernstack-car-shop-server.vercel.app/productcart"),
            ]);

          const [users, products, categories, sales] = await Promise.all([
            usersRes.json(),
            productsRes.json(),
            categoriesRes.json(),
            salesRes.json(),
          ]);

          setStats({
            totalUsers: users.length,
            totalProducts: products.length,
            totalCategories: categories.length,
            totalSales: sales.length,
            userPurchases: [],
          });
        } else {
          // Fetch user-specific stats
          const purchasesRes = await fetch(
            "https://mernstack-car-shop-server.vercel.app/productcart"
          );
          const purchases = await purchasesRes.json();
          const userPurchases = purchases.filter(
            (purchase) => purchase.email === user?.email
          );

          setStats({
            totalUsers: 0,
            totalProducts: 0,
            totalCategories: 0,
            totalSales: 0,
            userPurchases,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const AdminDashboard = () => (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Welcome, {user?.displayName}</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <FaUsers className="text-3xl" />
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">{stats.totalUsers}</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaCarSide className="text-3xl" />
            </div>
            <div className="stat-title">Total Cars</div>
            <div className="stat-value text-secondary">
              {stats.totalProducts}
            </div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-accent">
              <FaListAlt className="text-3xl" />
            </div>
            <div className="stat-title">Categories</div>
            <div className="stat-value text-accent">
              {stats.totalCategories}
            </div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-success">
              <FaShoppingCart className="text-3xl" />
            </div>
            <div className="stat-title">Total Sales</div>
            <div className="stat-value text-success">{stats.totalSales}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn btn-primary">Add New Car</button>
            <button className="btn btn-secondary">Manage Users</button>
            <button className="btn btn-accent">Add Category</button>
          </div>
        </div>
      </div>
    </div>
  );

  const UserDashboard = () => (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Welcome, {user?.displayName}</h2>

      {/* User Stats */}
      <div className="stats shadow w-full">
        <div className="stat">
          <div className="stat-figure text-primary">
            <FaCarSide className="text-3xl" />
          </div>
          <div className="stat-title">Your Cars</div>
          <div className="stat-value text-primary">
            {stats.userPurchases.length}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaDollarSign className="text-3xl" />
          </div>
          <div className="stat-title">Total Spent</div>
          <div className="stat-value text-secondary">
            $
            {stats.userPurchases
              .reduce(
                (sum, purchase) => sum + (parseInt(purchase.price) || 0),
                0
              )
              .toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>NFS CarShop | Dashboard</title>
      </Helmet>
      <div className="bg-base-200 min-h-screen">
        {user?.isAdmin ? <AdminDashboard /> : <UserDashboard />}
      </div>
    </>
  );
};

export default Dashboard;
