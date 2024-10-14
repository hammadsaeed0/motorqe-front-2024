import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import Button from "../../../../components/Button";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import { Base_url } from "../../../../utils/Base_url";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../../../components/Input";

const GarageDateTime = () => {
  const { id } = useParams();
 

  const navigate = useNavigate();
  const [newListings, setNewListings] = useState({});
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    contact: "",
    additionalNotes: "",
  });
  const [errors, setErrors] = useState({
    date: false,
    time: false,
    contact: false,
  });

  useEffect(() => {
    axios
      .get(`${Base_url}/user/single-garage/${id}`)
      .then((res) => {
        console.log(res);
        
        setNewListings(res?.data?.data);
      })
      .catch((error) => {});
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const totalPrice = newListings?.servicesAndPrices?.reduce((acc, item) => {
    return acc + parseFloat(item?.price || 0); // Ensure price is a number
  }, 0);


  const grandTotal = totalPrice + parseFloat(newListings?.price || 0);

  const validateForm = () => {
    const newErrors = {
      date: !formData.date,
      time: !formData.time,
      contact: !formData.contact,
     
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate(`/garage/garage-confirm/${newListings?._id}`, {
        state: {
          date: formData.date,
          time: formData.time,
          contact: formData.contact,
          additionalNotes: formData.additionalNotes,
        },
      });
    }
  };




  return (
    <div>
      <Header />
      <div className="py-8 text-center">
        <h2 className="h2 text-center">Car Service Booking</h2>
        <p className="pt-2 text-gray-400">
          Service your car in seconds with just a few clicks
        </p>
      </div>

      <div className="py-8">
        <ul className="flex gap-8 justify-center items-center">
          <li className="flex items-center gap-2">
            <div className="w-10 h-10 bg-secondary items-center rounded-full flex justify-center">
              <p className="text-white">1</p>
            </div>
            <div>
              <span className="text-secondary font-semibold">Garage</span>
            </div>
          </li>
          <li>
            <FaAngleRight size={25} className="text-gray-500" />
          </li>
          <li className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary items-center rounded-full flex justify-center">
              <p className="text-white">2</p>
            </div>
            <div>
              <span className="text-primary font-semibold">
                Choose Date & Time
              </span>
            </div>
          </li>
          <li>
            <FaAngleRight size={25} className="text-gray-500" />
          </li>
          <li className="flex items-center gap-2">
            <div className="w-10 h-10 items-center border border-[#757272] rounded-full flex justify-center">
              <p className="text-[#757272]">3</p>
            </div>
            <div>
              <span className="text-[#757272] font-semibold">Confirm</span>
            </div>
          </li>
          <li>
            <FaAngleRight size={25} className="text-gray-500" />
          </li>
          <li className="flex items-center gap-2">
            <div className="w-10 h-10 items-center border border-[#757272] rounded-full flex justify-center">
              <p className="text-[#757272]">4</p>
            </div>
            <div>
              <span className="text-[#757272] font-semibold">
                Booking Confirmation
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div className="pb-12 shadow-md rounded-xl mt-8 py-5 px-12 mx-auto w-[80%]">
        <div className="">
          <h2 className="h3 text-center">Complete Your Booking</h2>
        </div>

        <div className="bg-[#FEFBFB] border rounded-lg mt-4 p-5">
          <div className="w-full h-36">
            <img
              src={newListings?.logo}
              className="w-full h-full object-cover"
              alt="Garage Logo"
            />
          </div>

          <h3 className="text-secondary text-xl mt-4">
            {newListings?.name || "Elite Motors Garage"}
          </h3>
          <p className="text-xl">
            {newListings?.address || "12A Workshop Industrial Area, Doha, Qatar"}
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Input
                type="date"
                name="date"
                className={`border mt-1 w-full p-2 bg-[#FEFBFB] ${errors.date ? "border-red-500" : ""}`}
                label="Date"
                required
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">Date is required</p>
              )}
            </div>
            <div>
              <Input
                type="time"
                name="time"
                className={`border mt-1 w-full p-2 bg-[#FEFBFB] ${errors.time ? "border-red-500" : ""}`}
                label="Time"
                required
                value={formData.time}
                onChange={handleChange}
              />
              {errors.time && (
                <p className="text-red-500 text-sm">Time is required</p>
              )}
            </div>
            <div>
              <Input
                type="text"
                name="contact"
                className={`border mt-1 w-full p-2 bg-[#FEFBFB] ${errors.contact ? "border-red-500" : ""}`}
                placeholder="Enter Contact Number"
                label="Contact"
                value={formData.contact}
                onChange={handleChange}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">Contact is required</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Input
              type="text"
              name="additionalNotes"
              className="border w-full h-24 mt-2 p-2 bg-[#FEFBFB]"
              placeholder="Enter Notes"
              label="Additional Notes"
              value={formData.additionalNotes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="border-2 border-[#575656] mt-3">
          <h3 className="text-secondary font-bold text-xl text-center mx-auto mt-2 w-44 border-b-2 border-primary">
            Selected Work
          </h3>
          <ul className="my-3 pl-4 w-96">
            {newListings?.servicesAndPrices?.map((item,index)=>{
              return (
                <li className="text-[#575656] flex justify-between items-center font-semibold">
                <p className="m-0">{index+1}) {item?.service} </p>
                <p className="m-0">QR. {item?.price}</p>
              </li>
              )
            })}
           
          </ul>
          <div className="bg-primary border  border-[#575656] flex justify-end pr-4 items-center py-1.5">
            <p className="m-0 text-xl text-white">Total Price QR.   {grandTotal}</p>
          </div>
        </div>
      </div>

      <div className="container px-24 flex justify-between items-center mx-auto mt-10 mb-20">
        <div className="flex items-center gap-3" onClick={() => navigate(-1)}>
          <LiaLongArrowAltLeftSolid />
          <span className="text-textColor font-semibold">Back</span>
        </div>
        <Button
          label="Next"
          onClick={handleNextClick}
          className="bg-primary font-bold rounded-3xl text-white w-44 py-2"
        />
      </div>
      <Footer />
    </div>
  );
};

export default GarageDateTime;
