import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import Input from "../../components/Input";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import Button from "../../components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useSelector } from "react-redux";
const ContactDetails = () => {
  const location = useLocation();
  const { receivedData, upload } = location.state || {};

  console.log(receivedData);
  console.log(upload);

  const [loading, setLoader] = useState(false);
  const userData = JSON.parse(localStorage.getItem("planData"));

  console.log("Parsed planData from localStorage:", userData?.featureAdsDays);
  const featureAdsDays = Number(userData?.featureAdsDays);
  console.log("Feature Ads Days:", featureAdsDays);
  const featureTimePeriod =
    receivedData?.type_of_ad === "Standard"
      ? 1
      : featureAdsDays > 0
      ? featureAdsDays * 24 * 60
      : 1;
  console.log(`Feature Time Period: ${featureTimePeriod}`);

  console.log(featureTimePeriod);

  const [state, setState] = useState({
    name: "",
    // contact_details: "",
    mobile_no: "",
    whatsapp_no: "",
    email_address: "",
  });

  console.log(state);

  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const report = localStorage.getItem("reacts");

  const navigate = useNavigate();
  const user = useSelector((state) => state.authReducer);
  const plan = useSelector((state) => state.planReducer);

  console.log(user);
  console.log(plan);

  const userToken = JSON.parse(localStorage.getItem("Dealar"));
  console.log(userToken?.profileStatus, "userToken");

  const handlerSubmit = (e) => {
    setLoader(true);
    e.preventDefault();

    console.log(`Feature Days in Minutes: ${featureTimePeriod}`);

    const params = {
      userId: user?.userToken,
      enrollmentId: plan?.userPlan?.data?._id,
      featureTimePeriod:
        userToken?.profileStatus === "dealer" ? 1 : featureTimePeriod,
      title: receivedData.title,
      type_of_ad: receivedData.type_of_ad,
      imported: receivedData.imported,
      type_of_ad_show: receivedData.type_of_ad_show,
      body_type: receivedData.body_type,
      make: receivedData.make,
      model: receivedData.model,
      contact_name: "hammad",
      year: 2024,
      vehicle_condition: receivedData.vehicle_condition,
      mileage: Number(receivedData.mileage),
      // vehicle_category: receivedData.vehicle_category,
      specifications: receivedData.specifications,
      cylinder: Number(receivedData.cylinder),
      engine_size: receivedData.engine_size,
      wheel_drive: receivedData.wheel_drive,
      gear_box: receivedData.gear_box,
      exterior_colour: receivedData.exterior_colour,
      interior_colour: receivedData.interior_colour,
      fuel_type: receivedData.fuel_type,
      registration_date: receivedData.registration_date,
      warranty: receivedData.warranty,
      warranty_date: receivedData.warranty_date,
      inspected: receivedData.inspected,
      inspection_report: report,
      price_QR: Number(receivedData.price_QR),
      price_range: receivedData.price_range,
      negotiable: receivedData.negotiable,
      description: receivedData.description,
      vehicle_location: "Car Location",
      longitude: receivedData.longitude,
      latitude: receivedData.latitude,
      engine_oil: receivedData.engine_oil,
      engine_oil_filter: receivedData.engine_oil_filter,
      gearbox_oil: receivedData.gearbox_oil,
      ac_filter: receivedData.ac_filter,
      air_filter: receivedData.air_filter,
      fuel_filter: receivedData.fuel_filter,
      spark_plugs: receivedData.spark_plugs,
      front_brake_pads: receivedData.front_brake_pads,
      rear_brake_pads: receivedData.rear_brake_pads,
      front_brake_discs: receivedData.front_brake_discs,
      rear_brake_discs: receivedData.rear_brake_discs,
      battery: receivedData.battery,
      front_tire_size: receivedData.front_tire_size,
      front_tire_price: Number(receivedData.front_tire_price),
      rear_tire_size: receivedData.rear_tire_size,
      rear_tire_price: Number(receivedData.rear_tire_price),
      name: state.name,
      contact_details: "email234@gmail.com",
      mobile_no: state.mobile_no,
      whatsapp_no: state.whatsapp_no,
      email_address: state.email_address,
      car_images: upload?.map((item) => item),
    };

    axios
      .post(`${Base_url}/user/create-car`, params)
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          navigate("/ListingBookingConfirmation", { state: { data: res.data.data } });
          setLoader(false);

          toast.success("User car listing add successfully!");

          const params = {
            message: `${state.name}, your new car has been created successfully!`,
          };
          axios
            .post(`${Base_url}/user/create-notification`, params)
            .then((res) => {})
            .catch((error) => {});
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
        setLoader(false);
      });
  };

  return (
    <>
      <Header />
      <form onSubmit={handlerSubmit}>
        <div className=" py-8 text-center">
          <h2 className=" h2  text-center">Sell Your Car</h2>
          <p className=" pt-2 text-gray-400">
            Sell your car in seconds with just a few clicks
          </p>
        </div>
        <div className=" py-8">
          <ul className=" flex flex-wrap gap-8 justify-center items-center">
            <li className=" flex items-center gap-2">
              <div className=" w-8 h-8 bg-secondary items-center  rounded-full flex justify-center">
                <p className=" text-white">1</p>
              </div>
              <div>
                <span className=" text-secondary font-bold">
                  Type Of Package
                </span>
              </div>
            </li>
            <li>
              <FaAngleRight className="  text-secondary" />
            </li>
            <li className=" flex items-center gap-2">
              <div className=" w-8 h-8  bg-secondary border-secondary border items-center  rounded-full flex justify-center">
                <p className="  text-white">2</p>
              </div>
              <Link>
                <span className="  text-secondary font-semibold ">
                  Car Details
                </span>
              </Link>
            </li>
            <li>
              <FaAngleRight className="  text-secondary" />
            </li>
            <li className=" flex items-center gap-2">
              <div className=" w-8 h-8 bg-secondary border-secondary border items-center  rounded-full flex justify-center">
                <p className=" text-white">3</p>
              </div>
              <Link to={"/car_photos"}>
                <span className=" text-secondary font-semibold">Photo</span>
              </Link>
            </li>
            <li>
              <FaAngleRight className=" text-secondary" />
            </li>
            <li className=" flex items-center gap-2">
              <div className="w-8 h-8 bg-primary items-center  rounded-full flex justify-center">
                <p className=" text-white">4</p>
              </div>
              <Link>
                <span className=" text-primary font-bold">Contact Details</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className=" pb-12 shadow-md rounded-xl mt-8 py-5 sm:px-12 px-6 mx-auto  w-[80%]">
          <div className="">
            <h2 className=" h3  text-center">Contact Details</h2>
          </div>

          <div className=" flex flex-col gap-6">
            <div>
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
            <div>
              <Input
                type="number"
                onChange={handleInputs}
                value={state.mobile_no}
                name={"mobile_no"}
                className={"  border w-full p-2  bg-[#FEFBFB]"}
                placeholder={"Mobile No."}
                label={"Enter Mobile No"}
                required={"required"}
              />
            </div>
            <div>
              <Input
                type="number"
                onChange={handleInputs}
                value={state.whatsapp_no}
                name={"whatsapp_no"}
                className={"  border w-full p-2  bg-[#FEFBFB]"}
                placeholder={"Whatsapp No."}
                label={"Enter Whatsapp No"}
                required={"required"}
              />
            </div>
            <div>
              <Input
                type="email"
                onChange={handleInputs}
                value={state.email_address}
                name={"email_address"}
                className={"  border w-full p-2  bg-[#FEFBFB]"}
                placeholder={"Email Address"}
                label={"Enter Email Address"}
                required={"required"}
              />
            </div>
          </div>
        </div>

        <div className=" container flex justify-between items-center mx-auto mt-10 mb-20  w-[80%]">
          <div className="  flex items-center gap-3">
            <LiaLongArrowAltLeftSolid />
            <span className=" text-textColor font-semibold">Back</span>
          </div>
          <div>
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
                label={"Submit"}
                className={
                  " bg-primary font-bold rounded-3xl text-white w-44 py-1.5"
                }
              />
            )}
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default ContactDetails;
