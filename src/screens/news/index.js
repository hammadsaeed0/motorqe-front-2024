import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Base_url } from "../../utils/Base_url";
import { Link } from "react-router-dom";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]); // Store news data
  const [page, setPage] = useState(1); // Page number for pagination
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // To check if more news is available
  const [visibleNews, setVisibleNews] = useState(6); // Set default visible news to 6
  const [banners, setBanners] = useState([]); // Store banner ads data

  useEffect(() => {
    // Fetch ads data
    axios.get(`${Base_url}/user/ads`)
      .then((res) => setBanners(res.data))
      .catch((error) => console.error(error));

    // Fetch news data for initial page
    fetchNews(page);
  }, [page]);

  const fetchNews = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`${Base_url}/admin/blog?page=${page}`);
      const data = await response.json();
      if (data.blogs.length > 0) {
        setNews(data.blogs);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    if (visibleNews < news.length) {
      setVisibleNews((prevVisible) => prevVisible + 3);
    } else if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const BannerAd = ({ ads }) => (
    <div className="w-28 flex-shrink-0 hidden lg:block">
      {ads?.map((ad, index) => (
        <a
          href={ad?.redirectUrl || "/"}
          target="_blank"
          rel="noopener noreferrer"
          key={`ad-${index}`}
        >
          <img
            src={ad?.imageUrl}
            className="h-60 w-full mt-10 rounded-xl object-cover"
            alt={`Ad ${index}`}
          />
        </a>
      ))}
    </div>
  );

  return (
    <>
      <Header />
      <div className="container mx-auto py-12 px-10">
        {news.reduce((acc, item, index) => {
          if (index % 5 === 0) {
            const adSetIndex = Math.floor(index / 5);

            acc.push(
              <div className="flex flex-wrap justify-between items-center gap-4 lg:flex-nowrap" key={`row-${adSetIndex}`}>
                <BannerAd ads={banners?.sideAds} />

                <div className="flex flex-wrap  w-full gap-4">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    index + i < news.length && (
                      <div
                        
                        className="flex flex-col w-full relative  md:w-1/3 sm:w-1/2 shadow-lg"
                      >
                        <Link key={`news-${index + i}`}
                        to={`/new-details/${news[index + i]?._id}`} className="relative   h-44">
                          <img
                            src={news[index + i]?.images}
                            className="w-full h-full object-cover"
                            alt={news[index + i].title}
                          />
                          </Link>
                          {news[index + i].ads_text && (
          <div className="absolute top-3 right-3">
            <Link to={news[index + i].ads_link} target="_blank"  
              rel="noopener noreferrer">
              <Button
                className="text-xs uppercase text-white hover:bg-white  hover:text-primary bg-primary py-1 font-semibold rounded-3xl"
                label={news[index + i].ads_text}
              />
            </Link>
          </div>
        )}
                          
                          
                     
                        <div className="p-4">
                          <h1 className="font-bold text-lg">{news[index + i].title}</h1>
                          <p className="text-textColor pt-4">
                            {news[index + i]?.subContent.slice(0, 90)}
                            {news[index + i]?.subContent.length > 100 ? "..." : ""}
                          </p>
                        </div>
                      </div>
                    )
                  ))}
                </div>

                <BannerAd ads={banners?.sideAds} />
              </div>
            );

            if (banners?.bannerAds?.[adSetIndex]) {
              acc.push(
                <div className="h-72 w-full my-6" key={`banner-${adSetIndex}`}>
                  <a
                    href={banners.bannerAds[adSetIndex]?.redirectUrl || "/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={banners.bannerAds[adSetIndex]?.imageUrl}
                      className="h-full w-full rounded-xl object-center"
                      alt={`Banner ad ${adSetIndex}`}
                    />
                  </a>
                </div>
              );
            }
          }
          return acc;
        }, [])}

        <div className="mx-auto flex justify-center">
          {/* {(hasMore || visibleNews < news.length) && (
            <Button
              className="bg-primary text-white py-2 px-6 rounded-md mt-8"
              label={loading ? "Loading..." : "Show More"}
              onClick={handleShowMore}
              disabled={loading}
            />
          )} */}
          {!hasMore && visibleNews >= news.length && (
            <p className="text-center mt-8">No more news available</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default News;
