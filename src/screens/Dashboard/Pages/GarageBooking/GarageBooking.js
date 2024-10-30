import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  calender,
  cancel,
  location,
  booking,
  delet,
  cardcar,
  uparrow,
  stats,
  refresh,
  edit,
  remove,
  feature,
  sold,
  inbox,
  call,
  whatsapp,
} from "../.././../../assets/images/images";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import DashboardNavbar from "../../NavBAr/DashboardNavbar";
import axios from "axios";
import { Base_url } from "../../../../utils/Base_url";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Reschedule from "./ReschedueModal";
import moment from "moment";
import EditBooking from "./EditBookingGarage";
// import CarDetails from '../../../../carDetails';

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

const ProductData = [
  {
    img: booking,
    WorkShopName: "GSF Workshop",
    CarModal: "Mercedes S500",
    Service: "Car Polish",
  },
  {
    img: booking,
    carName: "Aston Martin DBX",
    planName: "Silver  Plan",
    uparrow: { uparrow },
    featured: "No",
    row1: [
      { icon: uparrow, text: "row one first" },
      { icon: stats, text: "Status" },
      { icon: refresh, text: "Refresh" },
    ],
    row2: [
      { icon: edit, text: "row one first" },
      { icon: remove, text: "Remove" },
      { icon: feature, text: "feature" },
    ],
  },
  {
    img: booking,
    carName: "Aston Martin DBX",
    planName: "Silver  Plan",
    uparrow: { uparrow },
    row1: [
      { icon: uparrow, text: "row one first" },
      { icon: stats, text: "Status" },
      { icon: refresh, text: "Refresh" },
    ],
    row2: [
      { icon: edit, text: "row one first" },
      { icon: remove, text: "Remove" },
      { icon: feature, text: "feature" },
    ],
  },
  {
    img: booking,
    carName: "Aston Martin DBX",
    planName: "Silver  Plan",
    uparrow: { uparrow },
    row1: [
      { icon: uparrow, text: "row one first" },
      { icon: stats, text: "Status" },
      { icon: refresh, text: "Refresh" },
    ],
    row2: [
      { icon: edit, text: "row one first" },
      { icon: remove, text: "Remove" },
      { icon: feature, text: "feature" },
    ],
  },
  {
    img: booking,
    carName: "Aston Martin DBX",
    planName: "Silver  Plan",
    uparrow: { uparrow },
    row1: [
      { icon: uparrow, text: "row one first" },
      { icon: stats, text: "Status" },
      { icon: refresh, text: "Refresh" },
    ],
    row2: [
      { icon: edit, text: "row one first" },
      { icon: remove, text: "Remove" },
      { icon: feature, text: "feature" },
    ],
  },
  {
    img: booking,
    carName: "Aston Martin DBX",
    planName: "Silver  Plan",
    uparrow: { uparrow },
    row1: [
      { icon: uparrow, text: "row one first" },
      { icon: stats, text: "Status" },
      { icon: refresh, text: "Refresh" },
    ],
    row2: [
      { icon: edit, text: "row one first" },
      { icon: remove, text: "Remove" },
      { icon: feature, text: "feature" },
    ],
  },
];

