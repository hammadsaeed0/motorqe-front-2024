import React from "react";
import { Navigate } from "react-router-dom";

const GaragePublicRoute = ({ children }) => {
  const token = localStorage.getItem("serviceProvider");

  // If the token exists, redirect to workshop services, else render the children components
  return token ? <Navigate to="/register" /> : children;
};

export default GaragePublicRoute;
