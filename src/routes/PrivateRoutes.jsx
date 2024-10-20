import { AuthContext } from "../provider/AuthProvider";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation(); // Get the current path for redirection later

  // If the authentication state is still loading, don't render anything yet.
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or a loading screen.
  }

  // If the user is authenticated, render the requested route
  if (user) {
    return children;
  }

  // Otherwise, redirect to the login page and pass the current location (for redirecting back after login)
  return (
    <Navigate to="/login" replace state={{ redirectPath: location.pathname }} />
  );
};

export default PrivateRoutes;
