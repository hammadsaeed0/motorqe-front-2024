
import React, { useEffect,useRef } from 'react';
const Dropdown = ({ isOpen, onClose }) => {

    const dropdownRef = useRef();

    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          onClose();
        }
      };
  
      if (isOpen) {
        document.addEventListener('click', handleOutsideClick);
      }
  
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, [isOpen, onClose]);

    

  return (
    
    <div className={`absolute top-5 z-30 right-0 bg-[#F3F3F5] shadow-md border mt-3
     ring-[#DFDFDF] rounded w-[200px] h-[200px] ${isOpen ? '' : 'hidden'}`}>
     
    
      <div className='mt-2 flex text-[13px] text-base font-normal tracking-wider flex-row p-2'>
        <div className='mt-2  gap-3 flex flex-col w-[40px] justify-center'>
          <div className=' flex gap-2 items-center'>
          <img src={require('../../../../assets/images/social/call.png')} alt="inbox" className='' />
          <p className='text-[#0C0CB8]'>Call</p>
          </div>
          <div className=' flex gap-2 items-center'>
          <img src={require('../../../../assets/images/social/whatapp.png')} alt="unread" className='' />
          <p className='text-[#0C0CB8]'>Whatsapp</p>
          </div>
         <div className=' flex gap-2 items-center'>
         <img src={require('../../../../assets/images/social/cancel.png')} alt="Block user" className='' />
         <p className='text-[#0C0CB8]'>Cancel</p>
         </div>
        
        
         <div className=' flex  gap-2 items-center'>
         <img src={require('../../../../assets/images/social/schedule.png')} alt="Report" className='' />
             
        <p className='text-[#0C0CB8]'>Reschedule</p>
         </div>
        
        </div>

     </div>
     



      
    </div>
  );
};

export default Dropdown;
