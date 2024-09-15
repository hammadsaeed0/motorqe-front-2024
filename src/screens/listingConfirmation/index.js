import React from "react";
import { FaAngleRight, FaLocationDot, FaWhatsapp } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from "react-icons/lia";
import Button from "../../components/Button";
import { IoCall, IoClose } from "react-icons/io5";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";
const ListingBookingConfirmation = () => {


  return (
    <div>
      <Header />
      <div className=" py-8 text-center">
        <h2 className=" h2  text-center">Sell Your Car </h2>
        <p className=" pt-2 text-gray-400">
        Sell your car in seconds with just a few clicks
        </p>
      </div>
      <div className=" py-8">
        <ul className=" flex gap-8 justify-center items-center">
          {/* <li className=" flex items-center gap-2">
            <div className=" w-8 h-8 bg-secondary items-center  rounded-full flex justify-center">
              <p className=" text-white">1</p>
            </div>
            <div>
              <span className=" text-secondary font-bold">Garage</span>
            </div>
          </li> */}
          {/* <li>
            <FaAngleRight className=" text-gray-500" />
          </li> */}
          <li className=" flex items-center gap-2">
            <div className=" w-8 h-8 bg-primary items-center  rounded-full flex justify-center">
              <p className=" text-white">5</p>
            </div>
            <div>
              <span className=" text-primary font-bold">Confirmation</span>
            </div>
          </li>
        </ul>
      </div>

      <div className=" pb-12 shadow-md rounded-xl mt-8 py-5 px-12 mx-auto  w-[80%]">
        <div className="">
          <h2 className=" h3  text-center">
          Your Listing is under Review & will be Live shortly!
          </h2>
        </div>

        <div className=" bg-[#FEFBFB] border rounded-lg mt-4 p-5">
          <h3 className=" text-secondary text-xl">Platinum Package</h3>
          <p className=" text-xl">12A Workshop Industrial Area ,Doha,Qatar</p>
          <div className=" flex gap-3 items-center mb-2">
            <Button
              Icons={<IoCall size={15} />}
              label={"12553"}
              className={
                " py-1.5 text-sm mt-3  bg-secondary text-white  rounded-md"
              }
            />
            <Button
              label={"8483"}
              Icons={<FaWhatsapp size={15} />}
              className={
                " py-1.5 text-sm bg-green  mt-3 text-white  rounded-md"
              }
            />
            <Button
              Icons={<FaLocationCrosshairs size={15} />}
              label={"Location"}
              className={
                " py-1.5 text-sm bg-primary font-bold mt-3 text-white  rounded-md"
              }
            />
            {/* <Button
              Icons={<FaLocationCrosshairs size={15} />}
              label={"Cancel"}
              className={
                " py-1.5 text-sm bg-primary font-bold mt-3 text-white  rounded-md"
              }
            /> */}
            <Button
              Icons={<IoClose size={20} />}
              label={"Cancel"}
              className={
                " py-1.5 text-sm bg-[#D32525] font-bold mt-3 text-white  rounded-md"
              }
            />
          </div>

          <h6 className="h6 pt-12">
            Order Placed On
            <span className="  font-normal">Sundary 16 July 2023</span>
          </h6>

          
          <h6 className="h6 pt-12">
             Price:QR 150
            <span className="  font-normal"></span>
          </h6>
        
        

          <h6 className=" h6 pt-5 pb-8">
            Note: No Prepayment needed now! You May Pay Our Member Upon  Their Visit
          </h6>
        
          <div className=" py-2">
            <h6 className=" h6">Important information</h6>
            <p>Please note that terms & conditions & policies apply.</p>
          </div>

          <h6 className=" h6 pt-8">
            Copyright © 2023 motorqe.com. All rights reserved.
          </h6>
        </div>
      </div>

      <div className=" container px-12 flex justify-between items-center mx-auto mt-10 mb-20">
        <div className="  flex items-center gap-3">
          <LiaLongArrowAltLeftSolid />
          <span className=" text-textColor font-semibold">Back</span>
        </div>
        <Link to={'/'} >
          <Button
      
            label={"Submit"}
            className={
              " bg-primary font-bold rounded-3xl text-white w-44 py-1.5"
            }
          />
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default ListingBookingConfirmation;
