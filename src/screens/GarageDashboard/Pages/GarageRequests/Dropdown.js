import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Base_url } from "../../../../utils/Base_url";
import { toast } from "react-toastify";
import RescheduleRequests from "./RescheduleRequest";
const Dropdown = ({ isOpen, onClose, getData, setGarageRequest }) => {


  const [isModalOpen,setIsModalOpen]  =useState(false)
  const [singleData,setSingle]  =useState({})
  const storedData = localStorage.getItem("serviceProvider");

  let userData;

  if (storedData !== null) {
    try {
      userData = JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      userData = {}; // Handle parsing error (e.g., set to empty object)
    }
  } else {
    userData = {}; // Handle case where item does not exist
  }

  const dropdownRef = useRef();

  console.log(getData);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const UpdateStatus = (newStatus) => {
    console.log(newStatus);

    const params = {
      bookingId: getData?._id,
      status: newStatus,
    };
    axios
      .patch(`${Base_url}/user/book-garage`, params)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          toast.success(res.data.message);

          onClose();

          axios
            .get(`${Base_url}/user/my-booking/${userData}`)
            .then((res) => {
              console.log(res, "garage");
              setGarageRequest(res?.data?.bookings);
            })
            .catch((error) => {});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={`absolute top-5 z-30 right-0 bg-[#F3F3F5] shadow-md border mt-3
     ring-[#DFDFDF] rounded w-[200px] h-[200px] ${isOpen ? "" : "hidden"}`}
    >

      <RescheduleRequests getData={singleData} onClose={onClose} setIsModalOpen={setIsModalOpen}  isModalOpen={isModalOpen} setGarageRequest={setGarageRequest} />
      <div className="mt-2 flex text-[13px] text-base font-normal tracking-wider flex-row p-2">
        <div className="mt-2  gap-3 flex flex-col w-[40px] justify-center">
          <div className=" flex gap-2 items-center">
            <img
              src={require("../../../../assets/images/social/call.png")}
              alt="inbox"
              className=""
            />
            <p className="text-[#0C0CB8]">Call</p>
          </div>
          <div className=" flex gap-2 items-center">
            <img
              src={require("../../../../assets/images/social/whatapp.png")}
              alt="unread"
              className=""
            />
            <p className="text-[#0C0CB8]">Whatsapp</p>
          </div>
          <div
            onClick={() => {
              UpdateStatus("canceled");
            }}
            className=" flex gap-2 items-center"
          >
            <img
              src={require("../../../../assets/images/social/cancel.png")}
              alt="Block user"
              className=""
            />
            <p className="text-[#0C0CB8]">Cancel</p>
          </div>

          <div  onClick={()=>{
            setIsModalOpen(true);
            setSingle(getData)
          }} className=" flex  gap-2 items-center">
            <img
              src={require("../../../../assets/images/social/schedule.png")}
              alt="Report"
              className=""
            />

            <p className="text-[#0C0CB8]">Reschedule</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
