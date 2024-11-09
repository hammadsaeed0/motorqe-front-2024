import React, { useEffect } from "react";

const SplashScreen = ({ onEnd }) => {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768; 

    
    if (isMobile) {
      const timer = setTimeout(() => {
        onEnd();
      }, 3000); 
      return () => clearTimeout(timer);
    } else {
      onEnd(); 
    }
  }, [onEnd]);

  return (
    <div className="block sm:hidden">
      <div className="fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center z-50">
        <img src={require("../../assets/images/logo.png")} alt="Logo" />
      </div>
    </div>
  );
};

export default SplashScreen;
