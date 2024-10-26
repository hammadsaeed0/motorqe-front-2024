import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiSortAsc } from "react-icons/ri";
import list from "../../../../assets/images/list.png";
import vector from "../../../../assets/images/Vector.png";
import announcement from "../../../../assets/images/announcement.png";
import group from "../../../../assets/images/group.png";
import Pagination from "../../../../components/Pagination/pagination";
import {
  cardcar,
  uparrow,
  stats,
  refresh,
  edit,
  remove,
  feature,
  sold,
} from "../.././../../assets/images/images";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import { Base_url } from "../../../../utils/Base_url";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ViewStats from "../Stats";
import DashboardNavbar from "../../NavBAr/DashboardNavbar";
import { toast } from "react-toastify";
import Button from "../../../../components/Button";
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

const MyGarage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoader] = useState(null);
  const userId = JSON.parse(localStorage.getItem("userToken"));
  const user = useSelector((state) => state.authReducer);
  const [garage, setGrage] = useState([]);
  const [carsPending, setPending] = useState([]);
  const [carsActive, setActive] = useState([]);
  const [carsFeatures, setFeatures] = useState([]);
  console.log(carsFeatures);
  
  console.log(user?.userToken, "");
  const [analytics, setAnalytics] = useState([]);
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
          (car) => car.status === "active" || car.status === "sold"
        );
        const FeaturedCars = res.data.listings.filter((car) => car?.featuredAt != null);

        setGrage(res.data.listings);
        setPending(pendingCars);
        setActive(activeCars);
        setFeatures(FeaturedCars);
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

  const UpdateStatus = (id, newStatus) => {
    console.log(id, newStatus);

    setLoader(id);
    const params = {
      status: newStatus,
    };
    axios
      .patch(`${Base_url}/admin/update-car-status/${id}`, params)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          setLoader(null);

          const params = {
            user: user?.userToken,
          };

          axios
            .post(`${Base_url}/user/all-my-car`, params)
            .then((res) => {
              console.log(res);

              // const pendingCars = res.data.listings.filter(
              //   (car) => car.status === "pending"
              // );
              const activeCars = res.data.listings.filter(
                (car) => car.status === "active" || car.status === "sold"
              );
              // const FeaturedCars = res.data.listings.filter(
              //   (car) => car.type_of_ad === "Featured"
              // );

              // setGrage(res.data.listings);
              // setPending(pendingCars);
              setActive(activeCars);
              // setFeatures(FeaturedCars);
            })
            .catch((error) => {});
        }
      })
      .catch((error) => {
        setLoader(null);
        console.log(error);
      });
  };

  const removeFunction = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FB5722",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${Base_url}/admin/delete-car/${id}`)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");

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
                  setPending(pendingCars);
                  setActive(activeCars);
                  setFeatures(FeaturedCars);
                })
                .catch((error) => {});
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const [carsStatusListing, setCarsStatusListing] = useState("active");
  console.log(carsStatusListing);
  
  const [singleData, setSingleData] = useState(null);

  const RefreshFun = (id) => {
    console.log(id);

    axios
      .post(`${Base_url}/user/refresh-car/${id}`)
      .then((res) => {
        console.log(res);

        if (res.data.success === true) {
          toast.success(res.data.message);
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
              setPending(pendingCars);
              setActive(activeCars);
              setFeatures(FeaturedCars);
            })
            .catch((error) => {});
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);

        if (error?.response?.data?.success === false) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error(error?.response?.data?.message);
        }
      });
  };

  return (
    <>
      <ViewStats
        getData={singleData}
        isModalOpen={openModal}
        setIsModalOpen={setOpenModal}
      />
      <Header />
      <DashboardNavbar />
      <div className="flex flex-col items-center  mb-4">
        <div className="mt-16 flex items-center justify-between w-[90%]">
          <h1 className="font-inter text-3xl font-semibold leading-10 tracking-normal text-left">
            My Garage
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
            onClick={() => setCarsStatusListing("active")}
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

          <div
            onClick={() => setCarsStatusListing("pending")}
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
          </div>

          <div
            onClick={() => setCarsStatusListing("features")}
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
              <h1 className="font-inter font-bold text-5xl ">
                {analytics?.totalClicks ? analytics?.totalClicks : 0}
              </h1>
              <p className="text-18 pt-5">Total Visits</p>
            </div>
            <img
              src={group}
              className="w-[72px] h-[72px] top-5 mt-[54px] mr-2"
            ></img>
          </div>
        </div>
        {/* --------------------------------------------------------------------------- */}

        <div className="mt-16 flex items-center justify-between w-[90%]">
          <div className="relative flex gap-4 ml-3 mb-3">
            {/* Search Bar */}
            <Input
              Icon={<RiArrowDropDownLine className="size-7" />}
              placeholder="Filter by listing..."
              className="border-[#D2D2D2] border-2  rounded-[5px]"
            />
            <Input
              Icon={<RiArrowDropDownLine className="size-7" />}
              placeholder="Filter by listing..."
              className="border-[#D2D2D2] border-2 rounded-[5px]"
            />
          </div>

          <div className="relative flex gap-4 ml-3 mb-3">
            {/* Search Bar */}
            <Input
              Icon={<RiSortAsc className="size-3" />}
              placeholder="Sort By:Newly Added"
              // style={{ fontSize: '10px' }}
              className="border-[#D2D2D2] border-2 color=[#8B8989]"
            />
          </div>
        </div>

        {/* ------------------------------------- main product card -------------------------------------- */}
        <div className="w-[90%]">
          <div className=" ml-4 mb-2">
            <Pagination
              currentPage={1}
              itemsPerPage={3}
              totalItems={garage?.length}
            />
          </div>
          <div className="flex justify-center items-center  gap-8 flex-wrap">
            {/* Use map to create cards */}
            {carsStatusListing === "active" && (
              <>
              
                {
                  carsActive?(
                    carsActive?.map((product, index) => (
                      <div
                        key={index}
                        className={`p-4 bg-[#F3F3F5]   h-[460px] w-[350px] rounded-[20px] mt-2 ${
                          product?.featuredAt
                          
                            ? "  border-primary  border-2"
                            : "border-blue-500"
                        }`}
                      >
                        {/* Display card content */}
                        <div className="flex-col relative w-[350px]">
                          <img
                            src={product.car_images[0]}
                            className="h-[160px] rounded-xl w-[320px]"
                          />
                          <h2 className="text-xl font-bold p-2 text-center">
                            {product?.title}
                          </h2>
                          <p className="text-center">
                            {product?.planId?.name} Plan
                          </p>




                          {product?.featuredAt?
                          
                          <div className=" absolute top-3 right-10">
                          <Button
                            label={"featured"}
                            className={
                              " uppercase py-1 bg-lightBlue  text-xs  text-white font-semibold rounded-3xl"
                            }
                          />
                        </div>:null}
                        </div>
    
                        {/* Display actions - Row 1 */}
                        <div className="flex justify-center gap-3 mt-1 w-[320px]">
                          <Link
                            to={`/dashboard/upgrade-plan/${product?._id}`}
                            className="w-[100px] h-[50px] bg-[#0C53AB] hover:bg-primary cursor-pointer rounded-[5px] text-white text-center"
                          >
                            <div className="w-full text-center mt-2">
                              <img
                                src={uparrow}
                                className="mx-auto h-5"
                                alt="Icon"
                              />
                              <p className="ml-2 text-sm">Upgrade Plan</p>
                            </div>
                          </Link>
                          <div
                            onClick={() => {
                              setOpenModal(true);
                              setSingleData(product);
                            }}
                            className="w-[100px] h-[50px] cursor-pointer bg-[#0C53AB] hover:bg-primary rounded-[5px] text-white text-center"
                          >
                            <div className="w-full text-center mt-2 cursor-pointer">
                              <img src={stats} className="mx-auto h-5" alt="Icon" />
                              <p className="ml-2 text-sm">Stats</p>
                            </div>
                          </div>
                          <div
                            onClick={() => RefreshFun(product?._id)}
                            className={`w-[100px] h-[50px]   hover:bg-primary cursor-pointer  ${
                              product?.hasRefreshed === true
                                ? "bg-[#0BA645]"
                                : "  bg-[rgb(12,83,171)]"
                            } rounded-[5px] text-white text-center`}
                          >
                            <div className="w-full text-center mt-2">
                              <img
                                src={refresh}
                                className="mx-auto h-5"
                                alt="Icon"
                              />
                              <p className="ml-2 text-sm">Refresh</p>
                            </div>
                          </div>
                        </div>
    
                        {/* Display actions - Row 2 */}
                        <div className="flex gap-3 mt-4 justify-center w-[320px]">
                          <Link
                            to={`/update_car_detail/${product?._id}`}
                            className="w-[100px] h-[50px] bg-[#0C53AB] hover:bg-primary rounded-[5px] text-white text-center"
                          >
                            <div className="w-full text-center mt-2">
                              <img
                                src={require("../../../../assets/images/edit.png")}
                                className="mx-auto h-5"
                                alt="Icon"
                              />
                              <p className=" text-sm">Edit</p>
                            </div>
                          </Link>
                          <div className="w-[100px] h-[50px] bg-[#0C53AB] hover:bg-primary rounded-[5px] text-white text-center">
                            <div
                              onClick={() => removeFunction(product?._id)}
                              className="w-full text-center mt-2"
                            >
                              <img
                                src={require("../../../../assets/images/remove.png")}
                                className="mx-auto h-5"
                                alt="Icon"
                              />
                              <p className=" text-sm">Remove</p>
                            </div>
                          </div>
                          {product?.featuredAt? (
                            <div
                              className={`w-[100px] h-[50px] bg-[#0BA645]  rounded-[5px] text-white text-center`}
                            >
                              <div className="w-full text-center mt-2">
                                <img
                                  src={feature}
                                  className="mx-auto h-5"
                                  alt="Icon"
                                />
                                <p className="text-sm">Feature Ad</p>
                              </div>
                            </div>
                          ) : (
                            <Link
                              to={`/featured-plan/${product?._id}`}
                              className={`w-[100px] h-[50px] bg-[#0C53AB] hover:bg-primary rounded-[5px] text-white text-center`}
                            >
                              <div className="w-full text-center mt-2">
                                <img
                                  src={feature}
                                  className="mx-auto h-5"
                                  alt="Icon"
                                />
                                <p className="text-sm">Feature</p>
                              </div>
                            </Link>
                          )}
                        </div>
    
                        {/* Sold indicator */}
    
                        {loading === product._id ? (
                          <button
                            disabled
                            type="button"
                            class="w-[320px] h-[38px] bg-[#FB5722] rounded  gap-2 items-center mt-2 text-bold justify-center text-white font-bold flex align-center"
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
                          <>
                            {product?.status === "sold" ? (
                              <div className="w-[320px] h-[38px]  bg-[#0C53AB] rounded  gap-2 items-center mt-2 text-bold justify-center text-white font-bold flex align-center">
                                {/* <img src={sold} className="h-[25px]" alt="Sold" /> */}
                                <p className=" m-0">Sold</p>
                              </div>
                            ) : (
                              <div
                                onClick={() => UpdateStatus(product?._id, "sold")}
                                className="w-[320px] h-[38px] bg-[#FB5722] rounded  gap-2 items-center mt-2 text-bold justify-center text-white font-bold flex align-center"
                              >
                                <img src={sold} className="h-[25px]" alt="Sold" />
                                <p className=" m-0"> Car Sold</p>
                              </div>
                            )}
                          </>
                        )}
    
                        {/* Featured Ad information */}
                        {/* <div className='flex gap-x-3 flex-wrap font-bold text-[#666564] text-center'> */}
                        {/* {product?.featured && ( */}
                        <div>
                          <div className="flex gap-3  pt-2">
                            <p className=" text-sm font-semibold">
                              Created: {moment().format("MMM Do YY")}
                            </p>
                            <p className=" text-sm font-semibold">
                              Expires: {moment().format("MMM Do YY")}
                            </p>
                          </div>
                          {/* <div> Featured Ad Days Remaining: {product?.remainingdays}</div> */}
                        </div>
                        {/* )}{console.log(product?.featured)} */}
                        {/* </div> */}
                      </div>
                    ))
                  ):(
                    <div className=" h-36 flex justify-center items-center">
                  <p className=" text-black font-bold">
                    No  Car Found
                  </p>
                </div>
                  )
                }
              </>
            ) }


              
            {carsStatusListing==='pending' && (
              <>
              {carsPending? (
                carsPending?.map((product, index) => (
                  <div
                    key={index}
                    className={`p-4 bg-[#F3F3F5]  h-[460px] w-[350px] rounded-[20px] mt-2 ${
                      product.featured === "Yes"
                        ? " border-sky-800"
                        : "border-blue-500"
                    }`}
                  >
                    {/* Display card content */}
                    <div className="flex-col  w-[350px]">
                      <img
                        src={product.car_images[0]}
                        className="h-[160px] rounded-xl w-[320px]"
                      />
                      <h2 className="text-xl font-bold p-2 text-center">
                        {product?.title}
                      </h2>
                      <p className="text-center">
                        {product?.planId?.name} Plan
                      </p>
                    </div>

                    {/* Display actions - Row 1 */}
                    <div className="flex justify-center gap-3 mt-1 w-[320px]">
                      <Link
                        to={`/dashboard/upgrade-plan/${product?._id}`}
                        className="w-[100px] h-[50px] bg-[#0C53AB] hover:bg-primary cursor-pointer rounded-[5px] text-white text-center"
                      >
                        <div className="w-full text-center mt-2">
                          <img
                            src={uparrow}
                            className="mx-auto h-5"
                            alt="Icon"
                          />
                          <p className="ml-2 text-sm">Upgrade Plan</p>
                        </div>
                      </Link>
                      <div
                        onClick={() => {
                          setOpenModal(true);
                          setSingleData(product);
                        }}
                        className="w-[100px] h-[50px] cursor-pointer hover:bg-primary bg-[#0C53AB] rounded-[5px] text-white text-center"
                      >
                        <div className="w-full text-center mt-2 cursor-pointer">
                          <img
                            src={stats}
                            className="mx-auto h-5"
                            alt="Icon"
                          />
                          <p className="ml-2 text-sm">Stats</p>
                        </div>
                      </div>
                      <div
                        onClick={() => RefreshFun(product?._id)}
                        className={`w-[100px] h-[50px] cursor-pointer  hover:bg-primary ${
                          product?.hasRefreshed === true
                            ? "bg-[#0BA645]"
                            : "  bg-[rgb(12,83,171)]"
                        } rounded-[5px] text-white text-center`}
                      >
                        <div className="w-full text-center mt-2">
                          <img
                            src={refresh}
                            className="mx-auto h-5"
                            alt="Icon"
                          />
                          <p className="ml-2 text-sm">Refresh</p>
                        </div>
                      </div>
                    </div>

                    {/* Display actions - Row 2 */}
                    <div className="flex gap-3 mt-4 justify-center w-[320px]">
                    <Link
                      to={`/update_car_detail/${product?._id}`}
                      className="w-[100px] h-[50px] bg-[#0C53AB]  hover:bg-primary rounded-[5px] text-white text-center"
                    >
                      <div className="w-full text-center mt-2">
                        <img
                          src={require("../../../../assets/images/edit.png")}
                          className="mx-auto h-5"
                          alt="Icon"
                        />
                        <p className=" text-sm">Edit</p>
                      </div>
                    </Link>
                      <div className="w-[100px] h-[50px] bg-[#0C53AB] hover:bg-primary rounded-[5px] text-white text-center">
                        <div
                          onClick={() => removeFunction(product?._id)}
                          className="w-full text-center cursor-pointer mt-2"
                        >
                          <img
                            src={require("../../../../assets/images/remove.png")}
                            className="mx-auto h-5"
                            alt="Icon"
                          />
                          <p className=" text-sm">Remove</p>
                        </div>
                      </div>
                      <div className="w-[100px] h-[50px] bg-[#0C53AB] hover:bg-primary rounded-[5px] text-white text-center">
                        <div className="w-full text-center mt-2">
                          <img
                            src={feature}
                            className="mx-auto h-5"
                            alt="Icon"
                          />
                          <p className=" text-sm">Feature</p>
                        </div>
                      </div>
                    </div>

                    {/* Sold indicator */}

                    <div className="w-[320px] h-[38px] bg-[#FB5722] rounded  gap-2 items-center mt-2 text-bold justify-center text-white font-bold flex align-center">
                      {/* <img src={sold} className="h-[25px]" alt="Sold" /> */}
                      <p className=" m-0">Pending</p>
                    </div>

                    {/* Featured Ad information */}
                    {/* <div className='flex gap-x-3 flex-wrap font-bold text-[#666564] text-center'> */}
                    {/* {product?.featured && ( */}
                    <div>
                      <div className="flex gap-3  pt-2">
                        <p className=" text-sm font-semibold">
                          Created: {moment().format("MMM Do YY")}
                        </p>
                        <p className=" text-sm font-semibold">
                          Expires: {moment().format("MMM Do YY")}
                        </p>
                      </div>
                      {/* <div> Featured Ad Days Remaining: {product?.remainingdays}</div> */}
                    </div>
                    {/* )}{console.log(product?.featured)} */}
                    {/* </div> */}
                  </div>
                ))
              ) : (
                <div className=" h-36 flex justify-center items-center">
                  <p className=" text-black font-bold">
                    No Pending Car Found
                  </p>
                </div>
              )}
            </>
            )}

            {carsStatusListing ==='features' && (
              <>
              {carsFeatures ? (
                carsFeatures?.map((product, index) => (
                  <div
                    key={index}
                    className={`p-4 bg-[#F3F3F5] border-2 border-primary   h-[460px] w-[350px] rounded-[20px] mt-2 ${
                      product.featured === "Yes"
                        ? " border-sky-800"
                        : "border-blue-500"
                    }`}
                  >
                    {/* Display card content */}
                    <div className="flex-col relative w-[350px]">
                      <img
                        src={product.car_images[0]}
                        className="h-[160px] rounded-xl w-[320px]"
                      />
                    
                        <div className=" absolute top-3 right-10">
                        <Button
                          label={"featured"}
                          className={
                            " uppercase py-1 bg-lightBlue  text-xs  text-white font-semibold rounded-3xl"
                          }
                        />
                      </div>
                      <h2 className="text-xl font-bold p-2 text-center">
                        {product?.title}
                      </h2>
                      <p className="text-center">
                        {product?.planId?.name} Plan
                      </p>
                    </div>

                    {/* Display actions - Row 1 */}
                    <div className="flex justify-center gap-3 mt-1 w-[320px]">
                      <Link
                        to={`/dashboard/upgrade-plan/${product?._id}`}
                        className="w-[100px] h-[50px] bg-[#0C53AB] hover:bg-primary cursor-pointer rounded-[5px] text-white text-center"
                      >
                        <div className="w-full text-center mt-2">
                          <img
                            src={uparrow}
                            className="mx-auto h-5"
                            alt="Icon"
                          />
                          <p className="ml-2 text-sm">Upgrade Plan</p>
                        </div>
                      </Link>
                      <div
                        onClick={() => {
                          setOpenModal(true);
                          setSingleData(product);
                        }}
                        className="w-[100px] h-[50px] cursor-pointer bg-[#0C53AB] hover:bg-primary rounded-[5px] text-white text-center"
                      >
                        <div className="w-full text-center mt-2 cursor-pointer">
                          <img src={stats} className="mx-auto h-5" alt="Icon" />
                          <p className="ml-2 text-sm">Stats</p>
                        </div>
                      </div>
                      <div
                        onClick={() => RefreshFun(product?._id)}
                        className={`w-[100px] h-[50px] cursor-pointer  hover:bg-primary ${
                          product?.hasRefreshed === true
                            ? "bg-[#0BA645]"
                            : "  bg-[rgb(12,83,171)]"
                        } rounded-[5px] text-white text-center`}
                      >
                        <div className="w-full text-center mt-2">
                          <img
                            src={refresh}
                            className="mx-auto h-5"
                            alt="Icon"
                          />
                          <p className="ml-2 text-sm">Refresh</p>
                        </div>
                      </div>
                    </div>

                    {/* Display actions - Row 2 */}
                    <div className="flex gap-3 mt-4 justify-center w-[320px]">
                      <Link
                        to={`/update_car_detail/${product?._id}`}
                        className="w-[100px] h-[50px] bg-[#0C53AB] hover:bg-primary rounded-[5px] text-white text-center"
                      >
                        <div className="w-full text-center mt-2">
                          <img
                            src={require("../../../../assets/images/edit.png")}
                            className="mx-auto h-5"
                            alt="Icon"
                          />
                          <p className=" text-sm">Edit</p>
                        </div>
                      </Link>
                      <div className="w-[100px] h-[50px] bg-[#0C53AB]  hover:bg-primary rounded-[5px] text-white text-center">
                        <div
                          onClick={() => removeFunction(product?._id)}
                          className="w-full text-center mt-2"
                        >
                          <img
                            src={require("../../../../assets/images/remove.png")}
                            className="mx-auto h-5"
                            alt="Icon"
                          />
                          <p className=" text-sm">Remove</p>
                        </div>
                      </div>
                      {product?.featuredAt? (
                        <div
                          className={`w-[100px] h-[50px] bg-[#0C53AB]  hover:bg-primary  rounded-[5px] text-white text-center`}
                        >
                          <div className="w-full text-center mt-2">
                            <img
                              src={feature}
                              className="mx-auto h-5"
                              alt="Icon"
                            />
                            <p className="text-sm">Feature Ad</p>
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={`/featured-plan/${product?._id}`}
                          className={`w-[100px] h-[50px] bg-[#0C53AB] hover:bg-primary rounded-[5px] text-white text-center`}
                        >
                          <div className="w-full text-center mt-2">
                            <img
                              src={feature}
                              className="mx-auto h-5"
                              alt="Icon"
                            />
                            <p className="text-sm">Feature</p>
                          </div>
                        </Link>
                      )}
                    </div>

                    {/* Sold indicator */}

                    {loading === product._id ? (
                      <button
                        disabled
                        type="button"
                        class="w-[320px] h-[38px] bg-[#FB5722] rounded  gap-2 items-center mt-2 text-bold justify-center text-white font-bold flex align-center"
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
                      <>
                        <div className="w-[320px] h-[38px] bg-[#FB5722] rounded  gap-2 items-center mt-2 text-bold justify-center text-white font-bold flex align-center">
                      {/* <img src={sold} className="h-[25px]" alt="Sold" /> */}
                      <p className=" m-0">Feature Ad</p>
                    </div>
                      </>
                    )}

                    {/* Featured Ad information */}
                    {/* <div className='flex gap-x-3 flex-wrap font-bold text-[#666564] text-center'> */}
                    {/* {product?.featured && ( */}
                    <div>
                      <div className="flex gap-3  pt-2">
                        <p className=" text-sm font-semibold">
                          Created: {moment().format("MMM Do YY")}
                        </p>
                        <p className=" text-sm font-semibold">
                          Expires: {moment().format("MMM Do YY")}
                        </p>
                      </div>
                      {/* <div> Featured Ad Days Remaining: {product?.remainingdays}</div> */}
                    </div>

                    
                    {/* )}{console.log(product?.featured)} */}
                    {/* </div> */}
                  </div>
                ))
              ) : (
                <div className=" h-36 flex justify-center items-center">
                  <p className=" text-black font-bold">
                    No Pending Car Found
                  </p>
                </div>
              )}
            </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyGarage;
