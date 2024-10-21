import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Button from "../../components/Button";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CarModal from "./CarModal";

const CompareCar = () => {
  const [selectMake, setSelectMake] = useState("");
  const [selectModel, setSelectModel] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [selectedCars, setSelectedCars] = useState([]);

  console.log(selectedCars);

  // Store selected cars
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState(null); // Store car selected in modal
  const [loader, setLoader] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [overAllFilerData, setOverAllFilterData] = useState([]);
  console.log(filteredResults?.data);

  const [makes, setMakes] = useState([]);
  const [years, setYears] = useState([]);
  const user = useSelector((state) => state.authReducer);

  useEffect(() => {
    axios
      .get(`${Base_url}/admin/all-make`)
      .then((res) => {
        setMakes(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching makes:", error);
      });

    axios
      .get(`${Base_url}/admin/all-year`)
      .then((res) => {
        setYears(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching years:", error);
      });
  }, []);

  const handleSelectCar = () => {
    if (!selectMake) {
      toast.error("Make must be selected!");
    } else if (!selectModel) {
      toast.error("Model must be selected!");
    } else if (!selectYear) {
      toast.error("Year must be selected!");
    } else {
      setLoader(true);
      const url = `${Base_url}/admin/all-cars`;
      const params = {
        make: selectMake,
        model: selectModel,
        year: selectYear,
      };

      axios
        .get(url, { params })
        .then((response) => {
          setFilteredResults(response.data);
          setIsModalOpen(true);
          setLoader(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoader(false);
        });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCarSelect = (car) => {
    setSelectedCars((prev) => [...prev, car]);
    setIsModalOpen(false);
  };

  const handleSelectCarCompare = () => {
    const carIds = selectedCars?.map((car) => car._id).join(",");
    axios
      .post(`${Base_url}/user/convert-car?ids=${carIds}`)
      .then((res) => {
        console.log(res);

        setOverAllFilterData(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Header />
      <div className=" container mx-auto">
        <div className=" py-5">
          <h1 className=" text-[#707070] text-2xl">Compare Cars</h1>
          <p className=" text-sm text-[#707070] pt-5 pb-8">
            Confused which Car you should buy? CarDekho helps compare two or
            more cars of your choice with the best car comparison tool. Compare
            cars in India on various parameters like price, features,
            specifications, fuel consumption, mileage, performance, dimension,
            safety & more to make a smart choice for you.
          </p>
        </div>
        <div className="bg-[#ECECEC] py-9 rounded-2xl border border-primary">
          <div className="md:flex block mt-6 justify-center w-full gap-10">
            {Array(3)
              .fill()
              .map((_, idx) => (
                <div
                  key={idx}
                  className="w-64 bg-white border border-[#B6B3B3] rounded-xl px-4 py-6"
                >
                  <div onClick={handleSelectCar} className="cursor-pointer">
                    {/* Display selected car image if any, else show default */}
                    {selectedCars[idx] ? (
                      <img
                        src={selectedCars[idx].car_images[0]} // Update with the selected car image
                        className="w-20 h-20 rounded-full mx-auto"
                        alt="Selected Car"
                      />
                    ) : (
                      <img
                        src={require("../../assets/images/compareupload.png")}
                        className="w-20 h-20 mx-auto"
                        alt="Add Car"
                      />
                    )}
                    <p className="text-[#B6B3B3] pt-2 text-center">
                      {selectedCars[idx] ? selectedCars[idx].name : "Add Car"}
                    </p>
                  </div>
                  <div>
                    <select
                      className="mt-2.5 text-[#757272] p-2 border rounded-lg w-full border-[#E9DBDB]"
                      onChange={(e) => setSelectMake(e.target.value)}
                    >
                      <option>Select Make</option>
                      {makes?.map((item) => (
                        <option key={item} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="mt-2.5 text-[#757272] p-2 border rounded-lg w-full border-[#E9DBDB]"
                      onChange={(e) => setSelectModel(e.target.value)}
                    >
                      <option>Select Model</option>
                      {/* This assumes makes array also has models */}
                      {makes?.map((model) => (
                        <option key={model} value={model.name}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="mt-2.5 text-[#757272] p-2 border rounded-lg w-full border-[#E9DBDB]"
                      onChange={(e) => setSelectYear(e.target.value)}
                    >
                      <option>Select Year</option>
                      {years?.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
          </div>

          <Button
            label={"Compare Now"}
            className="bg-primary py-2 mt-10 w-48 mx-auto text-white rounded-3xl"
            onClick={handleSelectCarCompare}
          />

          {/* Modal to show filtered cars */}
          {isModalOpen && (
            <CarModal
              isOpen={isModalOpen}
              getData={filteredResults.data}
              onClose={handleCloseModal}
              onSelect={handleCarSelect} // Pass selected car back to the main component
            />
          )}
        </div>

        <div className="grid grid-cols-2 my-8 gap-8">
          {overAllFilerData?.map((item, index) => {
            return (
              <div className="bg-[#ECECEC] rounded-2xl overflow-hidden border border-primary">
                <div className="h-60">
                  <img
                    src={item?.car_images[0]}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>

                <div className="px-6 py-6">
                  <h1 className="text-xl text-secondary font-semibold">
                    {item?.title}
                  </h1>
                  <p className="text-sm">116! Hatchback</p>
                  <div className="pt-3">
                    <h1 className="font-semibold text-xl">
                      QR. {item?.price_QR}
                    </h1>
                    <p className="">{item?.year}</p>
                  </div>
                </div>

                <div className="bg-white px-6 py-4">
                  <table className="w-full">
                    <tbody>
                      <tr className="">
                        <td className="py-2 font-semibold">Make:</td>
                        <td className="py-2">{item?.make}</td>
                      </tr>
                      <tr className="">
                        <td className="py-2 font-semibold">Model:</td>
                        <td className="py-2">1 Series</td>
                      </tr>
                      <tr className="">
                        <td className="py-2 font-semibold">Year:</td>
                        <td className="py-2">2020</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">Body Type:</td>
                        <td className="py-2">{item?.body_type}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">Condition:</td>
                        <td className="py-2">{item?.vehicle_condition}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">Fuel Type:</td>
                        <td className="py-2">{item?.fuel_type}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">Engine Size:</td>
                        <td className="py-2">{item?.engine_size}</td>
                      </tr>

                      <tr>
                        <td className="py-2 font-semibold">Cylinder:</td>
                        <td className="py-2">{item?.cylinder}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">exterior colour:</td>
                        <td className="py-2">{item?.interior_colour}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">exterior colour:</td>
                        <td className="py-2">{item?.exterior_colour}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">exterior colour:</td>
                        <td className="py-2">{item?.exterior_colour}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className=' py-10'>
            <h3  className=' font-semibold text-xl'>Popular cars comparison</h3>
            <div className=' grid grid-cols-2 pt-3 gap-14'>

                <div>
                <div className='  flex border overflow-hidden relative  border-primary rounded-2xl'>
                <div className=' w-[50%]'>
                        <div  className=' h-52'>
                        <img src={require('../../assets/images/FavouritCars/featured.png')} className='  object-cover h-full w-full' alt='' />
                        </div>
                       <div className=' pt-3 pb-5  px-1'>
                        <h4 className=' uppercase text-[#CACACA]'>Cheverolet</h4>
                        <h4 className=' uppercase  text-secondary font-semibold text-base'>Cheverolet camaro</h4>
                        <p className=' text-secondary font-semibold'>2018</p>
                        <p className=' text-secondary font-semibold'>QR 16,243</p>
                       </div>
                    </div>
                    <div className=' w-[50%]'>
                    <div  className=' h-52'>
                        <img src={require('../../assets/images/FavouritCars/new.png')} className='  object-cover h-full w-full' alt='' />
                        </div>
                       <div className=' pt-3 pb-5  px-1'>
                        <h4 className=' uppercase text-[#CACACA]'>Cheverolet</h4>
                        <h4 className=' uppercase  text-secondary font-semibold text-base'>Cheverolet camaro</h4>
                        <p className=' text-secondary font-semibold'>2018</p>
                        <p className=' text-secondary font-semibold'>QR 16,243</p>
                       </div>
                    </div>
                    <div className=' absolute left-[43%] top-20'>
                        <img src={require('../../assets/images/comparetags.png')} className=' w-20'  alt='' />
                    </div>
                </div>

                <Button
                  label={"Compare Now"}
                  className={
                    " bg-primary py-2 mt-10 w-48 mx-auto text-white rounded-3xl"
                  }
                />
                </div>
                <div>
                <div className='  flex border overflow-hidden relative  border-primary rounded-2xl'>
                <div className=' w-[50%]'>
                        <div  className=' h-52'>
                        <img src={require('../../assets/images/FavouritCars/featured.png')} className='  object-cover h-full w-full' alt='' />
                        </div>
                       <div className=' pt-3 pb-5  px-1'>
                        <h4 className=' uppercase text-[#CACACA]'>Cheverolet</h4>
                        <h4 className=' uppercase  text-secondary font-semibold text-base'>Cheverolet camaro</h4>
                        <p className=' text-secondary font-semibold'>2018</p>
                        <p className=' text-secondary font-semibold'>QR 16,243</p>
                       </div>
                    </div>
                    <div className=' w-[50%]'>
                    <div  className=' h-52'>
                        <img src={require('../../assets/images/FavouritCars/new.png')} className='  object-cover h-full w-full' alt='' />
                        </div>
                       <div className=' pt-3 pb-5  px-1'>
                        <h4 className=' uppercase text-[#CACACA]'>Cheverolet</h4>
                        <h4 className=' uppercase  text-secondary font-semibold text-base'>Cheverolet camaro</h4>
                        <p className=' text-secondary font-semibold'>2018</p>
                        <p className=' text-secondary font-semibold'>QR 16,243</p>
                       </div>
                    </div>
                    <div className=' absolute left-[43%] top-20'>
                        <img src={require('../../assets/images/comparetags.png')} className=' w-20'  alt='' />
                    </div>
                </div>

                <Button
                  label={"Compare Now"}
                  className={
                    " bg-primary py-2 mt-10 w-48 mx-auto text-white rounded-3xl"
                  }
                />
                </div>
            </div>

        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default CompareCar;
