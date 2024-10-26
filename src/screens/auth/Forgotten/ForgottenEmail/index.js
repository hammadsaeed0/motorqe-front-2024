import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../../components/header';
import Footer from '../../../../components/footer';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button'; 
import axios from 'axios';
import { Base_url } from '../../../../utils/Base_url';
import { toast } from 'react-toastify';

const ForgottenEmail = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const SendOtp = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    

    const params = {
      email,
    };

    setLoading(true); 

    try {
      const res = await axios.post(`${Base_url}/user/send-otp`, params);
      console.log(res);
      if(res.data.success===true){
        toast.success(res.data.message);
          navigate('/forgotten_password',{ state: { email } });
      }else{
        toast.success(res.data.message);
      }
      
    
    } catch (err) {
      console.log(err);
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Header />
      <section className='w-full flex justify-center items-center h-[80vh]'>
        <div className='w-[430px] shadow-xl rounded-md p-6'>
          <h3 className='font-bold pb-3 text-black text-2xl'>
            Forgot Password
          </h3>
          <p className='text-textColor text-sm'>
            Enter the email address associated with your account and we'll send you a link to reset your password.
          </p>
          <form className='mt-5' onSubmit={SendOtp}>
            <Input
              label={'Email'}
              placeholder={''}
              type={'email'}
              className={'border py-3 w-full'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              className={`bg-primary w-full py-3 rounded-md text-white mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              label={loading ? 'Loading...' : 'Continue'}
              type='submit'
              disabled={loading} // Disable the button when loading
            />
          </form>

          <div className='text-center mt-12'>
            <p>
              Don't have an account? <Link to={''} className='text-primary'>Sign up</Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ForgottenEmail;
