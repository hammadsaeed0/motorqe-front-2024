import React from 'react'
import Header from '../../../../components/header'
import Footer from '../../../../components/footer'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import { Link } from 'react-router-dom'

const ForgottenEmail = () => {
  return (
    <>
    <Header/>
        <section className=' w-full flex justify-center items-center h-[80vh]'>
            
             <div className=' w-[430px] shadow-xl rounded-md p-6'>
             <h3 className="  font-bold  pb-3  text-black  text-2xl">
          Forgot Password
        </h3>
             <p className=" text-textColor text-sm">Enter the email address associated with your account and we'll send you a link to reset your password.</p>
             <form className=' mt-5'>
                 <Input label={'Email'} placeholder={''} className={'border  py-3 w-full'} />

                 <Button className={' bg-primary w-full py-3 rounded-md text-white mt-4'} label={'Continue'} />
            </form>


            <div className=' text-center mt-12'>
            <p>Don't have an account? <Link to={''} className=' text-primary'>Sign up</Link> </p>
            </div>
             </div>
        </section>
    <Footer/>
    </>
  )
}

export default ForgottenEmail