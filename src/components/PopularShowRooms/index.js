
import React, { useRef } from "react";
const PopularShowRooms = ({ items }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 200;
    }
  };

  return (
    <div className="relative w-full container md:px-4 px-0 mx-auto">
      <div
        ref={scrollContainerRef}
        className="scroll-container transition-transform ease-out duration-500  productOverflow  overflow-x-auto whitespace-nowrap"
      >
        <div className=" scroll-item inline-block m-2 md:w-72    w-48 bg-white rounded">
          <img src={require("../../assets/images/b1.png")} alt="" />
        </div>
        <div className="  scroll-item inline-block m-2 md:w-72 w-48 bg-white rounded">
          <img src={require("../../assets/images/b2.png")} alt="" />
        </div>
        <div className=" scroll-item inline-block m-2  md:w-72 w-48 bg-white rounded">
          <img src={require("../../assets/images/b3.png")} alt="" />
        </div>
        <div className=" scroll-item inline-block m-2  md:w-72  w-48 bg-white rounded">
          <img src={require("../../assets/images/b4.png")} alt="" />
        </div>
        <div className=" scroll-item inline-block m-2  md:w-72  w-48 bg-white rounded">
          <img src={require("../../assets/images/b4.png")} alt="" />
        </div>
      </div>

      <div className=" md:block hidden">
        <button
          className="arrow arrow-left absolute -left-4  flex  pr-1   justify-center  items-center  top-20 rounded-full  bg-secondary w-16 h-16"
          onClick={scrollLeft}
        >
      
          <img
            src={require("../../assets/images/leftarrow.png")}
            className=" w-6"
            alt=""
          />
        </button>
        <button
          className="arrow arrow-right absolute -right-4  flex justify-center pl-1 items-center  top-20 rounded-full  bg-secondary w-16 h-16"
          onClick={scrollRight}
        >
         
          <img
            src={require("../../assets/images/rightarrow.png")}
            className=" w-6"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default PopularShowRooms;
