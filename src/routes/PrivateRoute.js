import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = ({ component: component, ...rest }) => {
  const token = localStorage.getItem("userToken");
  return token ? <Outlet /> : <Navigate to="/register" />;
};

export default PrivateRoute;
