import React, { useState } from "react";
import HomeBanner from "../../components/HomeBanner";
import SearchComponents from "../../components/SearchComponents";
import Accordion from "../../components/Accordion/Accordion";
import Button from "../../components/Button";
import SearchForCar from "../../components/SearchForCar";
import PopularShowRooms from "../../components/PopularShowRooms";
import transition from "../../transition";
import Header from "../../components/header";
import Footer from "../../components/footer";
import FeaturedCars from "../../components/FeaturedCars";
import WithMotorqeComponent from "../../components/WithMotorqeComponent";

const Home = () => {
  const [accordions, setAccordion] = useState([
    {
      key: 1,
      title: "What services does Motorqe provide?",
      data: "Motorqe provides services that make car buying and selling easy, fast, and seamless in Qatar. If you want to sell your car, you can list it on our website and you will get its best value. Along with advertising your car, we can also help you navigate through the entire",
      isOpen: false,
    },
    {
      key: 2,
      title:
        "How do I make a payment on the website? What payment methods are available?",
      data: "Motorqe provides services that make car buying and selling easy, fast, and seamless in Qatar. If you want to sell your car, you can list it on our website and you will get its best value. Along with advertising your car, we can also help you navigate through the entire",
      isOpen: false,
    },
    {
      key: 3,
      title: "Is the payment refundable if I wish to cancel my purchase?",
      data: "Motorqe provides services that make car buying and selling easy, fast, and seamless in Qatar. If you want to sell your car, you can list it on our website and you will get its best value. Along with advertising your car, we can also help you navigate through the entire",
      isOpen: false,
    },
    {
      key: 4,
      title: "How do I search for a vehicle of my choice?",
      data: "Motorqe provides services that make car buying and selling easy, fast, and seamless in Qatar. If you want to sell your car, you can list it on our website and you will get its best value. Along with advertising your car, we can also help you navigate through the entire",
      isOpen: false,
    },
    {
      key: 5,
      title: "What should I keep in mind when viewing a vehicle?",
      data: "Motorqe provides services that make car buying and selling easy, fast, and seamless in Qatar. If you want to sell your car, you can list it on our website and you will get its best value. Along with advertising your car, we can also help you navigate through the entire",
      isOpen: false,
    },
    {
      key: 6,
      title: "Is the price mentioned on the Ad negotiable?",
      data: "Motorqe provides services that make car buying and selling easy, fast, and seamless in Qatar. If you want to sell your car, you can list it on our website and you will get its best value. Along with advertising your car, we can also help you navigate through the entire",
      isOpen: false,
    },
    {
      key: 7,
      title: "How long will it take you to sell my vehicle?",
      data: "Motorqe provides services that make car buying and selling easy, fast, and seamless in Qatar. If you want to sell your car, you can list it on our website and you will get its best value. Along with advertising your car, we can also help you navigate through the entire",
      isOpen: false,
    },
    {
      key: 8,
      title: "How do I ensure maximum response on my listings?",
      data: "Motorqe provides services that make car buying and selling easy, fast, and seamless in Qatar. If you want to sell your car, you can list it on our website and you will get its best value. Along with advertising your car, we can also help you navigate through the entire",
      isOpen: false,
    },
    {
      key: 9,
      title: "How do I ensure maximum response on my listings?",
      data: "Motorqe provides services that make car buying and selling easy, fast, and seamless in Qatar. If you want to sell your car, you can list it on our website and you will get its best value. Along with advertising your car, we can also help you navigate through the entire",
      isOpen: false,
    },
    {
      key: 10,
      title: "How do I ensure maximum response on my listings?",
      data: "Motorqe provides services that make car buying and selling easy, fast, and seamless in Qatar. If you want to sell your car, you can list it on our website and you will get its best value. Along with advertising your car, we can also help you navigate through the entire",
      isOpen: false,
    },
  ]);

  const toggleAccordion = (accordionkey) => {
    const updatedAccordions = accordions.map((accord) => {
      if (accord.key === accordionkey) {
        return { ...accord, isOpen: !accord.isOpen };
      } else {
        return { ...accord, isOpen: false };
      }
    });

    setAccordion(updatedAccordions);
  };

  return (
    <div>
      <Header />
      <HomeBanner />
      <div className=" -translate-y-[75px]">
        <div className=" w-[90%]  mx-auto">
          <SearchComponents />
        </div>
      </div>

      <div className=" container  mx-auto px-10">
        <WithMotorqeComponent />
      </div>

      <SearchForCar />

      <div className=" mt-28 mb-9 ">
       <div className="md:px-12 px-6">
       <h2 className=" h2  text-center">Featured cars in Qatar:</h2>

<hr className=" m-0 border-b-2 w-64 border-primary mt-2 mx-auto" />
<p className=" text-center py-10">
  You will find your favourite cars on our website including Jaguar,
  Porsche, Mercedes, BMW, Ford, and many others. Have a look at our
  featured cars and check their price, specifications, and pictures to
  find your ideal car.
</p>
<div className=" scroll-container  flex  gap-1 md:justify-center justify-start  items-center productOverflow  overflow-x-auto whitespace-nowrap">
  <Button
    label={"Featured Cars"}
    className={
      "border-2 bg-secondary py-2 sm:text-base text-sm text-white border-primary rounded-lg font-semibold w-48"
    }
  />
  <Button
    label={"Recently Added Cars"}
    className={
      "border-2 bg-white py-2  text-secondary sm:text-base text-sm border-primary rounded-lg font-bold"
    }
  />
</div>
       </div>

        <FeaturedCars />
      </div>


      <div className=" md:mt-28  mt-0 mb-9 px-10">
        <h2 className=" h2  text-center">Popular Showrooms & Dealers:</h2>

        <hr className=" m-0 border-b-2 w-64 border-primary mt-2 mx-auto" />
        <PopularShowRooms />

        <div className=" mt-12">
          <Button
            label={"View Less"}
            className={
              " border-2  md:float-end float-none mx-auto rounded-3xl border-primary w-48 text-secondary font-bold py-1.5"
            }
          />
        </div>
      </div>

      <div className=" mx-auto container  py-14  md:px-10 px-6 ">
        <h1 className=" pb-10 text-center  font-bold  text-4xl">FAQs</h1>
        {accordions.map((accordion) => (
          <Accordion
            key={accordion.key}
            title={accordion.title}
            data={accordion.data}
            isOpen={accordion.isOpen}
            toggleAccordion={() => toggleAccordion(accordion.key)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default transition(Home);
