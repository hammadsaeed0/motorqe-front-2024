import axios from "axios";
import React, { useEffect, useState } from "react";
import { Base_url } from "../../utils/Base_url";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  const [banner, setBanner] = useState([]); // Initialize banner as an array

  useEffect(() => {
    axios
      .get(`${Base_url}/user/header-image`)
      .then((res) => {
        console.log(res);

        // Ensure res?.data?.data is an array, if it's an object, wrap it in an array
        const bannerData = Array.isArray(res?.data?.data)
          ? res?.data?.data
          : [res?.data?.data];
        setBanner(bannerData); // Set banner as an array
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    // <div className="bg-Hero  flex items-center justify-center   bg-cover bg-center   bg-no-repeat   w-[100%]  lg:h-[130vh] md:h-[100vh]  sm:h-[90vh]   h-[70vh]">
    //   <div className=" w-[85%]">
    //     <h1 className=" h1 main_title ">
    //       {" "}
    //       Sell or Buy a Car in Qatar Hassle <br />
    //       free within your own comfort{" "}
    //     </h1>
    //   </div>
    // </div>


    

    <div className="relative">
      {/* <img src={require('../../assets/images/isolated_tablet_laptop_and_smartphone_composition 1.png')} alt="" /> */}

      {banner?.map((item,index)=>{
        return (
          <Link to={`${item?.redirectUrl}`}>
           <img src={item?.imageUrl} alt="" /> 
          </Link>
           

        )
      })}

      <div className=" -translate-y-[100px] md:-translate-y-40 -translate-x-12 transform  flex  justify-end">
         <div>
          <h1 className=" md:text-3xl text-sm text-primary font-bold">Qatar's # 1 Site to Buy & Sell New & UsedCars</h1>
          <div className=" flex justify-end "> 
        <div>
        <h1 className=" uppercase text-center  pt-3 font-bold sm:text-xl text-sm">download the app now</h1>
        <div className="   pt-3 flex  justify-end gap-3">
        <Link to={`https://www.apple.com/app-store/`}>
        <img src={require('../../assets/images/App Store.png')} className=" md:w-44 w-20" />
      </Link>
      <Link to={'https://play.google.com/'}>
        <img src={require('../../assets/images/Google Play.png')} className="md:w-44 w-20"  />
      </Link>
        </div>
        </div>
        </div>
         </div>
      </div>
    </div>
  );
};

export default HomeBanner;
