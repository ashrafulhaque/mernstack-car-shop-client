import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProductsPage from "../pages/AllProductsPage";
import ProductDetails from "../pages/ProductDetailsPage";
import PrivateRoutes from "./PrivateRoutes";
import ProductsByCatPage from "../pages/ProductsByCatPage";

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
    ],
  },
  {
    path: "/allproducts",
    element: (
      <PrivateRoutes>
        <ProductsPage />
      </PrivateRoutes>
    ),
  },
  {
    path: "/allproducts/:category",
    element: (
      <PrivateRoutes>
        <ProductsByCatPage />
      </PrivateRoutes>
    ),
  },
  {
    path: "/allproducts/:id",
    element: (
      <PrivateRoutes>
        <ProductDetails />
      </PrivateRoutes>
    ),
  },
]);

export default router;
