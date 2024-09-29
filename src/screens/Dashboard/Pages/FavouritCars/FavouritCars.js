import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Base_url } from "../../../../utils/Base_url";
import axios from "axios";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import DashboardNavbar from "../../NavBAr/DashboardNavbar";
import { useSelector } from "react-redux";
import { FaHeart, FaWhatsapp } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import Button from "../../../../components/Button";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";

const Input = ({ Icon, ...props }) => {
  return (
    <div className="relative flex items-center">
      <input {...props} />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        {Icon}
      </div>
    </div>
  );
};

const FavouritCars = () => {
  const [cars, setCars] = useState([]);

  console.log(cars, "usersss");

  const user = useSelector((state) => state.authReducer);
  useEffect(() => {
    axios
      .get(`${Base_url}/user/my-favorite/${user?.userToken}`)
      .then((res) => {
        console.log(res.data.data, "dfffffffffffffffffff");
        setCars(res.data.data);
      })
      .catch((error) => {});
  }, []);

  console.log(cars);

  return (
    <>
      <Header />
      <DashboardNavbar />
      <div className="flex flex-col items-center justify-center  mb-4">
        <div className="mt-16 flex items-center justify-between w-[90%] container">
          <h1 className="font-inter text-3xl font-semibold leading-10 tracking-normal text-left">
            My Favourite Cars
          </h1>
          <div className="relative mr-3">
            {/* Search Bar */}
            <Input
              Icon={<RiArrowDropDownLine className="size-7" />}
              placeholder="Filter by listing..."
              className="border-[#D2D2D2] border-2 md:w-50 w-60 pr-10 p-3 h-2"
            />
          </div>
        </div>

        {/* ------------------------------------- main product card -------------------------------------- */}
        <div className="w-[90%] container">
          <div className=" flex flex-wrap justify-center  my-12 gap-6">
            {cars?.map((item, index) => {
              return (
                <div className="border-4   w-[400px] border-primary  rounded-2xl overflow-hidden">
                  <div className="">
                    <div className="relative   h-60">
                      <Link to={`/car_details_page/${item?.carId?._id}`}>
                        <img
                          src={item?.carId?.car_images[0]}
                          className=" w-full h-full object-cover"
                          alt=""
                        />
                      </Link>

                      <div className=" absolute top-2 right-2">
                        {item?.carId?.featured === true ? (
                          <Button
                            label={"featured"}
                            className={
                              " uppercase py-1 bg-lightBlue  text-sm  text-white font-semibold rounded-3xl"
                            }
                          />
                        ) : null}
                      </div>

                      <div className=" absolute bottom-0 flex justify-between w-full items-center px-2">
                        <div>
                          <img
                            src={require("../../../../assets/images/speed.png")}
                            alt=""
                          />
                        </div>
                        <div className=" w-8 h-8 flex justify-center items-center rounded-full bg-white">
                          <FaHeart color={"red"} size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="  justify-between p-4">
                    <div>
                      <div className=" flex justify-between items-center">
                        <h5 className=" text-textColor text-lg font-bold uppercase">
                          {item?.carId?.title}
                        </h5>
                        <div className="  float-right">
                          <img
                            src={require("../../../../assets/images/brands.png")}
                            className=" text-right  w-12"
                            alt=""
                          />
                        </div>
                      </div>

                      <div className=" flex justify-between  items-center">
                        <h5 className=" pt-3 text-secondary text-lg font-bold uppercase">
                          qr {item?.carId?.price_QR}
                        </h5>
                        <h5 className=" text-green text-lg font-bold uppercase">
                          QR 16,00/month
                        </h5>
                      </div>

                      <div className="  mt-3 flex justify-between items-center">
                        <div className=" flex gap-2 items-center">
                          <img
                            src={require("../../../../assets/images/can.png")}
                            className=" w-4"
                            alt=""
                          />
                          <span className=" text-textColor font-bold sm:text-base text-sm">
                            {item?.carId?.year}
                          </span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <img
                            src={require("../../../../assets/images/cal.png")}
                            className=" w-6"
                            alt=""
                          />
                          <span className=" text-textColor  sm:text-base text-sm font-bold">
                            {item?.carId?.cylinder} Cylinder
                          </span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <img
                            src={require("../../../../assets/images/road.png")}
                            className=" w-4"
                            alt=""
                          />
                          <span className=" text-textColor sm:text-base text-sm font-bold">
                            44, 882 KM
                          </span>
                        </div>
                      </div>
                      <div className=" flex  justify-between items-center">
                        <div>
                          <h2 className="   text-secondary font-bold">
                            Compare
                          </h2>
                        </div>
                        <div className=" flex gap-1 my-2">
                          <img
                            src={require("../../../../assets/images/security.png")}
                            alt=""
                          />

                          <img
                            src={require("../../../../assets/images/Frame.png")}
                            alt=""
                          />
                        </div>
                        <div>
                          <h5 className=" font-bold text-textColor">
                            2 Hours Ago
                          </h5>
                        </div>
                      </div>
                    </div>

                    <div className="  sm:flex block justify-between gap-3 items-center">
                      <Button
                        Icons={<IoCall size={20} />}
                        label={"Call"}
                        className={
                          " py-1.5 text-sm mt-3  w-full  bg-secondary text-white  rounded-3xl"
                        }
                      />
                      <Button
                        Icons={
                          <img
                            src={require("../../../../assets/images/chat.png")}
                            alt=""
                          />
                        }
                        label={"Chat"}
                        className={
                          " py-1.5 text-sm bg-primary w-full  font-bold  mt-3 text-white  rounded-3xl"
                        }
                      />
                      <Button
                        label={"Whatsapp"}
                        Icons={<FaWhatsapp size={20} />}
                        className={
                          " py-1.5 text-sm bg-green w-full   mt-3 text-white  rounded-3xl"
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FavouritCars;
