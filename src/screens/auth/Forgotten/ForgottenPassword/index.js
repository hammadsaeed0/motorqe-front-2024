import React, { useState } from "react";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgottenPassword = () => {
  const location = useLocation();
  const emailFromPreviousScreen = location.state?.email;
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(emailFromPreviousScreen || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const ForgetPasswordFun = async (e) => {
    e.preventDefault();

   
    if (!otp || !email || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

  
    if (email !== emailFromPreviousScreen) {
      toast.error("The email does not match.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const params = {
      email,
      otp,
      newPassword,
    };

    setLoading(true); 

    try {
      const response = await axios.post(
        "https://new-motorqe-backend.vercel.app/v1/user/reset-password",
        params
      );
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/"); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.success === false) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="w-full flex justify-center items-center h-[100vh]">
        <div className="w-[430px] shadow-xl rounded-md p-6">
          <h3 className="font-bold pb-3 text-black text-2xl">
            New Password
          </h3>
          <p className="text-textColor text-sm">
            Please create a new password that you don't use on any other site.
          </p>
          <form className="mt-5 flex flex-col gap-4" onSubmit={ForgetPasswordFun}>
            <Input
              label={"Enter OTP"}
              placeholder={"Enter OTP"}
              className={"border py-3 w-full"}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Input
              label={"Enter Email"}
              placeholder={"Enter Email"}
              className={"border py-3 w-full"}
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            <Input
              label={"Create New Password"}
              placeholder={"Enter password"}
              className={"border py-3 w-full"}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              label={"Confirm Your Password"}
              placeholder={"Enter password"}
              className={"border py-3 w-full"}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              className={`bg-primary w-full py-3 rounded-md text-white mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              label={loading ? 'Loading...' : 'Change'}
              type='submit'
              disabled={loading} 
            />
          </form>

          <div className="text-center mt-7">
            <p>
              Don't have an account?{" "}
              <Link to={""} className="text-primary">
                Sign up
              </Link>{" "}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ForgottenPassword;
