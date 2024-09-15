import React, { useEffect, useState } from "react";
import { FaAngleRight, FaLocationDot } from "react-icons/fa6";
import Input from "../../../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from "react-icons/lia";
import Button from "../../../../components/Button";
import { MdAddCircleOutline } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import { MdLocationPin } from "react-icons/md";
import { REACT_APP_GOOGLE_MAPS_KEY } from "../../../../utils/Google_map_key";
import { Base_url } from "../../../../utils/Base_url";
import { useSelector } from "react-redux";
import moment from "moment";

const containerStyle = {
  width: "100%",
  height: "400px",
  paddingTop: "80px",
};

const GarageDetailsUpload = () => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 31.5204,
    lng: 74.3587,
  });

  var base_origin = window.location.origin;


  const libraries = ["places"];

  const [services, setServices] = useState([]);

  console.log(services);

  // Handles input changes for service details
  const handleInputChange = (index, event) => {
    const updatedServices = services.map((service, i) => {
      if (i === index) {
        return { ...service, [event.target.name]: event.target.value };
      }
      return service;
    });
    setServices(updatedServices);
  };

  // Adds a new service input
  const addService = () => {
    setServices([...services, { name: "", price: "" }]);
  };

  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  // State variables for address, latitude, and longitude
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(currentLocation.lat);
  const [lng, setLng] = useState(currentLocation.lng);

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

  const [loading, setLoader] = useState(false);

  console.log(selectedImage);

  const [selectImages, setSelectedImages] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImages(file);

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [report, setReport] = useState(" ");

  console.log(report);
  const [state, setState] = useState({
    title: "",
    typeofListing: "",
    garageName: "",
    address: "",
    make: "",
    model: "",
    workingDays: "",
    workingHours: "",
    mobileGarage: "",
    pickupDelivery: "",
    availableDays: "",
    availableDatesFrom: "",
    about: "",
    category: "",
    name: "",
    whatsapp: "",
    number: "",
    email: "",
    vehicle_location: address,
    longitude: currentLocation.lng,
    latitude: currentLocation.lat,
  });

  console.log(state);

  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (!selectImages) {
      toast.error("Please choose your inspection report!");
    } else {
      setLoader(true);

      let profilephoto = " ";

      try {
        let param = new FormData();
        param.append("avatars", selectImages);

        profilephoto = await axios.post(
          `http://18.133.248.196:8000/v1/uploadImage`,
          param
        );

        console.log(profilephoto, "=====profile photo===");
        setReport(profilephoto?.data?.data[0]?.url);

        localStorage.setItem("reacts", profilephoto?.data?.data[0]?.url);

        const params = {
          garageOwnerId: "6077e3cf9c9aeb12406d161d",
          userId: user?.userToken?._id,
          carId: "6077e3cf9c9aeb12406d161f",
          typeofListing: state.typeofListing,
          garageName: state.garageName,
          address: state.address,
          workingDays: state.workingDays,
          workingHours: state.workingHours,
          mobileGarage: state.mobileGarage,
          pickupDelivery: state.pickupDelivery,
          availableDays: state.availableDays,
          availableDatesFrom: state.availableDatesFrom,
          logo: {
            fileName: "garage_logo.png",
            filePath: profilephoto?.data?.data[0]?.url,
          },
          about: state.about,
          location: "Example City",
          category: state.category,
          services: services,
          name: state.name,
          number: state.number,
          whatsapp: state.whatsapp,
          email: state.email,
          status: "Active",
        };

        axios
          .post(`${Base_url}/users/create-garage`, params)
          .then((res) => {
            console.log(res);
            if (res.data.success === true) {
              navigate(`http://35.88.148.135:4000/garage`);
              setLoader(false);

              toast.success("Garage  add successfully!");
            } else {
              toast.error(res?.data?.message);
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error(error?.response?.data?.message);
            setLoader(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [allData, setAllData] = useState([]);

  const user = useSelector((state) => state.authReducer);

  console.log(user?.userToken?.plan?._id);

  useEffect(() => {
    axios
      .get(`${Base_url}/admin/car-info/get-added-data/${user?.userToken?._id}`)
      .then((res) => {
        console.log(res.data);
        setAllData(res.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <div>
      <Header />
      <div className=" py-8 text-center">
        <h2 className=" h2  text-center">Garage Listings</h2>
        <p className=" pt-2 text-gray-400">
          Create Vehicles Service Providers & Garages
        </p>
      </div>

      <div className="   pb-4 md:px-12 px-6">
        <ul className=" flex gap-8 justify-center items-center">
          <li className=" flex items-center gap-2">
            <div className=" w-8 h-8 bg-secondary items-center  rounded-full flex justify-center">
              <p className=" text-white">1</p>
            </div>
            <div>
              <span className=" text-secondary font-bold">Garage</span>
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
              <span className=" text-primary font-bold">Confirmation</span>
            </div>
          </li>
        </ul>
      </div>
      <form
        onSubmit={handlerSubmit}
        className=" shadow-md rounded-xl mt-8 py-5 md:px-12 px-6 mx-auto  md:w-[80%] w-[90%]"
      >
        <div className="">
          <h2 className=" h4  text-center">Garage Details</h2>
        </div>

        <div className=" flex flex-col gap-6">
         


          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
            Type of Listing
            </label>
            <select
              onChange={handleInputs}
              value={state.typeofListing}
              name={"typeofListing"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Type
              </option>

              <option value={"features"}>Features</option>
            
              
            </select>
          </div>

          <div>
            <Input
              type="text"
              onChange={handleInputs}
              value={state.garageName}
              name={"garageName"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Garage Name"}
              label={"Garage Name "}
              required="required"
            />
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Address
            </label>
            <select
              onChange={handleInputs}
              value={state.address}
              name={"address"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select type
              </option>

              <option>hello</option>
            </select>
          </div>
          {/* <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Make
            </label>
            <select
              onChange={handleInputs}
              value={state.make}
              name={"make"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
            >
              <option value={""} selected>
                Select Make
              </option>
              {allData?.fieldArrays?.make?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div> */}
          {/* <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Model
            </label>
            <select
              onChange={handleInputs}
              value={state.model}
              name={"model"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
            >
              <option value={""} selected>
                Select Model
              </option>

              {allData?.fieldArrays?.model?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div> */}
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Working Days
            </label>
            <select
              onChange={handleInputs}
              value={state.workingDays}
              name={"workingDays"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select working Days
              </option>

              <option value={"Monday"}>Monday</option>
              <option value={"Tuesday"}>Tuesday</option>
              <option value={"Wednesday"}>Wednesday</option>
              <option value={"Thursday"}>Thursday</option>
              <option value={"Friday"}>Friday</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Working Hours
            </label>
            <select
              onChange={handleInputs}
              value={state.workingHours}
              name={"workingHours"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required
            >
              <option value={""} selected>
                Select Working Hours
              </option>

              <option>9:00 AM - 5:00 PM</option>
              <option>9:00 AM - 5:00 PM</option>
            </select>
          </div>
          <div>
            <Input
              type="text"
              onChange={handleInputs}
              value={state.mobileGarage}
              name={"mobileGarage"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Mobile Garage"}
              label={"Mobile garage "}
              required="required"
            />
          </div>
          <div>
            <label className="block text-sm text-left  font-medium  text-textColor">
              Pickup & Deliver Service
            </label>
            <select
              onChange={handleInputs}
              value={state.pickupDelivery}
              name={"pickupDelivery"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required="required"
            >
              <option>Select Wheel Drive</option>

              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <Input
              type={"date"}
              onChange={handleInputs}
              value={state.availableDays}
              name={"availableDays"}
              className={"  border w-full  p-2 bg-[#FEFBFB]"}
              placeholder={"Select Available Dates"}
              label={"Available Days  Calendar"}
              // Icon={<FaCalendarAlt className=" text-textColor" size={20} />}
              required="required"
            />
          </div>

          <div>
            <Input
              type={"date"}
              onChange={handleInputs}
              value={state.availableDatesFrom}
              name={"availableDatesFrom"}
              className={"  border w-full  p-2 bg-[#FEFBFB]"}
              placeholder={"Select Available Dates"}
              label={"Available Dates from"}
              required="required"
              // Icon={<FaCalendarAlt className=" text-textColor" size={20} />}
            />
          </div>

          <div>
            <p className=" text-textColor font-semibold">Garage Logo</p>
            {selectedImage ? (
              <label
                htmlFor="fileInput"
                className=" rounded-md  border overflow-hidden flex w-40  h-40 "
              >
                <img
                  src={selectedImage}
                  className="  object-cover w-full h-full"
                  alt=""
                />
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
                    src={require("../../../../assets/images/upload.png")}
                    className=" mx-auto w-20"
                    alt=""
                  />
                  <input
                    accept="image/*"
                    onChange={handleFileChange}
                    name="images"
                    type="file"
                    id="fileInput"
                    className="hidden"
                  />
                  <span className=" text-secondary font-semibold ">
                    Garage Logo
                  </span>
                </div>
              </label>
            )}

            <p className=" pt-4 text-textColor text-sm">
              Maximum File Size 1Mb
            </p>
          </div>

          <div>
            <Input
              type={"text"}
              onChange={handleInputs}
              value={state.about}
              name={"about"}
              className={"  border w-full h-24   p-2 bg-[#FEFBFB]"}
              placeholder={"Enter About"}
              label={"About"}
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
                        "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                      }
                    />
                    <div className="search-location-input   bg-white   absolute top-0  w-full">
                      <label className="block text-sm font-medium text-textColor">
                        Garage Location
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
                          placeholder="enter Loaction"
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

        <h2 className=" h4  text-center mt-10 pb-7"> Services & Prices</h2>
        <div className=" flex flex-wrap gap-6">
          <div className=" w-full">
            <label className="block text-sm text-left  font-medium  text-textColor">
              Categories
            </label>
            <select
              onChange={handleInputs}
              value={state.category}
              name={"category"}
              className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
              required="required"
            >
              <option>Select Categories</option>

              <option>Category 1</option>
            </select>
          </div>

          {services.map((service, index) => (
            <div key={index} className=" flex w-full gap-8">
              <div className="md:w-[48%] w-[100%]">
                <Input
                  type="text"
                  onChange={(e) => handleInputChange(index, e)}
                  value={service.name}
                  name="name"
                  className="border w-full p-2 bg-[#FEFBFB]"
                  placeholder="Enter service name"
                  label="Service Name"
                  required="required"
                />
              </div>
              <div className="md:w-[48%] w-[100%]">
                <Input
                  type="text"
                  onChange={(e) => handleInputChange(index, e)}
                  value={service.price}
                  name="price"
                  className="border w-full p-2 bg-[#FEFBFB]"
                  placeholder="Enter price"
                  label="Price"
                  required="required"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="      pt-6">
          <div className=" ">
            <button
              onClick={addService}
              type="button"
              class=" font-bold w-44 uppercase text-[#0C53AB]  border-primary border-2 rounded-full py-2 flex  justify-center gap-2 items-center"
            >
              <MdAddCircleOutline color="#0C53AB" size={25} />
              <span>Add Service</span>
            </button>
          </div>

          <span className=" text-secondary text-sm text-center pt-4 pl-8">
            Clear search
          </span>
        </div>

        <h2 className=" h4  text-center mt-10 pb-7"> Contact Details</h2>
        <div className=" flex flex-wrap gap-6">
          <div className=" w-[100%]">
            <Input
              type="text"
              onChange={handleInputs}
              value={state.name}
              name={"name"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Enter Your Name"}
              label={"Name"}
              required={"required"}
            />
          </div>
          <div className="  w-[100%]">
            <Input
              type="number"
              onChange={handleInputs}
              value={state.number}
              name={"number"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Mobile No."}
              label={"Enter Mobile No"}
              required={"required"}
            />
          </div>
          <div className="  w-[100%]">
            <Input
              type="number"
              onChange={handleInputs}
              value={state.whatsapp}
              name={"whatsapp"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Whatsapp No."}
              label={"Enter Whatsapp No"}
              required={"required"}
            />
          </div>
          <div className="   w-[100%]">
            <Input
              type="email"
              onChange={handleInputs}
              value={state.email}
              name={"email"}
              className={"  border w-full p-2  bg-[#FEFBFB]"}
              placeholder={"Email Address"}
              label={"Enter Email Address"}
              required={"required"}
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
              label={"Create"}
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

export default GarageDetailsUpload;
