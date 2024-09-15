import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Header from "../../components/header";
import Footer from "../../components/footer";

const News = () => {
  // Array of news objects
  //   const newsData = [
  //     {
  //       id: 1,
  //       title: "This is News By Hammad",
  //       description: "Al-Sharq News Papers Continuing the story and legend of the falbled sports car, Nissan Motor Co.,Ltd and Nissan Motorsprts & Customizing Co.,Ltd.(NMC)",
  //     },
  //     {
  //       id: 2,
  //       title: "Nissan/NISMO reveals Nissan Z GT4, ready for the track in 2023",
  //       description: "Al-Sharq News Papers Continuing the story and legend of the falbled sports car, Nissan Motor Co.,Ltd and Nissan Motorsprts & Customizing Co.,Ltd.(NMC)",
  //     },
  //     // Add more news objects as needed
  //   ];

  const [news, setNews] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://34.216.84.212/api/admin/News/get-all-news", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let data = JSON.parse(result);
        // // console.log(data);
        // data?.news?.sort((a, b) => a - b);

        // // Reverse the sorted array
        // data?.news?.reverse();
        setNews(data.news);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto py-12 px-10">
        <div className="flex-wrap flex gap-8 justify-center">
          {/* Map over the newsData array to render each news card */}
          {news.map((news) => (
            <div key={news.id} className="w-80 shadow-lg">
              <div className="relative w-80 h-44">
                <img
                  src={news.image}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <Button
                  className={
                    "absolute top-3 right-3 text-xs uppercase text-white bg-primary py-1 font-semibold rounded-3xl"
                  }
                  label={"car news-al sharo"}
                />
              </div>
              <div className="p-4">
                <h1 className="font-bold text-lg">{news.title}</h1>
                <p className="text-textColor pt-4">{news.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default News;
