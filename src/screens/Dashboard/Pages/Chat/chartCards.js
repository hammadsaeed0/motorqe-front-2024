import React from 'react'
import {receiverimg } from '../.././../../assets/icons/icons'

const ChartCards = () => {
  return (
 <div>
         
    <div className='flex w-[100%]  p-1 border-b border-[#FB5722] bg-[#F3F3F5]  '>
         <div className='flex  gap-4 w-full  '>
           <div> 
            <img src={receiverimg} className='rounded-[50%]'></img>
           </div>
             
           <div>
                <strong className='font-inter text-xl font-semibold leading-6 tracking-wider text-left'>Paul Kelley</strong>
                 <p className='font-inter text-xl font-bold leading-6 tracking-wider text-left'> Vehicle ad title</p>
                 <p className='font-inter text-base font-normal leading-6 tracking-wide text-left text-[#777777]'>Hello is vehicle is available  ?</p>
           </div>
        </div>
        <div>
            <p className='font-inter text-sm font-normal leading-5 tracking-wide mr-2'>Today</p>
        </div>
    </div>
</div>
  )
}

export default ChartCards
