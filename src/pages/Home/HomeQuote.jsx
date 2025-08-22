import React, { useState, useEffect } from "react";
import { LuHeart } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import { LiaAngleRightSolid } from "react-icons/lia";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const quotes = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  image: "/Rectangle 2.png",
  source: "Southern Living",
}));

const HomeQuote = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <section className="px-6 py-6 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Inspirational Pictures</h1>
          <Link to="/quotes" className="flex items-center gap-1">
            <span className="text-lg font-semibold">See all</span>
            <LiaAngleRightSolid className="text-[#1E1E1E] size-4" />
          </Link>
        </div>
      </section>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {quotes.map((quote, index) => (
          <SwiperSlide key={index} className="px-6">
            {loading ? (
              <div
                className="w-full h-[250px] rounded-xl"
                style={{ backgroundColor: "#D9D9D9" }}
              ></div>
            ) : (
              <Link
                to={`quotes/${quote.id}`}
                className="p-3 flex flex-col gap-3 relative"
              >
                <img src={quote.image} alt="Inspirational Quotes" />
                <p className="font-bold">Source : {quote.source}</p>
                <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center p-2 absolute top-6 right-8">
                  <LuHeart className="text-[#1E1E1E] w-6 h-6" />
                </div>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HomeQuote;
