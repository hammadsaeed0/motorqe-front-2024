import React, { useState } from "react";
import Input from "../Input";
import { FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";
const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const [open, setOpen] = useState(false);

  const [language, setLanguage] = useState(false);

  const openLanguage = () => {
    setLanguage(!language);
  };

  const user = useSelector((state) => state.authReducer);

  console.log(user);

  return (
    <nav className="bg-white sticky z-40 top-0">
      <div className="flex items-center font-medium md:h-24 h-20  px-4 container mx-auto  justify-between">
        <div className="z-50  flex items-center justify-between">
          <div className=" flex justify-between gap-10 items-center">
            <img
              src={require("../../assets/images/logo.png")}
              className="object-contain md:w-[191px] w-[120px]"
              alt=""
            />
            <div className=" xl:block hidden">
              <Input
                Icon={<IoSearch size={20} className="  text-textColor" />}
                placeholder={"Search cars..."}
                className={
                  "border-[#0C53AB] border-2 py-2.5  font-normal  text-sm md:w-72 w-60 bg-white"
                }
              />
            </div>
          </div>
        </div>
        <div
          className="text-3xl lg:hidden  pt-2 z-50"
          onClick={() => setOpen(!open)}
        >
          <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
        </div>
        <ul className="lg:flex hidden uppercase items-center gap-8 font-[Poppins]">
          <li>
            <Link className="uppercase " to={"/"}>
              Home
            </Link>
          </li>
          {user?.userToken?._id ? (
            <li>
              <Link className="uppercase" to={"/garage-dashboard/my-account"}>
                Dashboard
              </Link>
            </li>
          ) : null}

          <li>
            <Link className="uppercase" to={"/"}>
              About Us
            </Link>
          </li>
          <li>
            <Link className="uppercase" to={"/new_lists"}>
              imported cars
            </Link>
          </li>

          <li>
            <Link className="uppercase" to={"/car_inspection"}>
              car services
            </Link>
          </li>
          <li>
            <Link className="uppercase " to={"/news"}>
              News
            </Link>
          </li>
          <li className="bg-orange-500 flex items-center gap-2  rounded-full py-2 px-4">
            <FaCar color="white" />
            <Link
              className="font-medium text-sm text-white capitalize"
              to={"/choose_plane"}
            >
              Sell My Car
            </Link>
          </li>

          {/* <li className=" relative">
            <button
              onClick={openLanguage}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              class="text-black bg-white  focus:ring-4 focus:outline-none focus:ring-[#0C53AB] font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
              type="button"
            >
              EN
              <svg
                class="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <!-- Dropdown menu -->
            {language === true ? (
              <div
                id="dropdown"
                class="z-10  absolute  top-12 border  -left-32 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <Link
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      EN
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      CH
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      UR
                    </Link>
                  </li>
                </ul>
              </div>
            ) : null}
          </li> */}
          {/* <NavLinks /> */}
        </ul>

        {/* Mobile nav */}
        <ul
          className={`
      lg:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0  leading-10  py-24 pl-4
      duration-500 ${open ? "left-0" : "left-[-100%]"}
      `}
        >
          <li>
            <Link className="uppercase font-medium" to={"/"}>
              Home
            </Link>
          </li>
          <hr />
          <li>
            <Link className="uppercase font-medium" to={"/car_inspection"}>
              About Us
            </Link>
          </li>
          <hr />
          <li>
            <Link className="uppercase font-medium" to={"/new_lists"}>
              Car
            </Link>
          </li>
          <hr />
          <li>
            <Link className="uppercase font-medium" to={"/news"}>
              News
            </Link>
          </li>
          <hr />
          <li className="bg-orange-500 flex   w-40 mt-3  items-center gap-2 rounded-2xl py-2 px-3">
            <FaCar color="white" />
            <Link
              className="font-medium text-sm text-white capitalize"
              to={"/choose_plane"}
            >
              Sell My Car
            </Link>
          </li>
          <li className=" relative mt-3">
            <button
              onClick={() => {
                setLanguage(true);
              }}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              class="text-black bg-white  focus:ring-4 focus:outline-none focus:ring-[#0C53AB] font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
              type="button"
            >
              EN
              <svg
                class="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {/* <!-- Dropdown menu --> */}
            {language === true ? (
              <div
                id="dropdown"
                class="z-10  absolute  top-12 border  left-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <Link
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      EN
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      CH
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      UR
                    </Link>
                  </li>
                </ul>
              </div>
            ) : null}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
