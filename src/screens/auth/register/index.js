import React, { useEffect, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { auth, provider, providerFacebook } from "../../../utils/config";
// import { signInWithPopup, signOut } from "firebase/auth";
import { Base_url } from "../../../utils/Base_url";
import Login from "../login";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import axios from "axios";
import transition from "../../../transition";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoader] = useState(false);
  const [value, setValue] = useState({});

  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const verified = queryParams.get("verified");
  const message = queryParams.get("message");

  console.log("Verified:", verified);
  console.log("Message:", message);

  useEffect(() => {
    if (verified === "true" && message === "Email verification successful") {
      toast.success(message);
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [verified, message]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const user = useSelector((state) => state.planReducer);

  console.log(value);
  // const handleClick = () => {
  //   signOut(auth)
  //     .then(() => {
  //       console.log("Successfully signed out.");

  //       signInWithPopup(auth, provider)
  //         .then((data) => {
  //           setValue(data.user);
  //           console.log(data.user.email);
  //           console.log(data.user.uid);
  //           const params = {
  //             type: selectedOption,
  //             username: data.user.displayName,
  //             email: data.user.email,
  //             phone: data.user.phoneNumber,
  //             password: data.user.uid,
  //           };

  //           axios
  //             .post(`${Base_url}/registerUser`, params)
  //             .then((res) => {
  //               console.log(res);
  //               if (res.data.success === true) {
  //                 localStorage.setItem("user_data", res?.data?.newUser?._id);
  //                 toast.success(res?.data?.message);
  //                 navigate("/");
  //               } else {
  //                 toast.error(res?.data?.message);
  //               }
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //               toast(error.response?.data.message || "An error occurred");
  //             });
  //         })
  //         .catch((error) => {});
  //     })
  //     .catch((error) => {
  //       console.error("Error signing out:", error);
  //     });
  // };

  // const handleFacebook = () => {
  //   signOut(auth)
  //     .then(() => {
  //       console.log("Successfully signed out.");

  //       signInWithPopup(auth, providerFacebook)
  //         .then((data) => {
  //           console.log(data);
  //         })
  //         .catch((error) => {
  //           console.log(error.customData);

  //           const params = {
  //             type: selectedOption,
  //             username: error.customData._tokenResponse.displayName,
  //             email: error.customData.email,
  //             phone: error.customData._tokenResponse.phoneNumber,
  //             password: error.customData._tokenResponse.localId,
  //           };

  //           axios
  //             .post(`${Base_url}/registerUser`, params)
  //             .then((res) => {
  //               console.log(res);
  //               if (res.data.success === true) {
  //                 localStorage.setItem("user_data", res?.data?.newUser?._id);
  //                 toast.success(res?.data?.message);
  //                 navigate("/");
  //               } else {
  //                 toast.error(res?.data?.message);
  //               }
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //               toast(error.response.data.message);
  //             });
  //         });
  //     })
  //     .catch((error) => {
  //       console.error("Error signing out:", error);
  //     });
  // };

  const [state, setState] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  console.log(state);

  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
     if(!selectedOption){
      toast.error('Must select your option')
     }else{
      setLoader(true);
      const params = {
        profileStatus: selectedOption,
        username: state.username,
        email: state.email,
        phone: state.phone,
        password: state.password,
        // receiveReminder: "true",
        authProvider: "local",
        // plan: user.userPlan._id,
      };
  
      axios
        .post(`${Base_url}/user/register`, params)
        .then((res) => {
          console.log(res);
          if (res?.data?.success === true) {
            setLoader(false);
            toast.success(res?.data?.message);
            setState({
              username: "",
              email: "",
              phone: "",
              password: "",
          });
          } else {
            toast.error(res?.data?.message);
            // Swal.fire(res?.data?.message);
            setLoader(false);
          }
        })
        .catch((error) => {
          console.log(error);
  
          setLoader(false);
          toast(error?.response?.data?.message);
        });
     }
  };

  const [selectedOption, setSelectedOption] = useState("privateSeller");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "privateSeller" || event.target.value === "garage") {
      navigate("/register");
    } else {
      navigate("/dealar");
    }
  };

  return (
    <div>
      <Header />
      <section className=" block lg:flex  pb-20">
        {/* login section */}
        <Login />
        <div className="  w-[100%] sm:px-12 px-6 lg:w-[50%] pt-12">
          <h3 className="   pb-3 font-bold  text-black  text-2xl">Register</h3>
          <p className=" text-textColor">Create new account today.</p>

          <div className=" pt-10 gap-6 md:flex block items-center">
            <h6 className=" text-black font-medium"> Continue with:</h6>
            <div className="  flex gap-2">
              <Button
                label={"Google"}
                // onClick={handleClick}
                Icons={
                  <img
                    src={require("../../../assets/images/google.png")}
                    alt=""
                    className=" sm:w-7 w-5"
                  />
                }
                className={
                  "  bg-white border-gray-200  font-semibold border-2 justify-between rounded-lg text-lg py-2.5   w-40 text-black"
                }
              />
              <Button
                label={"Facebook"}
                // onClick={handleFacebook}
                Icons={
                  <img
                    src={require("../../../assets/images/facebook.png")}
                    alt=""
                    className=" sm:w-7 w-5"
                  />
                }
                className={
                  " bg-white border-gray-200  xs:mt-2 mt-0 font-semibold border-2 justify-between rounded-lg text-lg py-2.5   w-40 text-black"
                }
              />
            </div>
          </div>
          <h3 className="   font-semibold  text-black  py-7 text-xl">OR</h3>
          <div className="  pb-7 pt-3 flex items-center gap-6">
            <div className=" gap-2 flex items-center">
              <input
                type="radio"
                className="accent-primary"
                name="gender"
                value="seller"
                checked={selectedOption === "privateSeller"}
                onChange={handleOptionChange}
              />
              <p className=" text-gray-400  font-semibold">Private Seller</p>
            </div>
            <div className=" gap-2 flex items-center">
              <input
                type="radio"
                className="accent-primary"
                name="gender"
                value="dealar"
                checked={selectedOption === "dealar"}
                onChange={handleOptionChange}
              />
              <p className=" text-gray-400  font-semibold">Dealar</p>
            </div>
            <div className=" gap-2 flex items-center">
              <input
                type="radio"
                className="accent-primary"
                name="gender"
                value="garage"
                checked={selectedOption === "garage"}
                onChange={handleOptionChange}
              />
              <p className=" text-gray-400  font-semibold">Garage</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="  sm:w-[70%] w-[100%] flex flex-col gap-4">
              <Input
                type="text"
                onChange={handleInputs}
                value={state.username}
                name={"username"}
                label={"Username"}
                placeholder={"Username"}
                className={"border-2 w-full border-gray-200"}
                required={"required"}
              />
              <Input
                type="email"
                onChange={handleInputs}
                value={state.email}
                name={"email"}
                label={"Email"}
                placeholder={"Email"}
                className={"border-2 w-full border-gray-200"}
                required={"required"}
              />
              <Input
                type="number"
                onChange={handleInputs}
                value={state.phone}
                name={"phone"}
                label={"Phone"}
                placeholder={"Phone"}
                className={"border-2 w-full border-gray-200"}
              />
              <Input
                type={isPasswordVisible ? "text" : "password"}
                onChange={handleInputs}
                value={state.password}
                name={"password"}
                Icon={
                  isPasswordVisible ? (
                    <FaRegEye
                      onClick={togglePasswordVisibility}
                      className=" text-gray-500  mt-5"
                    />
                  ) : (
                    <FaRegEyeSlash
                      onClick={togglePasswordVisibility}
                      className=" text-gray-500  mt-5"
                    />
                  )
                }
                label={"Password"}
                placeholder={"Password"}
                className={"border-2 w-full border-gray-200"}
              />
              <p className="  text-textColor mt-3 font-bold">
                Terms, Conditions & Privacy Policy
                <span className=" text-primary">*</span>
              </p>
            </div>
            <div className=" flex items-center justify-between">
              <div className=" gap-2 mt-2 flex ">
                <Input
                  type="checkbox"
                  className={" w-4 mt-1 accent-primary border-gray-200 h-4"}
                  required={"required"}
                />
                <p className=" text-[#717070]">
                  By sign up you agree to terms & Conditions and Privacy Policy{" "}
                </p>
              </div>
            </div>
            {loading === true ? (
              <button
                disabled
                type="button"
                class="text-white mt-10 bg-primary hover:bg-primary focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </button>
            ) : (
              <Button
                label={"Register"}
                type={"submit"}
                className={
                  " bg-orange-600 rounded-md  mt-10 py-2.5 px-8  text-white"
                }
              />
            )}
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default transition(Register);
