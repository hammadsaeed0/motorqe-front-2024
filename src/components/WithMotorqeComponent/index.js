import React from "react";
import Button from "../Button";

const WithMotorqeComponent = () => {
  const data = [
    {
      id: 1,
      image: require("../../assets/images/time.png"),
      title: "Selling Process",
      des: "80% of our Customers sell their car with in 2 weeks",
    },
    {
      id: 2,
      image: require("../../assets/images/find.png"),
      title: "Free Listing",
      des: "  List your Car for 30 days for free then sit back & we will find  you a potential buyer",
    },
    {
      id: 3,
      image: require("../../assets/images/compare.png"),
      title: "Compare cars",
      des: " Choosing your favourite Car is now easier with the new comparison feature",
    },
    {
      id: 4,
      image: require("../../assets/images/setting.png"),
      title: "Find a Garage ",
      des: " Looking to fix or service your Car? find your ideal garage now hassle free.",
    },
  ];
  return (
    <div>
      <h2 className=" h2  text-center">With Motorqe :</h2>

      <hr className=" m-0 border-b-2 w-64 border-primary mt-2 mx-auto" />

      <div className=" md:flex block   gap-7 mt-10 items-center">
        {data.map((item, index) => {
          return (
            <>
              <div className=" text-center  md:w-72 w-full">
                <div className=" ">
                  <img src={item.image} className=" mx-auto" alt="" />
                </div>
                <div className=" pt-6">
                  <h5 className="h5">{item.title}</h5>
                  <p className=" text-sm  text-[#6B778C]">{item.des} </p>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <Button
        label={"Sell your car now"}
        className={" bg-primary  text-white rounded-3xl py-2 mt-10 mx-auto"}
      />
    </div>
  );
};

export default WithMotorqeComponent;
