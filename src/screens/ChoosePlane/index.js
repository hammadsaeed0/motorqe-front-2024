import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useFetchPlanQuery } from "../../store/services/planService";
import { useDispatch, useSelector } from "react-redux";
import { setUserPlan } from "../../store/reducers/planReducer";
import Loader from "../../components/Loader";
import axios from "axios";
import { Base_url } from "../../utils/Base_url";
const ChoosePlane = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isFetching } = useFetchPlanQuery();
 console.log(data);
 const [loading,setLoader] = useState(null);
  const userId = JSON.parse(localStorage.getItem("userToken"));
  console.log(userId);
  const selectPackage = (item) => {
    console.log(item);
    
    if (!userId) {
      toast.error("Please register an account first.");
      navigate("/register");
      // dispatch(setUserPlan(item));
    } else {
     
      setLoader(item?._id);

      const params = {
        userId:userId,
        planId:item?._id
      }

          axios.post(`${Base_url}/user/enroll`,params).then((res)=>{
        if(res.data.success===true){
          toast.success("Plan added successfully");
          navigate("/car_details");
          localStorage.setItem('planData', JSON.stringify(item));
          setLoader(false)
          console.log(res.data);
          
          dispatch(setUserPlan(res?.data));
        }else{
          setLoader(false)
        }
     
       
     }).catch((error)=>{

      console.log(error);
       if(error?.response?.data?.success===false){
        toast.error(error?.response?.data?.message)
        setLoader(false);
       }else{

       } 
      

     })


     
      
    }
  };




  
  return (
    <>
      <Header />

      <div className=" py-10 container mx-auto">
        <h2 className="  text-4xl  font-semibold text-textColor pb-7 text-center">
          Choose a Plan
        </h2>
        <div className=" flex gap-4 justify-center">
          {!isFetching ? (
            data?.data?.map((item, index) => {
              return (
                <>
                  <div className=" rounded-3xl relative  w-96 h-[650px] py-8 bg-gray-100">
                    <div className=" text-center">
                    {item?.name === "Silver" ? (
                      <img
                        src={require("../../assets/images/plane3.png")}
                        className="w-24 mx-auto"
                        alt="Silver Plan"
                      />
                    ) : item?.name === "Gold" ? (
                      <img
                        src={require("../../assets/images/plane2.png")}
                        className="w-24 mx-auto"
                        alt="Gold Plan"
                      />
                    ) : item?.name === "Platinum" ? (
                      <img
                        src={require("../../assets/images/plane1.png")}
                        className="w-24 mx-auto"
                        alt="Platinum Plan"
                      />
                    ) : null}

                      <h1 className=" text-primary uppercase text-3xl font-bold my-2">
                        {item?.name}
                        
                      </h1>
                    </div>

                    <hr />
                    <div className=" py-8 px-12">
                      <ul className=" leading-9">
                        <li className=" flex gap-2  pt-2 items-center">
                          <FaCheckCircle color="" className=" text-primary" />
                          <p className=" text-sm font-semibold text-textColor">
                            {/* Upload up to 5 Photos{" "} */}
                            Upload up to {item?.maxImages} Photos{" "}
                          </p>
                        </li>
                        <li className=" flex pt-2 gap-2 pt-4">
                          <div>
                          <FaCheckCircle color="" className=" text-primary" />
                          </div>
                          <p className=" text-sm font-semibold text-textColor">
                            {item?.maxCars} Cars may be active on this package{" "}
                          </p>
                        </li>
                        <li className=" pt-2 flex gap-2 items-center">
                          <FaCheckCircle color="" className=" text-primary" />
                          <p className=" text-sm font-semibold text-textColor">
                            {item?.listingDuration} Days Active Listing
                            {/* 5 Days Active Listing */}
                          </p>
                        </li>

                        {item?.name === "Silver" ? (
                      <>
                      </>
                    ) : item?.name === "Gold" ? (
                      <>
                      <li className=" flex gap-2 pt-4">
                      <div>
                      <FaCheckCircle color="" className=" text-primary" />
                      </div>
                      <p className=" font-semibold text-sm text-textColor">
                        {item?.refreshBoost                        } Booster every  weeks to refresh your ad whenever during the 45 Days.
                        {/* 5 Days Active Listing */}
                      </p>
                    </li>
                    <div className=" absolute bottom-32">
                    <h1 className=" text-secondary text-center  text-xl pt-3 font-bold">{`{x10 more Views & Calls}`}</h1>
                    </div>
                    
                      </>
                    ) : item?.name === "Platinum" ? (
                     <>
                      <li className=" flex gap-2 pt-4">
                      <div>
                      <FaCheckCircle color="" className=" text-primary" />
                      </div>
                      <p className=" font-semibold text-sm text-textColor">
                        {item?.refreshBoost                        } Booster every 2 weeks to refresh your ad whenever during the 45 Days (One of our members will contact you instantly to take pics & upload them)
                        {/* 5 Days Active Listing */}
                      </p>
                    </li>

                    <div className=" absolute bottom-32">
                    <h1 className=" text-secondary text-center  text-xl pt-3 font-bold">{`{x10 more Views & Calls}`}</h1>
                    </div>
                     </>
                    ) : null}
                        

                       
                      </ul>
                       {loading=== item?._id?
                      <button
                      disabled
                      type="button"
                      className="bg-primary absolute py-2  bottom-12 mx-auto rounded-3xl w-72 text-white"
                    >
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 me-3 text-black animate-spin"
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
                    </button>:
                    
                    <Button
                    label={"Select Package"}
                    onClick={()=>selectPackage(item)}
                    className={
                      " bg-primary absolute py-2  bottom-12 mx-auto rounded-3xl w-72 text-white"
                    }
                  />
                      
                      }
                     
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <Loader />
          )} 
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChoosePlane;
