import React from 'react'
import Input from '../Input'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className=' bg-[#0C53AB]'>
        {/* top footer */}
        <div className=' grid px-4 xl:grid-cols-3 py-8 grid-cols-2  items-center container  mx-auto'>
            <div className=' item1 col-span-2'>
                <img className=' w-44' src={require('../../assets/images/white_logo.png')} alt='' />
            </div>
            <div>
                <h2 className=' uppercase text-lg text-white '>to our newsletters</h2>
                <div className=' sm:flex hidden pt-2 items-center   rounded-md rounded-s-none'>
                  <input  className=' p-2.5    md:w-72 w-60 rounded-tl-lg  rounded-bl-lg' />
                  <button  className='  rounded-tr-lg  rounded-br-lg  py-2.5 md:px-8 px-6 bg-primary text-white uppercase '>Subscribe</button>
                </div>

                <div className=' pt-2  w-64 items-center justify-center  flex sm:hidden flex-col   rounded-md rounded-s-none'>
                  <input  className=' p-2.5    w-full rounded-lg' />
                  <button  className='  rounded-lg mt-2 w-full  py-2.5  bg-primary text-white uppercase '>Subscribe</button>
                </div>
            </div>
        </div>

        <hr/>
        {/* middle footer */}
        <div className='w-full py-5 px-4 container mx-auto grid  grid-cols-1  xl:grid-cols-4 md:grid-cols-2 gap-5 md:gap-12'>
            <div className=' item1 col-span-2'>
                <h1 className=' uppercase  text-white   font-semibold'>Download our app</h1>
                <div  className=' sm:flex block gap-4'>
                    <img className='   sm:w-36 w-48 h-12' src={require('../../assets/images/App Store.png')} alt='' />
                    <img  className='   sm:w-36 w-48 h-12' src={require('../../assets/images/Google Play.png')} alt='' />
                </div>
                <ul className=' flex gap-4 pt-5'>
                    <li className=' w-12 flex justify-center items-center h-12 bg-white rounded-full'>
                        <Link  to=''>

                        <img src={require('../../assets/images/social/facebook.png')} className=' w-4' alt='' />
                            
                        </Link>
                    </li>
                    <li className=' w-12 flex justify-center items-center h-12 bg-white rounded-full'>
                        <Link  to=''>

                        <img src={require('../../assets/images/social/twitter.png')} className=' w-7' alt='' />
                            
                        </Link>
                    </li>
                    <li className=' w-12 flex justify-center items-center h-12 bg-white rounded-full'>
                        <Link  to=''>

                        <img src={require('../../assets/images/social/instagrams.png')} className=' w-7' alt='' />
                            
                        </Link>
                    </li>
                    <li className=' w-12 flex justify-center items-center h-12 bg-white rounded-full'>
                        <Link  to=''>

                        <img src={require('../../assets/images/social/snap.png')} className=' w-7' alt='' />
                            
                        </Link>
                    </li>
                </ul>
            </div>

           <div className=' grid item1 col-span-2  xl:grid-cols-3  grid-cols-1 gap-5'>
           <div  className=''>
                <h1 className=' uppercase text-white  font-semibold text-xl'>quick links</h1>

                <ul className=' mt-5  leading-7'>
                    <li>
                        <Link  className='uppercase text-white   font-medium' to='/home'>home</Link>
                    </li>
                    <li>
                        <Link  className='uppercase text-white  font-medium' to='/car_inspection'>about us</Link>
                    </li>
                    <li>
                        <Link  className='uppercase text-white  font-medium' to='/news'>news</Link>
                    </li>
                </ul>
            </div>
            <div  className=''>
                <h1 className=' uppercase text-white font-semibold text-xl'>features</h1>

                <ul className=' mt-5 leading-7'>
                    <li>
                        <Link  className='uppercase text-white font-medium' to='/choose_plane'>features</Link>
                    </li>
                    <li>
                        <Link  className='uppercase text-white font-medium' to='/garage_booking_confirmation'>faq</Link>
                    </li>
                    <li>
                        <Link  className='uppercase text-white font-medium' to=''>english</Link>
                    </li>
                </ul>
            </div>
            <div className=''>
                <h1 className=' uppercase text-white   font-semibold text-xl'>blogs</h1>

                <ul className=' mt-5 leading-7'>
                    <li>
                        <Link  className=' uppercase text-white font-medium' to=''>terms & conditions</Link>
                    </li>
                    <li>
                        <Link  className='uppercase text-white font-medium' to=''>privacy policy</Link>
                    </li>
                    <li>
                        <Link className='uppercase text-white font-medium' to='/contactus'>contact us</Link>
                    </li>
                </ul>
            </div>
           </div>
        </div>
        <hr/>
        {/*bottom footer */}
        <div className=' justify-center px-5 flex'>
           <h4 className=' text-white py-3 font-normal'>© - 2023 All Rights Reserved by MOTORQE</h4>
        </div>
    </footer>
  )
}

export default Footer