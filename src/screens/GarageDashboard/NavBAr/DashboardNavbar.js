import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../store/reducers/authReducer";
import { toast } from "react-toastify";
const DashboardNavbar = () => {
  const [menuItems] = useState([
    { label: "My Account", path: "/dashboard/my-account" },
    { label: "My Garage", path: "/dashboard/my-garage" },
    { label: "My Inbox", path: "/dashboard/my-inbox" },
    { label: "Favourite Cars", path: "/dashboard/favourite-cars" },
    { label: "Garage Bookings", path: "/dashboard/garage-bookings" },
    { label: "Account Details", path: "/dashboard/account-details" },
  ]);


  const navigate = useNavigate()
  const location = useLocation();

  const dispatch = useDispatch();
  const Logout = () => {
    dispatch(logout("userToken"));
    toast.success('User logout successfully!')
      navigate('/')
  };

  return (
    <>
      <header className="bg-white sticky z-40 top-0 ">
        <div className=" mx-auto flex justify-between items-center">
          {/* Menu items */}
          <div className="w-full h-[105px] top-[187px] px-[40px] pb-[40px] border-t border-solid  justify-between border-b-4 border-[#F3EDED]">
            <ul className="w-full mt-6 flex items-center text-indigo-800 justify-between h-[104px]">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`w-full text-center h-14 text-sm font-inter font-semibold leading-6 tracking-wider pb-1 ${
                    location.pathname === item.path
                      ? "text-[#FB5722]"
                      : "text-gray-600"
                  } border-b-4 ${
                    location.pathname === item.path
                      ? "border-[#FB5722]"
                      : "border-[#F3EDED]"
                  }`}
                >
                  <Link
                    to={item.path}
                    className={`${
                      location.pathname === item.path
                        ? " text-primary"
                        : " text-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li
                onClick={Logout}
                className={`w-full text-center h-14 text-sm font-inter font-semibold leading-6 tracking-wider pb-1 `}
              >
                <Link className=" text-secondary">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardNavbar;
