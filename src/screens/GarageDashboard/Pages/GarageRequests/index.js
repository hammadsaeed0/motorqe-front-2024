import React, { useEffect, useState } from "react";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import DashboardNavbar from "../../NavBAr/DashboardNavbar";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { Base_url } from "../../../../utils/Base_url";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Dropdown from "./Dropdown";
import moment from "moment";
const GarageRequests = () => {
  const [garageRequest, setGarageRequest] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const user = useSelector((state) => state.authReducer);
  const userData = JSON.parse(localStorage.getItem("serviceProvider"));

  console.log(user);

  useEffect(() => {
    axios
      .get(`${Base_url}/user/my-booking/${userData}`)
      .then((res) => {
        console.log(res, "garage");
        setGarageRequest(res?.data?.bookings);
      })
      .catch((error) => {});
  }, []);

  const BookingRequest = (id, status) => {
    const params = {
      bookingId: id,
      status: status,
    };
    axios
      .patch(`${Base_url}/user/book-garage`, params)
      .then((res) => {
        console.log(res);

        if (res?.success === true) {
          toast.success(res?.message);
          axios
            .get(`${Base_url}/user/my-booking/6702d13d1aac755a9f50aa91`)
            .then((res) => {
              console.log(res);
              setGarageRequest(res?.data?.bookings);
            })
            .catch((error) => {});
        } else {
          toast.error(res?.message);
        }
      })
      .catch((error) => {});
  };

  const toggleDropdown = (id) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };

  return (
    <>
      <Header />
      <DashboardNavbar />
      <div className="flex flex-col items-center  mb-4">
        <div className="mt-16 flex items-center justify-between w-[90%]">
          <h1 className="font-inter text-3xl font-semibold pb-5 text-left">
            Bookings:
          </h1>
        </div>

        <div className="w-[90%]">
          <div className="ring ring-[#FB5722]  overflow-hidden rounded-[15px] mt-4">
            <div className=" flex justify-between h-[75px] items-center px-4 w-[100%] bg-[#F3F3F5]  rounded-tl-[15px] rounded-tr-[15px] ring-1 ring-[#FB5722] ">
              <div className="flex border-b  border-primary">
                <img
                  src={require("../../../../assets/images/inbox.png")}
                  alt="inbox"
                  className="h-5"
                />{" "}
                <p className="text-20 font-semibold tracking-wider text-left text-primary">
                  Booking Requests
                </p>
              </div>

              <div className="flex gap-1">
                <img
                  src={require("../../../../assets/images/email-notification.png")}
                  alt="inbox"
                  className="h-5"
                />{" "}
                <p className="text-20 font-semibold tracking-wider text-left  text-secondary">
                  Todays Bookings
                </p>
              </div>
            </div>

            <div className=" h-96 overflow-y-auto w-full">
              <table className="min-w-full bg-white border  border-[#F3F3F5]">
                <tbody className="">
                  {garageRequest?.map((item, index) => {
                    return (
                      <tr className="bg-[#F3F3F5] border-primary border-t rounded-md">
                        <td className="align-middle text-center text-sm font-normal px-6  whitespace-nowrap">
                          <div className="w-14 h-14 rounded-full overflow-hidden">
                            <img
                              src={item?.garageId?.logo}
                              className="w-full h-full object-cover"
                              alt="Profile"
                            />
                          </div>
                        </td>
                        <td className="text-sm font-normal px-6 whitespace-nowrap">
                          <span className="text-base text-black flex flex-col py-1 px-2.5 leading-none text-center bg-green-200 rounded-full">
                            <p className="text-left text-sm pb-2">
                              {item?.garageId?.garageName}
                            </p>
                            <h3 className="text-left font-semibold">
                              Vehicle Make & Model
                            </h3>
                            <p className="text-left font-semibold pt-2 text-[#777777] text-sm pb-2">
                              {item?.garageId?.mobileNumber}
                            </p>
                          </span>
                        </td>
                        <td className="align-middle text-center text-sm font-normal px-6  whitespace-nowrap">
                          <span className="text-base text-black font-bold py-1 px-2.5 leading-none bg-green-200 rounded-full">
                            {` ${moment(item?.createdAt).format(
                              "MM-DD-YYYY"
                            )} ${item?.time}`}
                          </span>
                        </td>
                        <td className="align-middle text-sm font-normal px-6  whitespace-nowrap">
                          <div className="flex justify-center relative items-center">
                            <p
                              onClick={() => toggleDropdown(item._id)}
                              className="m-0 w-12 h-10 bg-[#E3E0E0] flex justify-center items-center rounded-md border"
                            >
                              <BsThreeDots size={30} color="#0C0CB8" />
                            </p>
                            {openDropdownId === item._id && (
                              <Dropdown
                                isOpen={openDropdownId === item._id}
                                onClose={() => setOpenDropdownId(null)}
                              />
                            )}
                          </div>
                        </td>
                        <td className="align-middle flex gap-2 text-sm font-normal px-6 py-4 whitespace-nowrap">
                          {item?.status === "approved" ? (
                            <div className="flex gap-2 justify-center">
                              <img
                                src={require("../../../../assets/images/check.png")}
                                className="w-12 h-12"
                                alt="Check"
                              />
                            </div>
                          ) : (
                            <div className="flex  gap-2 ">
                              <img
                                src={require("../../../../assets/images/check.png")}
                                className="w-12 h-12 "
                                onClick={() =>
                                  BookingRequest(item?._id, "approved")
                                }
                                alt="Check"
                              />

                              <img
                                src={require("../../../../assets/images/close.png")}
                                className="w-12 h-12"
                                onClick={() =>
                                  BookingRequest(item?._id, "canceled")
                                }
                                alt="Close"
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GarageRequests;
