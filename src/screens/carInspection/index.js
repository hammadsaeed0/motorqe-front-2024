import React from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Header from "../../components/header";
import Footer from "../../components/footer";

const CarInspection = () => {
  return (
    <div>
      <Header />
      <section className=" bg-Inspection   h-auto py-14 bg-black  bg-cover bg-center">
        <div className="container md:flex block px-12 justify-between mx-auto items-center ">
          <div className=" md:w-[40%] w-[100%]">
            <h1 className=" text-4xl font-bold  text-white">
              Buy your next car with total peace of mind
            </h1>
            <p className=" text-white pt-10">
              Get a pre-purchase inspection so you can buy your next used car
              with confidence. We want to help you make sure the process is as
              risk-free as possible.
            </p>
          </div>
          <div className="md:w-[37%] w-[100%]">
            <div className=" bg-white  p-8 rounded-2xl">
              <div className=" text-center">
                <img
                  src={require("../../assets/images/logo.png")}
                  className=" mx-auto w-40"
                  alt=""
                />
                <h4 className="  text-xl py-4">
                  GET A CAR INSPECTED ANYWHERE IN THE UAE
                </h4>
                <p>
                  Kindly fill in the form below to schedule a pre-purchase car
                  inspection
                </p>
              </div>
              <div className=" mt-8 flex flex-col  gap-4">
                <Input
                  className={" border p-3 rounded-md w-full"}
                  placeholder={"Full Name"}
                />
                <Input
                  className={" border p-3 rounded-md w-full"}
                  placeholder={"Email"}
                />
                <Input
                  className={" border p-3 rounded-md w-full"}
                  placeholder={"Phone "}
                />
                <Input
                  className={" border p-3 rounded-md w-full"}
                  placeholder={"Type "}
                />
                <Input
                  className={" border p-3 rounded-md w-full"}
                  placeholder={"Price"}
                />
                <Button
                  label={"book inspection"}
                  className={
                    " w-full bg-lightBlue uppercase font-semibold py-2 rounded-md text-white"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" container  px-12 mx-auto py-10">
        <h3 className=" font-semibold text-3xl  text-gray-600">
          Why Autohub Car Inspection?
        </h3>
        <div className=" mt-8  grid md:grid-cols-2 grid-cols-1 gap-12">
          <div className=" rounded-2xl  text-center  shadow-xl p-8">
            <img
              src={require("../../assets/images/inspection 1.png")}
              className=" mx-auto"
              alt=""
            />
            <h5 className="h5 pt-5">Highly qualified inspectors</h5>
            <p className=" pt-5">
              Our team of trained professionals will inspect your car on over
              200+ checkpoints covering the exterior, interior, mechanical and
              electronics.
            </p>
          </div>
          <div className=" rounded-2xl  text-center  shadow-xl p-8">
            <img
              src={require("../../assets/images/checking 1.png")}
              className=" mx-auto"
              alt=""
            />
            <h5 className="h5 pt-5">Comprehensive mobile friendly report</h5>
            <p className=" pt-5">
              Once the inspection is done, our team will share an 8 page
              detailed digital inspection report through email or whatsapp.
            </p>
          </div>
          <div className=" rounded-2xl  text-center shadow-xl p-8">
            <img
              src={require("../../assets/images/pin 1.png")}
              className=" mx-auto"
              alt=""
            />
            <h5 className="h5 pt-5">
              Car Inspection from Anywhere in the world
            </h5>
            <p className=" pt-5">
              Inspect your car from anywhere in the world with the best and most
              convenient facilities.
            </p>
          </div>
          <div className=" rounded-2xl  text-center shadow-xl p-8">
            <img
              src={require("../../assets/images/analytics 1.png")}
              className=" mx-auto"
              alt=""
            />
            <h5 className="h5 pt-5">
              Car Inspection from Anywhere in the world
            </h5>
            <p className=" pt-5">
              Inspect your car from anywhere in the world with the best and most
              convenient facilities.
            </p>
          </div>
        </div>
      </section>

      <section className=" container mx-auto  px-12 py-10">
        <h3 className=" font-semibold text-3xl  text-gray-600">
          What does it cover?
        </h3>

        <div className=" rounded-2xl  mt-8 border shadow-xl relative">
          <ul className=" mt-12 leading-10">
            <li className=" font-normal text-base py-2 border-t px-10">
              Vehicle Information
            </li>
            <li className=" py-2 border-t px-10">Computer diagnostic report</li>
            <li className=" py-2 border-t px-10">
              Vehicle specifications report
            </li>
            <li className=" py-2 border-t px-10">Battery diagnostic report</li>
            <li className=" py-2 border-t px-10">
              Interior / Exterior condition check
            </li>
            <li className=" py-2 border-t px-10">Under body examination</li>
            <li className=" py-2 border-t px-10">Brake system, rims & tires</li>
            <li className=" py-2 border-t px-10">Up to 50 photos</li>
            <li className=" py-2 border-t px-10">Engine</li>
            <li className=" py-2 border-t px-10">1 Video (2 - 3 minutes)</li>
            <li className=" py-2 border-t px-10">Test Drive (if allowed)</li>
            <li className=" py-2 border-t px-10">TElectrical system</li>
            <li className=" py-2 border-t px-10">Inspector summary</li>
            <li className=" py-2 border-t px-10">
              Comprehensive 248+ point inspection
            </li>
          </ul>

          <img
            src={require("../../assets/images/ins.png")}
            className=" sm:block hidden  h-full absolute top-0 right-0"
            alt=""
          />
        </div>
      </section>

      <section className=" container mx-auto md:flex block justify-between  px-12 py-10">
        <div className=" md:w-[40%] w-[100%]">
          <h3 className=" font-semibold text-3xl  text-gray-600">
            Fast Report Service
          </h3>
          <img
            src={require("../../assets/images/fast 1.png")}
            className=" py-6  mx-auto"
            alt=""
          />
          <p>
            Receive your report within 6 hours, right after the inspection has
            been processed. We provide you with the data you need to negotiate a
            fair price & purchase with 100% confidence.
          </p>

          <Button
            label={"View  Sample Inspection Report"}
            className={
              "  border border-lightBlue rounded-md  mt-4 py-2 text-lightBlue font-bold"
            }
          />
        </div>
        <div className=" md:w-[35%] w-[100%]">
          <img
            src={require("../../assets/images/mechanic-holding-digital-tablet 2.png")}
            alt=""
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CarInspection;
