import React from 'react'
import Header from '../../../../components/header'
import Footer from '../../../../components/footer'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import { Link } from 'react-router-dom'

const ForgottenPassword= () => {
  return (
    <>
    <Header/>
        <section className=' w-full flex justify-center items-center h-[80vh]'>
            
             <div className=' w-[430px] shadow-xl rounded-md p-6'>
             <h3 className="  font-bold  pb-3  text-black  text-2xl">
          New Password
        </h3>
             <p className=" text-textColor text-sm">Please create a new password that you don't use an any other site.</p>
             <form className=' mt-5 flex flex-col gap-4'>
                 <Input label={'Create new password'} placeholder={'Enter password'} className={'border  py-3 w-full'} />
                 <Input label={'Confirm your password'} placeholder={'Enter password'} className={'border  py-3 w-full'} />

                 <Button className={' bg-primary w-full py-3 rounded-md text-white mt-4'} label={'Change'} />
            </form>


            <div className=' text-center mt-7'>
            <p>Don't have an account? <Link to={''} className=' text-primary'>Sign up</Link> </p>
            </div>
             </div>
        </section>
    <Footer/>
    </>
  )
}

export default ForgottenPassword