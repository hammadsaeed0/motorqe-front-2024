import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import { CiHeart } from "react-icons/ci";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { FaHeart, FaWhatsapp } from "react-icons/fa";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import Input from "../../components/Input";

const ListingCard = ({ item, handleSelectCar, selectedCars }) => {
  const user = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  console.log(user?.userToken);

  const [isLiked, setIsLiked] = useState(
    item?.favorited_by_users?.includes(user?.userToken)
  );

  const isChecked = selectedCars.some((car) => car._id === item._id);

  const handleLikeDislike = async () => {
    try {
      setIsLiked(!isLiked);

      const params = {
        userId: user?.userToken,
        carId: item?._id,
      };
      const response = await axios.post(
        `${Base_url}/user/add-favorite`,
        params
      );

      if (response.data && response.data.likesCount !== undefined) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clickButtons = async (messages) => {
    const params = {
      id: item?._id,
      action: messages,
    };
    const response = await axios
      .post(`${Base_url}/user/count-click`, params)
      .then((res) => {
        console.log(res);
      });
  };
  const userData = JSON.parse(localStorage.getItem("Dealar"));

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
        .catch((error) => {});
    }
  };

  const handleCheckboxChange = (item) => {
    navigate("/compare-car", { state: { item } });
  };

  return (
    <>
      <div
        className={` shadow-lg    ${
          item?.type_of_ad === "Featured"
            ? "border-primary border-4 "
            : "border-[#B7DBFF] border"
        } rounded-2xl overflow-hidden`}
      >
        <div className="">
          <div className="relative   h-60">
            <Link to={`/car_details_page/${item._id}`}>
              <img
                src={item?.car_images[0]}
                className=" w-full h-full object-cover"
                alt=""
              />
            </Link>

            <div className=" absolute top-0 flex w-full justify-between ">
              <div>
              {item?.vehicle_condition === "New" && item?.mileage > 1000 ? (
  <div>
    <img src={require("../../assets/images/new.png")} alt="New" />
  </div>
) : null}

{item?.mileage < 1000 ? (
  <div>
    <img src={require("../../assets/images/lowmileage.png")} alt="Low Mileage" />
  </div>
) : null}
              </div>

              {item?.type_of_ad === "Featured" ? (
                <div className=" pt-3 pr-2.5">
                  <Button
                    label={"featured"}
                    className={
                      " uppercase py-1 bg-lightBlue  text-sm  text-white font-semibold rounded-3xl"
                    }
                  />
                </div>
              ) : null}
            </div>

            <div className=" absolute bottom-0 flex justify-between w-full items-center px-2">
              {item?.threeSixtyImage?.length === 0 ? null : (
                <div>
                  <img src={require("../../assets/images/speed.png")} alt="" />
                </div>
              )}

              <div className=" w-8 h-8 flex justify-center items-center rounded-full bg-white">
                {isLiked ? (
                  <FaHeart
                    color={"red"}
                    onClick={() => {
                      handleLikeDislike(item._id);
                    }}
                    size={20}
                  />
                ) : (
                  <CiHeart
                    onClick={() => {
                      handleLikeDislike(item._id);
                    }}
                    size={20}
                  />
                )}
              </div>
            </div>

            {item?.status === "sold" ? (
              <div className=" absolute top-0 w-full h-full flex justify-center items-center   bg-[rgba(255,255,255,0.5)]">
                <img src={require("../../assets/images/sold_img.png")} alt="" />
              </div>
            ) : null}
          </div>
        </div>
        <div className="  justify-between p-4">
          <div>
            <div className=" flex justify-between items-center">
              <h5 className=" text-textColor text-md font-bold uppercase">
                {item?.title}
              </h5>
              <div className="  float-right">
                {
                  item?.user?.profileStatus === "privateSeller" ? (
                    <img
                      src={item?.user?.image}
                      className=" text-right  w-12 h-12 rounded-full"
                      alt=""
                    />
                  ) : (
                    <></>
                  )
                  //  <img
                  //    src={require('../../assets/images/logo.png')}
                  //    className=" text-right  w-12 h-12"
                  //    alt=""
                  //  />
                }
              </div>
            </div>

            <div className=" flex pt-2 justify-between  items-center">
              <h5 className="  text-secondary  font-bold uppercase">
                qr  {Number(item?.price_QR).toLocaleString()}
              </h5>
              <h5 className=" text-green font-bold uppercase">
                QR {item?.installement}/month
              </h5>
            </div>

            <div className="  mt-3 flex justify-between items-center">
              <div className=" flex gap-2 items-center">
                <img
                  src={require("../../assets/images/can.png")}
                  className=" w-4"
                  alt=""
                />
                <span className=" text-textColor font-bold  text-sm">
                  {item?.year}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <img
                  src={require("../../assets/images/cal.png")}
                  className=" w-6"
                  alt=""
                />
                <span className=" text-textColor  text-sm font-bold">
                  {item?.cylinder} Cylinder
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <img
                  src={require("../../assets/images/road.png")}
                  className=" w-4"
                  alt=""
                />
                <span className=" text-textColor  text-sm font-bold">
                  {item?.mileage ? item?.mileage : 0} KM
                </span>
              </div>
            </div>
            <div className=" flex  justify-between items-center">
              <div className=" flex cursor-pointer gap-2 items-center">
                <h2 className="    text-secondary text-sm font-bold">Compare</h2>
                <Input
                  type="checkbox"
                  className={
                    " w-4 h-4 mt-1 cursor-pointer rounded-lg accent-secondary"
                  }
                  checked={isChecked}
                  onChange={() => handleSelectCar(item)}
                />
              </div>

              <div className=" flex gap-1 my-2">
                {item?.warranty === true ? (
                  <img
                    className=" "
                    src={require("../../assets/images/security.png")}
                    alt=""
                  />
                ) : null}

                {item?.inspected === true ? (
                  <img src={require("../../assets/images/Frame.png")} alt="" />
                ) : null}
              </div>
              <div>
                <h5 className=" text-sm font-bold text-textColor">
                  {moment(item?.updatedAt).startOf("hour").fromNow()}
                </h5>
              </div>
            </div>
          </div>

          <div className="  sm:flex block  justify-center gap-1 items-center">
            <Button
              onClick={() => clickButtons("call")}
              Icons={<IoCall size={16} />}
              label={"Call"}
              className={
                " py-1.5 mt-3 text-[13px]   w-full  bg-secondary text-white  rounded-3xl"
              }
            />
            <Button
              onClick={() => {
                clickButtons("message");

                checkFunChat(item?.user?._id);
              }}
              Icons={
                <img src={require("../../assets/images/chat.png")} className=" w-5" alt="" />
              }
              label={"Chat"}
              className={
                " py-1.5 text-[13px] bg-primary w-full  font-bold  mt-3 text-white  rounded-3xl"
              }
            />
            <Button
              onClick={() => clickButtons("whatsapp")}
              label={"Whatsapp"}
              Icons={<FaWhatsapp size={16} />}
              className={
                " py-1.5 text-[13px] bg-green w-full    mt-3 text-white  rounded-3xl"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingCard;
