import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider, providerFacebook } from "../../../utils/config";
import { signInWithPopup, signOut } from "firebase/auth";
import { Base_url } from "../../../utils/Base_url";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useAuthLoginMutation } from "../../../store/services/authService";
import { setUserToken } from "../../../store/reducers/authReducer";

const Login = () => {
  const [value, setValue] = useState({});
  const dispatch = useDispatch();
  const [loading, setLoader] = useState(false);
  console.log(value);
  // const handleClick = () => {
  //   signOut(auth)
  //     .then(() => {
  //       console.log("Signed out successfully.");

  //       signInWithPopup(auth, provider)
  //         .then((data) => {
  //           setValue(data.user);
  //           console.log(data.user.email);
  //           console.log(data.user.uid);
  //           const params = {
  //             emailOrPhone: data.user.email,
  //             password: data.user.uid,
  //           };

  //           axios
  //             .post(`${Base_url}/loginUser`, params)
  //             .then((res) => {
  //               console.log(res);
  //               if (res.data.success === true) {
  //                 localStorage.setItem("user_data", res?.data?.user?._id);
  //                 toast.success(res?.data?.message);
  //                 navigate("/");
  //               } else {
  //                 toast.error(res?.data?.message);
  //               }
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //               if (error.response.data.success === false) {
  //                 setLoader(false);
  //                 toast(error.response.data.message);
  //               }
  //             });
  //         })
  //         .catch((error) => {});
  //     })
  //     .catch((error) => {
  //       console.error("Error signing out: ", error);
  //     });
  // };

  // const handleFacebook = () => {
  //   signOut(auth)
  //     .then(() => {
  //       console.log("Signed out successfully.");

  //       signInWithPopup(auth, providerFacebook)
  //         .then((data) => {
  //           console.log(data);
  //         })
  //         .catch((error) => {
  //           console.log(error.customData);

  //           const params = {
  //             emailOrPhone: error.customData.email,
  //             password: error.customData._tokenResponse.localId,
  //           };

  //           axios
  //             .post(`${Base_url}/loginUser`, params)
  //             .then((res) => {
  //               console.log(res);
  //               if (res.data.success === true) {
  //                 localStorage.setItem("user_data", res?.data?.user?._id);
  //                 toast.success(res?.data?.message);
  //                 navigate("/");
  //               } else {
  //                 toast.error(res?.data?.message);
  //               }
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //               if (error.response.data.success === false) {
  //                 setLoader(false);
  //                 toast(error.response.data.message);
  //               }
  //             });
  //         });
  //     })
  //     .catch((error) => {
  //       console.error("Error signing out: ", error);
  //     });
  // };
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  console.log(state);

  const handlerLogin = (e) => {
    console.log(e);
    e.preventDefault();
    setLoader(true);

    const params = {
      email: state.email,
      password: state.password,
    };

    axios
      .post(`${Base_url}/user/login`, params)
      .then((res) => {
        console.log(res?.data?.data?.user);

        if (res?.data?.success === true) {
          setLoader(false);
          dispatch(setUserToken(res?.data?.data?.user?._id));
          localStorage.setItem('Dealar', JSON.stringify(res?.data?.data?.user));

          if(res?.data?.data?.user?.profileStatus==='serviceProvider'){
            localStorage.setItem('serviceProvider', JSON.stringify(res?.data?.data?.garage?._id));
          }
          toast.success("User Login Successfully!");
          navigate("/");
        } else {
          toast.error(res?.data?.message);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.data?.success === false) {
          setLoader(false);
          toast(error?.response?.data?.message);
        }
      });
  };

  // const [login, response] = useAuthLoginMutation();
  // console.log("my response", response);
  // const errors = response?.error?.data?.errors
  //   ? response?.error?.data?.errors
  //   : [];
  // const adminLoginFunction = (e) => {
  //   e.preventDefault();
  //   login(state);
  //   setLoader(true);
  // };
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (response.isSuccess) {
  //     localStorage.setItem("userToken", response?.data?.userId);
  //     dispatch(setUserToken(response?.data?.userId));
  //     navigate("/");
  //     toast.success("User login Successfully!");

  //     setLoader(false);
  //   }
  // }, [response.isSuccess]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <div className=" bg-[#f2f5fb] py-12 sm:px-12 px-6 w-[100%] lg:w-[50%]">
        <h3 className="  font-bold  pb-3  text-black  text-2xl">
          Log in to your account
        </h3>
        <p className=" text-textColor">Welcome back! Sign in to your account</p>

        <div className=" pt-10 gap-6 md:flex block items-center">
          <h6 className=" text-black font-medium"> Continue with:</h6>
          <div className=" flex gap-2">
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
                " bg-white border-gray-200  font-semibold border-2 justify-between rounded-lg text-lg py-2.5   w-40 text-black"
              }
            />
            <Button
              // onClick={handleFacebook}
              label={"Facebook"}
              Icons={
                <img
                  src={require("../../../assets/images/facebook.png")}
                  alt=""
                  className=" sm:w-7 w-5"
                />
              }
              className={
                "bg-white border-gray-200  font-semibold border-2 justify-between rounded-lg text-lg py-2.5   w-40 text-black"
              }
            />
          </div>
        </div>
        <h3 className="   font-semibold  text-black  py-7 text-xl">OR</h3>

        <form onSubmit={handlerLogin}>
          <div className=" sm:w-[70%] w-[100%] flex flex-col gap-5">
            <Input
              label={"Email or Username"}
              type="email"
              onChange={handleInputs}
              value={state.email}
              name={"email"}
              placeholder={"Email or Username"}
              className={"border-2 w-full border-gray-200"}
              required={"required"}
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
              required={"required"}
            />
            <div className="   sm:flex block items-center justify-between">
              <div className=" gap-2 flex items-center">
                <Input
                  type="checkbox"
                  className={" w-5 h-5 rounded-lg accent-primary"}
                  required={"required"}
                />
                <p className="text-gray-400  font-semibold">Reminder</p>
              </div>
              <div className="">
                <Link
                  to="/forgotten_email"
                  className="text-gray-400   border-b border-gray-400"
                >
                  Forgotten password?
                </Link>
              </div>
            </div>
          </div>
          <div className=" pt-12">
            {loading === true ? (
              <button
                disabled
                type="button"
                class="text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
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
                type={"submit"}
                label={"Login"}
                className={" bg-orange-600 rounded-md  px-8  py-2 text-white"}
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
