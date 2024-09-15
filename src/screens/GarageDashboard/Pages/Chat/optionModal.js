// Dropdown.js
import React, { useEffect,useRef } from 'react';
import {report,blockuser,delet,markundread} from '../.././../../assets/icons/icons'
import {inbox,senderimg} from '../.././../../assets/images/images'
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
    
    <div className={`absolute top-5 right-0 bg-[#F3F3F5] shadow-md border mt-3
     ring-[#DFDFDF] rounded w-[200px] h-[150px] ${isOpen ? '' : 'hidden'}`}>
     
    
      <div className='mt-2 flex text-[13px] text-base font-normal tracking-wider flex-row p-2'>
        <div className='mt-2 flex-col gap-4 w-[40px] justify-center'>
        <img src={delet} alt="inbox" className='h-5' />
        <img src={markundread} alt="unread" className='h-5 mt-1.5 ml-0.5' />
        <img src={blockuser} alt="Block user" className='h-4 mt-1.5 ml-2' />
        <img src={report} alt="Report" className='h-5 mt-1.5 ml-1.5' />
        
        </div>

        <div className='text-left mt-1'>
        <p className='text-[#0C0CB8]'>Delete conversation</p>
        <p className='text-[#0C0CB8]'>Mark as unread</p>
        <p className='text-[#0C0CB8]'>Block user</p>
        <p className='text-[#0C0CB8]'>Report </p>
        </div>
     </div>
     



      
    </div>
  );
};

export default Dropdown;
