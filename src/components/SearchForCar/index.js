import React, { useState } from "react";
import Button from "../Button";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchForCar = () => {
  const [loading, setLoader] = useState(false);
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = useState([]);
  console.log(filteredResults);

  const AllFilterFun = (filterValue) => {
    setLoader(true);
    const url = `${Base_url}/users/advance-searching`;
    const params = {
      engine_size: filterValue,
    };

    axios
      .get(url, { params })
      .then((response) => {
        console.log("Response data:", response.data);
        setFilteredResults(response.data);

        navigate("/new_lists", { state: { filter: response.data } });
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const AllYearFun = (filterValue) => {
    setLoader(true);
    const url = `${Base_url}/users/advance-searching`;
    const params = {
      model: filterValue,
    };

    axios
      .get(url, { params })
      .then((response) => {
        console.log("Response data:", response.data);
        setFilteredResults(response.data);

        navigate("/new_lists", { state: { filter: response.data } });
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const AllBurgetFun = (filterValue) => {
    setLoader(true);
    const url = `${Base_url}/users/advance-searching`;
    const params = {
      price_QR: filterValue,
    };

    axios
      .get(url, { params })
      .then((response) => {
        console.log("Response data:", response.data);
        setFilteredResults(response.data);

        navigate("/new_lists", { state: { filter: response.data } });
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const AllBrandFun = (filterValue) => {
    setLoader(true);
    const url = `${Base_url}/users/advance-searching`;
    const params = {
      make: filterValue,
    };

    axios
      .get(url, { params })
      .then((response) => {
        console.log("Response data:", response.data);
        setFilteredResults(response.data);

        navigate("/new_lists", { state: { filter: response.data } });
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const AllBodyFun = (filterValue) => {
    setLoader(true);
    const url = `${Base_url}/users/advance-searching`;
    const params = {
      make: filterValue,
    };

    axios
      .get(url, { params })
      .then((response) => {
        console.log("Response data:", response.data);
        setFilteredResults(response.data);

        navigate("/new_lists", { state: { filter: response.data } });
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const [allFilter, setFilter] = useState("body_type");
  return (
    <div className=" container mx-auto mt-16 px-10">
      <h2 className=" h2  text-center">Search for a car by</h2>

      <hr className=" m-0 border-b-2 w-64 border-primary mt-2 mx-auto" />
      <div className="scroll-container mt-8  flex  gap-2 md:justify-center justify-start  items-center productOverflow  overflow-x-auto whitespace-nowrap">
        <Button
          label={"Body Type"}
          onClick={() => setFilter("body_type")}
          className={` border-b-2 py-2.5  ${
            allFilter === "body_type"
              ? " text-primary border-b-primary "
              : "bg-white  border-b-white  text-secondary"
          }   font-bold w-44 sm:text-base text-sm`}
        />
        <Button
          label={"Brands"}
          onClick={() => setFilter("brands")}
          className={` border-b-2 py-2.5 border-primary  ${
            allFilter === "brands"
            ? " text-primary border-b-primary "
            : "bg-white  border-b-white  text-secondary"
        }   font-bold w-44 sm:text-base text-sm`}
        />
        <Button
          label={"Budget"}
          onClick={() => setFilter("budget")}
          className={` border-b-2 py-2.5 border-primary font-bold ${
            allFilter === "budget"  ? " text-primary border-b-primary "
            : "bg-white  border-b-white  text-secondary"
        }   font-bold w-44 sm:text-base text-sm`}
        />
        <Button
          label={"Year"}
          onClick={() => setFilter("year")}
          className={` border-b-2 py-2.5 border-primary  ${
            allFilter === "year"
            ? " text-primary border-b-primary "
            : "bg-white  border-b-white  text-secondary"
        }   font-bold w-44 sm:text-base text-sm`}
        />
        <Button
          label={"Engine Size"}
          onClick={() => setFilter("engine")}
          className={` border-b-2 py-2.5 border-primary  ${
            allFilter === "engine"
            ? " text-primary border-b-primary "
            : "bg-white  border-b-white   text-secondary"
        }   font-bold w-44 sm:text-base text-sm`}
        />
      </div>

      {allFilter === "body_type" ? (
        <>
          <div className=" grid md:grid-cols-6 grid-cols-2 mt-8 gap-10">
            <div>
              <div onClick={() => AllBodyFun("SUV")} className=" text-center">
                <img src={require("../../assets/images/car1.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  SUV
                </span>
              </div>
            </div>
            <div>
              <div onClick={() => AllBodyFun("Coupe")} className=" text-center">
                <img src={require("../../assets/images/car2.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  Coupe
                </span>
              </div>
            </div>
            <div>
              <div
                onClick={() => AllBodyFun("Luxury")}
                className=" text-center"
              >
                <img src={require("../../assets/images/car3.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  Luxury{" "}
                </span>
              </div>
            </div>
            <div>
              <div
                onClick={() => AllBodyFun("Electric/Hybrid")}
                className=" text-center"
              >
                <img src={require("../../assets/images/car4.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  Electric/Hybrid
                </span>
              </div>
            </div>
            <div>
              <div onClick={() => AllBodyFun("MPV")} className=" text-center">
                <img src={require("../../assets/images/car5.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  MPV
                </span>
              </div>
            </div>
            <div>
              <div
                onClick={() => AllBodyFun("Pickup")}
                className=" text-center"
              >
                <img src={require("../../assets/images/car6.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  Pickup
                </span>
              </div>
            </div>
            <div>
              <div onClick={() => AllBodyFun("Wagon")} className=" text-center">
                <img src={require("../../assets/images/car7.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  Wagon
                </span>
              </div>
            </div>
            <div>
              <div onClick={() => AllBodyFun("Sedan")} className=" text-center">
                <img src={require("../../assets/images/car8.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  Sedan
                </span>
              </div>
            </div>
            <div>
              <div
                onClick={() => AllBodyFun("Sports")}
                className=" text-center"
              >
                <img src={require("../../assets/images/car9.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  Sports
                </span>
              </div>
            </div>
            <div>
              <div
                onClick={() => AllBodyFun("Classic")}
                className=" text-center"
              >
                <img src={require("../../assets/images/car10.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  Classic
                </span>
              </div>
            </div>
            <div>
              <div
                onClick={() => AllBodyFun("  Muscle Car")}
                className=" text-center"
              >
                <img src={require("../../assets/images/car11.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  Muscle Car
                </span>
              </div>
            </div>
            <div>
              <div
                onClick={() => AllBodyFun("convertible")}
                className=" text-center"
              >
                <img src={require("../../assets/images/car12.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  convertible
                </span>
              </div>
            </div>
            <div>
              <div
                onClick={() => AllBodyFun("compact")}
                className=" text-center"
              >
                <img src={require("../../assets/images/car13.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  compact
                </span>
              </div>
            </div>
            <div>
              <div
                onClick={() => AllBodyFun("Motorbike")}
                className=" text-center"
              >
                <img src={require("../../assets/images/car14.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  Motorbike
                </span>
              </div>
            </div>
            <div>
              <div onClick={() => AllBodyFun("Buggy")} className=" text-center">
                <img src={require("../../assets/images/car15.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  Buggy
                </span>
              </div>
            </div>
            <div>
              <div onClick={() => AllBodyFun("Van")} className=" text-center">
                <img src={require("../../assets/images/car16.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  Van
                </span>
              </div>
            </div>
            <div>
              <div onClick={() => AllBodyFun("Bus")} className=" text-center">
                <img src={require("../../assets/images/car17.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  Bus
                </span>
              </div>
            </div>
            <div>
              <div onClick={() => AllBodyFun("Truck")} className=" text-center">
                <img src={require("../../assets/images/car18.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  Truck
                </span>
              </div>
            </div>
            <div>
              <div onClick={() => AllBodyFun("BOAT")} className=" text-center">
                <img src={require("../../assets/images/car19.png")} alt="" />
                <span className=" uppercase text-textColor font-semibold">
                  BOAT
                </span>
              </div>
            </div>
          </div>
        </>
      ) : allFilter === "year" ? (
        <>
          <div className=" flex items-center   flex-wrap justify-center mt-14 gap-4">
            <Button
              onClick={() => AllYearFun("2024")}
              label={"2024"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />

            <Button
              onClick={() => AllYearFun("2023")}
              label={"2023"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />

            <Button
              onClick={() => AllYearFun("2022")}
              label={"2022"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
            <Button
              onClick={() => AllYearFun("2021")}
              label={"2021"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
            <Button
              onClick={() => AllYearFun("2020")}
              label={"2020"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
            <Button
              onClick={() => AllYearFun("2019")}
              label={"2019"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
            <Button
              onClick={() => AllYearFun("2018")}
              label={"2018"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
            <Button
              onClick={() => AllYearFun("2017")}
              label={"2017"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
            <Button
              onClick={() => AllYearFun("2016")}
              label={"2016"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
          </div>
        </>
      ) : allFilter === "engine" ? (
        <>
          <div className=" flex items-center   flex-wrap justify-center mt-14 gap-4">
            <Button
              onClick={() => AllFilterFun("Under 1.0L")}
              label={"Under 1.0L"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />

            <Button
              onClick={() => AllFilterFun("1.1L-1.6L")}
              label={"1.1L-1.6L"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />

            <Button
              onClick={() => AllFilterFun("1.7L-2.0L")}
              label={"1.7L-2.0L"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
            <Button
              onClick={() => AllFilterFun("2.1L-2.5L")}
              label={"2.1L-2.5L"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
            <Button
              onClick={() => AllFilterFun("2.6L-3.0L")}
              label={"2.6L-3.0L"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
            <Button
              onClick={() => AllFilterFun("3.1L-3.5L")}
              label={"3.1L-3.5L"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
            <Button
              onClick={() => AllFilterFun("3.6L-4.0L")}
              label={"3.6L-4.0L"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
            <Button
              onClick={() => AllFilterFun("4.1L-4.5L")}
              label={"4.1L-4.5L"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
            <Button
              onClick={() => AllFilterFun("4.6L-5.0L")}
              label={"4.6L-5.0L"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
            <Button
              onClick={() => AllFilterFun("Above 5.0L")}
              label={"Above 5.0L"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
          </div>
        </>
      ) : allFilter === "brands" ? (
        <>
          <div className=" flex flex-wrap justify-center items-center mt-14 gap-3">
            <div
              onClick={() => AllBrandFun("Audi")}
              className="  m-2  bg-white w-64  rounded"
            >
              <img
                src={require("../../assets/images/b1.png")}
                alt=""
                className=" w-full  h-full object-cover"
              />
            </div>
            <div
              onClick={() => AllBrandFun("BMW")}
              className="  scroll-item inline-block :w-64  p-2 bg-white rounded"
            >
              <img
                src={require("../../assets/images/b2.png")}
                alt=""
                className=" w-full h-full object-cover"
              />
            </div>
            <div
              onClick={() => AllBrandFun("Mercedes Benz")}
              className=" scroll-item inline-block p-2 w-64  bg-white rounded"
            >
              <img
                src={require("../../assets/images/b3.png")}
                alt=""
                className=" w-full  h-full object-cover"
              />
            </div>
            <div
              onClick={() => AllBrandFun("SJ")}
              className=" scroll-item inline-block p-2 w-64   bg-white rounded"
            >
              <img
                src={require("../../assets/images/b4.png")}
                alt=""
                className=" w-full  h-full object-cover"
              />
            </div>
            <div
              onClick={() => AllBrandFun("SJ")}
              className=" scroll-item inline-block p-2 w-64  bg-white rounded"
            >
              <img
                src={require("../../assets/images/b4.png")}
                alt=""
                className=" w-full  h-full object-cover"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" flex items-center   flex-wrap justify-center mt-14 gap-4">
            <Button
              onClick={() => AllBurgetFun("10000")}
              label={"Under QAR 10,000"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />

            <Button
              onClick={() => AllBurgetFun("15000")}
              label={"Under QAR 15,000"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />

            <Button
              onClick={() => AllBurgetFun("20000")}
              label={"Under QAR 20,000"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
            <Button
              onClick={() => AllBurgetFun("30000")}
              label={"Under QAR 30,000"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
            <Button
              onClick={() => AllBurgetFun("50000")}
              label={"Under QAR 50,000"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
            <Button
              onClick={() => AllBurgetFun("70000")}
              label={"Under QAR 70,000"}
              className={
                "  border shadow-lg w-52 rounded-md py-1.5  font-medium  text-secondary border-secondary"
              }
            />
          </div>
        </>
      )}

      <div className=" mt-12">
        <Button
          label={"View Less"}
          className={
            " border-2 md:float-end float-none mx-auto rounded-3xl border-primary w-48 text-secondary font-bold py-1.5"
          }
        />
      </div>
    </div>
  );
};

export default SearchForCar;