const SellerGarageBooking = () => {

  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [single, setSingle] = useState({});
  const [single2, setSingle2] = useState({});
  const user = useSelector((state) => state.authReducer);
  const [getBooking, setGetBooking] = useState([]);
  console.log(user);

  useEffect(() => {
    axios
      .get(`${Base_url}/user/user-garage-booking/${user?.userToken}`)
      .then((res) => {
        const pendingBookings = res?.data?.bookings?.filter(
          (booking) => booking.status === "pending" || booking.stats === "approved"
        );
        setGetBooking(pendingBookings);
        console.log(pendingBookings);
      })
      .catch((err) => {});
  }, []);

  const UpdateStatus = (id, newStatus) => {
    console.log(id, newStatus);

    const params = {
      bookingId: id,
      status: newStatus,
    };
    axios
      .patch(`${Base_url}/user/book-garage`, params)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          toast.success(res.data.message);
          axios
      .get(`${Base_url}/user/user-garage-booking/${user?.userToken}`)
      .then((res) => {
        console.log(res);
        
        const pendingBookings = res?.data?.bookings?.filter(
          (booking) => booking.status === "pending" || booking.stats === "approved"
        );
        setGetBooking(pendingBookings);
        console.log(pendingBookings);
      })
      .catch((err) => {});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  

  return (
    <>
   
   
      <Header />
      <DashboardNavbar />
     
      <div className="flex flex-col items-center  mb-4">
        <div className="mt-16 flex items-center justify-between w-[90%]">
          <h1 className="font-inter text-3xl font-semibold leading-10 tracking-normal text-left">
            Bookings:
          </h1>
          <div className="relative">
            {/* Search Bar */}
            <Input
              Icon={<RiArrowDropDownLine className="size-7" />}
              placeholder="Sort by Old bookings..."
              className="border-[#D2D2D2] border-2 md:w-50 w-60 pr-10 text-22 font-semibold tracking-wide text-left"
            />
          </div>
        </div>
        <Reschedule 
  setIsModalOpen={setOpenModal} 
  isModalOpen={openModal} 
  getData={single} 
  setGetBooking={setGetBooking}
/>
        <EditBooking 
  setIsModalOpen={setOpenModalEdit} 
  isModalOpen={openModalEdit} 
  getData={single2} 
  setGetBooking={setGetBooking}
/>

        {/* --------------------------------- main product card -------------------------------------- */}
        <div className="w-[90%]">
          <div className="ring ring-[#FB5722]  rounded-[15px] mt-4">
            <div className=" flex justify-between gap-1 h-[100px] w-[100%] bg-gray-50  rounded-tl-[15px] rounded-tr-[15px] ring-1 ring-[#FB5722] ">
              <div className="pt-7 pl-6  ">
                <div className="h-[30px] w-[300px] flex border-b-[#FB5722]">
                  <img src={inbox} alt="inbox" className="h-7 mr-2" />
                  <p className="font-bold text-[#FB5722]">
                    Upcoming Garage Bookings
                  </p>
                </div>
                <div className="border-b border-[#FB5722] w-[240px] relative pt-2"></div>
              </div>

              <div className="pt-7 pl-7">
                <div className="h-[30px] w-[300px] flex border-b-[#FB5722]  gap-4">
                  <img src={delet} alt="inbox" className="h-7" />
                  <p className="font-bold text-[#0C0CB8]">Cancelled Bookings</p>
                </div>
              </div>
            </div>
            {/* Use map to create cards */}
            <div className=" justify-between justify-end flex flex-wrap">
              {getBooking?.map((product, index) => (
                <div
                  key={index}
                  className={`p-4 bg-[#F3F3F5] h-[460px] w-[350px] rounded-[20px] mt-5 mb-2 ml-2 mr-2`}
                >
                  {/* Display card content */}
                  <div className="flex-col w-[350px]">
                    <img
                      src={product?.garageId?.logo}
                      alt={product?.carName}
                      className="h-[160px] w-[320px] rounded-md"
                    />
                    <h2 className="text-xl text-center font-bold p-2">
                      {product?.garageId?.garageName}
                    </h2>
                    {/* <p className=" size-[24px]  text-center w-full font-semibold leading-27">
                      {product?.WorkShopName}
                    </p> */}
                    {/* <p className=" text-center">{product?.Service}</p> */}
                    <p className=" text-center">
                      {product?.garageId?.serviceName}
                    </p>
                  </div>

                  {/* Display actions - Row 1 */}
                  <div className="flex justify-center gap-6 mt-2 w-[320px]">
                    <div className="w-[100px] h-[50px] bg-[#0C53AB] rounded-[5px] text-white text-center">
                      <div className="w-full text-center mt-2">
                        <img src={call} className="mx-auto h-5" alt="Icon" />
                        <p className="ml-2 text-sm">Call</p>
                      </div>
                    </div>
                    <div className="w-[100px] h-[50px] bg-[#0BA645] rounded-[5px] text-white text-center">
                      <div className="w-full text-center mt-2">
                        <img
                          src={whatsapp}
                          className="mx-auto h-5"
                          alt="Icon"
                        />
                        <p className="ml-2 text-sm">Whatsapp</p>
                      </div>
                    </div>
                    <div className="w-[100px] h-[50px] bg-[#FB5722] rounded-[5px] text-white text-center">
                      <div className="w-full text-center mt-2">
                        <img
                          src={location}
                          className="mx-auto h-5"
                          alt="Icon"
                        />
                        <p className="ml-2 text-sm">get Direction</p>
                      </div>
                    </div>
                  </div>

                  <div   className="flex justify-center cursor-pointer gap-3 mt-4 w-[320px]">
                    <div onClick={()=>{setOpenModalEdit(true)
                      setSingle2(product)
                    }} className="w-[100px] h-[50px] bg-[#0C53AB] rounded-[5px] text-white text-center">
                      <div className="w-full  mt-2">
                        <img src={edit} className="mx-auto h-5" alt="Icon" />
                        <p className="ml-2 text-sm">Edit</p>
                      </div>
                    </div>
                    <div onClick={()=>{

                      setOpenModal(true);
                      setSingle(product);
                      
                    }} 
                    
                    className="w-[100px]  cursor-pointer h-[50px] bg-[#0C53AB] rounded-[5px] text-white text-center">
                      <div className="w-full text-center mt-2">
                        <img
                          src={calender}
                          className="mx-auto h-5"
                          alt="Icon"
                        />
                        <p className="ml-2 text-sm">Reschedule</p>
                      </div>
                    </div>
                    <div
                      onClick={() => UpdateStatus(product?._id, "canceled")}
                      className="w-[100px] h-[50px] bg-[#D32525] rounded-[5px] text-white text-center"
                    >
                      <div className="w-full text-center mt-2">
                        <img src={cancel} className="mx-auto h-5" alt="Icon" />
                        <p className="ml-2 text-sm">Cancel</p>
                      </div>
                    </div>
                  </div>

                  <h5 className=" text-center pt-3">{moment.utc(product?.date).format('MM/DD/YYYY')}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerGarageBooking;
