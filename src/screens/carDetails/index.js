import React, { useEffect, useState } from "react";
import { FaAngleRight, FaLocationDot } from "react-icons/fa6";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from "react-icons/lia";
import Button from "../../components/Button";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import { MdLocationPin } from "react-icons/md";
import { REACT_APP_GOOGLE_MAPS_KEY } from "../../utils/Google_map_key";
import { Base_url } from "../../utils/Base_url";
import { useSelector } from "react-redux";
import moment from "moment";

const containerStyle = {
  width: "100%",
  height: "400px",
  paddingTop: "80px",
};

const CarDetails = () => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 31.5204,
    lng: 74.3587,
  });

  const libraries = ["places"];

  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  // State variables for address, latitude, and longitude
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(currentLocation.lat);
  const [lng, setLng] = useState(currentLocation.lng);
  const palans = localStorage.getItem("userPlan");
  const plan = useSelector((state) => state.planReducer);
  console.log(plan);

  const userData = JSON.parse(localStorage.getItem("planData"));
  const userToken = JSON.parse(localStorage.getItem("Dealar"));
  console.log(userToken?.profileStatus, "userToken");

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCurrentLocation(pos);
            setLat(pos.lat);
            setLng(pos.lng);
            map?.panTo(pos);
          },
          () => {
            console.error("The Geolocation service failed.");
          }
        );
      } else {
        console.error("Your browser doesn't support geolocation.");
      }
    };

    getCurrentLocation();
  }, [map]);

  const onLoad = (autocomplete) => {
    console.log("autocomplete: ", autocomplete);
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log(place);
      setCurrentLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      // Update state with the selected place's details
      setAddress(place.formatted_address || "");
      setLat(place.geometry.location.lat());
      setLng(place.geometry.location.lng());
      map.panTo(place.geometry.location);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedImage, "selectd image");

  const [loading, setLoader] = useState(false);

  const [selectImages, setSelectedImages] = useState([]);
  console.log(selectImages, "selected images....");
  const [fileUrl, setFileUrl] = useState(null); 
  const [fileType, setFileType] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImages(file);

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }else if (file.type === "application/pdf") {
      // For PDFs, create an object URL
      const pdfUrl = URL.createObjectURL(file);
      setFileUrl(pdfUrl);
      setFileType("pdf");
    } else {
      // alert("Please upload an image or PDF file.");
    }
  };

  const [report, setReport] = useState(" ");

  console.log(report);
  const [state, setState] = useState({
    title: "",
    type_of_ad: "",
    type_of_ad_show: "",
    imported: "",
    body_type: "",
    make: "",
    model: "",
    year: " ",
    vehicle_condition: "",
    mileage: "",
    vehicle_category: "",
    specifications: "",
    cylinder: "",
    engine_size: "",
    wheel_drive: "",
    gear_box: "",
    exterior_colour: "",
    interior_colour: "",
    fuel_type: "",
    registration_date: "",
    warranty: "",
    warranty_date: "",
    inspected: "",
    price_QR: "",
    price_range: "",
    negotiable: "",
    description: "",
    vehicle_location: address,
    longitude: currentLocation.lng,
    latitude: currentLocation.lat,
    inspection_report: report,
    engine_oil: "",
    engine_oil_filter: "",
    gearbox_oil: "",
    ac_filter: "",
    air_filter: "",
    fuel_filter: "",
    spark_plugs: "",
    front_brake_pads: "",
    rear_brake_pads: "",
    front_brake_discs: "",
    rear_brake_discs: "",
    battery: "",
    front_tire_size: "",
    front_tire_price: "",
    rear_tire_size: "",
    rear_tire_price: "",
  });

  console.log(state);
  
  const [models, setModels] = useState([]);
  const handleInputs = (e) => {
    const { name, value } = e.target;

    // Update the state for the input field
    setState((prevState) => ({ ...prevState, [name]: value }));

    // Check if the selected input is for 'make' to fetch models
    if (name === "make") {
      axios
        .get(`${Base_url}/user/model-by-make/${value}`)
        .then((res) => {
          // Check if data is returned and set the models
          if (res.data && res?.data?.data?.models) {
            setModels(res?.data?.data?.models);
            // toast.success("Models loaded successfully!");
          } else {
            // toast.warn("No models found for the selected make.");
          }
        })
        .catch((error) => {
          console.error("Error fetching models:", error);
          // toast.error("Error fetching models. Please try again.");
        });
    }
  };

  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      if (state.inspected === "true") {
        if (!selectImages) {
          toast.error("Please choose your inspection report!");
          return;
        }

        const fileType = selectImages?.type;
        if (fileType !== "application/pdf") {
          toast.error("Only PDF files are allowed!");
          return;
        }

        const formData = new FormData();
        formData.append("pdfs", selectImages);

        const response = await axios.post(
          `http://35.88.137.61/api/api/upload-pdf`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response, "=====API Response====");

        if (response.status === 200 && response.data?.data?.[0]) {
          const uploadedData = response.data.data[0];

          setReport(uploadedData);
          localStorage.setItem("reacts", uploadedData);

          navigate(`/car_photos`, { state: { ...state } });
        } else {
          toast.error("Failed to upload the PDF. Please try again.");
        }
      } else {
        navigate(`/car_photos`, { state: { ...state } });
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      toast.error("An error occurred while uploading the inspection report.");
    } finally {
      setLoader(false);
    }
  };

  const [allData, setAllData] = useState([]);

  const user = useSelector((state) => state.authReducer);
  const [makes, setMakes] = useState([]);
  const [years, setYears] = useState([]);
  console.log(user?.userToken?.plan?._id);

  useEffect(() => {
    axios
      .get(`${Base_url}/admin/car-info/get-added-data/${user?.userToken?._id}`)
      .then((res) => {
        console.log(res.data);
        setAllData(res.data);
      })
      .catch((error) => {});

    axios
      .get(`${Base_url}/user/all-latest-makes`)
      .then((res) => {
        console.log(res.data);
        setMakes(res.data.data);
      })
      .catch((error) => {});

    axios
      .get(`${Base_url}/admin/all-year`)
      .then((res) => {
        console.log(res.data);
        setYears(res.data.data);
      })
      .catch((error) => {});
  }, []);

  const colors = [
    { name: "Red", bgColor: "tw-bg-red-500" },
    { name: "Green", bgColor: "tw-bg-green-500" },
    { name: "Blue", bgColor: "tw-bg-blue-500" },
    { name: "Pink", bgColor: "tw-bg-pink-500" },
    { name: "Yellow", bgColor: "tw-bg-yellow-500" },
    { name: "Purple", bgColor: "tw-bg-purple-500" },
    { name: "Teal", bgColor: "tw-bg-teal-500" },
    { name: "Orange", bgColor: "tw-bg-orange-500" },
  ];

  const vehicleCategories = [
    "Sedan",
    "Hatchback",
    "SUV",
    "Crossover",
    "Coupe",
    "Convertible",
    "Pickup Truck",
    "Minivan",
    "Wagon",
    "Compact",
    "Midsize",
    "Full-Size",
    "Subcompact",
    "Front-Wheel Drive (FWD)",
    "Rear-Wheel Drive (RWD)",
    "All-Wheel Drive (AWD)",
    "Four-Wheel Drive (4WD)",
    "Gasoline",
    "Diesel",
    "Electric",
    "Hybrid",
    "Plug-in Hybrid (PHEV)",
    "Passenger Vehicles",
    "Commercial Vehicles",
    "Luxury Vehicles",
    "Sports Cars",
    "Off-Road Vehicles",
    "Motorcycles",
    "Electric Scooters",
    "Heavy-Duty Trucks",
    "RVs",
  ];

  return (
    <div>
      <Header />
      <div className=" py-8 text-center">
        <h2 className=" h2  text-center">Sell Your Car</h2>
        <p className=" pt-2 text-gray-400">
          Sell your car in seconds with just a few clicks
        </p>
      </div>
      <div className=" py-8 md:px-12 px-6">
        <ul className=" flex flex-wrap gap-8 justify-center items-center">
          <li className=" flex items-center gap-2">
            <div className=" w-8 h-8 bg-secondary items-center  rounded-full flex justify-center">
              <p className=" text-white">1</p>
            </div>
            <div>
              <span className=" text-secondary font-bold">Type Of Package</span>
            </div>
          </li>
          <li>
            <FaAngleRight className=" text-gray-500" />
          </li>
          <li className=" flex items-center gap-2">
            <div className=" w-8 h-8 bg-primary items-center  rounded-full flex justify-center">
              <p className=" text-white">2</p>
            </div>
            <div>
              <span className=" text-primary font-bold">Car Details</span>
            </div>
          </li>
          <li>
            <FaAngleRight className=" text-gray-500" />
          </li>
          <li className=" flex items-center gap-2">
            <span className=" w-8 h-8 bg-white border-textColor border items-center  rounded-full flex justify-center">
              <p className=" text-textColor">3</p>
            </span>
            <div>
              <span className=" text-textColor font-semibold">Photo</span>
            </div>
          </li>
          <li>
            <FaAngleRight className=" text-gray-500" />
          </li>
          <li className=" flex items-center gap-2">
            <div className=" w-8 h-8 bg-white border-textColor border items-center  rounded-full flex justify-center">
              <p className=" text-textColor">3</p>
            </div>
            <div>
              <span className=" text-textColor font-semibold">
                Contact Details
              </span>
            </div>
          </li>
        </ul>
      </div>

      <form
        onSubmit={handlerSubmit}
        className=" shadow-md rounded-xl mt-8 py-5 md:px-12 px-6 mx-auto  md:w-[80%] w-[90%]"
      >
        <div className="">
          <h2 className=" h4  text-center">Car Details</h2>
        </div>

        <div className=" flex flex-col gap-6">
          <div>
            <Input
              type="text"
              onChange={handleInputs}
              value={state.title}
              name={"title"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Title"}
              label={"Title of Listing"}
              required="required"
            />
          </div>
          {userToken?.profileStatus === "dealer" ? (
            <div>
              <label className="block text-sm text-left  font-medium  text-textColor">
                Car Classification
              </label>
              <select
                onChange={handleInputs}
                value={state.type_of_ad}
                name={"type_of_ad"}
                className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
                required
              >
                <option value={""} selected>
                  Select Car Classification
                </option>

                <option value="Standard">Standard</option>
                {/* <option value="Featured">Featured</option> */}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-sm text-left  font-medium  text-textColor">
                Car Classification
              </label>
              <select
                onChange={handleInputs}
                value={state.type_of_ad}
                name={"type_of_ad"}
                className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
                required
              >
                <option value={""} selected>
                  Select Car Classification
                </option>

                {userData?.name === "Gold" || userData?.name === "Platinum" ? (
                  <>
                    <option value="Standard">Standard</option>
                    <option value="Featured">Featured</option>
                  </>
                ) : userData?.name === "Silver" ? (
                  <option value="Standard">Standard</option>
                ) : null}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Type Of Ad
            </label>
            <select
              onChange={handleInputs}
              value={state.type_of_ad_show}
              name={"type_of_ad_show"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Type
              </option>

              <option value={"Sale"}>Sale</option>
              <option value={"Swap"}>Swap</option>
              <option value={"Sale & Swap"}>Sale & Swap</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Body Type
            </label>
            <select
              onChange={handleInputs}
              value={state.body_type}
              name={"body_type"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Type
              </option>

              <option value={"SUV"}>SUV</option>
              <option value={"Coupe"}>Coupe</option>
              <option value={"Luxury"}>Luxury</option>
              <option value={"Electric/Hybrid"}>Electric/Hybrid</option>
              <option value={"MPV"}>MPV</option>
              <option value={"Pickup"}>Pickup</option>
              <option value={"Wagon"}>Wagon</option>
              <option value={"Sedan"}>Sedan</option>
              <option value={"Sports"}>Sports</option>
              <option value={"Classic"}>Classic</option>
              <option value={"Muscle Car"}>Muscle Car</option>
              <option value={"convertible"}>convertible</option>
              <option value={"compact"}>compact</option>
              <option value={"Motorbike"}>Motorbike</option>
              <option value={"Buggy"}>Buggy</option>
              <option value={"Van"}>Van</option>
              <option value={"Bus"}>Bus</option>
              <option value={"Truck"}>Truck</option>
              <option value={"Boat"}>Boat</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Make
            </label>
            <select
              onChange={handleInputs}
              value={state.make}
              name={"make"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Make
              </option>
              {makes?.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
              {/* <option value={'honda'}>Honda</option>
              <option value={'corolla'}>corolla</option> */}
            </select>
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Model
            </label>
            <select
              onChange={handleInputs}
              value={state.model}
              name={"model"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Model
              </option>

              {models?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Year
            </label>
            <select
              onChange={handleInputs}
              value={state.year}
              name={"year"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Year
              </option>

              {/* <option value={2023}>2023</option>
              <option value={2024}>2024</option> */}

              {years?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Vehicle Condition/Status
            </label>
            <select
              onChange={handleInputs}
              value={state.vehicle_condition}
              name={"vehicle_condition"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Vehicle Condition
              </option>
              {/* {allData?.fieldArrays?.vehicle_condition?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))} */}
              <option value={"New"}>New</option>
              <option value={"Used"}>Used</option>
              {/* <option value={"Important"}>Important</option> */}
            </select>
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Important Car
            </label>
            <select
              onChange={handleInputs}
              value={state.imported}
              name={"imported"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option  selected>
                Select Important
              </option>

              <option value={"true"}>Yes</option>
              <option value={"false"}>No</option>
            </select>
          </div>
          <div>
            <Input
              type="number"
              onChange={handleInputs}
              value={state.mileage}
              name={"mileage"}
              className={"  border w-full  p-2 bg-[#FEFBFB]"}
              placeholder={"Enter Mileage"}
              label={"Mileage"}
              required={"required"}
            />
          </div>
          {/* <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Vehicle Category
            </label>
            <select
              onChange={handleInputs}
              value={state.vehicle_category}
              name={"vehicle_category"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Vehicle Category
              </option>


              {vehicleCategories?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div> */}
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Specifications
            </label>
            <select
              onChange={handleInputs}
              value={state.specifications}
              name={"specifications"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option>Select</option>
              <option value="All">All</option>
              <option value="GCC">GCC</option>
              <option value="China">China</option>
              <option value="Italy">Italy</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Japan">Japan</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Netherlands">Netherlands</option>
              <option value="India">India</option>
              <option
                value="South Korea
"
              >
                South Korea{" "}
              </option>
              <option value="Sweden">Sweden</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Australia">Australia</option>
              <option value="Spain">Spain</option>
              <option value="Malaysia">Malaysia</option>
              <option
                value="Czech Republic
"
              >
                Czech Republic
              </option>
              <option value="Russia">Russia</option>
              <option value="Austria">Austria</option>
              <option
                value="Switzerland
"
              >
                Switzerland
              </option>
              <option
                value="Switzerland
"
              >
                Argentina
              </option>

              <option
                value="Brazil
"
              >
                Brazil
              </option>

              <option
                value="Other
"
              >
                Other
              </option>

              {/* {allData?.fieldArrays?.specifications?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))} */}
            </select>
          </div>
          <div>
            <label className="block text-sm text-left font-medium text-textColor">
              Cylinder
            </label>
            <select
              onChange={handleInputs}
              value={state.cylinder}
              name={"cylinder"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Cylinder
              </option>
              <option value={"2"}>2</option>
              <option value={"3"}>3</option>
              <option value={"4"}>4</option>
              <option value={"5"}>5</option>
              <option value={"6"}>6</option>
              <option value={"8"}>8</option>
              <option value={"10"}>10</option>
              <option value={"12"}>12</option>
              <option value={"16"}>16</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Engine Size
            </label>
            <select
              onChange={handleInputs}
              value={state.engine_size}
              name={"engine_size"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Engine Size
              </option>
              <option value={"0.6L - 1.0L"}>0.6L - 1.0L</option>
              <option value={"1.0L - 1.5L"}>1.0L - 1.5L</option>
              <option value={"1.5L - 2.0L"}>1.5L - 2.0L</option>
              <option value={"2.0L - 2.5L"}>2.0L - 2.5L</option>
              <option value={"2.5L - 3.0L"}>2.5L - 3.0L</option>
              <option value={"3.0L - 4.0L"}>3.0L - 4.0L</option>
              <option value={"4.0L - 5.0L"}>4.0L - 5.0L</option>
              <option value={"5.0L - 6.0L"}>5.0L - 6.0L</option>
              <option value={"6.0L and above"}>6.0L and above</option>

              {/* {allData?.fieldArrays?.engine_size?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))} */}
            </select>
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Wheel Drive
            </label>
            <select
              onChange={handleInputs}
              value={state.wheel_drive}
              name={"wheel_drive"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Wheel Drive
              </option>
              <option value={"Front-Wheel Drive (FWD)"}>
                Front-Wheel Drive (FWD)
              </option>
              <option value={"Rear-Wheel Drive (RWD)"}>
                Rear-Wheel Drive (RWD)
              </option>
              <option value={"All-Wheel Drive (AWD)"}>
                All-Wheel Drive (AWD)
              </option>
              <option value={"Four-Wheel Drive (4WD/4x4)"}>
                Four-Wheel Drive (4WD/4x4)
              </option>

              {/* {allData?.fieldArrays?.wheel_drive?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))} */}
            </select>
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Gear Box
            </label>
            <select
              onChange={handleInputs}
              value={state.gear_box}
              name={"gear_box"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Gear Box
              </option>

              {/* {allData?.fieldArrays?.gear_box?.map((item, index) => ( */}
              {/* <option key={index} value={item}>
                  {item}
                </option> */}
              <option value={"Manual gearbox"}>Manual gearbox</option>
              <option value={"Automatic gearbox"}>Automatic gearbox</option>
              <option value={"Torque Converter Gearbox"}>
                Torque Converter Gearbox
              </option>
              <option value={"Offers torque"}>Offers torque</option>
              {/* ))} */}
            </select>
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Exterior Colour
            </label>
            <select
              onChange={handleInputs}
              value={state.exterior_colour}
              name={"exterior_colour"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Exterior Colour
              </option>
              <option value="Black">Black</option>
              <option value="Gray">Gray</option>
              <option value="Beige">Beige</option>
              <option value="Tan">Tan</option>
              <option value="Brown">Brown</option>
              <option value="Ivory">Ivory</option>
              <option value="Cream">Cream</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Charcoal">Charcoal</option>
              <option value="Dark Blue">Dark Blue</option>
              <option value="White">White</option>
              <option value="Green">Green</option>
              <option value="Burgundy">Burgundy</option>
              <option value="Yellow">Yellow</option>
              <option value="Orange">Orange</option>
              <option value="Two-tone (e.g., black and beige)">
                Two-tone (e.g., black and beige)
              </option>
              <option value="Sporty Red/Black">Sporty Red/Black</option>
              <option value="Cocoa">Cocoa</option>
              <option value="Almond">Almond</option>
              <option value="Slate Gray">Slate Gray</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Interior Colour
            </label>
            <select
              onChange={handleInputs}
              value={state.interior_colour}
              name={"interior_colour"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value="Black">Black</option>
              <option value="Gray">Gray</option>
              <option value="Beige">Beige</option>
              <option value="Tan">Tan</option>
              <option value="Brown">Brown</option>
              <option value="Ivory">Ivory</option>
              <option value="Cream">Cream</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Charcoal">Charcoal</option>
              <option value="Dark Blue">Dark Blue</option>
              <option value="White">White</option>
              <option value="Green">Green</option>
              <option value="Burgundy">Burgundy</option>
              <option value="Yellow">Yellow</option>
              <option value="Orange">Orange</option>
              <option value="Two-tone (e.g., black and beige)">
                Two-tone (e.g., black and beige)
              </option>
              <option value="Sporty Red/Black">Sporty Red/Black</option>
              <option value="Cocoa">Cocoa</option>
              <option value="Almond">Almond</option>
              <option value="Slate Gray">Slate Gray</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Fuel Type
            </label>
            <select
              onChange={handleInputs}
              value={state.fuel_type}
              name={"fuel_type"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Fuel Type
              </option>
              <option value={"All"}>All</option>
              <option value={"Gasoline"}>Gasoline</option>
              <option value={"Diesel"}>Diesel</option>
              <option value={"Hybrid"}>Hybrid</option>
              <option value={"Electric"}>Electric</option>

              {/* {allData?.fieldArrays?.fuel_type?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))} */}
            </select>
          </div>
          <div>
            <Input
              type={"date"}
              onChange={handleInputs}
              value={state.registration_date}
              name={"registration_date"}
              className={"  border w-full  p-2 bg-[#FEFBFB]"}
              placeholder={"Enter Registration Date"}
              label={"Registration Date"}
              // Icon={<FaCalendarAlt className=" text-textColor" size={20} />}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Warranty
            </label>
            <select
              type={"text"}
              onChange={handleInputs}
              value={state.warranty}
              name={"warranty"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option selected> Select Warranty</option>

              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <Input
              type={"date"}
              onChange={handleInputs}
              value={state.warranty_date}
              name={"warranty_date"}
              className={"  border w-full  p-2 bg-[#FEFBFB]"}
              placeholder={"Enter Warranty Date"}
              label={"Warranty Date"}
              required="required"
              // Icon={<FaCalendarAlt className=" text-textColor" size={20} />}
            />
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Inspected
            </label>
            <select
              onChange={handleInputs}
              value={state.inspected}
              name={"inspected"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option selected>Select Inspected</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <p className=" text-textColor font-semibold">Inspection Report</p>
            {fileUrl ? (
              <label
                htmlFor="fileInput"
                className=" rounded-md  border overflow-hidden flex w-40  h-40 "
              >
                <div className="w-full h-full">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@http://35.92.10.241:3000/build/pdf.worker.min.js">
                <Viewer fileUrl={fileUrl} />
              </Worker>
            </div>
                <input
                  accept="image/*"
                  onChange={handleFileChange}
                  name="images"
                  type="file"
                  id="fileInput"
                  className="hidden"
                />
              </label>
            ) : (
              <label
                htmlFor="fileInput"
                className="bg-[#FEFBFB] border rounded-md p-1 w-40 flex  justify-center items-center"
              >
                <div>
                  <img
                    src={require("../../assets/images/upload.png")}
                    className=" mx-auto w-20"
                    alt=""
                  />
                  <input
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    name="images"
                    type="file"
                    id="fileInput"
                    className="hidden"
                  />
                  <span className=" text-secondary text-sm font-semibold">
                    {selectImages?.length === 0
                      ? "Inspection Report"
                      : selectImages?.name}
                  </span>
                </div>
              </label>
            )}

            <p className=" pt-4 text-textColor text-sm">
              Maximum File Size 1Mb
            </p>
          </div>

          <div className="   w-[100%]">
            <Input
              type={"number"}
              onChange={handleInputs}
              value={state.price_QR}
              name={"price_QR"}
              className={"  border w-full p-2  mt-1 bg-[#FEFBFB]"}
              placeholder={"Enter Price"}
              label={"Price (QR)"}
            />
          </div>
          <div>
            <label className="block text-sm text-left font-medium text-textColor">
              Price Range
            </label>
            <select
              onChange={handleInputs}
              value={state.price_range}
              name={"price_range"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Price Range
              </option>
              <option value={"10000-30000"}>10,000 - 30,000</option>
              <option value={"30000-50000"}>30,000 - 50,000</option>
              <option value={"50000-60000"}>50,000 - 60,000</option>
              <option value={"60000-70000"}>60,000 - 70,000</option>
              <option value={"70000-80000"}>70,000 - 80,000</option>
              <option value={"80000-90000"}>80,000 - 90,000</option>
              <option value={"90000-100000"}>90,000 - 100,000</option>
              <option value={"100000-120000"}>100,000 - 120,000</option>
              <option value={"120000-130000"}>120,000 - 130,000</option>
              <option value={"130000-140000"}>130,000 - 140,000</option>
              <option value={"140000-150000"}>140,000 - 150,000</option>
              <option value={"150000-160000"}>150,000 - 160,000</option>
              <option value={"160000-170000"}>160,000 - 170,000</option>
              <option value={"170000-180000"}>170,000 - 180,000</option>
              <option value={"180000-190000"}>180,000 - 190,000</option>
              <option value={"190000-200000"}>190,000 - 200,000</option>
              <option value={"200000-250000"}>200,000 - 250,000</option>
              <option value={"250000-300000"}>250,000 - 300,000</option>
              <option value={"300000+"}>300,000+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Negotiable
            </label>
            <select
              onChange={handleInputs}
              value={state.negotiable}
              name={"negotiable"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Negotiable
              </option>

              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div>
            <Input
              type={"text"}
              onChange={handleInputs}
              value={state.description}
              name={"description"}
              className={"  border w-full h-24   p-2 bg-[#FEFBFB]"}
              placeholder={"Enter Description"}
              label={"Description"}
              required="required"
            />
          </div>
          <div>
            <div className=" relative">
              <div className=" ">
                <LoadScript
                  googleMapsApiKey={REACT_APP_GOOGLE_MAPS_KEY}
                  libraries={libraries}
                >
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentLocation}
                    zoom={10}
                    onLoad={(map) => setMap(map)}
                  >
                    <MarkerF
                      position={currentLocation}
                      icon={
                        "http://maps.google.com/mapfiles/ms/icons/black-dot.png"
                      }
                    />
                    <div className="search-location-input   bg-white   absolute top-0  w-full">
                      <label className="block text-sm font-medium text-textColor">
                        Vehicle Location
                      </label>

                      <Autocomplete
                        onLoad={onLoad}
                        onPlaceChanged={onPlaceChanged}
                        options={{
                          componentRestrictions: { country: "PK" },
                        }}
                      >
                        <input
                          className="outline-none bg-lightGray border w-full p-2  bg-[#FEFBFB] text-textColor placeholder:text-gray-500 rounded-md"
                          type="text"
                          placeholder="Search Location"
                        />
                      </Autocomplete>
                      <div className="absolute right-3 top-8">
                        <MdLocationPin className="text-textColor" size={20} />
                      </div>
                    </div>
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>
        </div>

        <h2 className=" h4  text-center mt-10 pb-7"> Spare Parts</h2>
        <div className=" flex flex-wrap gap-6">
          <div className=" md:w-[48%] w-[100%]">
            <Input
              type={"text"}
              onChange={handleInputs}
              value={state.engine_oil}
              name={"engine_oil"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Price"}
              label={"Engine Oil"}
            />
          </div>
          <div className="   md:w-[48%] w-[100%]">
            <Input
              type={"text"}
              onChange={handleInputs}
              value={state.engine_oil_filter}
              name={"engine_oil_filter"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Price"}
              label={"Engine Oil Filter"}
            />
          </div>
          <div className="  md:w-[48%] w-[100%]">
            <Input
              type={"text"}
              onChange={handleInputs}
              value={state.gearbox_oil}
              name={"gearbox_oil"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Price"}
              label={"Gearbox Oil"}
            />
          </div>
          <div className="  md:w-[48%] w-[100%]">
            <Input
              type={"text"}
              onChange={handleInputs}
              value={state.ac_filter}
              name={"ac_filter"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Price"}
              label={"A.C Filter"}
            />
          </div>
          <div className="   md:w-[48%] w-[100%]">
            <Input
              type={"text"}
              onChange={handleInputs}
              value={state.air_filter}
              name={"air_filter"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Price"}
              label={"Air Filter"}
            />
          </div>
          <div className="   md:w-[48%] w-[100%]">
            <Input
              type={"text"}
              onChange={handleInputs}
              value={state.fuel_filter}
              name={"fuel_filter"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Price"}
              label={"Fuel Filter"}
            />
          </div>
          <div className="   md:w-[48%] w-[100%]">
            <Input
              type={"text"}
              onChange={handleInputs}
              value={state.spark_plugs}
              name={"spark_plugs"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Price"}
              label={"Spark Plugs"}
            />
          </div>
          <div className="   md:w-[48%] w-[100%]">
            <Input
              type={"text"}
              onChange={handleInputs}
              value={state.front_brake_pads}
              name={"front_brake_pads"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Price"}
              label={"Front Brake Pads"}
            />
          </div>
          <div className="   md:w-[48%] w-[100%]">
            <Input
              type={"text"}
              onChange={handleInputs}
              value={state.rear_brake_pads}
              name={"rear_brake_pads"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={" Enter Price"}
              label={"Rear Brake Pads"}
            />
          </div>
          <div className="   md:w-[48%] w-[100%]">
            <Input
              type={"text"}
              onChange={handleInputs}
              value={state.front_brake_discs}
              name={"front_brake_discs"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Price"}
              label={"Front Brake Discs"}
            />
          </div>
          <div className="   md:w-[48%] w-[100%]">
            <Input
              type={"text"}
              onChange={handleInputs}
              value={state.rear_brake_discs}
              name={"rear_brake_discs"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Price"}
              label={"Rear Brake Discs"}
            />
          </div>
          <div className="   md:w-[48%] w-[100%]">
            <Input
              type={"text"}
              onChange={handleInputs}
              value={state.battery}
              name={"battery"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Price"}
              label={"Battery"}
            />
          </div>
        </div>

        <h2 className=" h4  text-center mt-10 pb-7"> Tyres</h2>
        <div className=" flex flex-wrap gap-6">
          <div className="  md:w-[48%] w-[100%]">
            <Input
              type={"text"}
              onChange={handleInputs}
              value={state.front_tire_size}
              name={"front_tire_size"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Size"}
              label={"Front Tire Size"}
            />
          </div>
          <div className="   md:w-[48%] w-[100%]">
            <Input
              type={"number"}
              onChange={handleInputs}
              value={state.front_tire_price}
              name={"front_tire_price"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Price"}
              label={"Front Tire Price"}
            />
          </div>
          <div className="  md:w-[48%] w-[100%]">
            <Input
              type={"text"}
              onChange={handleInputs}
              value={state.rear_tire_size}
              name={"rear_tire_size"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Size"}
              label={"Rear Tire Size"}
            />
          </div>
          <div className="   md:w-[48%] w-[100%]">
            <Input
              type={"number"}
              onChange={handleInputs}
              value={state.rear_tire_price}
              name={"rear_tire_price"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Price"}
              label={"Rear Tire Price"}
            />
          </div>
        </div>
        <div className=" container flex justify-between items-center mx-auto mt-10 mb-20">
          <div className="  flex items-center gap-3"></div>

          {loading === true ? (
            <button
              disabled
              type="button"
              class="text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
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
              type={"submit"}
              label={"Next"}
              rIcons={<LiaLongArrowAltRightSolid />}
              className={" bg-primary rounded-3xl text-white w-44 py-1.5"}
            />
          )}
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default CarDetails;
