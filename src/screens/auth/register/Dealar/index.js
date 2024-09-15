import React, { useState } from "react";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Base_url } from "../../../../utils/Base_url";
import { auth, provider, providerFacebook } from "../../../../utils/config";
import { signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import { FaRegEye } from "react-icons/fa";
export const Dealar = () => {
  const [value, setValue] = useState({});
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("dealer");
  const [loading, setLoader] = useState(false);
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
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    tradeLicenseNumber: "",
    password: "",
    confirm_password: "",
  });

  console.log(state);

  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    setLoader(true);

    if (state.password !== state.confirm_password) {
      toast.error("Password and Confirm password must be same!");
    } else {
      const params = {
        type: selectedOption,
        companyName: state.companyName,
        email: state.email,
        username: state.firstName + state.lastName,
        firstName: state.firstName,
        lastName: state.lastName,
        phone: state.phone,
        tradeLicenseNumber: state.tradeLicenseNumber,
        password: state.password,
      };

      axios
        .post(`${Base_url}/registerUser`, params)
        .then((res) => {
          console.log(res);

          if (res.data.success === true) {
            setLoader(false);
            // localStorage.setItem("user_data", res?.data?.newUser?._id);
            toast.success(res?.data?.message);
            navigate("/register");
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((error) => {
          console.log(error);

          setLoader(false);
          toast(error.response.data.message);
        });
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "seller") {
      navigate("/register");
    } else {
      navigate("/dealar");
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [isPasswordVisiblec, setIsPasswordVisiblec] = useState(false);
  const togglePasswordVisibilityc = () => {
    setIsPasswordVisiblec(!isPasswordVisiblec);
  };
  return (
    <div>
      <Header />
      <section className=" block md:flex  pb-20">
        {/* login section */}

        <div className="  w-[100%] sm:px-12 px-6 md:w-[55%] pt-12">
          <h3 className="   pb-3 font-bold  text-black  text-3xl">
            Register to sell your Vehicle
          </h3>
          <p className=" text-textColor">Create new account today.</p>

          <div className=" pt-10 gap-6 md:flex block items-center">
            <h6 className=" text-black font-medium"> Continue with:</h6>

            <div className=" flex gap-2">
              <Button
                // onClick={handleClick}
                label={"Google"}
                Icons={
                  <img
                    src={require("../../../../assets/images/google.png")}
                    alt=""
                    className=" sm:w-7 w-5"
                  />
                }
                className={
                  " bg-white border-gray-200  font-semibold border-2 justify-between rounded-lg text-lg py-2.5   w-40 text-black"
                }
              />
              <Button
                label={"Facebook"}
                // onClick={handleFacebook}
                Icons={
                  <img
                    src={require("../../../../assets/images/facebook.png")}
                    alt=""
                    className=" sm:w-7 w-5"
                  />
                }
                className={
                  " bg-white border-gray-200  font-semibold border-2 justify-between rounded-lg text-lg py-2.5   w-40 text-black"
                }
              />
            </div>
          </div>
          <h3 className="   font-semibold  text-black  py-7 text-xl">OR</h3>
          <div className="  pb-7 pt-3 flex items-center gap-6">
            <div className=" gap-2 flex items-center">
              <input
                type="radio"
                name="gender"
                className="accent-primary"
                value="seller"
                checked={selectedOption === "seller"}
                onChange={handleOptionChange}
              />
              <p className=" text-gray-400  font-semibold">Private Seller</p>
            </div>
            <div className=" gap-2 flex items-center">
              <input
                type="radio"
                name="gender"
                className="accent-primary"
                value="dealer"
                checked={selectedOption === "dealer"}
                onChange={handleOptionChange}
              />
              <p className=" text-gray-400  font-semibold">Dealar</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="  sm:w-[70%] w-[100%] flex flex-col gap-4">
              <Input
                type="text"
                onChange={handleInputs}
                value={state.companyName}
                name={"companyName"}
                label={`Company Name`}
                star={"*"}
                placeholder={"Enter your company name"}
                className={"border-2 w-full border-gray-200"}
                required
              />
              <Input
                type="text"
                star={"*"}
                onChange={handleInputs}
                value={state.firstName}
                name={"firstName"}
                label={"First Name"}
                placeholder={"Enter First Name"}
                className={"border-2 w-full border-gray-200"}
                required
              />
              <Input
                type="text"
                star={"*"}
                onChange={handleInputs}
                value={state.lastName}
                name={"lastName"}
                label={"Last Name"}
                placeholder={"Enter Last Name"}
                className={"border-2 w-full border-gray-200"}
                required
              />
              <Input
                star={"*"}
                type="number"
                onChange={handleInputs}
                value={state.phone}
                name={"phone"}
                label={"Contact Number"}
                placeholder={"Enter Contact Number"}
                className={"border-2 w-full border-gray-200"}
                required
              />
              <Input
                star={"*"}
                type="email"
                onChange={handleInputs}
                value={state.email}
                name={"email"}
                label={"Email"}
                placeholder={"Enter Email"}
                className={"border-2 w-full border-gray-200"}
                required
              />
              <Input
                star={"*"}
                type="number"
                onChange={handleInputs}
                value={state.tradeLicenseNumber}
                name={"tradeLicenseNumber"}
                label={"Trade License Number"}
                placeholder={"Enter your Trade License Number"}
                className={"border-2 w-full border-gray-200"}
                required
              />
              <Input
                star={"*"}
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
                placeholder={"Enter Password"}
                className={"border-2 w-full border-gray-200"}
              />

              <Input
                star={"*"}
                type={isPasswordVisiblec ? "text" : "password"}
                onChange={handleInputs}
                value={state.confirm_password}
                name={"confirm_password"}
                Icon={
                  isPasswordVisiblec ? (
                    <FaRegEye
                      onClick={togglePasswordVisibilityc}
                      className=" text-gray-500  mt-5"
                    />
                  ) : (
                    <FaRegEyeSlash
                      onClick={togglePasswordVisibilityc}
                      className=" text-gray-500  mt-5"
                    />
                  )
                }
                label={"Confirm Password"}
                placeholder={"Enter Confirm Password"}
                className={"border-2 w-full border-gray-200"}
                required
              />
              <p className="   text-textColor mt-3 font-bold">
                Terms, Conditions & Privacy Policy*
              </p>
            </div>
            <div className=" flex  mt-2 items-center justify-between">
              <div className=" gap-2 flex ">
                <Input
                  type="checkbox"
                  className={"accent-primary mt-1 w-4 h-4"}
                  required={"required"}
                />
                <p className=" text-[#717070]">
                  By sign up you agree to terms & Conditions and Privacy Policy{" "}
                </p>
              </div>
            </div>
            <div className=" pt-6">
              {loading === true ? (
                <button
                  disabled
                  type="button"
                  class="text-white mt-8 bg-primary hover:bg-primary focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary inline-flex items-center"
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
                    " bg-primary rounded-md  mt-8 py-2.5 px-8  text-white"
                  }
                />
              )}
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};
