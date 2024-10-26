import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { FaWhatsapp } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import Option from "../../components/Option";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Base_url } from "../../utils/Base_url";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useSelector } from "react-redux";
import ListingCard from "../cards/ListingCard";
import { toast } from "react-toastify";
const NewLists = () => {
  const location = useLocation();
  const receivedData = location.state?.filter;

  console.log(receivedData?.data);

  const [newLists, setNewLists] = useState("grid");

  const [distinct, setDistinct] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get(`${Base_url}/admin/all-distinct-details`)
      .then((res) => {
        console.log(res.data);
        setDistinct(res.data.data);
      })
      .catch((error) => { });

    axios
      .get(`${Base_url}/user/ads`)
      .then((res) => {
        console.log(res);

        setBanners(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("Dealar"));
  const user = useSelector((state) => state.authReducer);
  const checkFunChat = (id) => {
    if (!userData) {
      navigate("/register");
    } else {
      const param = {
        userId1: user?.userToken,
        userId2: id,
      };

      axios
        .post(`${Base_url}/user/create-chat`, param)
        .then((res) => {
          console.log(res);

          if (res?.data?.success === true) {
            navigate("/dashboard/my-inbox");
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((error) => { });
    }
  };

  const clickButtons = async (messages) => {
    const params = {
      id: user?.userToken,
      action: messages,
    };
    const response = await axios
      .post(`${Base_url}/user/count-click`, params)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <Header />
      <div className="   mx-auto">
        <div className=" container mx-auto py-12">
          <div className="bg-[#ECECEC] py-9 rounded-2xl  border border-primary">
            <div className=" w-[80%] mx-auto text-center">
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
                    {distinct?.makes?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
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
                    {distinct?.models?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
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
                    {distinct?.years?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className=" md:w-60 w-full">
                  <label className="block text-sm text-left  font-semibold  text-textColor">
                    Vehicle Condition
                  </label>
                  <select
                    name="vehicleCondition"
                    // onChange={handleInputs}
                    // value={state.vehicleCondition}
                    className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-lg w-full border-[#E9DBDB]"
                  >
                    <option>Select Condition</option>
                    {/* {distinct?.vehicleConditions?.map((item, index) => ( */}
                    <option value={"new"}>New</option>
                    <option value={"old"}>Old</option>
                    <option value={"Scraped"}>Scraped</option>
                    {/* ))} */}
                  </select>
                </div>
                <div className="  md:w-60 w-full">
                  <label className="block text-sm text-left  font-semibold  text-textColor">
                    Seller Type
                  </label>
                  <select className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-lg w-full border-[#E9DBDB]">
                    <option>Select Seller</option>
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

        <div className=" my-8 px-4  md:flex block justify-between items-center">
          <div>
            <span className="  text-[#C1C1C1] text-lg font-medium">
              1 - 21 of <span className=" font-bold">4,221</span> used cars
            </span>
          </div>
          <div className=" flex gap-5 md:pt-0 pt-4">
            <div className=" sm:block hidden">
              <div className=" flex gap-4">
                <TfiLayoutGrid2Alt
                  onClick={() => setNewLists("grid")}
                  size={35}
                  className=" text-[#C1C1C1]"
                />
                <FaList
                  onClick={() => setNewLists("list")}
                  size={35}
                  className=" text-[#C1C1C1]"
                />
              </div>
            </div>

            <div className=" border rounded-md flex items-center justify-between p-1 w-56">
              <span className=" text-textColor font-semibold">
                Sort by : Newly added
              </span>
              <FaSortAmountUpAlt size={20} className=" text-[#C1C1C1]" />
            </div>
          </div>
        </div>

        {newLists === "grid" ? (
          <div className="my-12 mx-6">
            {receivedData?.data?.length > 0 ? (
              receivedData.data.reduce((acc, item, index) => {
                // Start a new row of 3 car listings
                if (index % 5 === 0) {
                  const adSetIndex = Math.floor(index / 5);

                  acc.push(
                    <div
                      // key={`row-${adSetIndex}`}
                      className="flex flex-wrap justify-between items-center gap-4 lg:flex-nowrap"
                    >
                      {/* Left Ad (if available) */}
                      <div className="w-28 flex-shrink-0  hidden lg:block">
                        {banners?.sideAds?.map((item, index) => {
                          return (
                            <a href={item?.redirectUrl} target="_blank" rel="noopener noreferrer">
                            <img
                              src={item?.imageUrl}
                              className="h-60 w-full mt-10 rounded-xl object-cover"
                              alt={`Left ad ${index}`}
                            />
                          </a>
                          );
                        })}
                      </div>

                      {/* Car Listings */}
                      <div className="flex flex-wrap justify-center gap-3 lg:gap-6 lg:flex-1">
                        {[0, 1, 2, 3, 4, 5].map((i) => {
                          if (index + i < receivedData.data.length) {
                            return (
                              <ListingCard
                                key={`car-${index + i}`}
                                item={receivedData.data[index + i]}
                                className=""
                              />
                            );
                          }
                          return null;
                        })}
                      </div>

                      {/* Right Ad (if available) */}
                      <div className="w-28 flex-shrink-0 hidden lg:block">
                        {banners?.sideAds?.map((item, index) => {
                          return (
                            <Link to={`${item?.redirectUrl}`}>

                              <img
                                src={item?.imageUrl}
                                className="h-60 w-full rounded-xl mt-10 object-cover"
                                alt={`Right ad ${index}`}
                              />
                            </Link>
                          )
                        })}


                      </div>
                    </div>
                  );

                  // Optionally, render banner ads below each row if available
                  if (banners?.bannerAds?.[adSetIndex]) {
                    acc.push(
                      <div
                        key={`banner-${adSetIndex}`}
                        className="h-72 w-full my-6"
                      >
                        {/* <Link to={`${banners.bannerAds[adSetIndex]?.redirectUrl}`}> */}
                        <a href={banners.bannerAds[adSetIndex]?.redirectUrl} target="_blank" rel="noopener noreferrer">
                          <img
                            src={banners.bannerAds[adSetIndex]?.imageUrl}
                            className="h-full w-full rounded-xl object-cover"
                            alt={`Banner ad ${adSetIndex}`}
                          />
                          </a>
                        {/* </Link> */}

                      </div>
                    );
                  }
                }

                return acc;
              }, [])
            ) : (
              <div className="flex justify-center items-center h-36">
                <p className="font-semibold text-xl">No card found</p>
              </div>
            )}
          </div>
        ) : (
          <div className=" my-12 flex flex-col gap-12">
            {receivedData?.data?.map((item, index) => {
              return (
                <div
                  className={` shadow-lg md:flex block    ${item?.type_of_ad === "Featured"
                      ? "border-primary border-4 "
                      : "border-[#B7DBFF] border"
                    }   rounded-2xl overflow-hidden`}
                >
                  <Link
                    to={`/car_details_page/${item._id}`}
                    className=" md:w-[30%]"
                  >
                    <div className=" h-80 relative">
                      <img
                        src={item?.car_images[0]}
                        className=" w-full  h-full object-cover"
                        alt=""
                      />
                      {item?.type_of_ad === "Featured" ? (
                        <div className=" absolute top-2 right-2">
                          <Button
                            label={"featured"}
                            className={
                              " uppercase py-1 bg-lightBlue  text-sm  text-white font-semibold rounded-3xl"
                            }
                          />
                        </div>
                      ) : null}
                      {item?.status === "sold" ? (
                        <div className=" absolute top-0 w-full h-full flex justify-center items-center   bg-[rgba(255,255,255,0.5)]">
                          <img
                            src={require("../../assets/images/sold_img.png")}
                            alt=""
                          />
                        </div>
                      ) : null}

                      <div className=" absolute bottom-0 flex justify-between w-full items-center px-2">
                        <div>
                          <img
                            src={require("../../assets/images/speed.png")}
                            alt=""
                          />
                        </div>
                        <div className=" w-8 h-8 flex justify-center items-center rounded-full bg-white">
                          <CiHeart size={20} />
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className=" w-[70%] flex justify-between p-5">
                    <div>
                      <h5 className=" text-textColor text-xl font-bold uppercase">
                        {item?.title}
                      </h5>
                      <h5 className=" pt-3 text-secondary text-lg font-bold uppercase">
                        qr {item?.price_QR}
                      </h5>
                      <h5 className=" text-green text-lg font-bold uppercase">
                        QR 16,00/month
                      </h5>

                      <div className="  mt-3 flex justify-between items-center">
                        <div className=" flex gap-2 items-center">
                          <img
                            src={require("../../assets/images/can.png")}
                            className=" w-4"
                            alt=""
                          />
                          <span className=" text-textColor font-bold">
                            {item?.year}
                          </span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <img
                            src={require("../../assets/images/cal.png")}
                            className=" w-6"
                            alt=""
                          />
                          <span className=" text-textColor font-bold">
                            {item?.cylinder} Cylinder
                          </span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <img
                            src={require("../../assets/images/road.png")}
                            className=" w-4"
                            alt=""
                          />
                          <span className=" text-textColor font-bold">
                            44, 882 KM
                          </span>
                        </div>
                      </div>

                      <div className=" flex gap-1 my-6">
                        <Button
                          label={"Warranty"}
                          Icons={
                            <img
                              src={require("../../assets/images/security.png")}
                              alt=""
                            />
                          }
                          className={
                            "  text-sm border-2 border-secondary rounded-md text-secondary  font-bold"
                          }
                        />
                        <Button
                          label={"Inspected"}
                          Icons={
                            <img
                              src={require("../../assets/images/Frame.png")}
                              alt=""
                            />
                          }
                          className={
                            " border-2 border-primary rounded-md text-primary  text-sm font-bold"
                          }
                        />
                      </div>

                      <span className=" text-base text-lightBlue">
                        Do you have a similar{" "}
                        <span className=" font-bold">Cheverolet Camaro </span>{" "}
                        to sell?{" "}
                        <span className=" font-bold">Sell it yourself!</span>
                      </span>
                    </div>
                    <div>
                      <Button
                        Icons={<IoCall size={20} />}
                        label={"Show Number"}
                        className={
                          " py-1.5 text-sm mt-3  bg-secondary text-white  rounded-3xl"
                        }
                      />
                      <Button
                        onClick={() => {
                          checkFunChat(item?.user?._id);
                        }}
                        Icons={
                          <img
                            src={require("../../assets/images/chat.png")}
                            alt=""
                          />
                        }
                        label={"Chat"}
                        className={
                          " py-1.5 text-sm bg-primary font-bold w-40 mt-3 text-white  rounded-3xl"
                        }
                      />
                      <Button
                        label={"Whatsapp"}
                        Icons={<FaWhatsapp size={20} />}
                        className={
                          " py-1.5 text-sm bg-green w-40 mt-3 text-white  rounded-3xl"
                        }
                      />
                      <Button
                        label={"Compare"}
                        className={
                          " py-1 text-sm bg-white mt-5 w-40  text-lightBlue  border-2   border-lightBlue font-semibold  "
                        }
                      />

                      <div className=" pt-2 float-right">
                        <img
                          src={require("../../assets/images/brands.png")}
                          className=" text-right"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NewLists;
