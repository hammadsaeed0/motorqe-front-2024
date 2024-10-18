import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import Button from "../../components/Button";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { Base_url } from "../../utils/Base_url";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { feature } from "../../assets/images/images";

const FeaturedConfirmation= () => {
  const location = useLocation();
  const { minutes, id,selectedPlan} = location.state || {};
  const [loading, setLoader] = useState(false);
  const [newListings, setNewListings] = useState({});
//   const [selectedPlan, setSelectedPlan] = useState("");
  
  const navigate = useNavigate();

  const handlerSubmit = (e) => {
    setLoader(true);
      
    const params = {
        featureTimePeriod:minutes
    }
    axios.post(`${Base_url}/user/make-feature/${id}`,params).then((res)=>{

        navigate('/dashboard/my-garage')
        toast.success(res.data.message)
        
    }).catch((err)=>{

    })

  };





  useEffect(() => {
    axios
      .get(`${Base_url}/user/single-car/${id}`)
      .then((res) => {
        console.log(res);
        setNewListings(res?.data?.data);

        // toast.success(res.data.message)
       
      })
      .catch((error) => {});

    
  }, []);


  const plans = [
    { id: 1, label: "7 Days", price: "QR 1001" },
    { id: 2, label: "14 Days", price: "QR 1001" },
    { id: 3, label: "30 Days", price: "QR 1001" },
    { id: 4, label: "1 Week Homepage", price: "QR 1001" },
  ];

  const handlePlanSelect = (planId) => {
    // setSelectedPlan(planId);
  };

  return (
    <div>
      <Header />
      <div className="py-8 text-center">
        <h2 className="h2 text-center">Sell Your Car </h2>
        <p className="pt-2 text-gray-400">
          Sell your car in seconds with just a few clicks
        </p>
      </div>

      <div className="py-8">
        <ul className="flex gap-8 justify-center items-center">
          <li className="flex items-center gap-2">
            <div className="w-10 h-10 bg-secondary items-center rounded-full flex justify-center">
              <p className="text-white">1</p>
            </div>
            <div>
              <span className="   text-secondary font-semibold">
                Select Type Of Ad
              </span>
            </div>
          </li>

          <li>
            <FaAngleRight size={20} className="text-[#757272]" />
          </li>
          <li className="flex items-center gap-2">
            <div className="w-10 h-10 items-center text-[#757272] bg-primary border border-primary rounded-full flex justify-center">
              <p className=" text-white">2</p>
            </div>
            <div>
              <span className="text-primary  font-semibold">Confirm</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="pb-12 shadow-md rounded-xl mt-8 py-5 px-12 mx-auto w-[80%]">
        <div className="bg-[#FEFBFB] border rounded-lg mt-4 p-5">
          <div className="bg-[#FEFBFB] rounded-lg p-5">
            <div className="">
              <h2 className="h4 text-center">Please Wait For One of Our Representatives To Contact You !</h2>
            </div>

            <div className="pt-8">
              <h3 className="text-secondary text-xl">{newListings?.garageName}</h3>
              <p className="text-xl">{newListings?.address}</p>

              <h6 className="text-xl font-bold">2023 Mercedes Benz C63s Amg</h6>
              <h6 className="text-xl font-bold">Mileage: {newListings?.mileage} Kms</h6>
              <h6 className="text-xl font-bold">Price: QR. {newListings?.price_QR}</h6>
            </div>

            <ul className="py-3">
              <li>
                <span className="text-primary font-semibold">*</span> Your Ad
                Will Stay Among The Top Listings Of The Same Make & Model
              </li>
              <li>
                <span className="text-primary font-semibold">*</span> Homepage
                Ad: Your Featured Ad Will Be Listed On Homepage & Will Stay
                Among The Top Listings Of The Same Make & Model Ads
              </li>
            </ul>

            <div className="border-2 border-[#575656] rounded-md mt-3">
             
             <h3 className=" font-bold w-40 text-center mx-auto mt-2 text-xl  text-secondary  border-b-2  border-primary ">Selected Plan</h3>
                
              <div className=" px-5">
              <h6 className="text-lg font-bold">Order Placed On:  <span className=" text-sm  font-medium">Sunday 16 July 2023</span> </h6>
              <h6 className="text-lg font-bold">2023 Mercedes Benz C63s Amg</h6>
              <h6 className="text-lg font-bold">Feature Ad {selectedPlan?.label} </h6>
              <h6 className="text-lg font-bold">Price: QR. {newListings?.price_QR}</h6>
              <h6 className="text-lg font-bold">Note: No Prepayment Needed Now! You May Pay Our Representative Upon Their Visit</h6>
              </div>

              <div className="bg-primary flex justify-between pr-4 items-center py-1.5">
                <div></div>
                <div className="flex flex-col">
                  <p className="m-0 text-xl text-white font-semibold">
                    Total Price QR. {newListings?.price_QR}
                  </p>

                  <p className="flex gap-2 m-0 text-lg text-white">
                    <Input type={"checkbox"} /> I Agree To Terms & Conditions
                  </p>
                </div>
              </div>
            </div>

            <div className=" py-2">
              <h6 className=" h6">Important information</h6>
              <p> Terms & Conditions & policies apply.</p>
            </div>

            <h6 className=" h6 pt-3">
              Copyright © 2024 motorqe.com. All rights reserved.
            </h6>
          </div>
        </div>
      </div>

      <div className="container px-24 flex justify-between items-center mx-auto mt-10 mb-20">
        <div className="flex items-center gap-3">
          {/* <LiaLongArrowAltLeftSolid />
          <span className="text-textColor font-semibold">Back</span> */}
        </div>
        <div>
          {loading ? (
            <button
              disabled
              type="button"
              className="bg-primary font-bold rounded-3xl text-white w-44 py-2"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5538C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8442 15.1192 80.6517 10.723 74.7163 7.61258C68.7811 4.50211 62.2347 2.75939 55.4652 2.48568C48.6957 2.21197 41.9504 3.41767 35.7355 5.99857C33.2578 7.04184 32.383 9.85539 33.5204 12.2075C34.6579 14.5596 37.3928 15.4472 39.8706 14.4039C44.8064 12.4316 50.0035 11.7592 55.1112 12.0798C60.2189 12.4003 65.1544 13.6972 69.5075 16.021C73.8607 18.3447 77.5451 21.6324 80.3135 25.6394C82.6066 28.9126 84.3861 32.5836 85.5722 36.491C86.2977 38.8002 89.5423 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          ) : (
            <Button
              label="Submit"
              onClick={handlerSubmit}
              className="bg-primary font-bold rounded-3xl text-white w-44 py-2"
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FeaturedConfirmation;
