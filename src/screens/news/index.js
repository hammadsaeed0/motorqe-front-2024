import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Base_url } from "../../utils/Base_url";
import { Pannellum } from "pannellum-react";
import { Link } from "react-router-dom";
const News = () => {
  const [news, setNews] = useState([]); // Store news data
  const [page, setPage] = useState(1); // Page number for pagination
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // To check if more news is available
  const [visibleNews, setVisibleNews] = useState(6); // Set default visible news to 3

  useEffect(() => {
    fetchNews(page); // Fetch news when component mounts or page changes
  }, [page]);

  const fetchNews = (page) => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${Base_url}/admin/blog?page=${page}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let data = JSON.parse(result);
        if (data.blogs.length > 0) {
          setNews((prevNews) => [...prevNews, ...data.blogs]); // Append new data
        } else {
          setHasMore(false); // No more news available
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleShowMore = () => {
    if (visibleNews < news.length) {
      // If there are still news to show in the current set
      setVisibleNews((prevVisible) => prevVisible + 3); // Show 3 more news items
    } else if (hasMore) {
      // Fetch more news if there are more pages
      setPage((prevPage) => prevPage + 1);
    }
  };


  return (
    <>
      <Header />
      <div className="container mx-auto py-12 px-10">
        <div className="flex-wrap flex gap-8 justify-center">
          {/* Map over the news array to render only the visible news items */}
          {news.slice(0, visibleNews).map((newsItem) => (
            <Link  key={newsItem.id} to={`/new-details/${newsItem?._id}`} className="w-80 shadow-lg">
              <div className="relative w-80 h-44">
                <img
                  src={newsItem?.images[0]}
                  className="w-full h-full object-cover"
                  alt={newsItem.title}
                />
                <Button
                  className={
                    "absolute top-3 right-3 text-xs uppercase text-white bg-primary py-1 font-semibold rounded-3xl"
                  }
                  label={"car news-al sharo"}
                />
              </div>
              <div className="p-4">
                <h1 className="font-bold text-lg">{newsItem.title}</h1>
                <p className="text-textColor pt-4">{newsItem.content}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Show More button */}

        <div className="  mx-auto flex justify-center">
          {(hasMore || visibleNews < news.length) && (
            <div className="text-center mt-8">
              <Button
                className="bg-primary text-white py-2 px-6 rounded-md"
                label={loading ? "Loading..." : "Show More"}
                onClick={handleShowMore}
                disabled={loading}
              />
            </div>
          )}
          {!hasMore && visibleNews >= news.length && (
            <div className="text-center mt-8">
              <p>No more news available</p>
            </div>
          )}
        </div>
      </div>

     

      <Footer />
    </>
  );
};

export default News;
