import React, { useEffect, useState } from "react";
import { FaAngleRight, FaLocationDot, FaWhatsapp } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from "react-icons/lia";
import Button from "../../../../components/Button";
import { IoCall, IoClose } from "react-icons/io5";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import { Base_url } from "../../../../utils/Base_url";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Input from "../../../../components/Input";
const GarageConfirm = () => {
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("Dealar"));
  const location = useLocation();
  const { date, time, contact, additionalNotes } = location.state || {};

  const [loading, setLoader] = useState(false);
  const navigate = useNavigate();

  const [newListings, setNewListings] = useState({});

  const totalPrice = newListings?.servicesAndPrices?.reduce((acc, item) => {
    return acc + parseFloat(item?.price || 0); // Ensure price is a number
  }, 0);

  const grandTotal = totalPrice + parseFloat(newListings?.price || 0);

  const handlerSubmit = (e) => {
    setLoader(true);
    e.preventDefault();

    const params = {
      userId:userData?._id,
      garageId: newListings?._id,
      date: date,
      time: time,
      contactNumber: contact,
      totalPrice: grandTotal,
    };

    axios
      .post(`${Base_url}/user/book-garage`, params)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          toast.success(res?.data?.message);
          navigate(`/`);
          setLoader(false);
        } else {
          toast.error(res?.data?.message);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
        setLoader(false);
      });
  };

  useEffect(() => {
    axios
      .get(`${Base_url}/user/single-garage/${id}`)
      .then((res) => {
        console.log(res);
        setNewListings(res?.data?.data);
      })
      .catch((error) => {});
  }, [id]);

  return (
    <div>
      <Header />
      <div className=" py-8 text-center">
        <h2 className=" h2  text-center">Car Service Booking </h2>
        <p className=" pt-2 text-gray-400">
          Service your car in seconds with just a few clicks
        </p>
      </div>
      <div className=" py-8">
        <ul className=" flex gap-8 justify-center items-center">
          <li className=" flex items-center gap-2">
            <div className=" w-10 h-10 bg-secondary items-center  rounded-full flex justify-center">
              <p className=" text-white">1</p>
            </div>
            <div>
              <span className=" text-secondary  font-semibold">Garage</span>
            </div>
          </li>
          <li>
            <FaAngleRight size={25} className=" text-secondary" />
          </li>
          <li className=" flex items-center gap-2">
            <div className=" w-10 h-10 bg-secondary items-center border-[secondary] border  rounded-full flex justify-center">
              <p className="  text-white">2</p>
            </div>
            <div>
              <span className="  text-secondary font-semibold">
                Choose Date & Time
              </span>
            </div>
          </li>
          <li>
            <FaAngleRight size={25} className=" text-secondary" />
          </li>
          <li className=" flex items-center gap-2">
            <div className=" w-10 h-10 items-center bg-primary  border border-primary rounded-full flex justify-center">
              <p className="  text-white">3</p>
            </div>
            <div>
              <span className=" text-primary  font-semibold">Confirm</span>
            </div>
          </li>
          <li>
            <FaAngleRight size={25} className=" text-gray-500" />
          </li>
          <li className=" flex items-center gap-2">
            <div className=" w-10 h-10 items-center  border border-[#757272] rounded-full flex justify-center">
              <p className=" text-[#757272]">4</p>
            </div>
            <div>
              <span className=" text-[#757272]  font-semibold">
                Booking Confirmation
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div className=" pb-12 shadow-md rounded-xl mt-8 py-5 px-12 mx-auto  w-[80%]">
        <div className="">
          <h2 className=" h3  text-center">Confirm Your Booking</h2>
        </div>

        <div className=" bg-[#FEFBFB] border rounded-lg mt-4 p-5">
          <div className=" w-full h-36">
            <img
              src={newListings?.logo}
              className=" w-full h-full object-cover"
              alt=""
            />
          </div>

          <div className=" bg-[#FEFBFB]  rounded-lg mt-4 p-5">
            <h3 className=" text-secondary text-xl">
              {newListings?.garageName}
            </h3>
            <p className=" text-xl">{newListings?.address}</p>
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

              <Button
                Icons={<IoClose size={20} />}
                label={"Cancel"}
                className={
                  " py-1.5 text-sm bg-[#D32525] font-bold mt-3 text-white  rounded-md"
                }
              />
            </div>

            <h6 className="h6">
              Booking made for:
              <span className="  font-normal"> Moses Sam (+974 2341 7654)</span>
            </h6>
            <h6 className="h6">
              Make & Model:
              <span className="  font-normal">Mercedes S500 Amg </span>
            </h6>
            <h6 className="h6">
              Year:<span className="  font-normal">2020</span>
            </h6>
            <h6 className="h6">
              Service:
              <span className="  font-normal">{newListings?.serviceName}</span>
            </h6>
            <h6 className="h6">
              Category:
              <span className="  font-normal">{newListings?.category}</span>
            </h6>

            <h6 className="h6">
              Booked on:
              <span className="   font-normal">Sunday 16 July 2023</span>
            </h6>
            <h6 className="h6">
              Time:
              <span className="  font-normal">{newListings?.workingHours}</span>
            </h6>
            <h6 className=" h6 pt-5 pb-2 font-bold">
              Note: No Prepayment needed now! Pay Elite Motors Garage when the
              work is done
            </h6>

            <div className="border-2 border-[#575656] mt-3">
              <h3 className="text-secondary font-bold text-xl text-center mx-auto mt-2 w-44 border-b-2 border-primary">
                Selected Work
              </h3>
              <ul className="my-3 pl-4 w-96">
                {newListings?.servicesAndPrices?.map((item, index) => {
                  return (
                    <li className="text-[#575656] flex justify-between items-center font-semibold">
                      <p className="m-0">
                        {index + 1}) {item?.service}{" "}
                      </p>
                      <p className="m-0">QR. {item?.price}</p>
                    </li>
                  );
                })}
              </ul>
              <div className="bg-primary border  border-[#575656] flex    justify-end  pr-4 items-center py-1.5">
                <div>
                  <p className="m-0 text-xl text-right text-white font-semibold">
                    Total Price QR. {totalPrice}
                  </p>

                  <p className=" flex gap-2 m-0 text-lg text-white">
                    <Input type={"checkbox"} /> I Agree To Terms & Conditions
                  </p>
                </div>
              </div>
            </div>

            <div className=" py-2">
              <h6 className=" h6">Important information</h6>
              <p>Please note that terms & conditions & policies apply.</p>
            </div>

            <h6 className=" h6 pt-3">
              Copyright © 2023 motorqe.com. All rights reserved.
            </h6>
          </div>
        </div>
      </div>

      <div className=" container px-24 flex justify-between items-center mx-auto mt-10 mb-20">
        <div className="  flex items-center gap-3">
          <LiaLongArrowAltLeftSolid />
          <span className=" text-textColor font-semibold">Back</span>
        </div>
        <div>
          {loading === true ? (
            <button
              disabled
              type="button"
              class="bg-primary font-bold rounded-3xl text-white w-44 py-2"
            >
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          ) : (
            <Button
              onClick={handlerSubmit}
              label={"Submit"}
              className={
                " bg-primary font-bold rounded-3xl text-white w-44 py-2"
              }
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GarageConfirm;
