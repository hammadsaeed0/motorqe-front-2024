import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../NavBAr/DashboardNavbar";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import {
  FaList,
  FaRegEnvelope,
  FaSortAmountUpAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import Button from "../../../../components/Button";
import Tabs from "../../../../components/Tabs";
import axios from "axios";
import { Base_url } from "../../../../utils/Base_url";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Input from "../../../../components/Input";
import { IoCall } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const GaragePageWhite = () => {


  const location = useLocation();
  const receivedData = location.state?.filter;

  console.log(receivedData,'jjjjjjjjjjjjjjjjj');


  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const tabData = [
    {
      title: "About",
      Icons: (
        <img
          src={require("../../../../assets/images/booking/about.png")}
          alt=""
        />
      ),
      content: (
        <>
          <div className=" p-4">
            <h2 className=" text-black font-semibold">
              About GSF Motor Works Ltd
            </h2>

            <p className=" text-textColor text-sm pt-3">
              GSF mOTOR wORKS lTD - Road 2 Dirt - Over 10 years experience in
              the motor vehicle industry, offering vehicle repairs and services
              at your doorstep. We have recognised over the years the demand for
              customers to be able to have their vehicles repaired in the
              comfort of their homes or workplace. We are dedicated to making
              our customers lives convenient and efficient.
            </p>
            <div className=" flex justify-between items-center">
              <div className=" w-96">
                <h3 className=" font-semibold text-textColor pt-4">
                  Opening Hours
                </h3>

                <ul className=" pt-6  leading-8">
                  <li className=" flex justify-between items-center">
                    <span>Monday:</span> <span>8:00 AM To 6:00 PM</span>
                  </li>
                  <li className=" flex justify-between items-center">
                    <span>Tuesday:</span> <span>8:00 AM To 6:00 PM</span>
                  </li>

                  <li className=" flex justify-between items-center">
                    <span>Wednesday:</span> <span>8:00 AM To 6:00 PM</span>
                  </li>
                  <li className=" flex justify-between items-center">
                    <span>Thursday:</span> <span>8:00 AM To 6:00 PM</span>
                  </li>
                  <li className=" flex justify-between items-center">
                    <span>Friday:</span> <span>8:00 AM To 6:00 PM</span>
                  </li>
                  <li className=" flex justify-between items-center">
                    <span>Saturday:</span> <span>8:00 AM To 6:00 PM</span>
                  </li>
                  <li className=" flex justify-between items-center">
                    <span>Sunday:</span> <span>Closed</span>
                  </li>
                </ul>
              </div>
              <div className=" w-72">
                <div className=" flex gap-3 justify-between">
                  <Button
                    Icons={<IoCall size={18} />}
                    label={"Call"}
                    className={
                      " py-1 text-md mt-3    bg-secondary text-white  rounded-lg"
                    }
                  />
                  <Button
                    label={"Whatsapp"}
                    Icons={<FaWhatsapp size={18} />}
                    className={
                      " py-2  text-md bg-green  mt-3 text-white  rounded-lg"
                    }
                  />
                </div>

                <Button
                  Icons={
                    <img
                      src={require("../../../../assets/images/booking/location.png")}
                      alt=""
                    />
                  }
                  label={"Get Location"}
                  className={
                    " py-1.5 text-md bg-primary  w-full  font-semibold  mt-3 text-white  rounded-lg"
                  }
                />
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Review",
      Icons: (
        <img
          src={require("../../../../assets/images/booking/review.png")}
          alt=""
        />
      ),
      content: (
        <>
          <div className=" p-4">
            <h2 className=" text-black font-semibold">Reviews and Ratings</h2>
            <h2 className="  text-textColor font-semibold">
              Average Ratings (4.98/5)
            </h2>

            <p className=" text-textColor text-sm pt-3">
              Second year of using Millenium for my MOT/Service. As a woman I
              can be quite wary of the attitude of mechanics when it comes to
              car maintenence and repairs - but dealing with the guys at
              Millenium is a breeze - they let me know up-front what needs
              doing, why, and how much it will cost with no hard-sell. As Arnie
              said "I'll be back".
            </p>
          </div>
        </>
      ),
    },
    {
      title: "Price",
      Icons: <span className=" text-secondary">OR</span>,
      content: (
        <>
          <div className=" p-4">
            <ul>
              <li className=" py-2 flex items-center justify-between">
                <span>
                  <h2 className=" text-textColor font-semibold">
                    Full Service
                  </h2>
                  <h2 className="  text-textColor ">
                    40 item - Yearly Service
                  </h2>
                </span>
                <Button
                  label={"What's included?"}
                  className={
                    " border  text-secondary  border-primary py-1  rounded-xl"
                  }
                />
                <span className=" text-textColor font-semibold">
                  QR. 287.23
                </span>
              </li>
              <hr />
              <li className=" py-2 flex items-center justify-between">
                <span>
                  <h2 className=" text-textColor font-semibold">
                    Full Service
                  </h2>
                  <h2 className="  text-textColor ">
                    40 item - Yearly Service
                  </h2>
                </span>
                <Button
                  label={"What's included?"}
                  className={
                    " border  text-secondary  border-primary py-1  rounded-xl"
                  }
                />
                <span className=" text-textColor font-semibold">
                  QR. 287.23
                </span>
              </li>
              <hr />
              <li className=" py-2 flex items-center justify-between">
                <span>
                  <h2 className=" text-textColor font-semibold">
                    Full Service
                  </h2>
                  <h2 className="  text-textColor ">
                    40 item - Yearly Service
                  </h2>
                </span>
                <Button
                  label={"What's included?"}
                  className={
                    " border  text-secondary  border-primary py-1  rounded-xl"
                  }
                />
                <span className=" text-textColor font-semibold">
                  QR. 287.23
                </span>
              </li>
              <hr />
              <li className=" py-2 flex items-center justify-between">
                <span>
                  <h2 className=" text-textColor font-semibold">
                    Full Service
                  </h2>
                  <h2 className="  text-textColor ">
                    40 item - Yearly Service
                  </h2>
                </span>
                <Button
                  label={"What's included?"}
                  className={
                    " border  text-secondary  border-primary py-1  rounded-xl"
                  }
                />
                <span className=" text-textColor font-semibold">
                  QR. 287.23
                </span>
              </li>
              <hr />
            </ul>
          </div>
        </>
      ),
    },
    {
      title: "Dates",
      Icons: (
        <img
          src={require("../../../../assets/images/booking/can.png")}
          alt=""
        />
      ),
      content: <></>,
    },
  ];
  const defaultTab = "About";

  const [garage, setGarage] = useState([]);
  var base_origin = window.location.origin;

  useEffect(() => {
    // Fetching garage data
    axios
      .get(`${Base_url}/user/garage?status=active`)
      .then((res) => {
        console.log(res.data);
        setGarage(res.data.garages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className=" container mx-auto">
        <div className=" py-12">
          <div className=" flex justify-between items-center gap-5 ">
            <div className="bg-[#F0F5FA] h-44 border justify-center flex  p-2.5 rounded-lg w-[22%]">
              <div>
                <h1 className=" text-secondary font-bold text-center text-2xl">
                  Your Car:
                </h1>
                <p className=" m-0 font-semibold text-[#575656] pt-3">
                  2018 Mercedes C63s Amg Service: Maintenance
                </p>
              </div>
            </div>
            <div className="w-[75%] flex flex-col gap-5">
              <div className=" py-9 px-7 rounded-2xl  w-full border-2 border-black">
                <div className="   mx-auto text-center">
                  <div className=" lg:flex block justify-center w-full gap-3">
                    <div className="  md:w-60 w-full">
                      <label className="block text-sm text-left  font-semibold  text-textColor">
                        Make
                      </label>
                      <select
                        // onChange={handleInputs}
                        name="make"
                        // value={state.make}
                        className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-lg w-full border-[#E9DBDB]"
                      >
                        <option selected>Select Make</option>

                        <option></option>
                      </select>
                    </div>
                    <div className="  md:w-60 w-full">
                      <label className="block text-sm text-left  font-semibold  text-textColor">
                        Model
                      </label>
                      <select
                        name="model"
                        // onChange={handleInputs}
                        // value={state.model}
                        className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-lg w-full border-[#E9DBDB]"
                      >
                        <option selected>Select Model</option>

                        <option></option>
                      </select>
                    </div>
                    <div className="  md:w-60 w-full">
                      <label className="block text-sm text-left  font-semibold  text-textColor">
                        Year
                      </label>
                      <select
                        name="Year"
                        // onChange={handleInputs}
                        // value={state.yearFrom}
                        className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-lg w-full border-[#E9DBDB]"
                      >
                        <option>Select Year</option>

                        <option>dafs</option>
                      </select>
                    </div>

                    <div className="  md:w-60 w-full">
                      <label className="block text-sm text-left  font-semibold  text-textColor">
                        Service
                      </label>
                      <select className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-lg w-full border-[#E9DBDB]">
                        <option>Select Service</option>
                        <option value={"Private Dealer"}>Private Dealer</option>
                        <option value={"Dealer"}>Dealer</option>
                      </select>
                    </div>
                  </div>

                  <div className=" pt-12">
                    <Button
                      label={"Search"}
                      className={
                        " bg-primary py-2 w-48 mx-auto text-white rounded-3xl"
                      }
                    />

                    <div className=" flex gap-2 justify-center pt-2">
                      <p className="text-secondary  border-b  border-secondary  font-medium">
                        Filters
                      </p>
                      <p className=" text-secondary  border-b  border-secondary  font-medium">
                        Clear Filters
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" my-8 px-4  md:flex block justify-between items-center">
          <div>
            <span className="  text-[#C1C1C1] text-lg font-medium">
              <strong>12</strong> garages found in your area
            </span>
          </div>
          <div className="  gap-5 md:pt-0 pt-4">
            <div className=" border rounded-md flex items-center justify-between p-2 w-64">
              <span className=" text-textColor font-semibold">
                Sort by : Distance
              </span>
              <FaSortAmountUpAlt size={20} className=" text-[#C1C1C1]" />
            </div>
          </div>
        </div>

        <div className=" gap-4 flex my-6">
          <div className=" bg-[#F0F5FA] border  p-2 rounded-lg w-[22%]">
            <div className=" pt-5">
              <span className="  font-semibold text-xl"> FILTERS</span>
            </div>
            {/* filter distance */}
            <div className=" pt-5">
              <span className="    text-textColor font-semibold uppercase">
                {" "}
                Distance
              </span>
              <div className="">
                <select className=" w-full py-1.5 bg-white border">
                  <option value={""}>3 kms</option>
                  <option value={""}>5 kms</option>
                </select>
              </div>
            </div>

            <Accordion
              className=" mt-5"
              open={open === 1}
              icon={<Icon id={1} open={open} />}
            >
              <AccordionHeader
                className=" text-lg   text-textColor"
                onClick={() => handleOpen(1)}
              >
                <h3> GARAGES & SERVICES</h3>
              </AccordionHeader>
              <AccordionBody>
                <div className=" flex flex-col gap-3">
                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      Body Repair & Paint
                    </span>
                  </div>

                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      Maintenance & Service
                    </span>
                  </div>

                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      PPE, Tinting,Detailing & Polish
                    </span>
                  </div>

                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      Car Wash
                    </span>
                  </div>

                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      Car Tires Centre
                    </span>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>

            <Accordion
              className=" mt-5"
              open={open === 2}
              icon={<Icon id={2} open={open} />}
            >
              <AccordionHeader
                className=" text-lg   text-textColor"
                onClick={() => handleOpen(2)}
              >
                <h3> EXTRAS</h3>
              </AccordionHeader>
              <AccordionBody>
                <div className=" flex flex-col gap-3">
                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      No-contact Collect{" "}
                    </span>
                  </div>

                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      Customer Drop-off
                    </span>
                  </div>

                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      Loan Car
                    </span>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>

            <Accordion
              className=" mt-5"
              open={open === 3}
              icon={<Icon id={3} open={open} />}
            >
              <AccordionHeader
                className=" text-lg    text-textColor"
                onClick={() => handleOpen(3)}
              >
                <h3> Additional Work</h3>
              </AccordionHeader>
              <AccordionBody>
                <div className=" flex flex-col gap-3">
                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      Oil & Filter Change{" "}
                    </span>
                  </div>

                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      Vehicle Safety Check
                    </span>
                  </div>

                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      Car Inspection & Diagnostic Check
                    </span>
                  </div>

                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      Air Conditioning Re-gas
                    </span>
                  </div>

                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      Brake Fluid Replacement
                    </span>
                  </div>

                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      Coolant Change
                    </span>
                  </div>

                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      Diagnostic Check
                    </span>
                  </div>

                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      Front Wheel Alignment
                    </span>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>

            <Accordion
              className=" mt-5"
              open={open === 4}
              icon={<Icon id={4} open={open} />}
            >
              <AccordionHeader
                className=" text-lg    text-textColor"
                onClick={() => handleOpen(4)}
              >
                <h3> Repairs</h3>
              </AccordionHeader>
              <AccordionBody>
                <div className=" flex flex-col gap-3">
                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      General Repair
                    </span>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>

            <Accordion
              className=" mt-5"
              open={open === 5}
              icon={<Icon id={5} open={open} />}
            >
              <AccordionHeader
                className=" text-lg    text-textColor"
                onClick={() => handleOpen(5)}
              >
                <h3> Home Service Garage</h3>
              </AccordionHeader>
              <AccordionBody>
                <div className=" flex flex-col gap-3">
                  <div className=" flex  gap-3 items-center">
                    <Input
                      type="checkbox"
                      className={" w-5 h-5 rounded-lg accent-primary"}
                      required={"required"}
                    />
                    <span className=" m-0 text-textColor  font-semibold">
                      Home/Mobile Service
                    </span>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
          </div>
          <div className=" w-[75%] flex flex-col gap-5">
            {receivedData?.map((item, index) => {
              return (
                <div className="  bg-[#F0F5FA]   h-48 overflow-auto  border-primary border-4 rounded-3xl pt-3 w-full">
                  <div className=" w-full flex gap-5">
                    <div className=" w-[20%] px-3">
                      <img
                        src={item?.logo}
                        className=" w-32"
                        alt=""
                      />

                      <h4 className=" text-black font-semibold pt-5">
                        CAR SPECIALIST
                      </h4>

                      <div className=" flex gap-2 flex-wrap  pt-2">
                        <img
                          src={require("../../../../assets/images/g1.png")}
                          alt=""
                        />
                        <img
                          src={require("../../../../assets/images/g2.png")}
                          alt=""
                        />
                        <img
                          src={require("../../../../assets/images/g3.png")}
                          alt=""
                        />
                        <img
                          src={require("../../../../assets/images/g4.png")}
                          alt=""
                        />
                        <img
                          src={require("../../../../assets/images/g5.png")}
                          alt=""
                        />
                        <img
                          src={require("../../../../assets/images/g6.png")}
                          alt=""
                        />
                      </div>
                    </div>

                    <div className=" w-[80%]">
                      <div className=" flex  px-3 justify-between items-center">
                        <h3 className=" text-secondary text-xl font-semibold">
                          {item?.garageName}
                        </h3>
                        <Button
                          label={"featured"}
                          className={
                            " uppercase py-1 bg-lightBlue  text-sm  text-white font-semibold rounded-3xl"
                          }
                        />
                      </div>
                      <div className=" flex px-3 justify-between">
                        <div className=" w-96">
                          <div>
                            <div className=" flex justify-between items-center   py-1 gap-2">
                              <div className=" flex gap-2">
                                <img
                                  src={require("../../../../assets/images/booking/location-dot-solid.png")}
                                  alt=""
                                />
                                <p className=" text-textColor   font-medium">
                                  {" "}
                                  1.15 Kms away
                                </p>
                              </div>
                              <div>
                                <ul className=" flex gap-1 items-center">
                                  <li>
                                    <TiStarFullOutline color="#F7A71E" />
                                  </li>
                                  <li>
                                    <TiStarFullOutline color="#F7A71E" />
                                  </li>
                                  <li>
                                    <TiStarFullOutline color="#F7A71E" />
                                  </li>
                                  <li>
                                    <TiStarFullOutline color="#F7A71E" />
                                  </li>
                                  <li>
                                    <TiStarFullOutline color="#F7A71E" />
                                  </li>
                                  <li>
                                    <span className=" text-[#676464]">
                                      23 Reviews
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div></div>
                          </div>

                          <div className=" flex py-1  gap-2">
                            <div>
                              <img
                                src={require("../../../../assets/images/booking/can.png")}
                                alt=""
                              />
                            </div>
                            <p className=" text-textColor    font-medium">
                              {" "}
                              Available from: 27/03/2023
                            </p>
                          </div>
                          <div className=" flex py-1  gap-2">
                            <div>
                              <img
                                src={require("../../../../assets/images/booking/check.png")}
                                alt=""
                              />
                            </div>
                            <p className=" text-textColor   font-medium">
                              {" "}
                              Collect & Deliver Bookable
                            </p>
                          </div>
                        </div>

                        <div className=" text-center">
                          <div className="mt-6 mb-3">
                            <span className=" font-bold text-2xl   text-textColor">
                              QR {item?.price}
                            </span>
                          </div>
                          <Button
                            onClick={() =>
                              navigate(`/garage/garage-details/${item?._id}`, {
                                item: item,
                              })
                            }
                            label={"Book Now"}
                            className={
                              " text-white py-1.5  rounded-md bg-primary"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GaragePageWhite;
