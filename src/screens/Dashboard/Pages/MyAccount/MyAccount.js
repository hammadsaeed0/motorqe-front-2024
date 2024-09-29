import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import list from "../../../../assets/images/list.png";
import vector from "../../../../assets/images/Vector.png";
import announcement from "../../../../assets/images/announcement.png";
import group from "../../../../assets/images/group.png";
import eyeicon from "../../../../assets/icons/eyeicon.png";
import insight from "../../../../assets/icons/insight.png";
import btnclick from "../../../../assets/icons/btnclicks.png";
import blackeye from "../../../../assets/icons/blackeye.png";
import whatsapp from "../../../../assets/icons/whatsapp.png";
import phone from "../../../../assets/icons/phone.png";
import message from "../../../../assets/icons/message.png";
import share from "../../../../assets/icons/share.png";
import devices from "../../../../assets/icons/devices.png";
import desktop from "../../../../assets/icons/desktop.png";
import mobile from "../../../../assets/icons/mobile.png";
import LineChart from "./graph";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import DashboardNavbar from "../../NavBAr/DashboardNavbar";
import { useSelector } from "react-redux";
import { Base_url } from "../../../../utils/Base_url";
import axios from "axios";
import { Link } from "react-router-dom";
const Input = ({ Icon, ...props }) => {
  return (
    <div className="relative flex items-center">
      <input {...props} />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        {Icon}
      </div>
    </div>
  );
};

