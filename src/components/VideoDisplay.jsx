import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import VideoCard from "./Testimonies /Video/VideoCard";
const VideoDisplay = ({ data, loading, ml, oneColumn }) => {
  return (
    <>
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
        {data.map((item, index) => (
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
              <VideoCard ml={ml} item={item} oneColumn={oneColumn} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default VideoDisplay;
