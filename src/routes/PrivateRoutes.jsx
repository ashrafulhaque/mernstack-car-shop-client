import { AuthContext } from "../provider/AuthProvider";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  // Get the current path for redirection later
  const location = useLocation();

  // If the authentication state is still loading don't render anything
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is authenticated, render the requested route
  if (user) {
    return children;
  }

  // Otherwise, redirect to the login page and pass the current location
  return (
    <Navigate to="/login" replace state={{ redirectPath: location.pathname }} />
  );
};

export default PrivateRoutes;
