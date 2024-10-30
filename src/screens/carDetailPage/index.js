import React, { useEffect, useRef, useState } from "react";
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
import {
  FaLocationDot,
  FaPause,
  FaPlay,
  FaRegCircleCheck,
} from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { toast } from "react-toastify";
import { Pannellum } from "pannellum-react";
const CarDetailPage = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
  price,
  qty,
  setQty,
}) => {
  const userData = JSON.parse(localStorage.getItem("Dealar"));

  const sliders = [
    require("../../assets/images/image 7.png"),
    require("../../assets/images/home.png"),
  ];

  const [newListings, setNewListings] = useState({});
  const { id } = useParams();

  const user = useSelector((state) => state.authReducer);
const [banners,setBanners] = useState([]);
console.log(banners);

  console.log(user);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${Base_url}/user/single-car/${id}`)
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

    axios
    .get(`${Base_url}/user/ads`)
    .then((res) => {
      console.log(res);

      setBanners(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [id]);

  const [curr, setCurr] = useState(0);
  console.log(curr);

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
  const [carPrice, setCarPrice] = useState(0);

  useEffect(() => {
    if (newListings?.price_QR) {
      setCarPrice(Number(newListings.price_QR));
    }
  }, [newListings]);

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


  

  const clickButtons = async (messages) => {
    const params = {
      id: newListings?._id,
      action: messages,
    };
    const response = await axios
      .post(`${Base_url}/user/count-click`, params)
      .then((res) => {
        console.log(res);
      });
  };

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

  const [yaw, setYaw] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);

  // Auto-move functionality
  
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setYaw((prevYaw) => (prevYaw + 0.5) % 360); // Adjust the value to control rotation speed
      }, 100); // Adjust for faster or slower movement
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current); // Clean up the interval on component unmount
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const [activeTab, setActiveTab] = useState("Interior");




 
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); 
  const [interestRate, setInterestRate] = useState(2.9); 
  const [repaymentPeriod, setRepaymentPeriod] = useState(48); 

  const principalAmount = () => {
    return carPrice - (carPrice * (downPaymentPercent / 100));
  };

  const interestAmount = () => {
    const principal = principalAmount();
    const interestRateDecimal = interestRate / 100;
    const years = repaymentPeriod / 12;
    return (principal * interestRateDecimal * years).toFixed(2);
  };

  const totalAmountPayable = () => {
    return (parseFloat(interestAmount()) + principalAmount()).toFixed(2);
  };

  const calculateMonthlyPayment = () => {
    return (totalAmountPayable() / repaymentPeriod).toFixed(2);
  };

  return (
    <>
      <Header />
      <div className=" container md:py-12 py-0 mx-auto md:px-12 px-0">
        <div className=" lg:flex block   justify-between ">
          <div className=" lg:w-[65%] w-[100%]">
            <div className="overflow-hidden relative border rounded-2xl md:w-[90%] w-[100%]">
              <div className="py-3 px-12 md:block hidden">
                <ul className="flex justify-between relative z-20 items-center">
                  {newListings?.threeSixtyImage?.length > 0 && (
                    <li>
                      <span
                        onClick={() => setActiveTab("360Tour")}
                        className={`text-secondary text-xl font-bold cursor-pointer ${
                          activeTab === "360Tour"
                            ? "border-b-4 border-primary"
                            : ""
                        }`}
                      >
                        360 Tour
                      </span>
                    </li>
                  )}

                  {newListings?.car_images?.length > 0 && (
                    <li>
                      <span
                        onClick={() => setActiveTab("Interior")}
                        className={`text-secondary text-xl font-bold cursor-pointer ${
                          activeTab === "Interior"
                            ? "border-b-4 border-primary"
                            : ""
                        }`}
                      >
                        Interior
                      </span>
                    </li>
                  )}

                  {newListings?.car_images?.length > 0 && (
                    <li>
                      <span
                        onClick={() => setActiveTab("Exterior")}
                        className={`text-secondary text-xl font-bold cursor-pointer ${
                          activeTab === "Exterior"
                            ? "border-b-4 border-primary"
                            : ""
                        }`}
                      >
                        Exterior
                      </span>
                    </li>
                  )}
                </ul>
              </div>

              <div
                className="flex sm:h-[75vh] h-[50vh] transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${curr * 100}%)` }}
              >
                {activeTab === "Exterior" &&
                  newListings?.car_images?.map((s, index) => (
                    <div className="flex-none w-full h-full" key={index}>
                      <img
                        src={s}
                        alt=""
                        className="w-full cursor-pointer h-full rounded-md object-cover"
                      />
                    </div>
                  ))}

                {activeTab === "Interior" &&
                  newListings?.car_images?.map((s, index) => (
                    <div className="flex-none w-full h-full" key={index}>
                      <img
                        src={s}
                        alt=""
                        className="w-full cursor-pointer h-full rounded-md object-cover"
                      />
                    </div>
                  ))}

                {activeTab === "360Tour" &&
                  newListings?.threeSixtyImage?.map((item, index) => (
                    <div className="flex-none rounded-md relative z-40 overflow-hidden w-full h-full">
                      <Pannellum
                        width="100%"
                        height="500px"
                        image={item}
                        pitch={10}
                        yaw={yaw}
                        hfov={110}
                        autoLoad
                        showZoomCtrl={true}
                      >
                        <Pannellum.Hotspot
                          type="custom"
                          pitch={12.41}
                          yaw={117.76}
                          handleClick={(evt, name) => console.log(name)}
                          name="image info"
                        />
                      </Pannellum>
                      <button
                        onClick={handlePlayPause}
                        className="absolute bottom-10 left-4 w-12 flex justify-center items-center bg-transparent h-12 border border-white rounded-full    shadow"
                      >
                        {isPlaying ? (
                          <FaPlay color="white" size={25} />
                        ) : (
                          <FaPause color="white" size={25} />
                        )}
                      </button>
                    </div>
                  ))}
              </div>

              <div className="">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full absolute top-[50%] left-3 shadow flex justify-center items-center bg-white/80 text-gray-800 hover:bg-white"
                >
                  <TfiAngleLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full absolute top-[50%] right-3  flex justify-center items-center shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                  <TfiAngleRight size={20} />
                </button>
              </div>

              <div className="my-2 md:block hidden">
                <div className="flex items-center justify-center gap-2">
                  {activeTab === "360Tour" &&
                    newListings?.threeSixtyImage?.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`transition-all cursor-pointer w-20 h-16 rounded-md overflow-hidden bg-white ${
                          curr === i ? "w-14 h-14" : "bg-opacity-50"
                        }`}
                      >
                        <img
                          src={item}
                          alt=""
                          className="w-full h-full object-center"
                        />
                      </div>
                    ))}

                  {activeTab === "Interior" &&
                    newListings?.car_images?.map((image, i) => (
                      <div
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`transition-all cursor-pointer w-20 h-16 rounded-md overflow-hidden bg-white ${
                          curr === i ? "w-14 h-14" : "bg-opacity-50"
                        }`}
                      >
                        <img
                          src={image}
                          alt=""
                          className="w-full h-full object-center"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className=" md:py-12 py-4 flex-wrap flex justify-center items-center md:gap-10 gap-6">
              <Button
                onClick={() => clickButtons("share")}
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
                onClick={() => clickButtons("call")}
                Icons={<IoCall size={25} />}
                label={"Call 123-456-7890"}
                className={
                  " py-2 text-lg mt-3   w-full  bg-secondary text-white  rounded-3xl"
                }
              />
              <Button
                onClick={() => clickButtons("whatsapp")}
                label={"Whatsapp"}
                Icons={<FaWhatsapp size={25} />}
                className={
                  " py-2 w-full text-lg bg-green  mt-3 text-white  rounded-3xl"
                }
              />
              <Button
                onClick={() => {
                  clickButtons("message");

                  checkFunChat(newListings?.user?._id);
                }}
                Icons={<FaRegEnvelope />}
                label={"Send Message"}
                className={
                  " py-1.5 text-lg bg-primary  font-semibold w-full mt-3 text-white  rounded-3xl"
                }
              />
            </div>
            <h5 className=" h4 pt-6">Posted by:</h5>

            {newListings?.user?.profileStatus === "privateSeller" ? (
              <img
                src={newListings?.user?.image}
                className="w-24 h-24  rounded-full mx-auto"
                alt=""
              />
            ) : (
              <img
                src={require("../../assets/images/logo.png")}
                className="  mx-auto"
                alt=""
              />
            )}

            <div className=" pt-3">
              {newListings?.user?.profileStatus === "privateSeller" ? (
                <h6 className=" text-center text-secondary font-semibold">
                  See All Cars Listed from {newListings?.user?.username}
                </h6>
              ) : (
                <h6 className=" text-center text-secondary font-semibold">
                  See All Cars Listed from ELITE MOTORS
                </h6>
              )}

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

        <div className="py-12 md:px-0 px-6">
      <h1 className="h3 text-center">CAR LOAN CALCULATOR</h1>

      <div className="md:flex block justify-between pt-8">
        <div className="flex flex-col gap-4 md:w-96 w-[100%]">
          {/* Car Price */}
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-[#7D7D7D] dark:text-white font-semibold">Car Price</h1>
              <input
                type="number"
                placeholder="5000"
                className="w-32  py-1.5 px-3 border rounded-sm border-[#D5D5D5]"
                value={carPrice}
                onChange={(e) => setCarPrice(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center h-12 justify-center">
              <input
                type="range"
                min="0"
                max="1000000"
                step="1000"
                value={carPrice}
                onChange={(e) => setCarPrice(Number(e.target.value))}
                className="slider appearance-none bg-primary w-full"
              />

<style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          background-color: #9e9ee3; /* Background color for the range input */
        }

        /* Track styling */
        input[type="range"]::-webkit-slider-runnable-track {
          background: #9e9ee3; /* Range bar theme */
          height: 6px;
          border-radius: 6px;
        }
        input[type="range"]::-moz-range-track {
          background: #0c0cb8; /* Range bar theme */
          height: 8px;
          border-radius: 6px;
        }

        /* Thumb styling */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          background-color: #FB5722; /* Thumb color */
          border-radius: 50%;
          cursor: pointer;
          margin-top: -8px; /* Centers thumb on track */
        }
        input[type="range"]::-moz-range-thumb {
          height: 24px;
          width: 24px;
          background-color: orange; /* Thumb color */
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
            </div>
            
            <div className=" flex  justify-between items-center">
              <p className=" text-[#7D7D7D] font-semibold"> 0</p>
              <p className="text-[#7D7D7D] font-semibold">1M+</p>
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-textColor dark:text-white font-semibold">Down Payment</h1>
              <input
                type="number"
                placeholder="500"
                className="w-32 py-1.5 px-3 rounded-md border"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center h-12 justify-center">
              <input
                type="range"
                min="0"
                max="100" // Max is set to car price
                // step="100"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="slider"
              />
            </div>

            <div className=" flex  justify-between items-center">
              <p className=" text-[#7D7D7D] font-semibold">{downPaymentPercent}%</p>
              <p className="text-[#7D7D7D] font-semibold">100%</p>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-textColor dark:text-white font-semibold">Interest Rate (p.a)</h1>
              <input
                type="number"
                placeholder="5"
                className="w-32 py-1.5 px-3 rounded-md border"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center h-12 justify-center">
              <input
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="slider"
              />
            </div>
            <div className=" flex  justify-between items-center">
              <p className=" text-[#7D7D7D] font-semibold">{interestRate}%</p>
              <p className="text-[#7D7D7D] font-semibold">100%</p>
            </div>
          </div>

          {/* Repayment Period */}
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-textColor dark:text-white font-semibold">Repayment Period (months)</h1>
              <input
                type="number"
                placeholder="36"
                className="w-32 py-1.5 px-3 rounded-md border"
                value={repaymentPeriod}
                onChange={(e) => setRepaymentPeriod(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center h-12 justify-center">
              <input
                type="range"
                min="1"
                max="72"
                value={repaymentPeriod}
                onChange={(e) => setRepaymentPeriod(Number(e.target.value))}
                className="slider"
              />
            </div>
            <div className=" flex  justify-between items-center">
              <p className=" text-[#7D7D7D] font-semibold">0</p>
              <p className="text-[#7D7D7D] font-semibold">72 Months</p>
            </div>
          </div>
        </div>

        <div className="bg-[#E6E6E6] py-8 rounded-2xl text-center md:w-80 w-full md:my-0 my-6 h-96">
          <Link to={`${banners?.special?.[0]?.imageUrl}`}>
            <img
              src={banners?.special?.[0]?.imageUrl}
              className="mx-auto h-24 rounded-md"
              alt=""
            />
          </Link>
          <p className="text-gray-700 text-lg font-semibold pt-3">Monthly Payments</p>
          <h1 className="text-secondary font-bold text-3xl py-4">QR {calculateMonthlyPayment()}</h1>
          <Button
            label={"Apply Now"}
            className={"bg-primary mx-auto mt-5 rounded-3xl py-2 text-white font-semibold"}
          />
        </div>

        <div>
          <h4 className="h4 uppercase pb-3">Break-up of total payment</h4>
          <div className=" relative">
          <img src={require("../../assets/images/graph.png")} alt="" />
          <div className=" absolute top-24 left-32 w-28 h-28 flex justify-center items-center bg-white rounded-full">
            <h2 className=" font-bold m-0 text-center text-primary text-[22px] leading-6">{downPaymentPercent}% Deposit</h2>
          </div>
          </div>
          <ul className="p-0 leading-9">
            <li className="flex justify-between items-center">
              <p className="text-textColor font-semibold">Principal Amt</p>
              <p className="text-secondary font-bold text-xl">QR {principalAmount()}</p>
            </li>
            <hr />
            <li className="flex justify-between items-center">
              <p className="text-textColor font-semibold">Interest Amt</p>
              <p className="text-primary font-bold text-xl">QR {interestAmount()}</p>
            </li>
            <hr />
            <li className="flex justify-between items-center">
              <p className="text-textColor font-semibold">Total Amt Payable</p>
              <p className="text-black font-bold text-xl">QR {totalAmountPayable()}</p>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-textColor pt-3">
        The Car Loan calculator results illustrated on Motorqe.com are only intended as a guide. To obtain accurate figures do contact your bank or loan provider before applying. Rates are subject to change at any time & also based on your credit score. You must seek advice from a trained professional before applying for a loan. Your vehicle may be repossessed if you do not keep up repayments on your car loan.
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
