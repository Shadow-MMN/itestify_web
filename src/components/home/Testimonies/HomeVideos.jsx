import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import VideoDisplay from "../../VideoDisplay";
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
      {/*swiperData ml={2} item={item} oneColumn={true} */}
      <VideoDisplay
        data={swiperData}
        ml={2}
        oneColumn={true}
        loading={loading}
      />
    </>
  );
};

export default HomeVideos;
