import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import VideoCard from "../../../components/Testimonies /Video/VideoCard";
const testimonies = Array(12).fill({
  video: "/Screen Recording 2025-06-04 at 11.48.58 PM.mov",
  title: "Triplets after 25 years of waiting",
  church: "Redeemed Christian Church Of God",
  category: "Childbirth",
  views: 504,
  date: "18/6/2024",
});
const Videos = () => {
  return (
    <div className="min-h-screen px-4 md:px-12 flex flex-col gap-2 md:gap-4">
      <Link to={-1} className="flex items-center gap-4 md:gap-8">
        <div className="p-2 md:border border-secondary-10 md:bg-white rounded-md">
          <MdOutlineArrowBackIos className="size-6 text-black" />
        </div>
        <h1 className="text-xl md:text-3xl font-semibold">
          Trending Video Testimonies
        </h1>
      </Link>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonies.map((item) => {
          return <VideoCard item={item} oneColumn={true} />;
        })}
      </div>
      <button className="size-12 bg-primary-70 p-4 flex items-center justify-center rounded-full fixed right-6 md:right-16 bottom-16">
        <p className="text-3xl text-white">+</p>
      </button>
    </div>
  );
};

export default Videos;
