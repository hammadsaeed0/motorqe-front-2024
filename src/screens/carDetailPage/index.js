import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
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
import { MdLocationPin, MdOutlineWatchLater } from "react-icons/md";
import Input from "../../components/Input";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { REACT_APP_GOOGLE_MAPS_KEY } from "../../utils/Google_map_key";
import moment from "moment";
import { useSelector } from "react-redux";
const CarDetailPage = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
  price,
  qty,
  setQty,
}) => {
  const sliders = [
    require("../../assets/images/image 7.png"),
    require("../../assets/images/home.png"),
  ];

  const [newListings, setNewListings] = useState({});
  const { id } = useParams();

  const user = useSelector((state) => state.authReducer);

  console.log(user);

  useEffect(() => {
    axios
      .get(`${Base_url}/users/get-single-car/${id}`)
      .then((res) => {
        console.log(res);
        setNewListings(res?.data?.message);
        const pos = {
          lat: res?.data?.messag?.latitude,
          lng: res?.data?.messag?.longitude,
        };
        setSelectedLocation(pos);
      })
      .catch((error) => {});

    axios
      .post(`${Base_url}/dashboard/click-counter/${id}`)
      .then((res) => {
        console.log(res, "dashboard/click-counter");
      })
      .catch((error) => {});
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
    const url = `${Base_url}/users/advance-searching`;
    const params = {
      make: newListings.make,
      model: newListings.model,
      exterior_colour: newListings.exterior_colour,
      interior_colour: newListings.interior_colour,
    };

    axios
      .get(url, { params })
      .then((response) => {
        console.log("Response data:", response.data);
        setFilteredResults(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <div className=" container md:py-12 py-0 mx-auto md:px-12 px-0">
        <div className=" lg:flex block   justify-between ">
          <div className=" lg:w-[65%] w-[100%]">
            <div className="overflow-hidden relative border   rounded-2xl md:w-[90%] w-[100%]">
              <div className=" py-3 px-12  md:block hidden">
                <ul className=" flex   justify-between items-center">
                  <li>
                    <span className=" text-primary text-xl font-bold border-b-4 border-primary">
                      360 Tour
                    </span>
                  </li>
                  <li>
                    <span className=" text-secondary  text-xl font-bold">
                      Exterior
                    </span>
                  </li>
                  <li>
                    <span className="  text-secondary text-xl font-bold ">
                      {" "}
                      Interior
                    </span>
                  </li>
                </ul>
              </div>
              <div
                className="flex  sm:h-[75vh] h-[50vh] transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${curr * 100}%)` }}
              >
                {newListings?.car_images?.map((s) => (
                  <>
                    <div className="flex-none   w-full h-full">
                      <img
                        src={s}
                        alt=""
                        className=" w-full cursor-pointer h-full  rounded-md  object-cover"
                      />
                    </div>
                  </>
                ))}
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
            <div className=" mt-2  md:block hidden">
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
            </div>

            <div className=" md:py-12 py-4 flex-wrap flex justify-center items-center md:gap-10 gap-6">
              <Button
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
              <ul className="  lg:w-[75%] w-[90%]   mx-auto flex items-center justify-between border   rounded-full md:overflow-hidden overflow-visible">
                <li>
                  <Button
                    label={"Car Details"}
                    className={
                      "  text-white font-semibold bg-primary py-3.5 border-r"
                    }
                  />
                </li>
                <li>
                  <Button
                    label={"Inspection Report"}
                    className={
                      "  text-textColor  font-semibold bg-gray-50  py-3.5 border-r"
                    }
                  />
                </li>
                <li>
                  <Button
                    label={"Spare Parts"}
                    className={
                      "  text-textColor  font-semibold bg-gray-50  py-3.5 border-r"
                    }
                  />
                </li>
                <li>
                  <Button
                    label={"Tyres"}
                    className={
                      "  text-textColor  font-semibold bg-gray-50  py-3.5 border-r"
                    }
                  />
                </li>
              </ul>
            </div>

            <div className=" md:px-0 px-6">
              <h1 className=" h2 pb-8">Description:</h1>
              <p className=" text-textColor">{newListings?.description}</p>

              <button className=" pt-4 pb-12">
                <Link
                  to={""}
                  className=" decoration-black text-secondary font-semibold border-b-2  border-secondary"
                >
                  See more
                </Link>
              </button>
            </div>
            <div className="bg-[#F2F8FF] my-4 p-5 py-10">
              <ul className=" flex flex-wrap items-center gap-5">
                <li>
                  <button className=" flex items-center gap-3 bg-white py-2 px-4 border rounded-md">
                    {" "}
                    <FaRegCircleCheck color="" className=" text-primary" />
                    <span className=" font-semibold"> Backup camera</span>
                  </button>
                </li>
                <li>
                  <button className=" flex items-center gap-3 bg-white py-2 px-4 border rounded-md">
                    {" "}
                    <FaRegCircleCheck color="" className=" text-primary" />
                    <span className=" font-semibold"> Blind-spot warning</span>
                  </button>
                </li>
                <li>
                  <button className=" flex items-center gap-3 bg-white py-2 px-4 border rounded-md">
                    {" "}
                    <FaRegCircleCheck color="" className=" text-primary" />
                    <span className=" font-semibold"> Brake assist</span>
                  </button>
                </li>
                <li>
                  <button className=" flex items-center gap-3 bg-white py-2 px-4 border rounded-md">
                    {" "}
                    <FaRegCircleCheck color="" className=" text-primary" />
                    <span className=" font-semibold">
                      Forward-collision warning
                    </span>
                  </button>
                </li>
                <li>
                  <button className=" flex items-center gap-3 bg-white py-2 px-4 border rounded-md">
                    {" "}
                    <FaRegCircleCheck color="" className=" text-primary" />
                    <span className=" font-semibold">
                      Forward-collision warning
                    </span>
                  </button>
                </li>
              </ul>

              <div className=" md:flex block items-center gap-10">
                <div>
                  <h2 className=" h5 mt-3">Inspection Report</h2>
                  <Button
                    label={"Download report "}
                    className={
                      " border-2 mt-5   w-48 rounded-md py-2.5 text-primary font-semibold  border-primary "
                    }
                  />
                </div>
                <div>
                  <p className=" pt-8">
                    Before you decide to buy a car, read its{" "}
                    <Link to={""} className=" text-primary">
                      Inspection report
                    </Link>{" "}
                    for free.
                  </p>
                </div>
              </div>
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
              {newListings?.title}
            </h2>
            <ul className=" flex gap-2 items-center py-2">
              <li>
                <span className="text-gray-500">2022</span>
              </li>
              <li>
                <span>.</span>
              </li>
              <li>
                <span className="text-gray-500">Coupe</span>
              </li>
              <li>
                <span className=" text-secondary font-bold text-lg">.</span>
              </li>
              <li>
                <span className=" text-gray-500">Petrol</span>
              </li>
            </ul>
            <hr />

            <div className=" flex justify-between mt-4 items-center py-2">
              <h1 className=" text-secondary font-bold text-3xl">
                QR {newListings.price_QR}
              </h1>
              <Button
                label={"Track Price"}
                className={
                  " border-2 text-primary border-primary rounded-3xl py-1.5 font-semibold"
                }
              />
            </div>

            <ul className=" flex flex-col gap-4">
              <li className=" flex justify-between items-center">
                <h4 className="h5">Type of Ad:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  {newListings?.type_of_ad}
                </span>
              </li>
              <li className=" flex justify-between items-center">
                <h4 className="h5">Make:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  {newListings?.make}
                </span>
              </li>
              <li className=" flex justify-between items-center">
                <h4 className="h5">Model:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  {newListings?.model}
                </span>
              </li>
              <li className=" flex justify-between items-center">
                <h4 className="h5">Year:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  {newListings?.year}
                </span>
              </li>
              <li className=" flex justify-between items-center">
                <h4 className="h5">Car Type:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  {newListings?.vehicle_category}
                </span>
              </li>
              <li className=" flex justify-between items-center">
                <h4 className="h5">Mileage:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  {newListings?.mileage}Kms
                </span>
              </li>
              <li className=" flex justify-between items-center">
                <h4 className="h5">Condition:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  Used
                </span>
              </li>
              <li className=" flex justify-between items-center">
                <h4 className="h5">Engine Size:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  {newListings?.engine_size}
                </span>
              </li>
              <li className=" flex justify-between items-center">
                <h4 className="h5">Cylinders:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  V{newListings?.cylinder}
                </span>
              </li>
              <li className=" flex justify-between items-center">
                <h4 className="h5">Transmission:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  Automatic
                </span>
              </li>
              <li className=" flex justify-between items-center">
                <h4 className="h5">Exterior Colour:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  {newListings?.exterior_colour}
                </span>
              </li>
              <li className=" flex justify-between items-center">
                <h4 className="h5">Interior Colour:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  {newListings?.interior_colour}
                </span>
              </li>
              <li className=" flex justify-between items-center">
                <h4 className="h5">Fuel Type:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  {newListings?.fuel_type}
                </span>
              </li>
              <li className=" flex justify-between items-center">
                <h4 className="h5">Warranty Date:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  {moment(newListings?.warranty_date).format("l")}
                </span>
              </li>
              <li className=" flex justify-between items-center">
                <h4 className="h5">Insurance Type:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  Fully Insured
                </span>
              </li>
              <li className=" flex justify-between items-center">
                <h4 className="h5">Specifications:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  {newListings?.specifications}
                </span>
              </li>
              {/* <li className=" flex justify-between items-center">
                <h4 className="h5">Tinted:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  Yes
                </span>
              </li>
              <li className=" flex justify-between items-center">
                <h4 className="h5">Ownwer:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  1st Ownwer
                </span>
              </li> */}
              <li className=" flex justify-between items-center">
                <h4 className="h5">Date Posted:</h4>
                <span className=" text-textColor font-bold md:text-xl text-lg">
                  {moment(newListings?.warranty_date).format("l")}
                </span>
              </li>
            </ul>
            <div className=" mt-6">
              <Button
                Icons={<IoCall size={25} />}
                label={"Call 123-456-7890"}
                className={
                  " py-2 text-lg mt-3   w-full  bg-secondary text-white  rounded-3xl"
                }
              />
              <Button
                label={"Whatsapp"}
                Icons={<FaWhatsapp size={25} />}
                className={
                  " py-2 w-full text-lg bg-green  mt-3 text-white  rounded-3xl"
                }
              />
              <Button
                Icons={<FaRegEnvelope />}
                label={"Send Message"}
                className={
                  " py-1.5 text-lg bg-primary  font-semibold w-full mt-3 text-white  rounded-3xl"
                }
              />
            </div>
            <h5 className=" h4 pt-6">Posted by:</h5>

            <img
              src={require("../../assets/images/image 50.png")}
              className=" mt-3 py-4 mx-auto"
              alt=""
            />

            <div>
              <h6 className=" text-center text-secondary font-semibold">
                See All Cars Listed from ELITE MOTORS
              </h6>
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
                  <b>Street:</b> Salwa Road{" "}
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
                <ul className=" leading-8">
                  <li className=" flex justify-center items-center gap-10">
                    <p className=" text-black font-bold">Sunday:</p>
                    <p className="text-black font-bold">7:00 -19:00</p>
                  </li>
                  <li className=" flex justify-center items-center gap-10">
                    <p className=" text-black font-bold">Monday:</p>
                    <p className="text-black font-bold">7:00 -19:00</p>
                  </li>
                  <li className=" flex justify-center items-center gap-10">
                    <p className=" text-black font-bold">Tuesday:</p>
                    <p className="text-black font-bold">7:00 -19:00</p>
                  </li>
                  <li className=" flex justify-center items-center gap-10">
                    <p className=" text-black font-bold">Wednesday:</p>
                    <p className="text-black font-bold">7:00 -19:00</p>
                  </li>
                  <li className=" flex justify-center items-center gap-10">
                    <p className=" text-black font-bold">Thursday:</p>
                    <p className="text-black font-bold">7:00 -19:00</p>
                  </li>
                  <li className=" flex justify-center items-center gap-10">
                    <p className=" text-black font-bold">Friday:</p>
                    <p className="text-black font-bold">Closed</p>
                  </li>
                  <li className=" flex justify-center items-center gap-10">
                    <p className=" text-black font-bold">Saturday:</p>
                    <p className="text-black font-bold">7:00 -19:00</p>
                  </li>
                </ul>
              </div>

              <div className=" mx-auto justify-center  flex-col">
                <Button
                  Icons={<FaLocationDot />}
                  label={"Book a test drive  "}
                  className={
                    " py-2 text-lg bg-white  mx-auto font-semibold  mt-3 text-primary border-2 border-primary  rounded-3xl"
                  }
                />
                <Button
                  Icons={<FaMobileAlt size={20} />}
                  label={"Call 123-456-7890"}
                  className={
                    " py-1.5 text-lg mt-3 my-2  mx-auto  bg-secondary text-white  rounded-3xl"
                  }
                />
                <Button
                  Icons={<IoCall size={20} />}
                  label={"Call 123-456-7890"}
                  className={
                    " py-1.5 text-lg mt-3  mx-auto  mb-2 bg-secondary text-white  rounded-3xl"
                  }
                />
                <Button
                  label={"Whatsapp"}
                  Icons={<FaWhatsapp size={20} />}
                  className={
                    " py-1.5 text-lg bg-green mx-auto  mt-3 text-white  rounded-3xl"
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className=" md:flex block py-6 md:px-0 px-6">
          <div className=" md:w-[45%] w-[100%]">
            <h4 className=" h3">Features</h4>

            <ul className=" flex  gap-8 flex-wrap">
              <li className=" flex items-center gap-2">
                <FaCircle size={9} className=" text-primary" />
                <span className=" text-black font-semibold">Leather seats</span>
              </li>
              <li className=" flex items-center gap-2">
                <FaCircle size={9} className=" text-primary" />
                <span className=" text-black font-semibold">Leather seats</span>
              </li>
              <li className=" flex items-center gap-2">
                <FaCircle size={9} className=" text-primary" />
                <span className=" text-black font-semibold">
                  Navigation System
                </span>
              </li>
              <li className=" flex items-center gap-2">
                <FaCircle size={9} className=" text-primary" />
                <span className=" text-black font-semibold">Side airbags</span>
              </li>
              <li className=" flex items-center gap-2">
                <FaCircle size={9} className=" text-primary" />
                <span className=" text-black font-semibold">Keyless Entry</span>
              </li>
              <li className=" flex items-center gap-2">
                <FaCircle size={9} className=" text-primary" />
                <span className=" text-black font-semibold">Vent Seats</span>
              </li>
            </ul>
          </div>
          <div className=" md:w-[50%] pt-5 w-[100%]">
            <h4 className=" h3"> Other Attachments</h4>

            <div className=" flex items-center gap-5 mt-2">
              <div className=" flex gap-3 items-center ">
                <img
                  src={require("../../assets/images/pdf.png")}
                  className=" w-10"
                  alt=""
                />
                <span className=" text-black">Sample PDF File</span>
              </div>
              <div className=" flex gap-3 items-center ">
                <img
                  src={require("../../assets/images/pdf.png")}
                  className=" w-10"
                  alt=""
                />
                <span className=" text-black">
                  Notes and some related files
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className=" py-12 md:px-0 px-6">
          <h1 className=" h3 text-center">CAR LOAN CALCULATOR</h1>

          <div className=" md:flex block  justify-between pt-8 ">
            <div className=" flex flex-col gap-10 md:w-96 w-[100%]">
              <div className="">
                <div className=" flex justify-between items-center">
                  <h1 className=" text-textColor dark:text-white  font-semibold">
                    Car Price
                  </h1>
                  <Input placeholder={"5000"} className={" w-32 border"} />
                </div>

                <>
                  {/* between two numbers */}
                  <div className="flex  items-center h-12 justify-center">
                    <div className="py-1 relative min-w-full">
                      <div className="h-1.5 bg-gray-200 rounded-full">
                        <div
                          className="absolute h-1.5 rounded-full  bg-secondary dark:bg-orange w-0"
                          style={{ width: "33.1935%" }}
                        />

                        <div
                          className="absolute h-6 flex items-center justify-center w-6 rounded-full  bg-primary shadow border border-gray-300 -ml-2 -top-1 cursor-pointer"
                          unselectable="on"
                          onselectstart="return false;"
                          style={{ left: "35.4839%" }}
                        >
                          <div className="relative -mt-2 w-1">
                            <div
                              className="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full"
                              style={{ marginLeft: "-25px" }}
                            >
                              <div className="relative shadow-md">
                                {/* <div className="bg-black -mt-8 text-white truncate text-xs rounded py-1 px-4">
                  $ 30
                </div> */}
                                <svg
                                  className="absolute text-black w-full h-2 left-0 top-100"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 255 255"
                                  xmlSpace="preserve"
                                >
                                  <polygon
                                    className="fill-current"
                                    points="0,0 127.5,127.5 255,0"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute text-gray-800 -ml-1  bottom-0 left-0 -mb-6 flex gap-1">
                          <p className=" text-textColor font-semibold">0</p>
                        </div>
                        <div className="absolute text-gray-800 -mr-1  bottom-0 right-0 -mb-6 flex gap-1">
                          <p className=" text-textColor  font-semibold">+1M</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>

              <div className="">
                <div className=" flex justify-between items-center">
                  <h1 className=" text-textColor dark:text-white  font-semibold">
                    Down Payment
                  </h1>
                  <Input placeholder={"5000"} className={" w-32 border"} />
                </div>

                <>
                  {/* between two numbers */}
                  <div className="flex  items-center h-12 justify-center">
                    <div className="py-1 relative min-w-full">
                      <div className="h-1.5 bg-gray-200 rounded-full">
                        <div
                          className="absolute h-1.5 rounded-full  bg-secondary dark:bg-orange w-0"
                          style={{ width: "33.1935%" }}
                        />

                        <div
                          className="absolute h-6 flex items-center justify-center w-6 rounded-full  bg-primary shadow border border-gray-300 -ml-2 -top-1 cursor-pointer"
                          unselectable="on"
                          onselectstart="return false;"
                          style={{ left: "35.4839%" }}
                        >
                          <div className="relative -mt-2 w-1">
                            <div
                              className="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full"
                              style={{ marginLeft: "-25px" }}
                            >
                              <div className="relative shadow-md">
                                {/* <div className="bg-black -mt-8 text-white truncate text-xs rounded py-1 px-4">
                  $ 30
                </div> */}
                                <svg
                                  className="absolute text-black w-full h-2 left-0 top-100"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 255 255"
                                  xmlSpace="preserve"
                                >
                                  <polygon
                                    className="fill-current"
                                    points="0,0 127.5,127.5 255,0"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute text-gray-800 -ml-1  bottom-0 left-0 -mb-6 flex gap-1">
                          <p className=" text-textColor font-semibold">0</p>
                        </div>
                        <div className="absolute text-gray-800 -mr-1  bottom-0 right-0 -mb-6 flex gap-1">
                          <p className=" text-textColor  font-semibold">+1M</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>

              <div className="">
                <div className=" flex justify-between items-center">
                  <h1 className=" text-textColor dark:text-white  font-semibold">
                    Interest Rate (p.a)
                  </h1>
                  <Input placeholder={"5000"} className={" w-32 border"} />
                </div>

                <>
                  {/* between two numbers */}
                  <div className="flex  items-center h-12 justify-center">
                    <div className="py-1 relative min-w-full">
                      <div className="h-1.5 bg-gray-200 rounded-full">
                        <div
                          className="absolute h-1.5 rounded-full  bg-secondary dark:bg-orange w-0"
                          style={{ width: "33.1935%" }}
                        />

                        <div
                          className="absolute h-6 flex items-center justify-center w-6 rounded-full  bg-primary shadow border border-gray-300 -ml-2 -top-1 cursor-pointer"
                          unselectable="on"
                          onselectstart="return false;"
                          style={{ left: "35.4839%" }}
                        >
                          <div className="relative -mt-2 w-1">
                            <div
                              className="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full"
                              style={{ marginLeft: "-25px" }}
                            >
                              <div className="relative shadow-md">
                                {/* <div className="bg-black -mt-8 text-white truncate text-xs rounded py-1 px-4">
                  $ 30
                </div> */}
                                <svg
                                  className="absolute text-black w-full h-2 left-0 top-100"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 255 255"
                                  xmlSpace="preserve"
                                >
                                  <polygon
                                    className="fill-current"
                                    points="0,0 127.5,127.5 255,0"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute text-gray-800 -ml-1  bottom-0 left-0 -mb-6 flex gap-1">
                          <p className=" text-textColor font-semibold">0</p>
                        </div>
                        <div className="absolute text-gray-800 -mr-1  bottom-0 right-0 -mb-6 flex gap-1">
                          <p className=" text-textColor  font-semibold">+1M</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
              <div className="">
                <div className=" flex justify-between items-center">
                  <h1 className=" text-textColor dark:text-white  font-semibold">
                    Repayment Period
                  </h1>
                  <Input placeholder={"5000"} className={" w-32 border"} />
                </div>

                <>
                  {/* between two numbers */}
                  <div className="flex  items-center h-12 justify-center">
                    <div className="py-1 relative min-w-full">
                      <div className="h-1.5 bg-gray-200 rounded-full">
                        <div
                          className="absolute h-1.5 rounded-full  bg-secondary dark:bg-orange w-0"
                          style={{ width: "33.1935%" }}
                        />

                        <div
                          className="absolute h-6 flex items-center justify-center w-6 rounded-full  bg-primary shadow border border-gray-300 -ml-2 -top-1 cursor-pointer"
                          unselectable="on"
                          onselectstart="return false;"
                          style={{ left: "35.4839%" }}
                        >
                          <div className="relative -mt-2 w-1">
                            <div
                              className="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full"
                              style={{ marginLeft: "-25px" }}
                            >
                              <div className="relative shadow-md">
                                {/* <div className="bg-black -mt-8 text-white truncate text-xs rounded py-1 px-4">
                  $ 30
                </div> */}
                                <svg
                                  className="absolute text-black w-full h-2 left-0 top-100"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 255 255"
                                  xmlSpace="preserve"
                                >
                                  <polygon
                                    className="fill-current"
                                    points="0,0 127.5,127.5 255,0"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute text-gray-800 -ml-1  bottom-0 left-0 -mb-6 flex gap-1">
                          <p className=" text-textColor font-semibold">0</p>
                        </div>
                        <div className="absolute text-gray-800 -mr-1  bottom-0 right-0 -mb-6 flex gap-1">
                          <p className=" text-textColor  font-semibold">+1M</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
            <div className=" bg-[#E6E6E6] py-8 rounded-2xl  text-center     md:w-80 w-full  md:my-0 my-6 h-96">
              <img
                src={require("../../assets/images/carD.png")}
                className=" mx-auto"
                alt=""
              />
              <p className=" text-gray-700 text-lg font-semibold pt-3">
                Monthly Payments
              </p>
              <h1 className=" text-secondary font-bold text-3xl py-4">
                QR 62,000
              </h1>
              <Button
                label={"Apply Now"}
                className={
                  " bg-primary  mx-auto mt-5 rounded-3xl py-2 text-white font-semibold"
                }
              />
            </div>

            <div>
              <h4 className="h4 uppercase pb-3">Break-up of total payment</h4>
              <img src={require("../../assets/images/graph.png")} alt="" />
              <ul className=" p-0  leading-9">
                <li className=" flex  justify-between items-center">
                  <p className=" text-textColor font-semibold">Principal Amt</p>
                  <p className=" text-secondary font-bold text-xl">QR 50,000</p>
                </li>
                <hr />
                <li className=" flex  justify-between items-center">
                  <p className=" text-textColor font-semibold">interest Amt</p>
                  <p className=" text-primary font-bold text-xl">QR 2,500</p>
                </li>
                <hr />
                <li className=" flex  justify-between items-center">
                  <p className=" text-textColor font-semibold">
                    total amt payable{" "}
                  </p>
                  <p className=" text-black font-bold text-xl">QR 52,500</p>
                </li>
              </ul>
            </div>
          </div>

          <p className=" text-textColor pt-3">
            The Car Loan calculator results illustrated on Motorqe.com are only
            intended as a guide. To obtain accurate figures do contact your bank
            or loan provider before applying. Rates are subject to change at any
            time & also based on your credit score. You must seek an advice from
            a trained professional before applying for a loan. Your vehicle may
            be repossessed if you do not keep up repayments on your car loan.
          </p>
        </div>

        <div className=" md:px-0 px-6 ">
          <h1 className=" h2 mt-7">Similar Cars </h1>
          <div className=" my-4 flex flex-wrap gap-6">
            {filteredResults?.carListings?.map((item, index) => {
              return (
                <Link
                  to={`/car_details_page/${item._id}`}
                  className="  rounded-xl overflow-hidden"
                >
                  <div className=" h-40 relative">
                    <img
                      src={require("../../assets/images/image 7.png")}
                      className=" object-cover  h-full w-full"
                      alt=""
                    />
                    <div className=" absolute top-0 left-0">
                      <img src={item?.car_images[0]} alt="" />
                    </div>
                  </div>

                  <div className=" bg-[#0C53AB] py-2 px-4">
                    <h1 className=" text-white uppercase font-semibold">
                      Audi A8 4-door sedan blue
                    </h1>
                    <div className="  mt-3 flex justify-between items-center">
                      <div className=" flex gap-2 items-center">
                        <FaCalendarAlt size={12} className=" text-white" />
                        <span className=" text-white text-xs font-bold">
                          2021
                        </span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <img
                          src={require("../../assets/images/layer6.png")}
                          className=" w-4"
                          alt=""
                        />
                        <span className=" text-white text-xs font-bold">
                          4 Cylinder
                        </span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <img
                          src={require("../../assets/images/road-icon 1.png")}
                          className=" w-3"
                          alt=""
                        />
                        <span className=" text-white text-xs font-bold">
                          44, 882 KM
                        </span>
                      </div>
                    </div>
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

export default CarDetailPage;
