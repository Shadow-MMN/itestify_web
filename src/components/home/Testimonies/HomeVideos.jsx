import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import VideoCard from "../../Testimonies /Video/VideoCard";
const swiperData = Array(6).fill({
  video: "/Screen Recording 2025-06-04 at 11.48.58 PM.mov",
  title: "Triplets after 25 years of waiting",
  church: "Redeemed Christian Church Of God",
  category: "Childbirth",
  views: 504,
  date: "18/6/2024",
});

const HomeVideos = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <section className="px-6 pt-6 flex flex-col gap-3 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Video Testimonies</h1>
          <Link to="/video-testimonies">See all</Link>
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
        {swiperData.map((item, index) => (
          <SwiperSlide key={index}>
            {loading ? (
              <div className="flex flex-col gap-4 relative px-6">
                {/* Skeleton for video */}
                <Skeleton height={320} borderRadius="0.75rem" />

                {/* Skeleton for profile image + text */}
                <div className="flex items-start gap-4">
                  <Skeleton circle width={40} height={40} />

                  <div className="flex flex-col gap-3 w-full">
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={15} width="60%" />
                    <Skeleton height={15} width="70%" />
                  </div>
                </div>

                {/* Skeleton for heart icon */}
                <div className="absolute top-2 right-10">
                  <Skeleton circle width={32} height={32} />
                </div>
              </div>
            ) : (
              <VideoCard ml={2} item={item} oneColumn={true} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HomeVideos;
