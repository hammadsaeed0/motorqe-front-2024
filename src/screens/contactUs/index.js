import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../components/header";
import Footer from "../../components/footer";

const ContactUs = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  console.log(state);

  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();

    const params = {
      name: state.name,
      email: state.email,
      phone: state.phone,
      subject: state.subject,
      message: state.message,
    };

    axios
      .post(`${Base_url}/submitContactForm`, params)
      .then((res) => {
        console.log(res);
        if (res.success === true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };



  return (
    <>
     <Header/>
     <section className=" py-10  px-4 container mx-auto justify-between md:flex block">
      {/*  left */}
      <div className=" md:w-[46%] w-[100%]">
        <div>
          <img
            src={require("../../assets/images/contact.png")}
            className=" rounded-md"
            alt=""
          />
        </div>
        <div className=" py-8">
          <h1 className=" text-black  pb-3 font-bold text-2xl">Contact Us</h1>
          <p className=" text-gray-500 font-medium">
            While others get bummed when asked for help, we get pumped to serve
            you! Team YallaMotor is ever ready to help you every step of the
            way. We’ve deployed dedicated resources to assist, guide, attend and
            answer your queries throughout the week.
          </p>
          <h1 className=" text-black  font-bold text-2xl pt-10">TELEPHONE</h1>
          <p>
            Support is also available via phone, but to get the fastest response
            please use the email form. Please do not forget to leave your
            contact details and email address if using voicemail.
          </p>

          <div className=" pt-10">
            <h2 className=" text-[#0000ff]  font-bold text-lg">
              +9714 556 9700
            </h2>
            <h2 className="text-[#0000ff]  font-bold text-lg">
              (9 AM To 6 PM)
            </h2>
          </div>
        </div>
      </div>

      {/* right */}

      <div className=" md:w-[40%] w-[100%]">
        <h1 className=" text-black  font-bold text-xl">ASK US ANYTHING</h1>

        <form  onSubmit={handleSubmit} className=" flex flex-col gap-6 pt-8">
          <Input
          onChange={handleInputs}
          value={state.name}
          name={"name"}
          type={'text'}
            placeholder={"Username"}
            label={"Username:"}
            className={" border w-full"}

            required={'required'}
          />
          <Input
           onChange={handleInputs}
           value={state.email}
           name={"email"}
           type={'email'}
            placeholder={"Email"}
            label={"Email:"}
            className={" border w-full"}
            required={'required'}
          />
          <Input
            onChange={handleInputs}
            value={state.phone}
            name={"phone"}
            type={'number'}
            placeholder={"Phone"}
            label={"Phone:"}
            className={" border w-full"}
            required={'required'}
          />
          <Input
            onChange={handleInputs}
            value={state.subject}
            name={"subject"}
            type={'text'}
            placeholder={"Subject"}
            label={"Subject:"}
            className={" border w-full"}
            required={'required'}
          />
          <div>
            <label className="  font-medium  text-sm">Message:</label>
            <textarea
              onChange={handleInputs}
              value={state.message}
              name={"message"}
              type={'text'}
              rows={6}
              placeholder={"Leave us a message"}
              label={"Message:"}
              className={"   p-2 rounded-md border w-full"}
              required
            />
          </div>
          <Button
           type={'submit'}
            label={"SEND"}
            className={
              " bg-[#0000ff]      rounded-3xl      py-3  w-72 mx-auto  text-white"
            }
          />
        </form>
      </div>
    </section>
     <Footer/>
    </>
    
  );
};

export default ContactUs;
