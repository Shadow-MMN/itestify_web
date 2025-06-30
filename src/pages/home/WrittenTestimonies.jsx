import React, { useState, useEffect } from "react";
import { LuHeart } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const testimonies = Array(6).fill({
  title: "Jesus Changed my Genotype!",
  excerpt:
    "For years, I lived with the pain and limitations of having the sickle cell genotype. Countless hospital visits and painful crises became a part of my life. My faith in...",
  author: "Chika Amaka",
  category: "Healing",
  time: "30 Minutes ago",
  avatar: "/Ellipse 5.png",
});

const WrittenTestimonies = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <section className="px-6 py-6 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Written testimonies</h1>
          <Link to="/written-testimonies">See all</Link>
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
        {testimonies.map((item, index) => (
          <SwiperSlide key={index} className="px-6">
            {loading ? (
              <div
                className="w-full h-[250px] rounded-xl"
                style={{ backgroundColor: "#D9D9D9" }}
              ></div>
            ) : (
              <div className="bg-[#F5F5F5] rounded-xl p-3 flex flex-col gap-3 relative">
                <h2>{item.title}</h2>
                <p className="font-thin">
                  {item.excerpt}
                  <span className="text-primary-50"> see more</span>
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src={item.avatar}
                    alt="Testifiers Profile"
                    className="w-10 h-10"
                  />
                  <div className="flex flex-col ">
                    <h3>{item.author}</h3>
                    <p className="font-thin flex items-center gap-1">
                      {item.category}
                      <span>
                        <GoDotFill />
                      </span>
                      {item.time}
                    </p>
                  </div>
                </div>
                <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center p-2 absolute top-2 right-4">
                  <LuHeart className="text-[#1E1E1E] w-6 h-6" />
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default WrittenTestimonies;
