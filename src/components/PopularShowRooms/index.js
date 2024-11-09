import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Base_url } from "../../utils/Base_url";

const PopularShowRooms = ({ items }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth", // Slow and smooth scrolling
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth", // Slow and smooth scrolling
      });
    }
  };

  const [makes, setMakes] = useState([]);

  useEffect(() => {
    axios
      .get(`${Base_url}/admin/all-make`)
      .then((res) => {
        console.log(res.data);
        setMakes(res.data.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <div className="relative w-full container md:px-4 px-0 pt-10 mx-auto">
      <div
        ref={scrollContainerRef}
        className="scroll-container transition-transform ease-out duration-500 productOverflow overflow-x-auto whitespace-nowrap"
      >
        {makes?.map((item, index) => {
          return (
            <div
              key={index}
              className="scroll-item inline-block m-2.5 w-32 h-32 bg-white rounded"
            >
              <img
                src={item?.logoUrl}
                className="w-full h-full object-contain"
                alt=""
              />
            </div>
          );
        })}
      </div>

      {/* Arrows for scrolling */}
      <div className="md:block hidden">
        <button
          className="arrow arrow-left absolute -left-4 flex pr-1 justify-center items-center top-20 rounded-full bg-secondary w-16 h-16"
          onClick={scrollLeft}
        >
          <img
            src={require("../../assets/images/leftarrow.png")}
            className="w-6"
            alt="Left Arrow"
          />
        </button>
        <button
          className="arrow arrow-right absolute -right-4 flex justify-center pl-1 items-center top-20 rounded-full bg-secondary w-16 h-16"
          onClick={scrollRight}
        >
          <img
            src={require("../../assets/images/rightarrow.png")}
            className="w-6"
            alt="Right Arrow"
          />
        </button>
      </div>
    </div>
  );
};

export default PopularShowRooms;
