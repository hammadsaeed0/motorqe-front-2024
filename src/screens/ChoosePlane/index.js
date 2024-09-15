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
 
  const userId = JSON.parse(localStorage.getItem("userToken"));
  console.log(userId);
  const selectPackage = (item) => {
    if (!userId) {
      toast.error("Please register an account first.");
      navigate("/register");
      // dispatch(setUserPlan(item));
    } else {


      const params = {
        userId:userId,
        planId:item?._id
      }

          axios.post(`${Base_url}/user/enroll`,params).then((res)=>{
        if(res.data.success===true){
          toast.success("Plan added successfully");
          navigate("/car_details");
    
          console.log(res);
          
          dispatch(setUserPlan(res?.data?.data));
        }else{
         
        }
     
       
     }).catch((error)=>{

      console.log(error);
       if(error?.response?.data?.success===false){
        toast.error(error?.response?.data?.message)
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
                    <h1 className=" text-secondary text-center text-xl pt-3 font-bold">{`{x10 more Views & Calls}`}</h1>
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

<h1 className=" text-secondary text-center text-xl pt-3 font-bold">{`{x10 more Views & Calls}`}</h1>
                     </>
                    ) : null}
                        

                       
                      </ul>

                      <Button
                        label={"Select Package"}
                        // onClick={() => selectPackage(item)}
                        onClick={()=>selectPackage(item)}
                        className={
                          " bg-primary absolute py-2  bottom-12 mx-auto rounded-3xl w-72 text-white"
                        }
                      />
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
