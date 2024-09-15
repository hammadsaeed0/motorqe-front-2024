import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { FaHeart, FaWhatsapp } from "react-icons/fa";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";

const ListingCard = ({ item }) => {
  const user = useSelector((state) => state.authReducer);

  console.log(user);

  const [isLiked, setIsLiked] = useState(
    item?.favorited_by_users?.includes(user?.userToken?._id)
  );

  const handleLikeDislike = async () => {
    try {
      setIsLiked(!isLiked);

      const params = {
        userId: user?.userToken?._id,
        carId: item?._id,
      };
      const response = await axios.post(
        `${Base_url}/users/add-to-favorites`,
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
      userId: user?.userToken?._id,
      carListingId: item?._id,
      actionType: messages,
    };
    const response = await axios
      .post(`${Base_url}/dashboard/button-click`, params)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <div className="border-4   w-[400px] border-primary  rounded-2xl overflow-hidden">
        <div className="">
          <div className="relative   h-60">
            <Link to={`/car_details_page/${item._id}`}>
              <img
                src={item?.car_images[0]}
                className=" w-full h-full object-cover"
                alt=""
              />
            </Link>

            <div className=" absolute top-2 right-2">
              {item?.featured === true ? (
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
                <img src={require("../../assets/images/speed.png")} alt="" />
              </div>
              <div className=" w-8 h-8 flex justify-center items-center rounded-full bg-white">
                {isLiked ? (
                  <FaHeart
                    color={"red"}
                    // onClick={() => {
                    //   handleLikeDislike(item._id);
                    // }}
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
          </div>
        </div>
        <div className="  justify-between p-4">
          <div>
            <div className=" flex justify-between items-center">
              <h5 className=" text-textColor text-lg font-bold uppercase">
                {item?.title}
              </h5>
              <div className="  float-right">
                <img
                  src={require("../../assets/images/brands.png")}
                  className=" text-right  w-12"
                  alt=""
                />
              </div>
            </div>

            <div className=" flex justify-between  items-center">
              <h5 className=" pt-3 text-secondary text-lg font-bold uppercase">
                qr {item?.price_QR}
              </h5>
              <h5 className=" text-green text-lg font-bold uppercase">
                QR 16,00/month
              </h5>
            </div>

            <div className="  mt-3 flex justify-between items-center">
              <div className=" flex gap-2 items-center">
                <img
                  src={require("../../assets/images/can.png")}
                  className=" w-4"
                  alt=""
                />
                <span className=" text-textColor font-bold sm:text-base text-sm">
                  {item?.year}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <img
                  src={require("../../assets/images/cal.png")}
                  className=" w-6"
                  alt=""
                />
                <span className=" text-textColor  sm:text-base text-sm font-bold">
                  {item?.cylinder} Cylinder
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <img
                  src={require("../../assets/images/road.png")}
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
                <h2 className="   text-secondary font-bold">Compare</h2>
              </div>
              <div className=" flex gap-1 my-2">
                <img src={require("../../assets/images/security.png")} alt="" />

                <img src={require("../../assets/images/Frame.png")} alt="" />
              </div>
              <div>
                <h5 className=" font-bold text-textColor">2 Hours Ago</h5>
              </div>
            </div>
          </div>

          <div className="  sm:flex block justify-between items-center">
            <Button
              onClick={() => clickButtons("Call")}
              Icons={<IoCall size={20} />}
              label={"Call"}
              className={
                " py-1.5 text-sm mt-3  w-full  bg-secondary text-white  rounded-3xl"
              }
            />
            <Button
              onClick={() => clickButtons("Message")}
              Icons={
                <img src={require("../../assets/images/chat.png")} alt="" />
              }
              label={"Chat"}
              className={
                " py-1.5 text-sm bg-primary w-full  font-bold  mt-3 text-white  rounded-3xl"
              }
            />
            <Button
              onClick={() => clickButtons("WhatsApp")}
              label={"Whatsapp"}
              Icons={<FaWhatsapp size={20} />}
              className={
                " py-1.5 text-sm bg-green w-full   mt-3 text-white  rounded-3xl"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingCard;
