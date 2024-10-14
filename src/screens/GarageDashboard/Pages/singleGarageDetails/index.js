import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import { IoCall } from "react-icons/io5";
import {
  FaCalendarAlt,
  FaCircle,
  FaFlag,
  FaHeart,
  FaMobileAlt,
  FaRegEnvelope,
  FaShareAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import { FaLocationDot, FaRegCircleCheck } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { MdDateRange, MdLocationPin, MdOutlineWatchLater } from "react-icons/md";
import Input from "../../../../components/Input";
import { Base_url } from "../../../../utils/Base_url";
import axios from "axios";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { REACT_APP_GOOGLE_MAPS_KEY } from "../../../../utils/Google_map_key";
import moment from "moment";
import { useSelector } from "react-redux";
import { TiStarFullOutline } from "react-icons/ti";
import { BsQuestionCircleFill } from "react-icons/bs";
const SingleGarageDetails = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
  price,
  qty,
  setQty,
}) => {
  const sliders = [
    require("../../../../assets/images/image 7.png"),
    require("../../../../assets/images/home.png"),
  ];

  const [newListings, setNewListings] = useState({});
  const { id } = useParams();

  const user = useSelector((state) => state.authReducer);
  const userData = JSON.parse(localStorage.getItem("serviceProvider"));
  console.log(user);

  useEffect(() => {
    axios
      .get(`${Base_url}/user/single-garage/${id}`)
      .then((res) => {
        console.log(res);
        setNewListings(res?.data?.data);
        const pos = {
          lat: res?.data?.data?.latitude,
          lng: res?.data?.data?.longitude,
        };
        setSelectedLocation(pos);
      })
      .catch((error) => {});

    // axios
    //   .post(`${Base_url}/dashboard/click-counter/${id}`)
    //   .then((res) => {
    //     console.log(res, "dashboard/click-counter");
    //   })
    //   .catch((error) => {});
  }, [id]);

  const [curr, setCurr] = useState(0);
  const prev = () =>
    setCurr((curr) =>
      curr === 0 ? newListings?.car_images?.length - 1 : curr - 1
    );
  const next = () =>
    setCurr((curr) =>
      curr === newListings?.car_images?.length - 1 ? 0 : curr + 1
    );

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  const goToSlide = (index) => {
    setCurr(index);
  };

  const containerStyle = {
    width: "100%",
    height: "490px",
    paddingTop: "80px",
  };

  const libraries = ["places"];

  const [map, setMap] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState({
    lat: 51.520067,
    lng: 25.276987,
  });

  const [filteredResults, setFilteredResults] = useState([]);
  useEffect(() => {
    const url = `${Base_url}/user/garage?status=active`;
    const params = {
      status: "active",
    };

    axios
      .get(url, params)
      .then((response) => {
        console.log("Response data:", response.data);
        setFilteredResults(response?.data?.garages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);



  const clickButtons = async (messages) => {
    const params = {
      id:userData,
      action: messages,
    };
    const response = await axios
      .post(`${Base_url}/user/count-garage-click`, params)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <Header />
      <div className=" container md:py-12 py-0 mx-auto md:px-12 px-0">
        <div className=" lg:flex block   justify-between ">
          <div className=" lg:w-[65%] w-[100%]">
            <div className="overflow-hidden relative border   rounded-2xl md:w-[90%] w-[100%]">
              <div
                className="flex  sm:h-[75vh] h-[50vh] transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${curr * 100}%)` }}
              >
                {/* {newListings?.car_images?.map((s) => ( */}
                <>
                  <div className="flex-none   w-full h-full">
                    <img
                      src={newListings?.logo}
                      alt=""
                      className=" w-full cursor-pointer h-full  rounded-md  object-cover"
                    />
                  </div>
                </>
                {/* ))} */}
              </div>
              <div className="absolute inset-0 flex px-3 items-center justify-between">
                <button
                  onClick={prev}
                  className=" w-12 h-12 rounded-full shadow   flex  justify-center items-center bg-white/80 text-gray-800 hover:bg-white"
                >
                  <TfiAngleLeft size={20} className="" />
                </button>
                <button
                  onClick={next}
                  className=" w-12 h-12  rounded-full   flex justify-center items-center shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                  <TfiAngleRight size={20} />
                </button>
              </div>
            </div>
            {/* <div className=" mt-2  md:block hidden">
              <div className="flex items-center justify-center gap-2">
                {newListings?.car_images?.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`
              transition-all w-20 h-16 rounded-md overflow-hidden bg-white 
              ${curr === i ? " w-14 h-14" : "bg-opacity-50"}
            `}
                  >
                    <img
                      src={_}
                      alt=""
                      className=" w-full h-full   object-center  "
                    />
                  </div>
                ))}
              </div>
            </div> */}

            <div className=" md:py-12 py-4 flex-wrap flex justify-center items-center md:gap-10 gap-6">
              <Button
               onClick={()=>clickButtons('share')}
                Icons={<FaShareAlt size={20} />}
                label={"Share"}
                className={
                  " py-1 text-lg mt-3 font-bold    bg-white border-primary border-2    text-secondary  rounded-3xl"
                }
              />
              <Button
                Icons={<FaHeart size={20} />}
                label={"Bookmark"}
                className={
                  " py-1 text-lg mt-3 font-bold    bg-white border-primary border-2    text-primary  rounded-3xl"
                }
              />
              <Button
                Icons={<FaFlag size={20} />}
                label={"Report"}
                className={
                  " py-1 text-lg mt-3 font-bold    bg-[#EB0000] border-[#EB0000] border-2    text-white  rounded-3xl"
                }
              />
            </div>
            <div className=" py-10 scroll-container   productOverflow  overflow-x-auto whitespace-nowrap">
              <ul className="  lg:w-[50%] w-[90%]   flex items-center justify-between border   rounded-full md:overflow-hidden overflow-visible">
                <li>
                  <Button
                    label={"About"}
                    Icons={<BsQuestionCircleFill color="  text-primary" />}
                    className={
                      "   font-semibold  text-primary py-3.5 border-r"
                    }
                  />
                </li>
                <li>
                  <Button
                    label={"Reviews"}
                    Icons={<TiStarFullOutline className=" text-secondary" size={20} />}
                    className={
                      "  text-textColor  font-semibold bg-gray-50  py-3.5 border-r"
                    }
                  />
                </li>
                <li>
                  <Button
                  Icons={<MdDateRange className=" text-secondary" size={20} />}
                    label={"Dates"}
                    className={
                      "  text-textColor  font-semibold bg-gray-50  py-3.5 border-r"
                    }
                  />
                </li>
              </ul>
            </div>

            <div className=" md:px-0 px-6">
              <h1 className=" h2 pb-8">Description:</h1>
              <p className=" text-textColor">{newListings?.aboutLocation}</p>

              <button className=" pt-4 pb-12">
                <Link
                  to={""}
                  className=" decoration-black text-secondary font-semibold border-b-2  border-secondary"
                >
                  See more
                </Link>
              </button>
            </div>

            <div className="relative px-2">
              <LoadScript
                googleMapsApiKey={REACT_APP_GOOGLE_MAPS_KEY}
                libraries={libraries}
              >
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={selectedLocation}
                  zoom={10}
                  onLoad={(map) => setMap(map)}
                >
                  <MarkerF
                    position={selectedLocation}
                    icon={
                      "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    }
                  />

                  <MdLocationPin className="text-textColor" size={20} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
          <div className=" md:px-0 px-5">
            {/* <h2 className=' text-textColor font-bold text-2xl'>{newListings.title}</h2> */}
            <h2 className=" text-textColor font-bold md:text-2xl sm:text-xl text-lg">
              {newListings?.garageName}
            </h2>

            <hr className="  border-primary mt-3" />

            <div className=" flex justify-between mt-4 items-center py-2">
              <h1 className=" text-secondary font-bold text-3xl">Services:</h1>
            </div>

            <ul className=" flex flex-col gap-4">
              {newListings?.servicesAndPrices?.map((item, index) => {
                return (
                  <li className=" flex justify-between items-center">
                    <h4 className="h6"> {index+1}) {item?.service}</h4>
                    <div className=" flex gap-2 items-center">
                    <span className="  text-primary font-bold text-lg">
                      QR. {item?.price}
                    </span>
                    <Input placeholder={''} type={'checkbox'}  alt="" />
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className=" mt-6">
              <Link to={`/garage/garage-date-time/${newListings?._id}`}>
                <Button
                   onClick={()=>clickButtons('click')}
                  label={"Book Now"}
                  className={
                    " py-2.5 text-lg bg-primary   font-normal w-full mt-3 text-white  rounded-3xl"
                  }
                />
              </Link>

              <Button
              onClick={()=>clickButtons('call')}
                Icons={<IoCall size={25} />}
                label={"Call 123-456-7890"}
                className={
                  "  py-2.5 text-lg mt-3   w-full  bg-secondary text-white  rounded-3xl"
                }
              />
              <Button
              onClick={()=>clickButtons('message')}
                label={"Whatsapp"}
                Icons={<FaWhatsapp size={25} />}
                className={
                  "  py-2.5 w-full text-lg bg-green  mt-3 text-white  rounded-3xl"
                }
              />
            </div>
            <h5 className="pt-6 text-secondary  font-semibold">
              GSF MOTORS Work LTD Garage
            </h5>

            <div>
              <div className=" gap-4 sm:flex block  justify-center items-center py-5">
                <Button
                  Icons={<FaLocationDot />}
                  label={"Location Map "}
                  className={
                    " py-1 text-lg bg-primary  font-semibold  mt-3 text-white  rounded-3xl"
                  }
                />
                <Button
                  Icons={<FaLocationDot />}
                  label={"Get Direction"}
                  className={
                    " py-1 text-lg bg-primary  font-semibold  mt-3 text-white  rounded-3xl"
                  }
                />
              </div>
              <div className=" py-4">
                <h5 className=" text-textColor font-medium">
                  {" "}
                  <b>Street:</b> {newListings?.address}
                </h5>
                <h5 className=" text-textColor font-medium">
                  {" "}
                  <b>City:</b> Doha{" "}
                </h5>
              </div>

              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                class=" text-textColor bg-white gap-7  flex justify-between  focus:ring-4 focus:outline-none focus:ring-[#0C53AB] font-medium rounded-lg text-base py-2.5 text-center  items-center"
                type="button"
              >
                <MdOutlineWatchLater className=" text-secondary" size={25} />
                <span>Timings (24h format) : Open now</span>
                <svg
                  class="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div>
                <ul className=" leading-8 pl-3">
                  <li className=" flex items-center gap-10">
                    <p className=" text-black font-bold">Sunday:</p>
                    <p className="text-black font-bold">{newListings?.workingHours}</p>
                  </li>
                  <li className=" flex  items-center gap-10">
                    <p className=" text-black font-bold">Monday:</p>
                    <p className="text-black font-bold">{newListings?.workingHours}</p>
                  </li>
                  <li className=" flex  items-center gap-10">
                    <p className=" text-black font-bold">Tuesday:</p>
                    <p className="text-black font-bold">{newListings?.workingHours}</p>
                  </li>
                  <li className=" flex  items-center gap-10">
                    <p className=" text-black font-bold">Wednesday:</p>
                    <p className="text-black font-bold">{newListings?.workingHours}</p>
                  </li>
                  <li className=" flex  items-center gap-10">
                    <p className=" text-black font-bold">Thursday:</p>
                    <p className="text-black font-bold">{newListings?.workingHours}</p>
                  </li>
                  <li className=" flex  items-center gap-10">
                    <p className=" text-black font-bold">Friday:</p>
                    <p className="text-black font-bold">Closed</p>
                  </li>
                  <li className=" flex  items-center gap-10">
                    <p className=" text-black font-bold">Saturday:</p>
                    <p className="text-black font-bold">{newListings?.workingHours}</p>
                  </li>
                </ul>
              </div>

              <div className=" bg-[#F0F5FA] p-5 mt-3">
                <h4 className=" text-black text-xl font-semibold">
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
            </div>
          </div>
        </div>

        <div className=" md:px-0 px-6 ">
          <h1 className=" h2 mt-7">Similar Service Providers </h1>
          <div className=" my-4  grid  grid-cols-4  gap-6">
            {filteredResults?.slice(0, 4).map((item, index) => {
              return (
                <Link
                  to={`/garage/garage-date-time/${item._id}`}
                  className="  rounded-xl overflow-hidden"
                >
                  <div className=" h-40  ">
                    <img src={item?.logo} alt="" className=" w-full h-full" />
                  </div>

                  <div className=" bg-[#0C53AB] py-2 px-4">
                    <h1 className=" text-white uppercase text-center font-semibold">
                      {item?.garageName}
                    </h1>

                    <Button
                      label={"BOOK NOW"}
                      className={
                        " bg-primary mx-auto my-2 rounded-md font-semibold py-2 text-white"
                      }
                      alt=""
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleGarageDetails;
