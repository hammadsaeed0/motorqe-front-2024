import React, { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import {unread,sent,received,threedots,bluewhatsap,phone,smily,thumb, receiverimg} from '../.././../../assets/icons/icons'
import {inbox,senderimg} from '../.././../../assets/images/images'
import Dropdown from './optionModal'; 
import ChartCards from './chartCards';
import Input from '../../../../components/Input';
import Header from '../../../../components/header';
import Footer from '../../../../components/footer';
import DashboardNavbar from '../../NavBAr/DashboardNavbar';

const Inbox = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
    <Header/>
    <DashboardNavbar/>
    <div className="flex flex-col items-center  mb-4">
      <div className="mt-16 flex items-center justify-between w-[90%]">
        <h1 className="font-inter text-3xl font-semibold pb-5 text-left">
        Inbox:
        </h1>   
      </div>

    {/* --------------------------------- main product card -------------------------------------- */}   
    <div className="w-[90%]">
             {/* main div */}
  <div className="ring ring-[#FB5722]  rounded-[15px] mt-4"> 
                   {/* Chat Header */}
    <div className=' flex justify-between h-[75px] w-[100%] bg-gray-50  rounded-tl-[15px] rounded-tr-[15px] ring-1 ring-[#FB5722] '>
       {/*Chat  Header Left Side */}
        <div className='ring-1 ring-[#FB5722] bg-[#F3F3F5] w-[35%] flex justify-around items-center rounded-tl-[15px]'>
        <div><div className='h-[30px]  flex'>
        <img src={inbox} alt="inbox" className='h-5' />
        <p className='font-bold text-[#FB5722] items-center'>Inbox</p>
        </div><div className='border-b border-[#FB5722] w-[55px] relative pt-1 ml-1'></div>
        </div>

        <div className='flex'>
        <img src={sent} alt="inbox" className='h-5' /><p className='text-20 font-semibold tracking-wider text-left text-[#0C0CB8]'>Sent</p>
        </div>

        <div className='flex'>
        <img src={unread} alt="inbox" className='h-5' /><p className='text-20 font-semibold tracking-wider text-left text-[#0C0CB8]'>Unread</p>
        </div>
    
       
       </div>
       {/*Chat  Header Right Side */}
       <div className='ring-1 ring-[#FB5722] bg-[#F3F3F5] w-[65%] flex justify-between items-center rounded-tr-[15px]'>
          
          <div className='flex'>
            <div className='p-2'><img src={senderimg} className=' h-16'></img></div>
            <div  className=''>
            <strong className='text-20 font-semibold leading-24 tracking-wider text-left'>BMW 3 Series</strong>
            <p className='text-20 text-[#686464] font-semibold leading-24 tracking-wider text-left'>QR 130,000</p>
            <p class="font-inter text-[#686464] text-base font-normal leading-6 tracking-wider text-left">Mileage : 13 km/l</p>
          </div>

        
          </div> 
          <div className='flex gap-1 mr-4'>
            <div className='p-2'><img src={bluewhatsap} className=' h-6'></img></div>
            <div className='p-2'><img src={phone} className=' h-6'></img></div>
            <div className='p-2'>
              <button onClick={toggleDropdown} className="relative">
                <img src={threedots} onClick={toggleDropdown}  className=' h-6'></img> 
                  {isDropdownOpen && (
                    <Dropdown isOpen={isDropdownOpen} onClose={() => setDropdownOpen(false)} />
                  )}
              </button> </div>
        
          </div>

     </div>

      
    </div>


  {/* -------------------------------Chat Body---------------------------- */}
    <div className='flex w-full  min-h-[70vh] '>
          {/* Chat Body Left Side */}
      <div className='ring-1 ring-[#FB5722] w-[35%] flex rounded-bl-[15px]'>
        <div className='w-full'>
        <ChartCards  />
        <ChartCards  />
        </div>
      </div>
         {/* Chat Body Right Side */}
                   {/* Receiver message */}
         <div className='flex flex-col  w-[65%] rounded-br-[15px] min-h-[70vh]'>
          <div className='flex text gap-3 w-full text-[#545151] justify-center mt-2'><p>31 May 23</p><p>02:48 AM</p></div>
          <div className='flex ml-3 items-center gap-5'>
            <img src={receiverimg} className='rounded-[50%]'></img>
            <div className='p-2 h-10 max-w-[350px] bg-[#F3F3F5] items-center flex font-inter text-base tracking-wide text-[#545151]'>
              <p className='items-center flex font-inter text-base tracking-wide text-[#545151]'>Hello is this vehicle  available  ?</p>
            </div>
          </div>
                   {/* Sender Message */}

                   <div className='flex flex-row-reverse mr-3 mt-3 items-center gap-5'>
            <img src={receiverimg} className='rounded-[50%]'></img>
            <div className='p-2 h-10 max-w-[350px] bg-[#F3F3F5] items-center flex font-inter text-base tracking-wide text-[#545151]'>
              <p className='items-center flex font-inter text-base tracking-wide text-[#545151]'>Yes</p>
            </div>
          </div>
          <div className='flex text gap-3 w-full justify-center mt-2  text-[#545151] '><p>31 May 23</p><p>02:48 AM</p></div>
  {/* Send MEssage Field */}
  <div className='flex-grow flex flex-col justify-end w-[100%] h-[100px] rounded-[10px]'>
     <div  className='flex ring-1 ring-[#FB5722]  rounded-[15px]  p-2 mb-5 w-[95%] ml-[2.5%] h-[100px] bg'> 
        <textarea
      rows="5"
      placeholder='Type Text Here...'
      className='w-[90%] p-1 rounded-[15px] h-[70px] resize-none focus:outline-none'
    ></textarea>
        <div className='flex gap-3'><img src={smily} className='h-5'></img>
        <img src={thumb} className='h-5'></img></div>
      </div>
  </div>
</div>
 
      {/* <textarea rows="5" className='w-full h-[50px] p-2  '></textarea> */}
    
      </div>
  
   
  </div>
</div>


   
    
    </div>
    <Footer/>
    </>
  );
};

export default Inbox;
