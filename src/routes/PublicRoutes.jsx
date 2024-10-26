import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProductsPage from "../pages/AllProductsPage";
import ProductsByCatPage from "../pages/ProductsByCatPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import Profile from "../dashboard/Profile";
import AllUsers from "../dashboard/AllUsers";
import AllCategories from "../dashboard/AllCategories";
import AllProducts from "../dashboard/AllProducts";
import UserProductList from "../dashboard/UserProductList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "/allproducts",
        element: <ProductsPage />,
      },
      {
        path: "/productsbycaterogy/:id",
        element: <ProductsByCatPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      { path: "", element: <Dashboard /> },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "allusers",
        element: <AllUsers />,
      },
      {
        path: "allcategories",
        element: <AllCategories />,
      },
      {
        path: "allproducts",
        element: <AllProducts />,
      },
      {
        path: "userproductlist",
        element: <UserProductList />,
      },
    ],
  },
]);

export default router;
