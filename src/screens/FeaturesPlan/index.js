import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import Button from "../../components/Button";
import { Base_url } from "../../utils/Base_url";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { feature } from "../../assets/images/images";

const FeaturedPlan = () => {
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoader] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  console.log(selectedPlan,'selected Plan....');
  
  const [minutes, setMinutes] = useState(0);
  console.log(minutes);
  
  const navigate = useNavigate();
  const handlerSubmit = (e) => {

    if (!selectedPlan) {
        toast.error('Please select a duration for the plan.');
      } else {
        setLoader(true);
        navigate('/FeaturedConfirmation', {
          state: { selectedPlan,minutes,id},
        });
      }

    
  };


  const [newListings, setNewListings] = useState({});


  useEffect(() => {
    axios
      .get(`${Base_url}/user/single-car/${id}`)
      .then((res) => {
        console.log(res);
        setNewListings(res?.data?.data);
       
      })
      .catch((error) => {});

    
  }, []);

  // Define the available plans
  const plans = [
    { id: 1, label: "7 Days", price: "QR 1001", days: 7 },
    { id: 2, label: "14 Days", price: "QR 1001", days: 14 },
    { id: 3, label: "30 Days", price: "QR 1001", days: 30 },
    { id: 4, label: "1 Week Homepage", price: "QR 1001", days: 7 },
  ];

  // Handle plan selection and calculate minutes
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setMinutes(plan.days * 24 * 60); 
  };

  return (
    <div>
      <Header />
      <div className="py-8 text-center">
        <h2 className="h2 text-center">Featured Plan </h2>
        <p className="pt-2 text-gray-400">
          Sell your car in seconds with just a few clicks
        </p>
      </div>

      <div className="py-8">
        <ul className="flex gap-8 justify-center items-center">
          <li className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary items-center rounded-full flex justify-center">
              <p className="text-white">1</p>
            </div>
            <div>
              <span className="text-primary font-semibold">
                Select Type Of Ad
              </span>
            </div>
          </li>

          <li>
            <FaAngleRight size={20} className="text-[#757272]" />
          </li>
          <li className="flex items-center gap-2">
            <div className="w-10 h-10 items-center text-[#757272] border border-[#757272] rounded-full flex justify-center">
              <p className="text-[#757272]">2</p>
            </div>
            <div>
              <span className="text-[#757272] font-semibold">Confirm</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="pb-12 shadow-md rounded-xl mt-8 py-5 px-12 mx-auto w-[80%]">
        <div className="bg-[#FEFBFB] border rounded-lg mt-4 p-5">
          <div className="bg-[#FEFBFB] rounded-lg p-5">
            <div className="">
              <h2 className="h3 text-center">Select Featured Ad</h2>
            </div>

            <div className="pt-8">
              <h3 className="text-secondary text-xl">{newListings?.garageName}</h3>
              <p className="text-xl">{newListings?.address}</p>

              <h6 className="text-xl font-bold">2023 Mercedes Benz C63s Amg</h6>
              <h6 className="text-xl font-bold">Mileage: {newListings?.mileage} Kms</h6>
              <h6 className="text-xl font-bold">Price: QR. {newListings?.price_QR}</h6>
            </div>

            <div className="py-3">
              <ul className="flex justify-center flex-col gap-5">
                {plans.map((plan) => (
                  <li
                    key={plan.id}
                    className={`${
                      selectedPlan?.id === plan.id ? "bg-primary" : "bg-secondary"
                    } rounded-md mx-auto py-1 w-64 cursor-pointer`}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    <img src={feature} className="mx-auto h-5" alt="Icon" />
                    <p className="m-0 text-xs text-white text-center">
                      {plan.label} {plan.price}
                    </p>
                  </li>
                ))}
              </ul>
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
          </div>
        </div>
      </div>

      <div className="container px-24 flex justify-between items-center mx-auto mt-10 mb-20">
        <div className="flex items-center gap-3">
          {/* <LiaLongArrowAltLeftSolid />
          <span className="text-textColor font-semibold">Back</span> */}
        </div>
        <div>
          {loading? (
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
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5538C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8442 15.1192 80.6517 10.723 74.7163 7.61258C68.7811 4.50211 62.2347 2.75939 55.4652 2.48568C48.6957 2.21196 41.9509 3.41726 35.735 6.01125C32.3177 7.32581 31.0174 11.1001 32.6538 14.0326C34.2903 16.9651 38.0207 18.235 41.3444 16.8165C45.8706 14.9045 50.6313 14.2605 55.3324 14.9356C60.0336 15.6108 64.5118 17.5906 68.3177 20.6935C71.4201 23.1222 73.8744 26.2935 75.5076 29.906C76.7185 32.7197 79.5423 34.4234 82.2665 33.7798C84.991 33.1362 86.6252 30.5154 86.0189 27.6703Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          ) : (
            <Button label="Next" className={' bg-primary text-white py-2  w-44  rounded-full'} onClick={handlerSubmit} />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FeaturedPlan;
