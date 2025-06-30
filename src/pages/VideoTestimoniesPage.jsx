import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { LuHeart } from "react-icons/lu";
const testimonies = Array(12).fill({
  video: "/Screen Recording 2025-06-04 at 11.48.58 PM.mov",
  title: "Triplets after 25 years of waiting",
  church: "Redeemed Christian Church Of God",
  category: "Childbirth",
  views: 504,
  date: "18/6/2024",
});
const VideoTestimoniesPage = () => {
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2">
        {testimonies.map((item) => {
          return (
            <div className="flex flex-col gap-4 relative px-6">
              <video src={item.video} className="rounded-lg" controls />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#9966cc] py-3 px-3 flex items-center justify-center rounded-full">
                  <img
                    src="/Logo.png"
                    alt="Itestify Logo"
                    className="w-4 h-4"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h2>{item.title}</h2>
                  <p>{item.church}</p>
                  <p className="font-thin text-sm lg:gap-1 lg:text-base flex items-center">
                    {item.category}
                    <span>
                      <GoDotFill />
                    </span>
                    {item.views} Views
                    <span>
                      <GoDotFill />
                    </span>
                    {item.date}
                  </p>
                </div>
              </div>
              <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center p-2 absolute top-2 right-10">
                <LuHeart className="text-[#1E1E1E] w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>
      <button className="size-12 bg-primary-70 p-4 flex items-center justify-center rounded-full fixed right-16 bottom-16">
        <p className="text-3xl text-white">+</p>
      </button>
    </div>
  );
};

export default VideoTestimoniesPage;
