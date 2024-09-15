import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import list  from "../../../../assets/images/list.png"
import vector from '../../../../assets/images/Vector.png';
import announcement from '../../../../assets/images/announcement.png'
import group  from  '../../../../assets/images/group.png';
import eyeicon from "../../../../assets/icons/eyeicon.png"
import insight from  "../../../../assets/icons/insight.png"
import btnclick from  "../../../../assets/icons/btnclicks.png"
import blackeye from  "../../../../assets/icons/blackeye.png"
import whatsapp from  "../../../../assets/icons/whatsapp.png"
import phone from  "../../../../assets/icons/phone.png"
import message from  "../../../../assets/icons/message.png"
import share from  "../../../../assets/icons/share.png"
import devices from  "../../../../assets/icons/devices.png"
import desktop from  "../../../../assets/icons/desktop.png"
import mobile from  "../../../../assets/icons/mobile.png"
import LineChart from "./graph"
import Header from '../../../../components/header';
import Footer from '../../../../components/footer';
import DashboardNavbar from '../../NavBAr/DashboardNavbar';
const Input = ({ Icon, ...props }) => {
  return (
    <div className="relative flex items-center">
      <input {...props} />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        {Icon}
      </div>
    </div>
  );
};

const MyAccount = () => {
  return (
   <>
    <Header/>
    <DashboardNavbar/>
    <div className="flex flex-col items-center  mb-4">
      <div className="mt-16 flex items-center justify-between w-[90%]">
        <h1 className="font-inter text-3xl font-semibold leading-10 tracking-normal text-left">
          Welcome, Elite!
        </h1>
        <div className="relative">
          {/* Search Bar */}
          <Input
            Icon={<RiArrowDropDownLine className="size-7" />}
            placeholder="Filter by listing..."
            className="border-[#D2D2D2] border-2 md:w-50 w-60 pr-10"
          />
        </div>
      </div>
        {/* ----------------- blue cards ----------------- */}
      <div class="w-[90%] h-[215px] top-499px left-112px gap-[35px] flex mb-2 mt-[99px]">
        <div class="w-[332px] h-[215px] px-15 py-34 border-20 rounded-xl justify-between flex" style={{ backgroundColor: "#0C53AB" }}>
          <div className=" text-white mx-[15px] mt-[54px] relative">
              <h1 className='font-inter font-bold text-4xl '>104</h1>
              <p className='text-18'>101 Published Listings</p> 
          </div>
          <img src={list} className='w-[72px] h-[72px] top-5 mt-[54px] mr-2'></img>
        </div>

        <div class="w-[332px] h-[215px] px-15 py-34 border-20 rounded-xl justify-between flex" style={{ backgroundColor: "#0C53AB" }}>
          <div className=" text-white mx-[15px] mt-[54px] relative">
              <h1 className='font-inter font-bold text-4xl '>104</h1>
              <p className='text-18'>101 Published Listings</p> 
          </div>
          <img src={vector} className='w-[72px] h-[72px] top-5 mt-[54px] mr-2'></img>
        </div>

        <div class="w-[332px] h-[215px] px-15 py-34 border-20 rounded-xl justify-between flex" style={{ backgroundColor: "#0C53AB" }}>
          <div className=" text-white mx-[15px] mt-[54px] relative">
              <h1 className='font-inter font-bold text-4xl '>104</h1>
              <p className='text-18'>101 Published Listings</p> 
          </div>
          <img src={announcement} className='w-[72px] h-[72px] top-5 mt-[54px] mr-2'></img>
        </div>

        <div class="w-[332px] h-[215px] px-15 py-34 border-20 rounded-xl justify-between flex" style={{ backgroundColor: "#0C53AB" }}>
          <div className=" text-white mx-[15px] mt-[54px] relative">
              <h1 className='font-inter font-bold text-4xl '>104</h1>
              <p className='text-18'>101 Published Listings</p> 
          </div>
          <img src={group} className='w-[72px] h-[72px] top-5 mt-[54px] mr-2'></img>
        </div>       
      </div>
          {/* --------------------------------------------------------------------------- */}
             
          <div className='md:flex block justify-between w-[90%] mt-24' >
             {/* ----------Left box------------ */}

             <div className='flex flex-col gap-3'>
                           {/* ____Box--1____ */}
            <div class="w-[350px] h-[150px]  border-5 border border-solid border-[#F0E9E9] rounded-20  bg-[#F3F3F5] rounded-[20px]">
              <div className='flex gap-2 items-center mx-[20px] my-[20px]'>
                <img src={eyeicon} className='h-[34px] w-[34px]' ></img>
                <strong className='text-[#0C0CB8]'>Views</strong>
              </div>
                
            <div className='flex ml-6 justify-between mr-6'>
              <div className='text-[#0C0CB8] text-base flex-col gap-7' > 
                <img src={insight} alt="" />
                <strong>254</strong>
                <p>Last 24 hours</p>
              </div>

              <div className='text-[#0C0CB8]  flex-col gap-7' > 
                <img src={insight} alt="" />
                <strong>254</strong>
                <p>Last 24 hours</p>
              </div>

              <div className='text-[#0C0CB8]  flex-col gap-7' > 
                <img src={insight} alt="" />
                <strong>254</strong>
                <p>Last 24 hours</p>
              </div>
          </div>
           </div>
                           {/* ____Box--2____ */}
              <div class="w-[350px] h-[210px]  border-5 border border-solid border-[#F0E9E9] rounded-20  bg-[#F3F3F5] rounded-[20px]">
              <div className='flex gap-2 items-center mx-[20px] mt-[10px]'>
                <img src={btnclick} className='h-[34px] w-[34px]' ></img>
                <strong className='text-[#484848]'>Button Clicks</strong>
              </div>
              <span className=' mx-[20px]'>Showrooms</span>
        
              <div className='ml-6 mr-6 justify-between flex-col'>  
                  <div className='text-[#0C0CB8] flex items-center gap-3 mt-1'>
                      <img src={blackeye} alt="" />
                      <p className='text-sm'>Views (27 clicks)</p>
                  </div>

                  <div className='text-[#0C0CB8] flex items-center gap-3 mt-1'>
                      <img src={whatsapp} alt="" />
                      <p className='text-sm'>whatsapp (127 clicks)</p>
                  </div>

                  <div className='text-[#0C0CB8] flex items-center gap-3 mt-1'>
                      <img src={phone} alt="" />
                      <p className='text-sm'>Call (335 clicks)</p>
                  </div>

                  <div className='text-[#0C0CB8] flex items-center gap-3 mt-1'>
                      <img src={message} alt="" />
                      <p className='text-sm'>Message (435 clicks)</p>
                  </div>

                  <div className='text-[#0C0CB8] flex items-center gap-3 mt-3'>
                      <img src={share} alt="" />
                      <p className='text-sm'>Share (635 clicks)</p>
                  </div>

              </div>

              </div>
                           {/* ____Box--3____ */}
        <div class=" mb-2 w-[350px] h-[135px]  border-5 border border-solid border-[#F0E9E9] rounded-20  bg-[#F3F3F5] rounded-[20px]">
        <div className='flex gap-2 items-center mx-[20px] my-[20px]'>
        <img src={devices} className='h-[34px] w-[34px]' ></img>
        <strong className='text-[#484848]'>Button Clicks</strong>
        </div>
        
        <div className='ml-6 mr-6 justify-between flex-col'>  
            <div className='text-[#0C0CB8] flex items-center gap-3 mt-3'>
                <img src={desktop} alt="" />
                <p className='text-sm'>Views (27 clicks)</p>
            </div>

            <div className='text-[#0C0CB8] flex items-center gap-3 mt-3'>
                <img src={mobile} alt="" />
                <p className='text-sm'>whatsapp (127 clicks)</p>
            </div>
      </div>

           </div>
           </div>
            {/* ----------right box with graph------------ */}
           <div className=''>
           <LineChart />
           </div>
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default MyAccount;
