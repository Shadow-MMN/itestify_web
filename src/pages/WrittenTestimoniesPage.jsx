import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { LuHeart } from "react-icons/lu";

const testimonies = Array(18).fill({
  title: "Jesus Changed my Genotype!",
  excerpt:
    "For years, I lived with the pain and limitations of having the sickle cell genotype. Countless hospital visits and painful crises became a part of my life. My faith in...",
  author: "Chika Amaka",
  category: "Healing",
  time: "30 Minutes ago",
  avatar: "/Ellipse 5.png",
});
const VideoTestimoniesPage = () => {
  return (
    <div className="min-h-screen px-4 md:px-12 flex flex-col gap-2 md:gap-4">
      <Link to={-1} className="flex items-center gap-4 md:gap-8">
        <div className="p-2 md:border border-secondary-10 md:bg-white rounded-md">
          <MdOutlineArrowBackIos className="size-6 text-black" />
        </div>
        <h1 className="text-xl md:text-3xl font-semibold">
          Trending Written Testimonies
        </h1>
      </Link>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {testimonies.map((item) => {
          return (
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
