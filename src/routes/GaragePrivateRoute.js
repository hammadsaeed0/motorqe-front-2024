import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const GaragePrivateRoute = () => {
  // Get the service provider token from local storage
  const storedToken = localStorage.getItem("serviceProvider");
    
  // Initialize token safely
  let token = null;
  if (storedToken) {
    try {
      token = JSON.parse(storedToken);
    } catch (error) {
      console.error("Failed to parse serviceProvider from localStorage", error);
    }
  }

  
  const workshopCreated = localStorage.getItem("workshopCreated");

  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    if (!token && !workshopCreated && !hasShownToast) {
      
      toast.info("Please create your workshop service, wait for admin approval, and log in again to access other pages.");
      setHasShownToast(true);

      
    }
  }, [token, workshopCreated, hasShownToast]);
  
  if (!token) {
    if ( !token || workshopCreated !== "1") {
      return <Navigate to="/garage/dashboard/workshop-services" />;
    }
  }
  
 
  return <Outlet />;
};

export default GaragePrivateRoute;
