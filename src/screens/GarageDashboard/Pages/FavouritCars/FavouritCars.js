import React, { useEffect, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { RiSortAsc } from 'react-icons/ri';
import list  from "../../../../assets/images/list.png"
import vector from '../../../../assets/images/Vector.png';
import announcement from '../../../../assets/images/announcement.png'
import group  from  '../../../../assets/images/group.png';
import Pagination from '../../../../components/Pagination/pagination';
import {favouritCArd,cardcar,uparrow,stats,refresh, edit, remove, feature,sold,lowmilage,Featured,newcar,can,cylinder,road,call,whatsapp,chat} from '../.././../../assets/images/images'
import { Base_url } from '../../../../utils/Base_url';
import axios from 'axios';
import Header from '../../../../components/header';
import Footer from '../../../../components/footer';
import DashboardNavbar from '../../NavBAr/DashboardNavbar';
// import {lowmilage,features,newcar} from 

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

const ProductData=[
 { img:Featured,
  favourit:  favouritCArd,
   carName:'Chevrolet Camaro 2-door',
   totaQr:16243,
   totalInstallment:10,
   qrPerMonth:10,
   madeIn:2018,
   cylinder:6,
   totalMilage:89156+"km",

   planName:'Silver  Plan',
   uparrow:{uparrow},
   createdAt:"11/22/24",
   expireAt:'12/22/24',
   remainingdays:" 3 Days",
   featured:"Yes",
   row1: [
    { icon: uparrow, text: 'row one first' },
    { icon: stats, text: 'Status' },
    { icon: refresh, text: 'Refresh' }
  ],
  row2:[
    { icon: edit, text: 'row one first' },
    { icon: remove, text: 'Remove' },
    { icon: feature, text: 'feature' },
  ],
 },
 { img:Featured,
  favourit:  favouritCArd,
  carName:'Chevrolet Camaro 2-door',
  totaQr:16243,
  totalInstallment:10,
  qrPerMonth:10,

  madeIn:2018,
  cylinder:6,
  totalMilage:89156+"km",

  planName:'Silver  Plan',
  uparrow:{uparrow},
  createdAt:"11/22/24",
  expireAt:'12/22/24',
  remainingdays:" 3 Days",
  featured:"Yes",
  row1: [
   { icon: uparrow, text: 'row one first' },
   { icon: stats, text: 'Status' },
   { icon: refresh, text: 'Refresh' }
 ],
 row2:[
   { icon: edit, text: 'row one first' },
   { icon: remove, text: 'Remove' },
   { icon: feature, text: 'feature' },
 ],
},
{ img:Featured,
  favourit:  favouritCArd,
  carName:'Chevrolet Camaro 2-door',
  totaQr:16243,
  totalInstallment:10,
  qrPerMonth:10,

  madeIn:2018,
  cylinder:6,
  totalMilage:89156+"km",

  planName:'Silver  Plan',
  uparrow:{uparrow},
  createdAt:"11/22/24",
  expireAt:'12/22/24',
  remainingdays:" 3 Days",
  featured:"Yes",
  row1: [
   { icon: uparrow, text: 'row one first' },
   { icon: stats, text: 'Status' },
   { icon: refresh, text: 'Refresh' }
 ],
 row2:[
   { icon: edit, text: 'row one first' },
   { icon: remove, text: 'Remove' },
   { icon: feature, text: 'feature' },
 ],
},
{ img:Featured,
  favourit:  favouritCArd,
  carName:'Chevrolet Camaro 2-door',
  totaQr:16243,
  totalInstallment:10,
  qrPerMonth:10,

  madeIn:2018,
  cylinder:6,
  totalMilage:89156+"km",

  planName:'Silver  Plan',
  uparrow:{uparrow},
  createdAt:"11/22/24",
  expireAt:'12/22/24',
  remainingdays:" 3 Days",
  featured:"Yes",
  row1: [
   { icon: uparrow, text: 'row one first' },
   { icon: stats, text: 'Status' },
   { icon: refresh, text: 'Refresh' }
 ],
 row2:[
   { icon: edit, text: 'row one first' },
   { icon: remove, text: 'Remove' },
   { icon: feature, text: 'feature' },
 ],
},
{ img:Featured,
  favourit:  favouritCArd,
  carName:'Chevrolet Camaro 2-door',
  totaQr:16243,
  totalInstallment:10,
  qrPerMonth:10,

  madeIn:2018,
  cylinder:6,
  totalMilage:89156+"km",

  planName:'Silver  Plan',
  uparrow:{uparrow},
  createdAt:"11/22/24",
  expireAt:'12/22/24',
  remainingdays:" 3 Days",
  featured:"Yes",
  row1: [
   { icon: uparrow, text: 'row one first' },
   { icon: stats, text: 'Status' },
   { icon: refresh, text: 'Refresh' }
 ],
 row2:[
   { icon: edit, text: 'row one first' },
   { icon: remove, text: 'Remove' },
   { icon: feature, text: 'feature' },
 ],
},  
];





const FavouritCars = () => {

  const [cars,setCars] = useState([])

  useEffect(() => {
    axios
      .get(`${Base_url}/users/users-all-cars`)
      .then((res) => {
        console.log(res);
        setCars(res.data.cars);
      })
      .catch((error) => {});
  }, []);


  return (
    <>
     <Header/>
       <DashboardNavbar/>
     <div className="flex flex-col items-center justify-center  mb-4">
      <div className="mt-16 flex items-center justify-between w-[90%] container">
        <h1 className="font-inter text-3xl font-semibold leading-10 tracking-normal text-left">
        My Favourite Cars
        </h1>
        <div className="relative mr-3">
          {/* Search Bar */}
          <Input
            Icon={<RiArrowDropDownLine className="size-7" />}
            placeholder="Filter by listing..."
            className="border-[#D2D2D2] border-2 md:w-50 w-60 pr-10 p-3 h-2"
          />
        </div>
      </div>


    {/* ------------------------------------- main product card -------------------------------------- */}   
    <div className="w-[90%] container">

  <div className="flex gap-10 flex-wrap ">
    {/* Use map to create cards */}
    {ProductData?.map((product, index) => (
      <div
        key={index}
        className={` bg-[#F3F3F5] h-[360px] w-[350px] shadow-lg mt-4 ${product.featured === 'Yes' ? ' border-sky-800' : 'border-blue-500'}`}

      > 
        {/* Display card content */}
        <div className="relative w-[350px]">
          <img src={product.img} alt={product?.carName} className="h-[180px] w-[350px] rounded-tl-[10px] rounded-tr-[10px]" />
          <img src={product.favourit} alt="Favourite" className="absolute right-1 bottom-11 w-8 h-8 m-2" />
          <h2 className="text-xl font-bold p-2">{product?.carName}</h2>
        </div>
        {/* Display actions - Row 1 */}
      <div className="w-[350px] text-24">
        <div className="items-center flex justify-between mt-2 pl-4 pr-4 font-bold leading-29 tracking-wide text-left">
        <div className='flex text-18'>
          <strong className="ml-1 text-[#0C0CB8]">QR {product.totaQr}</strong>
        </div>
        <div className='flex text-18'>
          <strong className="ml-1 text-[#03AB42]">QR {product.qrPerMonth}/MONTH</strong>
        </div>
      </div>    
    </div>


        {/* Display actions - Row 2 */}
        <div className=" w-[350px] tracking-wide my-3">
            <div className=" items-center flex justify-between mt-2 pl-5 pr-5">
               <div className='flex text-18 gap-1'>
                <img src={cylinder} alt='cylinder'className=' h-4' ></img>
                <strong className="ml-1 text-sm">{product.cylinder}</strong>
                </div>
                <div className='flex text-18 gap-1'>
                <img src={can} alt='can'className=' h-4' ></img>
                <strong className="ml-1 text-sm">{product.qrPerMonth}</strong>
                </div>
                <div className='flex text-18 gap-1'>
                <img src={road} alt='road'className=' h-4' ></img>
                <strong className="ml-1 text-sm">{product.totalMilage}</strong>
                </div>
            </div>    
        </div>

        {/* Sold indicator */}
        <div className=" w-[350px] my-5">
            <div className=" items-center flex justify-between mt-2 pl-5 pr-5 text-white">
            <div className='flex text-18 gap-1 bg-[#0C0CB8] w-[70px] rounded-[20px] h-[27px] items-center justify-center'>
              <img src={call} alt='cylinder' className='h-4' />
              <p className="ml-1">{product.cylinder}</p>
            </div>
            
            <div className='flex text-18 gap-1 bg-[#FB5722] w-[90px] rounded-[20px] h-[27px] items-center justify-center'>
              <img src={chat} alt='cylinder' className='h-4' />
              <p className="ml-1">Chat</p>
            </div>

            <div className='flex text-18 gap-1 bg-[#25D366] w-[110px] rounded-[20px] h-[27px] items-center justify-center'>
              <img src={whatsapp} alt='cylinder' className='h-4' />
              <p className="ml-1">Whatsapp</p>
            </div>
                
            </div>    
        </div>

      </div>
    ))}
  </div>
</div>


   
    
    </div>
     <Footer/>

    </>
  );
};

export default FavouritCars;
