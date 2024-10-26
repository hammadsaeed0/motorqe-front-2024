// Dropdown.js
import React, { useEffect,useRef } from 'react';
import {report,blockuser,delet,markundread} from '../.././../../assets/icons/icons'
import {inbox,senderimg} from '../.././../../assets/images/images'
const Dropdown = ({ isOpen, onClose,onClick,onReportFun }) => {

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

    


    const DeleConversion = ()=>{



    }

  return (
    
    <div className={`absolute top-5 right-0 bg-[#F3F3F5] shadow-md border mt-3
     ring-[#DFDFDF] rounded w-[260px] h-[130px] ${isOpen ? '' : 'hidden'}`}>
     
    
      <div className='mt-2 flex text-[13px] text-base font-normal tracking-wider flex-row p-2'>
        

        <div className='text-left mt-1 flex flex-col gap-4'>
        <p className='text-[#0C0CB8] flex gap-3'  onClick={onClick} >  <img src={delet} alt="inbox" className='h-6' /> Delete conversation</p>
        {/* <p className='text-[#0C0CB8]'>Mark as unread</p> */}
        <p className='text-[#0C0CB8]  flex gap-3' onClick={onReportFun}> <img src={blockuser} alt="Block user" className='h-5  ml-2' /> Block user</p>
        {/* <p className='text-[#0C0CB8]  flex gap-3'> <img src={report} alt="Report" className='h-5 mt-1.5 ml-1.5' /> Report </p> */}
        </div>
     </div>
     



      
    </div>
  );
};

export default Dropdown;
