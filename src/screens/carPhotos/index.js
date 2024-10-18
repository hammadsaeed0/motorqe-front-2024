import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import Button from "../../components/Button";
import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from "react-icons/lia";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useSelector } from "react-redux";

const CarPhotos = () => {
  const location = useLocation();
  const receivedData = location.state;
  const userData = JSON.parse(localStorage.getItem("Dealar"));
  const navigate = useNavigate();
  const user = useSelector((state) => state.authReducer);
  const plan = useSelector((state) => state.planReducer);
  const userPlans = localStorage.getItem("userPlan");
  console.log(plan?.userPlan);

  const [loading, setLoader] = useState(false);
  const [selectedImages, setSelectedImages] = useState(
    Array(
      userData?.profileStatus === "dealer" ? 5 : plan?.userPlan?.plan?.maxImages
    ).fill(null)
  ); // Default to 5 images
  const [selectedImage, setSelectedImage] = useState(
    Array(
      userData?.profileStatus === "dealer" ? 5 : plan?.userPlan?.plan?.maxImages
    ).fill(null)
  );

  useEffect(() => {
    if (user?.userToken?.plan?.photoLimit) {
      setSelectedImages(Array(plan?.userPlan?.plan?.maxImages).fill(null));
      setSelectedImage(Array(plan?.userPlan?.plan?.maxImages).fill(null));
    }
  }, [user]);

  const handleFileChange = (index) => (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = file;
        return newImages;
      });

      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[index] = reader.result;
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImages = async () => {
    if (selectedImage.every((img) => img === null)) {
      toast.error("Please upload at least one image");
      return;
    }

    setLoader(true);
    let profilephoto = " ";

    try {
      let param = new FormData();
      selectedImage.forEach((item) => {
        if (item) {
          param.append("images", item);
        }
      });

      profilephoto = await axios.post(
        `http://35.88.137.61/api/api/upload`,
        param
      );

      if (profilephoto.status === 200) {
        setLoader(false);
        navigate(`/contact_details`, {
          state: {
            receivedData: receivedData,
            upload: profilephoto.data.data,
          },
        });
      }
    } catch (error) {
      console.log(error);

      toast.error("network error");
      setLoader(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="py-8 text-center">
        <h2 className="h2 text-center">Sell Your Car</h2>
        <p className="pt-2 text-gray-400">
          Sell your car in seconds with just a few clicks
        </p>
      </div>
      <div className="py-8">
        <ul className="flex gap-8 justify-center items-center">
          <li className="flex items-center gap-2">
            <div className="w-8 h-8 bg-secondary items-center rounded-full flex justify-center">
              <p className="text-white">1</p>
            </div>
            <div>
              <span className="text-secondary font-bold">Type Of Package</span>
            </div>
          </li>
          <li>
            <FaAngleRight className="text-secondary" />
          </li>
          <li className="flex items-center gap-2">
            <div className="w-8 h-8  bg-secondary border-secondary border items-center rounded-full flex justify-center">
              <p className="text-white">2</p>
            </div>
            <Link to={"/car_details"}>
              <span className="font-bold text-secondary">Car Details</span>
            </Link>
          </li>
          <li>
            <FaAngleRight className="text-secondary" />
          </li>
          <li className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary items-center rounded-full flex justify-center">
              <p className="text-white">3</p>
            </div>
            <Link to={"/car_photos"}>
              <span className="text-primary font-semibold">Photo</span>
            </Link>
          </li>
          <li>
            <FaAngleRight className="text-gray-500" />
          </li>
          <li className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white border-textColor border items-center rounded-full flex justify-center">
              <p className="text-textColor">4</p>
            </div>
            <Link to={"/contact_details"}>
              <span className="text-textColor font-semibold">
                Contact Details
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="shadow-md rounded-xl text-center mt-8 py-5 px-12 mx-auto w-[80%]">
        <h2 className="h4 text-center">Upload Car Images</h2>
        <div className="flex justify-center mt-5 gap-10 mb-12 flex-wrap">
          {selectedImages.map((image, index) => (
            <label
              key={index}
              htmlFor={`fileInput${index}`}
              className={
                image
                  ? "rounded-md border overflow-hidden flex w-32 h-24"
                  : "bg-[#FEFBFB] border rounded-md p-1 w-32 h-24 flex justify-center items-center"
              }
            >
              {image ? (
                <img
                  src={image}
                  className="object-cover w-full h-full"
                  alt={`Selected ${index}`}
                />
              ) : (
                <div>
                  <img
                    src={require("../../assets/images/upload.png")}
                    className="mx-auto mb-2 w-16"
                    alt=""
                  />
                  <span className="text-secondary font-semibold mt-2">
                    Upload
                  </span>
                </div>
              )}
              <input
                accept="image/*"
                onChange={handleFileChange(index)}
                name="images"
                type="file"
                id={`fileInput${index}`}
                className="hidden"
              />
            </label>
          ))}
        </div>
        <span className="text-textColor font-bold">
          Note: Plans: Silver up to {plan?.userPlan?.plan?.maxImages} images,
          Gold up to 10 Images, Platinum up to 15 Images
        </span>
      </div>
      <div className="container flex justify-between items-center mx-auto mt-10 mb-20">
        <div className="flex items-center gap-3">
          <LiaLongArrowAltLeftSolid />
          <span className="text-textColor font-semibold">Back</span>
        </div>
        {loading ? (
          <button
            disabled
            type="button"
            className="text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-black animate-spin"
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
            onClick={uploadImages}
            type={"submit"}
            label={"Next"}
            rIcons={<LiaLongArrowAltRightSolid />}
            className={"bg-primary rounded-3xl text-white w-44 py-1.5"}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CarPhotos;
