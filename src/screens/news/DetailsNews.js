import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Base_url } from "../../utils/Base_url";

const DetailsNews = () => {
  const { id } = useParams();
  const [news, setNews] = useState({});

  useEffect(() => {
    axios
      .get(`${Base_url}/admin/blog/${id}`)
      .then((res) => {
        console.log(res);

        setNews(res?.data?.blog);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="relative h-80 overflow-hidden">
        <img
          src={news?.images?.[0]}
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black flex justify-center items-center via-transparent to-transparent">
          <h1 className=" text-white font-semibold text-3xl">{news?.title}</h1>
        </div>
      </div>
      <div className="  grid grid-cols-3">
        {news?.images?.map((item, index) => {
          return (
            <div className="">
<img src={item} className="w-full h-full object-cover" alt="" />
            </div>
            
          );
        })}
      </div>
      <div className=" container mx-auto py-10">
        <div className=" pt-5">
          <p className="  font-semibold  text-xl">{news?.title}</p>
          <h4 className="  text-gray-600">{news?.content}</h4>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DetailsNews;