const MyAccount = () => {
  const [counter, setCounter] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const user = useSelector((state) => state.authReducer);
  console.log(user);
  const [carsPending, setPending] = useState([]);
  const [carsActive, setActive] = useState([]);
  const [carsFeatures, setFeatures] = useState([]);
  const [garage, setGrage] = useState([]);
  useEffect(() => {
    const params = {
      user: user?.userToken,
    };
    axios
      .post(`${Base_url}/user/all-my-car`, params)
      .then((res) => {
        console.log(res);

        const pendingCars = res.data.listings.filter(
          (car) => car.status === "pending"
        );
        const activeCars = res.data.listings.filter(
          (car) => car.status === "active"
        );
        const FeaturedCars = res.data.listings.filter(
          (car) => car.type_of_ad === "Featured"
        );

        setGrage(res.data.listings);
        setPending(pendingCars)
        setActive(activeCars)
        setFeatures(FeaturedCars)
      })
      .catch((error) => {});

    axios
      .get(`${Base_url}/dashboard/user-all-clicks/${user?.userToken?._id}`)
      .then((res) => {
        console.log(res, "/user-all-clicks");

        setCounter(res.data.totalClicks);
      })
      .catch((error) => {});

    const param = {
      user: user?.userToken,
    };

    axios
      .post(`${Base_url}/user/my-analytic`, param)
      .then((res) => {
        console.log(res, "/user button click");

        setAnalytics(res?.data?.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <Header />
      <DashboardNavbar />
      <div className="flex flex-col items-center  mb-4">
        <div className="mt-16 flex items-center justify-between w-[90%]">
          <h1 className="font-inter text-3xl font-semibold leading-10 tracking-normal text-left">
            Welcome, Elite!
          </h1>
          <div className="relative">
            {/* Search Bar */}
            <Input
              Icon={<RiArrowDropDownLine className="size-7" />}
              placeholder="Filter by listing..."
              className="border-[#D2D2D2] border-2 md:w-50 w-60 pr-10"
            />
          </div>
        </div>
        {/* ----------------- blue cards ----------------- */}
        <div class="w-[90%] h-[215px] top-499px left-112px gap-[35px] flex mb-2 mt-[99px]">
          <div
            class="w-[332px] h-[200px] px-15 py-34 border-20 rounded-xl justify-between flex"
            style={{ backgroundColor: "#0C53AB" }}
          >
            <div className=" text-white mx-[15px] mt-[54px] relative">
              <h1 className="font-inter font-bold text-4xl ">
                {carsActive?.length}
              </h1>
              <p className="text-18 pt-4">
                {" "}
                {analytics?.totalListedCars} Published Listings
              </p>
            </div>
            <img
              src={list}
              className="w-[72px] h-[72px] top-5 mt-[54px] mr-2"
            ></img>
          </div>

          <Link
            to={"/dashboard/my-garage"}
            class="w-[332px] h-[200px] px-15 py-34 border-20 rounded-xl justify-between flex"
            style={{ backgroundColor: "#0C53AB" }}
          >
            <div className=" text-white mx-[15px] mt-[54px] relative">
              <h1 className="font-inter font-bold text-5xl ">
                {carsPending?.length}
              </h1>
              <p className="text-18 pt-4"> Pending Listings</p>
            </div>
            <img
              src={vector}
              className="w-[72px] h-[72px] top-5 mt-[54px] mr-2"
            ></img>
          </Link>

          <div
            class="w-[332px] h-[200px] px-15 py-34 border-20 rounded-xl justify-between flex"
            style={{ backgroundColor: "#0C53AB" }}
          >
            <div className=" text-white mx-[15px] mt-[54px] relative">
              <h1 className="font-inter font-bold text-5xl ">
                {carsFeatures?.length}
              </h1>
              <p className="text-18 pt-4">featured Listings</p>
            </div>
            <img
              src={announcement}
              className="w-[72px] h-[72px] top-5 mt-[54px] mr-2"
            ></img>
          </div>

          <div
            class="w-[332px] h-[200px] px-15 py-34 border-20 rounded-xl justify-between flex"
            style={{ backgroundColor: "#0C53AB" }}
          >
            <div className=" text-white mx-[15px] mt-[54px] relative">
              <h1 className="font-inter font-bold text-5xl ">{analytics?.totalClicks?analytics?.totalClicks:0}</h1>
              <p className="text-18 pt-5">Total Visits</p>
            </div>
            <img
              src={group}
              className="w-[72px] h-[72px] top-5 mt-[54px] mr-2"
            ></img>
          </div>
        </div>
        {/* --------------------------------------------------------------------------- */}

        <div className="md:flex block justify-between w-[90%] mt-24">
          {/* ----------Left box------------ */}

          <div className="flex flex-col gap-3">
            {/* ____Box--1____ */}
            <div class="w-[350px] h-[150px]  border-5 border border-solid border-[#F0E9E9] rounded-20  bg-[#F3F3F5] rounded-[20px]">
              <div className="flex gap-2 items-center mx-[20px] my-[20px]">
                <img src={eyeicon} className="h-[34px] w-[34px]"></img>
                <strong className="text-[#0C0CB8]">Views</strong>
              </div>

              <div className="flex ml-6 justify-between mr-6">
                <div className="text-[#0C0CB8] text-base flex-col gap-7">
                  <img src={insight} alt="" />
                  <strong>{analytics?.last24HoursViews}</strong>
                  <p className=" text-sm">Last 24 hours</p>
                </div>

                <div className="text-[#0C0CB8]  flex-col gap-7">
                  <img src={insight} alt="" />
                  <strong>{analytics?.last7DaysViews}</strong>
                  <p className=" text-sm">Last 7 hours</p>
                </div>

                <div className="text-[#0C0CB8]  flex-col gap-7">
                  <img src={insight} alt="" />
                  <strong>{analytics?.last30DaysViews}</strong>
                  <p className=" text-sm">Last 30 hours</p>
                </div>
              </div>
            </div>
            {/* ____Box--2____ */}
            <div class="w-[350px] h-[210px]  border-5 border border-solid border-[#F0E9E9] rounded-20  bg-[#F3F3F5] rounded-[20px]">
              <div className="flex gap-2 items-center mx-[20px] mt-[10px]">
                <img src={btnclick} className="h-[34px] w-[34px]"></img>
                <strong className="text-[#484848]">Button Clicks</strong>
              </div>
              <span className=" mx-[20px]">Showrooms</span>

              <div className="ml-6 mr-6 justify-between flex-col">
                <div className="text-[#0C0CB8] flex items-center gap-3 mt-1">
                  <img src={blackeye} alt="" />
                  <p className="text-sm">
                    Views ( {analytics?.totalClicks} clicks)
                  </p>
                </div>

                <div className="text-[#0C0CB8] flex items-center gap-3 mt-1">
                  <img src={whatsapp} alt="" />
                  <p className="text-sm">
                    whatsapp ( {analytics?.totalWhatsappClicks} clicks)
                  </p>
                </div>

                <div className="text-[#0C0CB8] flex items-center gap-3 mt-1">
                  <img src={phone} alt="" />
                  <p className="text-sm">
                    Call ({analytics?.totalCallClicks} clicks)
                  </p>
                </div>

                <div className="text-[#0C0CB8] flex items-center gap-3 mt-1">
                  <img src={message} alt="" />
                  <p className="text-sm">
                    Message ({analytics?.totalMessageClicks} clicks)
                  </p>
                </div>

                <div className="text-[#0C0CB8] flex items-center gap-3 mt-3">
                  <img src={share} alt="" />
                  <p className="text-sm">
                    Share ( {analytics?.totalShareClicks} clicks)
                  </p>
                </div>
              </div>
            </div>
            {/* ____Box--3____ */}
            <div class=" mb-2 w-[350px] h-[135px]  border-5 border border-solid border-[#F0E9E9] rounded-20  bg-[#F3F3F5] rounded-[20px]">
              <div className="flex gap-2 items-center mx-[20px] my-[20px]">
                <img src={devices} className="h-[34px] w-[34px]"></img>
                <strong className="text-[#484848]">Button Clicks</strong>
              </div>

              <div className="ml-6 mr-6 justify-between flex-col">
                <div className="text-[#0C0CB8] flex items-center gap-3 mt-3">
                  <img src={desktop} alt="" />
                  <p className="text-sm">
                    Desktop ( {analytics?.totalViews} Views)
                  </p>
                </div>

                <div className="text-[#0C0CB8] flex items-center gap-3 mt-3">
                  <img src={mobile} alt="" />
                  <p className="text-sm">
                    Mobile ( {analytics?.totalViews} Views)
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ----------right box with graph------------ */}
          <div className="">
            <LineChart />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAccount;
