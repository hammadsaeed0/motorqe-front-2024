import React, { useEffect, useState } from "react";
import list from "../../../../assets/images/list.png";
import vector from "../../../../assets/images/Vector.png";
import announcement from "../../../../assets/images/announcement.png";
import group from "../../../../assets/images/group.png";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import DashboardNavbar from "../../NavBAr/DashboardNavbar";
import Button from "../../../../components/Button";
import { MdAddCircleOutline } from "react-icons/md";
import { Base_url } from "../../../../utils/Base_url";
import { toast } from "react-toastify";
import axios from "axios";

const MyWorkshopServices = () => {
  const [loading, setLoader] = useState(false);
  const userId = JSON.parse(localStorage.getItem("userToken"));

  const [services, setServices] = useState([
    { serviceName: "", price: "", category: "" },
  ]);

  const storedData = localStorage.getItem("serviceProvider");
  let userData;

  if (storedData !== null) {
    try {
      userData = JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      userData = {}; // Handle parsing error (e.g., set to empty object)
    }
  } else {
    userData = {}; // Handle case where item does not exist
  }

  const [booking, setBooking] = useState([]);
  const [analytic, setAnalytics] = useState([]);

  console.log(analytic);

  useEffect(() => {
    axios
      .get(`${Base_url}/user/garage-booking-count/${userData}`)
      .then((res) => {
        console.log(res, "/user button click");

        setBooking(res?.data);
      })
      .catch((error) => {});

    axios
      .get(`${Base_url}/user/garage-analytics/${userData}`)
      .then((res) => {
        console.log(res, "/user button click");

        setAnalytics(res?.data);
      })
      .catch((error) => {});
  }, []);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newServices = [...services];
    newServices[index][name] = value;
    setServices(newServices);
  };

  const handleAddService = () => {
    setServices([...services, { serviceName: "", price: "", category: "" }]);
  };

  const handleSubmit = async () => {
    const emptyService = services.find(
      (service) => !service.serviceName || !service.price || !service.category
    );

    if (emptyService) {
      toast.error("Please fill all fields for all services.");
    } else {
      setLoader(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      try {
        for (const service of services) {
          const raw = JSON.stringify({
            serviceName: service.serviceName,
            price: service.price,
            category: service.category,
            createdBy: userId,
          });

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          const response = await fetch(
            `${Base_url}/user/garage`,
            requestOptions
          );
          const result = await response.json();
          console.log(result);

          if (!result?.success) {
            throw new Error(result?.message || "Service submission failed.");
          }
        }
        toast.success("All services added successfully!");
        localStorage.setItem("workshopCreated", "1");
      } catch (error) {
        console.error("Error submitting services:", error);
        toast.error("An error occurred while adding services.");
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <>
      <Header />
      <DashboardNavbar />
      <div className="flex flex-col items-center mb-4">
        <div className="mt-16 flex items-center justify-between w-[90%]">
          <h1 className="font-inter text-3xl font-semibold leading-10 tracking-normal text-left">
            My Workshop Services
          </h1>
        </div>

        <div class="w-[90%] h-[215px] top-420px left-112px gap-[35px] flex mb-2 mt-[99px]">
          <div
            class="w-[332px] h-[215px] px-15 py-34 border-20 rounded-xl justify-between flex"
            style={{ backgroundColor: "#0C53AB" }}
          >
            <div className=" text-white mx-[15px] mt-[54px] relative">
              <h1 className="font-inter  font-semibold text-5xl ">
                {booking?.todayBookingCount ? booking?.todayBookingCount : 0}
              </h1>
              <p className="text-18 pt-3">Todays Bookings</p>
            </div>
            <img
              src={list}
              className="w-[72px] h-[72px] top-5 mt-[54px] mr-2"
            ></img>
          </div>

          <div
            class="w-[332px] h-[215px] px-15 py-34 border-20 rounded-xl justify-between flex"
            style={{ backgroundColor: "#0C53AB" }}
          >
            <div className=" text-white mx-[15px] mt-[54px] relative">
              <h1 className="font-inter  font-semibold text-5xl ">
                {booking?.pendingBookingCount
                  ? booking?.pendingBookingCount
                  : 0}
              </h1>
              <p className="text-18 pt-3">Upcoming Bookings</p>
            </div>
            <img
              src={vector}
              className="w-[72px] h-[72px] top-5 mt-[54px] mr-2"
            ></img>
          </div>

          <div
            class="w-[332px] h-[215px] px-15 py-34 border-20 rounded-xl justify-between flex"
            style={{ backgroundColor: "#0C53AB" }}
          >
            <div className=" text-white mx-[15px] mt-[54px] relative">
              <h1 className="font-inter  font-semibold text-5xl ">
                {booking?.pendingBookingCount
                  ? booking?.pendingBookingCount
                  : 0}
              </h1>
              <p className="text-18 pt-3">Pending Bookings</p>
            </div>
            <img
              src={announcement}
              className="w-[72px] h-[72px] top-5 mt-[54px] mr-2"
            ></img>
          </div>

          <div
            class="w-[332px] h-[215px] px-15 py-34 border-20 rounded-xl justify-between flex"
            style={{ backgroundColor: "#0C53AB" }}
          >
            <div className=" text-white mx-[15px] mt-[54px] relative">
              <h1 className="font-inter font-semibold text-5xl ">
                {analytic?.data?.views ? analytic?.data?.views : 0}
              </h1>
              <p className="text-18 pt-3">Total Visits</p>
            </div>
            <img
              src={group}
              className="w-[72px] h-[72px] top-5 mt-[54px] mr-2"
            ></img>
          </div>
        </div>

        <div className="py-12 w-[90%]">
          <div className="bg-[#ECECEC] py-9 rounded-2xl border border-primary">
            <div className="flex justify-center pb-7">
              <h1 className="text-secondary border-b-2 text-xl border-primary font-semibold">
                Services & Prices
              </h1>
            </div>

            <div className="w-[80%] mx-auto text-center">
              {/* Map over services array to display each row */}
              {services.map((service, index) => (
                <div
                  key={index}
                  className="lg:flex block justify-center w-full gap-3 mb-4"
                >
                  <div className="md:w-60 w-full">
                    <label className="block text-sm text-left font-semibold text-textColor">
                      Service
                    </label>
                    <select
                      name="serviceName"
                      value={service.serviceName}
                      onChange={(e) => handleInputChange(index, e)}
                      className="mt-1 bg-[#FEFBFB] text-gray-600 p-2.5 border rounded-lg w-full border-[#E9DBDB]"
                    >
                      <option value="">Select</option>
                      <option value="Best Auto Craft">Best Auto Craft</option>
                      <option value="One Stop Auto Zone">
                        One Stop Auto Zone
                      </option>
                      <option value="Dupont Auto Tech">Dupont Auto Tech</option>
                      <option value="Auto Repair Experts">
                        Auto Repair Experts
                      </option>
                      <option value="Quality Auto Repair">
                        Quality Auto Repair
                      </option>
                      <option value="Mike’s Auto Garage">
                        Mike’s Auto Garage
                      </option>
                    </select>
                  </div>

                  <div className="md:w-60 w-full">
                    <label className="block text-sm text-left font-semibold text-textColor">
                      Price
                    </label>
                    <input
                      name="price"
                      value={service.price}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="QR 500.00"
                      className="mt-1 bg-[#FEFBFB] text-gray-600 p-2.5 border rounded-lg w-full border-[#E9DBDB]"
                    />
                  </div>

                  <div className="md:w-60 w-full">
                    <label className="block text-sm text-left font-semibold text-textColor">
                      Category
                    </label>
                    <select
                      name="category"
                      value={service.category}
                      onChange={(e) => handleInputChange(index, e)}
                      className="mt-1 bg-[#FEFBFB] text-gray-600 p-2.5 border rounded-lg w-full border-[#E9DBDB]"
                    >
                      <option value="">Select Category</option>
                      <option value="Category 1">Category 1</option>
                      <option value="Category 2">Category 2</option>
                      <option value="Category 3">Category 3</option>
                      <option value="Category 4">Category 4</option>
                    </select>
                  </div>
                </div>
              ))}

              <div className="flex justify-center my-6">
                {/* Add Service Button */}
                <button
                  type="button"
                  onClick={handleAddService}
                  className="font-bold w-56 uppercase text-[#0C53AB] border-primary border-2 rounded-full py-2 flex justify-center gap-2 items-center"
                >
                  <MdAddCircleOutline color="#0C53AB" size={25} />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="">
                {loading ? (
                  <button
                    disabled
                    type="button"
                    className="bg-primary py-2 w-48 mx-auto text-white rounded-3xl font-semibold"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* SVG Loader */}
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5652 10.4297 44.0674 10.0209C47.8356 9.39123 51.6634 9.31671 55.4215 9.80612C60.5465 10.4644 65.4807 12.1746 69.8406 14.8549C74.2005 17.5352 77.8997 21.1317 80.6822 25.4074C83.1522 29.1372 84.9341 33.2918 85.9537 37.656C86.5792 40.0399 89.0379 41.6781 91.465 41.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-primary py-2 w-48 mx-auto text-white rounded-3xl font-semibold"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyWorkshopServices;
