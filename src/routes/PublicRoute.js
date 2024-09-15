import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("userToken");

  // If the token exists, redirect to the home page, else render the children components
  return token ? <Navigate to="/car_details" /> : children;
};

export default PublicRoute;