import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import TextCard from "../../Testimonies /Text/TextCard";
const testimonies = Array(6).fill({
  title: "Jesus Changed my Genotype!",
  excerpt:
    "For years, I lived with the pain and limitations of having the sickle cell genotype. Countless hospital visits and painful crises became a part of my life. My faith in...",
  author: "Chika Amaka",
  category: "Healing",
  time: "30 Minutes ago",
  avatar: "/Ellipse 5.png",
});

const HomeTexts = () => {
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
              <TextCard item={item} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HomeTexts;
