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
import { Link, useLocation } from "react-router-dom";
import Input from "../../components/Input";
import moment from "moment";
const ListingBookingConfirmation = () => {
  const location = useLocation();
    const { data } = location.state || {};

    console.log(data);
    
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

        <div className="  rounded-lg mt-4 p-5">
          <h3 className=" text-secondary text-xl">{data?.planId?.name} Package</h3>
          {/* <p className=" text-xl">12A Workshop Industrial Area ,Doha,Qatar</p> */}
          <h6 className="h6">
            {data?.title}
            <span className="  font-normal"></span>
          </h6>
          <h6 className="h6">
            Mileage:{data?.mileage}kms
            <span className="  font-normal"></span>
          </h6>

          <h6 className="h6">
            Price:QR {data?.price_QR}
            <span className="  font-normal"></span>
          </h6>

          <div className="border-2 border-[#575656] mt-3">
            <h3 className="text-secondary font-bold text-xl text-center mx-auto mt-2 w-44 border-b-2 border-primary">
              Selected Plan
            </h3>
            <ul className="my-3 pl-4 ">
              <li className=" flex items-center gap-2">
                <h6 className="h6">Order Placed On:</h6>
                <span className="  font-normal">{moment(data?.updatedAt).format("MMM Do YY")}</span>
              </li>
              <li className=" flex items-center gap-2">
                <h6 className="h6">Plan: {data?.planId?.name}</h6>
              </li>
              <li className=" flex items-center gap-2">
                <h6 className="h6">Price:QR {data?.price_QR}</h6>
              </li>
              <li className="">
                <h6 className="h6">
                  Note: No Prepayment Needed Now! You May Pay Our Representative
                  Upon Their Visit
                </h6>
              </li>
            </ul>
            <div className="bg-primary border  border-[#575656] flex    justify-end  pr-4 items-center py-1.5">
              <div>
                <p className="m-0 text-xl text-right text-white font-semibold">
                  Total Price QR {data?.price_QR}
                </p>

                <p className=" flex gap-2 m-0 text-lg text-white">
                  <Input type={"checkbox"} /> YES,I have read & agreed to Terms
                  & Conditions and Privacy Policy
                </p>
              </div>
            </div>
          </div>

          <div className=" py-2 pt-3">
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
        <Link to={"/"}>
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
