import React, { useState } from "react";
import Button from "./Button";
import { IoClose } from "react-icons/io5";

const Announcement = ({ message, link, linkText, bgColor = "bg-blue-500", textColor = "text-white" }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => setIsVisible(false);

  return (
    isVisible && (
      <div className={`w-full py-3 sm:px-5 px-2 ${bgColor} ${textColor} flex justify-between block sm:hidden items-center`}>
       
        <div  className=" flex gap-3 items-center">
        <button onClick={handleClose} className=" text-lg font-bold">
        <IoClose />
        </button>
        <h1 className=" text-sm">For superior experience <br/> <span className="  text-base font-semibold">Download Motorqe App</span></h1>
        </div>
        <div>
            <Button label={'Open App'} className={' bg-primary  text-white py-2 rounded-lg text-sm'} />
        </div>
      </div>
    )
  );
};

export default Announcement;
